"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

const PLAN_INFO: Record<string, {
  label: string;
  price: string;
  billing: string;
  totalYearly?: string;
  priceMonthly?: string;
  economy?: string;
}> = {
  starter:         { label: "Starter",         price: "19€", billing: "/mois" },
  pro:             { label: "Pro",              price: "29€", billing: "/mois" },
  business:        { label: "Business",         price: "49€", billing: "/mois" },
  starter_yearly:  { label: "Starter Annuel",  price: "15€", billing: "/mois", totalYearly: "180", priceMonthly: "15€", economy: "Économie 48€ vs mensuel" },
  pro_yearly:      { label: "Pro Annuel",       price: "23€", billing: "/mois", totalYearly: "276", priceMonthly: "23€", economy: "Économie 72€ vs mensuel" },
  business_yearly: { label: "Business Annuel", price: "39€", billing: "/mois", totalYearly: "468", priceMonthly: "39€", economy: "Économie 120€ vs mensuel" },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan") || "starter";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const info = PLAN_INFO[plan] ?? { label: plan.toUpperCase(), price: "—", billing: "" };
  const isYearly = plan.endsWith("_yearly");

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
          <h1 style={{ fontSize: 18, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 }}>
            FINALISER L'ABONNEMENT
          </h1>

          {/* Plan card */}
          <div style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}40`, borderRadius: 6, padding: "16px 20px" }}>
            <p style={{ fontSize: 11, color: MUTED, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 6px" }}>
              Plan sélectionné
            </p>
            <p style={{ fontSize: 16, fontWeight: 800, color: GOLD, margin: "0 0 10px", letterSpacing: 0.5 }}>
              {info.label}
            </p>

            {/* Prix principal */}
            {isYearly ? (
              <>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
                  <span style={{ fontSize: 44, fontWeight: 800, color: TEXT }}>{info.totalYearly}€</span>
                  <span style={{ fontSize: 14, color: MUTED }}>/an</span>
                </div>
                <p style={{ fontSize: 12, color: MUTED, margin: "4px 0 10px" }}>
                  soit {info.priceMonthly}/mois
                </p>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: 10 }}>
                <span style={{ fontSize: 44, fontWeight: 800, color: TEXT }}>{info.price}</span>
                <span style={{ fontSize: 14, color: MUTED }}>{info.billing}</span>
              </div>
            )}

            {/* Économie */}
            {info.economy && (
              <div style={{ background: "#4ade8015", border: "1px solid #4ade8030", borderRadius: 4, padding: "6px 12px", marginBottom: 8 }}>
                <p style={{ fontSize: 11, color: "#4ade80", fontWeight: 700, margin: 0 }}>
                  ✓ {info.economy}
                </p>
              </div>
            )}

            {isYearly && (
              <p style={{ fontSize: 10, color: MUTED, margin: 0 }}>
                Engagement annuel — renouvellement automatique
              </p>
            )}
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
          {loading ? "REDIRECTION..." : `PAYER ${isYearly ? info.totalYearly + "€" : info.price} AVEC STRIPE`}
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
          Paiement sécurisé par Stripe. Annulez à tout moment.
        </p>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button
            onClick={() => router.push("/pricing")}
            style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 12 }}
          >
            Retour aux tarifs
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#131f2e" }} />}>
      <CheckoutContent />
    </Suspense>
  );
}