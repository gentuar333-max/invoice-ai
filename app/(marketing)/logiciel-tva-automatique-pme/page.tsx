import type { Metadata } from 'next'
import ClientPage from './ClientPage'

export const metadata: Metadata = {
  title: '8 heures de verification TVA par mois - automatisees en 8 minutes | InvoiceAgent',
  description: '100 factures verifiees manuellement = 8 heures perdues. InvoiceAgent automatise taux, VIES, mentions et calculs TVA en 5 secondes par facture. Essai gratuit.',
  alternates: { canonical: 'https://invoiceagent.fr/logiciel-tva-automatique-pme' },
  openGraph: {
    title: '8 heures de verification TVA par mois - automatisees en 8 minutes | InvoiceAgent',
    description: '100 factures verifiees manuellement = 8 heures perdues. InvoiceAgent automatise taux, VIES, mentions et calculs TVA en 5 secondes par facture. Essai gratuit.',
    url: 'https://invoiceagent.fr/logiciel-tva-automatique-pme',
    siteName: 'InvoiceAgent',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <ClientPage />
}
