import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-avocat`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Avocat — Honoraires et Débours | InvoiceAgent',
  description: "Gérez vos factures d'honoraires et débours automatiquement. TVA sur services juridiques, export FEC cabinet d'avocats. Essai gratuit sans carte bancaire.",
  keywords: ['facturation avocat', 'honoraires avocat TVA', 'débours facture avocat', 'logiciel comptable cabinet avocat', 'export FEC cabinet juridique'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Avocat — Honoraires et Débours | InvoiceAgent',
    description: "Gérez vos factures d'honoraires et débours automatiquement. TVA sur services juridiques, export FEC cabinet d'avocats. Essai gratuit sans carte bancaire.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation avocat InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Avocat — Honoraires et Débours | InvoiceAgent', description: "Gérez vos factures d'honoraires et débours automatiquement. TVA sur services juridiques, export FEC cabinet d'avocats. Essai gratuit sans carte bancaire.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
