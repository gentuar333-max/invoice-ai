import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/comment-eviter-pertes-comptabilite-pme`

export const metadata: Metadata = {
  title: 'Éviter les Pertes Comptables en PME | InvoiceAgent',
  description: "Découvrez comment les PME évitent les pertes comptables grâce au contrôle automatisé des factures. Doublons, TVA, frais cachés détectés par IA.",
  keywords: ['pertes comptables PME', 'éviter erreurs comptabilité', 'contrôle facture automatique PME', 'doublons facture PME', 'comptabilité automatisée PME'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Éviter les Pertes Comptables en PME — InvoiceAgent',
    description: "Contrôle automatisé des factures : doublons, TVA, frais cachés détectés par IA pour les PME françaises.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Éviter pertes comptables PME InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Pertes Comptables PME — InvoiceAgent', description: "Doublons, TVA incorrecte, frais cachés : l'IA détecte automatiquement les pertes comptables.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
