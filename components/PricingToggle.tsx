'use client'

import { useState } from 'react'

const BASE_URL = 'https://invoiceagent.fr'

const BG = '#131f2e'
const CARD = '#1e2d40'
const BORDER = '#2e4058'
const GOLD = '#e8b84b'
const TEXT = '#ffffff'
const MUTED = '#a8c4d8'
const PURPLE = '#c084fc'
const BLUE = '#60a5fa'
const GREEN = '#4ade80'

type Plan = {
  name: string
  monthly: number
  desc: string
  items: string[]
  link: string
  cta: string
  featured: boolean
}

const defaultPlans: Plan[] = [
  {
    name: 'Gratuit', monthly: 0, desc: 'Pour commencer sans risque',
    items: ['5 factures fournisseurs/mois', 'Scan rapide via smartphone (OCR)', 'Suivi payé / impayé', 'Tableau de bord simple', 'Export PDF'],
    link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false
  },
  {
    name: 'Starter', monthly: 19, desc: 'Pour les petites entreprises qui veulent le contrôle',
    items: ['100 factures / mois', 'Calcul automatique de la TVA', 'Réconciliation bancaire (CSV)', 'Alertes factures impayées & TVA', 'Export CSV + PDF', 'Tableau de bord complet'],
    link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: true
  },
  {
    name: 'Pro', monthly: 29, desc: 'Automatisation avancée + sécurité des contrats',
    items: ['Factures illimitées', 'IA détecte les correspondances bancaires', 'Export FEC conforme DGFiP', 'Analyse de contrats (5/mois)', 'Détection des clauses à risque', 'Identification des frais cachés'],
    link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: false
  },
  {
    name: 'Business', monthly: 49, desc: 'Pour les entreprises sérieuses qui veulent tout contrôler',
    items: ['Toutes les fonctionnalités Pro incluses', 'Multi-établissements simplifié', 'Analyse de contrats illimitée', 'Résumé clair en quelques secondes', 'Historique sécurisé (RGPD)', 'Accompagnement personnalisé'],
    link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false
  },
]

const planColors = ['#a8c4d8', GOLD, BLUE, PURPLE]
const planNames = ['GRATUIT', 'STARTER', 'PRO', 'BUSINESS']

type Props = {
  plans?: Plan[]
  accentColor?: string
  accentBg?: string
}

export default function PricingToggle({ plans = defaultPlans }: Props) {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="tarifs" style={{ padding: '80px 20px', backgroundColor: BG }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: TEXT, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Tarifs transparents
          </h2>
          <p style={{ color: MUTED, fontSize: '14px', marginBottom: '28px' }}>Sans engagement. Sans frais cachés.</p>

          {/* TOGGLE */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0, backgroundColor: '#1e293b', borderRadius: 8, padding: 4, border: `1px solid ${BORDER}` }}>
            <button onClick={() => setAnnual(false)} style={{ padding: '8px 24px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, backgroundColor: !annual ? 'white' : 'transparent', color: !annual ? '#0f172a' : MUTED, transition: 'all 0.2s' }}>
              Mensuel
            </button>
            <button onClick={() => setAnnual(true)} style={{ padding: '8px 24px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, backgroundColor: annual ? 'white' : 'transparent', color: annual ? '#0f172a' : MUTED, transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}>
              Annuel
              <span style={{ backgroundColor: '#059669', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10 }}>-20%</span>
            </button>
          </div>
        </div>

        {/* PLANS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {plans.map((plan, i) => {
            const price = plan.monthly === 0 ? 0 : annual ? Math.round(plan.monthly * 0.8) : plan.monthly
            const color = planColors[i] || MUTED
            const nameUpper = planNames[i] || plan.name.toUpperCase()

            return (
              <div key={plan.name} style={{ backgroundColor: plan.featured ? `${GOLD}12` : CARD, border: `1px solid ${plan.featured ? GOLD + '60' : BORDER}`, borderRadius: 12, padding: '28px 22px', position: 'relative', display: 'flex', flexDirection: 'column' }}>

                {plan.featured && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: GOLD, color: '#0f1923', padding: '3px 14px', borderRadius: 20, fontSize: 10, fontWeight: 800, letterSpacing: 1.5, whiteSpace: 'nowrap' }}>
                    POPULAIRE
                  </div>
                )}

                {/* NAME */}
                <div style={{ fontSize: 11, fontWeight: 800, color: color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>{nameUpper}</div>

                {/* PRICE */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: TEXT, lineHeight: 1 }}>{price}</span>
                  <span style={{ fontSize: 14, color: MUTED, marginBottom: 8 }}>{plan.monthly > 0 ? '€ / mois' : '€'}</span>
                </div>

                {annual && plan.monthly > 0 && (
                  <div style={{ fontSize: 11, color: '#475569', marginBottom: 4 }}>
                    <span style={{ textDecoration: 'line-through' }}>{plan.monthly}€/mois</span>
                    <span style={{ color: '#059669', marginLeft: 6 }}>→ économisez {(plan.monthly - price) * 12}€/an</span>
                  </div>
                )}

                {/* DESC */}
                <div style={{ fontSize: 12, color: MUTED, marginBottom: 20, lineHeight: 1.5, minHeight: 32 }}>{plan.desc}</div>

                {/* ITEMS */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                  {plan.items.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: GREEN, fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ color: '#d1d5db', fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href={plan.link} style={{ display: 'block', textAlign: 'center', padding: '11px', borderRadius: 6, fontSize: 11, fontWeight: 800, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', backgroundColor: plan.featured ? GOLD : 'transparent', color: plan.featured ? '#0f1923' : color, border: plan.featured ? 'none' : `1px solid ${color}60`, transition: 'all 0.2s' }}>
                  {plan.cta}
                </a>
              </div>
            )
          })}
        </div>

        <p style={{ textAlign: 'center', color: '#334155', fontSize: 12, marginTop: 20, fontFamily: 'monospace' }}>
          Sans engagement · Annulez à tout moment · Données hébergées en Europe (RGPD)
        </p>
      </div>
    </section>
  )
}