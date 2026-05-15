import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-micro-entreprise`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Micro-Entreprise | InvoiceAgent',
  description: "Gérez vos factures en micro-entreprise sans TVA ou avec TVA selon votre chiffre d'affaires. Extraction PDF, export comptable. Essai gratuit.",
  keywords: ['facturation micro-entreprise', 'logiciel facturation micro-entrepreneur', 'facture sans TVA micro-entreprise', 'export comptable micro-entreprise', 'gestion facture auto-entrepreneur'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Micro-Entreprise | InvoiceAgent',
    description: "Gérez vos factures en micro-entreprise sans TVA ou avec TVA selon votre chiffre d'affaires. Extraction PDF, export comptable. Essai gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation micro-entreprise InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Micro-Entreprise | InvoiceAgent', description: "Gérez vos factures en micro-entreprise sans TVA ou avec TVA selon votre chiffre d'affaires. Extraction PDF, export comptable. Essai gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
