 
import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/ecart-rapprochement-bancaire-solution`

export const metadata: Metadata = {
  title: 'Écart rapprochement bancaire : comment le résoudre ? | InvoiceAgent',
  description: "Vous avez un écart dans votre rapprochement bancaire ? Découvrez les causes les plus fréquentes et les solutions pour corriger chaque type d'écart rapidement.",
  keywords: ['écart rapprochement bancaire', 'solde bancaire différent comptabilité', 'écart réconciliation bancaire', 'différence rapprochement bancaire', 'résoudre écart bancaire PME'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Écart rapprochement bancaire : solutions pratiques', description: "Comment identifier et corriger un écart de rapprochement bancaire. Guide pour PME françaises.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Pourquoi y a-t-il un écart dans mon rapprochement bancaire ?", acceptedAnswer: { '@type': 'Answer', text: "Les écarts de rapprochement bancaire ont quatre causes principales : une transaction enregistrée deux fois (doublon), une facture enregistrée mais pas encore encaissée, des frais bancaires non comptabilisés, ou une erreur de saisie de montant." } },
    { '@type': 'Question', name: "Comment trouver l'origine d'un écart de rapprochement ?", acceptedAnswer: { '@type': 'Answer', text: "Commencez par vérifier si l'écart correspond à un montant précis dans vos transactions non rapprochées. Si l'écart est exactement le double d'une transaction, c'est probablement un doublon. Si l'écart correspond à des frais bancaires, vérifiez les commissions de votre banque." } },
    { '@type': 'Question', name: "Que faire si l'écart est impossible à identifier ?", acceptedAnswer: { '@type': 'Answer', text: "Si vous ne trouvez pas l'origine de l'écart après vérification, créez une écriture d'ajustement temporaire en notant clairement qu'elle est à justifier. Contactez votre expert-comptable pour valider l'écriture et identifier la cause lors de la clôture." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Écart rapprochement bancaire', item: PAGE_URL },
  ],
}

export default function EcartRapprochementBancairePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: 'white', padding: '80px 20px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px' }}>
              Rapprochement bancaire — Resolution d'ecarts
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: 1.15 }}>
              Écart de rapprochement bancaire : <span style={{ color: '#a5b4fc' }}>comment l'identifier et le corriger</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '620px', margin: '0 auto 36px' }}>
              Un ecart entre votre solde bancaire et votre comptabilite est toujours explicable. Voici comment identifier la cause et corriger chaque type d'ecart methodiquement.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#818cf8', color: '#1e1b4b', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Tester la reconciliation automatique
            </a>
          </div>
        </section>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 20px 80px' }}>

          {/* CAUSES */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Les 4 causes d'un écart de rapprochement bancaire
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
              Dans la grande majorite des cas, un ecart de rapprochement bancaire appartient a l'une de ces quatre categories. Chacune a une solution directe.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  n: '01', color: '#dc2626', bg: '#fef2f2', border: '#fecaca',
                  cause: "Transaction enregistrée en double",
                  signe: "L'écart correspond exactement au double d'une transaction de la periode.",
                  detail: "Un doublon se produit lorsqu'une facture est saisie deux fois dans la comptabilite, ou lorsque deux CSV bancaires couvrant des periodes qui se chevauchent sont importes. Le solde comptable est superieur au solde bancaire du montant de la transaction en double.",
                  solution: "Recherchez dans vos ecritures comptables la transaction dont le montant est egal a la moitie de l'ecart. Supprimez l'ecriture en double apres verification. Dans InvoiceAgent, la detection de doublons est automatique lors de l'import CSV.",
                },
                {
                  n: '02', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
                  cause: "Facture encaissée mais non enregistrée",
                  signe: "Le solde bancaire est superieur au solde comptable.",
                  detail: "Un paiement a ete recu sur le compte bancaire mais la facture correspondante n'a pas encore ete saisie dans la comptabilite. Cela se produit souvent en fin de mois quand des virements arrivent apres la cloture des ecritures.",
                  solution: "Identifiez la transaction bancaire non rapprochee et creez l'ecriture comptable correspondante. Si la facture n'a pas ete emise, contactez le client pour obtenir la reference du virement et emettez la facture retroactivement.",
                },
                {
                  n: '03', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
                  cause: "Frais bancaires non comptabilisés",
                  signe: "L'ecart est faible (generalement inferieur a 50€) et correspond a des periodes de prelevements bancaires.",
                  detail: "Les frais de tenue de compte, commissions de virement, cotisations de carte professionnelle et autres charges bancaires sont debites automatiquement. Si ces charges ne sont pas comptabilisees comme depenses, le solde comptable sera superieur au solde bancaire.",
                  solution: "Verifiez votre releve bancaire pour identifier les lignes 'Frais' ou 'Commission'. Creez une ecriture de charge pour chaque frais bancaire non comptabilise. Configurez un rappel mensuel pour saisir systematiquement ces frais.",
                },
                {
                  n: '04', color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe',
                  cause: "Erreur de saisie de montant",
                  signe: "L'ecart ne correspond a aucune transaction identifiable et n'est pas un multiple d'une transaction connue.",
                  detail: "Une erreur de frappe lors de la saisie manuelle d'un montant genere un ecart souvent difficile a identifier car il ne correspond a aucune transaction specifique. Par exemple, saisir 1 290€ au lieu de 1 920€ genere un ecart de 630€.",
                  solution: "Comparez systematiquement les montants de vos ecritures comptables avec les transactions bancaires correspondantes. Recherchez en priorite les ecritures saisies manuellement sur la periode concernee. Corrigez l'ecriture erronee apres identification.",
                },
              ].map((item) => (
                <div key={item.n} style={{ backgroundColor: item.bg, border: `1px solid ${item.border}`, borderRadius: '16px', padding: '28px', borderLeft: `4px solid ${item.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ width: '36px', height: '36px', backgroundColor: item.color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: '0 0 6px' }}>{item.cause}</h3>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: item.color, margin: 0, fontStyle: 'italic' }}>Signe caracteristique : {item.signe}</p>
                    </div>
                  </div>
                  <div style={{ marginLeft: '52px' }}>
                    <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, marginBottom: '12px' }}>{item.detail}</p>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '10px', padding: '14px 16px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#059669', marginBottom: '6px' }}>Solution</p>
                      <p style={{ fontSize: '14px', color: '#1e293b', lineHeight: 1.6, margin: 0 }}>{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* METHODE */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Méthode pour identifier un écart inconnu
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
              Si l'ecart ne correspond a aucune des quatre causes ci-dessus, suivez cette methode systematique.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {[
                { n: '1', color: '#2563eb', title: "Calculez l'écart exact", desc: "Notez la difference precise entre le solde bancaire et le solde comptable. Ce montant est votre point de depart pour la recherche." },
                { n: '2', color: '#7c3aed', title: "Divisez par deux", desc: "Si l'ecart divise par deux correspond a une transaction identifiable, c'est presque certainement un doublon. Sinon, passez a l'etape suivante." },
                { n: '3', color: '#059669', title: "Cherchez dans les frais bancaires", desc: "Comparez l'ecart avec le total de vos frais bancaires du mois. Les commissions et cotisations sont souvent oubliees dans la comptabilite." },
                { n: '4', color: '#d97706', title: "Revérifiez les saisies manuelles", desc: "Examinez toutes les ecritures saisies manuellement sur la periode. Une inversion de chiffres (transpose) est la cause la plus frequente des ecarts residuels." },
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
          <section style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderRadius: '20px', padding: '40px 32px', color: 'white', marginBottom: '56px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '12px' }}>Evitez les écarts avec le rapprochement automatique</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px' }}>
              InvoiceAgent detecte automatiquement les doublons, les frais bancaires non comptabilises et les transactions non rapprochees.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#818cf8', color: '#1e1b4b', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Tester gratuitement →
            </a>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>Questions frequentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { q: "Pourquoi y a-t-il un écart dans mon rapprochement bancaire ?", r: "Les ecarts de rapprochement bancaire ont quatre causes principales : une transaction enregistree deux fois (doublon), une facture enregistree mais pas encore encaissee, des frais bancaires non comptabilises, ou une erreur de saisie de montant. Dans 80% des cas, l'ecart provient d'un doublon ou de frais bancaires oublies." },
                { q: "Comment trouver l'origine d'un écart de rapprochement ?", r: "Commencez par verifier si l'ecart correspond exactement au double d'une transaction — signe d'un doublon. Si non, comparez l'ecart avec vos frais bancaires du mois. Si l'ecart persiste, examinez toutes les saisies manuelles de la periode pour identifier une erreur de frappe." },
                { q: "Que faire si l'écart est impossible à identifier ?", r: "Si vous ne trouvez pas l'origine de l'ecart apres verification, creez une ecriture d'ajustement temporaire en notant clairement qu'elle est a justifier. Contactez votre expert-comptable pour valider l'ecriture et identifier la cause lors de la cloture." },
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
                { label: 'Erreur rapprochement bancaire', href: `${BASE_URL}/rapprochement-bancaire-erreur` },
                { label: 'Logiciel rapprochement automatique', href: `${BASE_URL}/logiciel-rapprochement-bancaire-automatique` },
                { label: 'Reconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Controle facture automatise', href: `${BASE_URL}/controle-facture-automatise` },
                { label: 'Doublon facture que faire', href: `${BASE_URL}/doublon-facture-que-faire` },
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