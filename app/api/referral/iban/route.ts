// app/api/referral/iban/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

// GET — merr IBAN aktual
export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const { data } = await supabase
      .from('profiles')
      .select('iban, iban_name, iban_verified')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
      iban: data?.iban ?? null,
      iban_name: data?.iban_name ?? null,
      iban_verified: data?.iban_verified ?? false,
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST — ruaj IBAN
export async function POST(req: NextRequest) {
  try {
    const { iban, iban_name } = await req.json();

    if (!iban || !iban_name) {
      return NextResponse.json({ error: 'IBAN et nom requis' }, { status: 400 });
    }

    // Validim bazik IBAN — hiq hapësirat, uppercase
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();

    // IBAN francez: FR + 25 karakterë = 27 total
    // IBAN europian: 15-34 karakterë
    if (cleanIban.length < 15 || cleanIban.length > 34) {
      return NextResponse.json({ error: 'Format IBAN invalide' }, { status: 400 });
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    const { error } = await supabase
      .from('profiles')
      .update({
        iban: cleanIban,
        iban_name: iban_name.trim(),
        iban_verified: false, // reset verification kur ndryshon
        iban_updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) throw error;

    return NextResponse.json({ success: true, iban: cleanIban });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}