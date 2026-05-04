import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const amounts: Record<string, string> = {
  starter:         "19,00 €/mois",
  pro:             "29,00 €/mois",
  business:        "49,00 €/mois",
  starter_yearly:  "180,00 €/an",
  pro_yearly:      "276,00 €/an",
  business_yearly: "468,00 €/an",
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // ── checkout.session.completed ────────────────────────────
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const plan    = session.metadata?.plan;
    const userId  = session.metadata?.user_id;
    const email   = session.customer_email;
    const paymentId = session.payment_intent as string;

    // 1. Update plan dans profiles
    if (email && plan) {
      await supabase
        .from("profiles")
        .update({
          plan,
          stripe_customer_id:     session.customer as string,
          stripe_subscription_id: session.subscription as string,
          // Reset trial quand plan payant activé
          trial_ended: true,
        })
        .eq("email", email);

      // 2. Email confirmation
      await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL || "https://invoiceagent.fr"}/api/email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "payment_confirmed",
            to: email,
            data: { plan, amount: amounts[plan] || "" },
          }),
        }
      );
    }

    // 3. Referral bonus — si user_id present dans metadata
    if (userId && plan) {
      const { error } = await supabase.rpc("handle_referral_payment", {
        p_invited_user_id: userId,
        p_plan: plan,
        p_stripe_payment_id: paymentId || "",
      });
      if (error) console.error("Referral payment error:", error);
    }
  }

  // ── customer.subscription.deleted ────────────────────────
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase
      .from("profiles")
      .update({ plan: "free" })
      .eq("stripe_subscription_id", subscription.id);
  }

  // ── customer.subscription.updated ────────────────────────
  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription;
    const status = subscription.status;
    if (status === "past_due" || status === "unpaid") {
      await supabase
        .from("profiles")
        .update({ plan: "free" })
        .eq("stripe_subscription_id", subscription.id);
    }
  }

  return NextResponse.json({ received: true });
}