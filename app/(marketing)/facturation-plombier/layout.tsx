import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-plombier`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Plombier Artisan | InvoiceAgent',
  description: "Gérez vos factures plomberie, matériaux et fournisseurs depuis vos chantiers. TVA 10% ou 20% détectée par IA. Export FEC. Essai gratuit.",
  keywords: ['facturation plombier artisan', 'TVA travaux plomberie 10%', 'facture fournisseur plombier', 'logiciel comptable plombier BTP', 'export FEC plombier'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Plombier Artisan | InvoiceAgent',
    description: "Gérez vos factures plomberie, matériaux et fournisseurs depuis vos chantiers. TVA 10% ou 20% détectée par IA. Export FEC. Essai gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation plombier artisan InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Plombier Artisan | InvoiceAgent', description: "Gérez vos factures plomberie, matériaux et fournisseurs depuis vos chantiers. TVA 10% ou 20% détectée par IA. Export FEC. Essai gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
