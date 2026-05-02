 
import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/risque-contrat-prestation-entreprise`

export const metadata: Metadata = {
  title: 'Risques contrat de prestation : comment les identifier avant de signer | InvoiceAgent',
  description: "Quels sont les risques d'un contrat de prestation de services ? Clauses abusives, pénalités cachées, reconduction tacite — comment les détecter avant de signer.",
  keywords: ['risque contrat prestation', 'clause abusive contrat prestation services', 'analyser contrat prestation entreprise', 'risques contrat fournisseur', 'contrat prestation dangereux'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Risques contrat de prestation : guide pour entreprises', description: "Identifiez les clauses dangereuses dans vos contrats de prestation avant de signer. Guide pratique.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Quels sont les risques d'un contrat de prestation ?", acceptedAnswer: { '@type': 'Answer', text: "Les principaux risques d'un contrat de prestation sont : les clauses de reconduction tacite (engagement automatique), les pénalités de résiliation disproportionnées, les clauses d'exclusivité abusives, les modifications unilatérales de tarif et les clauses de responsabilité déséquilibrées." } },
    { '@type': 'Question', name: "Comment analyser un contrat de prestation avant de signer ?", acceptedAnswer: { '@type': 'Answer', text: "Concentrez-vous sur cinq points clés : la durée et les conditions de résiliation, les modalités de révision des prix, les pénalités et indemnités, les clauses de responsabilité et les obligations de confidentialité. Une IA peut analyser ces points en quelques secondes." } },
    { '@type': 'Question', name: "Qu'est-ce qu'une clause abusive dans un contrat B2B ?", acceptedAnswer: { '@type': 'Answer', text: "En droit français, une clause abusive dans un contrat B2B est une clause qui crée un déséquilibre significatif entre les droits et obligations des parties (article L.442-1 du Code de Commerce). Contrairement aux contrats consommateurs, les clauses abusives B2B sont sanctionnées uniquement si elles créent un déséquilibre significatif." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Risque contrat prestation entreprise', item: PAGE_URL },
  ],
}

export default function RisqueContratPrestationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)', color: 'white', padding: '80px 20px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px' }}>
              Analyse contrat — Guide pratique
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: 1.15 }}>
              Risques d'un contrat de prestation : <span style={{ color: '#c4b5fd' }}>ce qu'il faut verifier avant de signer</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '620px', margin: '0 auto 36px' }}>
              Un contrat de prestation mal negicie peut engager votre entreprise pendant des annees. Voici les clauses a risque les plus frequentes et comment les identifier rapidement.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#c4b5fd', color: '#1e1b4b', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Analyser mon contrat gratuitement
            </a>
          </div>
        </section>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 20px 80px' }}>

          {/* RISQUES */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Les 6 risques majeurs d'un contrat de prestation
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
              Ces six types de clauses representent la grande majorite des litiges contractuels entre entreprises françaises. Identifiez-les avant de signer.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  n: '01', color: '#dc2626', bg: '#fef2f2', border: '#fecaca',
                  risque: "Reconduction tacite sans preavis court",
                  detail: "Le contrat se renouvelle automatiquement pour une duree identique si vous ne resiliez pas dans un delai precis avant l'echeance. Ce delai peut etre de 3 mois ou plus, ce qui oblige votre entreprise a anticiper tres tot la decision de resiliation.",
                  exemple: "Le present contrat est conclu pour une duree d'un an et se renouvelle tacitement par periodes successives d'un an, sauf denonciation par lettre recommandee avec AR au moins 90 jours avant l'echeance.",
                  action: "Verifiez le delai de preavis et mettez une alerte dans votre agenda 3 mois avant l'echeance du contrat.",
                },
                {
                  n: '02', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
                  risque: "Penalites de resiliation disproportionnees",
                  detail: "Certains contrats imposent des indemnites de resiliation equivalentes au total des mois restants du contrat. Si vous resiliez un contrat annuel au 3eme mois, vous pouvez devoir payer les 9 mois restants.",
                  exemple: "En cas de resiliation anticipee par le client, celui-ci s'engage a regler l'integralite des sommes dues jusqu'au terme prevu du contrat, a titre d'indemnite forfaitaire.",
                  action: "Negociez une clause de resiliation avec preavis de 1 a 3 mois maximum et sans indemnite forfaitaire, ou avec une indemnite plafonnee a 2-3 mois.",
                },
                {
                  n: '03', color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe',
                  risque: "Revision unilaterale des tarifs",
                  detail: "Le prestataire se reserve le droit d'augmenter ses tarifs sans accord du client, souvent sous condition d'un simple preavis. Cette clause peut rendre le budget impredictible sur la duree du contrat.",
                  exemple: "Le prestataire se reserve le droit de modifier ses tarifs avec un preavis de 30 jours. Le client peut resilier le contrat dans ce delai s'il refuse les nouveaux tarifs.",
                  action: "Encadrez les revisions de prix en imposant un plafond d'augmentation annuelle (ex: indexation sur l'indice syntec plafonnee a 3%).",
                },
                {
                  n: '04', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
                  risque: "Clause d'exclusivite abusive",
                  detail: "Le contrat vous interdit de faire appel a d'autres prestataires pour des services similaires pendant toute la duree du contrat. Cette clause peut bloquer votre entreprise si la qualite de service se degrade.",
                  exemple: "Le client s'engage a confier exclusivement au prestataire l'ensemble des missions entrant dans le perimetre du present contrat pendant sa duree.",
                  action: "Refusez toute clause d'exclusivite ou limitez-la a un perimetre precis et bien defini. Negociez une clause de sortie si la qualite de service ne respecte pas les SLA.",
                },
                {
                  n: '05', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc',
                  risque: "Limitation excessive de responsabilite",
                  detail: "Le prestataire plafonne sa responsabilite a un montant inferieur aux dommages reels qu'il pourrait causer. Dans certains contrats SaaS ou IT, la responsabilite est limitee au montant paye sur les 3 derniers mois.",
                  exemple: "La responsabilite totale du prestataire ne pourra en aucun cas exceder le montant des sommes effectivement percues au cours des 3 derniers mois precedant le sinistre.",
                  action: "Negociez un plafond de responsabilite adapte aux risques reels (au minimum 12 mois de facturation) et exigez une couverture assurance professionnelle.",
                },
                {
                  n: '06', color: '#e11d48', bg: '#fff1f2', border: '#fecdd3',
                  risque: "Propriete intellectuelle mal definie",
                  detail: "Le contrat ne precise pas clairement qui detient les droits sur les livrables produits. Sans clause explicite, la legislation française attribue par defaut les droits au createur — pas au client qui a commande la prestation.",
                  exemple: "Absence totale de clause sur la propriete intellectuelle dans un contrat de developpement logiciel ou de creation graphique.",
                  action: "Inserez une clause explicite de cession de droits de propriete intellectuelle couvrant tous les livrables produits dans le cadre du contrat.",
                },
              ].map((item) => (
                <div key={item.n} style={{ backgroundColor: item.bg, border: `1px solid ${item.border}`, borderRadius: '16px', padding: '28px', borderLeft: `4px solid ${item.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ width: '36px', height: '36px', backgroundColor: item.color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.3 }}>{item.risque}</h3>
                  </div>
                  <div style={{ marginLeft: '52px' }}>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '12px' }}>{item.detail}</p>
                    <div style={{ backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '8px', padding: '10px 14px', marginBottom: '12px', fontFamily: 'monospace', fontSize: '13px', color: '#475569', fontStyle: 'italic', borderLeft: `3px solid ${item.color}` }}>
                      Exemple : {item.exemple}
                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '10px', padding: '12px 14px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#059669', marginBottom: '4px' }}>Action recommandee</p>
                      <p style={{ fontSize: '13px', color: '#1e293b', margin: 0, lineHeight: 1.5 }}>{item.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)', borderRadius: '20px', padding: '40px 32px', color: 'white', marginBottom: '56px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '12px' }}>Analysez votre contrat avec l'IA</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px' }}>
              InvoiceAgent analyse votre contrat PDF et identifie les clauses a risque, frais caches et dates de reconduction en quelques secondes.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['Clauses a risque Haut/Moyen/Faible', 'Frais caches detectes', 'Dates cles extraites', 'Gratuit jusqu\'a 1 contrat'].map((f) => (
                <span key={f} style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)', fontSize: '12px', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>{f}</span>
              ))}
            </div>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#c4b5fd', color: '#1e1b4b', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Analyser mon contrat gratuitement →
            </a>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>Questions frequentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { q: "Quels sont les risques d'un contrat de prestation ?", r: "Les principaux risques sont les clauses de reconduction tacite avec long preavis, les penalites de resiliation disproportionnees, les revisions unilaterales de tarif, les clauses d'exclusivite abusives, les limitations excessives de responsabilite et l'absence de clause sur la propriete intellectuelle des livrables." },
                { q: "Comment analyser un contrat de prestation avant de signer ?", r: "Concentrez-vous sur cinq points cles : la duree et les conditions de resiliation, les modalites de revision des prix, les penalites et indemnites, les clauses de responsabilite et les obligations de confidentialite. Une IA peut analyser ces points en quelques secondes a partir du PDF du contrat." },
                { q: "Qu'est-ce qu'une clause abusive dans un contrat B2B ?", r: "En droit français, une clause abusive dans un contrat B2B est une clause qui cree un desequilibre significatif entre les droits et obligations des parties (article L.442-1 du Code de Commerce). Contrairement aux contrats consommateurs, les clauses abusives B2B sont sanctionnees uniquement si elles creent un desequilibre significatif." },
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
                { label: 'Frais caches contrat entreprise', href: `${BASE_URL}/frais-caches-contrat-entreprise` },
                { label: 'Clauses abusives contrat exemple', href: `${BASE_URL}/clauses-abusives-contrat-exemple` },
                { label: 'Analyser contrat fournisseur', href: `${BASE_URL}/comment-analyser-contrat-fournisseur` },
                { label: 'Verifier contrat avant signature', href: `${BASE_URL}/verifier-contrat-avant-signature` },
                { label: 'Analyse contrat prestation', href: `${BASE_URL}/analyse-contrat-prestation` },
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