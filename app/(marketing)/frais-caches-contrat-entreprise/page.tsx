 
import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/frais-caches-contrat-entreprise`

export const metadata: Metadata = {
  title: 'Frais cachés dans un contrat d\'entreprise : comment les détecter | InvoiceAgent',
  description: "Frais cachés dans vos contrats fournisseurs : comment les identifier avant de signer. Frais d'indexation, pénalités, commissions dissimulées — guide complet.",
  keywords: ['frais caches contrat entreprise', 'frais dissimules contrat fournisseur', 'detecter frais caches contrat', 'couts caches contrat prestation', 'clause financiere abusive contrat'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Frais cachés dans un contrat : comment les détecter', description: "Identifiez les frais cachés dans vos contrats fournisseurs avant de signer. Guide pratique pour entreprises.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment détecter les frais cachés dans un contrat ?", acceptedAnswer: { '@type': 'Answer', text: "Pour détecter les frais cachés dans un contrat, recherchez les clauses d'indexation automatique des prix, les frais d'installation ou de mise en service, les frais de résiliation, les commissions sur volume et les frais de support ou de maintenance non inclus dans le tarif de base." } },
    { '@type': 'Question', name: "Quels sont les frais cachés les plus fréquents dans les contrats B2B ?", acceptedAnswer: { '@type': 'Answer', text: "Les frais cachés les plus fréquents sont : les frais d'indexation annuelle des prix (Syntec, ICC), les frais de résiliation anticipée, les frais de dépassement de volume ou d'utilisation, les frais de support non inclus et les frais de migration ou de sortie de données." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Frais caches contrat entreprise', item: PAGE_URL },
  ],
}

export default function FraisCachesContratPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #1c1917 0%, #78350f 100%)', color: 'white', padding: '80px 20px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px' }}>
              Analyse contrat — Frais caches
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: 1.15 }}>
              Frais caches dans un contrat : <span style={{ color: '#fbbf24' }}>comment les identifier avant de signer</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '620px', margin: '0 auto 36px' }}>
              Les frais caches dans les contrats fournisseurs peuvent representer 20 a 40% du cout total reel. Voici comment les identifier systematiquement avant de vous engager.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Analyser mon contrat gratuitement
            </a>
          </div>
        </section>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 20px 80px' }}>

          {/* FRAIS */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Les 7 types de frais caches les plus frequents
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
              Ces frais sont rarement mentionnes dans le tarif de base mais peuvent representer un surcoût significatif sur la duree du contrat.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { color: '#dc2626', bg: '#fef2f2', border: '#fecaca', type: "Frais d'indexation automatique", desc: "Le prix du contrat est indexe chaque annee sur un indice (Syntec, INSEE, ICC) sans plafond d'augmentation defini. Sur 3 ans, cela peut representer une hausse de 10 a 25% du tarif initial.", detection: "Cherchez les mots : 'indexe', 'revision annuelle', 'Syntec', 'ICC', 'indice' dans les conditions tarifaires." },
                { color: '#d97706', bg: '#fffbeb', border: '#fde68a', type: "Frais de mise en service ou d'installation", desc: "Un frais unique de demarrage non mentionne dans le tarif mensuel. Ce frais peut varier de quelques centaines a plusieurs milliers d'euros selon le prestataire.", detection: "Cherchez : 'frais de mise en service', 'frais d'installation', 'setup fee', 'frais d'onboarding', 'frais d'integration'." },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', type: "Frais de resiliation anticipee", desc: "Une penalite financiere en cas de resiliation avant le terme du contrat. Peut aller jusqu'au paiement de la totalite des mois restants du contrat.", detection: "Cherchez : 'indemnite de resiliation', 'penalite de rupture', 'frais de resiliation', 'engagement minimum'." },
                { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', type: "Frais de depassement de volume", desc: "Au-dela d'un certain volume d'utilisation (nombre de transactions, d'utilisateurs, de donnees), des frais supplementaires s'appliquent automatiquement. Ces seuils sont parfois tres bas.", detection: "Cherchez : 'au-dela de X utilisateurs', 'depassement de quota', 'frais additionnels par unite', 'tarification a l'usage'." },
                { color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', type: "Frais de support non inclus", desc: "Le support technique ou l'assistance client est facture en supplement du tarif de base. Certains prestataires proposent un support 'standard' gratuit mais facturent le support 'prioritaire' ou les interventions specifiques.", detection: "Verifiez si le support est inclus et quel niveau de service est couvert : email seulement ? Telephone ? Temps de reponse garanti ?" },
                { color: '#e11d48', bg: '#fff1f2', border: '#fecdd3', type: "Frais de migration ou de sortie de donnees", desc: "A la fin du contrat, le prestataire facture l'export ou la migration de vos donnees. Ce frais peut rendre la sortie du contrat tres couteuse et creer une situation de dependance.", detection: "Cherchez : 'export de donnees', 'migration', 'frais de portabilite', 'reversibilite'. Exigez un droit de sortie sans frais dans le contrat." },
                { color: '#d97706', bg: '#fffbeb', border: '#fde68a', type: "Commissions sur achats ou transactions", desc: "Le prestataire preleve une commission sur chaque transaction, achat ou paiement realise via sa plateforme. Ce pourcentage peut sembler faible mais represente un cout significatif en volume.", detection: "Cherchez : 'commission de X%', 'frais de transaction', 'pourcentage sur le chiffre d'affaires', 'retrocession'." },
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: item.bg, border: `1px solid ${item.border}`, borderRadius: '14px', padding: '22px 24px', borderLeft: `4px solid ${item.color}` }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{item.type}</h3>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '12px' }}>{item.desc}</p>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '10px 14px' }}>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: item.color, marginBottom: '4px' }}>Comment le detecter</p>
                    <p style={{ fontSize: '13px', color: '#1e293b', margin: 0 }}>{item.detection}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* METHODE */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>
              Methode pour auditer un contrat en 5 minutes
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {[
                { n: '1', color: '#2563eb', title: "Calculez le cout total reel", desc: "Multipliez le tarif mensuel par la duree minimale d'engagement. Ajoutez les frais de mise en service, le support, et les frais de resiliation potentiels. Comparez ce total avec le tarif affiche." },
                { n: '2', color: '#7c3aed', title: "Lisez les annexes tarifaires", desc: "Les frais caches sont souvent dans les annexes ou les conditions generales, pas dans le corps du contrat. Lisez systematiquement tous les documents annexes mentionnes." },
                { n: '3', color: '#059669', title: "Demandez un devis detaille", desc: "Demandez au prestataire un devis listant explicitement tous les frais possibles sur 3 ans : tarif de base, indexations, support, migration. Un prestataire serieux ne refusera pas." },
                { n: '4', color: '#d97706', title: "Utilisez l'IA pour l'analyse", desc: "Importez le PDF du contrat dans InvoiceAgent. L'IA identifie automatiquement les clauses financieres, les frais caches et les conditions a risque en quelques secondes." },
              ].map((step) => (
                <div key={step.n} style={{ backgroundColor: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: step.color, color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>{step.n}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', borderRadius: '20px', padding: '40px 32px', color: 'white', marginBottom: '56px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '12px' }}>Detectez les frais caches avec l'IA</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px' }}>
              InvoiceAgent analyse votre contrat PDF et detecte automatiquement les frais caches, clauses d'indexation et conditions financieres a risque.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Analyser mon contrat gratuitement →
            </a>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>Questions frequentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { q: "Comment détecter les frais cachés dans un contrat ?", r: "Recherchez systematiquement les clauses d'indexation automatique des prix, les frais d'installation ou de mise en service, les frais de resiliation, les commissions sur volume et les frais de support non inclus dans le tarif de base. Lisez toutes les annexes, pas seulement le corps du contrat." },
                { q: "Quels sont les frais cachés les plus fréquents dans les contrats B2B ?", r: "Les frais caches les plus frequents sont : les frais d'indexation annuelle des prix (Syntec, ICC), les frais de resiliation anticipee, les frais de depassement de volume ou d'utilisation, les frais de support non inclus et les frais de migration ou de sortie de donnees." },
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
                { label: 'Risque contrat prestation', href: `${BASE_URL}/risque-contrat-prestation-entreprise` },
                { label: 'Clauses abusives contrat exemple', href: `${BASE_URL}/clauses-abusives-contrat-exemple` },
                { label: 'Analyser contrat fournisseur', href: `${BASE_URL}/comment-analyser-contrat-fournisseur` },
                { label: 'Detection frais caches', href: `${BASE_URL}/detection-frais-caches` },
                { label: 'Verifier contrat avant signature', href: `${BASE_URL}/verifier-contrat-avant-signature` },
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