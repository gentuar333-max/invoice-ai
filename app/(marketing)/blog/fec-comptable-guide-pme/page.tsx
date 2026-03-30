import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const SLUG = 'fec-comptable-guide-pme'
const PAGE_URL = `${BASE_URL}/blog/${SLUG}`

export const metadata: Metadata = {
  title: 'FEC Comptable : Guide Complet pour PME Françaises 2026 | InvoiceAgent',
  description: "Tout savoir sur le FEC (Fichier des Écritures Comptables) : obligations légales, 18 champs obligatoires, sanctions DGFiP, génération automatique. Guide complet 2026.",
  keywords: ['FEC comptable', 'fichier écritures comptables', 'FEC DGFiP obligatoire', 'FEC PME France', 'générer FEC automatique', 'FEC Sage EBP Cegid'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'FEC Comptable : Guide Complet PME 2026', description: "Tout savoir sur le FEC : obligations, 18 champs, sanctions DGFiP et génération automatique.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'article' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaArticle = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: 'FEC Comptable : Guide Complet pour PME Françaises 2026',
  author: { '@type': 'Organization', name: 'InvoiceAgent' },
  publisher: { '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL },
  datePublished: '2026-03-25', dateModified: '2026-03-25',
  url: PAGE_URL,
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: 'FEC Comptable Guide PME', item: PAGE_URL },
  ],
}

