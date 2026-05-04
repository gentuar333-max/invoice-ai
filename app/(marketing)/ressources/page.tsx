 
import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'

export const metadata: Metadata = {
  title: 'Ressources comptabilité PME — Guides et outils gratuits | InvoiceAgent',
  description: 'Guides pratiques, outils et ressources pour automatiser votre comptabilité PME : facturation, rapprochement bancaire, TVA, analyse de contrats.',
  alternates: { canonical: `${BASE_URL}/ressources` },
  robots: { index: true, follow: true },
}

const categories = [
  {
    title: 'Facturation et factures',
    color: '#6366f1',
    bg: '#ede9fe',
    links: [
      { label: 'Erreurs de facture fréquentes en PME', href: `${BASE_URL}/erreurs-facture-frequentes-pme` },
      { label: 'Comment vérifier une facture fournisseur', href: `${BASE_URL}/comment-verifier-facture-fournisseur` },
      { label: 'Doublon de facture : que faire ?', href: `${BASE_URL}/doublon-facture-que-faire` },
      { label: 'Contrôle de facture automatisé', href: `${BASE_URL}/controle-facture-automatise` },
      { label: 'Comment détecter une erreur sur une facture PDF', href: `${BASE_URL}/comment-detecter-erreur-facture-pdf` },
      { label: 'Outil analyse facture automatique', href: `${BASE_URL}/outil-analyse-facture-automatique` },
      { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
      { label: 'OCR factures : comment ça marche', href: `${BASE_URL}/blog/ocr-factures-comment-ca-marche` },
    ],
  },
  {
    title: 'Rapprochement bancaire',
    color: '#2563eb',
    bg: '#dbeafe',
    links: [
      { label: 'Réconciliation bancaire CSV — Guide complet', href: `${BASE_URL}/reconciliation-bancaire-csv` },
      { label: 'Erreur de rapprochement bancaire : solutions', href: `${BASE_URL}/rapprochement-bancaire-erreur` },
      { label: 'Logiciel rapprochement bancaire automatique', href: `${BASE_URL}/logiciel-rapprochement-bancaire-automatique` },
      { label: 'Écart rapprochement bancaire : comment le résoudre', href: `${BASE_URL}/ecart-rapprochement-bancaire-solution` },
    ],
  },
  {
    title: 'TVA et comptabilité',
    color: '#d97706',
    bg: '#fef3c7',
    links: [
      { label: 'Erreur TVA sur facture : comment corriger', href: `${BASE_URL}/erreur-tva-facture-comment-corriger` },
      { label: 'Logiciel TVA automatique pour PME', href: `${BASE_URL}/logiciel-tva-automatique-pme` },
      { label: 'Calcul TVA : erreurs fréquentes en entreprise', href: `${BASE_URL}/calcul-tva-erreur-entreprise` },
      { label: 'TVA pour freelances : guide 2026', href: `${BASE_URL}/blog/tva-freelances-guide-2026` },
      { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
      { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
    ],
  },
  {
    title: 'Analyse de contrats',
    color: '#7c3aed',
    bg: '#ede9fe',
    links: [
      { label: 'Clauses abusives dans un contrat : exemples', href: `${BASE_URL}/clauses-abusives-contrat-exemple` },
      { label: 'Comment analyser un contrat fournisseur', href: `${BASE_URL}/comment-analyser-contrat-fournisseur` },
      { label: 'Risques d\'un contrat de prestation', href: `${BASE_URL}/risque-contrat-prestation-entreprise` },
      { label: 'Frais cachés dans un contrat entreprise', href: `${BASE_URL}/frais-caches-contrat-entreprise` },
      { label: 'Vérifier un contrat avant signature', href: `${BASE_URL}/verifier-contrat-avant-signature` },
      { label: 'Analyse contrat prestation', href: `${BASE_URL}/analyse-contrat-prestation` },
      { label: 'Détection clauses abusives', href: `${BASE_URL}/detection-clauses-abusives` },
      { label: 'Analyse contrat IA', href: `${BASE_URL}/analyse-contrat-ia` },
    ],
  },
  {
    title: 'Logiciels par secteur',
    color: '#059669',
    bg: '#d1fae5',
    links: [
      { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` },
      { label: 'Logiciel facturation coach', href: `${BASE_URL}/facturation-coach` },
      { label: 'Logiciel facturation Reims', href: `${BASE_URL}/logiciel-facturation-reims` },
      { label: 'Logiciel facturation menuisier', href: `${BASE_URL}/facturation-menuisier` },
      { label: 'OCR factures PDF', href: `${BASE_URL}/ocr-factures-pdf` },
      { label: 'Extraction données facture', href: `${BASE_URL}/extraction-donnees-facture` },
      { label: 'Détection doublons factures', href: `${BASE_URL}/detection-doublons-factures` },
      { label: 'Détection frais cachés', href: `${BASE_URL}/detection-frais-caches` },
    ],
  },
]

export default function RessourcesPage() {
  return (
    <>
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ backgroundColor: 'white', padding: '60px 20px 48px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '14px', lineHeight: 1.2 }}>
              Ressources comptabilité PME
            </h1>
            <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.7, marginBottom: '28px' }}>
              Guides pratiques et outils pour automatiser votre facturation, rapprochement bancaire, TVA et analyse de contrats.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#6366f1', color: 'white', padding: '13px 28px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none' }}>
              Tester InvoiceAgent gratuitement
            </a>
          </div>
        </section>

        {/* CATEGORIES */}
        <section style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 20px 80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {categories.map((cat) => (
              <div key={cat.title} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '28px 32px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: cat.color }} />
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>{cat.title}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
                  {cat.links.map((link) => (
                    <a key={link.href} href={link.href}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', backgroundColor: cat.bg, borderRadius: '10px', textDecoration: 'none', fontSize: '14px', color: '#1e293b', fontWeight: 500, transition: 'opacity 0.15s' }}>
                      <span style={{ color: cat.color, flexShrink: 0, fontSize: 12, fontWeight: 700 }}>→</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Blog */}
          <div style={{ marginTop: 32, backgroundColor: 'white', borderRadius: '16px', padding: '28px 32px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#0891b2' }} />
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>Articles de blog</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '10px' }}>
              {[
                { label: 'Comment automatiser sa facturation en 2026', href: `${BASE_URL}/blog/automatiser-facturation-pme-2026` },
                { label: 'FEC comptable : guide complet PME', href: `${BASE_URL}/blog/fec-comptable-guide-pme` },
                { label: 'Réconciliation bancaire CSV — Guide 2026', href: `${BASE_URL}/blog/reconciliation-bancaire-csv-guide` },
                { label: 'TVA pour freelances : guide 2026', href: `${BASE_URL}/blog/tva-freelances-guide-2026` },
                { label: 'OCR factures : comment ça marche', href: `${BASE_URL}/blog/ocr-factures-comment-ca-marche` },
              ].map((link) => (
                <a key={link.href} href={link.href}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', backgroundColor: '#ecfeff', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', color: '#1e293b', fontWeight: 500 }}>
                  <span style={{ color: '#0891b2', flexShrink: 0, fontSize: 12, fontWeight: 700 }}>→</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}