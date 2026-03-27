import { Metadata } from 'next'
import Link from 'next/link'

// ============================================
// SEO METADATA - Për Google
// ============================================
export const metadata: Metadata = {
  title: 'AgentFacture AI - Automatisation Factures & Reconciliation Bancaire',
  description: 'Automatisez vos factures, reconciliation bancaire et analyse de contrats avec IA. Extraction intelligente PDF, import CSV bancaire. Essai gratuit.',
  keywords: ['facture IA', 'reconciliation bancaire', 'automatisation comptable', 'analyse contrat IA'],
  openGraph: {
    title: 'AgentFacture AI - Automatisation Intelligente',
    description: 'Automatisez vos factures avec IA. Essai gratuit 14 jours.',
    type: 'website',
    locale: 'fr_FR',
  },
}

// ============================================
// FAQ SCHEMA - Për Google Rich Snippets
// ============================================
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
    }
  ]
}

export default function LandingPage() {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ============================================ */}
      {/* HEADER / NAVIGATION                          */}
      {/* ============================================ */}
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
          {/* Logo */}
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
            }}>
              A
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>
              AgentFacture
            </span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#64748b', textDecoration: 'none' }}>Fonctionnalités</a>
            <a href="#tarifs" style={{ color: '#64748b', textDecoration: 'none' }}>Tarifs</a>
            
            <Link 
              href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
              style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}
            >
              Connexion
            </Link>
            
            <Link 
              href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
              style={{ 
                backgroundColor: '#2563eb', 
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600
              }}
            >
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO SECTION                                 */}
      {/* ============================================ */}
      <section style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        padding: '100px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            marginBottom: '24px'
          }}>
            ✨ Nouveau : Analyse de contrats par IA
          </div>

          {/* Main Headline */}
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: 'bold',
            marginBottom: '24px',
            lineHeight: 1.1
          }}>
            Fini la saisie manuelle des{' '}
            <span style={{ color: '#fbbf24' }}>factures</span>
          </h1>

          {/* Subheadline */}
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255,255,255,0.9)',
            marginBottom: '40px',
            lineHeight: 1.6
          }}>
            L'IA extrait automatiquement vos factures, reconcilie votre banque CSV 
            et analyse vos contrats. Gagnez 10 heures par semaine.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
            <Link 
              href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
              style={{
                backgroundColor: '#fbbf24',
                color: '#1e3a8a',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '18px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Commencer gratuitement →
            </Link>
            
            <Link 
              href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/pricing"
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)',
                padding: '16px 32px',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '18px',
                textDecoration: 'none'
              }}
            >
              Voir les tarifs
            </Link>
          </div>

          {/* Trust Badges */}
          <div style={{ 
            display: 'flex', 
            gap: '24px', 
            justifyContent: 'center',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.8)'
          }}>
            <span>✓ Sans carte bancaire</span>
            <span>✓ 14 jours gratuits</span>
            <span>✓ Setup en 2 min</span>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS BAR                                    */}
      {/* ============================================ */}
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
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb' }}>95%</div>
            <div style={{ color: '#64748b', fontSize: '14px' }}>Précision extraction</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb' }}>10h</div>
            <div style={{ color: '#64748b', fontSize: '14px' }}>Économisées/semaine</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb' }}>2min</div>
            <div style={{ color: '#64748b', fontSize: '14px' }}>Par facture</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb' }}>1,200+</div>
            <div style={{ color: '#64748b', fontSize: '14px' }}>Entreprises</div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURES GRID                                */}
      {/* ============================================ */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {/* Feature 1 */}
            <div style={{
              backgroundColor: 'white',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                backgroundColor: '#dbeafe',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '16px'
              }}>
                📄
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
                Extraction Facture IA
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                Téléchargez PDF ou photo. Gemini AI extrait automatiquement le fournisseur, 
                le montant TTC, la TVA et le numéro SIRET.
              </p>
              <ul style={{ color: '#64748b', fontSize: '14px', lineHeight: 2, marginBottom: '20px' }}>
                <li>✓ Extraction en 2 secondes</li>
                <li>✓ Reconnaissance SIRET</li>
                <li>✓ Catégorisation auto</li>
                <li>✓ 95% de précision</li>
              </ul>
              <Link 
                href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/invoices"
                style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
              >
                Importer une facture →
              </Link>
            </div>

            {/* Feature 2 */}
            <div style={{
              backgroundColor: 'white',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                backgroundColor: '#d1fae5',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '16px'
              }}>
                🏦
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
                Reconciliation Bancaire
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                Importez votre CSV bancaire. L'IA associe automatiquement les transactions 
                aux factures correspondantes.
              </p>
              <ul style={{ color: '#64748b', fontSize: '14px', lineHeight: 2, marginBottom: '20px' }}>
                <li>✓ Matching automatique</li>
                <li>✓ Détection paiements</li>
                <li>✓ Alertes retard</li>
                <li>✓ Export CSV/Rapport</li>
              </ul>
              <Link 
                href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/reconciliation"
                style={{ color: '#059669', textDecoration: 'none', fontWeight: 600 }}
              >
                Reconciliation bancaire →
              </Link>
            </div>

            {/* Feature 3 */}
            <div style={{
              backgroundColor: 'white',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                backgroundColor: '#f3e8ff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '16px'
              }}>
                📋
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
                Analyse Contrats IA
              </h3>
              <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                Téléchargez un contrat PDF. L'IA détecte les clauses à risque, 
                les tarifs cachés et les dates importantes.
              </p>
              <ul style={{ color: '#64748b', fontSize: '14px', lineHeight: 2, marginBottom: '20px' }}>
                <li>✓ Détection clauses risque</li>
                <li>✓ Tarifs cachés</li>
                <li>✓ Dates échéance</li>
                <li>✓ Alertes avant signature</li>
              </ul>
              <Link 
                href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/invoices"
                style={{ color: '#7c3aed', textDecoration: 'none', fontWeight: 600 }}
              >
                Analyser un contrat →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS                                 */}
      {/* ============================================ */}
      <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '64px' }}>
            Comment ça marche ?
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            textAlign: 'center'
          }}>
            {/* Step 1 */}
            <div>
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
              }}>
                1
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                Importez
              </h3>
              <p style={{ color: '#64748b' }}>
                Téléchargez vos factures PDF, photos ou votre relevé bancaire CSV.
              </p>
            </div>

            {/* Step 2 */}
            <div>
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
              }}>
                2
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                L'IA analyse
              </h3>
              <p style={{ color: '#64748b' }}>
                Gemini AI extrait les données, reconcile et analyse en quelques secondes.
              </p>
            </div>

            {/* Step 3 */}
            <div>
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
              }}>
                3
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
                Validez
              </h3>
              <p style={{ color: '#64748b' }}>
                Consultez votre dashboard avec alertes TVA et reconciliation auto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING                                      */}
      {/* ============================================ */}
      <section id="tarifs" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
            Commencez gratuitement
          </h2>
          <p style={{ color: '#64748b', marginBottom: '48px' }}>
            14 jours d'essai sans engagement. Aucune carte bancaire requise.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {/* Free Plan */}
            <div style={{
              backgroundColor: 'white',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>Gratuit</h3>
              <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', margin: '16px 0' }}>
                0€<span style={{ fontSize: '16px', color: '#64748b' }}>/mois</span>
              </div>
              <ul style={{ color: '#64748b', textAlign: 'left', lineHeight: 2, marginBottom: '24px' }}>
                <li>✓ 5 factures/mois</li>
                <li>✓ Extraction basique</li>
                <li>✓ Dashboard limité</li>
              </ul>
              <Link 
                href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
                style={{
                  display: 'block',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#64748b',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Commencer
              </Link>
            </div>

            {/* Pro Plan */}
            <div style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              transform: 'scale(1.05)'
            }}>
              <div style={{
                display: 'inline-block',
                backgroundColor: '#fbbf24',
                color: '#1e3a8a',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '16px'
              }}>
                PLUS POPULAIRE
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Pro</h3>
              <div style={{ fontSize: '36px', fontWeight: 'bold', margin: '16px 0' }}>
                29€<span style={{ fontSize: '16px', opacity: 0.8 }}>/mois</span>
              </div>
              <ul style={{ textAlign: 'left', lineHeight: 2, marginBottom: '24px', opacity: 0.9 }}>
                <li>✓ Factures illimitées</li>
                <li>✓ Reconciliation bancaire</li>
                <li>✓ Analyse contrats</li>
                <li>✓ Alertes TVA</li>
              </ul>
              <Link 
                href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/pricing"
                style={{
                  display: 'block',
                  padding: '12px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  color: '#2563eb',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Essai gratuit 14 jours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA                                    */}
      {/* ============================================ */}
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
          Rejoignez 1,200+ entreprises qui ont automatise leur comptabilité
        </p>
        <Link 
          href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
          style={{
            display: 'inline-block',
            backgroundColor: '#fbbf24',
            color: '#1e3a8a',
            padding: '16px 32px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '18px',
            textDecoration: 'none'
          }}
        >
          Commencer gratuitement →
        </Link>
      </section>

      {/* ============================================ */}
      {/* FOOTER                                       */}
      {/* ============================================ */}
      <footer style={{ backgroundColor: '#1e293b', color: '#94a3b8', padding: '48px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              backgroundColor: '#2563eb', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              A
            </div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>AgentFacture</span>
          </div>
          <p style={{ marginBottom: '24px' }}>Automatisation comptable par IA pour PME et indépendants</p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px' }}>
            <Link href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/invoices" style={{ color: '#94a3b8', textDecoration: 'none' }}>Importer facture</Link>
            <Link href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/reconciliation" style={{ color: '#94a3b8', textDecoration: 'none' }}>Reconciliation</Link>
            <Link href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/pricing" style={{ color: '#94a3b8', textDecoration: 'none' }}>Tarifs</Link>
          </div>
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #334155', fontSize: '14px' }}>
            © 2025 AgentFacture. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  )
}