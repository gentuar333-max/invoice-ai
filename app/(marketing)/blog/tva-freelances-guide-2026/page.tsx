import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const SLUG = 'tva-freelances-guide-2026'
const PAGE_URL = `${BASE_URL}/blog/${SLUG}`

export const metadata: Metadata = {
  title: 'TVA pour Freelances et Auto-Entrepreneurs : Guide Pratique 2026 | InvoiceAgent',
  description: "Tout savoir sur la TVA en tant que freelance : franchise de base, taux applicables, déclaration CA3/CA12, TVA déductible. Guide complet 2026 pour indépendants français.",
  keywords: ['TVA freelance', 'TVA auto-entrepreneur 2026', 'franchise base TVA', 'déclaration TVA indépendant', 'TVA collectée déductible freelance France'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'TVA pour Freelances : Guide Pratique 2026', description: "Franchise de base, taux, déclaration CA3/CA12 — tout sur la TVA pour freelances français.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'article' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaArticle = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: 'TVA pour Freelances et Auto-Entrepreneurs : Guide Pratique 2026',
  author: { '@type': 'Organization', name: 'InvoiceAgent' },
  publisher: { '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL },
  datePublished: '2026-03-19', dateModified: '2026-03-19',
  url: PAGE_URL,
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: 'TVA Freelances Guide 2026', item: PAGE_URL },
  ],
}

