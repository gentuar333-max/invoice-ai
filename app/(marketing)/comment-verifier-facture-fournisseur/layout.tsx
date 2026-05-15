import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/comment-verifier-facture-fournisseur`

export const metadata: Metadata = {
  title: 'Comment Vérifier une Facture Fournisseur | InvoiceAgent',
  description: "Vérifiez chaque facture fournisseur avant paiement : montants, TVA, SIRET, mentions légales. Contrôle automatique par IA en quelques secondes. Essai gratuit.",
  keywords: ['vérifier facture fournisseur', 'contrôle facture avant paiement', 'erreur facture fournisseur', 'vérification automatique facture', 'facture fournisseur conforme'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Comment Vérifier une Facture Fournisseur — InvoiceAgent',
    description: "Montants, TVA, SIRET, mentions légales : contrôle automatique par IA avant chaque paiement. Essai gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Vérifier facture fournisseur InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Vérifier une Facture Fournisseur — InvoiceAgent', description: "Contrôle automatique TVA, SIRET et montants avant paiement. Essai gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
