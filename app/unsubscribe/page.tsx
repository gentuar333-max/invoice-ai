 
"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUnsubscribe() {
    setLoading(true);
    try {
      const supabase = (await import("@/lib/supabase")).createClient();
      await supabase
        .from("profiles")
        .update({ email_notifications: false })
        .eq("email", email);
      setDone(true);
    } catch {
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "40px 36px", width: "100%", maxWidth: 420, textAlign: "center" }}>
        {done ? (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              DESABONNEMENT CONFIRME
            </h1>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 28, lineHeight: 1.6 }}>
              Vous ne recevrez plus de notifications par email.
            </p>
            <Link href="/dashboard" style={{ display: "inline-block", background: GOLD, color: "#0f1923", padding: "11px 28px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase" }}>
              RETOUR AU DASHBOARD
            </Link>
          </>
        ) : (
          <>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📧</div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              SE DESABONNER
            </h1>
            <p style={{ fontSize: 13, color: MUTED, marginBottom: 8, lineHeight: 1.6 }}>
              Vous allez vous désabonner des notifications pour:
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: GOLD, marginBottom: 28 }}>{email}</p>
            <button
              onClick={handleUnsubscribe}
              disabled={loading}
              style={{ width: "100%", background: loading ? BORDER : "#ef4444", color: "#ffffff", border: "none", padding: "12px", borderRadius: 3, fontSize: 11, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}
            >
              {loading ? "CHARGEMENT..." : "CONFIRMER LE DESABONNEMENT"}
            </button>
            <Link href="/dashboard" style={{ display: "block", color: MUTED, fontSize: 12, textDecoration: "none" }}>
              Annuler — garder les notifications
            </Link>
          </>
        )}
      </div>
    </div>
  );
}