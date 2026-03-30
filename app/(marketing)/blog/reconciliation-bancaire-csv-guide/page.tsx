import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const SLUG = 'reconciliation-bancaire-csv-guide'
const PAGE_URL = `${BASE_URL}/blog/${SLUG}`

export const metadata: Metadata = {
  title: 'Réconciliation Bancaire CSV : Guide Complet PME 2026 | InvoiceAgent',
  description: "Tout savoir sur la réconciliation bancaire CSV : comment exporter depuis votre banque, automatiser le rapprochement et détecter les impayés. Guide complet 2026.",
  keywords: ['réconciliation bancaire CSV', 'rapprochement bancaire automatique', 'import CSV banque France', 'réconciliation comptable PME', 'matching facture transaction'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Réconciliation Bancaire CSV : Guide Complet 2026', description: "Comment automatiser votre réconciliation bancaire avec un fichier CSV. Guide pratique pour PME françaises.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'article' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaArticle = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: 'Réconciliation Bancaire CSV : Guide Complet pour PME Françaises 2026',
  author: { '@type': 'Organization', name: 'InvoiceAgent' },
  publisher: { '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL },
  datePublished: '2026-03-22', dateModified: '2026-03-22',
  url: PAGE_URL,
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: 'Réconciliation Bancaire CSV', item: PAGE_URL },
  ],
}

