import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/perte-argent-facture-entreprise`

export const metadata: Metadata = {
  title: "Combien Perdez-Vous à Cause de Vos Factures ? | InvoiceAgent",
  description: "Les PME perdent en moyenne 3% de leur CA à cause d'erreurs de facturation. Calculez vos pertes et automatisez le contrôle avec InvoiceAgent. Essai gratuit.",
  keywords: ["pertes facturation entreprise", "erreur facture coût PME", "argent perdu facture fournisseur", "impact financier erreur facture", "calculer pertes comptables"],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Combien Perdez-Vous à Cause de Vos Factures ? — InvoiceAgent",
    description: "3% du CA perdu en moyenne. Calculez vos pertes et automatisez le contrôle de vos factures avec InvoiceAgent.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: "Pertes argent factures entreprise InvoiceAgent" }],
  },
  twitter: { card: 'summary_large_image', title: "Pertes Factures Entreprise — InvoiceAgent", description: "Les PME perdent 3% de leur CA en erreurs de facturation. Calculez et corrigez automatiquement.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
