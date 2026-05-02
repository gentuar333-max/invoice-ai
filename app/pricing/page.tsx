"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const C = {
  bg:      "#f4f4f5",
  white:   "#ffffff",
  orange:  "#f97316",
  orangeL: "#fff7ed",
  orangeB: "#fed7aa",
  text:    "#18181b",
  muted:   "#71717a",
  border:  "#e4e4e7",
  green:   "#22c55e",
  greenL:  "#f0fdf4",
  blue:    "#3b82f6",
  blueL:   "#eff6ff",
  purple:  "#8b5cf6",
  purpleL: "#f5f3ff",
};

const PLAN_ORDER = ["free", "starter", "pro", "business"];

const plans = [
  {
    key: "free",
    name: "Gratuit",
    priceMonthly: 0,
    priceYearly: 0,
    color: "#71717a",
    colorL: "#f4f4f5",
    description: "Pour commencer sans risque",
    features: ["5 factures fournisseurs / mois", "Scan via smartphone", "Suivi paye / impaye", "Tableau de bord simple", "Export PDF"],
    locked: ["Reconciliation bancaire CSV", "Calcul TVA automatique", "Analyse de contrats", "Export FEC DGFiP"],
    cta: "Commencer gratuitement",
    hrefMonthly: "/auth/login",
    hrefYearly: "/auth/login",
    highlight: false,
  },
  {
    key: "starter",
    name: "Starter",
    priceMonthly: 19,
    priceYearly: 15,
    color: "#f97316",
    colorL: "#fff7ed",
    description: "Pour les petites entreprises",
    features: ["100 factures / mois", "Calcul automatique de la TVA", "Reconciliation bancaire CSV", "Alertes factures impayees", "Export CSV + PDF", "Tableau de bord complet"],
    locked: ["Analyse de contrats"],
    cta: "Choisir Starter",
    hrefMonthly: "/checkout?plan=starter",
    hrefYearly: "/checkout?plan=starter_yearly",
    highlight: true,
  },
  {
    key: "pro",
    name: "Pro",
    priceMonthly: 29,
    priceYearly: 23,
    color: "#3b82f6",
    colorL: "#eff6ff",
    description: "Automatisation avancee + contrats",
    features: ["Factures illimitees", "IA matching bancaire", "Export FEC conforme DGFiP", "Analyse de contrats (5/mois)", "Detection clauses a risque", "Frais caches identifies"],
    locked: [],
    cta: "Choisir Pro",
    hrefMonthly: "/checkout?plan=pro",
    hrefYearly: "/checkout?plan=pro_yearly",
    highlight: false,
  },
  {
    key: "business",
    name: "Business",
    priceMonthly: 49,
    priceYearly: 39,
    color: "#8b5cf6",
    colorL: "#f5f3ff",
    description: "Pour les entreprises exigeantes",
    features: ["Tout Pro inclus", "Analyse contrats illimitee", "Multi-etablissements", "Historique securise RGPD", "Accompagnement personnalise"],
    locked: [],
    cta: "Choisir Business",
    hrefMonthly: "/checkout?plan=business",
    hrefYearly: "/checkout?plan=business_yearly",
    highlight: false,
  },
];

const savings: Record<string, number> = {
  starter: (19 - 15) * 12,
  pro: (29 - 23) * 12,
  business: (49 - 39) * 12,
};

