import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-peintre`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Peintre Artisan | InvoiceAgent',
  description: "Gérez vos factures peinture, enduits et matériaux. TVA 10% ou 20% détectée automatiquement selon type de travaux. Export FEC. Essai gratuit.",
  keywords: ['facturation peintre artisan', 'TVA peinture 10%', 'facture enduits matériaux peintre', 'logiciel comptable peintre BTP', 'export FEC peintre'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Peintre Artisan | InvoiceAgent',
    description: "Gérez vos factures peinture, enduits et matériaux. TVA 10% ou 20% détectée automatiquement selon type de travaux. Export FEC. Essai gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation peintre artisan InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Peintre Artisan | InvoiceAgent', description: "Gérez vos factures peinture, enduits et matériaux. TVA 10% ou 20% détectée automatiquement selon type de travaux. Export FEC. Essai gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
