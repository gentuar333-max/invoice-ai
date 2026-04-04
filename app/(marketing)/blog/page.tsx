import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'

export const metadata: Metadata = {
  title: 'Blog InvoiceAgent — Guides Comptabilité et Facturation PME',
  description: 'Guides pratiques sur la facturation automatique, le FEC comptable, la réconciliation bancaire et la TVA pour PME et freelances français.',
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: { title: 'Blog InvoiceAgent', description: 'Guides comptabilité et facturation pour PME françaises.', url: `${BASE_URL}/blog`, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website' },
  robots: { index: true, follow: true },
}

const articles = [
  { slug: 'automatiser-facturation-pme-2026', title: 'Comment automatiser sa facturation en 2026 : guide complet pour PME', excerpt: "L'automatisation de la facturation permet aux PME françaises d'économiser jusqu'à 80% du temps consacré à la comptabilité. Découvrez comment mettre en place un système automatisé étape par étape.", date: '28 mars 2026', readTime: '8 min', category: 'Facturation', color: '#6366f1' },
  { slug: 'fec-comptable-guide-pme', title: 'FEC comptable : guide complet pour PME françaises en 2026', excerpt: "Le Fichier des Écritures Comptables (FEC) est obligatoire pour toutes les entreprises tenant une comptabilité informatisée. Ce guide explique tout ce que vous devez savoir.", date: '25 mars 2026', readTime: '10 min', category: 'Comptabilité', color: '#059669' },
  { slug: 'reconciliation-bancaire-csv-guide', title: 'Réconciliation bancaire CSV : tout ce qu\'il faut savoir', excerpt: "La réconciliation bancaire est l'une des tâches les plus chronophages de la comptabilité PME. Découvrez comment l'automatiser avec un simple fichier CSV.", date: '22 mars 2026', readTime: '7 min', category: 'Banque', color: '#2563eb' },
  { slug: 'tva-freelances-guide-2026', title: 'TVA pour freelances et auto-entrepreneurs : guide pratique 2026', excerpt: "TVA collectée, TVA déductible, franchise de base, taux réduits — la TVA est souvent source de confusion pour les freelances français. Ce guide complet clarifie tout.", date: '19 mars 2026', readTime: '9 min', category: 'TVA', color: '#d97706' },
  { slug: 'ocr-factures-comment-ca-marche', title: 'OCR factures : comment fonctionne l\'extraction automatique par IA', excerpt: "L'OCR (Optical Character Recognition) appliqué aux factures permet d'extraire automatiquement toutes les données comptables d'un PDF en quelques secondes. Explications.", date: '15 mars 2026', readTime: '6 min', category: 'Technologie', color: '#7c3aed' },
]

export default function BlogPage() {
  return (
    <>
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ backgroundColor: 'white', padding: '80px 20px 60px', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace', color: '#64748b' }}>
              Guides · Tutoriels · Actualités
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px', lineHeight: 1.1 }}>
              Blog InvoiceAgent
            </h1>
            <p style={{ fontSize: '18px', color: '#64748b' }}>
              Guides pratiques sur la facturation, la comptabilité et la TVA pour PME et freelances français.
            </p>
          </div>
        </section>

        {/* ARTICLES */}
        <section style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {articles.map((article) => (
              <a key={article.slug} href={`${BASE_URL}/blog/${article.slug}`} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'block', transition: 'box-shadow 0.2s' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ backgroundColor: `${article.color}15`, color: article.color, fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '20px' }}>{article.category}</span>
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>{article.date}</span>
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>· {article.readTime} de lecture</span>
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '12px', lineHeight: 1.4 }}>{article.title}</h2>
                <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.7, marginBottom: '16px' }}>{article.excerpt}</p>
                <span style={{ color: article.color, fontSize: '14px', fontWeight: 600 }}>Lire l'article →</span>
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '0 20px 80px', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', borderRadius: '16px', padding: '48px', textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>Testez InvoiceAgent gratuitement</h2>
            <p style={{ opacity: 0.8, marginBottom: '28px', fontSize: '16px' }}>5 factures gratuites — sans carte bancaire.</p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '14px 32px', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>Commencer gratuitement</a>
          </div>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}