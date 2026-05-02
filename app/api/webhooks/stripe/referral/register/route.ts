import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { referral_code } = await req.json();
    if (!referral_code) {
      return NextResponse.json({ error: 'Missing referral_code' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { error } = await supabase.rpc('handle_referral_registration', {
      p_invited_user_id: user.id,
      p_referral_code: referral_code.toUpperCase(),
    });

    if (error) {
      console.error('Referral registration error:', error);
      return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('referral_code, referral_bonus_total')
      .eq('id', user.id)
      .single();

    const { data: referrals } = await supabase
      .from('referrals')
      .select('id, invited_email, status, bonus_amount, milestone_bonus, paid_at, created_at')
      .eq('referrer_id', user.id)
      .order('created_at', { ascending: false });

    const { data: payouts } = await supabase
      .from('referral_payouts')
      .select('id, amount, type, status, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const paid_count = referrals?.filter(r =>
      ['paid', 'bonus_paid'].includes(r.status)
    ).length ?? 0;

    let next_milestone_target = 1;
    if (paid_count >= 10) {
      next_milestone_target = Math.ceil((paid_count + 1) / 10) * 10;
    } else if (paid_count >= 3) {
      next_milestone_target = 10;
    } else if (paid_count >= 1) {
      next_milestone_target = 3;
    }
    const next_milestone_in = next_milestone_target - paid_count;

    const referral_code = profile?.referral_code ?? null;

    return NextResponse.json({
      referral_code,
      referral_link: referral_code
        ? `https://invoiceagent.fr/auth/login?ref=${referral_code}`
        : null,
      bonus_total: profile?.referral_bonus_total ?? 0,
      paid_count,
      next_milestone_in,
      referrals: referrals ?? [],
      payouts: payouts ?? [],
    });

  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}