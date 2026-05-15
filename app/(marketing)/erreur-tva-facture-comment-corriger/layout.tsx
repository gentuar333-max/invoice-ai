import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/erreur-tva-facture-comment-corriger`

export const metadata: Metadata = {
  title: 'Corriger une Erreur de TVA sur Facture | InvoiceAgent',
  description: "Comment corriger une erreur de TVA sur une facture : avoir, facture rectificative, délais légaux. L'IA prévient les erreurs avant qu'elles arrivent. Essai gratuit.",
  keywords: ['corriger erreur TVA facture', 'facture rectificative TVA', 'avoir TVA incorrecte', 'erreur taux TVA facture', 'corriger facture fournisseur'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Corriger une Erreur de TVA sur Facture — InvoiceAgent',
    description: "Avoir, facture rectificative, délais légaux : guide complet + détection automatique par IA avant qu'elles arrivent.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-tva.png`, width: 1200, height: 630, alt: 'Corriger erreur TVA facture InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Erreur TVA Facture — InvoiceAgent', description: "Guide pour corriger une erreur de TVA + prévention automatique par IA. Essai gratuit.", images: [`${BASE_URL}/og-tva.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
