import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/controle-facture-automatise`

export const metadata: Metadata = {
  title: 'Contrôle de Facture Automatisé par IA | InvoiceAgent',
  description: "Contrôlez automatiquement toutes vos factures fournisseurs : doublons, erreurs TVA, frais cachés. Gagnez 80% du temps de vérification. Essai gratuit.",
  keywords: ['contrôle facture automatisé', 'vérification facture automatique IA', 'audit facture fournisseur', 'contrôle comptable automatique', 'logiciel contrôle facture PME'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Contrôle de Facture Automatisé — InvoiceAgent',
    description: "Doublons, TVA, frais cachés : contrôle automatique de toutes vos factures fournisseurs. Gagnez 80% de temps.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Contrôle facture automatisé InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Contrôle Facture Automatisé — InvoiceAgent', description: "Doublons, TVA incorrecte, frais cachés détectés automatiquement. Essai gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
