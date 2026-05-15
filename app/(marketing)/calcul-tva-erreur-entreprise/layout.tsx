import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/calcul-tva-erreur-entreprise`

export const metadata: Metadata = {
  title: 'Erreur de Calcul TVA Entreprise — Détecter et Corriger | InvoiceAgent',
  description: "Détectez et corrigez les erreurs de calcul TVA sur vos factures automatiquement. Vérification HT, TVA, TTC en 4 secondes. Évitez les redressements fiscaux.",
  keywords: ['erreur calcul TVA', 'corriger TVA facture', 'vérification TVA automatique', 'redressement TVA PME', 'calcul TVA incorrect facture'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Erreur de Calcul TVA — Détecter et Corriger | InvoiceAgent',
    description: "Vérification automatique HT, TVA, TTC en 4 secondes. Évitez les redressements fiscaux grâce à l'IA.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-tva.png`, width: 1200, height: 630, alt: 'Détection erreurs calcul TVA InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Erreur Calcul TVA — InvoiceAgent', description: "Détectez et corrigez les erreurs de TVA sur vos factures en 4 secondes.", images: [`${BASE_URL}/og-tva.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
