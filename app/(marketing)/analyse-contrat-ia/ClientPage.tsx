'use client'

import { useState } from 'react'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/analyse-contrat-ia`

function PricingSection() {
  const [annual, setAnnual] = useState(false)
  const plans = [
    {
      name: 'Gratuit', monthly: 0, desc: 'Pour découvrir',
      items: [
        '5 extractions de factures PDF/mois',
        '1 analyse de contrat offerte',
        'Détection des montants HT, TVA, TTC',
        'Dashboard et export PDF',
      ],
      link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false
    },
    {
      name: 'Starter', monthly: 19, desc: 'Freelances & TPE',
      items: [
        '100 factures/mois extraites par IA',
        'Réconciliation bancaire CSV automatique',
        'Alertes TVA et factures impayées',
        'Détection des pénalités de retard',
        'Export CSV + PDF pour comptable',
      ],
      link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false
    },
    {
      name: 'Pro', monthly: 29, desc: 'PME & Comptables',
      items: [
        'Tout Starter inclus',
        '5 analyses de contrats PDF/mois',
        'Clauses à risque classées Haut / Moyen / Faible',
        'Frais cachés et pénalités identifiés',
        'Dates de reconduction tacite détectées',
        'Export FEC natif — compatible Sage, EBP',
      ],
      link: `${BASE_URL}/checkout?plan=pro`, cta: 'Essai gratuit 14 jours', featured: true
    },
    {
      name: 'Business', monthly: 49, desc: 'Cabinets & DAF',
      items: [
        'Tout Pro inclus',
        'Analyses de contrats illimitées',
        'Contrats jusqu\'à 100 pages analysés',
        'Rapport exportable par client',
        'Audit trail RGPD complet',
        'Support prioritaire dédié',
      ],
      link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false
    },
  ]
  return (
    <section id="tarifs" style={{ padding: '80px 20px', backgroundColor: '#faf5ff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Tarifs simples et transparents</h2>
        <p style={{ color: '#64748b', marginBottom: '32px' }}>Sans engagement. Plan gratuit disponible.</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '40px', padding: '6px 20px', marginBottom: '48px' }}>
          <span style={{ fontSize: '14px', color: !annual ? '#1e293b' : '#94a3b8', fontWeight: !annual ? 700 : 400 }}>Mensuel</span>
          <div onClick={() => setAnnual(!annual)} style={{ width: '48px', height: '26px', backgroundColor: annual ? '#7c3aed' : '#e2e8f0', borderRadius: '13px', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: annual ? '25px' : '3px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
          </div>
          <span style={{ fontSize: '14px', color: annual ? '#1e293b' : '#94a3b8', fontWeight: annual ? 700 : 400 }}>
            Annuel <span style={{ marginLeft: '8px', backgroundColor: '#ede9fe', color: '#7c3aed', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px' }}>-20%</span>
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {plans.map((plan) => {
            const price = plan.monthly === 0 ? 0 : annual ? Math.round(plan.monthly * 0.8) : plan.monthly
            return (
              <div key={plan.name} style={{ backgroundColor: plan.featured ? '#7c3aed' : 'white', color: plan.featured ? 'white' : '#1e293b', padding: '28px', borderRadius: '16px', boxShadow: plan.featured ? '0 10px 25px rgba(124,58,237,0.3)' : '0 1px 3px rgba(0,0,0,0.1)', transform: plan.featured ? 'scale(1.05)' : 'none', position: 'relative', border: plan.featured ? 'none' : '1px solid #e2e8f0' }}>
                {plan.featured && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '4px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PLUS POPULAIRE</div>}
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{plan.name}</h3>
                <div style={{ fontSize: '40px', fontWeight: 'bold', margin: '12px 0 4px' }}>{price}€<span style={{ fontSize: '14px', opacity: 0.7, fontWeight: 400 }}>/mois</span></div>
                {annual && plan.monthly > 0 && <div style={{ fontSize: '12px', color: plan.featured ? 'rgba(255,255,255,0.6)' : '#94a3b8', marginBottom: '4px', textDecoration: 'line-through' }}>{plan.monthly}€/mois</div>}
                <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '16px' }}>{plan.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '13px', lineHeight: 2, marginBottom: '20px' }}>
                  {plan.items.map((item) => <li key={item} style={{ color: plan.featured ? 'rgba(255,255,255,0.9)' : '#64748b' }}>✓ {item}</li>)}
                </ul>
                <a href={plan.link} style={{ display: 'block', padding: '11px', backgroundColor: plan.featured ? 'white' : 'transparent', border: plan.featured ? 'none' : '2px solid #e2e8f0', borderRadius: '8px', color: plan.featured ? '#7c3aed' : '#64748b', textDecoration: 'none', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>{plan.cta}</a>
              </div>
            )
          })}
        </div>
        <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '24px' }}>✓ Annulez à tout moment · ✓ Sans frais cachés · ✓ Remboursement 14 jours</p>
      </div>
    </section>
  )
}

export default function AnalyseContratIAPage() {
  return (
    <>
      <SharedNav />
      <main>

        {/* HERO — violet */}
        <section style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              IA Gemini · Détection clauses risque · Résultat en 10 secondes
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Analyse contrat IA — détectez les <span style={{ color: '#fbbf24' }}>clauses à risque</span>
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '16px', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 16px' }}>
              Téléchargez votre contrat PDF. L'IA identifie en secondes les clauses dangereuses, les frais cachés et les dates d'échéance critiques — avant que vous ne signiez.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
              70% des litiges commerciaux viennent de clauses mal lues ou ignorées dans les contrats fournisseurs.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Analyser un contrat gratuitement →</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
              <span>✓ 1 analyse gratuite sans inscription</span>
              <span>✓ Sans carte bancaire</span>
              <span>✓ RGPD — données en Europe</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '< 10s', label: 'Analyse complète', sub: 'par contrat PDF' },
              { value: '3 niveaux', label: 'De risque détectés', sub: 'Haut, Moyen, Faible' },
              { value: '70%', label: 'Des litiges', sub: 'viennent de clauses ignorées' },
              { value: '100%', label: 'Confidentiel', sub: 'données hébergées en EU' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#7c3aed' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO — dark indigo pour se démarquer */}
        <section id="demo" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.3)' }}>
                Demo gratuite — sans inscription
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                Analysez votre contrat maintenant
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>
                Téléchargez un contrat PDF — l'IA détecte les clauses à risque en 10 secondes.
              </p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* COMMENT CA MARCHE */}
        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Comment fonctionne l'analyse de contrat par IA ?
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>Trois étapes. Dix secondes. Zéro risque ignoré.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {[
                { n: '01', color: '#7c3aed', title: 'Importez votre contrat PDF', desc: "Téléchargez votre contrat fournisseur, bail commercial, CGV ou tout autre accord PDF. InvoiceAgent accepte les contrats jusqu'à 50 pages." },
                { n: '02', color: '#dc2626', title: "L'IA identifie les risques", desc: "L'IA Gemini analyse chaque clause et identifie : clauses pénalisantes, frais cachés, conditions de résiliation abusives, reconductions tacites et dates critiques." },
                { n: '03', color: '#059669', title: 'Recevez votre rapport', desc: "Un rapport clair avec toutes les clauses à risque classées par niveau (Haut, Moyen, Faible), un résumé exécutif et les dates d'échéance à surveiller." },
              ].map((step) => (
                <article key={step.n} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: step.color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}>{step.n}</div>
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CLAUSES DETECTEES */}
        <section style={{ padding: '80px 20px', backgroundColor: '#faf5ff' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>Quelles clauses sont détectées ?</h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>InvoiceAgent analyse chaque section de votre contrat.</p>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {[
                { category: 'Risque élevé', color: '#dc2626', bg: '#fff1f2', border: '#fecaca', fields: ['Clause pénalité de retard excessive', 'Reconduction tacite sans préavis', 'Résiliation abusive unilatérale', 'Exclusivité non négociée'] },
                { category: 'Risque moyen', color: '#d97706', bg: '#fffbeb', border: '#fde68a', fields: ['Frais cachés en annexe', 'Indexation prix non plafonnée', 'Limitation de responsabilité', 'Clause de révision tarifaire'] },
                { category: 'Risque faible', color: '#059669', bg: '#f0fdf4', border: '#bbf7d0', fields: ['Conditions de paiement standards', 'Durée initiale du contrat', 'Clause de confidentialité', 'Droit applicable et juridiction'] },
                { category: 'Dates critiques', color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', fields: ["Date de début et fin du contrat", "Préavis de résiliation", "Reconduction automatique", "Échéances de paiement"] },
              ].map((cat) => (
                <article key={cat.category} style={{ backgroundColor: cat.bg, borderRadius: '14px', padding: '28px', border: `1px solid ${cat.border}` }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: cat.color, marginBottom: '16px' }}>{cat.category}</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cat.fields.map((field) => (
                      <li key={field} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: '#475569', padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ color: cat.color, flexShrink: 0 }}>→</span>
                        {field}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* POUR QUI */}
        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Pour qui est l'analyse de contrat IA ?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Dirigeants PME', desc: "Vérifiez vos contrats fournisseurs avant signature sans attendre votre avocat." },
                { title: 'DAF & Juristes', desc: "Pré-analysez les contrats et gagnez du temps sur la revue juridique." },
                { title: 'Artisans & TPE', desc: "Comprenez vos contrats de sous-traitance et évitez les mauvaises surprises." },
                { title: 'Experts-comptables', desc: "Analysez les contrats de vos clients et identifiez les risques financiers." },
              ].map((p) => (
                <div key={p.title} style={{ backgroundColor: '#faf5ff', padding: '28px', borderRadius: '12px', border: '1px solid #ede9fe' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <PricingSection />

        {/* FAQ */}
        <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Questions fréquentes</h2>
            {[
              { q: "L'IA peut-elle analyser tous les types de contrats ?", a: "Oui. InvoiceAgent analyse les contrats fournisseurs, baux commerciaux, CGV, accords de sous-traitance, contrats de prestation de service et tout autre document contractuel en PDF jusqu'à 50 pages." },
              { q: "L'analyse remplace-t-elle un avocat ?", a: "Non. L'analyse IA est un outil d'aide à la décision qui identifie les points d'attention. Pour les contrats complexes ou à enjeux élevés, nous recommandons toujours une validation par un professionnel du droit." },
              { q: "Quelle est la précision de la détection des clauses ?", a: "L'IA Gemini identifie les clauses types avec une très bonne précision sur les contrats français standards. Les clauses détectées sont présentées avec un niveau de confiance et une explication claire." },
              { q: "Mes contrats sont-ils confidentiels ?", a: "Oui. Vos contrats sont chiffrés en transit et stockés sur des serveurs à Frankfurt (UE). Ils ne sont jamais utilisés pour entraîner des modèles IA tiers et peuvent être supprimés à tout moment." },
              { q: "Combien de contrats puis-je analyser ?", a: "Le plan gratuit inclut 1 analyse de contrat. Le plan Pro (29€/mois ou 23€/mois en annuel) inclut 5 analyses/mois. Le plan Business (49€/mois ou 39€/mois en annuel) offre des analyses illimitées." },
              { q: "Puis-je exporter le rapport d'analyse ?", a: "Oui. Le rapport d'analyse est exportable en PDF avec toutes les clauses identifiées, les niveaux de risque et les recommandations. Disponible dès le plan Pro." },
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
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#7c3aed', textDecoration: 'none', fontWeight: 500 }}>
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Prêt à protéger votre entreprise ?</h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.9 }}>Analysez votre premier contrat gratuitement — sans carte bancaire.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
            Analyser un contrat gratuitement →
          </a>
          <p style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}