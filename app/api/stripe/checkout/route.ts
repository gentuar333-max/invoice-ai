import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, { price: number; name: string }> = {
  starter: { price: 1900, name: "AgentHub Starter — 19€/mois" },
  pro: { price: 2900, name: "AgentHub Pro — 29€/mois" },
  business: { price: 4900, name: "AgentHub Business — 49€/mois" },
};

export async function POST(request: NextRequest) {
  try {
    const { plan, email } = await request.json();

    if (!PLANS[plan]) {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    const appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: PLANS[plan].name },
            unit_amount: PLANS[plan].price,
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      success_url: `${appUrl}/checkout/success?plan=${plan}`,
      cancel_url: `${appUrl}/pricing`,
      metadata: { plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}