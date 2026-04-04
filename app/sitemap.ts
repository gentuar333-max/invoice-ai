import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = 'https://invoiceagent.fr'
  const pages: [string, number][] = [
    ['', 1.0],
    ['/extraction-facture-pdf', 0.9],
    ['/reconciliation-bancaire-csv', 0.9],
    ['/analyse-contrat-ia', 0.9],
    ['/logiciel-comptabilite-pme', 0.9],
    ['/logiciel-facturation-ia', 0.9],
    ['/tarifs', 0.9],
    ['/facturation-freelance', 0.8],
    ['/facturation-artisan', 0.8],
    ['/facturation-cabinet-comptable', 0.8],
    ['/export-fec-comptable', 0.8],
    ['/tva-automatique-pme', 0.8],
    ['/logiciel-facturation-paris', 0.7],
    ['/logiciel-facturation-lyon', 0.7],
    ['/logiciel-facturation-marseille', 0.7],
    ['/logiciel-facturation-bordeaux', 0.7],
    ['/logiciel-facturation-toulouse', 0.7],
  ]
  return pages.map(([url, priority]) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }))
}