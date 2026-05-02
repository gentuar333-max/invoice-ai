 
import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/rapprochement-bancaire-erreur`

export const metadata: Metadata = {
  title: 'Erreur de rapprochement bancaire : causes et solutions | InvoiceAgent',
  description: "Erreur de rapprochement bancaire ? Découvrez les causes les plus fréquentes — écart de montant, transaction manquante, doublon — et comment les corriger rapidement.",
  keywords: ['erreur rapprochement bancaire', 'problème réconciliation bancaire', 'écart rapprochement bancaire', 'transaction non rapprochée', 'corriger rapprochement bancaire PME'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Erreur de rapprochement bancaire : causes et solutions',
    description: "Les erreurs de rapprochement bancaire les plus fréquentes et comment les corriger. Guide pratique pour PME françaises.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = {
  '@context': 'https://schema.org', '@type': 'Organization',
  name: 'InvoiceAgent', url: BASE_URL,
  description: "Logiciel de rapprochement bancaire automatique pour PME françaises.",
}
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent', applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  url: BASE_URL,
}
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Pourquoi mon rapprochement bancaire ne correspond pas ?", acceptedAnswer: { '@type': 'Answer', text: "Les causes les plus fréquentes sont un écart de montant (arrondi, frais bancaires), une différence de date entre la facture et le paiement effectif, ou un libellé bancaire trop abrégé qui empêche l'identification automatique." } },
    { '@type': 'Question', name: "Comment corriger une erreur de rapprochement bancaire ?", acceptedAnswer: { '@type': 'Answer', text: "Vérifiez d'abord le montant exact TTC de la facture vs le montant de la transaction. Ensuite, contrôlez les dates. Si l'écart persiste, associez manuellement la transaction à la facture correspondante dans votre logiciel." } },
    { '@type': 'Question', name: "Qu'est-ce qu'une transaction non rapprochée ?", acceptedAnswer: { '@type': 'Answer', text: "Une transaction non rapprochée est un mouvement bancaire (virement, prélèvement) qui n'a pas été associé à une facture ou une charge dans votre comptabilité. Elle signale soit une facture manquante, soit une dépense non justifiée." } },
    { '@type': 'Question', name: "Comment éviter les erreurs de rapprochement bancaire ?", acceptedAnswer: { '@type': 'Answer', text: "La meilleure solution est d'automatiser le rapprochement avec un logiciel qui importe votre CSV bancaire et compare chaque transaction avec vos factures. Le taux d'erreur manuel de 5% tombe à moins de 1% avec une solution automatisée." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Erreur rapprochement bancaire', item: PAGE_URL },
  ],
}

export default function RapprochementBancaireErreurPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white', padding: '80px 20px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px' }}>
              Rapprochement bancaire — Guide pratique
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: 1.15 }}>
              Erreur de rapprochement bancaire : <span style={{ color: '#fbbf24' }}>causes fréquentes et solutions</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '640px', margin: '0 auto 36px' }}>
              Un rapprochement bancaire qui ne tombe pas juste est l'une des frustrations les plus courantes en comptabilité PME. Voici comment identifier et corriger rapidement chaque type d'erreur.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Tester la réconciliation automatique gratuite
            </a>
          </div>
        </section>

        {/* STATS */}
        <section style={{ backgroundColor: 'white', padding: '40px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', textAlign: 'center' }}>
            {[
              { value: '5%', label: "Taux d'erreur en manuel", sub: 'AICPA 2025' },
              { value: '3h', label: 'Perdues par mois', sub: 'Rapprochement manuel PME' },
              { value: '95%', label: 'Matching automatique', sub: 'Avec InvoiceAgent IA' },
              { value: '< 1%', label: "Taux d'erreur automatisé", sub: 'Vs 5% en manuel' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 20px 80px' }}>

          {/* ERREURS FREQUENTES */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Les 5 erreurs de rapprochement bancaire les plus fréquentes
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
              La majorité des erreurs de rapprochement bancaire en PME appartiennent à cinq catégories. Chacune a une cause précise et une solution directe.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                {
                  n: '01', color: '#dc2626', bg: '#fef2f2', border: '#fecaca',
                  erreur: "Écart de montant entre la facture et la transaction",
                  cause: "Le montant de la transaction bancaire diffère de celui de la facture — souvent à cause de frais bancaires de virement (typiquement 0,50€ à 2€), d'un arrondi sur le taux de TVA, ou d'un acompte partiel non enregistré.",
                  solution: "Comparez le montant TTC exact de la facture avec la transaction. Si l'écart est inférieur à 5€, créez une ligne 'Frais bancaires' pour justifier la différence. Si l'écart est supérieur, vérifiez si un acompte a été réglé séparément.",
                  exemple: "Facture 1 190,00€ TTC — Transaction bancaire 1 188,50€ → Frais de virement 1,50€ à imputer en charge",
                },
                {
                  n: '02', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
                  erreur: "Décalage de date entre la facture et le virement",
                  cause: "La date d'émission de la facture et la date de valeur du virement peuvent différer de plusieurs jours, voire plusieurs semaines pour les paiements à 30 ou 60 jours. Ce décalage génère des transactions non rapprochées sur le mois en cours.",
                  solution: "Utilisez la date d'échéance de la facture (et non la date d'émission) pour le rapprochement. Vérifiez les virements des 5 premiers jours du mois suivant pour identifier les paiements de fin de mois.",
                  exemple: "Facture du 28 mars avec paiement à 30 jours → virement reçu le 2 mai, à rapprocher en clôture d'avril",
                },
                {
                  n: '03', color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe',
                  erreur: "Libellé bancaire trop abrégé ou codifié",
                  cause: "Les banques utilisent des libellés standardisés et souvent abrégés qui ne correspondent pas exactement au nom du fournisseur ou client inscrit sur la facture. 'VIR RECU STE MART' peut correspondre à 'Société Martin SARL' — mais l'algorithme de matching ne le détecte pas sans configuration.",
                  solution: "Configurez un dictionnaire de correspondances dans votre logiciel : 'STE MART' → 'Société Martin'. Les outils IA modernes apprennent automatiquement ces correspondances après la première validation manuelle.",
                  exemple: "Libellé : 'PRLV SEPA 0000823 ORANG' → correspond à 'Orange Business Services' sur votre facture",
                },
                {
                  n: '04', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
                  erreur: "Transaction en double dans le fichier CSV",
                  cause: "Lors de l'export CSV depuis votre banque, il arrive que des transactions soient exportées deux fois — notamment si vous exportez des périodes qui se chevauchent (ex: 01-31 mars et 15 mars-15 avril). La transaction du 15 au 31 mars apparaît alors en double.",
                  solution: "Avant d'importer un CSV, vérifiez que la période exportée ne chevauche pas une période déjà importée. Un bon logiciel de rapprochement détecte automatiquement les doublons par comparaison de date + montant + libellé.",
                  exemple: "Import du 01/03 au 31/03 puis du 15/03 au 15/04 → 16 jours de transactions en double",
                },
                {
                  n: '05', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc',
                  erreur: "Facture manquante pour une transaction réelle",
                  cause: "Une transaction bancaire n'a pas de facture correspondante dans votre comptabilité. Cela se produit quand une dépense est réglée directement par carte sans générer de facture formelle (abonnement, petit achat), ou quand la facture n'a pas encore été enregistrée.",
                  solution: "Pour chaque transaction non rapprochée, demandez la facture au fournisseur ou créez une note de frais si le montant est faible. Les achats récurrents sans facture (abonnements SaaS, forfaits téléphoniques) peuvent être justifiés par les CGV ou les emails de confirmation.",
                  exemple: "Prélèvement mensuel 29,99€ 'SLACK COM' → facture Slack à télécharger depuis l'espace client",
                },
              ].map((item) => (
                <div key={item.n} style={{ backgroundColor: item.bg, border: `1px solid ${item.border}`, borderRadius: '16px', padding: '28px', borderLeft: `4px solid ${item.color}` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ width: '36px', height: '36px', backgroundColor: item.color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0, lineHeight: 1.3 }}>{item.erreur}</h3>
                  </div>
                  <div style={{ marginLeft: '52px' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: item.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Cause</p>
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.cause}</p>
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Solution</p>
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0 }}>{item.solution}</p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '10px 14px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginBottom: '4px' }}>Exemple concret</p>
                      <p style={{ fontSize: '13px', color: '#1e293b', fontFamily: 'monospace', margin: 0, lineHeight: 1.5 }}>{item.exemple}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROCESSUS CORRECTION */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Comment corriger une erreur de rapprochement en 4 etapes
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
              Face a une transaction non rapprochee, suivez ce processus methodique pour identifier et corriger l'erreur rapidement.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {[
                { n: '1', color: '#2563eb', title: 'Verifier le montant exact', desc: "Comparez le montant de la transaction bancaire avec le montant TTC de toutes vos factures non rapprochées de la période. Autorisez un écart de ±5€ pour les frais de virement." },
                { n: '2', color: '#7c3aed', title: 'Contrôler la plage de dates', desc: "Élargissez la recherche à ±15 jours autour de la date de transaction. Un virement reçu le 3 avril peut correspondre à une facture avec échéance au 31 mars." },
                { n: '3', color: '#059669', title: 'Analyser le libellé', desc: "Décomposez le libellé bancaire pour identifier le donneur d'ordre. Cherchez une correspondance partielle avec vos fournisseurs ou clients connus." },
                { n: '4', color: '#d97706', title: 'Associer ou créer la charge', desc: "Si la facture existe, associez-la manuellement. Si elle est manquante, contactez le fournisseur pour obtenir le justificatif ou créez une note de frais." },
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
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '12px' }}>Automatisez votre rapprochement bancaire</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '560px', margin: '0 auto 24px' }}>
              InvoiceAgent importe votre CSV bancaire et rapproche automatiquement chaque transaction avec vos factures. Taux de matching 95%, compatible toutes banques françaises.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
              {['Compatible BNP, SG, CA, LCL, CIC', 'Matching IA 95%', 'Détection doublons automatique', 'Gratuit jusqu\'à 5 factures'].map((f) => (
                <span key={f} style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)', fontSize: '12px', padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)' }}>{f}</span>
              ))}
            </div>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Tester gratuitement →
            </a>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>Questions fréquentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { q: "Pourquoi mon rapprochement bancaire ne correspond pas ?", r: "Les causes les plus fréquentes sont un écart de montant (frais bancaires, arrondi TVA), une différence de date entre la facture et le paiement effectif, ou un libellé bancaire trop abrégé. Dans 90% des cas, l'erreur vient d'un écart de montant inférieur à 5€ ou d'un décalage de quelques jours." },
                { q: "Comment corriger une erreur de rapprochement bancaire ?", r: "Vérifiez d'abord le montant exact TTC de la facture vs le montant de la transaction. Ensuite, élargissez la plage de dates à ±15 jours. Si l'écart persiste, analysez le libellé bancaire pour identifier le donneur d'ordre et associez manuellement la transaction à la facture correspondante." },
                { q: "Qu'est-ce qu'une transaction non rapprochée ?", r: "Une transaction non rapprochée est un mouvement bancaire (virement, prélèvement, paiement carte) qui n'a pas été associé à une facture ou une charge dans votre comptabilité. Elle signale soit une facture manquante, soit une dépense non justifiée. Chaque transaction non rapprochée doit être traitée avant la clôture du mois." },
                { q: "Comment éviter les erreurs de rapprochement bancaire ?", r: "La meilleure solution est d'automatiser le rapprochement avec un logiciel qui importe votre CSV bancaire et compare chaque transaction avec vos factures. Le taux d'erreur manuel de 5% tombe à moins de 1% avec une solution automatisée. Un rapprochement mensuel régulier est également essentiel — plus vous attendez, plus la correction devient complexe." },
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
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Logiciel rapprochement bancaire automatique', href: `${BASE_URL}/logiciel-rapprochement-bancaire-automatique` },
                { label: 'Ecart rapprochement bancaire', href: `${BASE_URL}/ecart-rapprochement-bancaire-solution` },
                { label: 'Erreurs facture fréquentes', href: `${BASE_URL}/erreurs-facture-frequentes-pme` },
                { label: 'Contrôle facture automatisé', href: `${BASE_URL}/controle-facture-automatise` },
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