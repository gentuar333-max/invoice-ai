 
import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/comment-detecter-erreur-facture-pdf`

export const metadata: Metadata = {
  title: 'Comment détecter une erreur sur une facture PDF ? | InvoiceAgent',
  description: "Comment vérifier et détecter les erreurs sur une facture PDF : montant TVA incorrect, SIRET manquant, doublon, date d'échéance erronée. Guide pratique + outil IA.",
  keywords: ['detecter erreur facture pdf', 'verifier facture fournisseur erreur', 'erreur facture TVA', 'facture incorrecte que faire', 'verifier facture automatiquement'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Détecter une erreur sur une facture PDF — Guide pratique', description: "Vérifiez automatiquement vos factures PDF pour détecter les erreurs de TVA, SIRET, doublons et montants.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment détecter une erreur sur une facture PDF ?", acceptedAnswer: { '@type': 'Answer', text: "Pour détecter les erreurs sur une facture PDF, vérifiez : la cohérence des montants HT + TVA = TTC, la validité du SIRET (14 chiffres), le numéro de TVA intracommunautaire, la date d'échéance par rapport aux conditions de paiement, et comparez avec les factures précédentes du même fournisseur pour détecter les doublons." } },
    { '@type': 'Question', name: "Quelles sont les erreurs les plus fréquentes sur une facture ?", acceptedAnswer: { '@type': 'Answer', text: "Les erreurs les plus fréquentes sur les factures sont : le mauvais taux de TVA appliqué, le SIRET manquant ou incorrect, la date d'échéance incohérente avec les conditions de paiement, un doublon de facture déjà reçue, et des montants HT/TTC qui ne correspondent pas." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Detecter erreur facture PDF', item: PAGE_URL },
  ],
}

export default function CommentDetecterErreurFacturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)', color: 'white', padding: '80px 20px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px' }}>
              Verification factures — Guide pratique
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: 1.15 }}>
              Comment detecter une erreur sur une facture PDF
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '620px', margin: '0 auto 36px' }}>
              5% des factures reçues contiennent une erreur selon l'AICPA. Voici comment les identifier rapidement — manuellement ou avec une IA — avant de payer.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#38bdf8', color: '#0c4a6e', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Verifier mes factures automatiquement
            </a>
          </div>
        </section>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 20px 80px' }}>

          {/* ERREURS */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Les 6 erreurs les plus frequentes sur une facture
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
              Ces erreurs representent la majorite des anomalies detectees sur les factures fournisseurs françaises. Verifiez-les systematiquement avant tout paiement.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', erreur: "Taux de TVA incorrect", detail: "Le mauvais taux de TVA est applique — 20% a la place de 10%, ou TVA appliquee sur une prestation exoneree. Cette erreur a des consequences fiscales directes sur votre declaration TVA.", comment: "Verifiez que le taux correspond au type de prestation : 20% pour les services standard, 10% pour la restauration et les travaux, 5.5% pour les produits alimentaires et l'energie." },
                { color: '#d97706', bg: '#fffbeb', border: '#fde68a', erreur: "Incoherence HT + TVA ≠ TTC", detail: "Le total TTC ne correspond pas a la somme du montant HT et de la TVA calculee. Cette erreur arithmetique peut provenir d'un arrondi incorrect ou d'une saisie manuelle erronee.", comment: "Calculez vous-meme : Montant HT × (1 + taux TVA) = TTC. Un ecart de plus de 0,02€ signale une erreur a signaler au fournisseur." },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', erreur: "SIRET manquant ou invalide", detail: "Le numero SIRET du fournisseur est absent, incomplet (moins de 14 chiffres) ou invalide. Sans SIRET valide, la facture ne peut pas etre acceptee comme justificatif comptable.", comment: "Verifiez le SIRET sur le site officiel de l'INSEE (sirene.fr). Un SIRET valide comporte exactement 14 chiffres et correspond a un etablissement actif." },
                { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', erreur: "Doublon — facture deja reçue", detail: "Le meme fournisseur envoie deux fois la meme facture avec le meme numero et le meme montant, ou avec un numero different mais un contenu identique. Le risque est de payer deux fois la meme prestation.", comment: "Comparez le numero de facture, le fournisseur et le montant avec vos factures precedentes. Un bon logiciel de facturation detecte automatiquement les doublons." },
                { color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', erreur: "Date d'echeance incoherente", detail: "La date d'echeance ne correspond pas aux conditions de paiement convenues dans le contrat. Par exemple, 30 jours nets a compter de la date de facture mais l'echeance est fixee a J+15.", comment: "Verifiez que l'echeance = date de facture + delai de paiement contractuel. Les delais legaux maximums sont de 30 jours (article L.441-10 du Code de Commerce), sauf accord contraire." },
                { color: '#e11d48', bg: '#fff1f2', border: '#fecdd3', erreur: "Prestations non commandees", detail: "La facture inclut des lignes de prestation qui n'ont pas ete commandees ou livrees. Cette erreur peut etre involontaire (mauvais client) ou intentionnelle.", comment: "Comparez chaque ligne de la facture avec le bon de commande ou le devis correspondant. Refusez le paiement des lignes non validees et demandez une facture rectificative." },
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: item.bg, border: `1px solid ${item.border}`, borderRadius: '14px', padding: '22px 24px', borderLeft: `4px solid ${item.color}` }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{item.erreur}</h3>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '12px' }}>{item.detail}</p>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '10px 14px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: item.color, marginBottom: '4px' }}>Comment verifier</p>
                    <p style={{ fontSize: '13px', color: '#1e293b', margin: 0, lineHeight: 1.5 }}>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 100%)', borderRadius: '20px', padding: '40px 32px', color: 'white', marginBottom: '56px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '12px' }}>Verifiez vos factures automatiquement</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px' }}>
              InvoiceAgent extrait et verifie automatiquement chaque facture PDF : TVA, SIRET, coherence des montants et detection des doublons.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#38bdf8', color: '#0c4a6e', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Tester gratuitement →
            </a>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>Questions frequentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { q: "Comment détecter une erreur sur une facture PDF ?", r: "Verifiez la coherence des montants HT + TVA = TTC, la validite du SIRET (14 chiffres), la date d'echeance par rapport aux conditions de paiement, et comparez avec les factures precedentes du meme fournisseur pour detecter les doublons. Un outil IA peut effectuer ces verifications automatiquement en quelques secondes." },
                { q: "Quelles sont les erreurs les plus fréquentes sur une facture ?", r: "Les erreurs les plus frequentes sont : le mauvais taux de TVA applique, le SIRET manquant ou incorrect, la date d'echeance incoherente avec les conditions de paiement, un doublon de facture deja reçue, et des montants HT/TTC qui ne correspondent pas." },
              ].map((faq, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '22px 24px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
                  <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{faq.r}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INTERNAL LINKS */}
          <section style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>Ressources connexes</h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Outil analyse facture automatique', href: `${BASE_URL}/outil-analyse-facture-automatique` },
                { label: 'Erreurs facture frequentes PME', href: `${BASE_URL}/erreurs-facture-frequentes-pme` },
                { label: 'Verifier facture fournisseur', href: `${BASE_URL}/comment-verifier-facture-fournisseur` },
                { label: 'Doublon facture que faire', href: `${BASE_URL}/doublon-facture-que-faire` },
                { label: 'Controle facture automatise', href: `${BASE_URL}/controle-facture-automatise` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 18px', fontSize: '14px', color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>
                  {link.label} →
                </a>
              ))}
            </div>
          </section>

        </div>
      </main>
      <SharedFooter />
    </>
  )
}