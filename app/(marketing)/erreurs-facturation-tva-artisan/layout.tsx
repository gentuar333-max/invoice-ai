import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/erreurs-facturation-tva-artisan`

export const metadata: Metadata = {
  title: 'Erreurs TVA Artisan — Éviter les Pénalités | InvoiceAgent',
  description: "Les 5 erreurs de TVA les plus fréquentes chez les artisans BTP : taux 10%, 5,5%, autoliquidation. Détection automatique par IA. Essai gratuit.",
  keywords: ['erreur TVA artisan', 'TVA BTP taux 10%', 'autoliquidation TVA artisan', 'facture artisan TVA incorrecte', 'taux TVA travaux maison'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Erreurs TVA Artisan BTP — InvoiceAgent',
    description: "Taux 10%, 5,5%, autoliquidation : les 5 erreurs TVA artisan les plus fréquentes. Détection automatique par IA.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-tva.png`, width: 1200, height: 630, alt: 'Erreurs TVA artisan BTP InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Erreurs TVA Artisan — InvoiceAgent', description: "Taux 10%, 5,5%, autoliquidation : erreurs TVA artisan détectées automatiquement. Essai gratuit.", images: [`${BASE_URL}/og-tva.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
