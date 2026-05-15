import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-traducteur`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Traducteur Indépendant | InvoiceAgent',
  description: "Gérez vos factures clients et achats outils en tant que traducteur. TVA sur prestations de traduction, export FEC. Idéal traducteurs freelance. Gratuit.",
  keywords: ['facturation traducteur indépendant', 'TVA prestation traduction', 'logiciel comptable traducteur', 'facture traduction freelance', 'export FEC traducteur'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Traducteur Indépendant | InvoiceAgent',
    description: "Gérez vos factures clients et achats outils en tant que traducteur. TVA sur prestations de traduction, export FEC. Idéal traducteurs freelance. Gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation traducteur indépendant InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Traducteur Indépendant | InvoiceAgent', description: "Gérez vos factures clients et achats outils en tant que traducteur. TVA sur prestations de traduction, export FEC. Idéal traducteurs freelance. Gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
