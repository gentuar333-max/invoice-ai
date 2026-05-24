import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'Signer sans analyser votre contrat fournisseur vous coute cher | InvoiceAgent',
  description: 'Frais caches, resiliation couteuse, clauses desequilibrees - InvoiceAgent analyse votre contrat fournisseur PDF en 30 secondes et identifie chaque risque.',
  alternates: { canonical: 'https://invoiceagent.fr/comment-analyser-contrat-fournisseur' },
  openGraph: {
    title: 'Signer sans analyser votre contrat fournisseur vous coute cher | InvoiceAgent',
    description: 'Frais caches, resiliation couteuse, clauses desequilibrees - InvoiceAgent analyse votre contrat fournisseur PDF en 30 secondes et identifie chaque risque.',
    url: 'https://invoiceagent.fr/comment-analyser-contrat-fournisseur',
    siteName: 'InvoiceAgent',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}
