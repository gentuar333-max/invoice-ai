import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/logiciel-facturation-strasbourg`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Strasbourg PME par IA | InvoiceAgent',
  description: "Logiciel de facturation automatique pour PME et indépendants à Strasbourg. Extraction PDF, réconciliation bancaire, export FEC. Gratuit jusqu'à 5 factures. RGPD.",
  keywords: ['logiciel facturation Strasbourg', 'facturation automatique Strasbourg', 'comptabilité PME Strasbourg', 'OCR facture Strasbourg', 'facturation indépendant Bas-Rhin'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Strasbourg PME — InvoiceAgent',
    description: "Automatisez votre facturation à Strasbourg. Extraction PDF, FEC, réconciliation bancaire. Gratuit jusqu'à 5 factures.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation Strasbourg InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Strasbourg — InvoiceAgent', description: "Facturation automatique pour PME à Strasbourg. OCR, FEC, réconciliation bancaire.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
