import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-photographe`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Photographe Professionnel | InvoiceAgent',
  description: "Gérez vos factures clients et achats matériel photo. TVA sur prestations et équipements détectée par IA. Export FEC. Idéal photographes indépendants. Gratuit.",
  keywords: ['facturation photographe professionnel', 'TVA photographe indépendant', 'facture matériel photo', 'logiciel comptable photographe', 'export FEC photographe'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Photographe Professionnel | InvoiceAgent',
    description: "Gérez vos factures clients et achats matériel photo. TVA sur prestations et équipements détectée par IA. Export FEC. Idéal photographes indépendants. Gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation photographe professionnel InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Photographe Professionnel | InvoiceAgent', description: "Gérez vos factures clients et achats matériel photo. TVA sur prestations et équipements détectée par IA. Export FEC. Idéal photographes indépendants. Gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
