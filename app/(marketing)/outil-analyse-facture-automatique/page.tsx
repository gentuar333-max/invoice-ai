 
import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/outil-analyse-facture-automatique`

export const metadata: Metadata = {
  title: 'Outil analyse facture automatique par IA — Extraction en 30s | InvoiceAgent',
  description: "Outil d'analyse de factures automatique par IA. Importez vos factures PDF, l'IA extrait fournisseur, montants, TVA et dates en moins de 30 secondes. Gratuit.",
  keywords: ['outil analyse facture automatique', 'analyser facture IA', 'extraction facture automatique', 'logiciel analyse facture PDF', 'scanner facture automatique'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Outil analyse facture automatique — InvoiceAgent', description: "Importez vos factures PDF, l'IA extrait toutes les données automatiquement en 30 secondes.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment fonctionne un outil d'analyse de facture automatique ?", acceptedAnswer: { '@type': 'Answer', text: "Un outil d'analyse de facture automatique utilise l'IA pour lire le PDF de votre facture et extraire automatiquement les données clés : fournisseur, SIRET, numéro de facture, date, montants HT/TVA/TTC et lignes de détail. Le traitement prend moins de 30 secondes." } },
    { '@type': 'Question', name: "Quel est le taux de précision d'un outil IA sur les factures ?", acceptedAnswer: { '@type': 'Answer', text: "Les meilleurs outils d'analyse de factures par IA atteignent un taux de précision de 95 à 98% sur les factures françaises en format PDF natif. Sur les factures scannées ou photographiées, la précision peut être légèrement inférieure selon la qualité du document." } },
    { '@type': 'Question', name: "L'outil fonctionne-t-il sur les factures manuscrites ou scannées ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent traite les factures PDF natifs, les scans et les photos prises avec un smartphone. Les champs non lisibles sont identifiés pour correction manuelle. La qualité minimale recommandée est 300 DPI pour les scans." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Outil analyse facture automatique', item: PAGE_URL },
  ],
}

export default function OutilAnalyseFacturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', color: 'white', padding: '80px 20px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px' }}>
              Extraction IA — Factures PDF
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: 1.15 }}>
              Outil d'analyse de facture automatique <span style={{ color: '#fbbf24' }}>par IA</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '16px', maxWidth: '620px', margin: '0 auto 16px' }}>
              Importez vos factures PDF. L'IA extrait fournisseur, montants, TVA, dates et lignes de detail en moins de 30 secondes. Precision 98% sur factures françaises.
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '36px' }}>Compatible PDF natif, scans et photos smartphone</p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`${BASE_URL}/auth/login`} style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
                Tester gratuitement — 5 factures
              </a>
              <a href="#fonctionnement" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
                Comment ca marche
              </a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ backgroundColor: 'white', padding: '40px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', textAlign: 'center' }}>
            {[
              { value: '< 30s', label: 'Par facture analysee', sub: 'Vs 5-10 min en manuel' },
              { value: '98%', label: 'Precision extraction', sub: 'Sur factures françaises PDF' },
              { value: '8', label: 'Champs extraits', sub: 'Fournisseur, TVA, dates...' },
              { value: '0€', label: 'Pour commencer', sub: '5 factures gratuites' },
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

          {/* DONNEES EXTRAITES */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Quelles donnees l'IA extrait de vos factures ?
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
              InvoiceAgent extrait automatiquement l'ensemble des informations necessaires pour la comptabilite française.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {[
                { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', title: 'Donnees fournisseur', items: ['Raison sociale complete', 'Numero SIRET (14 chiffres)', 'Numero TVA intracommunautaire', 'Adresse complete'] },
                { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', title: 'Donnees financieres', items: ['Montant HT', 'Taux et montant TVA', 'Montant TTC', 'Devise'] },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', title: 'Donnees temporelles', items: ["Numero de facture", "Date d'emission", "Date d'echeance", 'Conditions de paiement'] },
                { color: '#d97706', bg: '#fffbeb', border: '#fde68a', title: 'Lignes de detail', items: ['Description de chaque ligne', 'Quantite et prix unitaire', 'Total par ligne', 'Classification automatique'] },
              ].map((cat) => (
                <div key={cat.title} style={{ backgroundColor: cat.bg, border: `1px solid ${cat.border}`, borderRadius: '14px', padding: '22px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: cat.color, marginBottom: '14px' }}>{cat.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {cat.items.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#475569', padding: '5px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', alignItems: 'center' }}>
                        <span style={{ color: cat.color, flexShrink: 0, fontWeight: 700 }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FONCTIONNEMENT */}
          <section id="fonctionnement" style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>
              Comment fonctionne l'analyse automatique ?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { n: '01', color: '#2563eb', title: 'Importez votre facture', desc: "Glissez-deposez votre fichier PDF dans InvoiceAgent, ou importez une photo prise avec votre smartphone. Le systeme accepte les PDF natifs, les scans et les images JPG/PNG jusqu'a 10 Mo." },
                { n: '02', color: '#7c3aed', title: "L'IA analyse le document", desc: "Le moteur IA Gemini lit l'integralite du document et extrait chaque champ avec un score de confiance. Le traitement prend moins de 30 secondes, meme pour les factures multi-pages." },
                { n: '03', color: '#059669', title: 'Verifiez et corrigez', desc: "Les donnees extraites sont presentees pour validation. Les champs non detectes ou incertains sont clairement identifies. Vous pouvez corriger directement avant d'enregistrer." },
                { n: '04', color: '#d97706', title: 'Enregistrez et exportez', desc: "La facture validee est enregistree dans votre comptabilite. Exportez en CSV, FEC DGFiP ou PDF rapport. Le rapprochement bancaire peut etre lance directement depuis cette etape." },
              ].map((step) => (
                <div key={step.n} style={{ backgroundColor: 'white', borderRadius: '14px', padding: '24px', border: '1px solid #e2e8f0', display: 'flex', gap: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: step.color, color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>{step.n}</div>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{step.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', borderRadius: '20px', padding: '40px 32px', color: 'white', marginBottom: '56px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '12px' }}>Analysez vos premieres factures gratuitement</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px' }}>
              5 factures gratuites. Aucune carte bancaire requise. Resultats en moins de 30 secondes.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Commencer gratuitement →
            </a>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '14px' }}>Sans engagement — RGPD conforme — Donnees hebergees en Europe</p>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>Questions frequentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { q: "Comment fonctionne un outil d'analyse de facture automatique ?", r: "Un outil d'analyse de facture automatique utilise l'IA pour lire le PDF de votre facture et extraire automatiquement les donnees cles : fournisseur, SIRET, numero de facture, date, montants HT/TVA/TTC et lignes de detail. Le traitement prend moins de 30 secondes." },
                { q: "Quel est le taux de précision d'un outil IA sur les factures ?", r: "Les meilleurs outils d'analyse de factures par IA atteignent un taux de precision de 95 a 98% sur les factures françaises en format PDF natif. Sur les factures scannees ou photographiees, la precision peut etre legerement inferieure selon la qualite du document." },
                { q: "L'outil fonctionne-t-il sur les factures manuscrites ou scannées ?", r: "Oui. InvoiceAgent traite les factures PDF natifs, les scans et les photos prises avec un smartphone. Les champs non lisibles sont identifies pour correction manuelle. La qualite minimale recommandee est 300 DPI pour les scans." },
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
                { label: 'Detecter erreur facture PDF', href: `${BASE_URL}/comment-detecter-erreur-facture-pdf` },
                { label: 'Erreurs facture frequentes PME', href: `${BASE_URL}/erreurs-facture-frequentes-pme` },
                { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
                { label: 'Controle facture automatise', href: `${BASE_URL}/controle-facture-automatise` },
                { label: 'Logiciel comptabilite PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
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