export default function ArticleReconciliationCSV() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        <section style={{ backgroundColor: 'white', padding: '60px 20px 48px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
              <a href={`${BASE_URL}/blog`} style={{ color: '#6366f1', fontSize: '13px', textDecoration: 'none' }}>← Blog</a>
              <span style={{ color: '#e2e8f0' }}>|</span>
              <span style={{ backgroundColor: '#dbeafe', color: '#2563eb', fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px' }}>Banque</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>22 mars 2026</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>· 7 min de lecture</span>
            </div>
            <h1 style={{ fontSize: '38px', fontWeight: 'bold', color: '#1e293b', lineHeight: 1.2, marginBottom: '20px' }}>
              Réconciliation bancaire CSV : tout ce qu'il faut savoir pour les PME françaises
            </h1>
            <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7 }}>
              La réconciliation bancaire est l'une des tâches comptables les plus chronophages pour les PME françaises. Pourtant, avec un simple fichier CSV exporté depuis votre banque, il est possible d'automatiser entièrement ce processus. Voici comment.
            </p>
          </div>
        </section>

        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 20px 80px' }}>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Table des matières</h2>
            {[
              { anchor: '#definition', label: '1. Qu\'est-ce que la réconciliation bancaire ?' },
              { anchor: '#pourquoi', label: '2. Pourquoi la réconciliation est-elle obligatoire ?' },
              { anchor: '#csv', label: '3. Le fichier CSV bancaire : tout comprendre' },
              { anchor: '#banques', label: '4. Comment exporter le CSV depuis votre banque' },
              { anchor: '#automatiser', label: '5. Comment automatiser la réconciliation CSV' },
              { anchor: '#erreurs', label: '6. Les erreurs fréquentes à éviter' },
              { anchor: '#conclusion', label: '7. Conclusion' },
            ].map((item) => (
              <a key={item.anchor} href={item.anchor} style={{ display: 'block', color: '#6366f1', fontSize: '14px', textDecoration: 'none', padding: '4px 0', lineHeight: 1.5 }}>{item.label}</a>
            ))}
          </div>

          <section id="definition" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #2563eb' }}>
              1. Qu'est-ce que la réconciliation bancaire ?
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              La réconciliation bancaire — aussi appelée rapprochement bancaire — est l'opération comptable qui consiste à comparer les transactions enregistrées dans votre relevé bancaire avec les factures et écritures enregistrées dans votre comptabilité. L'objectif est de s'assurer que chaque paiement reçu ou émis correspond bien à une facture existante.
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              Concrètement, pour chaque transaction de votre relevé bancaire — qu'il s'agisse d'un virement reçu d'un client, d'un prélèvement fournisseur ou d'un paiement par carte — vous devez identifier la facture ou la charge correspondante. Les transactions non rapprochées signalent soit une facture impayée, soit une dépense non justifiée.
            </p>
            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <p style={{ color: '#1e40af', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>Exemple concret</p>
              <p style={{ color: '#1e40af', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                Vous recevez un virement de 2 380€ le 15 mars. La réconciliation bancaire consiste à identifier que ce virement correspond à la facture F-2026-047 émise à votre client Entreprise Martin pour 2 380€ TTC (2 000€ HT + 380€ TVA à 19%). Une fois rapprochée, la facture passe du statut "En attente" à "Payée".
              </p>
            </div>
          </section>

          <section id="pourquoi" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #2563eb' }}>
              2. Pourquoi la réconciliation est-elle obligatoire ?
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              La réconciliation bancaire n'est pas directement imposée par un texte de loi spécifique, mais elle est rendue obligatoire indirectement par plusieurs obligations comptables françaises :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { titre: 'Obligation de tenue de comptabilité régulière', detail: "Le Code de Commerce (article L.123-12) impose à toute entreprise de tenir une comptabilité permettant d'établir des comptes annuels sincères et fidèles. Une comptabilité sans rapprochement bancaire ne peut pas être considérée comme régulière." },
                { titre: 'Conformité FEC DGFiP', detail: "Le Fichier des Écritures Comptables (FEC) doit refléter toutes les transactions bancaires. Sans réconciliation, des transactions bancaires peuvent être omises du FEC, ce qui constitue une irrégularité comptable sanctionnable." },
                { titre: 'Détection des fraudes internes', detail: "Le rapprochement bancaire régulier permet de détecter rapidement des virements non autorisés, des doublons de paiement ou des détournements de fonds — une protection essentielle pour toute PME." },
                { titre: 'Déclaration TVA exacte', detail: "La TVA à déclarer doit correspondre aux encaissements et décaissements réels. Sans rapprochement bancaire, il est impossible de s'assurer que la TVA déclarée est exacte." },
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px 20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>→ {item.titre}</div>
                  <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{item.detail}</div>
                </div>
              ))}
            </div>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8 }}>
              En pratique, les experts-comptables recommandent un rapprochement bancaire mensuel au minimum. Les entreprises traitant un volume élevé de transactions peuvent opter pour une réconciliation hebdomadaire ou même quotidienne.
            </p>
          </section>

          <section id="csv" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #2563eb' }}>
              3. Le fichier CSV bancaire : tout comprendre
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              Le format CSV (Comma-Separated Values) est un format de fichier texte simple dans lequel chaque ligne représente une transaction bancaire et chaque colonne une information spécifique. Toutes les banques françaises permettent d'exporter l'historique des transactions dans ce format.
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              Un fichier CSV bancaire contient généralement les colonnes suivantes, bien que l'ordre et le nom exact des colonnes varient selon les banques :
            </p>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', marginBottom: '24px', fontFamily: 'monospace', fontSize: '13px', overflowX: 'auto' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>// Exemple de ligne CSV BNP Paribas</div>
              <div style={{ color: '#4ade80' }}>Date;Libellé;Débit;Crédit;Solde</div>
              <div style={{ color: '#e2e8f0' }}>15/03/2026;VIR RECU ENTREPRISE MARTIN;;&nbsp;2380,00;&nbsp;15420,50</div>
              <div style={{ color: '#e2e8f0' }}>14/03/2026;PRLV SEPA ORANGE PRO;89,99;;&nbsp;13040,50</div>
              <div style={{ color: '#e2e8f0' }}>12/03/2026;CB FNAC EVEIL;245,00;;&nbsp;13130,49</div>
            </div>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              Les colonnes les plus importantes pour la réconciliation automatique sont :
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              {[
                { col: 'Date', desc: 'Date de valeur de la transaction — utilisée pour rapprocher avec la date d\'échéance de la facture' },
                { col: 'Libellé', desc: 'Description de la transaction — contient souvent le nom du client ou fournisseur' },
                { col: 'Débit / Crédit', desc: 'Montant de la transaction — comparé au montant TTC de la facture' },
                { col: 'Référence', desc: 'Référence interne bancaire — parfois utilisée pour identifier la facture' },
              ].map((c) => (
                <div key={c.col} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#2563eb', fontWeight: 700, marginBottom: '6px' }}>{c.col}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="banques" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #2563eb' }}>
              4. Comment exporter le CSV depuis votre banque
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>
              Chaque banque française propose l'export CSV depuis son espace en ligne, mais le chemin d'accès varie. Voici le guide pour les principales banques :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {[
                { banque: 'BNP Paribas', steps: 'Espace client → Mes comptes → Historique → Télécharger → Format CSV ou Excel', color: '#059669' },
                { banque: 'Société Générale', steps: 'Mon espace → Comptes → Relevés → Exporter → CSV', color: '#dc2626' },
                { banque: 'Crédit Agricole', steps: 'Espace client → Mes comptes → Mouvements → Exporter les opérations → CSV', color: '#15803d' },
                { banque: 'LCL', steps: 'Mes comptes → Historique des opérations → Exporter → Format CSV', color: '#1d4ed8' },
                { banque: 'CIC', steps: 'Mes comptes → Relevé → Télécharger → CSV', color: '#7c3aed' },
                { banque: 'Boursorama / Boursobank', steps: 'Mes comptes → Historique → Exporter en CSV', color: '#0891b2' },
              ].map((b) => (
                <div key={b.banque} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '10px', height: '10px', backgroundColor: b.color, borderRadius: '50%', flexShrink: 0, marginTop: '5px' }} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{b.banque}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>{b.steps}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '20px' }}>
              <p style={{ color: '#14532d', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>✓ Conseil pratique</p>
              <p style={{ color: '#166534', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                Exportez toujours une période complète — idéalement un mois entier — pour éviter les transactions manquantes. Certaines banques limitent l'export à 3 ou 6 mois d'historique. Si vous avez besoin d'un historique plus ancien, contactez votre conseiller bancaire.
              </p>
            </div>
          </section>

          <section id="automatiser" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #2563eb' }}>
              5. Comment automatiser la réconciliation CSV
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              L'automatisation de la réconciliation bancaire repose sur un algorithme de matching qui compare chaque transaction CSV avec les factures enregistrées selon plusieurs critères simultanés. En 2026, les outils basés sur l'IA atteignent des taux de matching automatique supérieurs à 95% sur les transactions françaises.
            </p>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Le processus de réconciliation automatique en 4 étapes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {[
                { n: '01', color: '#2563eb', title: 'Import du fichier CSV', desc: "Téléchargez votre relevé CSV depuis votre espace bancaire et importez-le dans votre logiciel de réconciliation. Le système normalise automatiquement les colonnes quelle que soit la banque source." },
                { n: '02', color: '#059669', title: 'Analyse IA de chaque transaction', desc: "Pour chaque transaction, l'IA analyse le montant, la date et le libellé. Elle extrait automatiquement le nom du donneur d'ordre ou du bénéficiaire depuis le libellé bancaire, même lorsqu'il est abrégé ou codifié." },
                { n: '03', color: '#7c3aed', title: 'Matching avec les factures', desc: "L'algorithme compare chaque transaction avec les factures non rapprochées et attribue un score de confiance de 0 à 100%. Les correspondances à score élevé sont validées automatiquement. Les autres sont présentées pour validation manuelle." },
                { n: '04', color: '#d97706', title: 'Rapport et alertes', desc: "Un rapport de réconciliation est généré avec le taux de matching, les transactions rapprochées et les anomalies détectées (factures impayées, doublons, écarts de montant). Des alertes automatiques sont envoyées par email." },
              ].map((step) => (
                <div key={step.n} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', gap: '20px' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: step.color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>{step.n}</div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{step.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', borderRadius: '16px', padding: '32px', color: 'white', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Réconciliation bancaire CSV avec InvoiceAgent</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                InvoiceAgent importe votre CSV bancaire et rapproche automatiquement chaque transaction avec vos factures. Taux de matching de 95%, compatible avec toutes les banques françaises. Disponible dès le plan Starter à 19€/mois.
              </p>
              <a href={`${BASE_URL}/reconciliation-bancaire-csv`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none' }}>
                En savoir plus →
              </a>
            </div>
          </section>

          <section id="erreurs" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #2563eb' }}>
              6. Les erreurs fréquentes à éviter
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Voici les erreurs les plus courantes que commettent les PME lors de leur réconciliation bancaire, et comment les éviter :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { erreur: 'Exporter le CSV sans sélectionner la bonne période', solution: "Vérifiez toujours que la période exportée couvre exactement le mois que vous souhaitez réconcilier. Certaines banques incluent des transactions de la veille ou du lendemain selon le paramétrage." },
                { erreur: 'Confondre date d\'opération et date de valeur', solution: "La date de valeur est la date à laquelle le mouvement est effectivement débité ou crédité sur votre compte. C'est cette date qui doit être comparée avec la date d'échéance de la facture, pas la date d'opération." },
                { erreur: 'Ignorer les transactions non rapprochées', solution: "Les transactions non rapprochées ne doivent jamais être ignorées. Chaque transaction non justifiée est soit une facture manquante, soit une erreur bancaire. Traitez-les systématiquement avant de clôturer le mois." },
                { erreur: 'Ne pas réconcilier mensuellement', solution: "Plus vous attendez, plus la réconciliation devient complexe. Un rapprochement mensuel prend 30 minutes avec un bon outil. Un rapprochement annuel peut nécessiter plusieurs jours de travail." },
                { erreur: 'Oublier les frais bancaires et commissions', solution: "Les frais bancaires (tenue de compte, virements, cartes) apparaissent dans votre relevé mais n'ont souvent pas de facture associée. Créez une catégorie 'Frais bancaires' pour les identifier rapidement." },
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px 20px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#dc2626', marginBottom: '8px' }}>✗ {item.erreur}</div>
                  <div style={{ fontSize: '14px', color: '#059669', fontWeight: 600, marginBottom: '4px' }}>✓ Solution</div>
                  <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{item.solution}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="conclusion" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #2563eb' }}>
              7. Conclusion
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              La réconciliation bancaire CSV est une tâche comptable incontournable pour toute PME française souhaitant maintenir une comptabilité régulière et détecter rapidement les factures impayées. En 2026, l'automatisation de ce processus via l'import CSV et l'IA permet de réduire le temps consacré à cette tâche de plusieurs heures à quelques minutes de validation mensuelle.
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8 }}>
              La clé d'une réconciliation efficace repose sur trois points : exporter régulièrement votre CSV bancaire, utiliser un outil de matching automatique pour les correspondances évidentes, et traiter systématiquement les transactions non rapprochées avant de clôturer chaque période.
            </p>
          </section>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>Articles connexes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {[
                { slug: 'automatiser-facturation-pme-2026', title: 'Comment automatiser sa facturation en 2026', category: 'Facturation', color: '#6366f1' },
                { slug: 'fec-comptable-guide-pme', title: 'FEC comptable : guide complet pour PME', category: 'Comptabilité', color: '#059669' },
                { slug: 'tva-freelances-guide-2026', title: 'TVA pour freelances : guide pratique 2026', category: 'TVA', color: '#d97706' },
              ].map((a) => (
                <a key={a.slug} href={`${BASE_URL}/blog/${a.slug}`} style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0', textDecoration: 'none', display: 'block' }}>
                  <span style={{ backgroundColor: `${a.color}15`, color: a.color, fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>{a.category}</span>
                  <p style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, lineHeight: 1.4, margin: 0 }}>{a.title}</p>
                </a>
              ))}
            </div>
          </div>

        </article>
      </main>
      <SharedFooter />
    </>
  )
}