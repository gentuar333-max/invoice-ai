import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/detection-clauses-abusives`

export const metadata: Metadata = {
  title: 'Détection Clauses Abusives Contrat par IA | InvoiceAgent',
  description: "Détectez automatiquement les clauses abusives dans vos contrats B2B. IA Gemini analyse chaque clause : pénalités, exclusivité, résiliation. Essai gratuit.",
  keywords: ['détection clauses abusives', 'clause abusive contrat B2B', 'analyser clause contrat IA', 'pénalités contrat abusif', 'vérifier contrat automatique'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Détection Clauses Abusives par IA — InvoiceAgent',
    description: "IA Gemini analyse chaque clause : pénalités, exclusivité, résiliation abusive. Essai gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-analyse-contrat.png`, width: 1200, height: 630, alt: 'Détection clauses abusives InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Détection Clauses Abusives — InvoiceAgent', description: "Pénalités, exclusivité, résiliation : clauses abusives détectées par IA Gemini. Essai gratuit.", images: [`${BASE_URL}/og-analyse-contrat.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
