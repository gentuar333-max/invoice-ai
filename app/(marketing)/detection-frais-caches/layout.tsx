import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/detection-frais-caches`

export const metadata: Metadata = {
  title: 'Détection Frais Cachés Facture Fournisseur | InvoiceAgent',
  description: "Détectez automatiquement les frais cachés sur vos factures fournisseurs : frais de dossier, pénalités non négociées, surcharges. IA Gemini. Essai gratuit.",
  keywords: ['frais cachés facture', 'détecter frais cachés fournisseur', 'surcharge facture B2B', 'pénalité cachée contrat', 'audit facture fournisseur IA'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Détection Frais Cachés Facture — InvoiceAgent',
    description: "Frais de dossier, pénalités non négociées, surcharges : détectés automatiquement par IA Gemini.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Détection frais cachés facture InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Frais Cachés Facture — InvoiceAgent', description: "Frais de dossier, surcharges et pénalités cachées détectés automatiquement. Essai gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
