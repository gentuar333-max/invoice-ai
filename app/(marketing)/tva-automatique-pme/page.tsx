import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/tva-automatique-pme`

export const metadata: Metadata = {
  title: 'TVA Automatique PME par IA | Calcul et Alertes TVA | InvoiceAgent',
  description: "Calculez et déclarez votre TVA automatiquement. InvoiceAgent extrait les taux TVA de vos factures PDF, génère vos montants HT/TTC et vous alerte avant chaque échéance. Gratuit.",
  keywords: ['TVA automatique PME', 'calcul TVA facture automatique', 'déclaration TVA France', 'alerte TVA mensuelle', 'TVA 5.5 10 20 automatique', 'logiciel TVA PME France'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'TVA Automatique PME — InvoiceAgent',
    description: "Calcul TVA automatique depuis vos factures PDF. Alertes mensuelles, export DGFiP. Gratuit jusqu'à 5 factures.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-tva.png`, width: 1200, height: 630, alt: 'TVA automatique PME InvoiceAgent' }],
  },
  twitter: { card: 'summary_large_image', title: 'TVA Automatique PME — InvoiceAgent', description: "Calcul TVA automatique depuis vos factures PDF. Alertes mensuelles DGFiP.", images: [`${BASE_URL}/og-tva.png`] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — TVA Automatique PME',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR', offerCount: '4' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '91' },
  featureList: ['Calcul TVA automatique 5.5% 10% 20%', 'Alertes déclaration TVA mensuelle', 'Export données TVA DGFiP', 'TVA intracommunautaire', 'Rapport TVA mensuel'],
}
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Comment InvoiceAgent calcule-t-il la TVA automatiquement ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent extrait automatiquement le taux de TVA de chaque facture PDF (5.5%, 10% ou 20%) et calcule les montants HT, TVA et TTC. Les données sont agrégées dans un rapport mensuel prêt pour votre déclaration DGFiP." } },
    { '@type': 'Question', name: "Quels taux de TVA sont supportés ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent gère tous les taux de TVA français : 5.5% (produits alimentaires, travaux rénovation énergétique), 10% (restauration, travaux d'amélioration), 20% (taux normal) et 0% (exportations, TVA intracommunautaire)." } },
    { '@type': 'Question', name: "Quand dois-je déclarer ma TVA ?", acceptedAnswer: { '@type': 'Answer', text: "La fréquence dépend de votre régime : mensuelle (CA > 789 000€ services ou 4 000 000€ ventes), trimestrielle (régime réel simplifié), ou annuelle (franchise de base). InvoiceAgent vous alerte selon votre régime." } },
    { '@type': 'Question', name: "InvoiceAgent gère-t-il la TVA intracommunautaire ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent reconnaît les factures avec TVA intracommunautaire (numéro de TVA UE) et les traite avec le taux 0% approprié, conformément aux règles de la DGFiP pour les échanges intra-UE." } },
    { '@type': 'Question', name: "Puis-je exporter mes données TVA pour ma déclaration ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent exporte un rapport TVA mensuel en CSV et PDF, avec les montants HT, TVA collectée et TVA déductible par taux. Le plan Pro inclut l'export FEC intégrant les écritures TVA, compatible avec votre logiciel comptable." } },
    { '@type': 'Question', name: "Que se passe-t-il si je rate une déclaration TVA ?", acceptedAnswer: { '@type': 'Answer', text: "Un retard de déclaration TVA expose à une majoration de 10% des droits dus, portée à 40% en cas de mise en demeure non suivie. InvoiceAgent vous envoie une alerte avant chaque échéance pour éviter ces pénalités." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'TVA Automatique PME', item: PAGE_URL },
  ],
}

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour démarrer', items: ['5 factures/mois', 'Calcul TVA automatique', 'Dashboard TVA', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'TPE & Freelances', items: ['100 factures/mois', 'Alertes TVA mensuelles', 'Rapport TVA CSV+PDF', 'Réconciliation bancaire', 'TVA intracommunautaire'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
  { name: 'Pro', monthly: 29, desc: 'PME & Comptables', items: ['Factures illimitées', 'Export FEC avec écritures TVA', '5 analyses contrats/mois', 'Rapport TVA par exercice'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: true },
  { name: 'Business', monthly: 49, desc: 'Cabinets comptables', items: ['Tout Pro inclus', 'TVA multi-clients', 'Audit trail RGPD', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "Comment InvoiceAgent calcule-t-il la TVA automatiquement ?", a: "InvoiceAgent extrait automatiquement le taux de TVA de chaque facture PDF (5.5%, 10% ou 20%) grâce à l'IA Gemini. Les montants HT, TVA et TTC sont calculés et vérifiés automatiquement. Les données sont agrégées dans un rapport mensuel prêt pour votre déclaration DGFiP, sans aucune saisie manuelle." },
  { q: "Quels taux de TVA français sont supportés ?", a: "InvoiceAgent gère tous les taux de TVA français : 5.5% (produits alimentaires essentiels, livres, travaux de rénovation énergétique), 10% (restauration, transports, travaux d'amélioration), 20% (taux normal, majorité des biens et services) et 0% (exportations hors UE, livraisons intracommunautaires)." },
  { q: "Quand dois-je déclarer ma TVA en France ?", a: "La fréquence de déclaration dépend de votre régime fiscal : mensuelle si votre CA dépasse 789 000€ pour les services ou 4 000 000€ pour les ventes (régime réel normal) ; trimestrielle si votre TVA annuelle est inférieure à 4 000€ (régime réel simplifié) ; annuelle si vous êtes en franchise de base. InvoiceAgent vous alerte selon votre régime avant chaque échéance." },
  { q: "InvoiceAgent gère-t-il la TVA intracommunautaire ?", a: "Oui. InvoiceAgent reconnaît les factures avec TVA intracommunautaire (numéro de TVA UE commençant par le code pays) et les traite avec le taux 0% approprié, conformément aux règles DGFiP. Les acquisitions intracommunautaires sont également gérées avec l'autoliquidation de TVA." },
  { q: "Puis-je exporter mes données TVA pour ma déclaration CA3 ou CA12 ?", a: "Oui. InvoiceAgent exporte un rapport TVA mensuel en CSV et PDF, avec les montants HT, TVA collectée (par taux) et TVA déductible. Le plan Pro inclut l'export FEC intégrant les écritures TVA (compte 44571, 44566, etc.), compatible avec Sage, EBP et Cegid pour votre déclaration CA3 ou CA12." },
  { q: "Que se passe-t-il si je rate une déclaration TVA ?", a: "Un retard de déclaration TVA expose à une majoration de 10% des droits dus, portée à 40% en cas de mise en demeure non suivie d'effet. Des intérêts de retard de 0.20% par mois s'ajoutent. InvoiceAgent vous envoie une alerte email avant chaque échéance pour éviter ces pénalités et frais supplémentaires." },
]

export default function TVAAutomatiquePMEPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main>

        {/* HERO */}
        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              TVA 5.5% · 10% · 20% · Intracommunautaire · DGFiP · CA3 · CA12
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              TVA automatique pour PME — <span style={{ color: '#fbbf24' }}>zéro erreur, zéro retard</span>
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              InvoiceAgent extrait automatiquement les taux de TVA de vos factures PDF, calcule vos montants HT/TTC et vous alerte avant chaque échéance de déclaration DGFiP — sans aucune saisie manuelle.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: '16px 0 40px' }}>
              Un retard de déclaration TVA expose à une majoration de <strong style={{ color: '#fbbf24' }}>10% minimum</strong> des droits dus, portée à 40% en cas de mise en demeure. InvoiceAgent vous alerte avant chaque échéance.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.2)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.6)', flexWrap: 'wrap' }}>
              <span>Gratuit jusqu'à 5 factures/mois</span>
              <span>Sans carte bancaire</span>
              <span>RGPD — données en Europe</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section aria-label="Statistiques TVA" style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '10%', label: 'Majoration minimale', sub: 'en cas de retard déclaration TVA' },
              { value: '3 taux', label: 'TVA gérés auto', sub: '5.5% · 10% · 20%' },
              { value: '< 5s', label: 'Extraction TVA', sub: 'par facture PDF' },
              { value: '0', label: 'Erreur de calcul', sub: 'TVA calculée par IA' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#292524' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TAUX TVA FRANCE */}
        <section aria-labelledby="taux-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="taux-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Tous les taux de TVA français gérés automatiquement
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px', fontSize: '16px' }}>
              InvoiceAgent reconnaît et applique automatiquement le bon taux pour chaque facture.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { taux: '5.5%', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', titre: 'Taux réduit', exemples: ['Produits alimentaires essentiels', 'Livres papier et numériques', 'Travaux rénovation énergétique', 'Abonnements gaz et électricité', 'Équipements handicapés'] },
                { taux: '10%', color: '#d97706', bg: '#fffbeb', border: '#fde68a', titre: 'Taux intermédiaire', exemples: ['Restauration sur place', 'Transports de voyageurs', 'Travaux amélioration logement', 'Médicaments non remboursés', 'Produits agricoles'] },
                { taux: '20%', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', titre: 'Taux normal', exemples: ['Prestations de services', 'Ventes de biens courants', 'Logiciels et SaaS', 'Conseil et honoraires', 'Commerce en général'] },
                { taux: '0%', color: '#292524', bg: '#f5f5f4', border: '#e7e5e4', titre: 'Exonéré / Intracom', exemples: ['Exportations hors UE', 'Livraisons intracommunautaires', 'Franchise de base TVA', 'Opérations bancaires', 'Enseignement et formation'] },
              ].map((t) => (
                <article key={t.taux} style={{ backgroundColor: t.bg, borderRadius: '16px', padding: '28px', border: `1px solid ${t.border}` }}>
                  <div style={{ fontSize: '40px', fontWeight: 900, color: t.color, marginBottom: '4px' }}>{t.taux}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: t.color, marginBottom: '16px' }}>{t.titre}</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {t.exemples.map((ex) => (
                      <li key={ex} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#475569', padding: '5px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <span style={{ color: t.color, flexShrink: 0 }}>→</span>{ex}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" aria-labelledby="demo-heading" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>
                Demo gratuite — sans inscription
              </div>
              <h2 id="demo-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>
                Testez le calcul TVA en direct
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', marginBottom: '8px' }}>
                <strong style={{ color: 'white' }}>Facture PDF</strong> — l'IA extrait le taux TVA, calcule HT/TVA/TTC et vérifie la cohérence des montants.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px' }}>
                <strong style={{ color: 'white' }}>Contrat PDF</strong> — l'IA détecte les clauses TVA, frais cachés et conditions de facturation.
              </p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* COMMENT CA MARCHE */}
        <section aria-labelledby="process-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="process-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Comment fonctionne la TVA automatique ?
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>
              De l'import de la facture à l'alerte de déclaration — tout est automatique.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
              {[
                { n: '01', color: '#292524', title: 'Import de la facture PDF', desc: "Téléchargez votre facture fournisseur ou client en PDF. InvoiceAgent accepte tous les formats — natif, scanné ou photo smartphone." },
                { n: '02', color: '#2563eb', title: "Extraction TVA automatique", desc: "L'IA Gemini identifie le taux de TVA (5.5%, 10%, 20%) et vérifie la cohérence entre HT, TVA et TTC affichés sur la facture. Les erreurs sont signalées." },
                { n: '03', color: '#059669', title: "Agrégation mensuelle", desc: "InvoiceAgent agrège automatiquement votre TVA collectée et déductible du mois. Un rapport clair vous indique le montant net à déclarer." },
                { n: '04', color: '#d97706', title: "Alerte avant échéance", desc: "Une alerte email vous prévient avant chaque date limite de déclaration TVA — mensuelle, trimestrielle ou annuelle selon votre régime." },
              ].map((step) => (
                <article key={step.n} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: '36px', height: '36px', backgroundColor: step.color, color: 'white', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, marginBottom: '14px' }}>{step.n}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{step.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* RISQUES TVA */}
        <section aria-labelledby="risques-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 id="risques-heading" style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '40px' }}>
              Les risques d'une mauvaise gestion TVA
            </h2>
            <div style={{ backgroundColor: 'white', border: '1px solid #fecaca', borderRadius: '16px', padding: '40px', marginBottom: '24px' }}>
              <p style={{ color: '#292524', fontSize: '15px', lineHeight: 1.8, marginBottom: '20px' }}>
                La TVA est l'impôt le plus contrôlé par la DGFiP. Les erreurs de déclaration — qu'elles soient intentionnelles ou non — exposent les entreprises à des pénalités sévères qui peuvent fragiliser leur trésorerie.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {[
                  { risque: 'Retard de déclaration', sanction: 'Majoration de 10% des droits dus, portée à 40% après mise en demeure' },
                  { risque: 'Erreur de taux TVA', sanction: 'Redressement + intérêts de retard 0.20%/mois + pénalité 10%' },
                  { risque: 'TVA déductible non justifiée', sanction: 'Rejet du crédit TVA + pénalité 40% pour manquement délibéré' },
                  { risque: 'Absence de FEC en contrôle', sanction: 'Amende minimale 5 000€ + taxation d\'office' },
                ].map((r) => (
                  <div key={r.risque} style={{ backgroundColor: '#fff1f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626', marginBottom: '6px' }}>{r.risque}</div>
                    <div style={{ fontSize: '13px', color: '#7f1d1d', lineHeight: 1.5 }}>{r.sanction}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
              <p style={{ color: '#14532d', fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>InvoiceAgent calcule et archive automatiquement chaque TVA</p>
              <p style={{ color: '#166534', fontSize: '14px', lineHeight: 1.6 }}>Chaque facture traitée est archivée avec son taux TVA, ses montants HT/TTC et sa date. En cas de contrôle DGFiP, vous disposez d'un historique complet et d'un FEC conforme prêt à transmettre.</p>
            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#292524" accentBg="#f5f5f4" />

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="faq-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes — TVA automatique PME
            </h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section aria-label="Liens internes" style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#292524', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Appel à l'action" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Ne ratez plus jamais une déclaration TVA</h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>Calcul automatique, alertes mensuelles, export DGFiP.</p>
          <p style={{ fontSize: '15px', marginBottom: '36px', opacity: 0.6 }}>5 factures gratuites — sans carte bancaire, sans installation.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}