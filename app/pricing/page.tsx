"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";
const PURPLE = "#c084fc";

const PLAN_ORDER = ["free", "starter", "pro", "business"];

const plans = [
  {
    key: "free",
    name: "GRATUIT",
    priceMonthly: 0,
    priceYearly: 0,
    color: MUTED,
    description: "Pour commencer sans risque",
    features: ["5 factures fournisseurs / mois", "Scan rapide via smartphone (OCR)", "Suivi payé / impayé", "Tableau de bord simple", "Export PDF"],
    locked: ["Réconciliation bancaire CSV", "Calcul TVA automatique", "Analyse de contrats", "Export FEC DGFiP"],
    cta: "COMMENCER GRATUITEMENT",
    hrefMonthly: "/auth/login",
    hrefYearly: "/auth/login",
    highlight: false,
    badge: null,
  },
  {
    key: "starter",
    name: "STARTER",
    priceMonthly: 19,
    priceYearly: 15,
    color: GOLD,
    description: "Pour les petites entreprises qui veulent le contrôle",
    features: ["100 factures / mois", "Calcul automatique de la TVA", "Réconciliation bancaire (CSV)", "Alertes factures impayées & TVA", "Export CSV + PDF", "Tableau de bord complet"],
    locked: ["IA correspondances bancaires", "Analyse de contrats"],
    cta: "CHOISIR STARTER",
    hrefMonthly: "/checkout?plan=starter",
    hrefYearly: "/checkout?plan=starter_yearly",
    highlight: true,
    badge: "POPULAIRE",
  },
  {
    key: "pro",
    name: "PRO",
    priceMonthly: 29,
    priceYearly: 23,
    color: "#60a5fa",
    description: "Automatisation avancée + sécurité des contrats",
    features: ["Factures illimitées", "IA détecte les correspondances bancaires", "Export FEC conforme DGFiP", "Analyse de contrats (5/mois)", "Détection des clauses à risque", "Identification des frais cachés"],
    locked: [],
    cta: "CHOISIR PRO",
    hrefMonthly: "/checkout?plan=pro",
    hrefYearly: "/checkout?plan=pro_yearly",
    highlight: false,
    badge: null,
  },
  {
    key: "business",
    name: "BUSINESS",
    priceMonthly: 49,
    priceYearly: 39,
    color: PURPLE,
    description: "Pour les entreprises sérieuses qui veulent tout contrôler",
    features: ["Toutes les fonctionnalités Pro incluses", "Multi-établissements simplifié", "Analyse de contrats illimitée", "Résumé clair en quelques secondes", "Historique sécurisé (RGPD)", "Accompagnement personnalisé"],
    locked: [],
    cta: "CHOISIR BUSINESS",
    hrefMonthly: "/checkout?plan=business",
    hrefYearly: "/checkout?plan=business_yearly",
    highlight: false,
    badge: null,
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
    if (plan.priceMonthly === 0) return "0 €";
    return billing === "yearly" ? `${plan.priceYearly} €` : `${plan.priceMonthly} €`;
  }

  function getHref(plan: typeof plans[0]) {
    return billing === "yearly" ? plan.hrefYearly : plan.hrefMonthly;
  }

  function getCTA(plan: typeof plans[0]) {
    const ci = PLAN_ORDER.indexOf(currentPlan);
    const pi = PLAN_ORDER.indexOf(plan.key);
    if (plan.key === currentPlan) return { label: "PLAN ACTUEL", disabled: true };
    if (pi < ci) return { label: "PLAN INFERIEUR", disabled: true };
    return { label: plan.cta, disabled: false };
  }

  return (
    <>
      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .pricing-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .pricing-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .billing-toggle button { transition: all 0.2s; }
      `}</style>

      <div style={{ minHeight: "100vh", background: BG, padding: "48px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
              CHOISISSEZ VOTRE PLAN
            </h1>
            <p style={{ fontSize: 14, color: MUTED, maxWidth: 500, margin: "0 auto 24px" }}>
              Commencez gratuitement. Passez au niveau supérieur quand vous êtes prêt.
            </p>

            {/* Toggle mensuel / annuel */}
            <div className="billing-toggle" style={{ display: "inline-flex", alignItems: "center", background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: 4, gap: 4, marginBottom: 16 }}>
              <button
                onClick={() => setBilling("monthly")}
                style={{ padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, background: billing === "monthly" ? GOLD : "transparent", color: billing === "monthly" ? "#0f1923" : MUTED }}
              >
                MENSUEL
              </button>
              <button
                onClick={() => setBilling("yearly")}
                style={{ padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, background: billing === "yearly" ? GOLD : "transparent", color: billing === "yearly" ? "#0f1923" : MUTED, display: "flex", alignItems: "center", gap: 6 }}
              >
                ANNUEL
                <span style={{ background: "#4ade8030", color: "#4ade80", fontSize: 10, fontWeight: 800, padding: "2px 6px", borderRadius: 4 }}>-20%</span>
              </button>
            </div>

            {currentPlan !== "free" && (
              <div style={{ display: "inline-block", background: `${GOLD}15`, border: `1px solid ${GOLD}40`, borderRadius: 4, padding: "8px 20px" }}>
                <p style={{ fontSize: 12, color: GOLD, fontWeight: 600, margin: 0 }}>
                  Plan actuel: <strong>{currentPlan.toUpperCase()}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Grid plans */}
          <div className="pricing-grid">
            {plans.map((plan) => {
              const cta = getCTA(plan);
              const isCurrentPlan = plan.key === currentPlan;
              const href = getHref(plan);

              return (
                <div key={plan.key} style={{
                  background: isCurrentPlan ? `${plan.color}10` : plan.highlight ? `${GOLD}10` : CARD,
                  border: `1px solid ${isCurrentPlan ? plan.color + "60" : plan.highlight ? GOLD + "60" : BORDER}`,
                  borderRadius: 8,
                  padding: "28px 20px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 12,
                }}>

                  {plan.badge && !isCurrentPlan && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: GOLD, color: "#0f1923", padding: "3px 14px", borderRadius: 20, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, whiteSpace: "nowrap" }}>
                      {plan.badge}
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: plan.color, color: "#0f1923", padding: "3px 14px", borderRadius: 20, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, whiteSpace: "nowrap" }}>
                      VOTRE PLAN
                    </div>
                  )}

                  <p style={{ fontSize: 11, fontWeight: 800, color: plan.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{plan.name}</p>

                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 800, color: TEXT }}>{getPrice(plan)}</span>
                    {plan.priceMonthly > 0 && <span style={{ fontSize: 13, color: MUTED, marginLeft: 4 }}>/ mois</span>}
                  </div>

                  {billing === "yearly" && plan.priceMonthly > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <span style={{ fontSize: 11, color: MUTED, textDecoration: "line-through", marginRight: 6 }}>
                        {plan.priceMonthly}€/mois
                      </span>
                      <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 700 }}>
                        -{savings[plan.key]}€/an
                      </span>
                      <p style={{ fontSize: 10, color: MUTED, marginTop: 2, marginBottom: 0 }}>
                        Facturé {plan.priceYearly * 12}€/an
                      </p>
                    </div>
                  )}

                  <p style={{ fontSize: 12, color: MUTED, marginBottom: 20, lineHeight: 1.5 }}>{plan.description}</p>

                  <div style={{ flex: 1, marginBottom: 20 }}>
                    {plan.features.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                        <span style={{ color: "#4ade80", fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                    {plan.locked.map((f) => (
                      <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                        <span style={{ color: "#ef444460", fontSize: 13, flexShrink: 0, marginTop: 1 }}>✕</span>
                        <span style={{ fontSize: 12, color: MUTED, lineHeight: 1.5, opacity: 0.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  {cta.disabled ? (
                    <div style={{ background: isCurrentPlan ? `${plan.color}20` : BORDER, color: isCurrentPlan ? plan.color : MUTED, border: `1px solid ${isCurrentPlan ? plan.color + "40" : BORDER}`, padding: "11px", borderRadius: 3, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center", cursor: "not-allowed" }}>
                      {cta.label}
                    </div>
                  ) : (
                    <Link href={href} style={{ display: "block", background: plan.highlight ? GOLD : "transparent", color: plan.highlight ? "#0f1923" : plan.color, border: `1px solid ${plan.highlight ? GOLD : plan.color + "60"}`, padding: "11px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center" }}>
                      {cta.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <p style={{ fontSize: 12, color: MUTED }}>
              Pas d'engagement. Annulez à tout moment. Paiement sécurisé par Stripe.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}