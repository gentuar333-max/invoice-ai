// Shto këtë kod në faqen e regjistrimit: app/auth/register/page.tsx
// Kap ?ref=IAXXXXXX nga URL dhe e ruan në localStorage

// ── NË KRYE TË KOMPONENTIT ──────────────────────────────────
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Brenda komponentit:
const searchParams = useSearchParams();

useEffect(() => {
  const ref = searchParams.get('ref');
  if (ref) {
    // Ruaj referral code në localStorage
    localStorage.setItem('referral_code', ref.toUpperCase());
  }
}, [searchParams]);

// ── PAS REGJISTRIMIT TË SUKSESSHËM ──────────────────────────
// Thirr API-n për të lidhur referral-in me userin e ri
async function handlePostRegister(userId: string) {
  const referralCode = localStorage.getItem('referral_code');
  
  if (referralCode) {
    await fetch('/api/referral/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ referral_code: referralCode }),
    });
    localStorage.removeItem('referral_code'); // pastro pas regjistrimit
  }
}

// ── SHEMBULL I PLOTË ─────────────────────────────────────────
// Thirr handlePostRegister pas supabase.auth.signUp()

/*
const { data, error } = await supabase.auth.signUp({ email, password });

if (!error && data.user) {
  await handlePostRegister(data.user.id);
  router.push('/dashboard');
}
*/