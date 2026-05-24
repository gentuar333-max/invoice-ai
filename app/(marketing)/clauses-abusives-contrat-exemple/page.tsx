import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'Clauses abusives dans vos contrats fournisseurs : exemples reels | InvoiceAgent',
  description: 'Non-concurrence excessive, cession de droits totale, penalites cachees - InvoiceAgent detecte les clauses abusives dans vos contrats PDF en 30 secondes.',
  alternates: { canonical: 'https://invoiceagent.fr/clauses-abusives-contrat-exemple' },
  openGraph: {
    title: 'Clauses abusives dans vos contrats fournisseurs : exemples reels | InvoiceAgent',
    description: 'Non-concurrence excessive, cession de droits totale, penalites cachees - InvoiceAgent detecte les clauses abusives dans vos contrats PDF en 30 secondes.',
    url: 'https://invoiceagent.fr/clauses-abusives-contrat-exemple',
    siteName: 'InvoiceAgent',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}
