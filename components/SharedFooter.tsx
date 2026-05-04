// components/SharedFooter.tsx
import LogoSVG from './LogoSVG'

const BASE_URL = 'https://invoiceagent.fr'

const footerCols = [
  { title: 'Produit', links: [
    { label: 'Extraction factures PDF', href: `${BASE_URL}/extraction-facture-pdf`, soon: false },
    { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv`, soon: false },
    { label: 'Analyse contrat IA', href: `${BASE_URL}/analyse-contrat-ia`, soon: false },
    { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable`, soon: false },
    { label: 'Détection doublons factures', href: `${BASE_URL}/detection-doublons-factures`, soon: false },
  ]},
  { title: 'Guides', links: [
    { label: 'Blog & articles', href: `${BASE_URL}/blog`, soon: false },
    { label: 'Toutes les ressources', href: `${BASE_URL}/ressources`, soon: false },
    { label: 'Erreurs facture fréquentes', href: `${BASE_URL}/erreurs-facture-frequentes-pme`, soon: false },
    { label: 'Rapprochement bancaire', href: `${BASE_URL}/rapprochement-bancaire-erreur`, soon: false },
    { label: 'TVA pour freelances', href: `${BASE_URL}/blog/tva-freelances-guide-2026`, soon: false },
  ]},
  { title: 'Logiciels', links: [
    { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme`, soon: false },
    { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance`, soon: false },
    { label: 'Analyse contrat prestation', href: `${BASE_URL}/analyse-contrat-prestation`, soon: false },
    { label: 'Logiciel rapprochement bancaire', href: `${BASE_URL}/logiciel-rapprochement-bancaire-automatique`, soon: false },
    { label: 'OCR factures PDF', href: `${BASE_URL}/ocr-factures-pdf`, soon: false },
  ]},
  { title: 'Contact & Légal', links: [
    { label: 'Connexion', href: `${BASE_URL}/auth/login`, soon: false },
    { label: "S'inscrire gratuitement", href: `${BASE_URL}/auth/login`, soon: false },
    { label: 'Mentions légales', href: `${BASE_URL}/mentions-legales`, soon: false },
    { label: 'Confidentialité', href: `${BASE_URL}/confidentialite`, soon: false },
    { label: 'CGU', href: `${BASE_URL}/cgu`, soon: false },
  ]},
]

export default function SharedFooter() {
  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '80px 20px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px', paddingBottom: '64px', borderBottom: '1px solid #1e293b' }}>

          {/* BRAND */}
          <div>
            <a href={BASE_URL} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', textDecoration: 'none' }}>
              <LogoSVG size={32} />
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'white', letterSpacing: '-0.3px' }}>InvoiceAgent</span>
            </a>
            <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#64748b', maxWidth: '220px', marginBottom: '24px' }}>
              Automatisation comptable par IA pour PME et indépendants français.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['EU Données hébergées (Frankfurt)', 'Conforme RGPD', 'Propulsé par Gemini AI'].map((badge) => (
                <span key={badge} style={{ fontSize: '11px', color: '#475569', backgroundColor: '#1e293b', padding: '4px 10px', borderRadius: '20px', display: 'inline-block', width: 'fit-content' }}>{badge}</span>
              ))}
            </div>
          </div>

          {/* COLONNES */}
          {footerCols.map((col) => (
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

        {/* STATS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '56px', flexWrap: 'wrap', padding: '32px 0', borderBottom: '1px solid #1e293b' }}>
          {[
            { value: '500+', label: 'PME utilisatrices' },
            { value: '98%', label: 'Précision extraction' },
            { value: '10h', label: 'Gagnées / semaine' },
            { value: '< 5s', label: "Temps d'analyse" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#3b82f6' }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', padding: '24px 0', fontSize: '12px', color: '#475569' }}>
          <p style={{ margin: 0 }}>© 2026 InvoiceAgent. Tous droits réservés. Fait avec soin en France.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { label: 'Ressources', href: `${BASE_URL}/ressources` },
              { label: 'Blog', href: `${BASE_URL}/blog` },
              { label: 'Mentions légales', href: `${BASE_URL}/mentions-legales` },
              { label: 'Confidentialité', href: `${BASE_URL}/confidentialite` },
              { label: 'CGU', href: `${BASE_URL}/cgu` },
            ].map((link) => (
              <a key={link.label} href={link.href} style={{ color: '#475569', textDecoration: 'none' }}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}