import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'Erreur TVA sur facture : corriger avant le controle fiscal | InvoiceAgent',
  description: 'Une erreur TVA non corrigee entraine jusqu'a 40% de majoration fiscale. InvoiceAgent detecte l'erreur en 5 secondes et guide vers la facture rectificative.',
  alternates: { canonical: 'https://invoiceagent.fr/erreur-tva-facture-comment-corriger' },
  openGraph: {
    title: 'Erreur TVA sur facture : corriger avant le controle fiscal | InvoiceAgent',
    description: 'Une erreur TVA non corrigee entraine jusqu'a 40% de majoration fiscale. InvoiceAgent detecte l'erreur en 5 secondes et guide vers la facture rectificative.',
    url: 'https://invoiceagent.fr/erreur-tva-facture-comment-corriger',
    siteName: 'InvoiceAgent',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}
