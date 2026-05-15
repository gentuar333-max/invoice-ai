import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/doublon-facture-que-faire`

export const metadata: Metadata = {
  title: 'Doublon de Facture — Que Faire ? | InvoiceAgent',
  description: "Vous avez payé une facture en double ? Découvrez comment récupérer votre argent et éviter que cela se reproduise grâce au contrôle automatique par IA.",
  keywords: ['doublon facture que faire', 'paiement double facture', 'récupérer paiement en double', 'éviter doublon facturation', 'contrôle doublon automatique'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Doublon de Facture — Que Faire ? | InvoiceAgent',
    description: "Comment récupérer un paiement en double et éviter les doublons grâce au contrôle automatique par IA.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Doublon facture que faire InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Doublon de Facture — InvoiceAgent', description: "Payé en double ? Comment récupérer et prévenir les doublons avec l'IA.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
