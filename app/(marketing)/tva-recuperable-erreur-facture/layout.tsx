import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/tva-recuperable-erreur-facture`

export const metadata: Metadata = {
  title: "TVA Non Récupérable à Cause d'une Erreur de Facture | InvoiceAgent",
  description: "Une erreur sur votre facture peut vous faire perdre la TVA déductible. Découvrez les erreurs à éviter et comment l'IA les détecte automatiquement.",
  keywords: ['TVA non récupérable erreur facture', 'TVA déductible perdue', 'erreur facture TVA remboursement', 'mentions obligatoires facture TVA', 'récupérer TVA facture incorrecte'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'TVA Non Récupérable — Erreur de Facture | InvoiceAgent',
    description: "Erreurs qui font perdre la TVA déductible et comment l'IA les détecte automatiquement sur vos factures.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-tva.png`, width: 1200, height: 630, alt: 'TVA récupérable erreur facture InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'TVA Perdue Erreur Facture — InvoiceAgent', description: "Les erreurs de facture qui font perdre la TVA déductible, détectées automatiquement par IA.", images: [`${BASE_URL}/og-tva.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
