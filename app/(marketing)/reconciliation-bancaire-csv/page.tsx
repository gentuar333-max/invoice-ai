'use client'

import { useState } from 'react'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/reconciliation-bancaire-csv`

// ─── PRICING TOGGLE COMPONENT ────────────────────────────────────────────────
function PricingSection() {
  const [annual, setAnnual] = useState(false)

  const plans = [
    {
      name: 'Gratuit', monthly: 0, desc: 'Pour découvrir',
      items: ['5 factures/mois', '1 rapprochement/mois', 'Dashboard complet', 'Export PDF'],
      link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false
    },
    {
      name: 'Starter', monthly: 19, desc: 'Freelances & TPE',
      items: ['100 factures/mois', 'Import CSV toutes banques', 'Rapprochement auto', 'Alertes TVA', 'Export CSV + PDF'],
      link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false
    },
    {
      name: 'Pro', monthly: 29, desc: 'PME & Comptables',
      items: ['Tout Starter inclus', 'IA matching bancaire avancé', 'Score de confiance', '5 analyses contrats/mois', 'Export FEC natif'],
      link: `${BASE_URL}/checkout?plan=pro`, cta: 'Essai gratuit 14 jours', featured: true
    },
    {
      name: 'Business', monthly: 49, desc: 'Cabinets comptables',
      items: ['Tout Pro inclus', 'Contrats illimités', 'Multi-clients', 'Audit trail RGPD', 'Support prioritaire'],
      link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false
    },
  ]

  return (
    <section id="tarifs" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
          Tarifs simples et transparents
        </h2>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>Sans engagement. Plan gratuit disponible.</p>

        {/* TOGGLE */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '40px', padding: '6px 20px', marginBottom: '48px' }}>
          <span style={{ fontSize: '14px', color: !annual ? '#1e293b' : '#94a3b8', fontWeight: !annual ? 700 : 400 }}>Mensuel</span>
          <div
            onClick={() => setAnnual(!annual)}
            style={{ width: '48px', height: '26px', backgroundColor: annual ? '#2563eb' : '#e2e8f0', borderRadius: '13px', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}
          >
            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: annual ? '25px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
          </div>
          <span style={{ fontSize: '14px', color: annual ? '#1e293b' : '#94a3b8', fontWeight: annual ? 700 : 400 }}>
            Annuel
            <span style={{ marginLeft: '8px', backgroundColor: '#dcfce7', color: '#15803d', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px' }}>-20%</span>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {plans.map((plan) => {
            const price = plan.monthly === 0 ? 0 : annual ? Math.round(plan.monthly * 0.8) : plan.monthly
            return (
              <div key={plan.name} style={{ backgroundColor: plan.featured ? '#2563eb' : 'white', color: plan.featured ? 'white' : '#1e293b', padding: '28px', borderRadius: '16px', boxShadow: plan.featured ? '0 10px 25px rgba(37,99,235,0.3)' : '0 1px 3px rgba(0,0,0,0.1)', transform: plan.featured ? 'scale(1.05)' : 'none', position: 'relative', border: plan.featured ? 'none' : '1px solid #e2e8f0' }}>
                {plan.featured && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '4px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PLUS POPULAIRE</div>}
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{plan.name}</h3>
                <div style={{ fontSize: '40px', fontWeight: 'bold', margin: '12px 0 4px' }}>
                  {price === 0 ? '0' : price}€
                  <span style={{ fontSize: '14px', opacity: 0.7, fontWeight: 400 }}>/mois</span>
                </div>
                {annual && plan.monthly > 0 && (
                  <div style={{ fontSize: '12px', color: plan.featured ? 'rgba(255,255,255,0.7)' : '#94a3b8', marginBottom: '4px', textDecoration: 'line-through' }}>{plan.monthly}€/mois</div>
                )}
                <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '16px' }}>{plan.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '13px', lineHeight: 2, marginBottom: '20px' }}>
                  {plan.items.map((item) => <li key={item} style={{ color: plan.featured ? 'rgba(255,255,255,0.9)' : '#64748b' }}>✓ {item}</li>)}
                </ul>
                <a href={plan.link} style={{ display: 'block', padding: '11px', backgroundColor: plan.featured ? 'white' : 'transparent', border: plan.featured ? 'none' : '2px solid #e2e8f0', borderRadius: '8px', color: plan.featured ? '#2563eb' : '#64748b', textDecoration: 'none', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>{plan.cta}</a>
              </div>
            )
          })}
        </div>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '24px' }}>
          ✓ Annulez à tout moment · ✓ Sans frais cachés · ✓ Remboursement 14 jours
        </p>
      </div>
    </section>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function ReconciliationBancaireCSVPage() {
  return (
    <>
      <SharedNav />

      <main>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Compatible BNP · SG · Crédit Agricole · LCL · CIC · Boursorama
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Réconciliation bancaire CSV <span style={{ color: '#fbbf24' }}>automatique</span> par IA
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '16px', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 16px' }}>
              Importez votre relevé bancaire CSV. InvoiceAgent rapproche automatiquement chaque transaction avec vos factures — en quelques secondes, sans saisie manuelle.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
              Les PME françaises perdent en moyenne <strong style={{ color: '#fbbf24' }}>2 jours par mois</strong> sur la réconciliation bancaire manuelle.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
                Tester gratuitement →
              </a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
                Voir les tarifs
              </a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
              <span>✓ Gratuit jusqu'à 1 rapprochement/mois</span>
              <span>✓ Sans carte bancaire</span>
              <span>✓ RGPD — données en Europe</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '2 jours', label: 'Économisés par mois', sub: 'vs réconciliation manuelle' },
              { value: '95%', label: 'Taux de matching', sub: 'sur transactions françaises' },
              { value: '< 30s', label: 'Traitement CSV', sub: 'quel que soit le volume' },
              { value: '12+', label: 'Banques supportées', sub: 'BNP, SG, CA, LCL, CIC...' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#059669' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" style={{ padding: '80px 20px', backgroundColor: '#ecfdf5' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: '#059669', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>
                ✦ Démo gratuite — sans inscription
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
                Testez le rapprochement en direct
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                Importez une facture ou un contrat — voyez l'analyse IA en quelques secondes.
              </p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* COMMENT CA MARCHE */}
        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Comment fonctionne la réconciliation bancaire CSV ?
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>Trois étapes. Aucune configuration requise.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {[
                { n: '01', color: '#059669', title: 'Exportez votre relevé CSV', desc: "Depuis votre banque (BNP, Société Générale, Crédit Agricole, LCL, CIC, Boursorama...), exportez votre relevé de compte au format CSV. Toutes les banques françaises sont compatibles.", icon: '🏦' },
                { n: '02', color: '#2563eb', title: "L'IA rapproche automatiquement", desc: "InvoiceAgent compare chaque transaction bancaire avec vos factures enregistrées. L'IA identifie les correspondances par montant, date et libellé, avec un score de confiance.", icon: '🤖' },
                { n: '03', color: '#7c3aed', title: 'Validez et exportez', desc: "Consultez les rapprochements suggérés, validez ou corrigez, puis exportez le rapport final en CSV ou PDF pour votre comptable. Alertes automatiques sur les factures impayées.", icon: '✅' },
              ].map((step) => (
                <article key={step.n} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: step.color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>{step.n}</div>
                    <span style={{ fontSize: '24px' }}>{step.icon}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BANQUES COMPATIBLES */}
        <section style={{ padding: '64px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Compatible avec toutes les banques françaises
            </h2>
            <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '15px' }}>
              Exportez votre relevé CSV depuis votre espace bancaire et importez-le en un clic.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {['BNP Paribas', 'Société Générale', 'Crédit Agricole', 'LCL', 'CIC', 'Boursorama', 'La Banque Postale', 'Crédit Mutuel', 'HSBC France', 'Fortuneo', 'Hello Bank', 'N26'].map((bank) => (
                <div key={bank} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>{bank}</div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARAISON CONCURRENTS */}
        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              InvoiceAgent vs la concurrence
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px', fontSize: '16px' }}>
              Pourquoi choisir InvoiceAgent pour votre réconciliation bancaire ?
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th style={{ padding: '16px', textAlign: 'left', color: '#64748b', fontWeight: 600, borderBottom: '2px solid #e2e8f0' }}>Fonctionnalité</th>
                    {['InvoiceAgent', 'Sage', 'EBP', 'QuickBooks'].map((col) => (
                      <th key={col} style={{ padding: '16px', textAlign: 'center', color: col === 'InvoiceAgent' ? '#059669' : '#64748b', fontWeight: col === 'InvoiceAgent' ? 700 : 600, borderBottom: '2px solid #e2e8f0', backgroundColor: col === 'InvoiceAgent' ? '#ecfdf5' : 'transparent' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Import CSV automatique', vals: ['✅', '✅', '✅', '✅'] },
                    { feature: 'Matching IA par libellé', vals: ['✅', '❌', '❌', '⚠️ Partiel'] },
                    { feature: 'Score de confiance IA', vals: ['✅', '❌', '❌', '❌'] },
                    { feature: 'Extraction factures PDF', vals: ['✅', '⚠️ Module payant', '⚠️ Module payant', '⚠️ Limité'] },
                    { feature: 'Analyse contrats IA', vals: ['✅', '❌', '❌', '❌'] },
                    { feature: 'Export FEC natif', vals: ['✅', '✅', '✅', '❌'] },
                    { feature: 'Prix de départ', vals: ['0€/mois', '25€/mois', '20€/mois', '25€/mois'] },
                    { feature: 'Setup sans installation', vals: ['✅', '❌', '❌', '✅'] },
                    { feature: 'Conforme RGPD EU', vals: ['✅', '✅', '✅', '⚠️ USA'] },
                  ].map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ padding: '14px 16px', color: '#1e293b', fontWeight: 500, borderBottom: '1px solid #f1f5f9' }}>{row.feature}</td>
                      {row.vals.map((val, j) => (
                        <td key={j} style={{ padding: '14px 16px', textAlign: 'center', borderBottom: '1px solid #f1f5f9', backgroundColor: j === 0 ? '#ecfdf5' : 'transparent', fontWeight: j === 0 ? 600 : 400, color: j === 0 ? '#059669' : '#475569' }}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '12px', marginTop: '16px' }}>
              Comparaison basée sur les offres publiques — Mars 2026
            </p>
          </div>
        </section>

        {/* AVANTAGES */}
        <section style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
              Pourquoi automatiser la réconciliation ?
            </h2>
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '40px', textAlign: 'left' }}>
              {[
                'Rapprochement complet en moins de 30 secondes',
                '95% de matching automatique sans intervention',
                'Alertes immédiates sur factures impayées',
                'Score de confiance IA pour chaque correspondance',
                'Export rapport comptable en 1 clic',
                'Compatible toutes banques françaises',
                'Données hébergées en Europe — RGPD',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'center' }}>
                  <span style={{ color: '#22c55e', flexShrink: 0, fontSize: '18px' }}>✓</span>
                  <p style={{ color: '#14532d', fontSize: '15px', margin: 0, fontWeight: 500 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING avec toggle */}
        <PricingSection />

        {/* FAQ */}
        <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes
            </h2>
            {[
              { q: "Comment exporter mon relevé bancaire en CSV ?", a: "Connectez-vous à votre espace bancaire en ligne, rendez-vous dans l'historique de vos transactions et cherchez l'option 'Exporter' ou 'Télécharger'. Choisissez le format CSV. Toutes les grandes banques françaises (BNP, SG, CA, LCL, CIC) proposent cette fonctionnalité." },
              { q: "Comment fonctionne le matching automatique ?", a: "InvoiceAgent compare chaque transaction de votre relevé CSV avec vos factures enregistrées. L'IA analyse le montant, la date et le libellé bancaire pour identifier les correspondances. Un score de confiance (0-100%) est attribué à chaque rapprochement." },
              { q: "Que se passe-t-il si une transaction ne correspond à aucune facture ?", a: "Les transactions non rapprochées sont clairement identifiées dans votre dashboard. Vous pouvez les associer manuellement à une facture existante ou les marquer comme dépense non facturée." },
              { q: "La réconciliation bancaire est-elle conforme RGPD ?", a: "Oui. Vos données bancaires sont hébergées à Frankfurt, Allemagne (UE) et ne sont jamais partagées avec des tiers. Vos relevés CSV sont chiffrés en transit et au repos." },
              { q: "Puis-je exporter le rapport de réconciliation pour mon comptable ?", a: "Oui. Le rapport de réconciliation est exportable en CSV et PDF. Le plan Pro inclut l'export FEC (Fichier des Écritures Comptables) compatible Sage, EBP et Cegid." },
              { q: "Combien coûte la réconciliation bancaire automatique ?", a: "Le plan gratuit inclut 1 rapprochement par mois. Le plan Starter (19€/mois ou 15€/mois en annuel) inclut des rapprochements illimités. Le plan Pro (29€/mois ou 23€/mois en annuel) ajoute le matching IA avancé et l'export FEC." },
            ].map((faq, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '24px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#059669', textDecoration: 'none', fontWeight: 500 }}>
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
            Prêt à automatiser votre réconciliation bancaire ?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.9 }}>
            Commencez gratuitement — sans carte bancaire.
          </p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
            Tester gratuitement →
          </a>
          <p style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>
            Sans engagement · RGPD conforme · Annulez à tout moment
          </p>
        </section>

      </main>

      <SharedFooter />
    </>
  )
}