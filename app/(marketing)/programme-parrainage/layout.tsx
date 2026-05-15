import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/programme-parrainage`

export const metadata: Metadata = {
  title: 'Programme de Parrainage InvoiceAgent — Gagnez des Mois Gratuits',
  description: "Parrainez vos contacts et gagnez un mois gratuit par filleul actif. Programme de parrainage InvoiceAgent sans limite. Commencez dès aujourd'hui.",
  keywords: ['parrainage InvoiceAgent', 'programme parrainage facturation', 'gagner mois gratuit InvoiceAgent', 'parrainer ami comptabilité', 'code parrainage InvoiceAgent'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Programme de Parrainage InvoiceAgent',
    description: "Un mois gratuit par filleul actif, sans limite. Parrainez vos contacts dès aujourd'hui.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Programme parrainage InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Parrainage InvoiceAgent', description: "Gagnez un mois gratuit par filleul actif. Sans limite.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
