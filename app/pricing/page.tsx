 "use client";
import Link from "next/link";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

const plans = [
  {
    name: "GRATUIT",
    price: "0 €",
    period: "",
    color: MUTED,
    description: "Pour decouvrir la plateforme",
    features: [
      "5 factures / mois",
      "1 analyse IA incluse",
      "Statut manuel (paye / impaye)",
      "Dashboard basique",
      "Export PDF simple",
    ],
    locked: [
      "CSV bancaire",
      "AI matching",
      "Reconciliation",
      "Export avance",
    ],
    cta: "COMMENCER GRATUITEMENT",
    href: "/auth/login",
    highlight: false,
    badge: null,
  },
  {
    name: "STARTER",
    price: "19 €",
    period: "/ mois",
    color: GOLD,
    description: "Pour les freelances et TPE",
    features: [
      "100 factures / mois",
      "CSV bancaire import",
      "Matching rule-based",
      "TVA automatique",
      "Alerts & notifications",
      "Export CSV + PDF",
      "Dashboard complet",
    ],
    locked: [],
    cta: "CHOISIR STARTER",
    href: "/checkout?plan=starter",
    highlight: true,
    badge: "POPULAIRE",
  },
  {
    name: "PRO",
    price: "29 €",
    period: "/ mois",
    color: "#60a5fa",
    description: "Pour les PME et comptables",
    features: [
      "Tout Starter inclus",
      "AI matching (Gemini)",
      "Reconciliation intelligente",
      "Score de confiance (95%, 80%...)",
      "Auto-detection paiements",
      "Export avance + FEC",
      "Alerts avancees",
    ],
    locked: [],
    cta: "CHOISIR PRO",
    href: "/checkout?plan=pro",
    highlight: false,
    badge: null,
  },
  {
    name: "BUSINESS",
    price: "49 €",
    period: "/ mois",
    color: "#c084fc",
    description: "Pour les cabinets et multi-societes",
    features: [
      "Tout Pro inclus",
      "Multi-societes",
      "Integration QuickBooks / Pennylane",
      "API & Webhook",
      "Audit trail avance (PAF/GDPR)",
      "Support prioritaire",
      "Onboarding dedie",
    ],
    locked: [],
    cta: "CHOISIR BUSINESS",
    href: "/checkout?plan=business",
    highlight: false,
    badge: null,
  },
];

export default function PricingPage() {
  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "48px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
            CHOISISSEZ VOTRE PLAN
          </h1>
          <p style={{ fontSize: 14, color: MUTED, maxWidth: 500, margin: "0 auto" }}>
            Commencez gratuitement. Passez au niveau superieur quand vous etes pret.
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{ background: plan.highlight ? `${GOLD}10` : CARD, border: `1px solid ${plan.highlight ? GOLD + "60" : BORDER}`, borderRadius: 8, padding: "28px 22px", position: "relative", display: "flex", flexDirection: "column" }}>

              {/* Badge */}
              {plan.badge && (
                <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: GOLD, color: "#0f1923", padding: "3px 14px", borderRadius: 20, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, whiteSpace: "nowrap" }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <p style={{ fontSize: 11, fontWeight: 800, color: plan.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{plan.name}</p>

              {/* Price */}
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: TEXT }}>{plan.price}</span>
                <span style={{ fontSize: 13, color: MUTED, marginLeft: 4 }}>{plan.period}</span>
              </div>

              {/* Description */}
              <p style={{ fontSize: 12, color: MUTED, marginBottom: 24, lineHeight: 1.5 }}>{plan.description}</p>

              {/* Features */}
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

              {/* CTA */}
              <Link
                href={plan.href}
                style={{ display: "block", background: plan.highlight ? GOLD : "transparent", color: plan.highlight ? "#0f1923" : plan.color, border: `1px solid ${plan.highlight ? GOLD : plan.color + "60"}`, padding: "11px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", textAlign: "center", transition: "all 0.15s" }}
              >
                {plan.cta}
              </Link>

            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ fontSize: 12, color: MUTED }}>
            Pas d'engagement. Annulez a tout moment. Paiement securise par Stripe.
          </p>
        </div>

      </div>
    </div>
  );
}