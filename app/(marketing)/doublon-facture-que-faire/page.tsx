import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'Doublon facture fournisseur paye deux fois : que faire | InvoiceAgent',
  description: '12 800 euros de doublons payes par an en moyenne. InvoiceAgent detecte les doublons avant paiement et vous guide vers le remboursement. Essai gratuit.',
  alternates: { canonical: 'https://invoiceagent.fr/doublon-facture-que-faire' },
  openGraph: {
    title: 'Doublon facture fournisseur paye deux fois : que faire | InvoiceAgent',
    description: '12 800 euros de doublons payes par an en moyenne. InvoiceAgent detecte les doublons avant paiement et vous guide vers le remboursement. Essai gratuit.',
    url: 'https://invoiceagent.fr/doublon-facture-que-faire',
    siteName: 'InvoiceAgent',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}