export default function ArticleTVAFreelances() {
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
              <span style={{ backgroundColor: '#fef3c7', color: '#d97706', fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px' }}>TVA</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>19 mars 2026</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>· 9 min de lecture</span>
            </div>
            <h1 style={{ fontSize: '38px', fontWeight: 'bold', color: '#1e293b', lineHeight: 1.2, marginBottom: '20px' }}>
              TVA pour freelances et auto-entrepreneurs : guide pratique 2026
            </h1>
            <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7 }}>
              La TVA est souvent source de confusion pour les freelances et auto-entrepreneurs français. Franchise de base, TVA collectée, TVA déductible, déclaration CA3 ou CA12 — ce guide complet vous explique tout ce que vous devez savoir pour gérer votre TVA sans erreur en 2026.
            </p>
          </div>
        </section>

        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 20px 80px' }}>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Table des matières</h2>
            {[
              { anchor: '#franchise', label: '1. Franchise de base TVA : qui est concerné ?' },
              { anchor: '#taux', label: '2. Les taux de TVA applicables aux freelances' },
              { anchor: '#collectee', label: '3. TVA collectée : ce que vous facturez à vos clients' },
              { anchor: '#deductible', label: '4. TVA déductible : ce que vous récupérez' },
              { anchor: '#declaration', label: '5. La déclaration TVA : CA3 ou CA12 ?' },
              { anchor: '#echeances', label: '6. Les échéances TVA 2026 à ne pas manquer' },
              { anchor: '#automatiser', label: '7. Automatiser la gestion de sa TVA' },
            ].map((item) => (
              <a key={item.anchor} href={item.anchor} style={{ display: 'block', color: '#6366f1', fontSize: '14px', textDecoration: 'none', padding: '4px 0', lineHeight: 1.5 }}>{item.label}</a>
            ))}
          </div>

          <section id="franchise" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #d97706' }}>
              1. Franchise de base TVA : qui est concerné ?
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              La <strong>franchise en base de TVA</strong> est un régime fiscal qui exonère les petits entrepreneurs du paiement et de la collecte de la TVA. En dessous de certains seuils de chiffre d'affaires, vous facturez vos clients sans TVA et vous n'avez pas de déclaration TVA à effectuer.
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              En 2026, les seuils de franchise de base TVA sont les suivants :
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { categorie: 'Prestations de services', seuil: '37 500€', seuil_majore: '41 250€', color: '#d97706', detail: 'Consultants, développeurs, graphistes, rédacteurs, coaches...' },
                { categorie: 'Activités commerciales', seuil: '85 000€', seuil_majore: '93 500€', color: '#2563eb', detail: 'Vente de marchandises, restauration, hébergement...' },
                { categorie: 'Avocats, auteurs, artistes', seuil: '50 000€', seuil_majore: '55 000€', color: '#7c3aed', detail: 'Professions réglementées et activités artistiques' },
              ].map((s) => (
                <div key={s.categorie} style={{ backgroundColor: 'white', border: `2px solid ${s.color}22`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: s.color, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.categorie}</div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#1e293b', marginBottom: '4px' }}>{s.seuil}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>Seuil majoré : {s.seuil_majore}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>{s.detail}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <p style={{ color: '#92400e', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>⚠️ Seuil majoré : attention au dépassement</p>
              <p style={{ color: '#b45309', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                Si vous dépassez le seuil normal mais restez en dessous du seuil majoré, vous bénéficiez d'une année supplémentaire en franchise. Si vous dépassez le seuil majoré, vous devenez redevable de la TVA dès le 1er jour du mois de dépassement — et non en début d'année suivante.
              </p>
            </div>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8 }}>
              En franchise de base, vos factures doivent obligatoirement mentionner la mention <strong>"TVA non applicable, article 293 B du CGI"</strong>. L'absence de cette mention est une irrégularité sanctionnable lors d'un contrôle fiscal.
            </p>
          </section>

          <section id="taux" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #d97706' }}>
              2. Les taux de TVA applicables aux freelances
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Si vous dépassez les seuils de franchise ou si vous avez opté volontairement pour la TVA, le taux applicable dépend de la nature de votre activité :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { taux: '20%', label: 'Taux normal', color: '#2563eb', activites: ['Prestations de conseil et consulting', 'Développement logiciel et web', 'Design graphique et créatif', 'Formations professionnelles non certifiées', 'La grande majorité des services aux entreprises'] },
                { taux: '10%', label: 'Taux intermédiaire', color: '#059669', activites: ['Restauration et traiteur', 'Travaux d\'amélioration de logements', 'Transports de voyageurs', 'Certaines prestations agricoles'] },
                { taux: '5.5%', label: 'Taux réduit', color: '#d97706', activites: ['Livres et publications de presse', 'Formations certifiées (si exonération non applicable)', 'Travaux de rénovation énergétique', 'Produits alimentaires essentiels'] },
                { taux: '0%', label: 'Exonéré', color: '#7c3aed', activites: ['Formations professionnelles certifiées (exonération TVA article 261-4-4°)', 'Prestations médicales et paramédicales', 'Prestations à des clients UE (TVA intracommunautaire)', 'Exportations hors UE'] },
              ].map((t) => (
                <div key={t.taux} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '24px', fontWeight: 900, color: t.color, minWidth: '52px' }}>{t.taux}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{t.label}</div>
                      <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                        {t.activites.map((a) => (
                          <li key={a} style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, marginBottom: '4px' }}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '20px' }}>
              <p style={{ color: '#14532d', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>✓ Cas particulier des formations</p>
              <p style={{ color: '#166534', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                Les formateurs freelances peuvent bénéficier d'une exonération totale de TVA (article 261-4-4° du CGI) si leur activité est certifiée Qualiopi ou si les formations sont dispensées dans un cadre scolaire ou universitaire. Dans ce cas, aucune TVA n'est à collecter ni à déclarer, quelle que soit le chiffre d'affaires.
              </p>
            </div>
          </section>

          <section id="collectee" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #d97706' }}>
              3. TVA collectée : ce que vous facturez à vos clients
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              La <strong>TVA collectée</strong> est la TVA que vous facturez à vos clients sur vos prestations. Elle ne vous appartient pas — vous la collectez pour le compte de l'État et devez la reverser lors de votre déclaration TVA.
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              Par exemple, si vous facturez une prestation de consulting à 1 000€ HT au taux normal de 20% :
            </p>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', marginBottom: '24px', fontFamily: 'monospace', fontSize: '14px' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>// Décomposition d'une facture freelance</div>
              <div style={{ color: '#e2e8f0' }}>Montant HT    : 1 000,00 €</div>
              <div style={{ color: '#fbbf24' }}>TVA 20%       :   200,00 €  ← TVA collectée</div>
              <div style={{ color: '#4ade80' }}>Montant TTC   : 1 200,00 €  ← Ce que paie votre client</div>
              <div style={{ color: '#94a3b8', marginTop: '8px' }}>// À reverser à la DGFiP : 200,00 €</div>
            </div>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              La TVA est exigible au moment de l'encaissement pour les prestations de services (régime des encaissements) ou à la livraison pour les ventes de biens (régime des débits). En tant que freelance prestataire de services, vous pouvez choisir l'un ou l'autre régime, mais le régime des débits simplifie la comptabilité.
            </p>
          </section>

          <section id="deductible" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #d97706' }}>
              4. TVA déductible : ce que vous récupérez
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              La <strong>TVA déductible</strong> est la TVA que vous avez payée sur vos achats professionnels — logiciels, matériel informatique, abonnements, déplacements, etc. Vous pouvez la déduire de la TVA collectée, ce qui réduit le montant que vous devez reverser à l'État.
            </p>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '20px', marginBottom: '24px', fontFamily: 'monospace', fontSize: '14px' }}>
              <div style={{ color: '#94a3b8', marginBottom: '8px' }}>// Calcul TVA nette à reverser</div>
              <div style={{ color: '#fbbf24' }}>TVA collectée    : 800,00 €  (sur vos factures clients)</div>
              <div style={{ color: '#60a5fa' }}>TVA déductible   : 120,00 €  (sur vos achats pro)</div>
              <div style={{ color: '#4ade80' }}>TVA nette à payer: 680,00 €  (à reverser à la DGFiP)</div>
            </div>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              Pour que la TVA soit déductible, vos achats doivent remplir plusieurs conditions :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                "L'achat doit être utilisé pour une activité soumise à TVA (et non exonérée)",
                "Vous devez disposer d'une facture fournisseur mentionnant le montant de TVA",
                "La facture doit être au nom de votre entreprise (pas au nom personnel)",
                "La TVA ne peut pas être déduite sur les dépenses à usage mixte professionnel/personnel sans proratisation",
                "Certaines dépenses sont exclues : véhicules de tourisme (sauf taxis), dépenses de réception et cadeaux au-delà de 73€ TTC par an et par bénéficiaire",
              ].map((cond, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', backgroundColor: 'white', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ color: '#059669', flexShrink: 0, fontWeight: 700 }}>✓</span>
                  <span style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>{cond}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="declaration" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #d97706' }}>
              5. La déclaration TVA : CA3 ou CA12 ?
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Il existe deux formulaires de déclaration TVA selon votre régime fiscal :
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '24px' }}>
              {[
                {
                  formulaire: 'CA3', regime: 'Régime réel normal', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
                  frequence: 'Mensuelle ou trimestrielle',
                  seuil: 'CA > 789 000€ (services) ou > 4 000 000€ (ventes)',
                  avantage: 'Paiements étalés, meilleure gestion de trésorerie',
                  inconvenient: 'Déclarations fréquentes, plus de travail administratif',
                },
                {
                  formulaire: 'CA12', regime: 'Régime réel simplifié', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
                  frequence: 'Annuelle (avec 2 acomptes)',
                  seuil: 'CA entre 37 500€ et 789 000€ (services)',
                  avantage: 'Une seule déclaration par an, 2 acomptes semestriels',
                  inconvenient: 'Acomptes basés sur N-1, peut créer des décalages de trésorerie',
                },
              ].map((f) => (
                <div key={f.formulaire} style={{ backgroundColor: f.bg, border: `1px solid ${f.border}`, borderRadius: '12px', padding: '24px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: f.color, marginBottom: '4px' }}>{f.formulaire}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>{f.regime}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: 'Fréquence', value: f.frequence },
                      { label: 'Seuil', value: f.seuil },
                      { label: 'Avantage', value: f.avantage },
                      { label: 'Inconvénient', value: f.inconvenient },
                    ].map((item) => (
                      <div key={item.label}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: f.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>{item.label}</div>
                        <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8 }}>
              La plupart des freelances en début d'activité relèvent du régime réel simplifié (CA12) s'ils dépassent les seuils de franchise. Lorsque leur chiffre d'affaires croît et dépasse les seuils du régime simplifié, ils basculent automatiquement vers le régime réel normal (CA3).
            </p>
          </section>

          <section id="echeances" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #d97706' }}>
              6. Les échéances TVA 2026 à ne pas manquer
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Le non-respect des échéances TVA expose à des majorations de 10% minimum. Voici les dates clés à retenir en 2026 :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                { date: '19 janvier 2026', type: 'CA3 mensuel', detail: 'Déclaration et paiement TVA de décembre 2025', urgent: false },
                { date: '19 avril 2026', type: 'CA12 — 1er acompte', detail: '55% de la TVA de l\'exercice précédent', urgent: false },
                { date: '19 juillet 2026', type: 'CA12 — 2ème acompte', detail: '40% de la TVA de l\'exercice précédent', urgent: false },
                { date: '19 octobre 2026', type: 'CA3 trimestriel T3', detail: 'Déclaration TVA juillet-septembre 2026', urgent: false },
                { date: '2 mai 2026', type: 'CA12 annuel', detail: 'Dépôt de la déclaration annuelle CA12 (exercice 2025)', urgent: true },
              ].map((e) => (
                <div key={e.date} style={{ backgroundColor: e.urgent ? '#fff1f2' : 'white', border: `1px solid ${e.urgent ? '#fecaca' : '#e2e8f0'}`, borderRadius: '10px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, color: e.urgent ? '#dc2626' : '#2563eb', minWidth: '140px', flexShrink: 0 }}>{e.date}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '2px' }}>{e.type}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{e.detail}</div>
                  </div>
                  {e.urgent && <span style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', backgroundColor: '#fee2e2', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>Important</span>}
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '20px' }}>
              <p style={{ color: '#9a3412', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>⚠️ Sanctions en cas de retard</p>
              <p style={{ color: '#c2410c', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                Un retard de déclaration TVA entraîne une majoration de 10% des droits dus, portée à 40% après mise en demeure restée sans effet. Des intérêts de retard de 0.20% par mois s'ajoutent. En cas de récidive, des pénalités supplémentaires peuvent être appliquées.
              </p>
            </div>
          </section>

          <section id="automatiser" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #d97706' }}>
              7. Automatiser la gestion de sa TVA
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              La gestion manuelle de la TVA — extraction des montants sur chaque facture, calcul de la TVA collectée et déductible, respect des échéances — est source d'erreurs et de stress. En 2026, des outils permettent d'automatiser l'ensemble de ce processus.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { action: 'Extraction automatique de la TVA', detail: "L'IA extrait le taux de TVA de chaque facture fournisseur (5.5%, 10% ou 20%) et calcule les montants HT, TVA et TTC. Plus besoin de lire et saisir manuellement chaque facture.", icone: '🤖' },
                { action: 'Calcul TVA collectée et déductible', detail: "Toutes vos factures clients et fournisseurs sont agrégées pour calculer automatiquement votre TVA nette à reverser chaque mois ou trimestre.", icone: '📊' },
                { action: 'Alertes avant chaque échéance', detail: "Une notification email vous rappelle les échéances TVA 7 jours avant la date limite — pour ne plus jamais manquer une déclaration.", icone: '🔔' },
                { action: 'Export pour déclaration en ligne', detail: "Les montants de TVA collectée et déductible sont exportés dans un format prêt à reporter dans votre espace impots.gouv.fr ou à transmettre à votre expert-comptable.", icone: '📤' },
              ].map((item) => (
                <div key={item.action} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px 20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{item.icone}</span>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>{item.action}</div>
                    <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', borderRadius: '16px', padding: '32px', color: 'white' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Gérez votre TVA automatiquement avec InvoiceAgent</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                InvoiceAgent extrait automatiquement la TVA de vos factures PDF, calcule vos montants à déclarer et vous alerte avant chaque échéance. Disponible dès le plan Starter à 19€/mois.
              </p>
              <a href={`${BASE_URL}/tva-automatique-pme`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none' }}>
                En savoir plus →
              </a>
            </div>
          </section>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>Articles connexes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {[
                { slug: 'automatiser-facturation-pme-2026', title: 'Comment automatiser sa facturation en 2026', category: 'Facturation', color: '#6366f1' },
                { slug: 'fec-comptable-guide-pme', title: 'FEC comptable : guide complet pour PME', category: 'Comptabilité', color: '#059669' },
                { slug: 'ocr-factures-comment-ca-marche', title: 'OCR factures : comment fonctionne l\'extraction par IA', category: 'Technologie', color: '#7c3aed' },
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