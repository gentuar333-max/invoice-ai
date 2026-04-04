import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-freelance`

export const metadata: Metadata = {
  title: 'Facturation Freelance Automatique par IA | InvoiceAgent',
  description: "Automatisez votre facturation freelance avec l'IA. Extraction PDF, suivi paiements, alertes TVA. Gratuit jusqu'à 5 factures. Sans carte bancaire.",
  keywords: ['facturation freelance', 'logiciel facturation indépendant', 'facture auto-entrepreneur', 'OCR facture freelance', 'gestion factures freelance France', 'AI invoice agent freelance'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Facturation Freelance Automatique par IA — InvoiceAgent', description: "Automatisez votre facturation freelance. Extraction PDF, suivi paiements, alertes TVA.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website', images: [{ url: `${BASE_URL}/og-freelance.png`, width: 1200, height: 630, alt: 'Facturation freelance automatique InvoiceAgent' }] },
  twitter: { card: 'summary_large_image', title: 'Facturation Freelance Automatique — InvoiceAgent', description: "Gérez votre facturation freelance en 30 min/mois.", images: [`${BASE_URL}/og-freelance.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Facturation Freelance', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '29', priceCurrency: 'EUR', offerCount: '3' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '112' }, featureList: ['OCR facture PDF automatique', 'Suivi paiements clients', 'Alertes TVA mensuelles', 'Analyse contrats fournisseurs', 'Export FEC comptable'] }
