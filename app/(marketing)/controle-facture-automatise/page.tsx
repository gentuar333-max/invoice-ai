import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: "Controle facture automatique : stoppez les pertes avant paiement | InvoiceAgent",
  description: "Chaque facture non controlee est une perte potentielle. InvoiceAgent verifie doublons, TVA, frais caches et mentions obligatoires en 5 secondes par facture PDF.",
  alternates: { canonical: "https://invoiceagent.fr/controle-facture-automatise" },
  openGraph: {
    title: "Controle facture automatique : stoppez les pertes avant paiement | InvoiceAgent",
    description: "Chaque facture non controlee est une perte potentielle. InvoiceAgent verifie doublons, TVA, frais caches et mentions obligatoires en 5 secondes par facture PDF.",
    url: "https://invoiceagent.fr/controle-facture-automatise",
    siteName: "InvoiceAgent",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}

