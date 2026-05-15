import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-carreleur`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Carreleur Artisan | InvoiceAgent',
  description: "Gérez vos factures carrelage, matériaux et main d'œuvre. TVA 10% ou 20% détectée automatiquement. Export comptable. Idéal artisans BTP. Essai gratuit.",
  keywords: ['facturation carreleur', 'TVA carrelage 10%', 'facture matériaux carreleur', 'logiciel comptable artisan BTP', 'export FEC carreleur'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Carreleur Artisan | InvoiceAgent',
    description: "Gérez vos factures carrelage, matériaux et main d'œuvre. TVA 10% ou 20% détectée automatiquement. Export comptable. Idéal artisans BTP. Essai gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation carreleur artisan InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Carreleur Artisan | InvoiceAgent', description: "Gérez vos factures carrelage, matériaux et main d'œuvre. TVA 10% ou 20% détectée automatiquement. Export comptable. Idéal artisans BTP. Essai gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
