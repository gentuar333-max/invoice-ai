'use client'

import { useState } from 'react'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'

const faqs = [
  { q: "Puis-je changer de plan à tout moment ?", a: "Oui. Vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre dashboard. Le changement est effectif immédiatement et la facturation est ajustée au prorata." },
  { q: "Y a-t-il un engagement minimum ?", a: "Non. Tous les plans sont sans engagement. Vous pouvez annuler à tout moment, sans frais ni pénalité. En cas d'annulation, votre accès reste actif jusqu'à la fin de la période payée." },
  { q: "Le plan gratuit est-il vraiment gratuit ?", a: "Oui, totalement gratuit et sans carte bancaire requise. Le plan gratuit inclut 5 extractions de factures par mois, 1 analyse de contrat et le dashboard complet — sans limite de durée." },
  { q: "Que se passe-t-il si je dépasse ma limite de factures ?", a: "Vous recevez une notification lorsque vous atteignez 80% de votre quota. Vous pouvez upgrader votre plan à tout moment. Au-delà de la limite, les nouvelles extractions sont suspendues jusqu'au mois suivant ou jusqu'à l'upgrade." },
  { q: "L'export FEC est-il inclus dans tous les plans ?", a: "Non. L'export FEC (Fichier des Écritures Comptables) conforme DGFiP est disponible à partir du plan Pro à 29€/mois. Les plans Gratuit et Starter proposent l'export CSV et PDF." },
  { q: "Comment fonctionne la remise annuelle ?", a: "En choisissant la facturation annuelle, vous bénéficiez de 20% de remise sur tous les plans payants. La remise est appliquée immédiatement et vous êtes facturé pour 12 mois en une seule fois." },
  { q: "Puis-je obtenir une facture pour ma comptabilité ?", a: "Oui. Une facture détaillée est émise automatiquement à chaque renouvellement et disponible dans votre dashboard. Elle inclut votre numéro de TVA intracommunautaire si applicable." },
  { q: "Proposez-vous des tarifs pour les cabinets comptables ?", a: "Oui. Le plan Business à 49€/mois (ou 39€/mois en annuel) est conçu pour les cabinets avec FEC multi-clients illimité, analyses de contrats illimitées et support prioritaire dédié." },
]

