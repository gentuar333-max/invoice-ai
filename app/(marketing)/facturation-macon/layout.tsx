import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-macon`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Maçon BTP | InvoiceAgent',
  description: "Gérez vos factures béton, matériaux et sous-traitance. TVA 10% ou 20% détectée automatiquement. Export FEC compatible Sage. Essai gratuit.",
  keywords: ['facturation maçon', 'TVA maçonnerie 10%', 'facture béton matériaux maçon', 'logiciel comptable maçon BTP', 'export FEC maçon'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Maçon BTP | InvoiceAgent',
    description: "Gérez vos factures béton, matériaux et sous-traitance. TVA 10% ou 20% détectée automatiquement. Export FEC compatible Sage. Essai gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation maçon BTP InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Maçon BTP | InvoiceAgent', description: "Gérez vos factures béton, matériaux et sous-traitance. TVA 10% ou 20% détectée automatiquement. Export FEC compatible Sage. Essai gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
