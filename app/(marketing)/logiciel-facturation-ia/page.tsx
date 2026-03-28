import { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'

export const metadata: Metadata = {
  title: 'Logiciel Facturation PME Gratuit | AgentHub IA - Automatisation Factures',
  description: 'Logiciel de facturation gratuit pour PME et freelances. Extraction automatique PDF, calcul TVA, export comptable. Essai gratuit sans carte bancaire.',
  keywords: ['logiciel facturation PME', 'logiciel facturation gratuit', 'facturation automatique IA', 'logiciel comptabilité PME France', 'facturation freelance'],
  openGraph: {
    title: 'Logiciel Facturation PME Gratuit — AgentHub',
    description: 'Automatisez votre facturation avec IA. Gratuit pour PME et freelances.',
    type: 'website',
    locale: 'fr_FR',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AgentHub — Logiciel Facturation IA',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, SaaS',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  featureList: ['Extraction automatique factures PDF', 'Calcul TVA automatique', 'Export comptable', 'Détection doublons'],
}

export default function LogicielFacturationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* NAV */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>A</div>
            <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b' }}>AgentHub</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#fonctionnalites" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Fonctionnalités</a>
            <a href="#tarifs" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Tarifs</a>
            <a href={`${BASE_URL}/auth/login`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Connexion</a>
            <a href={`${BASE_URL}/auth/login`} style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Essai gratuit</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px' }}>
            Logiciel de facturation IA — Plan gratuit disponible
          </div>
          <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
            Le logiciel de facturation <span style={{ color: '#fbbf24' }}>intelligent</span> pour PME
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', marginBottom: '40px', lineHeight: 1.6 }}>
            {"Importez vos factures PDF — l'IA extrait automatiquement tous les champs. TVA calculée, doublons détectés, export comptable en 1 clic."}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
            <a href={`${BASE_URL}/invoices`} style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
              Importer une facture gratuitement →
            </a>
            <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
              Voir les tarifs
            </a>
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
            <span>{"✓ Gratuit jusqu'à 5 factures/mois"}</span>
            <span>✓ Sans carte bancaire</span>
            <span>✓ RGPD — données en France</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', textAlign: 'center' }}>
          {[
            { value: '95%', label: 'Précision extraction' },
            { value: '< 3s', label: 'Par facture' },
            { value: '100%', label: 'Auto TVA' },
            { value: '0€', label: 'Pour commencer' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FONCTIONNALITES */}
      <section id="fonctionnalites" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Tout ce dont votre PME a besoin
            </h2>
            <p style={{ color: '#64748b', fontSize: '17px' }}>Un logiciel de facturation complet, automatisé par IA</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              { icon: '📄', title: 'Extraction PDF automatique', desc: "Téléchargez n'importe quelle facture PDF ou photo. L'IA extrait fournisseur, montant, TVA et SIRET en 2 secondes.", items: ['Fournisseur et SIRET', 'Montant HT, TVA, TTC', 'Date facture et échéance', 'Lignes détaillées'] },
              { icon: '🧮', title: 'TVA calculée automatiquement', desc: "Plus d'erreurs de calcul TVA. Le logiciel calcule, catégorise et prépare votre déclaration automatiquement.", items: ['TVA 5.5%, 10%, 20%', 'Alerte déclaration mensuelle', 'Export pour comptable', 'Rapport TVA détaillé'] },
              { icon: '🔍', title: 'Détection doublons', desc: "L'IA compare chaque nouvelle facture avec votre historique et vous alerte si un doublon est détecté.", items: ['Comparaison intelligente', 'Alerte avant enregistrement', 'Historique complet', 'Zéro doublon'] },
              { icon: '📊', title: 'Dashboard en temps réel', desc: "Vue globale de vos factures, paiements en attente, retards et TVA à déclarer sur un seul écran.", items: ['Factures impayées', 'Alertes retard paiement', 'Graphique mensuel', 'Export CSV/PDF'] },
              { icon: '🏦', title: 'Reconciliation bancaire', desc: "Importez votre relevé CSV bancaire. L'IA rapproche automatiquement transactions et factures.", items: ['Import CSV toutes banques', 'Matching automatique', 'Paiements détectés', 'Rapport final'] },
              { icon: '📋', title: 'Analyse contrats', desc: "Détectez les clauses cachées et risques dans vos contrats fournisseurs avant de signer.", items: ['Clauses à risque', 'Frais cachés', 'Dates importantes', 'Résumé IA'] },
            ].map((f) => (
              <div key={f.title} style={{ backgroundColor: 'white', padding: '28px', borderRadius: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '14px' }}>{f.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', color: '#64748b', lineHeight: 2 }}>
                  {f.items.map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
            Pour qui est AgentHub ?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { icon: '🏢', title: 'PME', desc: 'Automatisez la comptabilité sans embaucher un comptable à plein temps.' },
              { icon: '💼', title: 'Freelances', desc: 'Gérez vos factures clients et fournisseurs en quelques minutes par mois.' },
              { icon: '🔨', title: 'Artisans', desc: "Scannez vos reçus et factures — l'IA fait le reste automatiquement." },
              { icon: '📒', title: 'Comptables', desc: 'Gagnez du temps sur la saisie et concentrez-vous sur le conseil.' },
            ].map((p) => (
              <div key={p.title} style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{p.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARIFS */}
      <section id="tarifs" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>Tarifs transparents</h2>
          <p style={{ color: '#64748b', marginBottom: '48px' }}>Commencez gratuitement. Évoluez selon vos besoins.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Gratuit', price: '0€', desc: 'Pour découvrir', items: ['5 factures/mois', '1 analyse IA', 'Dashboard', 'Export PDF'], link: `${BASE_URL}/auth/login`, label: 'Commencer', featured: false },
              { name: 'Starter', price: '19€', desc: 'Freelances & TPE', items: ['100 factures/mois', 'Import CSV bancaire', 'Rapprochement auto', 'Alertes TVA', 'Export CSV + PDF'], link: `${BASE_URL}/checkout?plan=starter`, label: 'Choisir Starter', featured: false },
              { name: 'Pro', price: '29€', desc: 'PME & Comptables', items: ['Tout Starter inclus', 'IA matching bancaire', '5 analyses contrats/mois', 'Export FEC'], link: `${BASE_URL}/checkout?plan=pro`, label: 'Plus populaire', featured: true },
              { name: 'Business', price: '49€', desc: 'Cabinets', items: ['Tout Pro inclus', 'Contrats illimités', 'Clauses risque', 'Audit trail RGPD'], link: `${BASE_URL}/checkout?plan=business`, label: 'Choisir Business', featured: false },
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
      <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Questions fréquentes</h2>
          {[
            { q: "AgentHub est-il vraiment gratuit ?", a: "Oui, le plan gratuit inclut 5 factures par mois, sans carte bancaire. Idéal pour tester avant de passer à un plan payant." },
            { q: "Quels formats de factures sont acceptés ?", a: "PDF, JPG, PNG et photos de factures. L'IA reconnaît tous les formats courants de factures françaises." },
            { q: "Comment fonctionne le calcul TVA automatique ?", a: "L'IA extrait le taux de TVA depuis la facture et calcule automatiquement les montants HT, TVA et TTC. Une alerte mensuelle vous rappelle vos échéances de déclaration." },
            { q: "Puis-je exporter pour mon comptable ?", a: "Oui, export CSV et PDF disponibles sur tous les plans. Le plan Pro inclut l'export FEC (Fichier des Écritures Comptables) standard en France." },
            { q: "Mes données sont-elles sécurisées ?", a: "Données hébergées en Europe (Frankfurt), conformité RGPD, jamais partagées avec des tiers." },
          ].map((faq, i) => (
            <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '22px', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{faq.q}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Testez gratuitement votre logiciel de facturation IA</h2>
        <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>5 factures gratuites — aucune carte bancaire requise.</p>
        <a href={`${BASE_URL}/invoices`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>
          Importer ma première facture →
        </a>
        <p style={{ marginTop: '16px', opacity: 0.8, fontSize: '14px' }}>Sans engagement · Données sécurisées en Europe</p>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '80px 20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', paddingBottom: '64px', borderBottom: '1px solid #1e293b' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', background: '#2563eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '16px' }}>A</div>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>AgentHub</span>
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#64748b', maxWidth: '220px', marginBottom: '24px' }}>Logiciel de facturation IA pour PME et freelances français.</p>
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