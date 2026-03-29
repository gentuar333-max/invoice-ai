import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-artisan`

export const metadata: Metadata = {
  title: 'Facturation Artisan Automatique par IA | InvoiceAgent',
  description: "Gérez votre facturation artisan depuis le chantier. Scannez vos factures avec votre téléphone, l'IA extrait tout. Gratuit jusqu'à 5 factures. Sans carte bancaire.",
  keywords: ['facturation artisan', 'logiciel facturation bâtiment', 'facture artisan France', 'comptabilité artisan automatique', 'OCR facture chantier', 'gestion factures plombier électricien'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Facturation Artisan Automatique par IA — InvoiceAgent',
    description: "Scannez vos factures depuis le chantier. L'IA extrait tout automatiquement. Gratuit jusqu'à 5 factures.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-artisan.png`, width: 1200, height: 630, alt: 'Facturation artisan automatique InvoiceAgent' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Facturation Artisan — InvoiceAgent',
    description: "Gérez votre comptabilité artisan depuis le chantier. OCR factures, alertes TVA, export FEC.",
    images: [`${BASE_URL}/og-artisan.png`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: 'InvoiceAgent', url: BASE_URL,
  description: "Logiciel de facturation automatique par IA pour artisans et entreprises du bâtiment.",
  address: { '@type': 'PostalAddress', addressCountry: 'FR' },
}
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Facturation Artisan',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '29', priceCurrency: 'EUR', offerCount: '3' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '89' },
  featureList: ['OCR facture PDF et photo smartphone', 'Scan depuis chantier', 'Alertes TVA artisan', 'Export FEC comptable', 'Détection pénalités contrats'],
}
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "InvoiceAgent fonctionne-t-il avec des photos prises sur un chantier ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. L'IA Gemini reconnaît les factures photographiées avec un smartphone, même en mauvaise qualité, en angle ou avec un éclairage difficile. Les champs non lisibles sont signalés pour correction manuelle." } },
    { '@type': 'Question', name: "Comment gérer la TVA artisan avec InvoiceAgent ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent extrait automatiquement le taux de TVA de chaque facture (5.5% travaux rénovation, 10% ou 20%) et calcule les montants HT et TTC. Une alerte mensuelle vous rappelle vos échéances de déclaration TVA." } },
    { '@type': 'Question', name: "InvoiceAgent est-il adapté aux micro-entreprises du bâtiment ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Le plan gratuit (5 factures/mois) convient aux micro-artisans. Le plan Starter à 19€/mois couvre 100 factures et la réconciliation bancaire, adapté aux artisans avec plusieurs chantiers simultanés." } },
    { '@type': 'Question', name: "Puis-je analyser mes contrats de sous-traitance ?", acceptedAnswer: { '@type': 'Answer', text: "Oui, dès le plan Pro. L'IA analyse vos contrats de sous-traitance et identifie les clauses à risque, pénalités de retard, frais cachés et conditions de résiliation abusives avant que vous ne signiez." } },
    { '@type': 'Question', name: "Comment exporter mes données pour mon expert-comptable ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent exporte vos données en FEC (Fichier des Écritures Comptables), compatible Sage, EBP et Cegid. Export CSV et PDF également disponibles sur tous les plans." } },
    { '@type': 'Question', name: "Mes données sont-elles sécurisées ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Données hébergées à Frankfurt (UE), chiffrées, conformes RGPD. Jamais partagées avec des tiers. Suppression complète sur demande." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Facturation Artisan', item: PAGE_URL },
  ],
}

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Micro-artisans', items: ['5 factures/mois', 'OCR photo smartphone', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'Artisans actifs', items: ['100 factures/mois', 'Réconciliation bancaire CSV', 'Alertes TVA mensuelles', 'Export CSV+PDF', 'Détection paiements reçus'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: true },
  { name: 'Pro', monthly: 29, desc: 'Artisans & entreprises', items: ['Factures illimitées', '5 analyses contrats/mois', 'Pénalités sous-traitance détectées', 'Export FEC natif'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: false },
  { name: 'Business', monthly: 49, desc: 'PME bâtiment', items: ['Tout Pro inclus', 'Contrats illimités', 'Multi-chantiers', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "InvoiceAgent fonctionne-t-il avec des photos prises sur un chantier ?", a: "Oui. L'IA Gemini reconnaît les factures photographiées avec un smartphone, même en mauvaise qualité, en angle ou avec un éclairage difficile. Les champs non lisibles sont clairement signalés pour correction manuelle." },
  { q: "Comment gérer la TVA artisan avec InvoiceAgent ?", a: "InvoiceAgent extrait automatiquement le taux de TVA de chaque facture (5.5% pour les travaux de rénovation, 10% ou 20%) et calcule les montants HT et TTC. Une alerte mensuelle vous rappelle vos échéances de déclaration TVA à la DGFiP." },
  { q: "InvoiceAgent est-il adapté aux micro-entreprises du bâtiment ?", a: "Oui. Le plan gratuit (5 factures/mois) convient aux micro-artisans qui démarrent. Le plan Starter à 19€/mois (ou 15€/mois en annuel) couvre 100 factures et la réconciliation bancaire, adapté aux artisans avec plusieurs chantiers simultanés." },
  { q: "Puis-je analyser mes contrats de sous-traitance avant de signer ?", a: "Oui, dès le plan Pro. L'IA analyse vos contrats de sous-traitance et identifie les clauses à risque, pénalités de retard abusives, frais cachés et conditions de résiliation défavorables — avant que vous ne signiez." },
  { q: "Comment exporter mes données pour mon expert-comptable ?", a: "InvoiceAgent exporte vos données en FEC (Fichier des Écritures Comptables), le format standard imposé par l'administration fiscale française, compatible avec Sage, EBP et Cegid. Export CSV et PDF disponibles sur tous les plans." },
  { q: "Mes données de facturation sont-elles sécurisées ?", a: "Oui. Toutes vos données sont chiffrées et hébergées à Frankfurt, Allemagne (UE), conformément au RGPD. Jamais partagées avec des tiers. Suppression complète sur demande." },
]

export default function FacturationArtisanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <SharedNav />
      <main>

        {/* HERO */}
        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Plombiers · Electriciens · Maçons · Peintres · Menuisiers · Carreleurs
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              La facturation artisan <span style={{ color: '#fbbf24' }}>depuis le chantier</span>
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              Photographiez vos factures fournisseurs avec votre smartphone sur le chantier. InvoiceAgent les lit par OCR et extrait automatiquement tous les champs — sans saisie manuelle, même en mauvaise qualité.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', margin: '16px 0 40px' }}>
              Selon une étude CAPEB, les artisans du bâtiment consacrent en moyenne <strong style={{ color: '#fbbf24' }}>6 heures par semaine</strong> à la gestion administrative. InvoiceAgent réduit ce temps à moins d'une heure.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
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
              { value: '6h', label: 'Économisées par semaine', sub: 'vs gestion administrative manuelle' },
              { value: '< 5s', label: "Par facture extraite", sub: 'PDF, photo ou scan' },
              { value: '5.5%', label: 'TVA rénovation gérée', sub: 'automatiquement' },
              { value: '100%', label: 'Mobile — depuis chantier', sub: 'iOS et Android' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#b45309' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" aria-labelledby="demo-heading" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #451a03 0%, #78350f 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.3)' }}>
                Demo gratuite — sans inscription
              </div>
              <h2 id="demo-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                Testez avec une vraie facture
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>
                Importez une facture fournisseur ou un contrat — l'IA extrait tout en quelques secondes.
              </p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* FONCTIONNALITES ARTISAN */}
        <section aria-labelledby="features-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 id="features-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Tout ce qu'InvoiceAgent fait pour les artisans
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '56px', fontSize: '16px' }}>
              Conçu pour les professionnels du bâtiment qui n'ont pas le temps de faire de la comptabilité.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { color: '#b45309', bg: '#fffbeb', border: '#fde68a', title: 'OCR depuis smartphone sur chantier', desc: "Photographiez vos factures fournisseurs, bons de livraison et reçus directement depuis votre téléphone sur le chantier. L'IA Gemini reconnaît et extrait tous les champs même en mauvaise qualité, en angle ou par faible luminosité.", items: ['Photo smartphone acceptée', 'Scan PDF natif ou numérisé', 'Reconnaissance même floue ou en angle', 'Résultat en moins de 5 secondes'] },
                { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', title: 'Gestion TVA bâtiment automatique', desc: "InvoiceAgent gère automatiquement les taux de TVA spécifiques au bâtiment : 5.5% pour les travaux de rénovation énergétique, 10% pour les travaux d'amélioration, 20% pour les constructions neuves. Alertes mensuelles pour votre déclaration.", items: ['TVA 5.5% rénovation énergétique', 'TVA 10% travaux amélioration', 'TVA 20% construction neuve', 'Alerte déclaration mensuelle DGFiP'] },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', title: 'Analyse contrats de sous-traitance', desc: "Avant de signer un contrat de sous-traitance, uploadez-le dans InvoiceAgent. L'IA identifie les clauses à risque, les pénalités de retard abusives, les frais cachés et les conditions de résiliation défavorables.", items: ['Clauses pénalités abusives', 'Conditions de résiliation', 'Frais cachés identifiés', 'Délais de paiement analysés'] },
                { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', title: 'Suivi paiements et relances', desc: "Importez votre relevé bancaire CSV depuis votre banque. InvoiceAgent rapproche automatiquement chaque virement reçu avec la facture correspondante et vous alerte en cas de retard de paiement client.", items: ['Rapprochement bancaire automatique', 'Alerte facture impayée', 'Rapport mensuel de trésorerie', 'Export pour expert-comptable'] },
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

        {/* POUR QUEL ARTISAN */}
        <section aria-labelledby="profiles-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="profiles-heading" style={{ textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Adapté à tous les corps de métier
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Plombiers & chauffagistes', desc: "Gérez vos factures de matériel, suivez les paiements clients et analysez vos contrats de maintenance avant signature." },
                { title: 'Electriciens', desc: "Scannez vos bons de livraison et factures fournisseurs depuis le chantier. Export FEC compatible avec votre comptable." },
                { title: 'Maçons & carreleurs', desc: "Gérez la TVA à 5.5% pour vos travaux de rénovation et suivez vos contrats de sous-traitance avec détection des clauses abusives." },
                { title: 'Peintres & décorateurs', desc: "Importez vos factures fournisseurs par photo smartphone. L'OCR IA reconnaît tous les formats, même les bons de livraison manuscrits." },
                { title: 'Menuisiers & charpentiers', desc: "Réconciliation bancaire automatique pour vos chantiers multi-lots. Alertes TVA mensuelles et export FEC pour votre comptable." },
                { title: 'Entreprises générales', desc: "Gérez plusieurs chantiers simultanément, analysez vos contrats de sous-traitance et exportez vos données par chantier." },
              ].map((p) => (
                <div key={p.title} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#b45309', marginBottom: '8px' }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AVANTAGES */}
        <section aria-labelledby="avantages-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="avantages-heading" style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
              Pourquoi les artisans choisissent InvoiceAgent
            </h2>
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '16px', padding: '40px' }}>
              <p style={{ color: '#78350f', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                La gestion administrative est souvent la partie la plus redoutée du métier d'artisan. Entre les factures fournisseurs à saisir, les paiements clients à suivre, les déclarations TVA à préparer et les contrats de sous-traitance à vérifier, les tâches s'accumulent rapidement.
              </p>
              <p style={{ color: '#78350f', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                Selon la CAPEB (Confédération de l'Artisanat et des Petites Entreprises du Bâtiment), les artisans consacrent en moyenne 6 heures par semaine à l'administration. InvoiceAgent automatise ces tâches pour moins de 19€ par mois — soit moins d'une demi-heure de votre taux horaire moyen.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  'OCR factures depuis smartphone sur chantier',
                  'Gestion TVA bâtiment 5.5% / 10% / 20%',
                  'Analyse contrats de sous-traitance',
                  'Suivi paiements clients automatique',
                  'Export FEC pour expert-comptable',
                  'Alertes déclaration TVA mensuelle',
                  'Compatible iOS et Android',
                  'Données RGPD hébergées en Europe',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#b45309', flexShrink: 0, marginTop: '2px' }}>→</span>
                    <p style={{ color: '#78350f', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#b45309" accentBg="#fef3c7" />

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="faq-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes — Facturation artisan
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
                { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
                { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#b45309', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Appel à l'action" style={{ background: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Gérez votre facturation depuis le chantier</h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>5 factures gratuites — sans carte bancaire, sans installation.</p>
          <p style={{ fontSize: '15px', marginBottom: '36px', opacity: 0.7 }}>Rejoignez des centaines d'artisans français qui ont automatisé leur comptabilité avec InvoiceAgent.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}