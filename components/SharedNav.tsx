// components/SharedNav.tsx
import LogoSVG from './LogoSVG'

const BASE_URL = 'https://invoiceagent.fr'

export default function SharedNav() {
  return (
    <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href={BASE_URL} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <LogoSVG size={36} />
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#1e293b', letterSpacing: '-0.3px' }}>InvoiceAgent</span>
        </a>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href={`${BASE_URL}/logiciel-facturation-ia`} style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Fonctionnalités</a>
          <a href={`${BASE_URL}/tarifs`} style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Tarifs</a>
          <a href={`${BASE_URL}/auth/login`} style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Connexion</a>
          <a href={`${BASE_URL}/auth/login`} style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>Essai gratuit</a>
        </div>
      </div>
    </nav>
  )
}