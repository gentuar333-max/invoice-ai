import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const SLUG = 'ocr-factures-comment-ca-marche'
const PAGE_URL = `${BASE_URL}/blog/${SLUG}`

export const metadata: Metadata = {
  title: 'OCR Factures : Comment Fonctionne l\'Extraction Automatique par IA | InvoiceAgent',
  description: "Comprendre l'OCR appliqué aux factures : reconnaissance optique, IA Gemini, extraction SIRET, TVA, montants. Guide technique complet pour PME françaises 2026.",
  keywords: ['OCR factures', 'extraction automatique facture PDF', 'OCR IA facture France', 'reconnaissance optique facture', 'traitement automatique factures PME'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'OCR Factures : Comment Fonctionne l\'Extraction par IA', description: "Guide complet sur l'OCR appliqué aux factures : technologie, précision, cas d'usage.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'article' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaArticle = {
  '@context': 'https://schema.org', '@type': 'Article',
  headline: 'OCR Factures : Comment Fonctionne l\'Extraction Automatique par IA',
  author: { '@type': 'Organization', name: 'InvoiceAgent' },
  publisher: { '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL },
  datePublished: '2026-03-15', dateModified: '2026-03-15',
  url: PAGE_URL,
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
    { '@type': 'ListItem', position: 3, name: 'OCR Factures', item: PAGE_URL },
  ],
}

export default function ArticleOCRFactures() {
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
              <span style={{ backgroundColor: '#f3e8ff', color: '#7c3aed', fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px' }}>Technologie</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>15 mars 2026</span>
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>· 6 min de lecture</span>
            </div>
            <h1 style={{ fontSize: '38px', fontWeight: 'bold', color: '#1e293b', lineHeight: 1.2, marginBottom: '20px' }}>
              OCR factures : comment fonctionne l'extraction automatique par IA
            </h1>
            <p style={{ fontSize: '18px', color: '#64748b', lineHeight: 1.7 }}>
              L'OCR appliqué aux factures permet d'extraire automatiquement toutes les données comptables d'un PDF en quelques secondes. En 2026, les modèles d'IA multimodaux comme Google Gemini atteignent des taux de précision supérieurs à 98% sur les factures françaises. Voici comment cela fonctionne.
            </p>
          </div>
        </section>

        <article style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 20px 80px' }}>

          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Table des matières</h2>
            {[
              { anchor: '#definition', label: '1. Qu\'est-ce que l\'OCR ?' },
              { anchor: '#evolution', label: '2. De l\'OCR classique à l\'IA multimodale' },
              { anchor: '#processus', label: '3. Le processus d\'extraction d\'une facture' },
              { anchor: '#donnees', label: '4. Quelles données sont extraites ?' },
              { anchor: '#precision', label: '5. Précision et limites de l\'OCR factures' },
              { anchor: '#types', label: '6. OCR sur PDF natif vs scan vs photo' },
              { anchor: '#utilisation', label: '7. Comment utiliser l\'OCR dans votre workflow' },
            ].map((item) => (
              <a key={item.anchor} href={item.anchor} style={{ display: 'block', color: '#6366f1', fontSize: '14px', textDecoration: 'none', padding: '4px 0', lineHeight: 1.5 }}>{item.label}</a>
            ))}
          </div>

          <section id="definition" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #7c3aed' }}>
              1. Qu'est-ce que l'OCR ?
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              L'OCR (Optical Character Recognition — reconnaissance optique de caractères) est une technologie qui convertit des images contenant du texte en données textuelles exploitables par un ordinateur. Appliqué aux factures, l'OCR permet de transformer un PDF ou une photo de facture en données structurées : fournisseur, montants, TVA, dates.
            </p>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              La technologie OCR existe depuis les années 1990, mais son application aux documents financiers a longtemps souffert de limitations importantes : dépendance aux modèles de factures prédéfinis, faible tolérance aux variations de mise en page, incapacité à traiter les scans de mauvaise qualité. Ces limitations ont été surmontées avec l'émergence des modèles d'intelligence artificielle multimodaux en 2023-2024.
            </p>
            <div style={{ backgroundColor: '#faf5ff', border: '1px solid #ddd6fe', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <p style={{ color: '#4c1d95', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>Définition simple</p>
              <p style={{ color: '#5b21b6', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                L'OCR factures, c'est comme donner une facture à un comptable ultra-rapide qui lit le document et recopie toutes les informations importantes dans un tableau structuré — en moins de 5 secondes, avec une précision de 98%.
              </p>
            </div>
          </section>

          <section id="evolution" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #7c3aed' }}>
              2. De l'OCR classique à l'IA multimodale
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              L'évolution des technologies d'extraction de factures a connu trois générations distinctes :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {[
                { generation: 'Génération 1 — OCR classique (1990-2015)', color: '#94a3b8', desc: "L'OCR classique se basait sur la reconnaissance de caractères pixel par pixel. Il nécessitait des templates prédéfinis : la facture devait avoir exactement la même mise en page pour être correctement traitée. Toute variation de format ou de qualité d'image entraînait des erreurs. Taux de précision : 60-75% sur des factures variées.", limite: "Nécessite des templates par fournisseur. Échoue sur les scans et photos." },
                { generation: 'Génération 2 — OCR avec ML (2015-2022)', color: '#2563eb', desc: "L'introduction du machine learning a permis d'éliminer les templates prédéfinis. Les modèles apprennent à identifier les zones de données (montants, dates, fournisseurs) quelle que soit leur position dans la facture. Taux de précision : 85-92% sur des factures françaises standards.", limite: "Encore sensible à la qualité du scan. Difficultés avec les tableaux complexes." },
                { generation: 'Génération 3 — IA multimodale (2023-présent)', color: '#7c3aed', desc: "Les modèles de vision multimodaux (Google Gemini, GPT-4 Vision) comprennent le contenu sémantique du document, pas seulement ses pixels. Ils peuvent lire une facture floue, en angle, partiellement masquée et en extraire les données avec une compréhension contextuelle. Taux de précision : 97-99% sur les factures françaises.", limite: "Coût de traitement plus élevé, nécessite une connexion API." },
              ].map((g) => (
                <div key={g.generation} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: g.color, marginBottom: '12px' }}>{g.generation}</div>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.7, marginBottom: '10px' }}>{g.desc}</p>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}>Limite : {g.limite}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="processus" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #7c3aed' }}>
              3. Le processus d'extraction d'une facture
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Voici les étapes techniques qui se déroulent lorsqu'une facture PDF est soumise à un système d'extraction IA comme InvoiceAgent :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {[
                { n: '01', color: '#7c3aed', title: 'Prétraitement du document', desc: "Le PDF est converti en image haute résolution (300+ DPI). Si le document est un PDF natif, le texte est extrait directement sans conversion d'image, ce qui améliore la précision. Les pages multiples sont traitées individuellement." },
                { n: '02', color: '#2563eb', title: 'Analyse de la mise en page', desc: "L'IA identifie les zones du document : en-tête, corps de la facture, tableau de lignes, pied de page. Elle détecte la langue et le type de document avant d'extraire les données." },
                { n: '03', color: '#059669', title: 'Extraction des champs', desc: "Chaque zone identifiée est analysée pour extraire les données structurées : numéro de facture, dates, informations fournisseur, tableau des lignes, montants HT/TVA/TTC. L'IA valide la cohérence arithmétique et signale les incohérences." },
                { n: '04', color: '#d97706', title: 'Structuration et validation', desc: "Les données extraites sont organisées dans un format JSON structuré. Les champs manquants ou illisibles sont explicitement identifiés pour correction manuelle. Le résultat est retourné en moins de 5 secondes." },
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
          </section>

          <section id="donnees" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #7c3aed' }}>
              4. Quelles données sont extraites ?
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Un système d'OCR factures moderne extrait les données suivantes depuis chaque document :
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { categorie: 'Données fournisseur', color: '#7c3aed', champs: ['Raison sociale', 'Adresse complète', 'Numéro SIRET (14 chiffres)', 'Numéro de TVA intracommunautaire', 'Coordonnées (téléphone, email)'] },
                { categorie: 'Données de facturation', color: '#2563eb', champs: ['Numéro de facture', 'Date d\'émission', 'Date d\'échéance', 'Conditions de paiement', 'Référence bon de commande'] },
                { categorie: 'Données financières', color: '#059669', champs: ['Montant total HT', 'Taux de TVA (5.5%, 10% ou 20%)', 'Montant TVA', 'Montant total TTC', 'Remises et escomptes'] },
                { categorie: 'Lignes de détail', color: '#d97706', champs: ['Description de chaque article/service', 'Quantité', 'Prix unitaire HT', 'Total par ligne', 'Codes produits/références'] },
              ].map((cat) => (
                <div key={cat.categorie} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: cat.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>{cat.categorie}</div>
                  <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                    {cat.champs.map((c) => (
                      <li key={c} style={{ color: '#475569', fontSize: '13px', lineHeight: 1.7, marginBottom: '4px' }}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="precision" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #7c3aed' }}>
              5. Précision et limites de l'OCR factures
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
              Les systèmes d'OCR basés sur l'IA multimodale atteignent des taux de précision élevés, mais leur performance varie selon la qualité du document source :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {[
                { type: 'PDF natif (généré par logiciel)', precision: '99%', couleur: '#059669', barre: 99 },
                { type: 'PDF scanné haute qualité (300+ DPI)', precision: '97%', couleur: '#2563eb', barre: 97 },
                { type: 'Photo smartphone bonne qualité', precision: '95%', couleur: '#7c3aed', barre: 95 },
                { type: 'Photo smartphone qualité moyenne', precision: '90%', couleur: '#d97706', barre: 90 },
                { type: 'Scan faible résolution ou document froissé', precision: '80%', couleur: '#dc2626', barre: 80 },
              ].map((item) => (
                <div key={item.type} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500 }}>{item.type}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: item.couleur }}>{item.precision}</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.barre}%`, backgroundColor: item.couleur, borderRadius: '3px' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '20px' }}>
              <p style={{ color: '#14532d', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>Conseil pour optimiser la précision</p>
              <p style={{ color: '#166534', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                Pour les factures photographiées, assurez-vous que le document est bien éclairé, posé à plat, et que toutes les informations sont visibles dans le cadre. Une résolution minimale de 1080p est recommandée. Les systèmes modernes signalent clairement les champs incertains pour correction manuelle.
              </p>
            </div>
          </section>

          <section id="types" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #7c3aed' }}>
              6. OCR sur PDF natif vs scan vs photo
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { type: 'PDF natif', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', desc: "Généré directement par un logiciel. Le texte est vectoriel et directement lisible. Traitement le plus rapide et le plus précis.", usages: ['Factures reçues par email', 'Exports de logiciels comptables', 'Factures dématérialisées'] },
                { type: 'Scan PDF', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', desc: "Document papier numérisé. La qualité dépend du scanner. 300 DPI recommandé.", usages: ['Factures papier reçues par courrier', 'Archives historiques numérisées', 'Documents multi-pages'] },
                { type: 'Photo smartphone', color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', desc: "Capture rapide depuis le terrain. Qualité variable selon l'éclairage. Idéal pour artisans et travailleurs mobiles.", usages: ['Reçus et notes de frais', 'Factures sur chantier', 'Bons de livraison'] },
              ].map((t) => (
                <div key={t.type} style={{ backgroundColor: t.bg, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: t.color, marginBottom: '10px' }}>{t.type}</div>
                  <p style={{ color: '#475569', fontSize: '13px', lineHeight: 1.6, marginBottom: '14px' }}>{t.desc}</p>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: t.color, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cas d'usage</div>
                  <ul style={{ margin: 0, padding: '0 0 0 14px' }}>
                    {t.usages.map((u) => (
                      <li key={u} style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.6, marginBottom: '3px' }}>{u}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="utilisation" style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', paddingBottom: '12px', borderBottom: '2px solid #7c3aed' }}>
              7. Comment utiliser l'OCR dans votre workflow
            </h2>
            <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
              L'intégration de l'OCR factures dans votre workflow comptable permet d'éliminer la saisie manuelle et de réduire significativement le temps consacré à la comptabilité.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {[
                { etape: '1. Centraliser la réception des factures', detail: "Définissez un processus unique : toutes les factures fournisseurs arrivent soit par email en PDF, soit sont photographiées immédiatement à réception. Évitez les factures papier conservées en vrac." },
                { etape: '2. Traiter les factures régulièrement', detail: "Importez vos factures de manière régulière — idéalement hebdomadaire. Un traitement mensuel groupé est plus difficile à gérer et augmente le risque d'oubli." },
                { etape: '3. Vérifier les données extraites', detail: "Même avec un taux de précision de 98%, vérifiez rapidement les données extraites, notamment les montants TTC et les numéros SIRET. Les systèmes mettent en évidence les champs à faible confiance." },
                { etape: '4. Exporter vers votre comptabilité', detail: "Une fois les données validées, exportez-les vers votre logiciel comptable via FEC, CSV ou intégration directe. Cette étape garantit que toutes vos factures sont enregistrées correctement." },
              ].map((item, i) => (
                <div key={i} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px 20px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{item.etape}</div>
                  <div style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{item.detail}</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', borderRadius: '16px', padding: '32px', color: 'white' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: 'white' }}>Extraction OCR par IA avec InvoiceAgent</h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                InvoiceAgent utilise Google Gemini pour extraire automatiquement les données de vos factures PDF, scans et photos smartphone. Précision supérieure à 98% sur les factures françaises. Disponible dès 0€/mois.
              </p>
              <a href={`${BASE_URL}/extraction-facture-pdf`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '12px 28px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', textDecoration: 'none' }}>
                En savoir plus sur l'extraction PDF →
              </a>
            </div>
          </section>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>Articles connexes</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {[
                { slug: 'automatiser-facturation-pme-2026', title: 'Comment automatiser sa facturation en 2026', category: 'Facturation', color: '#6366f1' },
                { slug: 'fec-comptable-guide-pme', title: 'FEC comptable : guide complet pour PME', category: 'Comptabilité', color: '#059669' },
                { slug: 'reconciliation-bancaire-csv-guide', title: 'Réconciliation bancaire CSV : tout ce qu\'il faut savoir', category: 'Banque', color: '#2563eb' },
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