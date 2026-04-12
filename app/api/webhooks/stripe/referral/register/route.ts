// app/api/referral/register/route.ts
// Kur i invituari regjistrohet me ref=CODE në URL

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { referral_code } = await req.json();

    if (!referral_code) {
      return NextResponse.json({ error: 'Missing referral_code' }, { status: 400 });
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Thirr funksionin SQL
    const { error } = await supabase.rpc('handle_referral_registration', {
      p_invited_user_id: user.id,
      p_referral_code: referral_code.toUpperCase(),
    });

    if (error) {
      console.error('Referral registration error:', error);
      return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET — merr stats referral të userit të loguar
export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Merr referral_code dhe bonus total
    const { data: profile } = await supabase
      .from('profiles')
      .select('referral_code, referral_bonus_total')
      .eq('id', user.id)
      .single();

    // Merr lista referral-ëve
    const { data: referrals } = await supabase
      .from('referrals')
      .select('id, invited_email, status, bonus_amount, milestone_bonus, paid_at, created_at')
      .eq('referrer_id', user.id)
      .order('created_at', { ascending: false });

    // Merr payouts pending
    const { data: payouts } = await supabase
      .from('referral_payouts')
      .select('id, amount, type, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const paid_count = referrals?.filter(r => ['paid', 'bonus_paid'].includes(r.status)).length ?? 0;
    const next_milestone = 3 - (paid_count % 3);

    return NextResponse.json({
      referral_code: profile?.referral_code,
      referral_link: `https://invoiceagent.fr/auth/register?ref=${profile?.referral_code}`,
      bonus_total: profile?.referral_bonus_total ?? 0, // cents
      paid_count,
      next_milestone_in: next_milestone === 3 ? 0 : next_milestone,
      referrals: referrals ?? [],
      payouts: payouts ?? [],
    });

  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}