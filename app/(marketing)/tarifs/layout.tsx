import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/tarifs`

export const metadata: Metadata = {
  title: 'Tarifs InvoiceAgent — Plans Gratuit, Starter et Pro',
  description: "Découvrez les tarifs InvoiceAgent : plan gratuit jusqu'à 5 factures, Starter 19€/mois, Pro 49€/mois. Sans engagement. Factures, contrats et FEC inclus.",
  keywords: ['tarifs InvoiceAgent', 'prix logiciel facturation IA', 'plan gratuit facturation PME', 'abonnement InvoiceAgent', 'tarif extraction facture PDF'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Tarifs InvoiceAgent — Gratuit, Starter et Pro',
    description: "Plan gratuit jusqu'à 5 factures. Starter 19€/mois, Pro 49€/mois. Sans engagement, sans carte bancaire.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Tarifs InvoiceAgent plans et prix' }],
  },
  twitter: { card: 'summary_large_image', title: 'Tarifs InvoiceAgent', description: "Gratuit jusqu'à 5 factures. Starter 19€/mois, Pro 49€/mois. Sans engagement.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
