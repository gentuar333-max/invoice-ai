import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'InvoiceAgent — Automatisation comptable par IA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ background: '#09090b', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px' }}>
        <div style={{ fontSize: '72px', fontWeight: 900, color: 'white', marginBottom: '24px', textAlign: 'center', lineHeight: 1.1 }}>
          InvoiceAgent
        </div>
        <div style={{ fontSize: '32px', color: '#818cf8', textAlign: 'center', marginBottom: '40px' }}>
          Automatisation comptable par IA
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Extraction PDF', 'Réconciliation CSV', 'Analyse contrats', 'Export FEC'].map((f) => (
            <div key={f} style={{ backgroundColor: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '8px', padding: '10px 20px', color: '#a5b4fc', fontSize: '18px' }}>
              {f}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}