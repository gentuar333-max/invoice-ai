"use client";
import { useState } from "react";

const BASE_URL = "https://invoiceagent.fr";

const plans = [
  {
    name: "GRATUIT",
    monthly: 0,
    annual: 0,
    tagline: "Pour commencer sans risque",
    color: "#10b981",
    featured: false,
    badge: "VOTRE PLAN",
    badgeColor: "#1e3a5f",
    badgeText: "#60a5fa",
    items: [
      { text: "5 factures fournisseurs / mois", included: true },
      { text: "Scan rapide via smartphone (OCR)", included: true },
      { text: "Suivi payé / impayé", included: true },
      { text: "Tableau de bord simple", included: true },
      { text: "Export PDF", included: true },
      { text: "Réconciliation bancaire CSV", included: false },
      { text: "Calcul TVA automatique", included: false },
      { text: "Analyse de contrats", included: false },
      { text: "Export FEC DGFiP", included: false },
    ],
    link: `${BASE_URL}/auth/login`,
    cta: "PLAN ACTUEL",
    ctaStyle: "outline",
  },
  {
    name: "STARTER",
    monthly: 19,
    annual: 15,
    tagline: "Pour les petites entreprises qui veulent le contrôle",
    color: "#f59e0b",
    featured: true,
    badge: "POPULAIRE",
    badgeColor: "#f59e0b",
    badgeText: "#1c1917",
    items: [
      { text: "100 factures / mois", included: true },
      { text: "Calcul automatique de la TVA", included: true },
      { text: "Réconciliation bancaire (CSV)", included: true },
      { text: "Alertes factures impayées & TVA", included: true },
      { text: "Export CSV + PDF", included: true },
      { text: "Tableau de bord complet", included: true },
      { text: "IA correspondances bancaires", included: false },
      { text: "Analyse de contrats", included: false },
    ],
    link: `${BASE_URL}/checkout?plan=starter`,
    cta: "CHOISIR STARTER",
    ctaStyle: "filled",
  },
  {
    name: "PRO",
    monthly: 29,
    annual: 23,
    tagline: "Automatisation avancée + sécurité des contrats",
    color: "#a78bfa",
    featured: false,
    badge: null,
    items: [
      { text: "Factures illimitées", included: true },
      { text: "IA détecte les correspondances bancaires", included: true },
      { text: "Export FEC conforme DGFiP", included: true },
      { text: "Analyse de contrats (5/mois)", included: true },
      { text: "Détection des clauses à risque", included: true },
      { text: "Identification des frais cachés", included: true },
    ],
    link: `${BASE_URL}/checkout?plan=pro`,
    cta: "CHOISIR PRO",
    ctaStyle: "outline",
  },
  {
    name: "BUSINESS",
    monthly: 49,
    annual: 39,
    tagline: "Pour les entreprises sérieuses qui veulent tout contrôler",
    color: "#c084fc",
    featured: false,
    badge: null,
    items: [
      { text: "Toutes les fonctionnalités Pro incluses", included: true },
      { text: "Multi-établissements simplifié", included: true },
      { text: "Analyse de contrats illimitée", included: true },
      { text: "Résumé clair en quelques secondes", included: true },
      { text: "Historique sécurisé (RGPD)", included: true },
      { text: "Accompagnement personnalisé", included: true },
    ],
    link: `${BASE_URL}/checkout?plan=business`,
    cta: "CHOISIR BUSINESS",
    ctaStyle: "outline",
  },
];

