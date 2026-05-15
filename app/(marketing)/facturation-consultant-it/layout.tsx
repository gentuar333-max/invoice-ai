import type { Metadata } from 'next'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-consultant-it`

export const metadata: Metadata = {
  title: 'Logiciel Facturation Consultant IT | InvoiceAgent',
  description: "Gérez vos factures de prestations IT, licences et sous-traitance. Extraction PDF, détection TVA, export FEC. Idéal ESN et consultants indépendants. Gratuit.",
  keywords: ['facturation consultant IT', 'logiciel facturation ESN', 'facture prestation informatique', 'export FEC consultant IT', 'TVA prestation IT'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Logiciel Facturation Consultant IT | InvoiceAgent',
    description: "Gérez vos factures de prestations IT, licences et sous-traitance. Extraction PDF, détection TVA, export FEC. Idéal ESN et consultants indépendants. Gratuit.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-extraction-pdf.png`, width: 1200, height: 630, alt: 'Logiciel facturation consultant IT InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'Logiciel Facturation Consultant IT | InvoiceAgent', description: "Gérez vos factures de prestations IT, licences et sous-traitance. Extraction PDF, détection TVA, export FEC. Idéal ESN et consultants indépendants. Gratuit.", images: [`${BASE_URL}/og-extraction-pdf.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
