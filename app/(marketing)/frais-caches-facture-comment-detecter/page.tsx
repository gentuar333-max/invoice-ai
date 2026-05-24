import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'Frais caches sur vos factures fournisseurs : comment les detecter | InvoiceAgent',
  description: '8 500 euros de frais caches acceptes sans verification chaque annee. InvoiceAgent analyse chaque ligne et detecte les majorations non contractuelles en 5 secondes.',
  alternates: { canonical: 'https://invoiceagent.fr/frais-caches-facture-comment-detecter' },
  openGraph: {
    title: 'Frais caches sur vos factures fournisseurs : comment les detecter | InvoiceAgent',
    description: '8 500 euros de frais caches acceptes sans verification chaque annee. InvoiceAgent analyse chaque ligne et detecte les majorations non contractuelles en 5 secondes.',
    url: 'https://invoiceagent.fr/frais-caches-facture-comment-detecter',
    siteName: 'InvoiceAgent',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}