export default function PricingPage() {
  const [currentPlan, setCurrentPlan] = useState("free");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  useEffect(() => {
    async function fetchPlan() {
      try {
        const { createClient } = await import("@/lib/supabase");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data: profile } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", user.id)
          .single();
        if (profile?.plan) setCurrentPlan(profile.plan);
      } catch {}
    }
    fetchPlan();
  }, []);

  function getPrice(plan: typeof plans[0]) {
    if (plan.priceMonthly === 0) return "0";
    return billing === "yearly" ? `${plan.priceYearly}` : `${plan.priceMonthly}`;
  }

  function getHref(plan: typeof plans[0]) {
    return billing === "yearly" ? plan.hrefYearly : plan.hrefMonthly;
  }

  function getCTA(plan: typeof plans[0]) {
    const ci = PLAN_ORDER.indexOf(currentPlan);
    const pi = PLAN_ORDER.indexOf(plan.key);
    if (plan.key === currentPlan) return { label: "Plan actuel", disabled: true };
    if (pi < ci) return { label: "Plan inferieur", disabled: true };
    return { label: plan.cta, disabled: false };
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .pricing-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 640px) { .pricing-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .pricing-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(150deg, #fff7ed 0%, #ffedd5 100%)", padding: "48px 20px 40px", textAlign: "center", borderBottom: "1px solid #fed7aa" }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: -0.5 }}>
            Choisissez votre plan
          </h1>
          <p style={{ fontSize: 14, color: C.muted, marginBottom: 24, maxWidth: 420, margin: "0 auto 24px" }}>
            Commencez gratuitement. Passez au niveau superieur quand vous etes pret.
          </p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", background: C.white, border: "1.5px solid #e4e4e7", borderRadius: 12, padding: 4, gap: 4 }}>
            <button onClick={() => setBilling("monthly")}
              style={{ padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: billing === "monthly" ? C.orange : "transparent", color: billing === "monthly" ? C.white : C.muted, fontFamily: "inherit" }}>
              Mensuel
            </button>
            <button onClick={() => setBilling("yearly")}
              style={{ padding: "8px 20px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: billing === "yearly" ? C.orange : "transparent", color: billing === "yearly" ? C.white : C.muted, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
              Annuel
              <span style={{ background: "#f0fdf4", color: "#22c55e", fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 99 }}>-20%</span>
            </button>
          </div>

          {currentPlan !== "free" && (
            <div style={{ marginTop: 16 }}>
              <span style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 99, padding: "5px 16px", fontSize: 12, color: C.orange, fontWeight: 700 }}>
                Plan actuel : {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
              </span>
            </div>
          )}
        </div>

        {/* Plans */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
          <div className="pricing-grid">
            {plans.map((plan) => {
              const cta = getCTA(plan);
              const isCurrentPlan = plan.key === currentPlan;
              const href = getHref(plan);

              return (
                <div key={plan.key} style={{
                  background: C.white,
                  border: `1.5px solid ${isCurrentPlan ? plan.color : plan.highlight ? C.orange : C.border}`,
                  borderRadius: 16,
                  padding: "24px 20px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 16,
                  boxShadow: plan.highlight ? "0 4px 20px rgba(249,115,22,0.15)" : "0 1px 4px rgba(0,0,0,0.05)",
                }}>

                  {plan.highlight && !isCurrentPlan && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.orange, color: C.white, padding: "3px 14px", borderRadius: 99, fontSize: 10, fontWeight: 800, whiteSpace: "nowrap" }}>
                      Populaire
                    </div>
                  )}
                  {isCurrentPlan && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: plan.color, color: C.white, padding: "3px 14px", borderRadius: 99, fontSize: 10, fontWeight: 800, whiteSpace: "nowrap" }}>
                      Votre plan
                    </div>
                  )}

                  <p style={{ fontSize: 12, fontWeight: 800, color: plan.color, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>{plan.name}</p>

                  <div style={{ marginBottom: 4, display: "flex", alignItems: "baseline", gap: 2 }}>
                    <span style={{ fontSize: 38, fontWeight: 800, color: C.text }}>{getPrice(plan)}</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: C.text }}>€</span>
                    {plan.priceMonthly > 0 && <span style={{ fontSize: 13, color: C.muted, marginLeft: 2 }}>/mois</span>}
                  </div>

                  {billing === "yearly" && plan.priceMonthly > 0 && (
                    <div style={{ marginBottom: 8 }}>
                      <span style={{ fontSize: 11, color: C.muted, textDecoration: "line-through", marginRight: 6 }}>{plan.priceMonthly}€/mois</span>
                      <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 700 }}>-{savings[plan.key]}€/an</span>
                      <p style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>Facture {plan.priceYearly * 12}€/an</p>
                    </div>
                  )}

                  <p style={{ fontSize: 12, color: C.muted, marginBottom: 18, lineHeight: 1.5 }}>{plan.description}</p>

                  <div style={{ flex: 1, marginBottom: 20 }}>
                    {plan.features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                        <span style={{ color: "#22c55e", fontSize: 12, flexShrink: 0, marginTop: 2, fontWeight: 700 }}>✓</span>
                        <span style={{ fontSize: 12, color: C.text, lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                    {plan.locked.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                        <span style={{ color: C.border, fontSize: 12, flexShrink: 0, marginTop: 2 }}>✕</span>
                        <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5, opacity: 0.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  {cta.disabled ? (
                    <div style={{ background: isCurrentPlan ? plan.colorL : C.bg, color: isCurrentPlan ? plan.color : C.muted, border: `1.5px solid ${isCurrentPlan ? plan.color + "40" : C.border}`, padding: "11px", borderRadius: 12, fontSize: 13, fontWeight: 700, textAlign: "center", cursor: "not-allowed" }}>
                      {cta.label}
                    </div>
                  ) : (
                    <Link href={href} style={{ display: "block", background: plan.highlight ? C.orange : plan.colorL, color: plan.highlight ? C.white : plan.color, border: `1.5px solid ${plan.highlight ? C.orange : plan.color + "40"}`, padding: "11px", borderRadius: 12, fontSize: 13, fontWeight: 700, textDecoration: "none", textAlign: "center", boxShadow: plan.highlight ? "0 2px 8px rgba(249,115,22,0.3)" : "none" }}>
                      {cta.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <p style={{ textAlign: "center", fontSize: 12, color: C.muted, marginTop: 32 }}>
            Sans engagement · Annulez a tout moment · Paiement securise par Stripe
          </p>
        </div>
      </div>
    </>
  );
}