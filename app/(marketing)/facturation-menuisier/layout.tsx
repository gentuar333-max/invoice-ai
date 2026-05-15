import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-menuisier`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Menuisier Artisan | InvoiceAgent',
  description: "Gérez vos factures bois, matériaux et pose. TVA 10% ou 20% selon travaux détectée par IA. Export comptable FEC. Idéal menuisiers indépendants. Gratuit.",
  keywords: ['facturation menuisier', 'TVA menuiserie 10%', 'facture bois matériaux menuisier', 'logiciel comptable menuisier', 'export FEC menuisier artisan'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Menuisier Artisan | InvoiceAgent',
    description: "Gérez vos factures bois, matériaux et pose. TVA 10% ou 20% selon travaux détectée par IA. Export comptable FEC. Idéal menuisiers indépendants. Gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation menuisier artisan InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Menuisier Artisan | InvoiceAgent', description: "Gérez vos factures bois, matériaux et pose. TVA 10% ou 20% selon travaux détectée par IA. Export comptable FEC. Idéal menuisiers indépendants. Gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
