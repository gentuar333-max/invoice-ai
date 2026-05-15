import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/confidentialite`

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | InvoiceAgent',
  description: "Politique de confidentialité d'InvoiceAgent : données collectées, traitement RGPD, droits des utilisateurs, cookies et sécurité. Hébergement Europe.",
  keywords: ['politique confidentialité InvoiceAgent', 'RGPD InvoiceAgent', 'données personnelles InvoiceAgent', 'cookies InvoiceAgent', 'sécurité données facturation'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Politique de Confidentialité — InvoiceAgent',
    description: "Données collectées, RGPD, droits utilisateurs, cookies et sécurité. Hébergement Europe.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Politique confidentialité InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Confidentialité — InvoiceAgent', description: "RGPD, données personnelles, cookies et sécurité. Hébergement Europe.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