const comparison = [
  { feature: "Factures fournisseurs/mois", gratuit: "5", starter: "100", pro: "Illimitées", business: "Illimitées" },
  { feature: "OCR smartphone", gratuit: true, starter: true, pro: true, business: true },
  { feature: "Suivi payé / impayé", gratuit: true, starter: true, pro: true, business: true },
  { feature: "Export PDF", gratuit: true, starter: true, pro: true, business: true },
  { feature: "TVA automatique", gratuit: false, starter: true, pro: true, business: true },
  { feature: "Réconciliation bancaire CSV", gratuit: false, starter: true, pro: true, business: true },
  { feature: "Alertes impayées & TVA", gratuit: false, starter: true, pro: true, business: true },
  { feature: "Export CSV", gratuit: false, starter: true, pro: true, business: true },
  { feature: "IA correspondances bancaires", gratuit: false, starter: false, pro: true, business: true },
  { feature: "Export FEC DGFiP", gratuit: false, starter: false, pro: true, business: true },
  { feature: "Analyse contrats", gratuit: false, starter: false, pro: "5/mois", business: "Illimitée" },
  { feature: "Clauses à risque détectées", gratuit: false, starter: false, pro: true, business: true },
  { feature: "Frais cachés identifiés", gratuit: false, starter: false, pro: true, business: true },
  { feature: "Multi-établissements", gratuit: false, starter: false, pro: false, business: true },
  { feature: "Résumé intelligent contrat", gratuit: false, starter: false, pro: false, business: true },
  { feature: "Historique sécurisé RGPD", gratuit: false, starter: false, pro: false, business: true },
  { feature: "Accompagnement personnalisé", gratuit: false, starter: false, pro: false, business: true },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "white", fontFamily: "'DM Sans', sans-serif" }}>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 40px", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href={BASE_URL} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5"/>
            <text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="DM Sans">I</text>
            <text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontStyle="italic">A</text>
            <circle cx="28" cy="5" r="3" fill="#818cf8"/>
          </svg>
          <span style={{ fontSize: 15, fontWeight: 700, color: "white" }}>InvoiceAgent</span>
        </a>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href={`${BASE_URL}/dashboard`} style={{ color: "#94a3b8", fontSize: 14, textDecoration: "none" }}>Dashboard</a>
          <a href={`${BASE_URL}/invoices`} style={{ color: "#94a3b8", fontSize: 14, textDecoration: "none" }}>Mes factures</a>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ padding: "72px 20px 48px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "10px", color: "white", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          CHOISISSEZ VOTRE PLAN
        </h1>
        <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "36px" }}>
          Commencez gratuitement. Passez au niveau supérieur quand vous êtes prêt.
        </p>

        {/* TOGGLE */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 0, backgroundColor: "#1e293b", borderRadius: 8, padding: 4, border: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => setAnnual(false)} style={{ padding: "8px 24px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, backgroundColor: !annual ? "white" : "transparent", color: !annual ? "#0f172a" : "#64748b", transition: "all 0.2s" }}>
            Mensuel
          </button>
          <button onClick={() => setAnnual(true)} style={{ padding: "8px 24px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, backgroundColor: annual ? "white" : "transparent", color: annual ? "#0f172a" : "#64748b", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 }}>
            Annuel
            <span style={{ backgroundColor: "#059669", color: "white", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10 }}>-20%</span>
          </button>
        </div>
      </section>

      {/* PLANS */}
      <section style={{ padding: "0 20px 80px", maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {plans.map((plan) => (
            <div key={plan.name} style={{ backgroundColor: plan.featured ? "#1a2744" : "#131c30", border: `1px solid ${plan.featured ? "#f59e0b44" : "rgba(255,255,255,0.08)"}`, borderRadius: 12, padding: "28px 24px", position: "relative", display: "flex", flexDirection: "column" }}>

              {plan.badge && (
                <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", backgroundColor: plan.badgeColor, color: plan.badgeText, fontSize: 11, fontWeight: 800, padding: "4px 16px", borderRadius: 20, whiteSpace: "nowrap", letterSpacing: "0.05em" }}>
                  {plan.badge}
                </div>
              )}

              {/* PLAN NAME */}
              <div style={{ fontSize: 12, fontWeight: 800, color: plan.color, letterSpacing: "0.15em", marginBottom: 16 }}>{plan.name}</div>

              {/* PRICE */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: "white", lineHeight: 1 }}>
                  {annual ? plan.annual : plan.monthly}
                </span>
                <span style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>
                  {plan.monthly > 0 ? "€ / mois" : "€"}
                </span>
              </div>

              {annual && plan.monthly > 0 && (
                <div style={{ fontSize: 11, color: "#475569", marginBottom: 4 }}>
                  <span style={{ textDecoration: "line-through" }}>{plan.monthly}€/mois</span>
                  <span style={{ color: "#059669", marginLeft: 6 }}>→ économisez {(plan.monthly - plan.annual) * 12}€/an</span>
                </div>
              )}

              {/* TAGLINE */}
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 24, lineHeight: 1.5, minHeight: 36 }}>{plan.tagline}</div>

              {/* ITEMS */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                {plan.items.map((item) => (
                  <div key={item.text} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: item.included ? plan.color : "#374151", flexShrink: 0, fontSize: 14, marginTop: 1 }}>
                      {item.included ? "✓" : "✕"}
                    </span>
                    <span style={{ color: item.included ? "#d1d5db" : "#4b5563", fontSize: 13, lineHeight: 1.5 }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a href={plan.link} style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "0.05em", backgroundColor: plan.featured ? plan.color : "transparent", color: plan.featured ? "#1c1917" : "#94a3b8", border: plan.featured ? "none" : "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s" }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "#334155", fontSize: 12, marginTop: 20, fontFamily: "monospace" }}>
          Sans engagement · Annulez à tout moment · Données hébergées en Europe (RGPD)
        </p>
      </section>

      {/* COMPARAISON */}
      <section style={{ padding: "0 20px 80px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 800, color: "white", marginBottom: 32, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Comparaison détaillée des plans
        </h2>
        <div style={{ backgroundColor: "#131c30", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", backgroundColor: "#1e293b", padding: "14px 20px", gap: 8 }}>
            <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Fonctionnalité</div>
            {[{ name: "Gratuit", color: "#10b981" }, { name: "Starter", color: "#f59e0b" }, { name: "Pro", color: "#a78bfa" }, { name: "Business", color: "#c084fc" }].map((p) => (
              <div key={p.name} style={{ fontSize: 12, fontWeight: 800, color: p.color, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.08em" }}>{p.name}</div>
            ))}
          </div>
          {comparison.map((row, i) => (
            <div key={row.feature} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "11px 20px", gap: 8, borderTop: "1px solid rgba(255,255,255,0.05)", backgroundColor: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)", alignItems: "center" }}>
              <div style={{ fontSize: 13, color: "#94a3b8" }}>{row.feature}</div>
              {[row.gratuit, row.starter, row.pro, row.business].map((val, j) => (
                <div key={j} style={{ textAlign: "center" }}>
                  {typeof val === "boolean" ? (
                    <span style={{ color: val ? "#10b981" : "#374151", fontSize: 15, fontWeight: 700 }}>{val ? "✓" : "✕"}</span>
                  ) : (
                    <span style={{ fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>{val}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "0 20px 100px", maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 22, fontWeight: 800, color: "white", marginBottom: 32, textTransform: "uppercase", letterSpacing: "0.05em" }}>Questions fréquentes</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { q: "Puis-je changer de plan à tout moment ?", a: "Oui. Vous pouvez passer à un plan supérieur ou inférieur à tout moment depuis votre dashboard. Le changement est immédiat." },
            { q: "Y a-t-il un engagement ?", a: "Non. Tous les plans sont sans engagement. Vous pouvez annuler à tout moment depuis votre compte." },
            { q: "Comment fonctionne la facturation annuelle ?", a: "En choisissant la facturation annuelle, vous économisez 20% sur le prix mensuel. Vous êtes facturé une fois par an en avance." },
            { q: "Mes données sont-elles sécurisées ?", a: "Oui. Toutes les données sont hébergées à Frankfurt, Allemagne (UE), conformément au RGPD. Chiffrement AES-256 en transit et au repos." },
            { q: "Que se passe-t-il si je dépasse mes limites ?", a: "Vous recevez une notification avant de dépasser votre quota mensuel. Vous pouvez alors passer au plan supérieur ou attendre le renouvellement mensuel." },
          ].map((faq, i) => (
            <div key={i} style={{ backgroundColor: "#131c30", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "20px 24px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 8 }}>{faq.q}</div>
              <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}