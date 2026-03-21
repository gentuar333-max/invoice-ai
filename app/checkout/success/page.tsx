"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "starter";

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: CARD, border: `1px solid #4ade8040`, borderRadius: 8, padding: "48px 36px", width: "100%", maxWidth: 420, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, background: "#4ade8020", border: "2px solid #4ade8060", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px" }}>✓</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
          PAIEMENT CONFIRME
        </h1>
        <p style={{ fontSize: 13, color: MUTED, marginBottom: 8, lineHeight: 1.6 }}>
          Votre abonnement <span style={{ color: GOLD, fontWeight: 700 }}>{plan.toUpperCase()}</span> est actif.
        </p>
        <p style={{ fontSize: 12, color: MUTED, marginBottom: 32 }}>
          Bienvenue sur AgentHub. Vos fonctionnalites sont maintenant disponibles.
        </p>
        <Link href="/dashboard" style={{ display: "block", background: GOLD, color: "#0f1923", padding: "12px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase" }}>
          ACCEDER AU DASHBOARD
        </Link>
      </div>
    </div>
  );
}