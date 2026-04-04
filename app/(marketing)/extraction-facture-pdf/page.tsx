import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/extraction-facture-pdf`

export const metadata: Metadata = {
  title: 'Extraction Facture PDF Automatique par IA | InvoiceAgent',
  description: "Extrayez automatiquement les données de vos factures PDF en 5 secondes. IA Gemini, précision 98%, SIRET, TVA, montants. Essai gratuit sans carte bancaire.",
  keywords: ['extraction facture PDF', 'OCR facture automatique', 'lire facture PDF IA', 'extraction données facture', 'automatisation facture PDF France'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Extraction Facture PDF Automatique par IA — InvoiceAgent',
    description: "Extrayez fournisseur, TVA, SIRET et montants de vos factures PDF en 5 secondes.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Extraction automatique facture PDF' }],
  },
  twitter: { card: 'summary_large_image', title: 'Extraction Facture PDF — InvoiceAgent', description: "Extrayez automatiquement les données de vos factures PDF. IA Gemini, 98% de précision.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, description: "Logiciel d'extraction automatique de factures PDF par IA.", address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Extraction Facture PDF', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR', offerCount: '4' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87' }, featureList: ['Extraction PDF automatique par IA', 'Reconnaissance SIRET', 'Calcul TVA automatique', 'Export FEC et CSV'] }
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment fonctionne l'extraction automatique de factures PDF ?", acceptedAnswer: { '@type': 'Answer', text: "Téléchargez votre facture PDF ou photo. L'IA Gemini extrait automatiquement le fournisseur, SIRET, montants HT/TTC, TVA et dates en moins de 5 secondes." } },
    { '@type': 'Question', name: "Quels formats de factures sont supportés ?", acceptedAnswer: { '@type': 'Answer', text: "PDF, JPG, PNG et WebP. L'IA reconnaît les factures françaises de tous les secteurs, y compris les scans et photos smartphone." } },
    { '@type': 'Question', name: "Quelle est la précision de l'extraction IA ?", acceptedAnswer: { '@type': 'Answer', text: "98% de précision sur les factures françaises standards. Les champs manquants sont clairement signalés." } },
    { '@type': 'Question', name: "L'extraction PDF est-elle conforme RGPD ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Données hébergées à Frankfurt (UE), jamais partagées avec des tiers." } },
    { '@type': 'Question', name: "Puis-je exporter les données extraites ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Export CSV, PDF et FEC compatible Sage, EBP, Cegid et QuickBooks." } },
    { '@type': 'Question', name: "Combien coûte l'extraction automatique ?", acceptedAnswer: { '@type': 'Answer', text: "Plan gratuit : 5 extractions/mois. Starter : 19€/mois. Pro : 29€/mois illimité. Business : 49€/mois." } },
  ],
}
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Extraction Facture PDF', item: PAGE_URL }] }

export default function ExtractionFacturePDFPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <SharedNav />

      <main>

        {/* HERO */}
        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              IA Gemini · Précision 98% · Résultat en 5 secondes
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Extraction facture PDF <span style={{ color: '#fbbf24' }}>automatique</span> par IA
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '16px', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 16px' }}>
              Fini la saisie manuelle. InvoiceAgent lit vos factures PDF et en extrait automatiquement fournisseur, SIRET, montants HT/TTC, TVA et dates d'échéance en moins de 5 secondes.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
              Selon McKinsey, la saisie manuelle coûte en moyenne <strong style={{ color: '#fbbf24' }}>15 minutes par document</strong>. Avec l'IA, ce délai tombe à 5 secondes.
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
              <span>✓ Gratuit jusqu'à 5 factures/mois</span>
              <span>✓ Sans carte bancaire</span>
              <span>✓ Données hébergées en UE</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '98%', label: 'Précision extraction', sub: 'sur factures françaises' },
              { value: '< 5s', label: 'Temps de traitement', sub: 'par facture PDF' },
              { value: '15 min', label: 'Économisées', sub: 'par facture vs saisie manuelle' },
              { value: '500+', label: 'PME utilisatrices', sub: 'en France' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#2563eb' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO LIVE — mis en avant */}
        <section id="demo" aria-labelledby="demo-heading" style={{ padding: '80px 20px', backgroundColor: '#eef2ff' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: '#6366f1', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>
                ✦ Démo gratuite — sans inscription
              </div>
              <h2 id="demo-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
                Testez l'extraction en direct
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                Importez une vraie facture PDF ou contrat — voyez le résultat en 5 secondes.
              </p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* COMMENT CA MARCHE */}
        <section aria-labelledby="process-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="process-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Comment fonctionne l'extraction PDF par IA ?
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>Trois étapes, cinq secondes. Aucune configuration requise.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {[
                { n: '01', color: '#2563eb', title: 'Importez votre facture PDF', desc: "Glissez-déposez votre facture PDF, JPG ou PNG. InvoiceAgent accepte tous les formats, y compris les scans et photos smartphone. Taille max : 10 Mo.", icon: '📄' },
                { n: '02', color: '#059669', title: "L'IA analyse et extrait", desc: "L'IA Gemini extrait : nom du fournisseur, numéro SIRET, numéro de facture, date d'émission, date d'échéance, montant HT, TVA, montant TTC et lignes de détail.", icon: '🤖' },
                { n: '03', color: '#7c3aed', title: 'Vérifiez et exportez', desc: "Consultez les données extraites, corrigez si nécessaire, puis exportez en CSV, PDF ou FEC pour votre comptable.", icon: '✅' },
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

        {/* CHAMPS EXTRAITS */}
        <section aria-labelledby="fields-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 id="fields-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
                Quelles données sont extraites automatiquement ?
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>Tous les champs essentiels d'une facture française conforme.</p>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {[
                { category: 'Identification fournisseur', color: '#2563eb', fields: ['Nom du fournisseur', 'Numéro SIRET (14 chiffres)', 'Numéro de TVA intracommunautaire', 'Adresse du fournisseur'] },
                { category: 'Informations de facturation', color: '#059669', fields: ["Numéro de facture", "Date d'émission", "Date d'échéance", "Conditions de paiement"] },
                { category: 'Montants et taxes', color: '#7c3aed', fields: ['Montant HT', 'Taux de TVA (5.5%, 10%, 20%)', 'Montant de TVA', 'Montant TTC total'] },
                { category: 'Lignes de détail', color: '#dc2626', fields: ['Description de chaque article', 'Quantité et prix unitaire', 'Montant total par ligne', 'Catégorie de dépense'] },
              ].map((cat) => (
                <article key={cat.category} style={{ backgroundColor: 'white', borderRadius: '14px', padding: '28px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: cat.color, marginBottom: '16px' }}>
                    {cat.category}
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {cat.fields.map((field) => (
                      <li key={field} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#475569', padding: '6px 0', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: cat.color, flexShrink: 0, fontSize: '12px' }}>✓</span>
                        {field}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* AVANTAGES — solo colonna verde */}
        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
              Pourquoi automatiser l'extraction ?
            </h2>
            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '40px', textAlign: 'left' }}>
              {[
                'Extraction complète en moins de 5 secondes',
                'Précision de 98% sur factures françaises',
                'Zéro effort, 100% automatique',
                'Scalable : 1 ou 10 000 factures par mois',
                'Comptabilisation immédiate et export FEC',
                'Détection automatique des doublons',
                'Conformité RGPD — données hébergées en Europe',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'center' }}>
                  <span style={{ color: '#22c55e', flexShrink: 0, fontSize: '18px' }}>✓</span>
                  <p style={{ color: '#14532d', fontSize: '15px', margin: 0, fontWeight: 500 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPATIBILITE */}
        <section style={{ padding: '64px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>Compatible avec votre logiciel comptable</h2>
            <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '15px' }}>Export FEC natif et CSV universel.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {['Sage', 'EBP', 'Cegid', 'QuickBooks', 'Excel', 'FEC Export'].map((tool) => (
                <div key={tool} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>{tool}</div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="tarifs" aria-labelledby="pricing-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
            <h2 id="pricing-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Tarifs simples et transparents</h2>
            <p style={{ color: '#64748b', marginBottom: '48px' }}>Sans engagement. Plan gratuit disponible.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { name: 'Gratuit', price: '0€', desc: 'Pour découvrir', items: ['5 extractions/mois', 'Tous les formats PDF', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
                { name: 'Starter', price: '19€', desc: 'Freelances & TPE', items: ['100 extractions/mois', 'Import CSV bancaire', 'Alertes TVA', 'Export CSV + PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
                { name: 'Pro', price: '29€', desc: 'PME & Comptables', items: ['Extractions illimitées', 'IA matching bancaire', '5 analyses contrats/mois', 'Export FEC natif'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Essai gratuit 14 jours', featured: true },
                { name: 'Business', price: '49€', desc: 'Cabinets comptables', items: ['Tout Pro inclus', 'Contrats illimités', 'Multi-clients', 'Audit trail RGPD'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
              ].map((plan) => (
                <div key={plan.name} style={{ backgroundColor: plan.featured ? '#2563eb' : 'white', color: plan.featured ? 'white' : '#1e293b', padding: '28px', borderRadius: '16px', boxShadow: plan.featured ? '0 10px 25px rgba(37,99,235,0.3)' : '0 1px 3px rgba(0,0,0,0.1)', transform: plan.featured ? 'scale(1.05)' : 'none', position: 'relative', border: plan.featured ? 'none' : '1px solid #e2e8f0' }}>
                  {plan.featured && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '4px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PLUS POPULAIRE</div>}
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{plan.name}</h3>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0 4px' }}>{plan.price}<span style={{ fontSize: '14px', opacity: 0.7 }}>/mois</span></div>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '16px' }}>{plan.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '13px', lineHeight: 2, marginBottom: '20px' }}>
                    {plan.items.map((item) => <li key={item} style={{ color: plan.featured ? 'rgba(255,255,255,0.9)' : '#64748b' }}>✓ {item}</li>)}
                  </ul>
                  <a href={plan.link} style={{ display: 'block', padding: '11px', backgroundColor: plan.featured ? 'white' : 'transparent', border: plan.featured ? 'none' : '2px solid #e2e8f0', borderRadius: '8px', color: plan.featured ? '#2563eb' : '#64748b', textDecoration: 'none', fontWeight: 700, fontSize: '13px', textAlign: 'center' }}>{plan.cta}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="faq-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes
            </h2>
            {[
              { q: "Comment fonctionne l'extraction automatique de factures PDF ?", a: "Téléchargez votre facture PDF ou photo. L'IA Gemini extrait automatiquement le fournisseur, SIRET, montants HT/TTC, TVA et dates en moins de 5 secondes, sans aucune saisie manuelle." },
              { q: "Quels formats de factures sont supportés ?", a: "PDF (natif ou scanné), JPG, PNG et WebP. L'IA reconnaît les factures françaises de tous les secteurs, y compris les scans et photos smartphone." },
              { q: "Quelle est la précision de l'extraction IA ?", a: "98% de précision sur les factures françaises standards. Les champs manquants sont clairement signalés pour vérification rapide." },
              { q: "L'extraction PDF est-elle conforme RGPD ?", a: "Oui. Données hébergées à Frankfurt, Allemagne (UE). Jamais partagées avec des tiers. Suppression complète sur demande." },
              { q: "Puis-je exporter les données extraites vers mon comptable ?", a: "Oui. Export CSV, PDF et FEC compatible Sage, EBP, Cegid et QuickBooks. Le plan Pro inclut l'export FEC natif." },
              { q: "Combien coûte l'extraction automatique de factures ?", a: "Plan gratuit : 5 extractions/mois sans carte bancaire. Starter : 19€/mois. Pro : 29€/mois illimité. Business : 49€/mois." },
            ].map((faq, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section style={{ padding: '48px 20px', backgroundColor: 'white', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section style={{ background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Prêt à extraire vos premières factures ?</h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.9 }}>5 extractions gratuites — sans carte bancaire.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
            Extraire une facture gratuitement →
          </a>
          <p style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>Sans engagement · RGPD conforme · Données hébergées en Europe</p>
        </section>

      </main>

      <SharedFooter />
    </>
  )
}