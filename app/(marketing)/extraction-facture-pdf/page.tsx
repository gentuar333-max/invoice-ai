import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/extraction-facture-pdf`

// ─── SEO META ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Extraction Facture PDF Automatique par IA | InvoiceAgent',
  description: "Extrayez automatiquement les données de vos factures PDF en 5 secondes. IA Gemini, précision 98%, SIRET, TVA, montants. Essai gratuit sans carte bancaire.",
  keywords: ['extraction facture PDF', 'OCR facture automatique', 'lire facture PDF IA', 'extraction données facture', 'automatisation facture PDF France', 'reconnaissance facture PDF'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Extraction Facture PDF Automatique par IA — InvoiceAgent',
    description: "Extrayez fournisseur, TVA, SIRET et montants de vos factures PDF en 5 secondes. IA Gemini, 98% de précision.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Extraction automatique facture PDF par IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extraction Facture PDF Automatique — InvoiceAgent',
    description: "Extrayez automatiquement les données de vos factures PDF. IA Gemini, 98% de précision.",
    images: [`${BASE_URL}/og-extraction-pdf.png`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── SCHEMA.ORG ──────────────────────────────────────────────────────────────
const schemaOrg = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: 'InvoiceAgent', url: BASE_URL,
  description: "Logiciel d'extraction automatique de factures PDF par IA pour PME françaises.",
  address: { '@type': 'PostalAddress', addressCountry: 'FR' },
}

const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Extraction Facture PDF',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR', offerCount: '4' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '87' },
  featureList: ['Extraction PDF automatique par IA', 'Reconnaissance SIRET', 'Calcul TVA automatique', 'Export FEC et CSV', 'Détection doublons'],
}

const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment fonctionne l'extraction automatique de factures PDF ?", acceptedAnswer: { '@type': 'Answer', text: "Téléchargez votre facture PDF ou photo dans InvoiceAgent. L'IA Gemini analyse le document et extrait automatiquement le nom du fournisseur, le numéro SIRET, les montants HT et TTC, la TVA, la date de facture et la date d'échéance — le tout en moins de 5 secondes, sans aucune saisie manuelle." } },
    { '@type': 'Question', name: "Quels formats de factures sont supportés ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent accepte les factures au format PDF (natif ou scanné), JPG, PNG et WebP. L'IA reconnaît les factures françaises de tous les secteurs, quelle que soit leur mise en page. Les factures manuscrites et les photos prises avec un smartphone sont également supportées." } },
    { '@type': 'Question', name: "Quelle est la précision de l'extraction IA ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent atteint 98% de précision sur les factures françaises standards. Les champs manquants ou illisibles sont clairement signalés pour une vérification manuelle rapide. L'IA s'améliore en continu grâce aux corrections des utilisateurs." } },
    { '@type': 'Question', name: "L'extraction PDF est-elle conforme RGPD ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Toutes vos factures sont traitées et stockées sur des serveurs situés à Frankfurt, Allemagne (Union Européenne). Vos données ne sont jamais utilisées pour entraîner des modèles IA tiers. Suppression complète sur demande." } },
    { '@type': 'Question', name: "Puis-je exporter les données extraites vers mon comptable ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Les données extraites sont exportables en CSV, PDF et FEC (Fichier des Écritures Comptables), compatible avec Sage, EBP, Cegid et QuickBooks. Le plan Pro inclut l'export FEC natif." } },
    { '@type': 'Question', name: "Combien coûte l'extraction automatique de factures ?", acceptedAnswer: { '@type': 'Answer', text: "Le plan gratuit inclut 5 extractions par mois sans carte bancaire. Les plans payants commencent à 19€/mois (Starter, 100 factures), 29€/mois (Pro, illimité) et 49€/mois (Business, cabinets comptables)." } },
  ],
}

const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Extraction Facture PDF', item: PAGE_URL },
  ],
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
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
              Selon McKinsey, la saisie manuelle de factures coûte en moyenne <strong style={{ color: '#fbbf24' }}>15 minutes par document</strong>. Avec l'IA, ce délai tombe à 5 secondes.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href={`${BASE_URL}/invoices`} style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
                Extraire une facture gratuitement →
              </a>
              <a href="#demo" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
                Tester en direct
              </a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
              <span>✓ Gratuit jusqu'à 5 factures/mois</span>
              <span>✓ Sans carte bancaire</span>
              <span>✓ Données hébergées en France (UE)</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section aria-label="Statistiques extraction PDF" style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '98%', label: 'Précision extraction', sub: 'sur factures françaises' },
              { value: '< 5s', label: 'Temps de traitement', sub: 'par facture PDF' },
              { value: '15 min', label: 'Économisées', sub: 'par facture saisie manuellement' },
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

        {/* DEMO LIVE */}
        <section id="demo" aria-labelledby="demo-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
            <h2 id="demo-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Testez l'extraction en direct
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px' }}>
              Importez une vraie facture PDF ou photo — voyez le résultat en 5 secondes, sans inscription.
            </p>
          </div>
          <InlineDemo />
        </section>

        {/* COMMENT CA MARCHE */}
        <section aria-labelledby="process-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="process-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Comment fonctionne l'extraction PDF par IA ?
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>
              Trois étapes, cinq secondes. Aucune configuration requise.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {[
                { n: '01', color: '#2563eb', title: 'Importez votre facture PDF', desc: "Glissez-déposez votre facture PDF, JPG ou PNG dans l'interface. InvoiceAgent accepte tous les formats courants, y compris les scans et photos smartphone. Taille maximale : 10 Mo.", icon: '📄' },
                { n: '02', color: '#059669', title: "L'IA analyse et extrait", desc: "L'IA Gemini analyse la structure de votre facture et extrait automatiquement : nom du fournisseur, numéro SIRET, numéro de facture, date d'émission, date d'échéance, montant HT, TVA, montant TTC et lignes de détail.", icon: '🤖' },
                { n: '03', color: '#7c3aed', title: 'Vérifiez et exportez', desc: "Consultez les données extraites, corrigez si nécessaire, puis exportez en CSV, PDF ou FEC pour votre comptable. Toutes les données sont sauvegardées dans votre dashboard.", icon: '✅' },
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
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                InvoiceAgent extrait tous les champs essentiels d'une facture française conforme.
              </p>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {[
                { category: 'Identification fournisseur', color: '#2563eb', fields: ['Nom du fournisseur', 'Numéro SIRET (14 chiffres)', 'Numéro de TVA intracommunautaire', 'Adresse du fournisseur', 'Coordonnées de contact'] },
                { category: 'Informations de facturation', color: '#059669', fields: ["Numéro de facture", "Date d'émission", "Date d'échéance", "Conditions de paiement", "Référence commande"] },
                { category: 'Montants et taxes', color: '#7c3aed', fields: ['Montant HT (hors taxes)', 'Taux de TVA (5.5%, 10%, 20%)', 'Montant de TVA', 'Montant TTC total', 'Remises et escomptes'] },
                { category: 'Lignes de détail', color: '#dc2626', fields: ['Description de chaque article', 'Quantité et unité', 'Prix unitaire HT', 'Montant total par ligne', 'Catégorie de dépense (auto)'] },
              ].map((cat) => (
                <article key={cat.category} style={{ backgroundColor: 'white', borderRadius: '14px', padding: '28px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: cat.color, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color, display: 'inline-block' }} />
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

        {/* AVANTAGES vs MANUEL */}
        <section aria-label="Avantages extraction IA vs saisie manuelle" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '56px' }}>
              Extraction IA vs saisie manuelle
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '32px' }}>
              <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#991b1b', marginBottom: '20px' }}>Saisie manuelle</h3>
                {[
                  '15 minutes par facture en moyenne',
                  "Risque d'erreur de saisie élevé (3-5%)",
                  'Fastidieux et démotivant pour les équipes',
                  "Impossible à scaler sans embaucher",
                  'Retards de comptabilisation fréquents',
                  'Aucune détection automatique des doublons',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>
                    <p style={{ color: '#7f1d1d', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '32px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#14532d', marginBottom: '20px' }}>Extraction IA — InvoiceAgent</h3>
                {[
                  'Extraction complète en moins de 5 secondes',
                  'Précision de 98% sur factures françaises',
                  'Zéro effort, 100% automatique',
                  'Scalable : 1 ou 10 000 factures par mois',
                  'Comptabilisation immédiate et export FEC',
                  'Détection automatique des doublons',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span>
                    <p style={{ color: '#14532d', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMPATIBILITE */}
        <section aria-label="Compatibilité logiciels comptables" style={{ padding: '64px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Compatible avec votre logiciel comptable
            </h2>
            <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '15px' }}>
              Export FEC natif et CSV universel pour une intégration transparente.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {['Sage', 'EBP', 'Cegid', 'QuickBooks', 'Excel', 'FEC Export'].map((tool) => (
                <div key={tool} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>{tool}</div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section aria-labelledby="testimonials-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 id="testimonials-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Ce qu'en disent les utilisateurs
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face&q=80', name: 'Camille Fontaine', role: 'Directrice financière, Lyon', text: "Nous traitons 300 factures par mois. Avant InvoiceAgent, c'était 75 heures de saisie. Maintenant c'est moins de 30 minutes de vérification. Le ROI est immédiat.", stars: 5 },
                { photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&q=80', name: 'Laurent Mercier', role: 'Gérant PME bâtiment, Bordeaux', text: "Je scanne mes factures fournisseurs avec mon téléphone. InvoiceAgent extrait tout automatiquement et l'export FEC va directement à mon comptable. Révolutionnaire.", stars: 5 },
                { photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face&q=80', name: 'Isabelle Renard', role: 'Expert-comptable, cabinet Paris', text: "J'utilise InvoiceAgent pour mes 40 clients PME. La précision d'extraction est bluffante, même sur des factures scannées en mauvaise qualité. Je recommande.", stars: 5 },
              ].map((t) => (
                <article key={t.name} style={{ backgroundColor: '#f8fafc', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#fbbf24', fontSize: '16px', marginBottom: '16px' }}>{'★'.repeat(t.stars)}</div>
                  <blockquote style={{ margin: 0 }}>
                    <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '14px', fontStyle: 'italic', marginBottom: '20px' }}>"{t.text}"</p>
                    <footer style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={t.photo} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{t.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{t.role}</div>
                      </div>
                    </footer>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="tarifs" aria-labelledby="pricing-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
            <h2 id="pricing-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Tarifs simples et transparents
            </h2>
            <p style={{ color: '#64748b', marginBottom: '48px' }}>Sans engagement. Sans frais cachés. Plan gratuit disponible.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { name: 'Gratuit', price: '0€', desc: 'Pour découvrir', items: ['5 extractions/mois', 'Tous les formats PDF', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
                { name: 'Starter', price: '19€', desc: 'Freelances & TPE', items: ['100 extractions/mois', 'Import CSV bancaire', 'Alertes TVA', 'Export CSV + PDF', 'Détection doublons'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
                { name: 'Pro', price: '29€', desc: 'PME & Comptables', items: ['Extractions illimitées', 'IA matching bancaire', '5 analyses contrats/mois', 'Export FEC natif', 'Support prioritaire'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Essai gratuit 14 jours', featured: true },
                { name: 'Business', price: '49€', desc: 'Cabinets comptables', items: ['Tout Pro inclus', 'Contrats illimités', 'Clauses risque détectées', 'Multi-clients', 'Audit trail RGPD'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
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
        <section id="faq" aria-labelledby="faq-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="faq-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes — Extraction facture PDF
            </h2>
            {[
              { q: "Comment fonctionne l'extraction automatique de factures PDF ?", a: "Téléchargez votre facture PDF ou photo dans InvoiceAgent. L'IA Gemini analyse le document et extrait automatiquement le nom du fournisseur, le numéro SIRET, les montants HT et TTC, la TVA, la date de facture et la date d'échéance — le tout en moins de 5 secondes, sans aucune saisie manuelle." },
              { q: "Quels formats de factures sont supportés ?", a: "InvoiceAgent accepte les factures au format PDF (natif ou scanné), JPG, PNG et WebP. L'IA reconnaît les factures françaises de tous les secteurs, quelle que soit leur mise en page. Les factures manuscrites et les photos prises avec un smartphone sont également supportées." },
              { q: "Quelle est la précision de l'extraction IA ?", a: "InvoiceAgent atteint 98% de précision sur les factures françaises standards. Les champs manquants ou illisibles sont clairement signalés pour une vérification manuelle rapide. L'IA s'améliore en continu grâce aux corrections des utilisateurs." },
              { q: "L'extraction PDF est-elle conforme RGPD ?", a: "Oui. Toutes vos factures sont traitées et stockées sur des serveurs situés à Frankfurt, Allemagne (Union Européenne). Vos données ne sont jamais utilisées pour entraîner des modèles IA tiers. Suppression complète sur demande." },
              { q: "Puis-je exporter les données extraites vers mon comptable ?", a: "Oui. Les données extraites sont exportables en CSV, PDF et FEC (Fichier des Écritures Comptables), compatible avec Sage, EBP, Cegid et QuickBooks. Le plan Pro inclut l'export FEC natif." },
              { q: "Combien coûte l'extraction automatique de factures ?", a: "Le plan gratuit inclut 5 extractions par mois sans carte bancaire. Les plans payants commencent à 19€/mois (Starter, 100 factures), 29€/mois (Pro, illimité) et 49€/mois (Business, cabinets comptables)." },
            ].map((faq, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '24px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section aria-label="Autres fonctionnalités" style={{ padding: '64px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px' }}>
              Découvrez toutes les fonctionnalités InvoiceAgent
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {[
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section aria-label="Appel à l'action" style={{ background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>
            Prêt à extraire vos premières factures ?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>
            Commencez gratuitement — 5 extractions offertes, sans carte bancaire.
          </p>
          <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '36px' }}>
            Rejoignez 500+ PME françaises qui ont automatisé leur saisie de factures.
          </p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
            Extraire une facture gratuitement →
          </a>
          <p style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>
            Sans engagement · RGPD conforme · Données hébergées en Europe
          </p>
        </section>

      </main>

      <SharedFooter />
    </>
  )
}