export default function ArticleFECComptable() {
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
              <span style={{ backgroundColor: '#dcfce7', color: '#059669', fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px' }}>Comptabilité</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>25 mars 2026</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>· 10 min de lecture</span>
            </div>
            <h1 style={{ fontSize: '38px', fontWeight: 'bold', color: '#1e293b', lineHeight: 1.2, marginBottom: '20px' }}>
              FEC comptable : guide complet pour PME françaises en 2026
            </h1>
            <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7 }}>
              Le Fichier des Écritures Comptables (FEC) est obligatoire depuis 2014 pour toutes les entreprises tenant une comptabilité informatisée. En cas de contrôle DGFiP, l'absence d'un FEC conforme expose à une amende minimale de 5 000€. Ce guide explique tout ce que vous devez savoir.
            </p>
          </div>
        </section>

        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 20px 80px' }}>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Table des matières</h2>
            {[
              { anchor: '#definition', label: '1. Qu\'est-ce que le FEC ?' },
              { anchor: '#obligation', label: '2. Qui est concerné par l\'obligation FEC ?' },
              { anchor: '#champs', label: '3. Les 18 champs obligatoires du FEC' },
              { anchor: '#sanctions', label: '4. Sanctions en cas de FEC non conforme' },
              { anchor: '#generation', label: '5. Comment générer son FEC automatiquement ?' },
              { anchor: '#logiciels', label: '6. Compatibilité avec les logiciels comptables' },
              { anchor: '#bonnes-pratiques', label: '7. Bonnes pratiques pour maintenir un FEC conforme' },
            ].map((item) => (
              <a key={item.anchor} href={item.anchor} style={{ display: 'block', color: '#6366f1', fontSize: '14px', textDecoration: 'none', padding: '4px 0', lineHeight: 1.5 }}>{item.label}</a>
            ))}
          </div>

          <section id="definition" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #059669' }}>
              1. Qu'est-ce que le FEC ?
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              Le <strong>Fichier des Écritures Comptables (FEC)</strong> est un fichier informatique standardisé qui contient l'intégralité des écritures comptables d'un exercice. Il a été instauré par l'article <strong>L.47 A du Livre des Procédures Fiscales (LPF)</strong> et son format précis est défini par l'arrêté du 29 juillet 2013.
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              Obligatoire depuis le <strong>1er janvier 2014</strong>, le FEC doit être remis à la Direction Générale des Finances Publiques (DGFiP) dans les 15 jours suivant la réception d'un avis de vérification comptable. Il peut également être demandé dans le cadre d'un examen de comptabilité à distance (ECD), une procédure de contrôle fiscal introduite en 2017 qui permet à l'administration de contrôler vos comptes sans se déplacer dans votre entreprise.
            </p>
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <p style={{ color: '#14532d', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>En résumé</p>
              <p style={{ color: '#166534', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                Le FEC est un fichier texte délimité (généralement par tabulation ou point-virgule) qui liste toutes les écritures comptables de l'exercice avec leurs détails : journal, date, compte, libellé, montants débit et crédit. C'est la "trace numérique" complète de votre comptabilité.
              </p>
            </div>
          </section>

          <section id="obligation" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #059669' }}>
              2. Qui est concerné par l'obligation FEC ?
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              L'obligation FEC s'applique à <strong>toutes les entreprises qui tiennent leur comptabilité avec un outil informatique</strong> — ce qui concerne la quasi-totalité des PME françaises en 2026. Sont concernés :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { checked: true, label: 'Les sociétés commerciales (SARL, SAS, SA, SNC) soumises à l\'IS ou à l\'IR' },
                { checked: true, label: 'Les entreprises individuelles au régime réel (BIC, BNC)' },
                { checked: true, label: 'Les associations soumises aux impôts commerciaux' },
                { checked: true, label: 'Les holdings et groupes de sociétés' },
                { checked: false, label: 'Les micro-entrepreneurs en franchise de base TVA (non concernés)' },
                { checked: false, label: 'Les entreprises tenant leur comptabilité exclusivement sur papier (non concernées mais très rares)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', backgroundColor: 'white', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.checked ? '✓' : '✗'}</span>
                  <span style={{ color: item.checked ? '#1e293b' : '#94a3b8', fontSize: '14px', lineHeight: 1.5 }}>{item.label}</span>
                </div>
              ))}
            </div>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8 }}>
              En pratique, si vous utilisez un logiciel de comptabilité, un tableur Excel pour gérer vos comptes ou un ERP, vous êtes soumis à l'obligation FEC. La DGFiP a durci ses contrôles sur ce point depuis 2022 et la quasi-totalité des vérifications comptables débutent désormais par une demande de FEC.
            </p>
          </section>

          <section id="champs" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #059669' }}>
              3. Les 18 champs obligatoires du FEC
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>
              Le FEC doit contenir exactement 18 champs pour chaque écriture comptable, dans l'ordre défini par l'arrêté du 29 juillet 2013. Voici leur description :
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '10px', marginBottom: '24px' }}>
              {[
                { champ: 'JournalCode', type: 'Texte', desc: 'Code alphanumérique du journal comptable (ex: ACH, VTE, BQ)' },
                { champ: 'JournalLib', type: 'Texte', desc: 'Libellé du journal (ex: Achats, Ventes, Banque)' },
                { champ: 'EcritureNum', type: 'Texte', desc: 'Numéro séquentiel et unique de l\'écriture dans le journal' },
                { champ: 'EcritureDate', type: 'Date', desc: 'Date de l\'écriture au format YYYYMMDD' },
                { champ: 'CompteNum', type: 'Texte', desc: 'Numéro de compte du plan comptable général (PCG)' },
                { champ: 'CompteLib', type: 'Texte', desc: 'Libellé du compte (ex: Fournisseurs, Clients, TVA collectée)' },
                { champ: 'CompAuxNum', type: 'Texte', desc: 'Numéro du compte auxiliaire (tiers) — vide si non applicable' },
                { champ: 'CompAuxLib', type: 'Texte', desc: 'Libellé du compte auxiliaire — vide si non applicable' },
                { champ: 'PieceRef', type: 'Texte', desc: 'Référence de la pièce justificative (numéro de facture)' },
                { champ: 'PieceDate', type: 'Date', desc: 'Date de la pièce justificative au format YYYYMMDD' },
                { champ: 'EcritureLib', type: 'Texte', desc: 'Libellé de l\'écriture comptable' },
                { champ: 'Debit', type: 'Nombre', desc: 'Montant au débit (avec 2 décimales, séparateur virgule ou point)' },
                { champ: 'Credit', type: 'Nombre', desc: 'Montant au crédit (avec 2 décimales)' },
                { champ: 'EcritureLet', type: 'Texte', desc: 'Lettrage de l\'écriture — vide si non lettré' },
                { champ: 'DateLet', type: 'Date', desc: 'Date de lettrage — vide si non lettré' },
                { champ: 'ValidDate', type: 'Date', desc: 'Date de validation de l\'écriture dans le logiciel comptable' },
                { champ: 'Montantdevise', type: 'Nombre', desc: 'Montant en devise étrangère — vide si opération en euros' },
                { champ: 'Idevise', type: 'Texte', desc: 'Code ISO de la devise (ex: USD, GBP) — vide si euros' },
              ].map((f) => (
                <div key={f.champ} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#059669', fontWeight: 700 }}>{f.champ}</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8', backgroundColor: '#f1f5f9', padding: '1px 8px', borderRadius: '10px' }}>{f.type}</span>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '20px' }}>
              <p style={{ color: '#9a3412', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>⚠️ Points de vigilance techniques</p>
              <p style={{ color: '#c2410c', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                Le FEC doit utiliser le séparateur de champs tabulation (ou pipe |), l'encodage ISO 8859-1 ou UTF-8 sans BOM, et respecter l'ordre exact des 18 colonnes. Un FEC avec des colonnes manquantes ou dans le mauvais ordre sera rejeté par l'outil de vérification Test Compta Demat de la DGFiP.
              </p>
            </div>
          </section>

          <section id="sanctions" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #059669' }}>
              4. Sanctions en cas de FEC non conforme
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '24px' }}>
              Les sanctions pour absence ou non-conformité du FEC sont définies par l'article 1729 D du Code Général des Impôts. Elles sont progressives selon la gravité du manquement :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {[
                { niveau: 'Niveau 1', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', sanction: 'Amende forfaitaire de 5 000€', condition: 'FEC absent, remis hors délai ou dans un format non conforme' },
                { niveau: 'Niveau 2', color: '#ef4444', bg: '#fff1f2', border: '#fecaca', sanction: '10% des droits rappelés', condition: 'Si la rectification résultant de l\'examen du FEC entraîne un redressement fiscal. Le montant le plus élevé entre 5 000€ et 10% s\'applique.' },
                { niveau: 'Niveau 3', color: '#dc2626', bg: '#fff1f2', border: '#fca5a5', sanction: '40% des droits rappelés', condition: 'En cas de manquement délibéré — par exemple si l\'administration prouve que le FEC a été falsifié ou que des écritures ont été supprimées.' },
                { niveau: 'Niveau 4', color: '#7f1d1d', bg: '#fef2f2', border: '#f87171', sanction: '80% + intérêts de retard', condition: 'En cas de manœuvres frauduleuses avérées. Des poursuites pénales pour fraude fiscale peuvent s\'ajouter.' },
              ].map((s) => (
                <div key={s.niveau} style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ backgroundColor: s.color, color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', flexShrink: 0, whiteSpace: 'nowrap' }}>{s.niveau}</div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: s.color, marginBottom: '4px' }}>{s.sanction}</div>
                    <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>{s.condition}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8 }}>
              Des intérêts de retard de <strong>0.20% par mois</strong> (2.4% par an) s'ajoutent systématiquement aux droits rappelés. La DGFiP dispose d'un délai de reprise de 3 ans (6 ans en cas de fraude) pour réclamer ces montants.
            </p>
          </section>

          <section id="generation" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #059669' }}>
              5. Comment générer son FEC automatiquement ?
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              En 2026, la génération du FEC peut se faire de plusieurs manières selon votre organisation comptable :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
              {[
                { n: '01', color: '#059669', title: 'Via votre logiciel comptable', desc: "Si vous utilisez Sage, EBP, Cegid, QuickBooks ou Pennylane, ces logiciels intègrent nativement une fonctionnalité d'export FEC. Rendez-vous dans le menu 'Clôture', 'Export' ou 'Outils' et cherchez l'option 'Export FEC DGFiP'. Le fichier généré est normalement conforme, mais il est conseillé de le vérifier avec l'outil Test Compta Demat." },
                { n: '02', color: '#2563eb', title: 'Via un logiciel de facturation IA', desc: "Des solutions comme InvoiceAgent génèrent le FEC directement depuis les factures PDF traitées par IA. Cette approche est particulièrement adaptée aux PME qui souhaitent automatiser l'ensemble de la chaîne — de l'extraction des factures à la génération du FEC — sans ressaisie manuelle." },
                { n: '03', color: '#7c3aed', title: 'Via votre expert-comptable', desc: "Votre expert-comptable peut générer le FEC depuis son propre logiciel comptable à partir des données que vous lui transmettez. Cette option est la plus sûre mais aussi la plus coûteuse. L'export FEC automatique depuis vos propres outils lui simplifie considérablement le travail." },
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
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '20px' }}>
              <p style={{ color: '#14532d', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>✓ Vérification avec Test Compta Demat</p>
              <p style={{ color: '#166534', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                La DGFiP met à disposition gratuitement l'outil <strong>Test Compta Demat</strong> pour vérifier la conformité de votre FEC avant de le transmettre. Cet outil vérifie le format, la présence des 18 colonnes, l'encodage et la cohérence arithmétique des écritures. Il est fortement conseillé de l'utiliser avant tout contrôle fiscal.
              </p>
            </div>
          </section>

          <section id="logiciels" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #059669' }}>
              6. Compatibilité avec les logiciels comptables
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Le FEC au format standard DGFiP est compatible avec tous les logiciels comptables du marché français. Voici les principales solutions et leur niveau de compatibilité :
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              {[
                { name: 'Sage 50 / 100', compat: 'Natif', color: '#059669' },
                { name: 'EBP Compta', compat: 'Natif', color: '#059669' },
                { name: 'Cegid', compat: 'Natif', color: '#059669' },
                { name: 'QuickBooks', compat: 'Import FEC', color: '#2563eb' },
                { name: 'Pennylane', compat: 'Natif', color: '#059669' },
                { name: 'Coala', compat: 'Natif', color: '#059669' },
                { name: 'ACD Compta', compat: 'Natif', color: '#059669' },
                { name: 'Ciel Compta', compat: 'Import FEC', color: '#2563eb' },
              ].map((l) => (
                <div key={l.name} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{l.name}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: l.color, backgroundColor: `${l.color}15`, padding: '2px 8px', borderRadius: '10px' }}>{l.compat}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="bonnes-pratiques" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #059669' }}>
              7. Bonnes pratiques pour maintenir un FEC conforme
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              La conformité du FEC ne se prépare pas au moment du contrôle fiscal — elle se construit tout au long de l'exercice comptable. Voici les bonnes pratiques à adopter :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                "Saisissez toutes vos écritures dans votre logiciel comptable au fur et à mesure — évitez les saisies groupées en fin d'année",
                "Conservez toutes les pièces justificatives (factures, reçus, bons de commande) pendant 10 ans conformément au Code de Commerce",
                "Vérifiez régulièrement la cohérence de vos écritures : la somme des débits doit toujours être égale à la somme des crédits",
                "Générez et vérifiez votre FEC avec Test Compta Demat au moins une fois par trimestre",
                "Ne modifiez jamais une écriture validée — créez plutôt une écriture d'annulation et de contre-passation",
                "Sauvegardez votre FEC à chaque clôture mensuelle et annuelle dans un espace sécurisé",
                "En cas de migration de logiciel comptable, assurez-vous que les données historiques sont correctement reprises dans le nouveau FEC",
              ].map((bp, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', backgroundColor: 'white', padding: '14px 18px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ color: '#059669', flexShrink: 0, fontWeight: 700 }}>→</span>
                  <span style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>{bp}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', borderRadius: '16px', padding: '32px', color: 'white' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>Générez votre FEC automatiquement avec InvoiceAgent</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                InvoiceAgent génère automatiquement votre FEC DGFiP depuis vos factures PDF. Conforme à l'arrêté du 29 juillet 2013, compatible Sage, EBP et Cegid. Disponible dès le plan Pro à 29€/mois.
              </p>
              <a href={`${BASE_URL}/export-fec-comptable`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none' }}>
                En savoir plus sur l'export FEC →
              </a>
            </div>
          </section>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>Articles connexes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {[
                { slug: 'automatiser-facturation-pme-2026', title: 'Comment automatiser sa facturation en 2026', category: 'Facturation', color: '#6366f1' },
                { slug: 'reconciliation-bancaire-csv-guide', title: 'Réconciliation bancaire CSV : tout ce qu\'il faut savoir', category: 'Banque', color: '#2563eb' },
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