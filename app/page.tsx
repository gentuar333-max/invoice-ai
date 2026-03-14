export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .landing { background: #09090b; color: #fafafa; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 60px; background: rgba(9,9,11,0.8); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .nav-logo { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 600; color: #fafafa; text-decoration: none; }
        .nav-logo-mark { width: 30px; height: 30px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link { font-size: 14px; color: #a1a1aa; text-decoration: none; }
        .nav-link:hover { color: #fafafa; }
        .nav-cta { background: #fafafa; color: #09090b; padding: 8px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; text-decoration: none; }
        .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 80px; position: relative; }
        .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.2), transparent); pointer-events: none; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25); border-radius: 20px; padding: 6px 14px; font-size: 12px; font-family: 'DM Mono', monospace; color: #818cf8; text-transform: uppercase; margin-bottom: 32px; }
        .hero-dot { width: 6px; height: 6px; border-radius: 50%; background: #818cf8; }
        .hero h1 { font-family: 'Instrument Serif', serif; font-size: clamp(48px, 7vw, 88px); font-weight: 400; line-height: 1.05; color: #fafafa; margin-bottom: 24px; max-width: 900px; }
        .hero h1 em { font-style: italic; background: linear-gradient(135deg, #818cf8, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hero-sub { font-size: 18px; color: #71717a; max-width: 520px; line-height: 1.6; margin-bottom: 40px; }
        .hero-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; justify-content: center; margin-bottom: 24px; }
        .btn-primary { background: #6366f1; color: white; padding: 16px 36px; border-radius: 12px; font-size: 16px; font-weight: 700; text-decoration: none; box-shadow: 0 0 32px rgba(99,102,241,0.4); }
        .btn-primary:hover { background: #4f46e5; }
        .btn-secondary { background: transparent; color: #a1a1aa; padding: 16px 28px; border-radius: 12px; font-size: 15px; font-weight: 500; text-decoration: none; border: 1px solid rgba(255,255,255,0.1); }
        .hero-note { font-size: 12px; color: #3f3f46; font-family: 'DM Mono', monospace; }
        .hero-stats { display: flex; gap: 48px; margin-top: 64px; padding-top: 48px; border-top: 1px solid rgba(255,255,255,0.06); }
        .stat { text-align: center; }
        .stat-number { font-family: 'Instrument Serif', serif; font-size: 32px; color: #fafafa; display: block; }
        .stat-label { font-size: 13px; color: #52525b; margin-top: 4px; font-family: 'DM Mono', monospace; }
        .section { padding: 100px 48px; max-width: 1100px; margin: 0 auto; }
        .section-label { font-size: 11px; font-family: 'DM Mono', monospace; letter-spacing: 0.12em; color: #52525b; text-transform: uppercase; margin-bottom: 16px; }
        .section-title { font-family: 'Instrument Serif', serif; font-size: clamp(32px, 4vw, 48px); font-weight: 400; color: #fafafa; margin-bottom: 8px; line-height: 1.1; }
        .section-sub { font-size: 16px; color: #52525b; margin-bottom: 56px; }
        .agents-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .agent-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 36px; text-decoration: none; color: inherit; transition: all 0.25s; display: flex; flex-direction: column; gap: 20px; }
        .agent-card:hover { border-color: rgba(99,102,241,0.4); background: rgba(99,102,241,0.06); transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .agent-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
        .agent-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
        .agent-badge { font-size: 11px; font-family: 'DM Mono', monospace; padding: 4px 10px; border-radius: 6px; font-weight: 500; }
        .badge-live { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
        .badge-soon { background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); }
        .agent-name { font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 8px; }
        .agent-desc { font-size: 14px; color: #a1a1aa; line-height: 1.6; }
        .agent-features { display: flex; flex-direction: column; gap: 8px; }
        .agent-feature { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #e4e4e7; }
        .feature-dot { width: 5px; height: 5px; border-radius: 50%; background: #6366f1; flex-shrink: 0; }
        .agent-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.07); margin-top: auto; }
        .agent-price { font-family: 'DM Mono', monospace; font-size: 22px; font-weight: 500; color: #fafafa; }
        .agent-price span { font-size: 13px; color: #52525b; }
        .agent-cta { font-size: 13px; color: #6366f1; font-weight: 600; padding: 6px 14px; border: 1px solid rgba(99,102,241,0.3); border-radius: 6px; }
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
        .pricing-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px; max-width: 440px; margin: 56px auto 0; text-align: center; }
        .pricing-badge { display: inline-block; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25); color: #818cf8; font-size: 11px; font-family: 'DM Mono', monospace; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; margin-bottom: 20px; }
        .pricing-amount { font-family: 'Instrument Serif', serif; font-size: 72px; color: #fafafa; line-height: 1; margin-bottom: 4px; }
        .pricing-period { font-size: 14px; color: #52525b; margin-bottom: 36px; }
        .pricing-features { display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; text-align: left; }
        .pricing-feature { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #a1a1aa; }
        .check { width: 20px; height: 20px; background: rgba(99,102,241,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #818cf8; flex-shrink: 0; }
        .footer { border-top: 1px solid rgba(255,255,255,0.06); padding: 32px 48px; display: flex; align-items: center; justify-content: space-between; }
        .footer-logo { font-size: 14px; font-weight: 600; color: #52525b; }
        .footer-text { font-size: 13px; color: #3f3f46; font-family: 'DM Mono', monospace; }
      `}</style>

      <div className="landing">

        <nav className="nav">
          <a href="/" className="nav-logo">
            <div className="nav-logo-mark">🤖</div>
            AgentHub
          </a>
          <div className="nav-links">
            <a href="#agents" className="nav-link">Agents</a>
            <a href="#how" className="nav-link">Comment ca marche</a>
            <a href="#pricing" className="nav-link">Tarifs</a>
          </div>
          <a href="/invoices" className="nav-cta">Essayer gratuitement</a>
        </nav>

        <section className="hero">
          <div className="hero-badge">
            <div className="hero-dot" />
            Powered by Gemini AI
          </div>
          <h1>
            Des agents IA pour<br />
            <em>automatiser</em> votre<br />
            comptabilite
          </h1>
          <p className="hero-sub">
            Extrayez, categorisez et analysez vos factures en secondes.
            Conforme aux normes comptables francaises. Export FEC compatible.
          </p>
          <div className="hero-actions">
            <a href="/invoices" className="btn-primary">Scanner une facture gratuitement</a>
            <a href="#agents" className="btn-secondary">Voir les agents</a>
          </div>
          <p className="hero-note">14 jours gratuits, pas de carte bancaire requise</p>
          <div className="hero-stats">
            <div className="stat"><span className="stat-number">+500</span><div className="stat-label">factures analysees</div></div>
            <div className="stat"><span className="stat-number">+120</span><div className="stat-label">entreprises</div></div>
            <div className="stat"><span className="stat-number">99%</span><div className="stat-label">precision</div></div>
            <div className="stat"><span className="stat-number">RGPD</span><div className="stat-label">conforme</div></div>
          </div>
        </section>

        <div className="trust-section">
          <div className="trust-inner">
            <div className="trust-label">Compatible avec</div>
            <div className="trust-logos">
              <div className="trust-logo">Sage</div>
              <div className="trust-logo">QuickBooks</div>
              <div className="trust-logo">Excel</div>
              <div className="trust-logo">FEC Export</div>
              <div className="trust-logo">EBP</div>
            </div>
          </div>
        </div>

        <section id="agents" className="section">
          <div className="section-label">Nos agents</div>
          <h2 className="section-title">Chaque agent, un expert metier</h2>
          <p className="section-sub">Specialises, precis, disponibles 24h/24.</p>
          <div className="agents-grid">

            <a href="/invoices" className="agent-card">
              <div className="agent-card-header">
                <div className="agent-icon" style={{background:"rgba(99,102,241,0.2)",border:"1px solid rgba(99,102,241,0.3)"}}>📄</div>
                <span className="agent-badge badge-live">● Live</span>
              </div>
              <div>
                <div className="agent-name">Agent Factures</div>
                <div className="agent-desc">Extrait automatiquement les donnees de vos factures PDF et images en quelques secondes.</div>
              </div>
              <div className="agent-features">
                <div className="agent-feature"><div className="feature-dot" />Extraction fournisseur, date, total, TVA</div>
                <div className="agent-feature"><div className="feature-dot" />Detection des doublons</div>
                <div className="agent-feature"><div className="feature-dot" />Export CSV compatible comptable</div>
              </div>
              <div className="agent-footer">
                <div className="agent-price">29 EUR <span>/ mois</span></div>
                <div className="agent-cta">Essayer gratuitement</div>
              </div>
            </a>

            <div className="agent-card" style={{opacity:0.55,cursor:"default"}}>
              <div className="agent-card-header">
                <div className="agent-icon" style={{background:"rgba(16,185,129,0.2)",border:"1px solid rgba(16,185,129,0.3)"}}>📊</div>
                <span className="agent-badge badge-soon">Bientot</span>
              </div>
              <div>
                <div className="agent-name">Agent Comptable</div>
                <div className="agent-desc">Categorise vos depenses et genere des rapports mensuels pour votre comptable.</div>
              </div>
              <div className="agent-features">
                <div className="agent-feature"><div className="feature-dot" />Categorisation automatique</div>
                <div className="agent-feature"><div className="feature-dot" />Rapport mensuel PDF</div>
                <div className="agent-feature"><div className="feature-dot" />Compatible FEC</div>
              </div>
              <div className="agent-footer">
                <div className="agent-price">29 EUR <span>/ mois</span></div>
                <div className="agent-cta">Bientot disponible</div>
              </div>
            </div>

            <div className="agent-card" style={{opacity:0.55,cursor:"default"}}>
              <div className="agent-card-header">
                <div className="agent-icon" style={{background:"rgba(245,158,11,0.2)",border:"1px solid rgba(245,158,11,0.3)"}}>🛍️</div>
                <span className="agent-badge badge-soon">Bientot</span>
              </div>
              <div>
                <div className="agent-name">Agent Shopify</div>
                <div className="agent-desc">Genere des descriptions produits optimisees SEO pour votre boutique Shopify en francais.</div>
              </div>
              <div className="agent-features">
                <div className="agent-feature"><div className="feature-dot" />Descriptions SEO en francais</div>
                <div className="agent-feature"><div className="feature-dot" />Ton de marque personnalise</div>
                <div className="agent-feature"><div className="feature-dot" />Import/Export Shopify</div>
              </div>
              <div className="agent-footer">
                <div className="agent-price">29 EUR <span>/ mois</span></div>
                <div className="agent-cta">Bientot disponible</div>
              </div>
            </div>

          </div>
        </section>

        <section style={{padding:"80px 48px",maxWidth:1100,margin:"0 auto"}}>
          <div className="try-section">
            <div className="try-title">Testez avec une facture exemple</div>
            <p className="try-sub">Aucune inscription requise. Voyez le resultat en 3 secondes.</p>
            <a href="/invoices" className="btn-try">Tester une facture maintenant</a>
          </div>
        </section>

        <section id="how" className="section divider">
          <div className="section-label">Processus</div>
          <h2 className="section-title">Simple comme bonjour</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-title">Importez votre document</div>
              <div className="step-desc">Glissez votre facture PDF ou photo. Aucun formatage requis.</div>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-title">L IA analyse en 3 secondes</div>
              <div className="step-desc">Notre agent extrait fournisseur, date, montants et articles avec une precision de 99%.</div>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-title">Verifiez et exportez</div>
              <div className="step-desc">Corrigez si besoin, confirmez et exportez vers votre comptable en un clic.</div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section divider">
          <div className="section-label">Tarifs</div>
          <h2 className="section-title">Un prix, tout inclus</h2>
          <div className="pricing-card">
            <div className="pricing-badge">Acces complet</div>
            <div className="pricing-amount">29</div>
            <div className="pricing-period">EUR par mois, sans engagement</div>
            <div className="pricing-features">
              {["Tous les agents disponibles","Factures illimitees","Export CSV, FEC et PDF","Detection des doublons","Conforme normes comptables francaises","Support prioritaire","Conforme RGPD"].map((f) => (
                <div key={f} className="pricing-feature">
                  <div className="check">v</div>
                  {f}
                </div>
              ))}
            </div>
            <a href="/invoices" className="btn-primary" style={{display:"block",textAlign:"center"}}>Scanner une facture gratuitement</a>
            <p style={{fontSize:12,color:"#3f3f46",marginTop:12,fontFamily:"'DM Mono',monospace"}}>14 jours gratuits, pas de carte requise</p>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-logo">AgentHub</div>
          <div className="footer-text">2026, Made in France</div>
        </footer>

      </div>
    </>
  );
}