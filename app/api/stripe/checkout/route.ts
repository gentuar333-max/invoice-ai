import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PLANS: Record<string, { price: number; name: string; interval: "month" | "year" }> = {
  // Mensuel
  starter:         { price: 1900,  name: "InvoiceAgent Starter — 19€/mois",    interval: "month" },
  pro:             { price: 2900,  name: "InvoiceAgent Pro — 29€/mois",         interval: "month" },
  business:        { price: 4900,  name: "InvoiceAgent Business — 49€/mois",    interval: "month" },
  // Vjetor (çmimi total vjetor)
  starter_yearly:  { price: 18000, name: "InvoiceAgent Starter Annuel — 180€/an",  interval: "year" },
  pro_yearly:      { price: 27600, name: "InvoiceAgent Pro Annuel — 276€/an",       interval: "year" },
  business_yearly: { price: 46800, name: "InvoiceAgent Business Annuel — 468€/an",  interval: "year" },
};

export async function POST(request: NextRequest) {
  try {
    const { plan, email } = await request.json();

    if (!PLANS[plan]) {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    // Merr user_id nga Supabase session
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id ?? null;

    const appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const planData = PLANS[plan];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: planData.name },
            unit_amount: planData.price,
            recurring: { interval: planData.interval },
          },
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      success_url: `${appUrl}/checkout/success?plan=${plan}`,
      cancel_url: `${appUrl}/pricing`,
      // ← KETU: user_id shtohet në metadata
      metadata: {
        plan,
        user_id: userId ?? "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}