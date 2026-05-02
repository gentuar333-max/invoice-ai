 
import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/logiciel-rapprochement-bancaire-automatique`

export const metadata: Metadata = {
  title: 'Logiciel rapprochement bancaire automatique PME 2026 | InvoiceAgent',
  description: "Logiciel de rapprochement bancaire automatique pour PME françaises. Importez votre CSV bancaire, l'IA rapproche chaque transaction avec vos factures en quelques secondes.",
  keywords: ['logiciel rapprochement bancaire automatique', 'réconciliation bancaire automatique PME', 'logiciel rapprochement bancaire France', 'automatiser rapprochement bancaire', 'matching facture transaction automatique'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Logiciel rapprochement bancaire automatique — InvoiceAgent', description: "Importez votre CSV bancaire, l'IA rapproche chaque transaction avec vos factures automatiquement.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL }
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Rapprochement bancaire automatique',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, url: BASE_URL,
}
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment fonctionne le rapprochement bancaire automatique ?", acceptedAnswer: { '@type': 'Answer', text: "Le logiciel importe votre fichier CSV depuis votre banque et compare chaque transaction avec vos factures enregistrées selon trois critères : le montant, la date et le libellé. Chaque correspondance reçoit un score de confiance. Les transactions à score élevé sont validées automatiquement." } },
    { '@type': 'Question', name: "Quelles banques françaises sont compatibles ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent est compatible avec tous les fichiers CSV des principales banques françaises : BNP Paribas, Société Générale, Crédit Agricole, LCL, CIC, Boursorama, La Banque Postale et la plupart des néobanques professionnelles." } },
    { '@type': 'Question', name: "Quel est le taux de matching automatique ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent atteint un taux de matching automatique de 95% sur les transactions françaises. Les 5% restants sont présentés pour validation manuelle avec la meilleure correspondance suggérée." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Logiciel rapprochement bancaire automatique', item: PAGE_URL },
  ],
}

export default function LogicielRapprochementBancairePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 100%)', color: 'white', padding: '80px 20px 64px', textAlign: 'center' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px' }}>
              Rapprochement bancaire — Solution automatique
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: 1.15 }}>
              Logiciel de rapprochement bancaire <span style={{ color: '#34d399' }}>automatique pour PME</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '620px', margin: '0 auto 36px' }}>
              Importez votre relevé CSV depuis votre banque. L'IA rapproche chaque transaction avec vos factures en quelques secondes. Compatible toutes banques françaises.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`${BASE_URL}/auth/login`} style={{ backgroundColor: '#34d399', color: '#064e3b', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
                Tester gratuitement
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
              { value: '95%', label: 'Matching automatique', sub: 'Sur transactions françaises' },
              { value: '< 30s', label: 'Par mois de transactions', sub: 'Vs 3h en manuel' },
              { value: '6', label: 'Banques compatibles', sub: 'BNP, SG, CA, LCL, CIC...' },
              { value: '0€', label: 'Pour commencer', sub: 'Sans carte bancaire' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 20px 80px' }}>

          {/* FONCTIONNEMENT */}
          <section id="fonctionnement" style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Comment fonctionne le rapprochement bancaire automatique ?
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
              Le processus de rapprochement automatique repose sur trois etapes simples, entierement gerees par l'IA.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {[
                { n: '01', color: '#059669', title: 'Exportez votre CSV depuis votre banque', desc: "Depuis votre espace bancaire en ligne, exportez l'historique de vos transactions au format CSV. Toutes les banques françaises proposent cette option : BNP Paribas, Société Générale, Crédit Agricole, LCL, CIC, Boursorama. La période recommandée est un mois complet." },
                { n: '02', color: '#2563eb', title: "Importez le CSV dans InvoiceAgent", desc: "Glissez-deposez votre fichier CSV dans InvoiceAgent. Le logiciel normalise automatiquement les colonnes quelle que soit la banque source — date, libelle, debit, credit. Aucune configuration manuelle n'est necessaire." },
                { n: '03', color: '#7c3aed', title: "L'IA rapproche chaque transaction", desc: "Pour chaque transaction, l'IA analyse le montant, la date et le libelle et recherche la facture correspondante parmi vos factures enregistrees. Chaque correspondance recoit un score de confiance. Les transactions a score eleve sont validees automatiquement." },
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

          {/* BANQUES */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Compatible avec toutes les banques françaises
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.7, marginBottom: '28px' }}>
              InvoiceAgent accepte les fichiers CSV de l'ensemble des banques françaises, sans configuration specifique.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              {[
                { banque: 'BNP Paribas', format: 'CSV separateur point-virgule', color: '#059669' },
                { banque: 'Société Générale', format: 'CSV ou OFX', color: '#dc2626' },
                { banque: 'Crédit Agricole', format: 'CSV colonnes standard', color: '#15803d' },
                { banque: 'LCL', format: 'CSV export operations', color: '#1d4ed8' },
                { banque: 'CIC', format: 'CSV releve mensuel', color: '#7c3aed' },
                { banque: 'Boursorama', format: 'CSV historique compte', color: '#0891b2' },
              ].map((b) => (
                <div key={b.banque} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 18px' }}>
                  <div style={{ width: '8px', height: '8px', backgroundColor: b.color, borderRadius: '50%', marginBottom: '8px' }} />
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{b.banque}</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>{b.format}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '18px 20px' }}>
              <p style={{ color: '#166534', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                <strong>Votre banque n'est pas dans la liste ?</strong> InvoiceAgent accepte tout fichier CSV contenant au minimum les colonnes Date, Libelle et Montant. Le format exact est détecté automatiquement.
              </p>
            </div>
          </section>

          {/* AVANTAGES */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>
              Pourquoi choisir un logiciel de rapprochement automatique ?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              {[
                { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', title: 'Gain de temps massif', desc: "Un rapprochement mensuel de 100 transactions prend en moyenne 3 heures en manuel. Avec l'automatisation, il se reduit a 5 minutes de validation des cas ambigus." },
                { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', title: 'Reduction des erreurs', desc: "Le taux d'erreur en traitement manuel est de 5% selon l'AICPA. L'automatisation ramene ce taux a moins de 1%, eliminant les risques d'erreur TVA ou de facture manquante." },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', title: 'Detection des impayes', desc: "Chaque facture non rapprochee apres la date d'echeance genere une alerte automatique. Vous detectez les impayes en temps reel, sans attendre la fin du mois." },
                { color: '#d97706', bg: '#fffbeb', border: '#fde68a', title: 'Conformite comptable', desc: "Un rapprochement bancaire complet et documente est indispensable pour la conformite FEC DGFiP et la preparation des declarations TVA mensuelles ou trimestrielles." },
              ].map((f) => (
                <div key={f.title} style={{ backgroundColor: f.bg, border: `1px solid ${f.border}`, borderRadius: '14px', padding: '24px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: f.color, marginBottom: '10px' }}>{f.title}</h3>
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', borderRadius: '20px', padding: '40px 32px', color: 'white', marginBottom: '56px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '12px' }}>Automatisez votre rapprochement bancaire</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px' }}>
              Importez votre CSV bancaire et obtenez un rapport de rapprochement complet en moins de 30 secondes.
            </p>
            <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#34d399', color: '#064e3b', padding: '14px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', textDecoration: 'none' }}>
              Commencer gratuitement →
            </a>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '14px' }}>5 factures gratuites — sans carte bancaire</p>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '28px' }}>Questions frequentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { q: "Comment fonctionne le rapprochement bancaire automatique ?", r: "Le logiciel importe votre fichier CSV depuis votre banque et compare chaque transaction avec vos factures enregistrees selon trois criteres : le montant, la date et le libelle. Chaque correspondance recoit un score de confiance. Les transactions a score eleve sont validees automatiquement." },
                { q: "Quelles banques françaises sont compatibles ?", r: "InvoiceAgent est compatible avec tous les fichiers CSV des principales banques françaises : BNP Paribas, Societe Generale, Credit Agricole, LCL, CIC, Boursorama, La Banque Postale et la plupart des neobanques professionnelles." },
                { q: "Quel est le taux de matching automatique ?", r: "InvoiceAgent atteint un taux de matching automatique de 95% sur les transactions françaises. Les 5% restants sont presentes pour validation manuelle avec la meilleure correspondance suggeree." },
                { q: "Puis-je importer plusieurs CSV en meme temps ?", r: "Oui. InvoiceAgent accepte l'import de plusieurs fichiers CSV successifs. Le systeme detecte et elimine automatiquement les transactions en double si les periodes exportees se chevauchent." },
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
                { label: 'Ecart rapprochement bancaire', href: `${BASE_URL}/ecart-rapprochement-bancaire-solution` },
                { label: 'Reconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Erreurs facture frequentes', href: `${BASE_URL}/erreurs-facture-frequentes-pme` },
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