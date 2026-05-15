import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/verifier-contrat-avant-signature`

export const metadata: Metadata = {
  title: 'Vérifier un Contrat Avant Signature — Guide Complet | InvoiceAgent',
  description: "Checklist complète pour vérifier un contrat avant de le signer. Clauses risquées, pénalités, conditions de résiliation. Analyse IA en 30 secondes. Gratuit.",
  keywords: ['vérifier contrat avant signature', 'checklist contrat avant signature', 'clause risquée contrat', 'analyser contrat PDF gratuit', 'vérification contrat fournisseur IA'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Vérifier un Contrat Avant Signature — InvoiceAgent',
    description: "Checklist complète : clauses risquées, pénalités, résiliation. Analyse IA en 30 secondes, gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-analyse-contrat.png`, width: 1200, height: 630, alt: 'Vérifier contrat avant signature InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Vérifier Contrat Avant Signature — InvoiceAgent', description: "Checklist complète + analyse IA gratuite en 30 secondes avant de signer.", images: [`${BASE_URL}/og-analyse-contrat.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