const features = [
  { label: 'Extractions factures PDF/mois', gratuit: '5', starter: '100', pro: 'Illimitées', business: 'Illimitées' },
  { label: 'OCR photo smartphone', gratuit: '✓', starter: '✓', pro: '✓', business: '✓' },
  { label: 'Détection doublons', gratuit: '✓', starter: '✓', pro: '✓', business: '✓' },
  { label: 'Dashboard complet', gratuit: '✓', starter: '✓', pro: '✓', business: '✓' },
  { label: 'Export PDF', gratuit: '✓', starter: '✓', pro: '✓', business: '✓' },
  { label: 'Réconciliation bancaire CSV', gratuit: '—', starter: '✓', pro: '✓', business: '✓' },
  { label: 'Alertes TVA mensuelles', gratuit: '—', starter: '✓', pro: '✓', business: '✓' },
  { label: 'Alertes factures impayées', gratuit: '—', starter: '✓', pro: '✓', business: '✓' },
  { label: 'Export CSV comptable', gratuit: '—', starter: '✓', pro: '✓', business: '✓' },
  { label: 'Matching bancaire IA avancé', gratuit: '—', starter: '—', pro: '✓', business: '✓' },
  { label: 'Score de confiance IA', gratuit: '—', starter: '—', pro: '✓', business: '✓' },
  { label: 'Analyses contrats PDF/mois', gratuit: '1', starter: '—', pro: '5', business: 'Illimitées' },
  { label: 'Clauses à risque détectées', gratuit: '—', starter: '—', pro: '✓', business: '✓' },
  { label: 'Frais cachés identifiés', gratuit: '—', starter: '—', pro: '✓', business: '✓' },
  { label: 'Pénalités contrats détectées', gratuit: '—', starter: '—', pro: '✓', business: '✓' },
  { label: 'Export FEC natif DGFiP', gratuit: '—', starter: '—', pro: '✓', business: '✓' },
  { label: 'Compatible Sage, EBP, Cegid', gratuit: '—', starter: '—', pro: '✓', business: '✓' },
  { label: 'Gestion multi-clients', gratuit: '—', starter: '—', pro: '—', business: '✓' },
  { label: 'FEC multi-clients illimité', gratuit: '—', starter: '—', pro: '—', business: '✓' },
  { label: 'Audit trail RGPD complet', gratuit: '—', starter: '—', pro: '—', business: '✓' },
  { label: 'Support prioritaire dédié', gratuit: '—', starter: '—', pro: '—', business: '✓' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  const plans = [
    { key: 'gratuit', name: 'Gratuit', monthly: 0, desc: 'Pour découvrir', color: '#64748b', link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement' },
    { key: 'starter', name: 'Starter', monthly: 19, desc: 'Freelances & TPE', color: '#2563eb', link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter' },
    { key: 'pro', name: 'Pro', monthly: 29, desc: 'PME & Comptables', color: '#7c3aed', link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: true },
    { key: 'business', name: 'Business', monthly: 49, desc: 'Cabinets comptables', color: '#292524', link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business' },
  ]

  return (
    <>
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ backgroundColor: 'white', padding: '80px 20px 60px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace', color: '#64748b' }}>
              Sans engagement · Sans frais cachés · Annulez à tout moment
            </div>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px', lineHeight: 1.1 }}>
              Tarifs simples et transparents
            </h1>
            <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px' }}>
              Commencez gratuitement. Évoluez selon vos besoins.
            </p>

            {/* TOGGLE */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '40px', padding: '6px 24px' }}>
              <span style={{ fontSize: '14px', color: !annual ? '#1e293b' : '#94a3b8', fontWeight: !annual ? 700 : 400 }}>Mensuel</span>
              <div onClick={() => setAnnual(!annual)} style={{ width: '48px', height: '26px', backgroundColor: annual ? '#2563eb' : '#cbd5e1', borderRadius: '13px', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: annual ? '25px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
              <span style={{ fontSize: '14px', color: annual ? '#1e293b' : '#94a3b8', fontWeight: annual ? 700 : 400 }}>
                Annuel
                <span style={{ marginLeft: '8px', backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px' }}>-20%</span>
              </span>
            </div>
          </div>
        </section>

        {/* PLANS */}
        <section style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {plans.map((plan) => {
              const price = plan.monthly === 0 ? 0 : annual ? Math.round(plan.monthly * 0.8) : plan.monthly
              return (
                <div key={plan.key} style={{ backgroundColor: plan.featured ? '#1e293b' : 'white', borderRadius: '20px', padding: '36px 28px', border: plan.featured ? 'none' : '1px solid #e2e8f0', boxShadow: plan.featured ? '0 20px 40px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.06)', position: 'relative', transform: plan.featured ? 'scale(1.03)' : 'none' }}>
                  {plan.featured && (
                    <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#7c3aed', color: 'white', padding: '5px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      PLUS POPULAIRE
                    </div>
                  )}
                  <div style={{ fontSize: '13px', fontWeight: 700, color: plan.featured ? 'rgba(255,255,255,0.5)' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{plan.name}</div>
                  <div style={{ fontSize: '48px', fontWeight: 900, color: plan.featured ? 'white' : '#1e293b', lineHeight: 1, marginBottom: '4px' }}>
                    {price}€
                  </div>
                  {annual && plan.monthly > 0 && (
                    <div style={{ fontSize: '13px', color: plan.featured ? 'rgba(255,255,255,0.4)' : '#94a3b8', textDecoration: 'line-through', marginBottom: '4px' }}>{plan.monthly}€/mois</div>
                  )}
                  <div style={{ fontSize: '13px', color: plan.featured ? 'rgba(255,255,255,0.5)' : '#94a3b8', marginBottom: '4px' }}>/mois {annual && plan.monthly > 0 ? '— facturé annuellement' : ''}</div>
                  <div style={{ fontSize: '13px', color: plan.featured ? 'rgba(255,255,255,0.6)' : '#64748b', marginBottom: '28px' }}>{plan.desc}</div>
                  <a href={plan.link} style={{ display: 'block', textAlign: 'center', padding: '13px', backgroundColor: plan.featured ? '#7c3aed' : 'transparent', border: plan.featured ? 'none' : `2px solid ${plan.color}`, borderRadius: '10px', color: plan.featured ? 'white' : plan.color, textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>
                    {plan.cta}
                  </a>
                </div>
              )
            })}
          </div>
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '13px', marginTop: '24px' }}>
            Remboursement 14 jours · Annulez à tout moment · Données RGPD hébergées en Europe
          </p>
        </section>

        {/* TABLEAU COMPARATIF */}
        <section style={{ padding: '0 20px 80px', maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px', textAlign: 'center' }}>
            Comparaison détaillée des plans
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '40px', fontSize: '15px' }}>
            Toutes les fonctionnalités, plan par plan.
          </p>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '13px', color: '#64748b', fontWeight: 600, borderBottom: '1px solid #e2e8f0', width: '35%' }}>Fonctionnalité</th>
                  {plans.map((p) => (
                    <th key={p.key} style={{ padding: '16px 12px', textAlign: 'center', fontSize: '14px', color: p.featured ? '#7c3aed' : '#1e293b', fontWeight: 700, borderBottom: '1px solid #e2e8f0', backgroundColor: p.featured ? '#faf5ff' : 'transparent' }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((f, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                    <td style={{ padding: '13px 20px', fontSize: '14px', color: '#475569', borderBottom: '1px solid #f1f5f9', fontWeight: 500 }}>{f.label}</td>
                    {(['gratuit', 'starter', 'pro', 'business'] as const).map((key) => {
                      const plan = plans.find(p => p.key === key)!
                      const val = f[key]
                      const isCheck = val === '✓'
                      const isDash = val === '—'
                      return (
                        <td key={key} style={{ padding: '13px 12px', textAlign: 'center', fontSize: '14px', borderBottom: '1px solid #f1f5f9', backgroundColor: plan.featured ? '#fdf9ff' : 'transparent' }}>
                          {isCheck ? <span style={{ color: '#059669', fontWeight: 700, fontSize: '16px' }}>✓</span>
                            : isDash ? <span style={{ color: '#cbd5e1' }}>—</span>
                            : <span style={{ color: '#1e293b', fontWeight: 600 }}>{val}</span>}
                        </td>
                      )
                    })}
                  </tr>
                ))}
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <td style={{ padding: '20px' }} />
                  {plans.map((plan) => {
                    const price = plan.monthly === 0 ? 0 : annual ? Math.round(plan.monthly * 0.8) : plan.monthly
                    return (
                      <td key={plan.key} style={{ padding: '20px 12px', textAlign: 'center', backgroundColor: plan.featured ? '#faf5ff' : 'transparent' }}>
                        <a href={plan.link} style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: plan.featured ? '#7c3aed' : 'transparent', border: plan.featured ? 'none' : `2px solid ${plan.color}`, borderRadius: '8px', color: plan.featured ? 'white' : plan.color, textDecoration: 'none', fontWeight: 700, fontSize: '13px' }}>
                          {price === 0 ? 'Gratuit' : `${price}€/mois`}
                        </a>
                      </td>
                    )
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '0 20px 80px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px', textAlign: 'center' }}>
            Questions fréquentes sur les tarifs
          </h2>
          <FAQAccordion faqs={faqs} />
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Commencez gratuitement aujourd'hui</h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.8 }}>5 factures gratuites — sans carte bancaire, sans engagement.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
            Créer un compte gratuit
          </a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}