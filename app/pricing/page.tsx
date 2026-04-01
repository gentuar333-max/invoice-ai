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
    price: "0 €",
    period: "",
    color: MUTED,
    description: "Pour commencer sans risque",
    features: [
      "5 factures fournisseurs / mois",
      "Scan rapide via smartphone (OCR)",
      "Suivi payé / impayé",
      "Tableau de bord simple",
      "Export PDF",
    ],
    locked: [
      "Réconciliation bancaire CSV",
      "Calcul TVA automatique",
      "Analyse de contrats",
      "Export FEC DGFiP",
    ],
    cta: "COMMENCER GRATUITEMENT",
    href: "/auth/login",
    highlight: false,
    badge: null,
  },
  {
    key: "starter",
    name: "STARTER",
    price: "19 €",
    period: "/ mois",
    color: GOLD,
    description: "Pour les petites entreprises qui veulent le contrôle",
    features: [
      "100 factures / mois",
      "Calcul automatique de la TVA",
      "Réconciliation bancaire (CSV)",
      "Alertes factures impayées & TVA",
      "Export CSV + PDF",
      "Tableau de bord complet",
    ],
    locked: [
      "IA correspondances bancaires",
      "Analyse de contrats",
    ],
    cta: "CHOISIR STARTER",
    href: "/checkout?plan=starter",
    highlight: true,
    badge: "POPULAIRE",
  },
  {
    key: "pro",
    name: "PRO",
    price: "29 €",
    period: "/ mois",
    color: "#60a5fa",
    description: "Automatisation avancée + sécurité des contrats",
    features: [
      "Factures illimitées",
      "IA détecte les correspondances bancaires",
      "Export FEC conforme DGFiP",
      "Analyse de contrats (5/mois)",
      "Détection des clauses à risque",
      "Identification des frais cachés",
    ],
    locked: [],
    cta: "CHOISIR PRO",
    href: "/checkout?plan=pro",
    highlight: false,
    badge: null,
  },
  {
    key: "business",
    name: "BUSINESS",
    price: "49 €",
    period: "/ mois",
    color: PURPLE,
    description: "Pour les entreprises sérieuses qui veulent tout contrôler",
    features: [
      "Toutes les fonctionnalités Pro incluses",
      "Multi-établissements simplifié",
      "Analyse de contrats illimitée",
      "Résumé clair en quelques secondes",
      "Historique sécurisé (RGPD)",
      "Accompagnement personnalisé",
    ],
    locked: [],
    cta: "CHOISIR BUSINESS",
    href: "/checkout?plan=business",
    highlight: false,
    badge: null,
  },
];

export default function PricingPage() {
  const [currentPlan, setCurrentPlan] = useState("free");

  useEffect(() => {
    const plan = localStorage.getItem("user_plan") || "free";
    setCurrentPlan(plan);
  }, []);

  function getCTA(plan: typeof plans[0]) {
    const currentIndex = PLAN_ORDER.indexOf(currentPlan);
    const planIndex = PLAN_ORDER.indexOf(plan.key);

    if (plan.key === currentPlan) {
      return { label: "PLAN ACTUEL", disabled: true, href: "" };
    }
    if (planIndex < currentIndex) {
      return { label: "PLAN INFERIEUR", disabled: true, href: "" };
    }
    return { label: plan.cta, disabled: false, href: plan.href };
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "48px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
            CHOISISSEZ VOTRE PLAN
          </h1>
          <p style={{ fontSize: 14, color: MUTED, maxWidth: 500, margin: "0 auto" }}>
            Commencez gratuitement. Passez au niveau supérieur quand vous êtes prêt.
          </p>
          {currentPlan !== "free" && (
            <div style={{ marginTop: 16, display: "inline-block", background: `${GOLD}15`, border: `1px solid ${GOLD}40`, borderRadius: 4, padding: "8px 20px" }}>
              <p style={{ fontSize: 12, color: GOLD, fontWeight: 600 }}>
                Plan actuel: <strong>{currentPlan.toUpperCase()}</strong>
              </p>
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {plans.map((plan) => {
            const cta = getCTA(plan);
            const isCurrentPlan = plan.key === currentPlan;

            return (
              <div key={plan.name} style={{ background: isCurrentPlan ? `${plan.color}10` : plan.highlight ? `${GOLD}10` : CARD, border: `1px solid ${isCurrentPlan ? plan.color + "60" : plan.highlight ? GOLD + "60" : BORDER}`, borderRadius: 8, padding: "28px 22px", position: "relative", display: "flex", flexDirection: "column" }}>

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

                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: TEXT }}>{plan.price}</span>
                  <span style={{ fontSize: 13, color: MUTED, marginLeft: 4 }}>{plan.period}</span>
                </div>

                <p style={{ fontSize: 12, color: MUTED, marginBottom: 24, lineHeight: 1.5 }}>{plan.description}</p>

                <div style={{ flex: 1, marginBottom: 24 }}>
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
                  <div style={{ display: "block", background: isCurrentPlan ? `${plan.color}20` : BORDER, color: isCurrentPlan ? plan.color : MUTED, border: `1px solid ${isCurrentPlan ? plan.color + "40" : BORDER}`, padding: "11px", borderRadius: 3, fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center", cursor: "not-allowed" }}>
                    {cta.label}
                  </div>
                ) : (
                  <Link href={cta.href} style={{ display: "block", background: plan.highlight ? GOLD : "transparent", color: plan.highlight ? "#0f1923" : plan.color, border: `1px solid ${plan.highlight ? GOLD : plan.color + "60"}`, padding: "11px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center" }}>
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
  );
}