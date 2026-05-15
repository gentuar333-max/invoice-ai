import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/frais-caches-facture-comment-detecter`

export const metadata: Metadata = {
  title: 'Frais Cachés Facture — Comment les Détecter | InvoiceAgent',
  description: "Guide complet pour détecter les frais cachés dans vos factures fournisseurs. Exemples concrets et détection automatique par IA en quelques secondes.",
  keywords: ['frais cachés facture comment détecter', 'frais cachés fournisseur exemples', 'surcharge facture B2B', 'détecter frais non négociés', 'audit facture automatique'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Frais Cachés Facture — Comment les Détecter | InvoiceAgent',
    description: "Guide complet avec exemples concrets et détection automatique par IA de tous les frais cachés fournisseurs.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Détecter frais cachés facture InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Frais Cachés Facture — InvoiceAgent', description: "Guide + exemples concrets pour détecter tous les frais cachés fournisseurs. IA en quelques secondes.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
