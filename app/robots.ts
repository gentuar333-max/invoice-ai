import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/', '/invoices/', '/reconciliation/', '/auth/'],
    },
    sitemap: 'https://invoiceagent.fr/sitemap.xml',
  }
}