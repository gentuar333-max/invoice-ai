import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/logiciel-tva-automatique-pme`

export const metadata: Metadata = {
  title: 'Logiciel TVA Automatique pour PME | InvoiceAgent',
  description: "Automatisez la vérification TVA sur toutes vos factures. Taux, calculs HT/TTC, déductibilité contrôlés par IA. Idéal pour PME et comptables. Essai gratuit.",
  keywords: ['logiciel TVA automatique PME', 'vérification TVA automatique', 'contrôle TVA facture IA', 'automatiser TVA comptabilité', 'logiciel comptable TVA France'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel TVA Automatique PME — InvoiceAgent',
    description: "Taux, calculs HT/TTC, déductibilité : vérification TVA automatique par IA pour PME et comptables. Essai gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-tva.png`, width: 1200, height: 630, alt: 'Logiciel TVA automatique PME InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel TVA Automatique PME — InvoiceAgent', description: "Taux, HT/TTC, déductibilité : contrôle TVA automatique pour PME et comptables. Essai gratuit.", images: [`${BASE_URL}/og-tva.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
