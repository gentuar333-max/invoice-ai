import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: "TVA non recuperable : erreur de facture qui vous coute cher | InvoiceAgent",
  description: "6 200 euros de TVA perdue par an a cause d erreurs formelles. InvoiceAgent verifie numero VIES, taux et mentions obligatoires en 5 secondes avant comptabilisation.",
  alternates: { canonical: "https://invoiceagent.fr/tva-recuperable-erreur-facture" },
  openGraph: {
    title: "TVA non recuperable : erreur de facture qui vous coute cher | InvoiceAgent",
    description: "6 200 euros de TVA perdue par an a cause d erreurs formelles. InvoiceAgent verifie numero VIES, taux et mentions obligatoires en 5 secondes avant comptabilisation.",
    url: "https://invoiceagent.fr/tva-recuperable-erreur-facture",
    siteName: "InvoiceAgent",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}

