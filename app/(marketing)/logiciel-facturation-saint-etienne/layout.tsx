import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/logiciel-facturation-saint-etienne`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Saint-Étienne PME par IA | InvoiceAgent',
  description: "Logiciel de facturation automatique pour PME et indépendants à Saint-Étienne. Extraction PDF, réconciliation bancaire, export FEC. Gratuit jusqu'à 5 factures. RGPD.",
  keywords: ['logiciel facturation Saint-Étienne', 'facturation automatique Saint-Étienne', 'comptabilité PME Saint-Étienne', 'OCR facture Saint-Étienne', 'facturation indépendant Loire'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Saint-Étienne PME — InvoiceAgent',
    description: "Automatisez votre facturation à Saint-Étienne. Extraction PDF, FEC, réconciliation bancaire. Gratuit jusqu'à 5 factures.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation Saint-Étienne InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Saint-Étienne — InvoiceAgent', description: "Facturation automatique pour PME à Saint-Étienne. OCR, FEC, réconciliation bancaire.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
