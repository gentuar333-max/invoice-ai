import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-auto-entrepreneur`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Auto-Entrepreneur | InvoiceAgent',
  description: "Gérez vos factures clients et fournisseurs en auto-entrepreneur. Sans TVA ou avec TVA selon votre régime. Extraction PDF et export comptable. Gratuit.",
  keywords: ['facturation auto-entrepreneur', 'logiciel facturation autoentrepreneur', 'facture sans TVA auto-entrepreneur', 'export comptable micro-entreprise', 'gestion facture indépendant'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Auto-Entrepreneur | InvoiceAgent',
    description: "Gérez vos factures clients et fournisseurs en auto-entrepreneur. Sans TVA ou avec TVA selon votre régime. Extraction PDF et export comptable. Gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation auto-entrepreneur InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Auto-Entrepreneur | InvoiceAgent', description: "Gérez vos factures clients et fournisseurs en auto-entrepreneur. Sans TVA ou avec TVA selon votre régime. Extraction PDF et export comptable. Gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
