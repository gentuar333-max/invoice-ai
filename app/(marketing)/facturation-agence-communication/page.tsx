import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-agence-communication`

export const metadata: Metadata = {
  title: 'Facturation Agence de Communication Automatique par IA | InvoiceAgent',
  description: "Automatisez la facturation de votre agence de communication avec l'IA. Gestion honoraires, TVA 20%, contrats prestataires, réconciliation bancaire. Gratuit jusqu'à 5 factures.",
  keywords: ['facturation agence communication', 'logiciel facturation agence marketing', 'comptabilité agence pub', 'gestion factures prestataires agence', 'TVA agence communication France'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Facturation Agence Communication Automatique — InvoiceAgent', description: "Automatisez la facturation de votre agence. Honoraires, prestataires, TVA 20%, contrats.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website', images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Facturation agence communication InvoiceAgent' }] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Facturation Agence Communication', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '48' } }
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment gérer les factures de prestataires d'une agence de communication ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent extrait automatiquement les données des factures de vos prestataires par OCR IA. Montants HT/TTC, TVA 20% et dates d'échéance sont extraits en moins de 5 secondes." } },
    { '@type': 'Question', name: "Comment analyser les contrats clients d'une agence ?", acceptedAnswer: { '@type': 'Answer', text: "Uploadez votre contrat dans InvoiceAgent. L'IA identifie les clauses à risque, les pénalités de retard, les conditions de résiliation et les droits de propriété intellectuelle problématiques." } },
    { '@type': 'Question', name: "InvoiceAgent gère-t-il la facturation multi-clients ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent gère simultanément les factures de tous vos clients et prestataires. Le rapprochement bancaire CSV identifie automatiquement les virements de chaque client." } },
    { '@type': 'Question', name: "Comment exporter les données pour mon expert-comptable ?", acceptedAnswer: { '@type': 'Answer', text: "Export FEC natif compatible Sage, EBP et Cegid. Votre comptable peut importer directement sans ressaisie." } },
  ],
}
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Facturation Agence Communication', item: PAGE_URL }] }

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour commencer sans risque', items: ['5 factures fournisseurs/mois', 'Scan rapide via smartphone (OCR)', 'Suivi payé / impayé', 'Tableau de bord simple', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'Pour les petites agences', items: ['100 factures / mois', 'Calcul automatique de la TVA', 'Réconciliation bancaire (CSV)', 'Alertes factures impayées & TVA', 'Export CSV + PDF', 'Tableau de bord complet'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: true },
  { name: 'Pro', monthly: 29, desc: 'Automatisation avancée + contrats', items: ['Factures illimitées', 'IA détecte les correspondances bancaires', 'Export FEC conforme DGFiP', 'Analyse de contrats (5/mois)', 'Détection des clauses à risque', 'Identification des frais cachés'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: false },
  { name: 'Business', monthly: 49, desc: 'Pour les agences multi-clients', items: ['Toutes les fonctionnalités Pro incluses', 'Multi-établissements simplifié', 'Analyse de contrats illimitée', 'Résumé clair en quelques secondes', 'Historique sécurisé (RGPD)', 'Accompagnement personnalisé'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "Comment gérer les factures de prestataires d'une agence de communication ?", a: "InvoiceAgent extrait automatiquement les données des factures de vos prestataires (graphistes, rédacteurs, photographes, développeurs web, influenceurs) par OCR IA. Montants HT/TTC, TVA 20% et dates d'échéance sont extraits en moins de 5 secondes." },
  { q: "Comment analyser les contrats clients d'une agence ?", a: "Uploadez votre contrat client ou prestataire dans InvoiceAgent. L'IA identifie les clauses à risque, les pénalités de retard, les conditions de résiliation et les clauses relatives aux droits de propriété intellectuelle — souvent problématiques dans les contrats de communication." },
  { q: "InvoiceAgent gère-t-il la facturation multi-clients d'une agence ?", a: "Oui. InvoiceAgent gère simultanément les factures de tous vos clients et prestataires. Le rapprochement bancaire CSV identifie automatiquement les virements de chaque client et les associe à la facture correspondante." },
  { q: "Comment suivre les honoraires et les notes de frais ?", a: "InvoiceAgent extrait et classe automatiquement les honoraires, les refacturations client et les notes de frais. Chaque dépense est catégorisée et prête à être intégrée dans votre reporting mensuel." },
  { q: "Comment exporter les données comptables pour mon expert-comptable ?", a: "Export FEC natif compatible Sage, EBP et Cegid. Export CSV et PDF disponibles sur tous les plans. Votre comptable peut importer directement sans ressaisie." },
]

export default function FacturationAgenceCommunicationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main>

        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Agences de communication · Marketing · Publicité · Digital · RP
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Facturation agence de communication <span style={{ color: '#a5b4fc' }}>automatique</span> par IA
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              Gérez les factures prestataires, honoraires clients et contrats de votre agence automatiquement. InvoiceAgent extrait les données par OCR IA et analyse vos contrats en quelques secondes.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: '16px 0 40px' }}>
              Une agence de communication gère en moyenne <strong style={{ color: '#a5b4fc' }}>30 à 80 factures prestataires par mois</strong> — graphistes, rédacteurs, photographes, studios. InvoiceAgent automatise leur traitement.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#a5b4fc', color: '#1e1b4b', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
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
            {[{ value: '80+', label: 'Prestataires/mois', sub: 'moyenne agence active' }, { value: '< 5s', label: 'Par facture extraite', sub: 'OCR IA Gemini' }, { value: '19€', label: 'Plan Starter/mois', sub: 'ou 15€/mois en annuel' }, { value: '5 min', label: 'Pour analyser un contrat', sub: 'clauses à risque détectées' }].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#312e81' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="demo" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #0f0e24 0%, #1e1b4b 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>Demo gratuite — sans inscription</div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Testez avec une facture prestataire</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px' }}>Importez une facture prestataire ou un contrat client — l'IA extrait tout en quelques secondes.</p>
            </div>
            <InlineDemo />
          </div>
        </section>

        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Les 6 défis comptables des agences de communication</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '56px', fontSize: '16px' }}>Et comment InvoiceAgent les résout automatiquement.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { color: '#312e81', problem: 'La gestion des factures de dizaines de prestataires différents', solution: "InvoiceAgent extrait automatiquement les factures de vos graphistes, rédacteurs, développeurs et photographes. Chaque prestataire est reconnu par son SIRET — ses factures sont classées et suivies sans intervention manuelle." },
                { color: '#7c3aed', problem: 'Les contrats clients avec des clauses sur la propriété intellectuelle', solution: "Avant de signer, uploadez votre contrat dans InvoiceAgent. L'IA identifie les clauses relatives à la cession des droits d'auteur, les exclusivités abusives et les conditions de résiliation pénalisantes." },
                { color: '#2563eb', problem: 'Le suivi des paiements sur des missions multi-phases', solution: "Pour les missions à acomptes multiples, InvoiceAgent rapproche chaque virement bancaire avec la facture correspondante. Les missions non soldées sont immédiatement identifiées." },
                { color: '#059669', problem: 'Les notes de frais et refacturations clients', solution: "InvoiceAgent extrait et classe automatiquement les notes de frais refacturables (déplacements, hébergement, impression). Directement disponibles pour intégration dans votre prochaine facture client." },
                { color: '#d97706', problem: "La déclaration TVA mensuelle sur un volume élevé de transactions", solution: "InvoiceAgent calcule automatiquement votre TVA collectée et déductible chaque mois. Une alerte vous rappelle vos échéances de déclaration 7 jours à l'avance." },
                { color: '#dc2626', problem: "L'export comptable pour votre expert-comptable en fin de mois", solution: "Générez votre FEC conforme DGFiP en un clic depuis toutes vos factures du mois. Compatible Sage, EBP et Cegid — votre comptable reçoit un fichier propre et structuré." },
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

        <section style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px', textAlign: 'center' }}>La comptabilité d'une agence de communication : ce que vous devez savoir</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#312e81', marginBottom: '16px' }}>La TVA dans les agences de communication</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
                  Les agences de communication sont soumises au taux normal de TVA de 20% sur la quasi-totalité de leurs prestations : conseil en communication, création graphique, rédaction de contenu, gestion des réseaux sociaux, achat d'espaces publicitaires. Seules quelques prestations spécifiques peuvent bénéficier de taux réduits.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
                  La particularité des agences réside dans la refacturation des achats médias et des prestations sous-traitées. Lorsqu'une agence achète des espaces publicitaires ou fait appel à des prestataires qu'elle refacture à ses clients, la TVA doit être correctement gérée sur les deux flux — entrant et sortant. InvoiceAgent extrait automatiquement la TVA de chaque facture fournisseur et la réconcilie avec les virements clients correspondants.
                </p>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#312e81', marginBottom: '16px' }}>Les contrats en communication : les pièges à éviter</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
                  Les contrats de prestation de communication comportent fréquemment des clauses problématiques. Les trois principales sources de litige sont les clauses de cession de droits d'auteur trop larges, les pénalités de retard disproportionnées et les conditions d'exclusivité qui limitent la liberté commerciale de l'agence.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
                  InvoiceAgent analyse ces contrats en quelques minutes et identifie précisément les clauses à risque, les délais de paiement imposés et les conditions de résiliation. Disponible dès le plan Pro à 29€/mois.
                </p>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#312e81', marginBottom: '16px' }}>Gestion des freelances : facturation et conformité</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginBottom: '16px' }}>
                  Les agences de communication font massivement appel à des freelances — graphistes, rédacteurs, photographes, développeurs web, community managers. Chaque prestataire émet ses propres factures dans des formats différents, avec des taux de TVA variables.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
                  Le volume de factures prestataires peut dépasser 50 à 100 documents par mois pour une agence active. InvoiceAgent normalise automatiquement tous ces formats différents — quel que soit le logiciel utilisé par le prestataire. Le contrôle des SIRET est également automatique.
                </p>
              </div>

              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '16px', padding: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1d4ed8', marginBottom: '16px' }}>Pourquoi les agences choisissent InvoiceAgent</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {['OCR factures prestataires en moins de 5 secondes', 'Reconnaissance automatique du taux de TVA', 'Rapprochement bancaire CSV automatique', 'Analyse contrats avant signature', 'Export FEC pour expert-comptable', 'Suivi impayés clients en temps réel', 'Alertes déclaration TVA mensuelle', 'Données RGPD hébergées en Europe'].map((item) => (
                    <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#1d4ed8', flexShrink: 0 }}>→</span>
                      <p style={{ color: '#1e3a8a', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#312e81" accentBg="#ede9fe" />

        <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Questions fréquentes — Facturation agence de communication</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[{ label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` }, { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` }, { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` }, { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` }, { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` }].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#312e81', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Automatisez la facturation de votre agence</h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.9 }}>5 factures gratuites — sans carte bancaire, sans installation.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#a5b4fc', color: '#1e1b4b', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}