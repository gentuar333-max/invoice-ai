import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/analyse-contrat-prestation`

export const metadata: Metadata = {
  title: 'Analyse Contrat de Prestation par IA | InvoiceAgent',
  description: "Analysez votre contrat de prestation avant signature. L'IA détecte les clauses abusives, reconductions tacites et risques de requalification. Gratuit.",
  keywords: ['analyse contrat prestation', 'contrat prestation de services IA', 'clause abusive prestation', 'vérifier contrat freelance', 'analyse contrat PDF gratuit'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Analyse Contrat de Prestation par IA — InvoiceAgent',
    description: "Analysez votre contrat de prestation avant signature. Clauses abusives, reconductions, risques détectés par IA.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-analyse-contrat.png`, width: 1200, height: 630, alt: 'Analyse contrat prestation par IA' }],
  },
  twitter: { card: 'summary_large_image', title: 'Analyse Contrat de Prestation — InvoiceAgent', description: "Clauses abusives, reconductions tacites et risques détectés automatiquement.", images: [`${BASE_URL}/og-analyse-contrat.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
