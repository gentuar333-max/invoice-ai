 
"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

const PLAN_NAMES: Record<string, string> = {
  starter: "STARTER — 19 €/mois",
  pro: "PRO — 29 €/mois",
  business: "BUSINESS — 49 €/mois",
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "starter";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Erreur");
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "40px 36px", width: "100%", maxWidth: 420 }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>💳</div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
            FINALISER L'ABONNEMENT
          </h1>
          <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, borderRadius: 4, padding: "8px 16px", display: "inline-block" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: GOLD, letterSpacing: 1 }}>
              {PLAN_NAMES[plan] || plan.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
            VOTRE EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheckout()}
            placeholder="vous@exemple.com"
            style={{ width: "100%", background: "#0f1923", border: `1px solid ${BORDER}`, borderRadius: 3, padding: "11px 14px", fontSize: 13, color: TEXT, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
          />
        </div>

        {error && (
          <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 3, padding: "10px 14px", color: "#ef4444", fontSize: 12, marginBottom: 14 }}>
            {error}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading || !email}
          style={{ width: "100%", background: loading || !email ? BORDER : GOLD, color: "#0f1923", border: "none", padding: "13px", borderRadius: 3, fontSize: 11, fontWeight: 800, cursor: loading || !email ? "not-allowed" : "pointer", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}
        >
          {loading ? "REDIRECTION..." : "PAYER AVEC STRIPE"}
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
          Paiement securise par Stripe. Annulez a tout moment.
        </p>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button onClick={() => router.push("/pricing")} style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 12 }}>
            Retour aux tarifs
          </button>
        </div>

      </div>
    </div>
  );
}