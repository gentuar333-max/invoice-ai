import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/clauses-abusives-contrat-exemple`

export const metadata: Metadata = {
  title: 'Clauses Abusives Contrat Commercial — Exemples | InvoiceAgent',
  description: "Exemples concrets de clauses abusives dans les contrats B2B. L'IA InvoiceAgent les détecte automatiquement dans vos PDF. Analysez votre contrat gratuitement.",
  keywords: ['clauses abusives exemples', 'clause abusive contrat commercial', 'détecter clause abusive B2B', 'contrat fournisseur clause risque', 'analyse clause contrat PDF'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Clauses Abusives Contrat — Exemples | InvoiceAgent',
    description: "Exemples de clauses abusives B2B et détection automatique par IA. Analysez votre contrat gratuitement.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-analyse-contrat.png`, width: 1200, height: 630, alt: 'Clauses abusives contrat exemples InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Clauses Abusives Contrat — InvoiceAgent', description: "Exemples concrets et détection IA des clauses abusives dans vos contrats B2B.", images: [`${BASE_URL}/og-analyse-contrat.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
