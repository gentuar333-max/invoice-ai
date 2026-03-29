'use client'

import { useState } from 'react'

const BASE_URL = 'https://invoiceagent.fr'

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
  { name: 'Gratuit', monthly: 0, desc: 'Pour tester', items: ['5 factures/mois', '1 analyse contrat', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer', featured: false },
  { name: 'Starter', monthly: 19, desc: 'TPE & Freelances', items: ['100 factures/mois', 'Réconciliation CSV', 'Alertes TVA', 'Export CSV+PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
  { name: 'Pro', monthly: 29, desc: 'PME & Comptables', items: ['Factures illimitées', '5 analyses contrats', 'Frais cachés détectés', 'Export FEC natif'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Essai gratuit 14 jours', featured: true },
  { name: 'Business', monthly: 49, desc: 'Cabinets', items: ['Tout Pro inclus', 'Contrats illimités', 'Multi-clients', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

type Props = {
  plans?: Plan[]
  accentColor?: string
  accentBg?: string
}

export default function PricingToggle({ plans = defaultPlans, accentColor = '#2563eb', accentBg = '#dbeafe' }: Props) {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="tarifs" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Tarifs transparents</h2>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>Sans engagement. Sans frais cachés.</p>

        {/* Toggle */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '40px', padding: '6px 20px', marginBottom: '48px' }}>
          <span style={{ fontSize: '14px', color: !annual ? '#1e293b' : '#94a3b8', fontWeight: !annual ? 700 : 400 }}>Mensuel</span>
          <div onClick={() => setAnnual(!annual)} style={{ width: '48px', height: '26px', backgroundColor: annual ? accentColor : '#e2e8f0', borderRadius: '13px', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: annual ? '25px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
          </div>
          <span style={{ fontSize: '14px', color: annual ? '#1e293b' : '#94a3b8', fontWeight: annual ? 700 : 400 }}>
            Annuel <span style={{ marginLeft: '8px', backgroundColor: accentBg, color: accentColor, fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px' }}>-20%</span>
          </span>
        </div>

        {/* Plans */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {plans.map((plan) => {
            const price = plan.monthly === 0 ? 0 : annual ? Math.round(plan.monthly * 0.8) : plan.monthly
            return (
              <div key={plan.name} style={{ backgroundColor: plan.featured ? accentColor : 'white', color: plan.featured ? 'white' : '#1e293b', padding: '24px', borderRadius: '16px', boxShadow: plan.featured ? `0 10px 25px ${accentColor}44` : '0 1px 3px rgba(0,0,0,0.1)', transform: plan.featured ? 'scale(1.05)' : 'none', position: 'relative', border: plan.featured ? 'none' : '1px solid #e2e8f0' }}>
                {plan.featured && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '4px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PLUS POPULAIRE</div>}
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '6px' }}>{plan.name}</h3>
                <div style={{ fontSize: '36px', fontWeight: 'bold', margin: '8px 0 2px' }}>{price}€<span style={{ fontSize: '13px', opacity: 0.7, fontWeight: 400 }}>/mois</span></div>
                {annual && plan.monthly > 0 && <div style={{ fontSize: '11px', color: plan.featured ? 'rgba(255,255,255,0.6)' : '#94a3b8', marginBottom: '2px', textDecoration: 'line-through' }}>{plan.monthly}€/mois</div>}
                <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '14px' }}>{plan.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '12px', lineHeight: 1.9, marginBottom: '16px' }}>
                  {plan.items.map((item) => <li key={item} style={{ color: plan.featured ? 'rgba(255,255,255,0.9)' : '#64748b' }}>✓ {item}</li>)}
                </ul>
                <a href={plan.link} style={{ display: 'block', padding: '10px', backgroundColor: plan.featured ? 'white' : 'transparent', border: plan.featured ? 'none' : '2px solid #e2e8f0', borderRadius: '8px', color: plan.featured ? accentColor : '#64748b', textDecoration: 'none', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>{plan.cta}</a>
              </div>
            )
          })}
        </div>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '20px' }}>Annulez à tout moment · Sans frais cachés · Remboursement 14 jours</p>
      </div>
    </section>
  )
}