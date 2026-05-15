import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/logiciel-facturation-dijon`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Dijon PME par IA | InvoiceAgent',
  description: "Logiciel de facturation automatique pour PME et indépendants à Dijon. Extraction PDF, réconciliation bancaire, export FEC. Gratuit jusqu'à 5 factures. RGPD.",
  keywords: ['logiciel facturation Dijon', 'facturation automatique Dijon', 'comptabilité PME Dijon', 'OCR facture Dijon', "facturation indépendant Côte-d'Or"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Dijon PME — InvoiceAgent',
    description: "Automatisez votre facturation à Dijon. Extraction PDF, FEC, réconciliation bancaire. Gratuit jusqu'à 5 factures.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation Dijon InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Dijon — InvoiceAgent', description: "Facturation automatique pour PME à Dijon. OCR, FEC, réconciliation bancaire.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
