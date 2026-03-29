import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/reconciliation-bancaire-csv`

export const metadata: Metadata = {
  title: 'Réconciliation Bancaire CSV Automatique par IA | InvoiceAgent',
  description: "Importez votre relevé bancaire CSV et laissez l'IA rapprocher automatiquement vos transactions et factures. Compatible BNP, SG, CA, LCL. Essai gratuit.",
  keywords: ['réconciliation bancaire CSV', 'rapprochement bancaire automatique', 'import CSV banque France', 'matching facture transaction', 'réconciliation comptable IA'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Réconciliation Bancaire CSV Automatique — InvoiceAgent', description: "Rapprochez automatiquement vos transactions bancaires CSV et factures par IA.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website', images: [{ url: `${BASE_URL}/og-reconciliation.png`, width: 1200, height: 630, alt: 'Réconciliation bancaire CSV' }] },
  twitter: { card: 'summary_large_image', title: 'Réconciliation Bancaire CSV — InvoiceAgent', description: "Rapprochement automatique transactions et factures. 95% de matching.", images: [`${BASE_URL}/og-reconciliation.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Réconciliation Bancaire CSV', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '64' } }
const schemaFAQ = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
  { '@type': 'Question', name: "Comment exporter mon relevé bancaire en CSV ?", acceptedAnswer: { '@type': 'Answer', text: "Connectez-vous à votre espace bancaire, rendez-vous dans l'historique des transactions et choisissez 'Exporter' au format CSV. Toutes les banques françaises (BNP, SG, CA, LCL, CIC) proposent cette fonctionnalité." } },
  { '@type': 'Question', name: "Comment fonctionne le matching automatique ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent compare chaque transaction bancaire avec vos factures. L'IA analyse montant, date et libellé bancaire avec un score de confiance de 0 à 100%." } },
  { '@type': 'Question', name: "La réconciliation est-elle conforme RGPD ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Données hébergées à Frankfurt (UE), jamais partagées avec des tiers." } },
  { '@type': 'Question', name: "Combien coûte la réconciliation bancaire automatique ?", acceptedAnswer: { '@type': 'Answer', text: "Plan gratuit : 1 rapprochement/mois. Starter : 19€/mois (illimité). Pro : 29€/mois (matching IA avancé + FEC)." } },
] }
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Réconciliation Bancaire CSV', item: PAGE_URL }] }

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour tester', items: ['5 factures/mois', '1 rapprochement/mois', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer', featured: false },
  { name: 'Starter', monthly: 19, desc: 'TPE & Freelances', items: ['100 factures/mois', 'Import CSV toutes banques', 'Rapprochements illimités', 'Alertes impayées', 'Export CSV+PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
  { name: 'Pro', monthly: 29, desc: 'PME & Comptables', items: ['Tout Starter inclus', 'Matching IA avancé', 'Score de confiance', '5 analyses contrats/mois', 'Export FEC natif'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Essai gratuit 14 jours', featured: true },
  { name: 'Business', monthly: 49, desc: 'Cabinets', items: ['Tout Pro inclus', 'Contrats illimités', 'Multi-clients', 'Audit trail RGPD', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

export default function ReconciliationBancaireCSVPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main>

        <section style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Compatible BNP · SG · Crédit Agricole · LCL · CIC · Boursorama
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Réconciliation bancaire CSV <span style={{ color: '#fbbf24' }}>automatique</span> par IA
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 16px' }}>
              Importez votre relevé bancaire CSV. InvoiceAgent rapproche automatiquement chaque transaction avec vos factures en quelques secondes, sans saisie manuelle.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', margin: '16px 0 40px' }}>
              Les PME françaises perdent en moyenne <strong style={{ color: '#fbbf24' }}>2 jours par mois</strong> sur la réconciliation bancaire manuelle.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
              <span>Gratuit jusqu'à 1 rapprochement/mois</span>
              <span>Sans carte bancaire</span>
              <span>RGPD — données en Europe</span>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[{ value: '2 jours', label: 'Économisés par mois', sub: 'vs réconciliation manuelle' }, { value: '95%', label: 'Taux de matching', sub: 'sur transactions françaises' }, { value: '< 30s', label: 'Traitement CSV', sub: 'quel que soit le volume' }, { value: '12+', label: 'Banques supportées', sub: 'BNP, SG, CA, LCL, CIC...' }].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#059669' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="demo" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.3)' }}>
                Demo gratuite — sans inscription
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Testez le rapprochement en direct</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>Importez une facture ou un contrat — analyse IA en quelques secondes.</p>
            </div>
            <InlineDemo />
          </div>
        </section>

        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Comment fonctionne la réconciliation bancaire CSV ?</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>Trois étapes. Aucune configuration requise.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {[
                { n: '01', color: '#059669', title: 'Exportez votre relevé CSV', desc: "Depuis votre espace bancaire en ligne (BNP, Société Générale, Crédit Agricole, LCL, CIC, Boursorama...), exportez votre relevé au format CSV. Toutes les banques françaises sont compatibles." },
                { n: '02', color: '#2563eb', title: "L'IA rapproche automatiquement", desc: "InvoiceAgent compare chaque transaction avec vos factures. L'IA analyse montant, date et libellé bancaire pour identifier les correspondances avec un score de confiance." },
                { n: '03', color: '#7c3aed', title: 'Validez et exportez', desc: "Validez les rapprochements suggérés, corrigez si besoin, puis exportez le rapport en CSV ou PDF pour votre comptable. Alertes automatiques sur les factures impayées." },
              ].map((step) => (
                <article key={step.n} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: step.color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>{step.n}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>Compatible avec toutes les banques françaises</h2>
            <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '15px' }}>Exportez votre relevé CSV depuis votre espace bancaire et importez-le en un clic.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {['BNP Paribas', 'Société Générale', 'Crédit Agricole', 'LCL', 'CIC', 'Boursorama', 'La Banque Postale', 'Crédit Mutuel', 'HSBC France', 'Fortuneo', 'Hello Bank', 'N26'].map((bank) => (
                <div key={bank} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>{bank}</div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>Pourquoi automatiser la réconciliation ?</h2>
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '40px', textAlign: 'left' }}>
              {['Rapprochement complet en moins de 30 secondes', '95% de matching automatique sans intervention', 'Alertes immédiates sur factures impayées', 'Score de confiance IA pour chaque correspondance', 'Export rapport comptable en 1 clic', 'Compatible toutes banques françaises', 'Données hébergées en Europe — RGPD'].map((item) => (
                <div key={item} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'center' }}>
                  <span style={{ color: '#059669', flexShrink: 0, fontSize: '16px' }}>→</span>
                  <p style={{ color: '#14532d', fontSize: '15px', margin: 0, fontWeight: 500 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#059669" accentBg="#d1fae5" />

        <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Questions fréquentes</h2>
            {[
              { q: "Comment exporter mon relevé bancaire en CSV ?", a: "Connectez-vous à votre espace bancaire en ligne, rendez-vous dans l'historique de vos transactions et cherchez l'option 'Exporter'. Choisissez le format CSV. Toutes les grandes banques françaises (BNP, SG, CA, LCL, CIC) proposent cette fonctionnalité." },
              { q: "Comment fonctionne le matching automatique ?", a: "InvoiceAgent compare chaque transaction de votre relevé CSV avec vos factures enregistrées. L'IA analyse le montant, la date et le libellé bancaire pour identifier les correspondances. Un score de confiance de 0 à 100% est attribué à chaque rapprochement." },
              { q: "Que se passe-t-il si une transaction ne correspond à aucune facture ?", a: "Les transactions non rapprochées sont clairement identifiées dans votre dashboard. Vous pouvez les associer manuellement à une facture existante ou les marquer comme dépense non facturée." },
              { q: "La réconciliation bancaire est-elle conforme RGPD ?", a: "Oui. Vos données bancaires sont hébergées à Frankfurt, Allemagne (UE) et ne sont jamais partagées avec des tiers. Vos relevés CSV sont chiffrés en transit et au repos." },
              { q: "Puis-je exporter le rapport pour mon comptable ?", a: "Oui. Le rapport est exportable en CSV et PDF. Le plan Pro inclut l'export FEC compatible Sage, EBP et Cegid." },
              { q: "Combien coûte la réconciliation bancaire automatique ?", a: "Plan gratuit : 1 rapprochement/mois sans carte bancaire. Starter : 19€/mois (illimité). Pro : 29€/mois (matching IA avancé + FEC)." },
            ].map((faq, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '24px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[{ label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` }, { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` }, { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` }, { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` }, { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` }].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#059669', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Prêt à automatiser votre réconciliation bancaire ?</h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.9 }}>Commencez gratuitement — sans carte bancaire.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}