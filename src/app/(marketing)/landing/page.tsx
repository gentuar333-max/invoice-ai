// src/app/(marketing)/landing/page.tsx

import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  metadataBase: new URL('https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app'),
  title: 'AgentFacture AI - Automatisation des Factures & Reconciliation Bancaire | Essai Gratuit',
  description: 'Automatisez vos factures, reconciliation bancaire et analyse de contrats avec l\'IA. Extraction intelligente PDF, import CSV bancaire, détection clauses à risque. Essai gratuit 14 jours.',
  keywords: [
    'logiciel facture IA',
    'automatisation comptable',
    'reconciliation bancaire automatique',
    'extraction facture PDF',
    'analyse contrat IA',
    'Gemini AI facture',
    'CSV bancaire',
    'TVA automatique',
    'SIRET extraction'
  ],
  authors: [{ name: 'AgentFacture' }],
  creator: 'AgentFacture',
  publisher: 'AgentFacture',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/landing',
    siteName: 'AgentFacture AI',
    title: 'AgentFacture AI - Automatisation Intelligente des Factures',
    description: 'Automatisez vos factures et reconciliation bancaire avec l\'IA Gemini. Extraction automatique, CSV bancaire, analyse contrats. 95% de précision.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AgentFacture Dashboard - Automatisation comptable',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentFacture AI - Automatisation des Factures',
    description: 'Automatisez vos factures et reconciliation bancaire avec l\'IA. Essai gratuit 14 jours.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/landing',
  },
}

