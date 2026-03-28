import { Metadata } from 'next'

const BASE_URL = const BASE_URL = 'https://invoiceagent.fr'

export const metadata: Metadata = {
  title: 'AgentHub - Automatisation Factures IA | Reconciliation Bancaire | France',
  description: 'Automatisez vos factures, reconciliation bancaire et analyse de contrats avec IA Gemini. Extraction PDF intelligente, import CSV bancaire. Plan gratuit disponible.',
  keywords: ['facture IA', 'reconciliation bancaire', 'automatisation comptable France', 'analyse contrat IA', 'extraction facture PDF', 'CSV bancaire PME'],
  openGraph: {
    title: 'AgentHub - Automatisation Intelligente des Factures',
    description: 'Automatisez vos factures avec IA. Plan gratuit disponible.',
    type: 'website',
    locale: 'fr_FR',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Comment fonctionne l'extraction de factures ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Téléchargez votre PDF ou photo. L'IA Gemini extrait automatiquement le fournisseur, montant, TVA et SIRET en quelques secondes."
      }
    },
    {
      '@type': 'Question',
      name: 'Comment marche la reconciliation bancaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Importez votre CSV bancaire. L'IA associe automatiquement les transactions aux factures correspondantes."
      }
    },
    {
      '@type': 'Question',
      name: 'Est-ce que AgentHub est gratuit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, AgentHub propose un plan gratuit avec 5 factures par mois sans carte bancaire. Plans payants à partir de 19€/mois."
      }
    },
    {
      '@type': 'Question',
      name: "L'IA analyse-t-elle les contrats ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, disponible dès le plan Pro. L'IA détecte les clauses à risque, frais cachés et dates importantes dans vos contrats PDF."
      }
    },
    {
      '@type': 'Question',
      name: 'Mes données sont-elles sécurisées ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vos données sont hébergées sur Supabase (Frankfurt, EU). Conformité RGPD. Jamais partagées avec des tiers."
      }
    }
  ]
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AgentHub',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    description: 'Plan gratuit disponible'
  },
  featureList: [
    'Extraction automatique factures PDF',
    'Reconciliation bancaire CSV',
    'Analyse contrats IA',
    'Detection clauses risque',
    'Alertes TVA automatiques'
  ],
  creator: {
    '@type': 'Organization',
    name: 'AgentHub',
    url: BASE_URL
  }
}

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      {/* NAVIGATION */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>A</div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>AgentHub</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#features" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Fonctionnalités</a>
            <a href="#tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Tarifs</a>
            <a href="#faq" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>FAQ</a>
            <a href={`${BASE_URL}/auth/login`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Connexion</a>
            <a href={`${BASE_URL}/auth/login`} style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Essai gratuit</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', marginBottom: '24px' }}>
            Nouveau : Analyse de contrats par IA
          </div>
          <h1 style={{ fontSize: '56px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
            Fini la saisie manuelle des <span style={{ color: '#fbbf24' }}>factures</span>
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '40px', lineHeight: 1.6 }}>
            L'IA extrait automatiquement vos factures, reconcilie votre banque CSV et analyse vos contrats. Gagnez 10 heures par semaine.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
            <a href={`${BASE_URL}/auth/login`} style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
              Commencer gratuitement →
            </a>
            <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
              Voir les tarifs
            </a>
          </div>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
            <span>Sans carte bancaire</span>
            <span>Plan gratuit disponible</span>
            <span>Setup en 2 min</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {[
            { value: '95%', label: 'Précision extraction' },
            { value: '10h', label: 'Économisées/semaine' },
            { value: '2min', label: 'Par facture' },
            { value: '100%', label: 'Automatique' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb' }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontSize: '14px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Trois outils intelligents, une seule plateforme
            </h2>
            <p style={{ color: '#64748b', fontSize: '18px' }}>Finissez avec les tâches manuelles répétitives</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: '📄', bg: '#dbeafe',
                title: 'Extraction Facture IA',
                desc: "Téléchargez PDF ou photo. Gemini AI extrait automatiquement le fournisseur, montant TTC, TVA et numéro SIRET.",
                items: ['Extraction en 2 secondes', 'Reconnaissance SIRET', 'Catégorisation auto', '95% de précision'],
                link: `${BASE_URL}/invoices`, linkLabel: 'Importer une facture', color: '#2563eb'
              },
              {
                icon: '🏦', bg: '#d1fae5',
                title: 'Reconciliation Bancaire CSV',
                desc: "Importez votre relevé bancaire CSV. L'IA associe automatiquement les transactions aux factures.",
                items: ['Matching automatique', 'Détection paiements', 'Alertes retard', 'Export CSV/Rapport'],
                link: `${BASE_URL}/reconciliation`, linkLabel: 'Reconciliation bancaire', color: '#059669'
              },
              {
                icon: '📋', bg: '#f3e8ff',
                title: 'Analyse Contrats IA',
                desc: "Téléchargez un contrat PDF. L'IA détecte les clauses à risque, tarifs cachés et dates importantes.",
                items: ['Clauses à risque', 'Tarifs cachés détectés', 'Dates échéance', 'Résumé intelligent'],
                link: `${BASE_URL}/dashboard`, linkLabel: 'Analyser un contrat', color: '#7c3aed'
              },
            ].map((f) => (
              <div key={f.title} style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ width: '56px', height: '56px', backgroundColor: f.bg, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '16px' }}>{f.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, color: '#64748b', fontSize: '14px', lineHeight: 2, marginBottom: '20px' }}>
                  {f.items.map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
                <a href={f.link} style={{ color: f.color, textDecoration: 'none', fontWeight: 600 }}>{f.linkLabel} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '64px' }}>Comment ça marche ?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { n: '1', title: 'Importez', desc: 'Téléchargez vos factures PDF, photos ou relevé bancaire CSV.' },
              { n: '2', title: "L'IA analyse", desc: 'Gemini AI extrait les données et reconcilie en quelques secondes.' },
              { n: '3', title: 'Validez', desc: 'Consultez votre dashboard avec alertes TVA et reconciliation auto.' },
              { n: '4', title: 'Exportez', desc: 'Exportez vos rapports CSV ou PDF pour votre comptable.' },
            ].map((step) => (
              <div key={step.n}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#2563eb', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', margin: '0 auto 16px' }}>{step.n}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarifs" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Commencez gratuitement</h2>
          <p style={{ color: '#64748b', marginBottom: '48px' }}>Sans engagement. Aucune carte bancaire requise.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Gratuit', price: '0€', desc: 'Pour découvrir', items: ['5 factures/mois', '1 analyse IA', 'Dashboard', 'Export PDF'], link: `${BASE_URL}/auth/login`, label: 'Commencer', featured: false },
              { name: 'Starter', price: '19€', desc: 'Pour freelances et TPE', items: ['100 factures/mois', 'Import CSV bancaire', 'Rapprochement auto', 'Alertes TVA', 'Export CSV + PDF'], link: `${BASE_URL}/checkout?plan=starter`, label: 'Choisir Starter', featured: false },
              { name: 'Pro', price: '29€', desc: 'Pour PME et comptables', items: ['Tout Starter inclus', 'IA matching bancaire', 'Score de confiance', '5 analyses contrats/mois', 'Export FEC'], link: `${BASE_URL}/checkout?plan=pro`, label: 'Essai gratuit', featured: true },
              { name: 'Business', price: '49€', desc: 'Pour cabinets', items: ['Tout Pro inclus', 'Contrats illimités', 'Clauses risque détectées', 'Frais cachés identifiés', 'Audit trail RGPD'], link: `${BASE_URL}/checkout?plan=business`, label: 'Choisir Business', featured: false },
            ].map((plan) => (
              <div key={plan.name} style={{ backgroundColor: plan.featured ? '#2563eb' : 'white', color: plan.featured ? 'white' : '#1e293b', padding: '28px', borderRadius: '16px', boxShadow: plan.featured ? '0 10px 25px rgba(37,99,235,0.3)' : '0 1px 3px rgba(0,0,0,0.1)', transform: plan.featured ? 'scale(1.05)' : 'none', position: 'relative' }}>
                {plan.featured && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '4px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PLUS POPULAIRE</div>
                )}
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
      <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Questions fréquentes</h2>
          {[
            { q: "Comment fonctionne l'extraction de factures ?", a: "Téléchargez votre PDF ou photo de facture. L'IA Gemini extrait automatiquement le fournisseur, montant TTC, TVA et numéro SIRET en quelques secondes." },
            { q: 'Comment marche la reconciliation bancaire ?', a: "Importez votre relevé bancaire au format CSV. L'IA compare automatiquement les transactions avec vos factures et identifie les paiements reçus." },
            { q: 'Est-ce que AgentHub est gratuit ?', a: "Oui, le plan gratuit donne accès à 5 factures par mois sans carte bancaire. Plans payants à partir de 19€/mois." },
            { q: "L'IA analyse-t-elle les contrats ?", a: "Oui, disponible dès le plan Pro. L'IA détecte les clauses à risque, frais cachés et dates importantes dans vos contrats PDF." },
            { q: 'Mes données sont-elles sécurisées ?', a: "Vos données sont hébergées sur Supabase (Frankfurt, EU). Conformité RGPD. Jamais partagées avec des tiers." },
          ].map((faq, i) => (
            <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '24px', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Prêt à gagner 10 heures par semaine ?</h2>
        <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>Commencez gratuitement — aucune carte bancaire requise.</p>
        <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
          Commencer gratuitement →
        </a>
        <p style={{ marginTop: '16px', opacity: 0.8, fontSize: '14px' }}>Sans engagement · Plan gratuit disponible · Setup en 2 minutes</p>
      </section>

      {/* FOOTER — I RI */}
      <footer style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        padding: '80px 20px 0',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* TOP GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '48px',
            paddingBottom: '64px',
            borderBottom: '1px solid #1e293b',
          }}>

            {/* BRAND */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{
                  width: '36px', height: '36px',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontSize: '16px',
                }}>A</div>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>AgentHub</span>
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#64748b', maxWidth: '220px', marginBottom: '24px' }}>
                Automatisation comptable par IA pour PME et indépendants français.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'EU Données hébergées (Frankfurt)',
                  'Conforme RGPD',
                  'Propulsé par Gemini AI',
                ].map((badge) => (
                  <span key={badge} style={{
                    fontSize: '11px', color: '#475569',
                    backgroundColor: '#1e293b',
                    padding: '4px 10px', borderRadius: '20px',
                    display: 'inline-block', width: 'fit-content',
                  }}>{badge}</span>
                ))}
              </div>
            </div>

            {/* PRODUITS */}
            <div>
              <h4 style={{
                color: '#3b82f6', marginBottom: '20px',
                fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '2px',
              }}>Produits</h4>
              {[
                { label: 'AI Invoice Processing', href: `${BASE_URL}/invoices`, soon: false },
                { label: 'Contract Management', href: `${BASE_URL}/dashboard`, soon: false },
                { label: 'CSV Bank Analysis', href: `${BASE_URL}/reconciliation`, soon: false },
                { label: 'ERP Integration', href: '#', soon: true },
                { label: 'Fraud Detection', href: '#', soon: true },
              ].map((link) => (
                <div key={link.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: link.soon ? '#334155' : '#3b82f6', fontSize: '13px' }}>&#8594;</span>
                  <a href={link.href} style={{
                    color: link.soon ? '#475569' : '#94a3b8',
                    textDecoration: 'none', fontSize: '13px', flex: 1,
                    pointerEvents: link.soon ? 'none' : 'auto',
                  }}>{link.label}</a>
                  {link.soon && (
                    <span style={{
                      fontSize: '9px', fontWeight: 700,
                      backgroundColor: '#1e3a5f', color: '#60a5fa',
                      padding: '2px 6px', borderRadius: '4px',
                      textTransform: 'uppercase', letterSpacing: '0.5px',
                    }}>Bientôt</span>
                  )}
                </div>
              ))}
            </div>

            {/* INDUSTRIA */}
            <div>
              <h4 style={{
                color: '#3b82f6', marginBottom: '20px',
                fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '2px',
              }}>Industria</h4>
              {['FinTech', 'Manufacturing', 'Retail & eCommerce', 'Healthcare', 'Enterprise'].map((label) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: '#3b82f6', fontSize: '13px' }}>&#8594;</span>
                  <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px' }}>{label}</a>
                </div>
              ))}
            </div>

            {/* RESSOURCES */}
            <div>
              <h4 style={{
                color: '#3b82f6', marginBottom: '20px',
                fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '2px',
              }}>Ressources</h4>
              {['Blog & Insights', 'Case Studies', 'Webinars', 'API Documentation', 'ROI Calculator'].map((label) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: '#3b82f6', fontSize: '13px' }}>&#8594;</span>
                  <a href="#" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px' }}>{label}</a>
                </div>
              ))}
            </div>

            {/* CONTACT & LEGAL */}
            <div>
              <h4 style={{
                color: '#3b82f6', marginBottom: '20px',
                fontSize: '11px', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '2px',
              }}>Contact & Légal</h4>
              {[
                { label: 'Connexion', href: `${BASE_URL}/auth/login` },
                { label: "S'inscrire gratuitement", href: `${BASE_URL}/auth/login` },
                { label: 'Mentions légales', href: '#' },
                { label: 'Confidentialité', href: '#' },
                { label: 'CGU', href: '#' },
              ].map((link) => (
                <div key={link.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: '#3b82f6', fontSize: '13px' }}>&#8594;</span>
                  <a href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px' }}>{link.label}</a>
                </div>
              ))}
            </div>
          </div>

          {/* STATS BAR */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: '56px', flexWrap: 'wrap',
            padding: '32px 0',
            borderBottom: '1px solid #1e293b',
          }}>
            {[
              { value: '500+', label: 'PME utilisatrices' },
              { value: '98%', label: 'Précision extraction' },
              { value: '10h', label: 'Gagnées / semaine' },
              { value: '< 5s', label: "Temps d'analyse" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#3b82f6' }}>{stat.value}</div>
                <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* BOTTOM BAR */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap',
            gap: '16px', padding: '24px 0',
            fontSize: '12px', color: '#475569',
          }}>
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