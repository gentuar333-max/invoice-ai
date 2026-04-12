import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = 'https://invoiceagent.fr'
  const pages: [string, number][] = [
    // Core
    ['', 1.0],
    ['/tarifs', 0.9],

    // Features principales
    ['/extraction-facture-pdf', 0.9],
    ['/reconciliation-bancaire-csv', 0.9],
    ['/analyse-contrat-ia', 0.9],
    ['/logiciel-comptabilite-pme', 0.9],
    ['/logiciel-facturation-ia', 0.9],
    ['/export-fec-comptable', 0.9],
    ['/tva-automatique-pme', 0.9],

    // Detection & analyse contrats
    ['/detection-clauses-abusives', 0.9],
    ['/detection-frais-caches', 0.9],
    ['/detection-doublons-factures', 0.9],
    ['/verifier-contrat-avant-signature', 0.9],
    ['/analyse-contrat-prestation', 0.9],
    ['/extraction-donnees-facture', 0.9],
    ['/ocr-factures-pdf', 0.9],

    // SEO batch — TVA
    ['/erreur-tva-facture-comment-corriger', 0.9],
    ['/logiciel-tva-automatique-pme', 0.9],
    ['/calcul-tva-erreur-entreprise', 0.9],

    // SEO batch — Erreurs factures
    ['/erreurs-facture-frequentes-pme', 0.9],
    ['/comment-verifier-facture-fournisseur', 0.9],
    ['/doublon-facture-que-faire', 0.9],
    ['/controle-facture-automatise', 0.9],

    // SEO batch — Contrats
    ['/clauses-abusives-contrat-exemple', 0.9],
    ['/comment-analyser-contrat-fournisseur', 0.9],
    ['/risque-contrat-prestation-entreprise', 0.9],
    ['/frais-caches-contrat-entreprise', 0.9],

    // SEO batch — Rapprochement bancaire
    ['/rapprochement-bancaire-erreur', 0.9],
    ['/logiciel-rapprochement-bancaire-automatique', 0.9],
    ['/ecart-rapprochement-bancaire-solution', 0.9],

    // SEO batch — Long-tail
    ['/comment-detecter-erreur-facture-pdf', 0.8],
    ['/outil-analyse-facture-automatique', 0.8],
    ['/scanner-facture-detecter-erreurs', 0.8],

    // Secteurs freelance & PME
    ['/facturation-freelance', 0.8],
    ['/facturation-artisan', 0.8],
    ['/facturation-micro-entreprise', 0.8],
    ['/facturation-auto-entrepreneur', 0.8],
    ['/facturation-btp-construction', 0.8],
    ['/facturation-restaurant', 0.8],

    // Secteurs professionnels
    ['/facturation-avocat', 0.8],
    ['/facturation-architecte', 0.8],
    ['/facturation-coach', 0.8],
    ['/facturation-consultant-it', 0.8],
    ['/facturation-photographe', 0.8],
    ['/facturation-traducteur', 0.8],
    ['/facturation-agence-immobiliere', 0.8],
    ['/facturation-cabinet-comptable', 0.8],
    ['/facturation-cabinet-medical', 0.8],
    ['/facturation-agence-communication', 0.8],

    // Secteurs BTP
    ['/facturation-electricien', 0.8],
    ['/facturation-plombier', 0.8],
    ['/facturation-menuisier', 0.8],
    ['/facturation-peintre', 0.8],
    ['/facturation-carreleur', 0.8],
    ['/facturation-macon', 0.8],

    // Villes grandes
    ['/logiciel-facturation-paris', 0.7],
    ['/logiciel-facturation-lyon', 0.7],
    ['/logiciel-facturation-marseille', 0.7],
    ['/logiciel-facturation-bordeaux', 0.7],
    ['/logiciel-facturation-toulouse', 0.7],

    // Villes moyennes
    ['/logiciel-facturation-nantes', 0.7],
    ['/logiciel-facturation-lille', 0.7],
    ['/logiciel-facturation-strasbourg', 0.7],
    ['/logiciel-facturation-nice', 0.7],
    ['/logiciel-facturation-rennes', 0.7],
    ['/logiciel-facturation-grenoble', 0.7],
    ['/logiciel-facturation-montpellier', 0.7],
    ['/logiciel-facturation-tours', 0.7],
    ['/logiciel-facturation-reims', 0.7],
    ['/logiciel-facturation-le-havre', 0.7],
    ['/logiciel-facturation-saint-etienne', 0.7],
    ['/logiciel-facturation-toulon', 0.7],
    ['/logiciel-facturation-angers', 0.7],
    ['/logiciel-facturation-dijon', 0.7],
    ['/logiciel-facturation-nimes', 0.7],

    // Blog
    ['/blog/fec-comptable-guide-pme', 0.6],
    ['/blog/reconciliation-bancaire-csv-guide', 0.6],
    ['/blog/tva-freelances-guide-2026', 0.6],
    ['/blog/ocr-factures-comment-ca-marche', 0.6],

    // Legal
    ['/mentions-legales', 0.3],
    ['/cgu', 0.3],
    ['/confidentialite', 0.3],
  ]

  return pages.map(([url, priority]) => ({
    url: `${BASE}${url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }))
}