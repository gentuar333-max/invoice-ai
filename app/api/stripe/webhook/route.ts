import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const amounts: Record<string, string> = {
  starter: "19,00 €/mois",
  pro: "29,00 €/mois",
  business: "49,00 €/mois",
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const plan = session.metadata?.plan;
    const email = session.customer_email;

    if (email && plan) {
      await supabase
        .from("profiles")
        .update({
          plan,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
        })
        .eq("email", email);

      await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "https://invoice-ai-y2lf.vercel.app"}/api/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "payment_confirmed",
          to: email,
          data: { plan, amount: amounts[plan] || "" },
        }),
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    await supabase
      .from("profiles")
      .update({ plan: "free" })
      .eq("stripe_subscription_id", subscription.id);
  }

  return NextResponse.json({ received: true });
}