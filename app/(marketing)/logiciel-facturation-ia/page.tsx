import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/logiciel-facturation-ia`

export const metadata: Metadata = {
  title: 'Logiciel Facturation IA Gratuit PME | InvoiceAgent',
  description: "Logiciel de facturation IA gratuit pour PME et freelances. Extraction PDF automatique, calcul TVA, réconciliation bancaire, export FEC. Sans carte bancaire.",
  keywords: ['logiciel facturation IA', 'logiciel facturation PME gratuit', 'AI invoice agent France', 'facturation automatique IA', 'OCR facture PME', 'logiciel comptabilité IA France'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation IA Gratuit PME — InvoiceAgent',
    description: "Automatisez votre facturation avec l'IA. Extraction PDF, TVA, FEC. Gratuit jusqu'à 5 factures.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Logiciel facturation IA InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation IA — InvoiceAgent', description: "Facturation automatique par IA pour PME. OCR PDF, TVA, FEC, réconciliation bancaire.", images: [`${BASE_URL}/og-image.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, description: "Logiciel de facturation automatique par IA pour PME françaises.", address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Logiciel Facturation IA',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR', offerCount: '4' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '124' },
  featureList: ['Extraction automatique factures PDF par IA', 'Calcul TVA automatique 5.5% 10% 20%', 'Réconciliation bancaire CSV', 'Export FEC DGFiP', 'Analyse contrats fournisseurs', 'Conforme RGPD'],
}
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment fonctionne l'extraction de factures par IA ?", acceptedAnswer: { '@type': 'Answer', text: "Téléchargez votre facture PDF ou photo. L'IA Gemini extrait automatiquement le fournisseur, SIRET, montants HT/TTC, TVA et dates en moins de 5 secondes. Précision de 98% sur les factures françaises." } },
    { '@type': 'Question', name: "InvoiceAgent est-il vraiment gratuit ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Le plan gratuit inclut 5 extractions de factures par mois, 1 analyse de contrat et le dashboard complet — sans carte bancaire. Les plans payants commencent à 19€/mois." } },
    { '@type': 'Question', name: "InvoiceAgent est-il conforme RGPD ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Données hébergées à Frankfurt (UE), chiffrées AES-256, jamais partagées avec des tiers. Suppression complète sur demande." } },
    { '@type': 'Question', name: "Puis-je exporter pour mon expert-comptable ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Export FEC natif (Fichier des Écritures Comptables) compatible Sage, EBP, Cegid. Export CSV et PDF disponibles sur tous les plans." } },
    { '@type': 'Question', name: "InvoiceAgent analyse-t-il aussi les contrats ?", acceptedAnswer: { '@type': 'Answer', text: "Oui, dès le plan Pro. L'IA identifie les clauses à risque, frais cachés, pénalités de retard et reconductions tacites dans vos contrats fournisseurs PDF." } },
    { '@type': 'Question', name: "Combien coûte InvoiceAgent ?", acceptedAnswer: { '@type': 'Answer', text: "Plan gratuit : 5 factures/mois sans carte. Starter : 19€/mois. Pro : 29€/mois avec FEC et analyse contrats. Business : 49€/mois pour cabinets multi-clients." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Logiciel Facturation IA', item: PAGE_URL },
  ],
}

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour découvrir', items: ['5 factures/mois', '1 analyse contrat', 'Calcul TVA auto', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'TPE & Freelances', items: ['100 factures/mois', 'Réconciliation bancaire CSV', 'Alertes TVA mensuelles', 'Export CSV+PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
  { name: 'Pro', monthly: 29, desc: 'PME & Comptables', items: ['Factures illimitées', 'Export FEC natif DGFiP', '5 analyses contrats/mois', 'Frais cachés détectés'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: true },
  { name: 'Business', monthly: 49, desc: 'Cabinets comptables', items: ['Tout Pro inclus', 'FEC multi-clients', 'Contrats illimités', 'Audit trail RGPD', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "Comment fonctionne l'extraction de factures par IA ?", a: "Téléchargez votre facture PDF ou photo dans InvoiceAgent. L'IA Gemini analyse le document et extrait automatiquement le fournisseur, le SIRET, les montants HT/TTC, la TVA, la date de facture et la date d'échéance — en moins de 5 secondes, avec une précision de 98% sur les factures françaises." },
  { q: "InvoiceAgent est-il vraiment gratuit ?", a: "Oui. Le plan gratuit inclut 5 extractions de factures par mois, 1 analyse de contrat et le dashboard complet — sans carte bancaire requise. Idéal pour tester avant de passer à un plan payant. Les plans Starter (19€/mois) et Pro (29€/mois) offrent des fonctionnalités avancées." },
  { q: "InvoiceAgent est-il conforme RGPD ?", a: "Oui. Toutes vos données sont hébergées à Frankfurt, Allemagne (Union Européenne), chiffrées AES-256 en transit et au repos. Vos données ne sont jamais partagées avec des tiers et peuvent être supprimées intégralement sur simple demande." },
  { q: "Puis-je exporter mes données pour mon expert-comptable ?", a: "Oui. InvoiceAgent exporte vos données au format FEC (Fichier des Écritures Comptables), le standard imposé par la DGFiP, compatible avec Sage, EBP, Cegid et QuickBooks. Export CSV et PDF également disponibles sur tous les plans." },
  { q: "InvoiceAgent analyse-t-il aussi les contrats fournisseurs ?", a: "Oui, disponible dès le plan Pro. L'IA analyse vos contrats PDF et identifie les clauses à risque (Haut/Moyen/Faible), les frais cachés, les pénalités de retard abusives et les reconductions tacites — avant que vous ne signiez." },
  { q: "Combien coûte InvoiceAgent ?", a: "Plan gratuit : 5 factures/mois sans carte bancaire. Starter : 19€/mois (ou 15€/mois en annuel) — 100 factures, réconciliation bancaire, alertes TVA. Pro : 29€/mois (ou 23€/mois en annuel) — factures illimitées, FEC, analyse contrats. Business : 49€/mois pour cabinets multi-clients." },
]

export default function LogicielFacturationIAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main>

        {/* HERO */}
        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              AI Invoice Agent · OCR Factures · FEC DGFiP · TVA Auto · RGPD
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Logiciel de facturation <span style={{ color: '#fbbf24' }}>IA gratuit</span> pour PME françaises
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              InvoiceAgent est l'AI invoice agent conçu pour les PME françaises — extraction OCR des factures PDF, calcul TVA automatique, réconciliation bancaire CSV et export FEC conforme DGFiP, sans installation.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: '16px 0 40px' }}>
              Selon McKinsey, les entreprises qui automatisent leur traitement de factures réduisent leurs coûts administratifs de <strong style={{ color: '#fbbf24' }}>60 à 80%</strong>. InvoiceAgent rend cette automatisation accessible dès 0€/mois.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.2)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.6)', flexWrap: 'wrap' }}>
              <span>Gratuit jusqu'à 5 factures/mois</span>
              <span>Sans carte bancaire</span>
              <span>RGPD — données en Europe</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section aria-label="Statistiques" style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '98%', label: 'Précision OCR', sub: 'sur factures françaises' },
              { value: '< 5s', label: 'Par facture extraite', sub: 'PDF ou photo smartphone' },
              { value: '60-80%', label: 'Réduction coûts', sub: 'vs traitement manuel (McKinsey)' },
              { value: '500+', label: 'PME utilisatrices', sub: 'en France' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#292524' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" aria-labelledby="demo-heading" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>
                Demo gratuite — sans inscription
              </div>
              <h2 id="demo-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                Testez l'IA sur votre document
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', marginBottom: '8px' }}>
                <strong style={{ color: 'white' }}>Facture PDF</strong> — l'IA extrait fournisseur, SIRET, montants HT/TTC, TVA et date d'échéance en moins de 5 secondes.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px' }}>
                <strong style={{ color: 'white' }}>Contrat PDF</strong> — l'IA détecte les clauses à risque, frais cachés, pénalités et dates de reconduction tacite.
              </p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* FONCTIONNALITES */}
        <section aria-labelledby="features-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 id="features-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Tout ce que fait InvoiceAgent pour votre PME
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '56px', fontSize: '16px' }}>
              Un AI invoice agent complet — de l'extraction OCR à la génération du FEC DGFiP.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { color: '#292524', bg: '#f5f5f4', border: '#e7e5e4', title: 'OCR factures PDF par IA', desc: "L'AI invoice agent InvoiceAgent lit vos factures PDF par OCR et extrait automatiquement tous les champs comptables en moins de 5 secondes. Compatible PDF natif, scans et photos smartphone.", items: ['Fournisseur, SIRET, N° facture', 'Montants HT, TVA (5.5/10/20%), TTC', 'Date facture et date échéance', 'Détection doublons automatique'] },
                { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', title: 'Réconciliation bancaire CSV', desc: "Importez votre relevé bancaire CSV depuis BNP, Société Générale, LCL, CIC ou Crédit Agricole. L'IA rapproche automatiquement chaque transaction avec vos factures.", items: ['Compatible toutes banques françaises', 'Matching IA par montant et libellé', 'Score de confiance 0-100%', 'Alertes factures impayées'] },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', title: 'Analyse contrats fournisseurs', desc: "Uploadez vos contrats PDF avant signature. L'IA identifie les clauses à risque, frais cachés, pénalités de retard et reconductions tacites — une analyse que votre avocat facturerait plusieurs centaines d'euros.", items: ['Clauses risque Haut/Moyen/Faible', 'Frais cachés et commissions', 'Pénalités abusives détectées', 'Dates reconduction automatique'] },
                { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', title: 'Export FEC conforme DGFiP', desc: "Générez votre Fichier des Écritures Comptables automatiquement depuis vos factures PDF. Conforme à l'arrêté DGFiP du 29 juillet 2013, avec les 18 champs obligatoires.", items: ['18 champs FEC obligatoires', 'Compatible Sage, EBP, Cegid, Coala', 'Prêt pour contrôle fiscal DGFiP', 'Export par exercice comptable'] },
              ].map((f) => (
                <article key={f.title} style={{ backgroundColor: f.bg, borderRadius: '16px', padding: '32px', border: `1px solid ${f.border}` }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: f.color, marginBottom: '12px' }}>{f.title}</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{f.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {f.items.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#475569', padding: '5px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ color: f.color, flexShrink: 0 }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* POUR QUI */}
        <section aria-labelledby="profiles-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="profiles-heading" style={{ textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Pour qui est InvoiceAgent ?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { title: 'PME 5-50 salariés', desc: "Automatisez la saisie comptable, la réconciliation bancaire et la génération FEC. Gagnez 3 jours par mois sur les tâches administratives." },
                { title: 'Freelances & consultants', desc: "Gérez vos factures clients et fournisseurs en 30 minutes par mois. Export FEC pour votre comptable, alertes TVA incluses." },
                { title: 'Artisans & TPE', desc: "Scannez vos factures depuis le chantier avec votre smartphone. L'OCR IA extrait tout automatiquement, même les photos floues." },
                { title: 'Experts-comptables', desc: "Automatisez la saisie de vos clients PME. FEC multi-clients, dashboard par dossier, export compatible Sage, EBP et Cegid." },
              ].map((p) => (
                <div key={p.title} style={{ backgroundColor: 'white', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#292524', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AVANTAGES */}
        <section aria-labelledby="avantages-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="avantages-heading" style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
              Pourquoi choisir InvoiceAgent ?
            </h2>
            <div style={{ backgroundColor: '#f5f5f4', border: '1px solid #e7e5e4', borderRadius: '16px', padding: '40px' }}>
              <p style={{ color: '#292524', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                InvoiceAgent est le seul logiciel de facturation français qui combine l'extraction OCR par IA, la réconciliation bancaire CSV, l'analyse de contrats fournisseurs et la génération du FEC DGFiP dans une seule plateforme — accessible dès 0€/mois, sans installation, conforme RGPD.
              </p>
              <p style={{ color: '#292524', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                Là où les logiciels traditionnels (Sage, EBP) nécessitent une installation, une formation et un abonnement élevé, InvoiceAgent est opérationnel en 2 minutes depuis n'importe quel navigateur — PC, Mac ou smartphone. Selon McKinsey, l'automatisation du traitement de factures réduit les coûts administratifs de 60 à 80%. InvoiceAgent rend cette automatisation accessible à toutes les PME françaises, quelle que soit leur taille.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  'OCR factures PDF en moins de 5 secondes',
                  'Réconciliation bancaire CSV automatique',
                  'Analyse contrats avant signature',
                  'TVA automatique 5.5% / 10% / 20%',
                  'Export FEC natif conforme DGFiP',
                  'Alertes TVA et paiements impayés',
                  'Opérationnel en 2 minutes — sans install',
                  'Données RGPD hébergées en Europe',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#292524', flexShrink: 0, marginTop: '2px' }}>→</span>
                    <p style={{ color: '#292524', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#292524" accentBg="#f5f5f4" />

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="faq-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes
            </h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section aria-label="Liens internes" style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'TVA automatique PME', href: `${BASE_URL}/tva-automatique-pme` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#292524', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Appel à l'action" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Automatisez votre facturation dès aujourd'hui</h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>5 factures gratuites — sans carte bancaire, sans installation.</p>
          <p style={{ fontSize: '15px', marginBottom: '36px', opacity: 0.6 }}>Rejoignez 500+ PME françaises qui ont automatisé leur comptabilité avec InvoiceAgent.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}