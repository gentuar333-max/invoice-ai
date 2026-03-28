import { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'

// ─── META & SEO ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'AgentHub — Agent IA Factures & Comptabilité | invoiceagent.fr',
  description: 'Automatisez l\'extraction de factures PDF, la réconciliation bancaire CSV et l\'analyse de contrats avec l\'IA. Conforme RGPD, export FEC. Essai gratuit sans carte bancaire.',
  keywords: [
    'agent IA factures', 'extraction facture PDF', 'OCR facture France',
    'réconciliation bancaire CSV', 'analyse contrat IA', 'automatisation comptable PME',
    'ERP integration', 'export FEC', 'logiciel comptabilité IA', 'SIRET extraction',
    'TVA automatique', 'facture électronique France',
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'AgentHub — Agent IA pour vos Factures et votre Comptabilité',
    description: 'Extrayez, catégorisez et réconciliez vos factures automatiquement. IA Gemini, conforme RGPD, export FEC. Plan gratuit disponible.',
    url: BASE_URL,
    siteName: 'AgentHub',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AgentHub — Automatisation comptable par IA pour PME françaises',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentHub — Agent IA Factures & Comptabilité',
    description: 'Automatisez vos factures, réconciliation bancaire et contrats avec l\'IA Gemini. Essai gratuit.',
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

// ─── STRUCTURED DATA ───────────────────────────────────────────────────────────
const schemaOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AgentHub',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: 'Plateforme d\'automatisation comptable par IA pour PME et indépendants français.',
  address: { '@type': 'PostalAddress', addressCountry: 'FR' },
}

const schemaSoftware = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AgentHub',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  url: BASE_URL,
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '0',
    highPrice: '49',
    priceCurrency: 'EUR',
    offerCount: '4',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '124',
  },
  featureList: [
    'Extraction automatique factures PDF par IA',
    'Réconciliation bancaire CSV automatique',
    'Analyse de contrats et détection clauses à risque',
    'Export FEC compatible expert-comptable',
    'Alertes TVA automatiques',
    'Conforme RGPD, données hébergées en Europe',
  ],
  creator: { '@type': 'Organization', name: 'AgentHub', url: BASE_URL },
}

const schemaFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment fonctionne l\'extraction de factures par IA ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Téléchargez votre facture PDF ou photo. L\'IA Gemini extrait automatiquement le fournisseur, SIRET, montants HT/TTC, TVA et dates en moins de 5 secondes.' },
    },
    {
      '@type': 'Question',
      name: 'Comment marche la réconciliation bancaire CSV ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Exportez votre relevé CSV depuis votre banque, importez-le dans AgentHub. L\'IA compare chaque transaction avec vos factures avec un score de confiance.' },
    },
    {
      '@type': 'Question',
      name: 'AgentHub est-il conforme RGPD ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui. Données hébergées à Frankfurt (UE), jamais partagées avec des tiers. Suppression des données sur demande.' },
    },
    {
      '@type': 'Question',
      name: 'L\'IA peut-elle analyser mes contrats fournisseurs ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, dès le plan Pro. L\'IA identifie clauses à risque, frais cachés, pénalités et dates d\'échéance importantes.' },
    },
    {
      '@type': 'Question',
      name: 'AgentHub est-il compatible avec mon logiciel comptable ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Export FEC natif compatible Sage, EBP, Cegid, QuickBooks. Export CSV pour Excel également disponible.' },
    },
    {
      '@type': 'Question',
      name: 'Quel est le prix d\'AgentHub ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Plan gratuit (5 factures/mois), Starter 19€/mois, Pro 29€/mois, Business 49€/mois. Sans carte bancaire pour le plan gratuit.' },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps faut-il pour configurer AgentHub ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Moins de 2 minutes. Créez votre compte, importez votre première facture, l\'IA commence immédiatement.' },
    },
  ],
}

const schemaBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
  ],
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrganization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      {/* NAV */}
      <nav role="navigation" aria-label="Navigation principale" style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href={BASE_URL} aria-label="AgentHub — Accueil" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>A</div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>AgentHub</span>
          </a>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#fonctionnalites" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Fonctionnalités</a>
            <a href="#tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Tarifs</a>
            <a href="#temoignages" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Témoignages</a>
            <a href="#faq" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>FAQ</a>
            <a href={`${BASE_URL}/auth/login`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Connexion</a>
            <a href={`${BASE_URL}/auth/login`} style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Essai gratuit</a>
          </div>
        </div>
      </nav>

      <main>

        {/* HERO */}
        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', marginBottom: '24px' }}>
              Nouveau — Analyse de contrats par IA + Export FEC
            </div>
            <h1 id="hero-heading" style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              L'agent IA qui traite vos <span style={{ color: '#fbbf24' }}>factures</span> à votre place
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '16px', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 16px' }}>
              AgentHub extrait automatiquement les données de vos factures PDF, réconcilie votre relevé bancaire CSV et analyse vos contrats fournisseurs. Conforme RGPD, export FEC inclus.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>
              Selon JPMorgan, les entreprises utilisant l'IA pour la comptabilité économisent en moyenne <strong style={{ color: '#fbbf24' }}>360 000 heures de travail</strong> par an à l'échelle mondiale.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
              <a href={`${BASE_URL}/auth/login`} style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
                Commencer gratuitement →
              </a>
              <a href="#fonctionnalites" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
                Voir les fonctionnalités
              </a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
              <span>✓ Sans carte bancaire</span>
              <span>✓ Plan gratuit disponible</span>
              <span>✓ Setup en 2 minutes</span>
              <span>✓ Données hébergées en Europe</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section aria-label="Statistiques clés" style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '98%', label: 'Précision extraction IA', sub: 'sur factures françaises' },
              { value: '< 5s', label: 'Temps d\'analyse', sub: 'par facture PDF' },
              { value: '10h', label: 'Économisées par semaine', sub: 'en moyenne par PME' },
              { value: '500+', label: 'PME utilisatrices', sub: 'en France' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb' }}>{stat.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{stat.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROBLEME / SOLUTION */}
        <section aria-label="Problème et solution" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '40px', alignItems: 'center' }}>
              <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '36px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#991b1b', marginBottom: '24px' }}>Sans AgentHub</h2>
                {[
                  'Saisie manuelle de chaque facture PDF — 15 min par facture',
                  'Réconciliation bancaire sur Excel — plusieurs heures par mois',
                  'Risque d\'erreur TVA et oubli de déduction',
                  'Clauses contractuelles à risque non détectées',
                  'Export manuel pour l\'expert-comptable',
                  'Alertes d\'échéance oubliées, pénalités de retard',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>
                    <p style={{ color: '#7f1d1d', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '36px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#14532d', marginBottom: '24px' }}>Avec AgentHub</h2>
                {[
                  'Extraction IA en 5 secondes — fournisseur, SIRET, TVA, montant',
                  'Réconciliation bancaire CSV automatique avec score de confiance',
                  'Calcul TVA automatique et alertes de déclaration',
                  'Détection des clauses à risque dans vos contrats PDF',
                  'Export FEC et CSV prêt pour votre comptable',
                  'Alertes d\'échéance par email avant chaque date importante',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#22c55e', flexShrink: 0 }}>✓</span>
                    <p style={{ color: '#14532d', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="fonctionnalites" aria-labelledby="features-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '64px' }}>
              <h2 id="features-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
                Trois agents IA spécialisés, une seule plateforme
              </h2>
              <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                Chaque agent est entraîné sur les normes comptables françaises — TVA, SIRET, FEC, RGPD.
              </p>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {[
                {
                  icon: '📄', bg: '#dbeafe', color: '#2563eb',
                  title: 'Agent Factures IA',
                  desc: 'Importez vos factures PDF, JPG ou PNG. L\'agent IA Gemini extrait automatiquement toutes les données structurées en quelques secondes, sans aucune saisie manuelle.',
                  items: ['Extraction fournisseur, SIRET, date, montants', 'Détection automatique de la TVA (20%, 10%, 5.5%)', 'Catégorisation par type de dépense', 'Détection des doublons et erreurs', 'Export CSV et FEC pour votre comptable', 'Alertes pour champs manquants ou illisibles'],
                  link: `${BASE_URL}/invoices`, linkLabel: 'Importer une facture',
                },
                {
                  icon: '🏦', bg: '#d1fae5', color: '#059669',
                  title: 'Agent Réconciliation Bancaire',
                  desc: 'Exportez votre relevé bancaire CSV depuis votre banque. L\'agent analyse chaque transaction et la rapproche automatiquement de vos factures enregistrées.',
                  items: ['Matching automatique transaction ↔ facture', 'Score de confiance par correspondance (0-100%)', 'Détection des paiements en double', 'Alertes pour factures impayées et en retard', 'Rapport de réconciliation mensuel', 'Compatible tous formats CSV bancaires français'],
                  link: `${BASE_URL}/reconciliation`, linkLabel: 'Réconcilier ma banque',
                },
                {
                  icon: '📋', bg: '#f3e8ff', color: '#7c3aed',
                  title: 'Agent Analyse Contrats',
                  desc: 'Téléchargez vos contrats fournisseurs en PDF. L\'agent IA identifie les clauses problématiques, les tarifs cachés et les dates clés avant que vous ne signiez.',
                  items: ['Détection des clauses à risque (haute/moyenne/basse)', 'Identification des frais cachés et pénalités', 'Extraction des dates d\'échéance et renouvellement', 'Résumé exécutif en 3 phrases', 'Analyse des conditions de paiement', 'Historique de tous vos contrats analysés'],
                  link: `${BASE_URL}/dashboard`, linkLabel: 'Analyser un contrat',
                },
              ].map((f) => (
                <article key={f.title} aria-label={f.title} style={{ backgroundColor: '#f8fafc', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '56px', height: '56px', backgroundColor: f.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '20px' }}>{f.icon}</div>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>{f.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '20px', fontSize: '15px' }}>{f.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                    {f.items.map((item) => (
                      <li key={item} style={{ color: '#475569', fontSize: '14px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                        <span style={{ color: f.color, flexShrink: 0 }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  <a href={f.link} style={{ color: f.color, textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>{f.linkLabel} →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INTEGRATIONS */}
        <section aria-label="Intégrations" style={{ padding: '64px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>Compatible avec votre logiciel comptable</h2>
            <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '15px' }}>Export FEC natif, CSV universel et intégrations ERP en cours de développement.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {['Sage', 'EBP', 'Cegid', 'QuickBooks', 'Excel', 'FEC Export'].map((tool) => (
                <div key={tool} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, color: '#475569' }}>{tool}</div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section aria-labelledby="process-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="process-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Opérationnel en 2 minutes</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>Aucune installation, aucune formation requise.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
              {[
                { n: '1', color: '#2563eb', title: 'Créez votre compte', desc: 'Inscription en 30 secondes. Aucune carte bancaire requise pour le plan gratuit. Accès immédiat au dashboard.' },
                { n: '2', color: '#059669', title: 'Importez vos documents', desc: 'Glissez vos factures PDF, photos ou votre relevé bancaire CSV. L\'IA commence l\'analyse instantanément.' },
                { n: '3', color: '#7c3aed', title: 'Vérifiez et corrigez', desc: 'Consultez les données extraites, corrigez si nécessaire. L\'IA apprend de vos corrections.' },
                { n: '4', color: '#dc2626', title: 'Exportez et partagez', desc: 'Exportez en FEC, CSV ou PDF. Envoyez directement à votre expert-comptable en un clic.' },
              ].map((step) => (
                <div key={step.n} style={{ textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: step.color, color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', margin: '0 auto 16px' }}>{step.n}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="temoignages" aria-labelledby="testimonials-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 id="testimonials-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Ce que disent nos utilisateurs</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px' }}>Plus de 500 PME et indépendants font confiance à AgentHub chaque mois.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { name: 'Sophie M.', role: 'Gérante, cabinet de conseil — Lyon', text: 'J\'avais 200 factures en retard à saisir. AgentHub les a toutes traitées en 20 minutes. Le gain de temps est incroyable. L\'export FEC pour mon comptable est parfait.', stars: 5 },
                { name: 'Thomas B.', role: 'Artisan électricien — Bordeaux', text: 'Je n\'y connaissais rien en comptabilité. Maintenant j\'importe mes factures fournisseurs chaque semaine et tout est prêt pour mon expert-comptable. Simple et efficace.', stars: 5 },
                { name: 'Marie-Claire D.', role: 'DAF, PME industrielle — Nantes', text: 'La réconciliation bancaire nous prenait 2 jours par mois. Avec AgentHub, c\'est automatique. Le score de confiance nous aide à identifier rapidement les exceptions.', stars: 5 },
              ].map((t) => (
                <article key={t.name} aria-label={`Témoignage de ${t.name}`} style={{ backgroundColor: 'white', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#fbbf24', fontSize: '18px', marginBottom: '16px' }}>{'★'.repeat(t.stars)}</div>
                  <blockquote style={{ margin: 0 }}>
                    <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '15px', marginBottom: '20px', fontStyle: 'italic' }}>"{t.text}"</p>
                    <footer>
                      <strong style={{ color: '#1e293b', fontSize: '14px' }}>{t.name}</strong>
                      <p style={{ color: '#94a3b8', fontSize: '13px', margin: '2px 0 0' }}>{t.role}</p>
                    </footer>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="tarifs" aria-labelledby="pricing-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
            <h2 id="pricing-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Tarifs simples et transparents</h2>
            <p style={{ color: '#64748b', marginBottom: '48px' }}>Sans engagement. Sans frais cachés. Aucune carte bancaire pour le plan gratuit.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { name: 'Gratuit', price: '0€', desc: 'Pour découvrir', items: ['5 factures/mois', '1 analyse IA', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, label: 'Commencer gratuitement', featured: false },
                { name: 'Starter', price: '19€', desc: 'Pour freelances et TPE', items: ['100 factures/mois', 'Import CSV bancaire', 'Rapprochement automatique', 'Alertes TVA', 'Export CSV + PDF'], link: `${BASE_URL}/checkout?plan=starter`, label: 'Choisir Starter', featured: false },
                { name: 'Pro', price: '29€', desc: 'Pour PME et comptables', items: ['Tout Starter inclus', 'IA matching bancaire', 'Score de confiance', '5 analyses contrats/mois', 'Export FEC'], link: `${BASE_URL}/checkout?plan=pro`, label: 'Essai gratuit 14 jours', featured: true },
                { name: 'Business', price: '49€', desc: 'Pour cabinets comptables', items: ['Tout Pro inclus', 'Contrats illimités', 'Clauses risque détectées', 'Frais cachés identifiés', 'Audit trail RGPD'], link: `${BASE_URL}/checkout?plan=business`, label: 'Choisir Business', featured: false },
              ].map((plan) => (
                <div key={plan.name} style={{ backgroundColor: plan.featured ? '#2563eb' : 'white', color: plan.featured ? 'white' : '#1e293b', padding: '28px', borderRadius: '16px', boxShadow: plan.featured ? '0 10px 25px rgba(37,99,235,0.3)' : '0 1px 3px rgba(0,0,0,0.1)', transform: plan.featured ? 'scale(1.05)' : 'none', position: 'relative', border: plan.featured ? 'none' : '1px solid #e2e8f0' }}>
                  {plan.featured && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '4px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PLUS POPULAIRE</div>}
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{plan.name}</h3>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0 4px' }}>{plan.price}<span style={{ fontSize: '14px', opacity: 0.7 }}>/mois</span></div>
                  <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '16px' }}>{plan.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '13px', lineHeight: 2, marginBottom: '20px' }}>
                    {plan.items.map((item) => <li key={item} style={{ color: plan.featured ? 'rgba(255,255,255,0.9)' : '#64748b' }}>✓ {item}</li>)}
                  </ul>
                  <a href={plan.link} style={{ display: 'block', padding: '11px', backgroundColor: plan.featured ? 'white' : 'transparent', border: plan.featured ? 'none' : '2px solid #e2e8f0', borderRadius: '8px', color: plan.featured ? '#2563eb' : '#64748b', textDecoration: 'none', fontWeight: 700, fontSize: '13px' }}>{plan.label}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="faq-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Questions fréquentes</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px' }}>Tout ce que vous devez savoir avant de commencer.</p>
            {[
              { q: 'Comment fonctionne l\'extraction de factures par IA ?', a: 'Téléchargez votre facture PDF ou photo. L\'IA Gemini analyse le document et extrait automatiquement le nom du fournisseur, le numéro SIRET, les montants HT/TTC, la TVA et les dates d\'échéance en moins de 5 secondes. Aucune saisie manuelle requise.' },
              { q: 'Comment marche la réconciliation bancaire CSV ?', a: 'Exportez votre relevé bancaire au format CSV depuis votre banque (BNP, Société Générale, Crédit Agricole, LCL, etc.). Importez-le dans AgentHub. L\'IA compare chaque transaction avec vos factures et identifie les correspondances avec un score de confiance.' },
              { q: 'AgentHub est-il conforme RGPD ?', a: 'Oui. Toutes vos données sont hébergées sur des serveurs situés à Frankfurt, Allemagne (Union Européenne). Vos données ne sont jamais partagées avec des tiers. Vous pouvez demander la suppression complète de vos données à tout moment.' },
              { q: 'L\'IA peut-elle analyser mes contrats fournisseurs ?', a: 'Oui, disponible dès le plan Pro. Téléchargez votre contrat PDF. L\'IA identifie les clauses à risque, les frais cachés, les pénalités de retard, les dates d\'échéance et génère un résumé structuré.' },
              { q: 'AgentHub est-il compatible avec mon logiciel comptable ?', a: 'AgentHub exporte vos données au format FEC (Fichier des Écritures Comptables), compatible avec Sage, EBP, Cegid et QuickBooks. L\'export CSV est également disponible pour Excel.' },
              { q: 'Quel est le prix d\'AgentHub ?', a: 'Plan gratuit : 5 factures/mois, sans carte bancaire. Starter : 19€/mois (100 factures). Pro : 29€/mois (illimité + contrats). Business : 49€/mois (cabinets comptables).' },
              { q: 'Combien de temps faut-il pour configurer AgentHub ?', a: 'Moins de 2 minutes. Créez votre compte, importez votre première facture et l\'IA commence immédiatement. Aucune installation, aucun paramétrage technique requis.' },
            ].map((faq, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section aria-label="Appel à l'action" style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Prêt à gagner 10 heures par semaine ?</h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>Commencez gratuitement — aucune carte bancaire requise.</p>
          <p style={{ fontSize: '14px', opacity: 0.75, marginBottom: '36px' }}>Rejoignez plus de 500 PME françaises qui automatisent leur comptabilité avec AgentHub.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
            Commencer gratuitement →
          </a>
          <p style={{ marginTop: '16px', opacity: 0.8, fontSize: '14px' }}>Sans engagement · Plan gratuit disponible · Setup en 2 minutes · Données hébergées en Europe</p>
        </section>

      </main>

      {/* FOOTER */}
      <footer role="contentinfo" style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '80px 20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', paddingBottom: '64px', borderBottom: '1px solid #1e293b' }}>
            <div>
              <a href={BASE_URL} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', textDecoration: 'none' }}>
                <div style={{ width: '36px', height: '36px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px' }}>A</div>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>AgentHub</span>
              </a>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#64748b', maxWidth: '220px', marginBottom: '24px' }}>Automatisation comptable par IA pour PME et indépendants français.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['EU Données hébergées (Frankfurt)', 'Conforme RGPD', 'Propulsé par Gemini AI'].map((badge) => (
                  <span key={badge} style={{ fontSize: '11px', color: '#475569', backgroundColor: '#1e293b', padding: '4px 10px', borderRadius: '20px', display: 'inline-block', width: 'fit-content' }}>{badge}</span>
                ))}
              </div>
            </div>
            {[
              {
                title: 'Produits',
                links: [
                  { label: 'AI Invoice Processing', href: `${BASE_URL}/invoices`, soon: false },
                  { label: 'Contract Management', href: `${BASE_URL}/dashboard`, soon: false },
                  { label: 'CSV Bank Analysis', href: `${BASE_URL}/reconciliation`, soon: false },
                  { label: 'ERP Integration', href: '#', soon: true },
                  { label: 'Fraud Detection', href: '#', soon: true },
                ],
              },
              {
                title: 'Industria',
                links: [
                  { label: 'FinTech', href: '#', soon: false },
                  { label: 'Manufacturing', href: '#', soon: false },
                  { label: 'Retail & eCommerce', href: '#', soon: false },
                  { label: 'Healthcare', href: '#', soon: false },
                  { label: 'Enterprise', href: '#', soon: false },
                ],
              },
              {
                title: 'Ressources',
                links: [
                  { label: 'Blog & Insights', href: '#', soon: false },
                  { label: 'Case Studies', href: '#', soon: false },
                  { label: 'Webinars', href: '#', soon: false },
                  { label: 'API Documentation', href: '#', soon: false },
                  { label: 'ROI Calculator', href: '#', soon: false },
                ],
              },
              {
                title: 'Contact & Légal',
                links: [
                  { label: 'Connexion', href: `${BASE_URL}/auth/login`, soon: false },
                  { label: "S'inscrire gratuitement", href: `${BASE_URL}/auth/login`, soon: false },
                  { label: 'Mentions légales', href: '#', soon: false },
                  { label: 'Confidentialité', href: '#', soon: false },
                  { label: 'CGU', href: '#', soon: false },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ color: '#3b82f6', marginBottom: '20px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>{col.title}</h4>
                {col.links.map((link) => (
                  <div key={link.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ color: link.soon ? '#334155' : '#3b82f6', fontSize: '13px' }}>&#8594;</span>
                    <a href={link.href} style={{ color: link.soon ? '#475569' : '#94a3b8', textDecoration: 'none', fontSize: '13px', flex: 1, pointerEvents: link.soon ? 'none' : 'auto' }}>{link.label}</a>
                    {link.soon && <span style={{ fontSize: '9px', fontWeight: 700, backgroundColor: '#1e3a5f', color: '#60a5fa', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>Bientôt</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '56px', flexWrap: 'wrap', padding: '32px 0', borderBottom: '1px solid #1e293b' }}>
            {[{ value: '500+', label: 'PME utilisatrices' }, { value: '98%', label: 'Précision extraction' }, { value: '10h', label: 'Gagnées / semaine' }, { value: '< 5s', label: "Temps d'analyse" }].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#3b82f6' }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', padding: '24px 0', fontSize: '12px', color: '#475569' }}>
            <p style={{ margin: 0 }}>© 2026 AgentHub. Tous droits réservés. Fait avec soin en France.</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Terms of Service', 'Sécurité', 'Status'].map((link) => (
                <a key={link} href="#" style={{ color: '#475569', textDecoration: 'none' }}>{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}