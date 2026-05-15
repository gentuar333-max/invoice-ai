import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/analyse-contrat-ia`

export const metadata: Metadata = {
  title: 'Analyse de Contrat par IA — InvoiceAgent',
  description: "Analysez votre contrat PDF en 30 secondes avec l'IA. Détection des clauses risquées, frais cachés, pénalités et dates critiques. Essai gratuit sans carte bancaire.",
  keywords: ['analyse contrat IA', 'analyser contrat PDF', 'clause risquée contrat', 'analyse contrat automatique', 'vérifier contrat fournisseur IA'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Analyse de Contrat par IA — InvoiceAgent',
    description: "Analysez votre contrat PDF en 30 secondes. Détection des clauses risquées, frais cachés et pénalités.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-analyse-contrat.png`, width: 1200, height: 630, alt: 'Analyse contrat PDF par IA InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Analyse de Contrat par IA — InvoiceAgent', description: "Analysez votre contrat PDF en 30 secondes. Clauses risquées, frais cachés, pénalités.", images: [`${BASE_URL}/og-analyse-contrat.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
