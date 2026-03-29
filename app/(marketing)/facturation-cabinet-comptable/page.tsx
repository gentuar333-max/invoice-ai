import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-cabinet-comptable`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Cabinet Comptable par IA | InvoiceAgent',
  description: "Automatisez la facturation de vos clients PME. Extraction PDF, export FEC multi-clients, analyse contrats IA. Gagnez 60% de temps sur la saisie. Essai gratuit.",
  keywords: ['logiciel cabinet comptable', 'facturation cabinet comptable', 'FEC multi-clients', 'automatisation saisie comptable', 'OCR factures expert-comptable', 'logiciel comptable IA France'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Cabinet Comptable — InvoiceAgent',
    description: "Automatisez la facturation de vos clients PME. Export FEC multi-clients, OCR factures, analyse contrats.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-cabinet.png`, width: 1200, height: 630, alt: 'Logiciel cabinet comptable InvoiceAgent' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logiciel Cabinet Comptable — InvoiceAgent',
    description: "Automatisez la saisie de vos clients. FEC multi-clients, OCR factures, analyse contrats IA.",
    images: [`${BASE_URL}/og-cabinet.png`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Cabinet Comptable',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '29', highPrice: '49', priceCurrency: 'EUR', offerCount: '2' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '43' },
  featureList: ['Export FEC multi-clients', 'OCR factures PDF automatique', 'Analyse contrats fournisseurs', 'Dashboard par dossier client', 'Audit trail RGPD'],
}
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "InvoiceAgent gère-t-il plusieurs clients simultanément ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Le plan Business permet de gérer un nombre illimité de dossiers clients, chacun avec son propre dashboard, ses factures et son export FEC individuel." } },
    { '@type': 'Question', name: "Le FEC généré est-il conforme DGFiP ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Le FEC InvoiceAgent respecte l'arrêté du 29 juillet 2013 avec les 18 champs obligatoires. Compatible avec l'outil de vérification officiel Test Compta Demat." } },
    { '@type': 'Question', name: "Avec quels logiciels comptables le FEC est-il compatible ?", acceptedAnswer: { '@type': 'Answer', text: "Compatible Sage 50, Sage 100, EBP Compta, Cegid, QuickBooks, Coala, Pennylane, ACD, Ciel Compta et tous les logiciels acceptant le format FEC standard DGFiP." } },
    { '@type': 'Question', name: "Comment les clients transmettent-ils leurs factures ?", acceptedAnswer: { '@type': 'Answer', text: "Les clients téléchargent leurs factures PDF directement dans InvoiceAgent. L'IA extrait automatiquement les données. Le cabinet récupère les fichiers structurés prêts à importer." } },
    { '@type': 'Question', name: "InvoiceAgent est-il conforme RGPD pour les données clients ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Données hébergées à Frankfurt (UE), chiffrées AES-256, jamais partagées. Audit trail complet sur le plan Business pour traçabilité RGPD. Suppression sur demande." } },
    { '@type': 'Question', name: "Quel plan pour un cabinet comptable ?", acceptedAnswer: { '@type': 'Answer', text: "Le plan Business à 49€/mois (ou 39€/mois en annuel) est conçu pour les cabinets : FEC multi-clients illimité, analyses de contrats illimitées, audit trail RGPD et support prioritaire dédié." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Cabinet Comptable', item: PAGE_URL },
  ],
}

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour tester', items: ['5 factures/mois', '1 analyse contrat', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'TPE & Freelances', items: ['100 factures/mois', 'Réconciliation CSV', 'Alertes TVA', 'Export CSV+PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
  { name: 'Pro', monthly: 29, desc: 'Petits cabinets', items: ['Factures illimitées', 'Export FEC natif DGFiP', '5 analyses contrats/mois', 'Score de confiance IA'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: false },
  { name: 'Business', monthly: 49, desc: 'Cabinets comptables', items: ['Tout Pro inclus', 'FEC multi-clients illimité', 'Contrats illimités', 'Audit trail RGPD', 'Support prioritaire dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: true },
]

const faqs = [
  { q: "InvoiceAgent gère-t-il plusieurs clients simultanément ?", a: "Oui. Le plan Business permet de gérer un nombre illimité de dossiers clients depuis un seul dashboard. Chaque client dispose de son propre espace avec ses factures, sa réconciliation bancaire et son export FEC individuel. Vous basculez d'un dossier à l'autre en un clic." },
  { q: "Le FEC généré est-il conforme DGFiP ?", a: "Oui. Le FEC InvoiceAgent respecte l'arrêté du 29 juillet 2013 avec les 18 champs obligatoires (JournalCode, EcritureNum, CompteNum, Debit, Credit, etc.). Il peut être contrôlé immédiatement avec l'outil officiel Test Compta Demat de la DGFiP avant transmission." },
  { q: "Avec quels logiciels comptables le FEC est-il compatible ?", a: "Compatible avec Sage 50, Sage 100, EBP Compta, Cegid, QuickBooks, Coala, Pennylane, ACD, Ciel Compta et tous les logiciels acceptant le format FEC standard DGFiP. Import direct sans ressaisie." },
  { q: "Comment les clients PME transmettent-ils leurs factures au cabinet ?", a: "Les clients téléchargent leurs factures PDF directement dans InvoiceAgent depuis leur smartphone ou ordinateur. L'IA extrait automatiquement toutes les données. Le cabinet récupère les données structurées prêtes à importer, sans ressaisie manuelle." },
  { q: "InvoiceAgent est-il conforme RGPD pour les données comptables des clients ?", a: "Oui. Toutes les données sont hébergées à Frankfurt, Allemagne (UE), chiffrées AES-256 en transit et au repos. Le plan Business inclut un audit trail complet pour la traçabilité RGPD. Suppression des données sur demande." },
  { q: "Quel plan choisir pour un cabinet comptable ?", a: "Le plan Business à 49€/mois (ou 39€/mois en annuel) est conçu spécifiquement pour les cabinets : FEC multi-clients illimité, analyses de contrats illimitées, audit trail RGPD complet et support prioritaire dédié." },
]

export default function FacturationCabinetComptablePage() {
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
              Cabinets comptables · Experts-comptables · DAF · Commissaires aux comptes
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Automatisez la saisie de vos clients <span style={{ color: '#fbbf24' }}>avec l'IA</span>
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              InvoiceAgent extrait automatiquement les données de vos factures clients PDF, génère les FEC conformes DGFiP et analyse les contrats fournisseurs — pour que vous vous concentriez sur le conseil à haute valeur ajoutée.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: '16px 0 40px' }}>
              Selon l'Ordre des Experts-Comptables, la saisie manuelle représente <strong style={{ color: '#fbbf24' }}>40% du temps</strong> d'un collaborateur comptable. InvoiceAgent réduit ce temps de 60 à 80%.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.2)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.6)', flexWrap: 'wrap' }}>
              <span>FEC conforme DGFiP inclus</span>
              <span>Multi-clients illimité</span>
              <span>RGPD — audit trail complet</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section aria-label="Statistiques" style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '60%', label: 'Réduction temps saisie', sub: 'vs traitement manuel' },
              { value: '< 5s', label: 'Par facture extraite', sub: 'OCR IA Gemini' },
              { value: '18', label: 'Champs FEC auto', sub: 'conformes DGFiP' },
              { value: '100%', label: 'Multi-clients', sub: 'dossiers illimités' },
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
                Testez l'extraction et l'analyse en direct
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
              Tout ce qu'InvoiceAgent fait pour votre cabinet
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '56px', fontSize: '16px' }}>
              De la réception des factures clients à la génération du FEC — entièrement automatisé.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { color: '#292524', bg: '#f5f5f4', border: '#e7e5e4', title: 'OCR factures PDF multi-clients', desc: "Vos clients PME téléchargent leurs factures directement dans InvoiceAgent. L'IA extrait automatiquement fournisseur, SIRET, montants HT/TTC, TVA et dates — sans ressaisie manuelle de votre part.", items: ['Extraction en moins de 5 secondes', 'Reconnaissance SIRET automatique', 'Gestion TVA 5.5%, 10%, 20%', 'Détection des doublons automatique'] },
                { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', title: 'Export FEC conforme DGFiP', desc: "Générez le Fichier des Écritures Comptables de chaque client en un clic. Conforme à l'arrêté du 29 juillet 2013, avec les 18 champs obligatoires, prêt pour l'import dans Sage, EBP ou Cegid.", items: ['18 champs FEC obligatoires', 'Compatible Sage, EBP, Cegid, Coala', 'Contrôle Test Compta Demat', 'Export par exercice comptable'] },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', title: 'Analyse contrats fournisseurs clients', desc: "Analysez les contrats de vos clients PME avant qu'ils ne signent. L'IA identifie les clauses à risque, les frais cachés, les pénalités abusives et les reconductions tacites — une valeur ajoutée que vos clients apprécieront.", items: ['Clauses à risque Haut/Moyen/Faible', 'Frais cachés et commissions', 'Pénalités de retard détectées', 'Rapport exportable par client'] },
                { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', title: 'Réconciliation bancaire CSV clients', desc: "Importez les relevés bancaires CSV de vos clients. L'IA rapproche automatiquement chaque transaction avec les factures enregistrées. Score de confiance pour chaque correspondance.", items: ['Import CSV toutes banques françaises', 'Matching automatique par IA', 'Score de confiance 0-100%', 'Alertes factures impayées'] },
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

        {/* WORKFLOW CABINET */}
        <section aria-labelledby="workflow-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="workflow-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Le workflow InvoiceAgent pour votre cabinet
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>
              De la réception des documents clients à la remise du FEC — un processus entièrement automatisé.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              {[
                { n: '01', color: '#292524', title: 'Le client uploade ses factures', desc: "Votre client PME télécharge ses factures PDF ou photos depuis son smartphone. Aucune formation requise." },
                { n: '02', color: '#2563eb', title: "L'IA extrait les données", desc: "InvoiceAgent extrait automatiquement tous les champs comptables en moins de 5 secondes par facture." },
                { n: '03', color: '#7c3aed', title: 'Vous vérifiez en quelques minutes', desc: "Vous contrôlez les données extraites depuis votre dashboard cabinet. Corrections manuelles si nécessaire." },
                { n: '04', color: '#059669', title: 'Vous exportez le FEC', desc: "Générez le FEC DGFiP en un clic et importez-le directement dans Sage, EBP ou Cegid. Zéro ressaisie." },
              ].map((step) => (
                <article key={step.n} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '36px', height: '36px', backgroundColor: step.color, color: 'white', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, marginBottom: '14px' }}>{step.n}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* AVANTAGES */}
        <section aria-labelledby="avantages-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="avantages-heading" style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
              Pourquoi les cabinets choisissent InvoiceAgent
            </h2>
            <div style={{ backgroundColor: '#f5f5f4', border: '1px solid #e7e5e4', borderRadius: '16px', padding: '40px' }}>
              <p style={{ color: '#292524', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                La saisie manuelle des factures clients est la tâche la plus chronophage et la moins valorisante d'un cabinet comptable. Selon l'Ordre des Experts-Comptables, elle représente en moyenne 40% du temps d'un collaborateur — du temps qui pourrait être consacré au conseil fiscal, à la relation client et au développement du cabinet.
              </p>
              <p style={{ color: '#292524', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                InvoiceAgent automatise intégralement cette chaîne : réception des factures clients, extraction OCR des données, génération du FEC DGFiP et réconciliation bancaire. Vos collaborateurs se concentrent sur la valeur ajoutée. Vos clients reçoivent un service plus rapide et plus précis.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  'OCR factures PDF multi-clients illimité',
                  'FEC conforme DGFiP en un clic',
                  'Dashboard séparé par dossier client',
                  'Analyse contrats fournisseurs clients',
                  'Réconciliation bancaire CSV automatique',
                  'Audit trail RGPD complet',
                  'Compatible Sage, EBP, Cegid',
                  'Support prioritaire dédié cabinets',
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
              Questions fréquentes — Cabinet comptable
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
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#292524', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Appel à l'action" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Réduisez de 60% le temps de saisie de votre cabinet</h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>OCR multi-clients, FEC DGFiP automatique, analyse contrats.</p>
          <p style={{ fontSize: '15px', marginBottom: '36px', opacity: 0.6 }}>Rejoignez les cabinets comptables qui ont automatisé leur saisie avec InvoiceAgent.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}