import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-restaurant`

export const metadata: Metadata = {
  title: 'Facturation Restaurant Automatique par IA | InvoiceAgent',
  description: "Automatisez la facturation de votre restaurant avec l'IA. Gestion fournisseurs, TVA 10%, réconciliation bancaire. Gratuit jusqu'à 5 factures. Sans carte bancaire.",
  keywords: ['facturation restaurant', 'logiciel facturation restauration', 'comptabilité restaurant France', 'TVA 10% restauration', 'gestion factures fournisseurs restaurant'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Facturation Restaurant Automatique — InvoiceAgent', description: "Automatisez la facturation de votre restaurant. TVA 10%, fournisseurs, réconciliation bancaire.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website', images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Facturation restaurant InvoiceAgent' }] },
  twitter: { card: 'summary_large_image', title: 'Facturation Restaurant — InvoiceAgent', description: "Automatisez la facturation de votre restaurant. TVA 10%, fournisseurs automatiques.", images: [`${BASE_URL}/opengraph-image`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Facturation Restaurant', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '67' } }
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Quel taux de TVA s'applique en restauration ?", acceptedAnswer: { '@type': 'Answer', text: "En restauration, la TVA est de 10% sur les ventes sur place et à emporter (repas, boissons non alcoolisées). La TVA est de 20% sur les boissons alcoolisées. InvoiceAgent gère automatiquement ces taux." } },
    { '@type': 'Question', name: "Comment gérer les factures fournisseurs d'un restaurant ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent extrait automatiquement les données de vos factures fournisseurs (Metro, Promocash, Rungis) par OCR IA. Fournisseur, montants, TVA et dates sont extraits en moins de 5 secondes." } },
    { '@type': 'Question', name: "InvoiceAgent est-il adapté aux restaurants indépendants ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Le plan Starter à 19€/mois couvre 100 factures fournisseurs par mois, la réconciliation bancaire et les alertes TVA — idéal pour un restaurant indépendant." } },
    { '@type': 'Question', name: "Comment exporter les données pour mon expert-comptable ?", acceptedAnswer: { '@type': 'Answer', text: "Export FEC natif compatible Sage, EBP et Cegid. Export CSV et PDF disponibles sur tous les plans." } },
  ],
}
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Facturation Restaurant', item: PAGE_URL }] }

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour démarrer', items: ['5 factures/mois', '1 analyse contrat', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'Restaurants indépendants', items: ['100 factures/mois', 'Réconciliation bancaire CSV', 'Alertes TVA 10%', 'Export CSV+PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: true },
  { name: 'Pro', monthly: 29, desc: 'Restaurants & groupes', items: ['Factures illimitées', 'Export FEC natif', '5 analyses contrats/mois', 'Frais cachés détectés'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: false },
  { name: 'Business', monthly: 49, desc: 'Chaînes & franchises', items: ['Tout Pro inclus', 'Multi-établissements', 'Contrats illimités', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "Quel taux de TVA s'applique en restauration ?", a: "En restauration, la TVA est de 10% sur les ventes sur place et à emporter (repas, boissons non alcoolisées). La TVA est de 20% sur les boissons alcoolisées et 5.5% sur certains produits alimentaires de base. InvoiceAgent extrait et gère automatiquement ces différents taux." },
  { q: "Comment gérer les factures fournisseurs d'un restaurant ?", a: "InvoiceAgent extrait automatiquement les données de vos factures fournisseurs (Metro, Promocash, Rungis, grossistes locaux) par OCR IA. Fournisseur, montants HT/TTC, TVA et dates d'échéance sont extraits en moins de 5 secondes — même depuis une photo smartphone." },
  { q: "InvoiceAgent est-il adapté aux restaurants indépendants ?", a: "Oui. Le plan Starter à 19€/mois (ou 15€/mois en annuel) couvre 100 factures fournisseurs par mois, la réconciliation bancaire CSV et les alertes TVA — idéal pour un restaurant indépendant traitant 50 à 80 factures fournisseurs par mois." },
  { q: "Comment exporter les données pour mon expert-comptable ?", a: "InvoiceAgent exporte vos données en FEC (Fichier des Écritures Comptables) compatible Sage, EBP et Cegid. Export CSV et PDF également disponibles. Votre expert-comptable peut importer directement sans ressaisie." },
  { q: "Puis-je gérer plusieurs établissements ?", a: "Oui, dès le plan Business à 49€/mois. Il permet de gérer plusieurs établissements depuis un seul dashboard avec FEC séparé par établissement." },
]

export default function FacturationRestaurantPage() {
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
              Restaurants · Brasseries · Cafés · Traiteurs · Fast-food
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Facturation restaurant <span style={{ color: '#fbbf24' }}>automatique</span> par IA
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              Gérez les factures fournisseurs de votre restaurant automatiquement. InvoiceAgent extrait les données de vos factures Metro, Promocash et Rungis par OCR IA — TVA 10% gérée automatiquement.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: '16px 0 40px' }}>
              Un restaurant indépendant traite en moyenne <strong style={{ color: '#fbbf24' }}>60 à 100 factures fournisseurs par mois</strong>. InvoiceAgent automatise leur traitement en quelques secondes chacune.
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
            {[{ value: '80+', label: 'Factures/mois', sub: 'moyenne restaurant indépendant' }, { value: '< 5s', label: 'Par facture extraite', sub: 'OCR IA Gemini' }, { value: '3 taux', label: 'TVA gérés', sub: '5.5% · 10% · 20%' }, { value: '0€', label: 'Pour commencer', sub: 'sans carte bancaire' }].map((s) => (
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
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Testez avec une facture fournisseur</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', marginBottom: '8px' }}><strong style={{ color: 'white' }}>Facture PDF</strong> — l'IA extrait fournisseur, montants HT/TTC, TVA et date d'échéance en moins de 5 secondes.</p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px' }}><strong style={{ color: 'white' }}>Contrat PDF</strong> — l'IA détecte les clauses à risque, frais cachés et pénalités.</p>
            </div>
            <InlineDemo />
          </div>
        </section>

        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Tout ce qu'InvoiceAgent fait pour votre restaurant</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '56px', fontSize: '16px' }}>De la réception des factures fournisseurs à l'export comptable — automatisé.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { color: '#292524', bg: '#f5f5f4', border: '#e7e5e4', title: 'OCR factures fournisseurs', desc: "Importez vos factures Metro, Promocash, Rungis ou de vos grossistes locaux. L'IA extrait automatiquement fournisseur, montants HT/TTC, TVA et dates en moins de 5 secondes.", items: ['Metro, Promocash, Rungis reconnus', 'TVA 5.5%, 10%, 20% automatique', 'Photo smartphone depuis la réserve', 'Détection des doublons'] },
                { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', title: 'Gestion TVA restauration', desc: "InvoiceAgent gère les 3 taux de TVA spécifiques à la restauration : 10% sur les repas, 20% sur les boissons alcoolisées, 5.5% sur certains produits. Alertes mensuelles déclaration.", items: ['TVA 10% repas sur place', 'TVA 20% boissons alcoolisées', 'TVA 5.5% produits alimentaires', 'Alerte déclaration mensuelle'] },
                { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', title: 'Réconciliation bancaire', desc: "Importez votre relevé bancaire CSV depuis votre banque. L'IA rapproche automatiquement chaque transaction fournisseur avec la facture correspondante.", items: ['Compatible toutes banques françaises', 'Matching automatique par IA', 'Alertes factures impayées', 'Rapport mensuel trésorerie'] },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', title: 'Export FEC comptable', desc: "Générez votre FEC conforme DGFiP en un clic. Compatible avec les logiciels utilisés par les experts-comptables spécialisés en restauration.", items: ['FEC conforme arrêté DGFiP', 'Compatible Sage, EBP, Cegid', 'Export par exercice comptable', 'Prêt pour contrôle fiscal'] },
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

        <section style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>Pourquoi les restaurateurs choisissent InvoiceAgent</h2>
            <div style={{ backgroundColor: '#f5f5f4', border: '1px solid #e7e5e4', borderRadius: '16px', padding: '40px' }}>
              <p style={{ color: '#292524', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                La restauration est l'un des secteurs les plus intensifs en facturation fournisseurs. Un restaurant indépendant reçoit en moyenne 60 à 100 factures par mois de ses fournisseurs alimentaires, boissons, consommables et prestataires. La saisie manuelle de ces factures représente 3 à 5 heures de travail administratif hebdomadaire.
              </p>
              <p style={{ color: '#292524', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                InvoiceAgent automatise intégralement ce processus pour moins de 19€ par mois — soit moins d'une heure de votre coût salarial moyen. Les factures Metro, Promocash, Rungis et de vos grossistes locaux sont reconnues et traitées automatiquement.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['OCR factures fournisseurs Metro, Rungis', 'TVA 5.5% / 10% / 20% automatique', 'Réconciliation bancaire CSV', 'Export FEC pour expert-comptable', 'Photo smartphone depuis la réserve', 'Alertes déclaration TVA', 'Multi-établissements (plan Business)', 'Données RGPD hébergées en Europe'].map((item) => (
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

        <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Questions fréquentes — Facturation restaurant</h2>
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
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Automatisez la facturation de votre restaurant</h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.9 }}>5 factures gratuites — sans carte bancaire, sans installation.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}