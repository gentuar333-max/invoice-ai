import { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'

export const metadata: Metadata = {
  title: 'AgentHub — Agent IA Factures & Comptabilité | invoiceagent.fr',
  description: "Automatisez l'extraction de factures PDF, la réconciliation bancaire CSV et l'analyse de contrats avec l'IA. Conforme RGPD, export FEC. Essai gratuit sans carte bancaire.",
  keywords: ['agent IA factures', 'extraction facture PDF', 'OCR facture France', 'réconciliation bancaire CSV', 'analyse contrat IA', 'automatisation comptable PME', 'export FEC', 'logiciel comptabilité IA'],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: 'AgentHub — Agent IA pour vos Factures et votre Comptabilité',
    description: "Extrayez, catégorisez et réconciliez vos factures automatiquement. IA Gemini, conforme RGPD, export FEC.",
    url: BASE_URL, siteName: 'AgentHub', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-image.png`, width: 1200, height: 630, alt: 'AgentHub — Automatisation comptable par IA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentHub — Agent IA Factures & Comptabilité',
    description: "Automatisez vos factures, réconciliation bancaire et contrats avec l'IA Gemini.",
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: 'AgentHub', url: BASE_URL,
  description: "Plateforme d'automatisation comptable par IA pour PME français.",
  address: { '@type': 'PostalAddress', addressCountry: 'FR' },
}
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'AgentHub', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: BASE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR', offerCount: '4' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '124' },
  featureList: ['Extraction automatique factures PDF', 'Réconciliation bancaire CSV', 'Analyse contrats IA', 'Export FEC', 'Alertes TVA', 'Conforme RGPD'],
}
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment fonctionne l'extraction de factures par IA ?", acceptedAnswer: { '@type': 'Answer', text: "Téléchargez votre facture PDF ou photo. L'IA Gemini extrait automatiquement le fournisseur, SIRET, montants HT/TTC, TVA et dates en moins de 5 secondes." } },
    { '@type': 'Question', name: 'Comment marche la réconciliation bancaire CSV ?', acceptedAnswer: { '@type': 'Answer', text: "Exportez votre relevé CSV depuis votre banque, importez-le dans AgentHub. L'IA compare chaque transaction avec vos factures avec un score de confiance." } },
    { '@type': 'Question', name: 'AgentHub est-il conforme RGPD ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. Données hébergées à Frankfurt (UE), jamais partagées avec des tiers.' } },
    { '@type': 'Question', name: "L'IA peut-elle analyser mes contrats fournisseurs ?", acceptedAnswer: { '@type': 'Answer', text: "Oui, dès le plan Pro. L'IA identifie clauses à risque, frais cachés et dates d'échéance." } },
    { '@type': 'Question', name: 'Quel est le prix ?', acceptedAnswer: { '@type': 'Answer', text: 'Plan gratuit (5 factures/mois), Starter 19€/mois, Pro 29€/mois, Business 49€/mois.' } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }],
}

export default function LandingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .landing { background: #09090b; color: #fafafa; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 60px; background: rgba(9,9,11,0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .nav-logo { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: #fafafa; text-decoration: none; }
        .nav-logo-mark { width: 30px; height: 30px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: white; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link { font-size: 14px; color: #a1a1aa; text-decoration: none; }
        .nav-link:hover { color: #fafafa; }
        .nav-cta { background: #fafafa; color: #09090b; padding: 8px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; }
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 80px; position: relative; }
        .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.2), transparent); pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25); border-radius: 20px; padding: 6px 14px; font-size: 12px; font-family: 'DM Mono', monospace; color: #818cf8; text-transform: uppercase; margin-bottom: 32px; }
        .hero-dot { width: 6px; height: 6px; border-radius: 50%; background: #818cf8; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .hero h1 { font-family: 'Instrument Serif', serif; font-size: clamp(48px, 7vw, 88px); font-weight: 400; line-height: 1.05; color: #fafafa; margin-bottom: 24px; max-width: 900px; }
        .hero h1 em { font-style: italic; background: linear-gradient(135deg, #818cf8, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-sub { font-size: 18px; color: #71717a; max-width: 520px; line-height: 1.6; margin-bottom: 40px; }
        .hero-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; justify-content: center; margin-bottom: 24px; }
        .btn-primary { background: #6366f1; color: white; padding: 16px 36px; border-radius: 12px; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 0 32px rgba(99,102,241,0.4); }
        .btn-primary:hover { background: #4f46e5; }
        .btn-secondary { background: transparent; color: #a1a1aa; padding: 16px 28px; border-radius: 12px; font-size: 15px; font-weight: 500; text-decoration: none; border: 1px solid rgba(255,255,255,0.1); }
        .hero-note { font-size: 12px; color: #3f3f46; font-family: 'DM Mono', monospace; }
        .hero-stats { display: flex; gap: 48px; margin-top: 64px; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.06); flex-wrap: wrap; justify-content: center; }
        .stat { text-align: center; }
        .stat-number { font-family: 'Instrument Serif', serif; font-size: 32px; color: #fafafa; display: block; }
        .stat-label { font-size: 13px; color: #52525b; margin-top: 4px; font-family: 'DM Mono', monospace; }
        .section { padding: 100px 48px; max-width: 1100px; margin: 0 auto; }
        .section-label { font-size: 11px; font-family: 'DM Mono', monospace; letter-spacing: 0.12em; color: #52525b; text-transform: uppercase; margin-bottom: 16px; }
        .section-title { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 4vw, 48px); font-weight: 400; color: #fafafa; margin-bottom: 8px; line-height: 1.1; }
        .section-sub { font-size: 16px; color: #52525b; margin-bottom: 56px; }

        /* AGENTS — 2 karta */
        .agents-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .agent-card-2 { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 40px; text-decoration: none; color: inherit; transition: all 0.25s; }
        .agent-card-2:hover { border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.06); transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .agent-card-2.soon { opacity: 0.5; cursor: default; }
        .agent-card-2.soon:hover { transform: none; box-shadow: none; border-color: rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); }
        .agent-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .agent-icons-row { display: flex; gap: 10px; }
        .agent-icon-sm { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .agent-badge { font-size: 11px; font-family: 'DM Mono', monospace; padding: 4px 10px; border-radius: 6px; font-weight: 500; }
        .badge-live { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
        .badge-soon { background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); }
        .agent-title { font-size: 22px; font-weight: 700; color: #ffffff; margin-bottom: 10px; }
        .agent-desc { font-size: 14px; color: #71717a; line-height: 1.6; margin-bottom: 24px; }
        .agent-features-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 28px; }
        .agent-feature { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #a1a1aa; }
        .feature-dot { width: 5px; height: 5px; border-radius: 50%; background: #6366f1; flex-shrink: 0; }
        .agent-footer-2 { display: flex; align-items: center; justify-content: space-between; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.07); }
        .agent-price { font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500; color: #fafafa; }
        .agent-price span { font-size: 13px; color: #52525b; }
        .agent-cta-btn { font-size: 13px; color: #6366f1; font-weight: 600; padding: 8px 16px; border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; text-decoration: none; }
        .soon-features { display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px; }

        .divider { border-top: 1px solid rgba(255,255,255,0.06); }
        .trust-section { padding: 60px 48px; border-top: 1px solid rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .trust-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 32px; }
        .trust-label { font-size: 12px; font-family: 'DM Mono', monospace; color: #52525b; text-transform: uppercase; letter-spacing: 0.1em; }
        .trust-logos { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; }
        .trust-logo { font-size: 13px; font-family: 'DM Mono', monospace; color: #52525b; padding: 6px 14px; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; }
        .try-section { background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.15); border-radius: 20px; padding: 48px; text-align: center; }
        .try-title { font-family: 'Instrument Serif', serif; font-size: 36px; color: #fafafa; margin-bottom: 12px; }
        .try-sub { font-size: 15px; color: #71717a; margin-bottom: 32px; }
        .btn-try { display: inline-block; background: #fafafa; color: #09090b; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 700; text-decoration: none; }
        .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 56px; }
        .step { display: flex; flex-direction: column; gap: 12px; }
        .step-number { font-family: 'DM Mono', monospace; font-size: 11px; color: #52525b; }
        .step-title { font-size: 16px; font-weight: 600; color: #fafafa; }
        .step-desc { font-size: 14px; color: #52525b; line-height: 1.6; }

        /* TESTIMONIALS avec avatar */
        .testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 56px; }
        .testimonial-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; }
        .testimonial-stars { color: #fbbf24; font-size: 14px; margin-bottom: 16px; }
        .testimonial-text { font-size: 14px; color: #a1a1aa; line-height: 1.7; font-style: italic; margin-bottom: 20px; }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .testimonial-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: white; flex-shrink: 0; }
        .testimonial-name { font-size: 14px; font-weight: 600; color: #fafafa; }
        .testimonial-role { font-size: 12px; color: #52525b; font-family: 'DM Mono', monospace; margin-top: 2px; }

        /* PRICING */
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 56px; }
        .pricing-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 36px; position: relative; }
        .pricing-card.featured { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.08); }
        .pricing-badge-top { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #6366f1; color: white; font-size: 11px; font-family: 'DM Mono', monospace; padding: 4px 14px; border-radius: 20px; white-space: nowrap; }
        .pricing-name { font-size: 14px; font-family: 'DM Mono', monospace; color: #52525b; text-transform: uppercase; margin-bottom: 16px; }
        .pricing-amount { font-family: 'Instrument Serif', serif; font-size: 56px; color: #fafafa; line-height: 1; }
        .pricing-period { font-size: 13px; color: #52525b; margin-bottom: 28px; font-family: 'DM Mono', monospace; }
        .pricing-features { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
        .pricing-feature { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #a1a1aa; }
        .check { width: 18px; height: 18px; background: rgba(99,102,241,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #818cf8; flex-shrink: 0; }
        .pricing-cta { display: block; text-align: center; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none; }
        .pricing-cta.primary { background: #6366f1; color: white; }
        .pricing-cta.secondary { background: transparent; color: #a1a1aa; border: 1px solid rgba(255,255,255,0.1); }

        /* FAQ */
        .faq-list { display: flex; flex-direction: column; gap: 12px; margin-top: 56px; }
        .faq-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; }
        .faq-q { font-size: 15px; font-weight: 600; color: #fafafa; margin-bottom: 10px; }
        .faq-a { font-size: 14px; color: #71717a; line-height: 1.7; }

        /* FOOTER */
        .footer-main { border-top: 1px solid rgba(255,255,255,0.06); padding: 80px 48px 0; }
        .footer-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1.5fr repeat(4, 1fr); gap: 48px; padding-bottom: 64px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .footer-brand p { font-size: 13px; color: #52525b; line-height: 1.7; max-width: 200px; margin: 16px 0 20px; }
        .footer-badge { font-size: 11px; color: #3f3f46; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 3px 10px; border-radius: 20px; display: inline-block; margin-bottom: 6px; }
        .footer-col h4 { font-size: 11px; font-family: 'DM Mono', monospace; color: #52525b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
        .footer-link { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #52525b; text-decoration: none; margin-bottom: 10px; }
        .footer-link:hover { color: #a1a1aa; }
        .footer-link-arrow { color: #3f3f46; font-size: 11px; }
        .footer-soon { font-size: 9px; font-weight: 700; background: rgba(99,102,241,0.1); color: #6366f1; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
        .footer-stats { max-width: 1100px; margin: 0 auto; display: flex; justify-content: center; gap: 56px; flex-wrap: wrap; padding: 32px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .footer-stat-value { font-family: 'Instrument Serif', serif; font-size: 24px; color: #6366f1; }
        .footer-stat-label { font-size: 11px; color: #3f3f46; font-family: 'DM Mono', monospace; margin-top: 2px; }
        .footer-bottom { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; padding: 24px 0; font-size: 12px; color: #3f3f46; font-family: 'DM Mono', monospace; }
        .footer-bottom-links { display: flex; gap: 24px; }
        .footer-bottom-link { color: #3f3f46; text-decoration: none; }
        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .section { padding: 60px 20px; }
          .steps { grid-template-columns: 1fr; }
          .agents-grid-2 { grid-template-columns: 1fr; }
          .agent-features-row { grid-template-columns: 1fr; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .hero-stats { gap: 24px; }
        }
      `}</style>

      <div className="landing">

        {/* NAV */}
        <nav className="nav" role="navigation" aria-label="Navigation principale">
          <a href={BASE_URL} className="nav-logo" aria-label="AgentHub — Accueil">
            <div className="nav-logo-mark">A</div>
            AgentHub
          </a>
          <div className="nav-links">
            <a href="#agents" className="nav-link">Agents</a>
            <a href="#how" className="nav-link">Comment ça marche</a>
            <a href="#tarifs" className="nav-link">Tarifs</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>
          <a href={`${BASE_URL}/invoices`} className="nav-cta">Essayer gratuitement</a>
        </nav>

        {/* HERO */}
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-badge">
            <div className="hero-dot" />
            Propulsé par Gemini AI
          </div>
          <h1 id="hero-heading">
            Des agents IA pour<br />
            <em>automatiser</em> votre<br />
            comptabilité
          </h1>
          <p className="hero-sub">
            Extrayez, catégorisez et analysez vos factures en secondes.
            Conforme aux normes comptables françaises. Export FEC compatible.
          </p>
          <div className="hero-actions">
            <a href={`${BASE_URL}/invoices`} className="btn-primary">Scanner une facture gratuitement</a>
            <a href="#agents" className="btn-secondary">Voir les agents</a>
          </div>
          <p className="hero-note">14 jours gratuits, pas de carte bancaire requise</p>
          <div className="hero-stats">
            <div className="stat"><span className="stat-number">+500</span><div className="stat-label">factures analysées</div></div>
            <div className="stat"><span className="stat-number">+120</span><div className="stat-label">entreprises</div></div>
            <div className="stat"><span className="stat-number">99%</span><div className="stat-label">précision</div></div>
            <div className="stat"><span className="stat-number">RGPD</span><div className="stat-label">conforme</div></div>
          </div>
        </section>

        {/* TRUST */}
        <div className="trust-section">
          <div className="trust-inner">
            <div className="trust-label">Compatible avec</div>
            <div className="trust-logos">
              {['Sage', 'QuickBooks', 'Excel', 'FEC Export', 'EBP', 'Cegid'].map((t) => (
                <div key={t} className="trust-logo">{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* AGENTS — 2 karta */}
        <section id="agents" className="section" aria-labelledby="agents-heading">
          <div className="section-label">Nos agents</div>
          <h2 id="agents-heading" className="section-title">Chaque agent, un expert métier</h2>
          <p className="section-sub">Spécialisés, précis, disponibles 24h/24.</p>
          <div className="agents-grid-2">

            {/* KARTA 1 — Live */}
            <a href={`${BASE_URL}/invoices`} className="agent-card-2">
              <div className="agent-card-header">
                <div className="agent-icons-row">
                  <div className="agent-icon-sm" style={{background:'rgba(99,102,241,0.2)',border:'1px solid rgba(99,102,241,0.3)'}}>📄</div>
                  <div className="agent-icon-sm" style={{background:'rgba(16,185,129,0.2)',border:'1px solid rgba(16,185,129,0.3)'}}>🏦</div>
                  <div className="agent-icon-sm" style={{background:'rgba(139,92,246,0.2)',border:'1px solid rgba(139,92,246,0.3)'}}>📋</div>
                </div>
                <span className="agent-badge badge-live">● Live</span>
              </div>
              <div className="agent-title">Agents disponibles maintenant</div>
              <div className="agent-desc">{"Factures, réconciliation bancaire et analyse de contrats — trois agents IA opérationnels, entraînés sur les normes comptables françaises."}</div>
              <div className="agent-features-row">
                <div className="agent-feature"><div className="feature-dot" />Extraction PDF — SIRET, TVA, montants</div>
                <div className="agent-feature"><div className="feature-dot" />Matching bancaire CSV automatique</div>
                <div className="agent-feature"><div className="feature-dot" />Clauses à risque dans vos contrats</div>
                <div className="agent-feature"><div className="feature-dot" />Export FEC & CSV comptable</div>
                <div className="agent-feature"><div className="feature-dot" />Alertes TVA et échéances</div>
                <div className="agent-feature"><div className="feature-dot" />Conforme RGPD — données EU</div>
              </div>
              <div className="agent-footer-2">
                <div className="agent-price">Dès 19€ <span>/ mois</span></div>
                <span className="agent-cta-btn">Essayer gratuitement →</span>
              </div>
            </a>

            {/* KARTA 2 — Bientôt */}
            <div className="agent-card-2 soon">
              <div className="agent-card-header">
                <div className="agent-icons-row">
                  <div className="agent-icon-sm" style={{background:'rgba(245,158,11,0.2)',border:'1px solid rgba(245,158,11,0.3)'}}>📊</div>
                  <div className="agent-icon-sm" style={{background:'rgba(245,158,11,0.2)',border:'1px solid rgba(245,158,11,0.3)'}}>🛍️</div>
                  <div className="agent-icon-sm" style={{background:'rgba(245,158,11,0.2)',border:'1px solid rgba(245,158,11,0.3)'}}>🔗</div>
                </div>
                <span className="agent-badge badge-soon">Bientôt</span>
              </div>
              <div className="agent-title">Agents en cours de développement</div>
              <div className="agent-desc">{"De nouveaux agents arrivent pour couvrir encore plus de tâches comptables et commerciales."}</div>
              <div className="soon-features">
                <div className="agent-feature"><div className="feature-dot" style={{background:'#fbbf24'}} />Agent Comptable — catégorisation & rapports</div>
                <div className="agent-feature"><div className="feature-dot" style={{background:'#fbbf24'}} />Agent Shopify — descriptions SEO produits</div>
                <div className="agent-feature"><div className="feature-dot" style={{background:'#fbbf24'}} />Agent ERP — intégration Sage, Cegid</div>
                <div className="agent-feature"><div className="feature-dot" style={{background:'#fbbf24'}} />Agent Fraude — détection anomalies</div>
              </div>
              <div className="agent-footer-2">
                <div className="agent-price" style={{color:'#52525b'}}>À venir</div>
                <span style={{fontSize:13,color:'#52525b',fontFamily:"'DM Mono',monospace"}}>En développement</span>
              </div>
            </div>

          </div>
        </section>

        {/* TRY */}
        <section style={{padding:'0 48px 80px',maxWidth:1100,margin:'0 auto'}}>
          <div className="try-section">
            <div className="try-title">Testez avec une facture exemple</div>
            <p className="try-sub">Aucune inscription requise. Voyez le résultat en 3 secondes.</p>
            <a href={`${BASE_URL}/invoices`} className="btn-try">Tester une facture maintenant</a>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="section divider" aria-labelledby="how-heading">
          <div className="section-label">Processus</div>
          <h2 id="how-heading" className="section-title">Simple comme bonjour</h2>
          <p className="section-sub">Opérationnel en 2 minutes. Aucune installation requise.</p>
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-title">Importez votre document</div>
              <div className="step-desc">Glissez votre facture PDF ou photo. Aucun formatage requis. Supports : PDF, JPG, PNG.</div>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-title">{"L'IA analyse en 5 secondes"}</div>
              <div className="step-desc">{"Notre agent extrait fournisseur, date, montants et SIRET avec une précision de 98%."}</div>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-title">Vérifiez et exportez</div>
              <div className="step-desc">Corrigez si besoin, confirmez et exportez en FEC, CSV ou PDF pour votre comptable.</div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS avec avatar rrumbullakët */}
        <section id="temoignages" className="section divider" aria-labelledby="testimonials-heading">
          <div className="section-label">Témoignages</div>
          <h2 id="testimonials-heading" className="section-title">Ce que disent nos utilisateurs</h2>
          <p className="section-sub">Plus de 500 PME et indépendants font confiance à AgentHub.</p>
          <div className="testimonials-grid">
            {[
              { initials: 'SM', color: '#6366f1', name: 'Sophie M.', role: 'Gérante, cabinet de conseil — Lyon', text: "J'avais 200 factures en retard. AgentHub les a toutes traitées en 20 minutes. L'export FEC pour mon comptable est parfait.", stars: 5 },
              { initials: 'TB', color: '#059669', name: 'Thomas B.', role: 'Artisan électricien — Bordeaux', text: "Je n'y connaissais rien en comptabilité. Maintenant j'importe mes factures chaque semaine et tout est prêt pour mon expert-comptable.", stars: 5 },
              { initials: 'MD', color: '#7c3aed', name: 'Marie-Claire D.', role: 'DAF, PME industrielle — Nantes', text: "La réconciliation bancaire nous prenait 2 jours par mois. Avec AgentHub, c'est automatique. Le score de confiance est très utile.", stars: 5 },
            ].map((t) => (
              <article key={t.name} className="testimonial-card" aria-label={`Témoignage de ${t.name}`}>
                <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{background: t.color}}>{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PRICING */}
        <section id="tarifs" className="section divider" aria-labelledby="pricing-heading">
          <div className="section-label">Tarifs</div>
          <h2 id="pricing-heading" className="section-title">Transparent, sans surprise</h2>
          <p className="section-sub">Sans engagement. Sans frais cachés. Plan gratuit disponible.</p>
          <div className="pricing-grid">
            {[
              { name: 'Gratuit', amount: '0', period: '€/mois', desc: 'Pour découvrir', items: ['5 factures/mois', '1 analyse IA', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
              { name: 'Starter', amount: '19', period: '€/mois', desc: 'Freelances & TPE', items: ['100 factures/mois', 'Import CSV bancaire', 'Rapprochement auto', 'Alertes TVA', 'Export CSV + PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
              { name: 'Pro', amount: '29', period: '€/mois', desc: 'PME & Comptables', items: ['Tout Starter inclus', 'IA matching bancaire', 'Score de confiance', '5 analyses contrats/mois', 'Export FEC'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Essai gratuit 14 jours', featured: true },
              { name: 'Business', amount: '49', period: '€/mois', desc: 'Cabinets', items: ['Tout Pro inclus', 'Contrats illimités', 'Clauses risque détectées', 'Frais cachés identifiés', 'Audit trail RGPD'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
            ].map((plan) => (
              <div key={plan.name} className={`pricing-card${plan.featured ? ' featured' : ''}`}>
                {plan.featured && <div className="pricing-badge-top">Plus populaire</div>}
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-amount">{plan.amount}</div>
                <div className="pricing-period">{plan.period} — {plan.desc}</div>
                <div className="pricing-features">
                  {plan.items.map((item) => (
                    <div key={item} className="pricing-feature">
                      <div className="check">✓</div>
                      {item}
                    </div>
                  ))}
                </div>
                <a href={plan.link} className={`pricing-cta ${plan.featured ? 'primary' : 'secondary'}`}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section divider" aria-labelledby="faq-heading">
          <div className="section-label">FAQ</div>
          <h2 id="faq-heading" className="section-title">Questions fréquentes</h2>
          <p className="section-sub">Tout ce que vous devez savoir avant de commencer.</p>
          <div className="faq-list">
            {[
              { q: "Comment fonctionne l'extraction de factures par IA ?", a: "Téléchargez votre facture PDF ou photo. L'IA Gemini extrait automatiquement le fournisseur, le numéro SIRET, les montants HT/TTC, la TVA et les dates d'échéance en moins de 5 secondes." },
              { q: 'Comment marche la réconciliation bancaire CSV ?', a: "Exportez votre relevé bancaire au format CSV depuis votre banque (BNP, Société Générale, Crédit Agricole, LCL, etc.). L'IA compare chaque transaction avec vos factures et identifie les correspondances avec un score de confiance." },
              { q: 'AgentHub est-il conforme RGPD ?', a: "Oui. Toutes vos données sont hébergées à Frankfurt, Allemagne (Union Européenne). Jamais partagées avec des tiers. Suppression complète sur demande." },
              { q: "L'IA peut-elle analyser mes contrats fournisseurs ?", a: "Oui, disponible dès le plan Pro. L'IA identifie les clauses à risque, les frais cachés, les pénalités de retard et les dates d'échéance importantes." },
              { q: 'AgentHub est-il compatible avec mon logiciel comptable ?', a: "Export FEC natif compatible Sage, EBP, Cegid et QuickBooks. Export CSV disponible pour Excel." },
              { q: 'Quel est le prix ?', a: "Plan gratuit : 5 factures/mois, sans carte bancaire. Starter : 19€/mois. Pro : 29€/mois. Business : 49€/mois pour cabinets comptables." },
            ].map((faq, i) => (
              <div key={i} className="faq-item">
                <h3 className="faq-q">{faq.q}</h3>
                <p className="faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section style={{padding:'0 48px 100px',maxWidth:1100,margin:'0 auto'}}>
          <div className="try-section" style={{background:'rgba(99,102,241,0.08)',borderColor:'rgba(99,102,241,0.2)'}}>
            <div className="try-title">Prêt à gagner 10 heures par semaine ?</div>
            <p className="try-sub">Rejoignez plus de 500 PME françaises qui automatisent leur comptabilité avec AgentHub.</p>
            <a href={`${BASE_URL}/auth/login`} className="btn-try">Commencer gratuitement →</a>
            <p style={{fontSize:12,color:'#3f3f46',marginTop:16,fontFamily:"'DM Mono',monospace"}}>Sans engagement · Données hébergées en Europe · Setup en 2 minutes</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer-main" role="contentinfo">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href={BASE_URL} className="nav-logo" style={{textDecoration:'none'}}>
                <div className="nav-logo-mark">A</div>
                <span style={{color:'#fafafa',fontSize:15,fontWeight:600}}>AgentHub</span>
              </a>
              <p>Automatisation comptable par IA pour PME et indépendants français.</p>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {['EU Données hébergées (Frankfurt)', 'Conforme RGPD', 'Propulsé par Gemini AI'].map((b) => (
                  <span key={b} className="footer-badge">{b}</span>
                ))}
              </div>
            </div>
            {[
              { title: 'Produits', links: [
                { label: 'AI Invoice Processing', href: `${BASE_URL}/invoices`, soon: false },
                { label: 'Contract Management', href: `${BASE_URL}/dashboard`, soon: false },
                { label: 'CSV Bank Analysis', href: `${BASE_URL}/reconciliation`, soon: false },
                { label: 'ERP Integration', href: '#', soon: true },
                { label: 'Fraud Detection', href: '#', soon: true },
              ]},
              { title: 'Industria', links: [
                { label: 'FinTech', href: '#', soon: false },
                { label: 'Manufacturing', href: '#', soon: false },
                { label: 'Retail & eCommerce', href: '#', soon: false },
                { label: 'Healthcare', href: '#', soon: false },
                { label: 'Enterprise', href: '#', soon: false },
              ]},
              { title: 'Ressources', links: [
                { label: 'Blog & Insights', href: '#', soon: false },
                { label: 'Case Studies', href: '#', soon: false },
                { label: 'Webinars', href: '#', soon: false },
                { label: 'API Documentation', href: '#', soon: false },
                { label: 'ROI Calculator', href: '#', soon: false },
              ]},
              { title: 'Contact & Légal', links: [
                { label: 'Connexion', href: `${BASE_URL}/auth/login`, soon: false },
                { label: "S'inscrire gratuitement", href: `${BASE_URL}/auth/login`, soon: false },
                { label: 'Mentions légales', href: '#', soon: false },
                { label: 'Confidentialité', href: '#', soon: false },
                { label: 'CGU', href: '#', soon: false },
              ]},
            ].map((col) => (
              <div key={col.title} className="footer-col">
                <h4>{col.title}</h4>
                {col.links.map((link) => (
                  <a key={link.label} href={link.href} className="footer-link" style={link.soon ? {pointerEvents:'none'} : {}}>
                    <span className="footer-link-arrow">→</span>
                    <span style={{color: link.soon ? '#3f3f46' : '#52525b'}}>{link.label}</span>
                    {link.soon && <span className="footer-soon">Bientôt</span>}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="footer-stats">
            {[{ value: '500+', label: 'PME utilisatrices' }, { value: '98%', label: 'Précision extraction' }, { value: '10h', label: 'Gagnées / semaine' }, { value: '< 5s', label: "Temps d'analyse" }].map((s) => (
              <div key={s.label} style={{textAlign:'center'}}>
                <div className="footer-stat-value">{s.value}</div>
                <div className="footer-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>© 2026 AgentHub. Tous droits réservés. Fait avec soin en France.</span>
            <div className="footer-bottom-links">
              {['Privacy Policy', 'Terms of Service', 'Sécurité', 'Status'].map((l) => (
                <a key={l} href="#" className="footer-bottom-link">{l}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}