import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'Verifier une facture fournisseur avant paiement : le guide | InvoiceAgent',
  description: 'Une facture non verifiee = doublon, frais cache ou TVA perdue. InvoiceAgent controle montants, TVA et mentions en 5 secondes avant tout paiement. Essai gratuit.',
  alternates: { canonical: 'https://invoiceagent.fr/comment-verifier-facture-fournisseur' },
  openGraph: {
    title: 'Verifier une facture fournisseur avant paiement : le guide | InvoiceAgent',
    description: 'Une facture non verifiee = doublon, frais cache ou TVA perdue. InvoiceAgent controle montants, TVA et mentions en 5 secondes avant tout paiement. Essai gratuit.',
    url: 'https://invoiceagent.fr/comment-verifier-facture-fournisseur',
    siteName: 'InvoiceAgent',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}
