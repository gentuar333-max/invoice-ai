import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: "Votre PME perd de argent en comptabilite sans le savoir | InvoiceAgent",
  description: "35 000 euros de pertes evitables par an en moyenne. InvoiceAgent detecte automatiquement doublons, TVA non recuperee et surfacturations avant coutent.",
  alternates: { canonical: "https://invoiceagent.fr/comment-eviter-pertes-comptabilite-pme" },
  openGraph: {
    title: "Votre PME perd de argent en comptabilite sans le savoir | InvoiceAgent",
    description: "35 000 euros de pertes evitables par an en moyenne. InvoiceAgent detecte automatiquement doublons, TVA non recuperee et surfacturations avant coutent.",
    url: "https://invoiceagent.fr/comment-eviter-pertes-comptabilite-pme",
    siteName: "InvoiceAgent",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}

