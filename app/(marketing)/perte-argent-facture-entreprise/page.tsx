import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: "Vous perdez de argent sur vos factures sans le savoir | InvoiceAgent",
  description: "31 800 euros perdus par an en moyenne sur des factures non verifiees. InvoiceAgent detecte doublons, frais caches et TVA incorrecte en 5 secondes. Essai gratuit.",
  alternates: { canonical: "https://invoiceagent.fr/perte-argent-facture-entreprise" },
  openGraph: {
    title: "Vous perdez de argent sur vos factures sans le savoir | InvoiceAgent",
    description: "31 800 euros perdus par an en moyenne sur des factures non verifiees. InvoiceAgent detecte doublons, frais caches et TVA incorrecte en 5 secondes. Essai gratuit.",
    url: "https://invoiceagent.fr/perte-argent-facture-entreprise",
    siteName: "InvoiceAgent",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}

