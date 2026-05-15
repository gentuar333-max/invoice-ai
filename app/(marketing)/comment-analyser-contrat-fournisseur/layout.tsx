import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/comment-analyser-contrat-fournisseur`

export const metadata: Metadata = {
  title: 'Comment Analyser un Contrat Fournisseur | InvoiceAgent',
  description: "Guide complet pour analyser un contrat fournisseur avant signature. Identifiez les clauses risquées, pénalités et conditions cachées. Analyse IA en 30 secondes.",
  keywords: ['analyser contrat fournisseur', 'vérifier contrat fournisseur', 'clause risquée contrat fournisseur', 'analyse contrat avant signature', 'guide contrat fournisseur PME'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Comment Analyser un Contrat Fournisseur — InvoiceAgent',
    description: "Guide complet + analyse IA en 30 secondes. Clauses risquées, pénalités et conditions cachées détectées.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-analyse-contrat.png`, width: 1200, height: 630, alt: 'Analyser contrat fournisseur InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Analyser un Contrat Fournisseur — InvoiceAgent', description: "Guide complet et analyse IA des clauses risquées dans vos contrats fournisseurs.", images: [`${BASE_URL}/og-analyse-contrat.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
