import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: 'Erreur de calcul TVA sur facture : detectee au centime pres | InvoiceAgent',
  description: '12% des factures fournisseurs contiennent un ecart de calcul TVA. InvoiceAgent recalcule chaque ligne automatiquement et detecte les erreurs en 5 secondes.',
  alternates: { canonical: 'https://invoiceagent.fr/calcul-tva-erreur-entreprise' },
  openGraph: {
    title: 'Erreur de calcul TVA sur facture : detectee au centime pres | InvoiceAgent',
    description: '12% des factures fournisseurs contiennent un ecart de calcul TVA. InvoiceAgent recalcule chaque ligne automatiquement et detecte les erreurs en 5 secondes.',
    url: 'https://invoiceagent.fr/calcul-tva-erreur-entreprise',
    siteName: 'InvoiceAgent',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}
