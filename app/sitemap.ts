import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://invoiceagent.fr', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://invoiceagent.fr/extraction-facture-pdf', changeFrequency: 'monthly', priority: 0.9 },
    // ... të gjitha faqet
  ]
}