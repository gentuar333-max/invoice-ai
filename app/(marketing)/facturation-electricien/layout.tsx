import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-electricien`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Électricien Artisan | InvoiceAgent',
  description: "Gérez vos factures travaux, matériaux et fournisseurs en tant qu'électricien. TVA 10% ou 20% détectée par IA. Export FEC. Essai gratuit.",
  keywords: ['facturation électricien', 'TVA travaux électricité 10%', 'facture fournisseur électricien', 'logiciel comptable artisan électricité', 'export FEC électricien'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Électricien Artisan | InvoiceAgent',
    description: "Gérez vos factures travaux, matériaux et fournisseurs en tant qu'électricien. TVA 10% ou 20% détectée par IA. Export FEC. Essai gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation électricien artisan InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Électricien Artisan | InvoiceAgent', description: "Gérez vos factures travaux, matériaux et fournisseurs en tant qu'électricien. TVA 10% ou 20% détectée par IA. Export FEC. Essai gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
