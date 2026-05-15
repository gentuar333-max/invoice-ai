import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-agence-immobiliere`

export const metadata: Metadata = {
  title: 'Facturation Agence Immobilière Automatisée | InvoiceAgent',
  description: "Gérez les factures de commissions, honoraires et charges de votre agence immobilière. Extraction PDF, TVA 20%, export FEC. Essai gratuit sans carte bancaire.",
  keywords: ['facturation agence immobilière', 'logiciel facturation immobilier', 'TVA commissions agence', 'export FEC agence immobilière', 'comptabilité agence immobilière IA'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Facturation Agence Immobilière Automatisée | InvoiceAgent',
    description: "Gérez les factures de commissions, honoraires et charges de votre agence immobilière. Extraction PDF, TVA 20%, export FEC. Essai gratuit sans carte bancaire.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Facturation agence immobilière InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Facturation Agence Immobilière Automatisée | InvoiceAgent', description: "Gérez les factures de commissions, honoraires et charges de votre agence immobilière. Extraction PDF, TVA 20%, export FEC. Essai gratuit sans carte bancaire.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
