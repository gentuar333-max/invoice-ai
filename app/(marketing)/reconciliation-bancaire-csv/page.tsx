import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/reconciliation-bancaire-csv`

export const metadata: Metadata = {
  title: 'Réconciliation Bancaire CSV Automatique par IA | InvoiceAgent',
  description: "Importez votre relevé bancaire CSV et laissez l'IA rapprocher automatiquement vos transactions et factures. Compatible BNP, SG, CA, LCL. Essai gratuit.",
  keywords: ['réconciliation bancaire CSV', 'rapprochement bancaire automatique', 'import CSV banque France', 'matching facture transaction', 'réconciliation comptable IA'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Réconciliation Bancaire CSV Automatique — InvoiceAgent', description: "Rapprochez automatiquement vos transactions bancaires CSV et factures par IA.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website', images: [{ url: `${BASE_URL}/og-reconciliation.png`, width: 1200, height: 630, alt: 'Réconciliation bancaire CSV' }] },
  twitter: { card: 'summary_large_image', title: 'Réconciliation Bancaire CSV — InvoiceAgent', description: "Rapprochement automatique transactions et factures. 95% de matching.", images: [`${BASE_URL}/og-reconciliation.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Réconciliation Bancaire CSV', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '64' } }
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment exporter mon relevé bancaire en CSV ?", acceptedAnswer: { '@type': 'Answer', text: "Connectez-vous à votre espace bancaire en ligne, rendez-vous dans l'historique des transactions et choisissez 'Exporter' au format CSV. Toutes les banques françaises (BNP, SG, CA, LCL, CIC) proposent cette fonctionnalité gratuitement." } },
    { '@type': 'Question', name: "Comment fonctionne le matching automatique ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent compare chaque transaction bancaire avec vos factures enregistrées. L'IA analyse le montant, la date et le libellé bancaire pour identifier les correspondances avec un score de confiance de 0 à 100%." } },
    { '@type': 'Question', name: "Que se passe-t-il si une transaction ne correspond à aucune facture ?", acceptedAnswer: { '@type': 'Answer', text: "Les transactions non rapprochées sont clairement identifiées dans votre dashboard. Vous pouvez les associer manuellement ou les marquer comme dépense non facturée." } },
    { '@type': 'Question', name: "La réconciliation est-elle conforme RGPD ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Données hébergées à Frankfurt (UE), chiffrées en transit et au repos, jamais partagées avec des tiers." } },
    { '@type': 'Question', name: "Puis-je exporter le rapport pour mon comptable ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. Le rapport de réconciliation est exportable en CSV et PDF. Le plan Pro inclut l'export FEC compatible Sage, EBP et Cegid." } },
    { '@type': 'Question', name: "Combien coûte la réconciliation bancaire automatique ?", acceptedAnswer: { '@type': 'Answer', text: "Plan gratuit : 1 rapprochement/mois. Starter : 19€/mois (illimité). Pro : 29€/mois (matching IA avancé + FEC)." } },
  ],
}
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Réconciliation Bancaire CSV', item: PAGE_URL }] }

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour tester', items: ['5 factures/mois', '1 rapprochement/mois', 'Dashboard complet', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer', featured: false },
  { name: 'Starter', monthly: 19, desc: 'TPE & Freelances', items: ['100 factures/mois', 'Import CSV toutes banques', 'Rapprochements illimités', 'Alertes impayées', 'Export CSV+PDF'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
  { name: 'Pro', monthly: 29, desc: 'PME & Comptables', items: ['Tout Starter inclus', 'Matching IA avancé', 'Score de confiance', '5 analyses contrats/mois', 'Export FEC natif'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Essai gratuit 14 jours', featured: true },
  { name: 'Business', monthly: 49, desc: 'Cabinets', items: ['Tout Pro inclus', 'Contrats illimités', 'Multi-clients', 'Audit trail RGPD', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

export default function ReconciliationBancaireCSVPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main>

        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Compatible BNP · SG · Crédit Agricole · LCL · CIC · Boursorama
            </div>
            <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Réconciliation bancaire CSV <span style={{ color: '#fbbf24' }}>automatique</span> par IA
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              Importez votre relevé bancaire CSV. InvoiceAgent rapproche automatiquement chaque transaction avec vos factures — en quelques secondes, sans aucune saisie manuelle.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', margin: '16px 0 40px' }}>
              Les PME françaises perdent en moyenne <strong style={{ color: '#fbbf24' }}>2 jours par mois</strong> sur la réconciliation bancaire manuelle. InvoiceAgent réduit ce délai à moins de 30 secondes.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.8)', flexWrap: 'wrap' }}>
              <span>Gratuit jusqu'à 1 rapprochement/mois</span>
              <span>Sans carte bancaire</span>
              <span>RGPD — données en Europe</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '2 jours', label: 'Économisés par mois', sub: 'vs réconciliation manuelle' },
              { value: '95%', label: 'Taux de matching', sub: 'sur transactions françaises' },
              { value: '< 30s', label: 'Traitement CSV', sub: 'quel que soit le volume' },
              { value: '12+', label: 'Banques supportées', sub: 'BNP, SG, CA, LCL, CIC...' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#059669' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.3)' }}>
                Demo gratuite — sans inscription
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Testez le rapprochement en direct</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '16px' }}>Importez une facture ou un contrat — analyse IA en quelques secondes.</p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* COMMENT CA MARCHE */}
        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Comment fonctionne la réconciliation bancaire CSV ?
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>
              Un processus simple en trois étapes, sans configuration technique requise.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {[
                { n: '01', color: '#059669', title: 'Exportez votre relevé CSV depuis votre banque', desc: "Connectez-vous à votre espace bancaire en ligne. Dans la section 'Historique des transactions' ou 'Relevés', choisissez la période souhaitée et exportez au format CSV. Cette fonctionnalité est disponible gratuitement sur toutes les banques françaises : BNP Paribas, Société Générale, Crédit Agricole, LCL, CIC, Boursorama, La Banque Postale et plus encore." },
                { n: '02', color: '#2563eb', title: "L'IA analyse et rapproche automatiquement", desc: "InvoiceAgent importe votre fichier CSV et compare chaque transaction avec vos factures enregistrées. L'IA Gemini analyse simultanément le montant, la date, le libellé bancaire et la référence pour identifier les correspondances les plus probables. Chaque rapprochement reçoit un score de confiance de 0 à 100%. Les correspondances à score élevé sont validées automatiquement, les autres sont soumises à votre validation." },
                { n: '03', color: '#7c3aed', title: 'Validez, corrigez et exportez votre rapport', desc: "Consultez le tableau de rapprochement dans votre dashboard. Validez les correspondances suggérées, associez manuellement les transactions non rapprochées si nécessaire, et exportez le rapport final en CSV ou PDF pour votre expert-comptable. Les factures impayées déclenchent automatiquement des alertes par email." },
              ].map((step) => (
                <article key={step.n} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '32px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '40px', height: '40px', backgroundColor: step.color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>{step.n}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.8 }}>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FONCTIONNALITES DETAIL */}
        <section style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '56px' }}>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
                Tout ce qu'InvoiceAgent fait pour vous
              </h2>
              <p style={{ color: '#64748b', fontSize: '16px' }}>
                La réconciliation bancaire automatique va bien au-delà du simple matching de montants.
              </p>
            </header>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { color: '#059669', bg: '#ecfdf5', border: '#bbf7d0', title: 'Matching intelligent par IA', desc: "L'IA analyse simultanément le montant, la date, le libellé et la référence de chaque transaction pour trouver la facture correspondante. Même les libellés bancaires abrégés ou codifiés sont reconnus.", items: ['Reconnaissance des libellés abrégés', 'Tolérance sur les dates de valeur', 'Matching sur montants partiels (acomptes)', 'Score de confiance 0-100% par correspondance'] },
                { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', title: 'Alertes et notifications automatiques', desc: "InvoiceAgent surveille en permanence l'état de vos factures et vous alerte immédiatement dès qu'une anomalie est détectée — facture impayée, doublon, écart de montant.", items: ["Alerte facture impayée à l'échéance", 'Notification doublon de paiement', 'Alerte écart de montant détecté', 'Rappel déclaration TVA mensuelle'] },
                { color: '#7c3aed', bg: '#faf5ff', border: '#ddd6fe', title: 'Export et compatibilité comptable', desc: "Exportez vos rapprochements dans le format attendu par votre expert-comptable ou votre logiciel comptable. InvoiceAgent supporte tous les formats standards français.", items: ['Export FEC (Fichier des Écritures Comptables)', 'Export CSV universel pour Excel', 'Export PDF rapport mensuel', 'Compatible Sage, EBP, Cegid, QuickBooks'] },
                { color: '#dc2626', bg: '#fff1f2', border: '#fecaca', title: 'Sécurité et conformité RGPD', desc: "Vos données bancaires sont parmi les plus sensibles. InvoiceAgent applique les standards de sécurité les plus stricts pour protéger vos informations financières.", items: ['Chiffrement AES-256 en transit et au repos', 'Hébergement exclusivement en Europe (Frankfurt)', 'Accès restreint aux données par équipe', 'Suppression complète sur demande'] },
              ].map((f) => (
                <article key={f.title} style={{ backgroundColor: f.bg, borderRadius: '16px', padding: '32px', border: `1px solid ${f.border}` }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: f.color, marginBottom: '12px' }}>{f.title}</h3>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{f.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {f.items.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#475569', padding: '5px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ color: f.color, flexShrink: 0 }}>→</span>{item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BANQUES */}
        <section style={{ padding: '64px 20px', backgroundColor: 'white', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Compatible avec toutes les banques françaises
            </h2>
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '15px' }}>
              Exportez votre relevé CSV depuis votre espace bancaire en ligne et importez-le en un clic dans InvoiceAgent. Aucune connexion directe à votre banque n'est requise — vos identifiants bancaires restent exclusivement chez vous.
            </p>
            <p style={{ color: '#94a3b8', marginBottom: '40px', fontSize: '13px' }}>
              InvoiceAgent ne demande jamais vos identifiants bancaires. L'import se fait uniquement via le fichier CSV que vous exportez vous-même.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {['BNP Paribas', 'Société Générale', 'Crédit Agricole', 'LCL', 'CIC', 'Boursorama', 'La Banque Postale', 'Crédit Mutuel', 'HSBC France', 'Fortuneo', 'Hello Bank', 'N26'].map((bank) => (
                <div key={bank} style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>{bank}</div>
              ))}
            </div>
          </div>
        </section>

        {/* POUR QUI */}
        <section style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Pour qui est la réconciliation bancaire automatique ?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { title: 'PME et ETI', desc: 'Vous traitez des centaines de transactions par mois. La réconciliation manuelle prend 2 jours. Avec InvoiceAgent, ce temps tombe à moins de 30 minutes de validation.' },
                { title: 'Freelances et consultants', desc: "Vous gérez vos factures clients et fournisseurs. InvoiceAgent rapproche automatiquement chaque paiement reçu avec la facture correspondante, sans effort." },
                { title: 'Experts-comptables', desc: "Traitez la réconciliation de vos clients PME plus rapidement. Le mode multi-clients vous permet de gérer plusieurs entreprises depuis un seul dashboard." },
                { title: 'DAF et responsables financiers', desc: "Obtenez une visibilité en temps réel sur les paiements reçus, les factures impayées et les écarts de trésorerie. Export FEC pour votre audit annuel." },
              ].map((p) => (
                <div key={p.title} style={{ backgroundColor: 'white', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#059669', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AVANTAGES */}
        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
              Pourquoi automatiser la réconciliation bancaire ?
            </h2>
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '40px' }}>
              <p style={{ color: '#14532d', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                La réconciliation bancaire manuelle est l'une des tâches comptables les plus chronophages et les plus sujettes aux erreurs. Chaque transaction doit être comparée manuellement avec les factures, les reçus et les bons de commande — une opération qui prend en moyenne 5 à 10 minutes par transaction.
              </p>
              <p style={{ color: '#14532d', fontSize: '15px', lineHeight: 1.8, marginBottom: '24px' }}>
                Pour une PME traitant 200 transactions par mois, cela représente entre 16 et 33 heures de travail mensuel — soit 2 à 4 jours complets. Ces heures sont consacrées à une tâche mécanique sans valeur ajoutée, au détriment d'activités à plus forte valeur comme le conseil, la relation client ou le développement commercial.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  'Rapprochement complet en moins de 30 secondes',
                  '95% de matching automatique sans intervention',
                  'Alertes immédiates sur factures impayées',
                  'Score de confiance IA pour chaque correspondance',
                  'Export rapport comptable en 1 clic',
                  'Compatible toutes banques françaises',
                  'Aucun identifiant bancaire requis',
                  'Données hébergées en Europe — RGPD',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }}>→</span>
                    <p style={{ color: '#14532d', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#059669" accentBg="#d1fae5" />

        {/* FAQ */}
        <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes sur la réconciliation bancaire
            </h2>
            {[
              { q: "Comment exporter mon relevé bancaire en CSV depuis ma banque ?", a: "Connectez-vous à votre espace bancaire en ligne, rendez-vous dans la section 'Historique des transactions' ou 'Relevés de compte' et cherchez l'option 'Exporter' ou 'Télécharger'. Choisissez le format CSV ou Excel. Toutes les grandes banques françaises (BNP Paribas, Société Générale, Crédit Agricole, LCL, CIC, Boursorama) proposent cette fonctionnalité gratuitement. Si vous ne trouvez pas l'option, contactez le support de votre banque." },
              { q: "Comment fonctionne le matching automatique par IA ?", a: "InvoiceAgent compare chaque transaction de votre relevé CSV avec vos factures enregistrées. L'IA analyse simultanément le montant, la date, le libellé bancaire et la référence pour identifier la correspondance la plus probable. Un score de confiance de 0 à 100% est calculé pour chaque rapprochement. Les correspondances au-dessus de 90% sont validées automatiquement, les autres sont présentées à votre validation." },
              { q: "Que se passe-t-il si une transaction ne correspond à aucune facture ?", a: "Les transactions non rapprochées sont clairement identifiées dans votre dashboard avec un statut 'Non rapproché'. Vous pouvez les associer manuellement à une facture existante, créer une nouvelle facture correspondante, ou les marquer comme 'Dépense sans facture'. Ces transactions apparaissent dans votre rapport mensuel pour suivi." },
              { q: "InvoiceAgent a-t-il besoin d'accéder à mon espace bancaire en ligne ?", a: "Non. InvoiceAgent ne demande jamais vos identifiants bancaires et ne se connecte pas à votre banque. L'import se fait uniquement via le fichier CSV que vous exportez vous-même depuis votre espace bancaire. Vos identifiants bancaires restent exclusivement entre vous et votre banque." },
              { q: "La réconciliation bancaire est-elle conforme RGPD ?", a: "Oui. Toutes vos données bancaires sont chiffrées avec AES-256 en transit et au repos. Elles sont hébergées exclusivement à Frankfurt, Allemagne (Union Européenne), conformément au RGPD. Vos données ne sont jamais partagées avec des tiers et peuvent être supprimées intégralement sur simple demande." },
              { q: "Puis-je exporter le rapport de réconciliation pour mon expert-comptable ?", a: "Oui. Le rapport de réconciliation mensuel est exportable en CSV (compatible Excel) et en PDF. Le plan Pro inclut l'export FEC (Fichier des Écritures Comptables), le format standard imposé par l'administration fiscale française, compatible avec Sage, EBP, Cegid et QuickBooks." },
            ].map((faq, i) => (
              <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '24px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '14px', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#059669', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Prêt à automatiser votre réconciliation bancaire ?</h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>Commencez gratuitement — sans carte bancaire, sans installation.</p>
          <p style={{ fontSize: '15px', marginBottom: '36px', opacity: 0.7 }}>Rejoignez 500+ PME françaises qui ont automatisé leur rapprochement bancaire avec InvoiceAgent.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1e3a8a', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.7, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}