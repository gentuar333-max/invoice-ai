import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: "Mauvais taux TVA artisan BTP : 10%, 5,5% ou 20% | InvoiceAgent",
  description: "Un mauvais taux TVA sur un chantier coute des milliers d euros en cas de controle fiscal. InvoiceAgent verifie taux, CERFA et calculs automatiquement en 5 secondes.",
  alternates: { canonical: "https://invoiceagent.fr/erreurs-facturation-tva-artisan" },
  openGraph: {
    title: "Mauvais taux TVA artisan BTP : 10%, 5,5% ou 20% | InvoiceAgent",
    description: "Un mauvais taux TVA sur un chantier coute des milliers d euros en cas de controle fiscal. InvoiceAgent verifie taux, CERFA et calculs automatiquement en 5 secondes.",
    url: "https://invoiceagent.fr/erreurs-facturation-tva-artisan",
    siteName: "InvoiceAgent",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}

