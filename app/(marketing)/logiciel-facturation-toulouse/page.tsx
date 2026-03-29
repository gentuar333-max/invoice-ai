import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/logiciel-facturation-toulouse`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Toulouse PME par IA | InvoiceAgent',
  description: "Logiciel de facturation automatique pour PME et indépendants à Toulouse. Extraction PDF, réconciliation bancaire, export FEC. Gratuit jusqu'à 5 factures. RGPD.",
  keywords: ['logiciel facturation Toulouse', 'facturation automatique Toulouse', 'comptabilité PME Toulouse', 'OCR facture Toulouse', 'logiciel comptable Occitanie', 'facturation indépendant Toulouse'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Toulouse PME — InvoiceAgent',
    description: "Automatisez votre facturation à Toulouse. Extraction PDF, FEC, réconciliation bancaire. Gratuit jusqu'à 5 factures.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-toulouse.png`, width: 1200, height: 630, alt: 'Logiciel facturation Toulouse InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Toulouse — InvoiceAgent', description: "Facturation automatique pour PME toulouseiennes. OCR, FEC, réconciliation bancaire.", images: [`${BASE_URL}/og-toulouse.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: 'InvoiceAgent', url: BASE_URL,
  description: "Logiciel de facturation automatique par IA pour PME toulouseiennes.",
  address: { '@type': 'PostalAddress', addressLocality: 'Toulouse', addressCountry: 'FR' },
}
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Logiciel Facturation Toulouse',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR', offerCount: '4' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '134' },
  featureList: ['Extraction factures PDF automatique', 'Export FEC DGFiP', 'Réconciliation bancaire CSV', 'Analyse contrats IA', 'Conforme RGPD'],
}
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "InvoiceAgent est-il adapté aux PME toulouseiennes ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent est utilisé par des centaines de PME en Occitanie. Le logiciel est 100% cloud, sans installation, et gère les spécificités comptables françaises : TVA, FEC DGFiP, export Sage et EBP." } },
    { '@type': 'Question', name: "Puis-je utiliser InvoiceAgent avec mon expert-comptable toulouseien ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent exporte vos données au format FEC (Fichier des Écritures Comptables), le standard DGFiP compatible avec tous les logiciels utilisés par les cabinets comptables toulouseiens : Sage, EBP, Cegid, Coala, Pennylane." } },
    { '@type': 'Question', name: "InvoiceAgent fonctionne-t-il pour les auto-entrepreneurs toulouseiens ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Le plan gratuit (5 factures/mois) est idéal pour les auto-entrepreneurs et freelances toulouseiens qui démarrent. Le plan Starter à 19€/mois couvre 100 factures et la réconciliation bancaire." } },
    { '@type': 'Question', name: "Mes données sont-elles hébergées en France ?", acceptedAnswer: { '@type': 'Answer', text: "Vos données sont hébergées à Frankfurt, Allemagne (Union Européenne), conformément au RGPD. Elles ne quittent jamais l'espace européen et ne sont jamais partagées avec des tiers." } },
    { '@type': 'Question', name: "Combien coûte InvoiceAgent pour une PME toulouseienne ?", acceptedAnswer: { '@type': 'Answer', text: "Plan gratuit : 5 factures/mois, sans carte bancaire. Starter : 19€/mois (ou 15€/mois en annuel). Pro : 29€/mois avec export FEC et analyse contrats. Business : 49€/mois pour cabinets multi-clients." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Logiciel Facturation Toulouse', item: PAGE_URL },
  ],
}

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour démarrer', items: ['5 factures/mois', '1 analyse contrat', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'TPE & Freelances', items: ['100 factures/mois', 'Réconciliation bancaire CSV', 'Alertes TVA', 'Export CSV+PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
  { name: 'Pro', monthly: 29, desc: 'PME toulouseiennes', items: ['Factures illimitées', 'Export FEC natif DGFiP', '5 analyses contrats/mois', 'Frais cachés détectés'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: true },
  { name: 'Business', monthly: 49, desc: 'Cabinets Occitanie', items: ['Tout Pro inclus', 'FEC multi-clients', 'Contrats illimités', 'Audit trail RGPD', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "InvoiceAgent est-il adapté aux PME toulouseiennes ?", a: "Oui. InvoiceAgent est utilisé par des centaines de PME en Occitanie. Le logiciel est 100% cloud, sans installation, et gère les spécificités comptables françaises : TVA, FEC DGFiP, export Sage et EBP. Accessible depuis n'importe quel bureau toulouseien ou en télétravail." },
  { q: "Puis-je utiliser InvoiceAgent avec mon expert-comptable toulouseien ?", a: "Oui. InvoiceAgent exporte vos données au format FEC (Fichier des Écritures Comptables), compatible avec tous les logiciels utilisés par les cabinets comptables toulouseiens : Sage, EBP, Cegid, Coala, Pennylane. Votre comptable importe le fichier directement sans ressaisie." },
  { q: "InvoiceAgent fonctionne-t-il pour les auto-entrepreneurs et freelances toulouseiens ?", a: "Oui. Le plan gratuit (5 factures/mois) est idéal pour les auto-entrepreneurs et freelances toulouseiens qui démarrent. Le plan Starter à 19€/mois couvre 100 factures, la réconciliation bancaire et les alertes TVA — adapté à un freelance actif." },
  { q: "Mes données sont-elles hébergées en Europe ?", a: "Vos données sont hébergées à Frankfurt, Allemagne (Union Européenne), conformément au RGPD. Elles ne quittent jamais l'espace européen et ne sont jamais partagées avec des tiers. Suppression complète sur demande." },
  { q: "Combien coûte InvoiceAgent pour une PME toulouseienne ?", a: "Plan gratuit : 5 factures/mois, sans carte bancaire. Starter : 19€/mois (ou 15€/mois en annuel). Pro : 29€/mois avec export FEC et analyse contrats. Business : 49€/mois pour cabinets multi-clients en Occitanie." },
]

export default function LogicielFacturationToulousePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main>

        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Toulouse · Occitanie · PME · Freelances · Artisans · Cabinets comptables
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Logiciel de facturation <span style={{ color: '#fbbf24' }}>Toulouse</span> automatisé par IA
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              InvoiceAgent automatise la facturation des PME et indépendants toulouseiens — extraction OCR des factures PDF, réconciliation bancaire CSV et export FEC conforme DGFiP, sans installation.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: '16px 0 40px' }}>
              Toulouse concentre <strong style={{ color: '#fbbf24' }}>6% des entreprises françaises</strong>. InvoiceAgent est utilisé par des centaines d'entreprises en Occitanie pour automatiser leur comptabilité.
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

        <section aria-label="Statistiques Toulouse" style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '31%', label: 'Des PME françaises', sub: 'sont en Occitanie' },
              { value: '98%', label: 'Précision extraction', sub: 'sur factures françaises' },
              { value: '< 5s', label: 'Par facture OCR', sub: 'PDF ou photo smartphone' },
              { value: '0€', label: 'Pour commencer', sub: 'sans carte bancaire' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#292524' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="demo" aria-labelledby="demo-heading" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>
                Demo gratuite — sans inscription
              </div>
              <h2 id="demo-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                Testez avec votre propre document
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

        <section aria-labelledby="features-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 id="features-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Tout ce qu'InvoiceAgent fait pour les entreprises toulouseiennes
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '56px', fontSize: '16px' }}>
              Un logiciel comptable complet, sans installation, conforme aux normes françaises.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { color: '#292524', bg: '#f5f5f4', border: '#e7e5e4', title: 'Extraction OCR factures PDF', desc: "Importez vos factures PDF fournisseurs. L'IA Gemini extrait automatiquement fournisseur, SIRET, montants HT/TTC, TVA et dates d'échéance en moins de 5 secondes. Compatible avec toutes les factures françaises.", items: ['Fournisseur et numéro SIRET', 'Montants HT, TVA, TTC automatiques', 'Date facture et date échéance', 'Détection des doublons'] },
                { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', title: 'Réconciliation bancaire CSV', desc: "Exportez votre relevé bancaire depuis BNP, Société Générale, LCL, CIC ou Crédit Agricole Toulouse. InvoiceAgent rapproche automatiquement chaque transaction avec vos factures.", items: ['Compatible toutes banques françaises', 'Matching automatique par IA', 'Score de confiance 0-100%', 'Alertes factures impayées'] },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', title: 'Analyse contrats fournisseurs', desc: "Avant de signer un contrat fournisseur toulouseien, uploadez-le dans InvoiceAgent. L'IA détecte les clauses à risque, frais cachés et pénalités de retard abusives.", items: ['Clauses à risque Haut/Moyen/Faible', 'Frais cachés et commissions', 'Pénalités de retard', 'Reconductions tacites détectées'] },
                { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', title: 'Export FEC conforme DGFiP', desc: "Générez votre Fichier des Écritures Comptables automatiquement. Conforme à l'arrêté du 29 juillet 2013, compatible avec tous les cabinets comptables toulouseiens.", items: ['18 champs FEC obligatoires', 'Compatible Sage, EBP, Cegid, Coala', 'Prêt pour contrôle DGFiP', 'Export par exercice comptable'] },
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

        <section aria-labelledby="profiles-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="profiles-heading" style={{ textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Pour tous les professionnels toulouseiens
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { title: 'PME du Compans, Labège et Toulouse Aerospace', desc: "Les entreprises du quartier d'affaires toulouseien traitent des volumes élevés de factures. InvoiceAgent automatise l'extraction et la réconciliation pour vos équipes financières." },
                { title: 'Startups et scale-ups toulouseiennes', desc: "Station F, Toulouse Saclay, BPI France — les startups toulouseiennes à forte croissance ont besoin d'une solution comptable scalable. InvoiceAgent traite 1 ou 10 000 factures par mois." },
                { title: 'Artisans et TPE toulouseiens', desc: "Plombiers, électriciens, peintres du Grand Toulouse — gérez vos factures fournisseurs depuis votre smartphone. L'OCR IA reconnaît tous les formats, même les photos de reçus." },
                { title: 'Cabinets comptables toulouseiens', desc: "Les cabinets d'expertise comptable toulouseiens utilisent InvoiceAgent pour automatiser la saisie de leurs clients PME. Export FEC multi-clients compatible Sage et EBP." },
              ].map((p) => (
                <div key={p.title} style={{ backgroundColor: 'white', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#292524', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="avantages-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="avantages-heading" style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
              Pourquoi les entreprises toulouseiennes choisissent InvoiceAgent
            </h2>
            <div style={{ backgroundColor: '#f5f5f4', border: '1px solid #e7e5e4', borderRadius: '16px', padding: '40px' }}>
              <p style={{ color: '#292524', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                Toulouse concentre 6% des entreprises françaises et génère un volume considérable de factures et de contrats commerciaux. Les entreprises toulouseiennes font face à des exigences comptables strictes : délais de paiement encadrés par la LME (Loi de Modernisation de l'Économie), obligations FEC en cas de contrôle fiscal, conformité RGPD pour les données financières.
              </p>
              <p style={{ color: '#292524', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                InvoiceAgent répond à ces exigences : extraction automatique des factures PDF par IA, génération du FEC conforme DGFiP, réconciliation bancaire compatible avec les principales banques toulouseiennes (BNP, Société Générale, LCL, CIC, Crédit Agricole Occitanie) et hébergement des données en Europe, conforme au RGPD.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  'OCR factures PDF en moins de 5 secondes',
                  'Compatible banques IDF : BNP, SG, LCL, CIC',
                  'Export FEC DGFiP conforme',
                  'Analyse contrats avant signature',
                  'Alertes TVA et paiements impayés',
                  'Aucune installation — 100% cloud',
                  'Support en français',
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

        <section id="faq" aria-labelledby="faq-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="faq-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes — Facturation Toulouse
            </h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section aria-label="Liens internes" style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'Logiciel facturation Paris', href: `${BASE_URL}/logiciel-facturation-paris` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#292524', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Appel à l'action" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Automatisez votre facturation à Toulouse</h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>5 factures gratuites — sans carte bancaire, sans installation.</p>
          <p style={{ fontSize: '15px', marginBottom: '36px', opacity: 0.6 }}>Rejoignez les PME et indépendants toulouseiens qui ont automatisé leur comptabilité avec InvoiceAgent.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}