import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-btp-construction`

export const metadata: Metadata = {
  title: 'Facturation BTP et Construction Automatique par IA | InvoiceAgent',
  description: "Automatisez la facturation de votre entreprise BTP avec l'IA. Gestion chantiers, TVA 10%, situations de travaux, sous-traitants. Gratuit jusqu'à 5 factures.",
  keywords: ['facturation BTP', 'logiciel facturation construction', 'comptabilité BTP France', 'facture chantier automatique', 'gestion sous-traitants BTP'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Facturation BTP Construction Automatique — InvoiceAgent', description: "Automatisez la facturation BTP. Chantiers, sous-traitants, TVA 10%, situations de travaux.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website', images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Facturation BTP InvoiceAgent' }] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Facturation BTP', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '54' } }
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Quel taux de TVA s'applique dans le BTP ?", acceptedAnswer: { '@type': 'Answer', text: "Dans le BTP, la TVA est de 20% pour les travaux neufs, 10% pour les travaux de rénovation sur logements de plus de 2 ans, et 5.5% pour les travaux de rénovation énergétique. InvoiceAgent gère automatiquement ces 3 taux." } },
    { '@type': 'Question', name: "Comment gérer les factures de sous-traitants BTP ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent extrait automatiquement les données des factures de vos sous-traitants par OCR IA — montants, TVA, SIRET et dates d'échéance. Le rapprochement avec vos situations de travaux est automatisé." } },
    { '@type': 'Question', name: "InvoiceAgent gère-t-il les situations de travaux ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent extrait et classe automatiquement les situations de travaux, les acomptes et les factures de solde. L'IA identifie le type de document et l'associe au chantier correspondant." } },
    { '@type': 'Question', name: "Comment exporter les données pour mon expert-comptable BTP ?", acceptedAnswer: { '@type': 'Answer', text: "Export FEC natif compatible Sage, EBP et Cegid. Les experts-comptables spécialisés BTP peuvent importer directement sans ressaisie." } },
  ],
}
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Facturation BTP Construction', item: PAGE_URL }] }

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour commencer sans risque', items: ['5 factures fournisseurs/mois', 'Scan rapide via smartphone (OCR)', 'Suivi payé / impayé', 'Tableau de bord simple', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'Pour les petites entreprises BTP', items: ['100 factures / mois', 'Calcul automatique de la TVA', 'Réconciliation bancaire (CSV)', 'Alertes factures impayées & TVA', 'Export CSV + PDF', 'Tableau de bord complet'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: true },
  { name: 'Pro', monthly: 29, desc: 'Automatisation avancée + contrats', items: ['Factures illimitées', 'IA détecte les correspondances bancaires', 'Export FEC conforme DGFiP', 'Analyse de contrats (5/mois)', 'Détection des clauses à risque', 'Identification des frais cachés'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: false },
  { name: 'Business', monthly: 49, desc: 'Pour les entreprises BTP sérieuses', items: ['Toutes les fonctionnalités Pro incluses', 'Multi-établissements simplifié', 'Analyse de contrats illimitée', 'Résumé clair en quelques secondes', 'Historique sécurisé (RGPD)', 'Accompagnement personnalisé'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "Quel taux de TVA s'applique dans le BTP ?", a: "Dans le BTP, la TVA varie selon le type de travaux : 20% pour les travaux neufs, 10% pour les travaux de rénovation sur logements de plus de 2 ans, et 5.5% pour les travaux de rénovation énergétique (isolation, chauffage). InvoiceAgent extrait automatiquement le taux applicable depuis vos factures fournisseurs." },
  { q: "Comment gérer les factures de sous-traitants BTP ?", a: "InvoiceAgent extrait automatiquement les données des factures de vos sous-traitants par OCR IA — montants HT/TTC, TVA, SIRET et dates d'échéance. Le rapprochement avec vos relevés bancaires CSV est automatisé." },
  { q: "InvoiceAgent gère-t-il les situations de travaux ?", a: "Oui. InvoiceAgent extrait et classe automatiquement les situations de travaux, les acomptes et les factures de solde. L'IA identifie le type de document et l'associe automatiquement au chantier correspondant." },
  { q: "Comment exporter les données pour mon expert-comptable BTP ?", a: "Export FEC natif compatible Sage, EBP et Cegid. Export CSV et PDF également disponibles. Les experts-comptables spécialisés BTP peuvent importer directement sans ressaisie." },
  { q: "InvoiceAgent fonctionne-t-il sur chantier depuis un smartphone ?", a: "Oui. L'interface est entièrement responsive. Photographiez une facture ou un bon de livraison depuis votre smartphone sur le chantier — l'IA extrait les données en quelques secondes, même en mauvaise qualité." },
]

export default function FacturationBTPPage() {
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
              BTP · Construction · Rénovation · Électricité · Plomberie · Maçonnerie
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Facturation BTP <span style={{ color: '#fbbf24' }}>automatique</span> par IA
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              Gérez les factures fournisseurs et sous-traitants de votre entreprise BTP automatiquement. InvoiceAgent extrait les données par OCR IA — TVA 10%, 20% et 5.5% gérées automatiquement.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: '16px 0 40px' }}>
              Une entreprise BTP traite en moyenne <strong style={{ color: '#fbbf24' }}>50 à 120 factures fournisseurs et sous-traitants par mois</strong>. InvoiceAgent automatise leur traitement.
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

        <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[{ value: '3 taux', label: 'TVA BTP gérés', sub: '5.5% · 10% · 20%' }, { value: '< 5s', label: 'Par facture extraite', sub: 'OCR IA depuis le chantier' }, { value: '19€', label: 'Plan Starter/mois', sub: 'ou 15€/mois en annuel' }, { value: '100%', label: 'Cloud — mobile', sub: 'accessible depuis le chantier' }].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#292524' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="demo" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>Demo gratuite — sans inscription</div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Testez avec une facture chantier</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px' }}>Importez une facture fournisseur ou sous-traitant — l'IA extrait tout en quelques secondes.</p>
            </div>
            <InlineDemo />
          </div>
        </section>

        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Les 5 défis de facturation que tout professionnel BTP connaît</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '56px', fontSize: '16px' }}>Et comment InvoiceAgent les résout automatiquement.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { color: '#292524', problem: 'Les 3 taux de TVA BTP à gérer manuellement', solution: "InvoiceAgent extrait automatiquement le taux de TVA de chaque facture — 20% travaux neufs, 10% rénovation, 5.5% rénovation énergétique. Zéro erreur de TVA sur vos déclarations." },
                { color: '#2563eb', problem: 'Les factures sous-traitants difficiles à rapprocher', solution: "Pour chaque facture sous-traitant, InvoiceAgent extrait le SIRET, les montants HT/TTC et la TVA. Le rapprochement avec votre relevé bancaire CSV est automatique." },
                { color: '#059669', problem: 'La saisie des situations de travaux et acomptes', solution: "L'IA identifie automatiquement les situations de travaux, acomptes et factures de solde. Chaque document est classé et associé au bon chantier sans intervention manuelle." },
                { color: '#7c3aed', problem: 'Les contrats fournisseurs avec des clauses abusives', solution: "Avant de signer avec un fournisseur de matériaux ou un sous-traitant, uploadez le contrat. L'IA détecte les clauses à risque, pénalités et frais cachés." },
                { color: '#d97706', problem: "L'export comptable pour votre expert-comptable", solution: "InvoiceAgent génère le FEC conforme DGFiP directement depuis vos factures traitées. Compatible Sage, EBP et Cegid — votre comptable reçoit un fichier propre et structuré." },
              ].map((item) => (
                <article key={item.problem} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Problème</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', lineHeight: 1.4 }}>{item.problem}</h3>
                  <div style={{ width: '32px', height: '2px', backgroundColor: item.color, marginBottom: '16px' }} />
                  <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Solution InvoiceAgent</div>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{item.solution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#292524" accentBg="#f5f5f4" />

        <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Questions fréquentes — Facturation BTP</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[{ label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` }, { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` }, { label: 'TVA automatique PME', href: `${BASE_URL}/tva-automatique-pme` }, { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` }, { label: 'Facturation artisan', href: `${BASE_URL}/facturation-artisan` }].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#292524', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Automatisez la facturation de votre entreprise BTP</h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.9 }}>5 factures gratuites — sans carte bancaire, sans installation.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}