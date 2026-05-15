import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/detection-doublons-factures`

export const metadata: Metadata = {
  title: 'Détection Doublons Factures Automatique | InvoiceAgent',
  description: "Détectez les doublons de facturation automatiquement avant qu'ils coûtent cher. Analyse IA sur numéro, montant et fournisseur. Gratuit jusqu'à 5 factures.",
  keywords: ['détection doublons factures', 'doublon facturation automatique', 'éviter doublon paiement', 'facture en double PME', 'contrôle doublon facture IA'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Détection Doublons Factures — InvoiceAgent',
    description: "Analyse IA sur numéro, montant et fournisseur. Détectez les doublons avant qu'ils impactent votre trésorerie.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Détection doublons factures InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Détection Doublons Factures — InvoiceAgent', description: "Détectez automatiquement les doublons par numéro, montant et fournisseur. Gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