export default function LandingPage() {
  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'AgentFacture AI',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web, Cloud, SaaS',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
              description: 'Essai gratuit 14 jours',
              url: 'https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '1247',
            },
            featureList: [
              'Extraction intelligente factures PDF',
              'Reconciliation bancaire CSV automatique',
              'Analyse contrats IA',
              'Détection TVA et SIRET',
              'Alertes paiement automatiques',
              'Tableau de bord temps réel'
            ],
            softwareVersion: '2025.1',
            datePublished: '2025-03-27',
            creator: {
              '@type': 'Organization',
              name: 'AgentFacture',
              url: 'https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: "Comment fonctionne l'extraction automatique de factures ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Téléchargez votre PDF ou photo de facture. L'IA Gemini extrait automatiquement le fournisseur, le montant TTC, la TVA, le numéro SIRET et la catégorie. Fini la saisie manuelle avec 95% de précision.",
                },
              },
              {
                '@type': 'Question',
                name: 'Comment marche la reconciliation bancaire ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Importez votre fichier CSV bancaire. L'IA associe automatiquement chaque transaction à la facture correspondante. Visualisez instantanément quelles factures sont payées et lesquelles sont en retard.",
                },
              },
              {
                '@type': 'Question',
                name: "L'analyse de contrats détecte quoi exactement ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "L'IA analyse vos contrats PDF pour identifier les clauses à risque, les tarifs cachés, les dates d'échéance importantes et les pénalités. Soyez alerté avant de signer.",
                },
              },
            ],
          }),
        }}
      />

      <main className="min-h-screen bg-slate-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">AgentFacture</span>
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">AI</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="text-slate-600 hover:text-blue-600">Fonctionnalités</a>
                <a href="#comment-ca-marche" className="text-slate-600 hover:text-blue-600">Comment ça marche</a>
                <a href="#tarifs" className="text-slate-600 hover:text-blue-600">Tarifs</a>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Connexion
                </Link>
                <Link 
                  href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Essai gratuit
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
                  <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                  <span className="text-sm font-medium">Nouveau : Analyse de contrats par IA</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                  Fini la saisie manuelle des{' '}
                  <span className="text-yellow-300">factures</span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  L'IA extrait automatiquement vos factures, reconcilie votre banque CSV 
                  et analyse vos contrats. Gagnez 10 heures par semaine.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
                    className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition text-center shadow-lg"
                  >
                    Commencer gratuitement →
                  </Link>
                  <Link 
                    href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/pricing"
                    className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition text-center"
                  >
                    Voir les tarifs
                  </Link>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-blue-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    Sans carte bancaire
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    14 jours gratuits
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    Annulation facile
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-6 text-slate-800">
                  <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <span className="text-sm text-slate-400">Dashboard AgentFacture</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <div>
                        <p className="text-sm text-slate-600">Montant encaissé ce mois</p>
                        <p className="text-2xl font-bold text-green-700">24 980 €</p>
                      </div>
                      <div className="text-green-600 text-sm">✓ Reconcilié</div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div>
                        <p className="text-sm text-slate-600">En attente de paiement</p>
                        <p className="text-2xl font-bold text-yellow-700">13 720 €</p>
                      </div>
                      <div className="text-yellow-600 text-sm">1 facture</div>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg border border-red-100">
                      <div>
                        <p className="text-sm text-slate-600">TVA à déclarer avant le 20</p>
                        <p className="text-xl font-bold text-red-700">134 €</p>
                      </div>
                      <div className="text-red-600 text-sm">Alerte</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-600">95%</p>
                <p className="text-sm text-slate-600 mt-1">Précision extraction</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">10h</p>
                <p className="text-sm text-slate-600 mt-1">Économisées/semaine</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">2min</p>
                <p className="text-sm text-slate-600 mt-1">Par facture</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">1 200+</p>
                <p className="text-sm text-slate-600 mt-1">Entreprises</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Trois outils intelligents, une seule plateforme
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Finissez avec les tâches manuelles répétitives. L'IA s'occupe de tout.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1: Factures */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Extraction Facture IA
                </h3>
                <p className="text-slate-600 mb-4">
                  Téléchargez PDF ou photo. Gemini AI extrait automatiquement :
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Nom du fournisseur
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Montant TTC & TVA
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Numéro SIRET
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Catégorisation auto
                  </li>
                </ul>
                <Link 
                  href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/invoices"
                  className="inline-flex items-center mt-6 text-blue-600 font-semibold hover:text-blue-700"
                >
                  Importer une facture →
                </Link>
              </div>

              {/* Feature 2: Banque */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Reconciliation Bancaire
                </h3>
                <p className="text-slate-600 mb-4">
                  Importez votre CSV bancaire. L'IA fait le matching automatique :
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Appariement auto
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Factures payées détectées
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Retards identifiés
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Rapport CSV export
                  </li>
                </ul>
                <Link 
                  href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/reconciliation"
                  className="inline-flex items-center mt-6 text-green-600 font-semibold hover:text-green-700"
                >
                  Reconciliation bancaire →
                </Link>
              </div>

              {/* Feature 3: Contrats */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Analyse Contrats IA
                </h3>
                <p className="text-slate-600 mb-4">
                  Téléchargez un contrat PDF. L'IA détecte les risques :
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Clauses à risque
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Tarifs cachés
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Dates importantes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span> Pénalités détectées
                  </li>
                </ul>
                <Link 
                  href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/invoices"
                  className="inline-flex items-center mt-6 text-purple-600 font-semibold hover:text-purple-700"
                >
                  Analyser un contrat →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="comment-ca-marche" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-slate-600">
                Trois étapes simples pour automatiser votre comptabilité
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="relative">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Importez</h3>
                <p className="text-slate-600">
                  Téléchargez vos factures PDF, photos ou votre relevé bancaire CSV. Supporte tous les formats.
                </p>
              </div>
              <div className="relative">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">L'IA analyse</h3>
                <p className="text-slate-600">
                  Gemini AI extrait les données, reconcile la banque et analyse les contrats en quelques secondes.
                </p>
              </div>
              <div className="relative">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Validez</h3>
                <p className="text-slate-600">
                  Consultez votre dashboard avec alertes TVA, factures impayées et reconciliation automatique.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section id="tarifs" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Commencez gratuitement
              </h2>
              <p className="text-lg text-slate-600">
                14 jours d'essai sans engagement. Aucune carte bancaire requise.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Gratuit */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Gratuit</h3>
                <p className="text-slate-600 mb-4">Pour tester la plateforme</p>
                <div className="text-4xl font-bold text-slate-900 mb-6">0€<span className="text-lg font-normal text-slate-500">/mois</span></div>
                <ul className="space-y-3 mb-8 text-slate-600">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 5 factures/mois</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Extraction basique</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Dashboard limité</li>
                </ul>
                <Link 
                  href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
                  className="block w-full text-center py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:border-slate-400"
                >
                  Commencer
                </Link>
              </div>

              {/* Pro */}
              <div className="bg-blue-600 rounded-2xl p-8 text-white relative transform scale-105 shadow-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-blue-900 text-xs font-bold px-4 py-1 rounded-full">
                  PLUS POPULAIRE
                </div>
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-blue-100 mb-4">Pour indépendants</p>
                <div className="text-4xl font-bold mb-6">29€<span className="text-lg font-normal text-blue-200">/mois</span></div>
                <ul className="space-y-3 mb-8 text-blue-100">
                  <li className="flex items-center gap-2"><span>✓</span> Factures illimitées</li>
                  <li className="flex items-center gap-2"><span>✓</span> Reconciliation bancaire</li>
                  <li className="flex items-center gap-2"><span>✓</span> Analyse contrats</li>
                  <li className="flex items-center gap-2"><span>✓</span> Alertes TVA</li>
                </ul>
                <Link 
                  href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/pricing"
                  className="block w-full text-center py-3 rounded-lg bg-white text-blue-600 font-bold hover:bg-blue-50"
                >
                  Essai gratuit 14 jours
                </Link>
              </div>

              {/* Business */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Business</h3>
                <p className="text-slate-600 mb-4">Pour PME et équipes</p>
                <div className="text-4xl font-bold text-slate-900 mb-6">79€<span className="text-lg font-normal text-slate-500">/mois</span></div>
                <ul className="space-y-3 mb-8 text-slate-600">
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Tout le plan Pro</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Multi-utilisateurs</li>
                  <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Support prioritaire</li>
                </ul>
                <Link 
                  href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/pricing"
                  className="block w-full text-center py-3 rounded-lg border-2 border-slate-300 text-slate-700 font-semibold hover:border-slate-400"
                >
                  Contacter les ventes
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Questions fréquentes</h2>
            
            <div className="space-y-4">
              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="font-semibold text-slate-900 flex justify-between items-center">
                  L'IA peut-elle lire tous les formats de factures ?
                  <span className="text-blue-600 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Oui, notre IA Gemini lit les PDF, photos (JPG, PNG), et même les factures par email. Elle extrait automatiquement le fournisseur, le montant, la TVA et le SIRET avec 95% de précision.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="font-semibold text-slate-900 flex justify-between items-center">
                  Comment fonctionne la reconciliation bancaire ?
                  <span className="text-blue-600 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Importez simplement votre fichier CSV bancaire. L'IA associe automatiquement chaque transaction à la facture correspondante. Fini les comparaisons manuelles. Vous voyez instantanément quelles factures sont payées.
                </p>
              </details>

              <details className="group bg-slate-50 rounded-lg p-6 cursor-pointer">
                <summary className="font-semibold text-slate-900 flex justify-between items-center">
                  L'analyse de contrats est-elle sécurisée ?
                  <span className="text-blue-600 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-slate-600">
                  Absolument. Vos contrats sont analysés de manière confidentielle. L'IA détecte les clauses à risque, les tarifs cachés et les dates importantes sans stocker les données sensibles.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Prêt à gagner 10 heures par semaine ?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Rejoignez 1 200+ entreprises qui ont automatise leur comptabilité
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/auth/login"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition"
              >
                Commencer gratuitement →
              </Link>
              <Link 
                href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/pricing"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition"
              >
                Voir les tarifs
              </Link>
            </div>
            <p className="mt-6 text-blue-200 text-sm">
              Essai gratuit de 14 jours • Sans engagement • Annulation facile
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-white font-bold mb-4">AgentFacture</h4>
                <p className="text-sm">Automatisation comptable par IA pour PME et indépendants.</p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Produit</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/invoices" className="hover:text-white">Extraction factures</Link></li>
                  <li><Link href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/reconciliation" className="hover:text-white">Reconciliation bancaire</Link></li>
                  <li><Link href="https://invoice-3yaa6gk8q-gentuar333-9946s-projects.vercel.app/pricing" className="hover:text-white">Tarifs</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Ressources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Centre d'aide</a></li>
                  <li><a href="#" className="hover:text-white">API Documentation</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Légal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Mentions légales</a></li>
                  <li><a href="#" className="hover:text-white">Confidentialité</a></li>
                  <li><a href="#" className="hover:text-white">CGU</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-sm text-center">
              © 2025 AgentFacture. Tous droits réservés.
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}