const schemaFAQ = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
  { '@type': 'Question', name: "InvoiceAgent est-il adapté aux auto-entrepreneurs ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent gère la TVA selon votre régime et s'adapte à votre volume de facturation." } },
  { '@type': 'Question', name: "Comment InvoiceAgent gère-t-il la TVA ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent extrait automatiquement le taux de TVA (5.5%, 10% ou 20%) et calcule les montants HT, TVA et TTC. Une alerte mensuelle rappelle les échéances." } },
  { '@type': 'Question', name: "Puis-je utiliser InvoiceAgent sans comptable ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent automatise la saisie et le classement. L'export FEC simplifie le travail de votre comptable." } },
  { '@type': 'Question', name: "InvoiceAgent fonctionne-t-il sur mobile ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Interface responsive, photo smartphone acceptée, extraction en quelques secondes." } },
] }
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Facturation Freelance', item: PAGE_URL }] }

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour démarrer', items: ['5 factures/mois', '1 analyse contrat', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'Freelances actifs', items: ['100 factures/mois', 'Réconciliation bancaire CSV', 'Alertes TVA mensuelles', 'Export CSV+PDF', 'Détection paiements reçus'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: true },
  { name: 'Pro', monthly: 29, desc: 'Freelances & petites agences', items: ['Factures illimitées', '5 analyses contrats/mois', 'Frais cachés détectés', 'Export FEC natif'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: false },
  { name: 'Business', monthly: 49, desc: 'Agences & multi-clients', items: ['Tout Pro inclus', 'Contrats illimités', 'Multi-clients', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "InvoiceAgent est-il adapté aux auto-entrepreneurs ?", a: "Oui. InvoiceAgent est conçu pour les freelances et auto-entrepreneurs français. Il gère la TVA selon votre régime (franchise de base ou TVA applicable) et s'adapte à votre volume de facturation, de 5 à 100 factures par mois." },
  { q: "Comment InvoiceAgent gère-t-il la TVA pour les freelances ?", a: "InvoiceAgent extrait automatiquement le taux de TVA de chaque facture fournisseur (5.5%, 10% ou 20%) et calcule les montants HT, TVA et TTC. Une alerte mensuelle vous rappelle vos échéances de déclaration TVA." },
  { q: "Puis-je utiliser InvoiceAgent sans faire appel à un comptable ?", a: "Oui. InvoiceAgent automatise la saisie et le classement de vos factures. Si vous faites appel à un expert-comptable, l'export FEC lui simplifie considérablement le travail." },
  { q: "InvoiceAgent fonctionne-t-il sur mobile pour les freelances en déplacement ?", a: "Oui. L'interface est entièrement responsive. Photographiez une facture avec votre smartphone et uploadez-la directement. L'IA Gemini extrait les données en quelques secondes, où que vous soyez." },
  { q: "Quel plan choisir pour un freelance actif ?", a: "La plupart des freelances actifs choisissent le plan Starter à 19€/mois (ou 15€/mois en annuel). Il inclut 100 extractions de factures, la réconciliation bancaire CSV et les alertes TVA." },
  { q: "Mes données comptables sont-elles sécurisées ?", a: "Oui. Toutes vos données sont chiffrées et hébergées à Frankfurt, Allemagne (UE), conformément au RGPD. Vos données ne sont jamais partagées avec des tiers." },
]

export default function FacturationFreelancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main>

        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Freelances · Auto-entrepreneurs · Consultants · Indépendants
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              La facturation freelance qui <span style={{ color: '#fbbf24' }}>se gère toute seule</span>
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              En tant que freelance, chaque heure passée sur la comptabilité est une heure de moins sur vos missions. InvoiceAgent automatise l'extraction OCR de vos factures PDF, le suivi des paiements et les alertes TVA.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', margin: '16px 0 40px' }}>
              Selon JPMorgan, les entreprises qui automatisent leur traitement de factures économisent jusqu'à <strong style={{ color: '#fbbf24' }}>360 000 heures de travail</strong> par an. Pour un freelance, cela représente 5 heures récupérées chaque mois.
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

        <section aria-label="Statistiques" style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[{ value: '5h', label: 'Économisées par mois', sub: 'vs gestion manuelle' }, { value: '< 5s', label: 'Par facture extraite', sub: 'OCR PDF ou photo smartphone' }, { value: '19€', label: 'Plan Starter/mois', sub: 'ou 15€/mois en annuel' }, { value: '100%', label: 'Cloud — aucune install', sub: 'accessible partout, sur mobile' }].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#4338ca' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="demo" aria-labelledby="demo-heading" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.3)' }}>Demo gratuite — sans inscription</div>
              <h2 id="demo-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Testez avec votre propre facture</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>Importez une facture fournisseur ou un contrat — l'IA OCR extrait tout en quelques secondes.</p>
            </div>
            <InlineDemo />
          </div>
        </section>

        <section aria-labelledby="problems-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 id="problems-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Les 6 problèmes de facturation que tout freelance connaît</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '56px', fontSize: '16px' }}>Et comment l'agent IA InvoiceAgent les résout automatiquement.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {[
                { color: '#4338ca', problem: 'La saisie manuelle des factures fournisseurs', solution: "L'agent IA InvoiceAgent lit vos factures PDF par OCR et extrait automatiquement fournisseur, SIRET, montants HT/TTC, TVA et date d'échéance en moins de 5 secondes. Zéro saisie manuelle." },
                { color: '#059669', problem: 'Les paiements clients que vous oubliez de relancer', solution: "InvoiceAgent surveille vos factures et vous alerte automatiquement dès qu'un paiement est en retard. Importez votre relevé bancaire CSV — le système rapproche chaque virement reçu avec la facture correspondante." },
                { color: '#dc2626', problem: 'Les déclarations TVA en retard ou erronées', solution: "Une alerte mensuelle vous rappelle vos échéances de déclaration TVA. InvoiceAgent calcule automatiquement vos montants de TVA collectée et déductible, prêts à reporter dans votre déclaration." },
                { color: '#d97706', problem: "Les contrats clients avec des clauses dangereuses", solution: "Avant de signer, uploadez votre contrat dans InvoiceAgent. L'IA identifie les clauses à risque, les pénalités de retard et les frais cachés qui pourraient vous coûter cher." },
                { color: '#7c3aed', problem: "L'export comptable pour votre expert-comptable", solution: "InvoiceAgent exporte vos données en FEC (Fichier des Écritures Comptables), le format standard français. Votre comptable reçoit un fichier propre, structuré et compatible Sage, EBP, Cegid." },
                { color: '#0891b2', problem: 'La gestion comptable depuis un chantier ou en déplacement', solution: "Photographiez une facture avec votre smartphone. L'OCR IA extrait les données en quelques secondes, même depuis une photo floue ou en mauvaise qualité, où que vous soyez." },
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

        <section aria-labelledby="profiles-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="profiles-heading" style={{ textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Adapté à tous les profils de freelances</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { title: 'Développeurs & designers', desc: "Gérez vos factures clients et fournisseurs (licences, outils SaaS, sous-traitance). InvoiceAgent classe et suit chaque facture automatiquement par OCR." },
                { title: 'Consultants & coaches', desc: "Suivez vos honoraires, vérifiez que chaque virement correspond à une mission facturée et exportez vos données pour votre déclaration annuelle." },
                { title: 'Artisans & prestataires', desc: "Scannez vos bons de livraison et factures fournisseurs depuis le chantier. L'IA OCR extrait tout automatiquement, même depuis une photo floue." },
                { title: 'Créatifs & rédacteurs', desc: "Gérez vos factures clients multiples, suivez les retards de paiement et analysez vos contrats avant signature pour éviter les mauvaises surprises." },
              ].map((p) => (
                <div key={p.title} style={{ backgroundColor: 'white', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#4338ca', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="avantages-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="avantages-heading" style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>Pourquoi InvoiceAgent pour votre activité freelance ?</h2>
            <div style={{ backgroundColor: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '16px', padding: '40px' }}>
              <p style={{ color: '#1e1b4b', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                En tant que freelance, votre temps est votre ressource la plus précieuse. Chaque heure passée à saisir des factures, vérifier des paiements ou préparer votre déclaration TVA est une heure facturée en moins à vos clients. Sur une année, cela peut représenter plusieurs milliers d'euros de manque à gagner.
              </p>
              <p style={{ color: '#1e1b4b', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                InvoiceAgent automatise l'ensemble de ces tâches administratives pour moins de 19€ par mois — soit moins d'une heure de votre TJM moyen. Selon JPMorgan, l'automatisation du traitement de factures réduit les coûts administratifs de 60 à 80% pour les indépendants.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['OCR factures PDF en moins de 5 secondes', 'Suivi paiements clients automatique', 'Alertes TVA mensuelles', 'Analyse contrats avant signature', 'Export FEC pour votre comptable', 'Photo depuis smartphone acceptée', 'Aucune installation requise', 'Données RGPD hébergées en Europe'].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#4338ca', flexShrink: 0, marginTop: '2px' }}>→</span>
                    <p style={{ color: '#1e1b4b', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#4338ca" accentBg="#e0e7ff" />

        <section id="faq" aria-labelledby="faq-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="faq-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Questions fréquentes — Facturation freelance</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section aria-label="Liens internes" style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[{ label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` }, { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` }, { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` }, { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` }, { label: 'Facturation artisan', href: `${BASE_URL}/facturation-artisan` }].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#4338ca', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        <section aria-label="Appel à l'action" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Reprenez le contrôle de votre facturation</h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>5 factures gratuites — sans carte bancaire, sans installation.</p>
          <p style={{ fontSize: '15px', marginBottom: '36px', opacity: 0.7 }}>Rejoignez des centaines de freelances français qui ont automatisé leur comptabilité avec InvoiceAgent.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}