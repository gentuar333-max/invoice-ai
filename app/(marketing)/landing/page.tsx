import { Metadata } from 'next'
import Link from 'next/link'

const BASE_URL = 'https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app'

export const metadata: Metadata = {
  title: 'AgentHub - Automatisation Factures & Reconciliation Bancaire | IA',
  description: 'Automatisez vos factures, reconciliation bancaire et analyse de contrats avec IA. Extraction intelligente PDF, import CSV bancaire. Essai gratuit.',
  keywords: ['facture IA', 'reconciliation bancaire', 'automatisation comptable', 'analyse contrat IA', 'facture France PME'],
  openGraph: {
    title: 'AgentHub - Automatisation Intelligente des Factures',
    description: 'Automatisez vos factures avec IA. Essai gratuit.',
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
        text: "Téléchargez votre PDF ou photo. L'IA Gemini extrait automatiquement le fournisseur, montant, TVA et SIRET."
      }
    },
    {
      '@type': 'Question',
      name: 'Comment marche la reconciliation bancaire ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Importez votre CSV bancaire. L'IA associe automatiquement les transactions aux factures."
      }
    },
    {
      '@type': 'Question',
      name: 'Est-ce que AgentHub est gratuit ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, AgentHub propose un plan gratuit avec 5 factures par mois. Des plans payants à partir de 19€/mois offrent plus de fonctionnalités."
      }
    }
  ]
}

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* NAVIGATION */}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#2563eb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>A</div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>AgentHub</span>
          </div>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#64748b', textDecoration: 'none' }}>Fonctionnalités</a>
            <a href="#tarifs" style={{ color: '#64748b', textDecoration: 'none' }}>Tarifs</a>
            <a href="#faq" style={{ color: '#64748b', textDecoration: 'none' }}>FAQ</a>
            <a href={`${BASE_URL}/auth/login`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
              Connexion
            </a>
            <a href={`${BASE_URL}/auth/login`} style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600
            }}>
              Essai gratuit
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '100px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            marginBottom: '24px'
          }}>
            Nouveau : Analyse de contrats par IA
          </div>

          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            marginBottom: '24px',
            lineHeight: 1.1
          }}>
            Fini la saisie manuelle des{' '}
            <span style={{ color: '#fbbf24' }}>factures</span>
          </h1>

          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '40px',
            lineHeight: 1.6
          }}>
            L'IA extrait automatiquement vos factures, reconcilie votre banque CSV
            et analyse vos contrats. Gagnez 10 heures par semaine.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
            <a href={`${BASE_URL}/auth/login`} style={{
              backgroundColor: '#fbbf24',
              color: '#1e3a8a',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
              textDecoration: 'none'
            }}>
              Commencer gratuitement
            </a>
            <a href="#tarifs" style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.3)',
              padding: '16px 32px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
              textDecoration: 'none'
            }}>
              Voir les tarifs
            </a>
          </div>

          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.8)',
            flexWrap: 'wrap'
          }}>
            <span>Sans carte bancaire</span>
            <span>Plan gratuit disponible</span>
            <span>Setup en 2 min</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{
        backgroundColor: 'white',
        padding: '48px 20px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          textAlign: 'center'
        }}>
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
            <p style={{ color: '#64748b', fontSize: '18px' }}>
              Finissez avec les tâches manuelles répétitives
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                icon: '📄',
                bg: '#dbeafe',
                title: 'Extraction Facture IA',
                desc: "Téléchargez PDF ou photo. Gemini AI extrait automatiquement le fournisseur, le montant TTC, la TVA et le numéro SIRET.",
                items: ['Extraction en 2 secondes', 'Reconnaissance SIRET', 'Catégorisation auto', '95% de précision'],
                link: `${BASE_URL}/invoices`,
                linkLabel: 'Importer une facture',
                color: '#2563eb'
              },
              {
                icon: '🏦',
                bg: '#d1fae5',
                title: 'Reconciliation Bancaire',
                desc: "Importez votre CSV bancaire. L'IA associe automatiquement les transactions aux factures correspondantes.",
                items: ['Matching automatique', 'Détection paiements', 'Alertes retard', 'Export CSV/Rapport'],
                link: `${BASE_URL}/reconciliation`,
                linkLabel: 'Reconciliation bancaire',
                color: '#059669'
              },
              {
                icon: '📋',
                bg: '#f3e8ff',
                title: 'Analyse Contrats IA',
                desc: "Téléchargez un contrat PDF. L'IA détecte les clauses à risque, les tarifs cachés et les dates importantes.",
                items: ['Détection clauses risque', 'Tarifs cachés', 'Dates échéance', 'Alertes avant signature'],
                link: `${BASE_URL}/dashboard`,
                linkLabel: 'Analyser un contrat',
                color: '#7c3aed'
              },
            ].map((feature) => (
              <div key={feature.title} style={{
                backgroundColor: 'white',
                padding: '32px',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: feature.bg,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '16px'
                }}>{feature.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '16px' }}>{feature.desc}</p>
                <ul style={{ color: '#64748b', fontSize: '14px', lineHeight: 2, marginBottom: '20px', listStyle: 'none', padding: 0 }}>
                  {feature.items.map((item) => <li key={item}>✓ {item}</li>)}
                </ul>
                <a href={feature.link} style={{ color: feature.color, textDecoration: 'none', fontWeight: 600 }}>
                  {feature.linkLabel} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '64px' }}>
            Comment ça marche ?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            textAlign: 'center'
          }}>
            {[
              { n: '1', title: 'Importez', desc: 'Téléchargez vos factures PDF, photos ou votre relevé bancaire CSV.' },
              { n: '2', title: "L'IA analyse", desc: 'Gemini AI extrait les données, reconcilie et analyse en quelques secondes.' },
              { n: '3', title: 'Validez', desc: 'Consultez votre dashboard avec alertes TVA et reconciliation auto.' },
              { n: '4', title: 'Exportez', desc: 'Exportez vos rapports CSV ou PDF pour votre comptable.' },
            ].map((step) => (
              <div key={step.n}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '0 auto 16px'
                }}>{step.n}</div>
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
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
            Commencez gratuitement
          </h2>
          <p style={{ color: '#64748b', marginBottom: '48px' }}>
            Sans engagement. Aucune carte bancaire requise.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {[
              {
                name: 'Gratuit',
                price: '0€',
                desc: 'Pour découvrir',
                items: ['5 factures/mois', '1 analyse IA', 'Dashboard', 'Export PDF'],
                link: `${BASE_URL}/auth/login`,
                label: 'Commencer',
                featured: false,
              },
              {
                name: 'Starter',
                price: '19€',
                desc: 'Pour freelances et TPE',
                items: ['100 factures/mois', 'Import CSV bancaire', 'Rapprochement auto', 'Alertes TVA', 'Export CSV + PDF'],
                link: `${BASE_URL}/checkout?plan=starter`,
                label: 'Choisir Starter',
                featured: false,
              },
              {
                name: 'Pro',
                price: '29€',
                desc: 'Pour PME et comptables',
                items: ['Tout Starter inclus', 'IA matching bancaire', 'Score de confiance', '5 analyses contrats/mois', 'Export FEC'],
                link: `${BASE_URL}/checkout?plan=pro`,
                label: 'Essai gratuit',
                featured: true,
              },
              {
                name: 'Business',
                price: '49€',
                desc: 'Pour cabinets',
                items: ['Tout Pro inclus', 'Contrats illimités', 'Clauses risque détectées', 'Frais cachés identifiés', 'Audit trail GDPR'],
                link: `${BASE_URL}/checkout?plan=business`,
                label: 'Choisir Business',
                featured: false,
              },
            ].map((plan) => (
              <div key={plan.name} style={{
                backgroundColor: plan.featured ? '#2563eb' : 'white',
                color: plan.featured ? 'white' : '#1e293b',
                padding: '28px',
                borderRadius: '16px',
                boxShadow: plan.featured ? '0 10px 25px rgba(37,99,235,0.3)' : '0 1px 3px rgba(0,0,0,0.1)',
                transform: plan.featured ? 'scale(1.05)' : 'none',
                position: 'relative'
              }}>
                {plan.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#fbbf24',
                    color: '#1e3a8a',
                    padding: '4px 14px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}>PLUS POPULAIRE</div>
                )}
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{plan.name}</h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', margin: '12px 0 4px' }}>
                  {plan.price}<span style={{ fontSize: '14px', opacity: 0.7 }}>/mois</span>
                </div>
                <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '16px' }}>{plan.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', fontSize: '13px', lineHeight: 2, marginBottom: '20px', opacity: plan.featured ? 0.9 : 1 }}>
                  {plan.items.map((item) => (
                    <li key={item} style={{ color: plan.featured ? 'white' : '#64748b' }}>✓ {item}</li>
                  ))}
                </ul>
                <a href={plan.link} style={{
                  display: 'block',
                  padding: '11px',
                  backgroundColor: plan.featured ? 'white' : 'transparent',
                  border: plan.featured ? 'none' : '2px solid #e2e8f0',
                  borderRadius: '8px',
                  color: plan.featured ? '#2563eb' : '#64748b',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '13px'
                }}>{plan.label}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
            Questions fréquentes
          </h2>
          {[
            {
              q: "Comment fonctionne l'extraction de factures ?",
              a: "Téléchargez votre PDF ou photo de facture. L'IA Gemini extrait automatiquement le fournisseur, montant TTC, TVA et numéro SIRET en quelques secondes."
            },
            {
              q: 'Comment marche la reconciliation bancaire ?',
              a: "Importez votre relevé bancaire au format CSV. L'IA compare automatiquement les transactions avec vos factures et identifie les paiements reçus."
            },
            {
              q: "Est-ce que AgentHub est gratuit ?",
              a: "Oui, le plan gratuit vous donne accès à 5 factures par mois sans carte bancaire. Les plans payants commencent à 19€/mois."
            },
            {
              q: "L'IA analyse-t-elle les contrats ?",
              a: "Oui, disponible dès le plan Pro. Téléchargez un contrat PDF et l'IA détecte les clauses à risque, frais cachés et dates importantes."
            },
            {
              q: "Mes données sont-elles sécurisées ?",
              a: "Vos données sont stockées sur Supabase (Frankfurt, EU) et ne sont jamais partagées avec des tiers. Conformité RGPD."
            },
          ].map((faq, i) => (
            <div key={i} style={{
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '12px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>
          Prêt à gagner 10 heures par semaine ?
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '32px', opacity: 0.9 }}>
          Commencez gratuitement — aucune carte bancaire requise.
        </p>
        <a href={`${BASE_URL}/auth/login`} style={{
          display: 'inline-block',
          backgroundColor: '#fbbf24',
          color: '#1e3a8a',
          padding: '16px 40px',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '18px',
          textDecoration: 'none'
        }}>
          Commencer gratuitement
        </a>
        <p style={{ marginTop: '16px', opacity: 0.8, fontSize: '14px' }}>
          Sans engagement · Plan gratuit disponible · Setup en 2 minutes
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1e293b', color: '#94a3b8', padding: '48px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            marginBottom: '40px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: '#2563eb', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>A</div>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>AgentHub</span>
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.7 }}>Automatisation comptable par IA pour PME et indépendants français.</p>
            </div>
            <div>
              <h4 style={{ color: '#fbbf24', marginBottom: '16px', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Produit</h4>
              {[
                { label: 'Importer une facture', href: `${BASE_URL}/invoices` },
                { label: 'Reconciliation bancaire', href: `${BASE_URL}/reconciliation` },
                { label: 'Analyse de contrats', href: `${BASE_URL}/dashboard` },
                { label: 'Tarifs', href: `${BASE_URL}/pricing` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '13px', marginBottom: '8px' }}>{link.label}</a>
              ))}
            </div>
            <div>
              <h4 style={{ color: '#fbbf24', marginBottom: '16px', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Compte</h4>
              {[
                { label: 'Connexion', href: `${BASE_URL}/auth/login` },
                { label: "S'inscrire gratuitement", href: `${BASE_URL}/auth/login` },
                { label: 'Dashboard', href: `${BASE_URL}/dashboard` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '13px', marginBottom: '8px' }}>{link.label}</a>
              ))}
            </div>
            <div>
              <h4 style={{ color: '#fbbf24', marginBottom: '16px', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Légal</h4>
              {[
                { label: 'Mentions légales', href: '#' },
                { label: 'Politique de confidentialité', href: '#' },
                { label: 'CGU', href: '#' },
                { label: 'Contact', href: '#' },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '13px', marginBottom: '8px' }}>{link.label}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #334155', paddingTop: '24px', textAlign: 'center', fontSize: '13px' }}>
            © 2025 AgentHub. Tous droits réservés. | Données hébergées en Europe (Frankfurt)
          </div>
        </div>
      </footer>
    </>
  )
}