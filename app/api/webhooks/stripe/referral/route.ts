// app/api/webhooks/stripe-referral/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature error:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.user_id;
    const plan = session.metadata?.plan;
    const paymentId = session.payment_intent as string;

    if (!userId || !plan) {
      return NextResponse.json({ received: true });
    }

    const { error } = await supabase.rpc('handle_referral_payment', {
      p_invited_user_id: userId,
      p_plan: plan,
      p_stripe_payment_id: paymentId,
    });

    if (error) {
      console.error('Referral payment error:', error);
    }
  }

  return NextResponse.json({ received: true });
}