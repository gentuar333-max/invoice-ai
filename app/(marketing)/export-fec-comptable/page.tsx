import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/export-fec-comptable`

export const metadata: Metadata = {
  title: 'Export FEC Comptable Automatique par IA | InvoiceAgent',
  description: "Générez votre Fichier des Écritures Comptables (FEC) automatiquement depuis vos factures PDF. Compatible Sage, EBP, Cegid. Conforme DGFiP. Essai gratuit.",
  keywords: ['export FEC comptable', 'fichier écritures comptables', 'FEC DGFiP France', 'export FEC Sage EBP', 'génération FEC automatique', 'FEC liasse fiscale'],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Export FEC Comptable Automatique — InvoiceAgent',
    description: "Générez votre FEC automatiquement depuis vos factures PDF. Conforme DGFiP, compatible Sage, EBP, Cegid.",
    url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website',
    images: [{ url: `${BASE_URL}/og-fec.png`, width: 1200, height: 630, alt: 'Export FEC comptable automatique' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Export FEC Comptable — InvoiceAgent',
    description: "Générez votre FEC automatiquement. Conforme DGFiP, compatible Sage, EBP, Cegid.",
    images: [`${BASE_URL}/og-fec.png`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'InvoiceAgent — Export FEC Comptable',
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL,
  offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR', offerCount: '4' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '76' },
  featureList: ['Export FEC conforme DGFiP', 'Compatible Sage EBP Cegid', 'Génération automatique depuis PDF', 'Plan comptable 801 champs', 'Contrôle intégrité FEC'],
}
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Qu'est-ce que le FEC (Fichier des Écritures Comptables) ?", acceptedAnswer: { '@type': 'Answer', text: "Le FEC est un fichier informatique obligatoire imposé par l'article L.47 A du Livre des Procédures Fiscales. Il contient l'ensemble des écritures comptables de l'exercice et doit être remis à l'administration fiscale (DGFiP) en cas de contrôle. Il est généré automatiquement par InvoiceAgent depuis vos factures PDF." } },
    { '@type': 'Question', name: "Le FEC généré par InvoiceAgent est-il conforme DGFiP ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent génère un FEC conforme au format défini par l'arrêté du 29 juillet 2013 et aux spécifications techniques DGFiP. Le fichier contient les 18 champs obligatoires et peut être contrôlé avec l'outil de vérification officiel." } },
    { '@type': 'Question', name: "Avec quels logiciels comptables le FEC est-il compatible ?", acceptedAnswer: { '@type': 'Answer', text: "Le FEC InvoiceAgent est compatible avec Sage, EBP, Cegid, QuickBooks, Coala, Pennylane et tous les logiciels acceptant le format FEC standard DGFiP." } },
    { '@type': 'Question', name: "Comment générer mon FEC depuis mes factures PDF ?", acceptedAnswer: { '@type': 'Answer', text: "Importez vos factures PDF dans InvoiceAgent. L'IA extrait automatiquement toutes les données comptables (fournisseur, montants, TVA, dates). Cliquez sur 'Exporter FEC' et le fichier est généré instantanément, prêt à être transmis à votre comptable ou à l'administration." } },
    { '@type': 'Question', name: "À quelle fréquence dois-je générer mon FEC ?", acceptedAnswer: { '@type': 'Answer', text: "Le FEC doit couvrir l'intégralité d'un exercice comptable (généralement l'année civile). Il est généralement généré une fois par an pour votre expert-comptable ou en cas de contrôle fiscal. InvoiceAgent vous permet de le générer à tout moment." } },
    { '@type': 'Question', name: "Quel plan inclut l'export FEC ?", acceptedAnswer: { '@type': 'Answer', text: "L'export FEC est disponible dès le plan Pro à 29€/mois (ou 23€/mois en annuel). Le plan Business à 49€/mois ajoute l'export FEC multi-clients pour les cabinets comptables." } },
  ],
}
const schemaBreadcrumb = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Export FEC Comptable', item: PAGE_URL },
  ],
}

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour découvrir', items: ['5 factures/mois', 'Export PDF uniquement', 'Dashboard complet', '1 analyse contrat'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'TPE & Freelances', items: ['100 factures/mois', 'Export CSV + PDF', 'Réconciliation bancaire', 'Alertes TVA'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: false },
  { name: 'Pro', monthly: 29, desc: 'PME & Comptables', items: ['Factures illimitées', 'Export FEC natif DGFiP', 'Compatible Sage EBP Cegid', '5 analyses contrats/mois', 'Contrôle intégrité FEC'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: true },
  { name: 'Business', monthly: 49, desc: 'Cabinets comptables', items: ['Tout Pro inclus', 'FEC multi-clients', 'Export par exercice', 'Audit trail RGPD', 'Support dédié'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "Qu'est-ce que le FEC (Fichier des Écritures Comptables) ?", a: "Le FEC est un fichier informatique obligatoire imposé par l'article L.47 A du Livre des Procédures Fiscales. Il contient l'ensemble des écritures comptables de l'exercice et doit être remis à l'administration fiscale (DGFiP) en cas de contrôle fiscal. InvoiceAgent le génère automatiquement depuis vos factures PDF." },
  { q: "Le FEC généré par InvoiceAgent est-il conforme DGFiP ?", a: "Oui. InvoiceAgent génère un FEC conforme au format défini par l'arrêté du 29 juillet 2013 et aux spécifications techniques DGFiP. Le fichier contient les 18 champs obligatoires (JournalCode, JournalLib, EcritureNum, etc.) et peut être contrôlé avec l'outil de vérification officiel Test Compta Demat." },
  { q: "Avec quels logiciels comptables le FEC est-il compatible ?", a: "Le FEC InvoiceAgent est compatible avec Sage, EBP, Cegid, QuickBooks, Coala, Pennylane et tous les logiciels acceptant le format FEC standard DGFiP. Votre expert-comptable peut l'importer directement dans son logiciel." },
  { q: "Comment générer mon FEC depuis mes factures PDF ?", a: "Importez vos factures PDF dans InvoiceAgent. L'IA extrait automatiquement toutes les données comptables nécessaires. Sélectionnez la période souhaitée, cliquez sur 'Exporter FEC' et le fichier est généré instantanément au format texte délimité standard DGFiP." },
  { q: "À quelle fréquence dois-je générer mon FEC ?", a: "Le FEC couvre généralement un exercice comptable complet (année civile). Il est produit une fois par an pour votre expert-comptable et transmis à la DGFiP uniquement en cas de contrôle fiscal. InvoiceAgent vous permet de le générer à tout moment pour l'exercice en cours ou les exercices précédents." },
  { q: "Quel plan inclut l'export FEC ?", a: "L'export FEC est disponible dès le plan Pro à 29€/mois (ou 23€/mois en annuel). Le plan Business à 49€/mois ajoute l'export FEC multi-clients et la gestion par exercice comptable, idéal pour les cabinets comptables." },
]

export default function ExportFECComptablePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

      <SharedNav />
      <main>

        {/* HERO — rouge sombre, thème fiscal/comptable */}
        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Conforme DGFiP · Article L.47 A LPF · Compatible Sage · EBP · Cegid
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Export FEC comptable <span style={{ color: '#fbbf24' }}>automatique</span> depuis vos factures PDF
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              InvoiceAgent génère votre Fichier des Écritures Comptables (FEC) automatiquement depuis vos factures PDF — conforme aux spécifications DGFiP, prêt à être transmis à votre expert-comptable ou à l'administration fiscale.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: '16px 0 40px' }}>
              Obligatoire depuis 2014 pour toutes les entreprises tenant une comptabilité informatisée. En cas de contrôle fiscal, l'absence de FEC conforme expose à une amende de <strong style={{ color: '#fbbf24' }}>5 000€ minimum</strong>.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Générer mon FEC gratuitement</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.2)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.6)', flexWrap: 'wrap' }}>
              <span>Conforme arrêté DGFiP du 29 juillet 2013</span>
              <span>18 champs obligatoires inclus</span>
              <span>RGPD — données en Europe</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section aria-label="Statistiques FEC" style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '18', label: 'Champs FEC obligatoires', sub: 'tous générés automatiquement' },
              { value: '5 000€', label: "Amende minimale", sub: "en cas de FEC non conforme" },
              { value: '100%', label: 'Conforme DGFiP', sub: 'arrêté du 29 juillet 2013' },
              { value: '< 1 min', label: 'Génération FEC', sub: 'quel que soit le volume' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#292524' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* QU'EST CE QUE LE FEC */}
        <section aria-labelledby="fec-heading" style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 id="fec-heading" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '32px', textAlign: 'center' }}>
              Qu'est-ce que le FEC et pourquoi est-il obligatoire ?
            </h2>
            <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px', marginBottom: '24px' }}>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginBottom: '20px' }}>
                Le <strong style={{ color: '#1e293b' }}>Fichier des Écritures Comptables (FEC)</strong> est un fichier informatique standardisé imposé par l'article L.47 A du Livre des Procédures Fiscales (LPF). Obligatoire depuis le 1er janvier 2014 pour toutes les entreprises tenant une comptabilité informatisée, il contient l'intégralité des écritures comptables de l'exercice dans un format précis défini par l'arrêté du 29 juillet 2013.
              </p>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, marginBottom: '20px' }}>
                En cas de contrôle fiscal par la Direction Générale des Finances Publiques (DGFiP), l'entreprise est tenue de remettre son FEC dans les 15 jours suivant la remise de l'avis de vérification. L'absence de FEC, un FEC incomplet ou non conforme expose l'entreprise à une <strong style={{ color: '#dc2626' }}>amende minimale de 5 000€</strong>, pouvant aller jusqu'à 0.5% du chiffre d'affaires en cas de manquements répétés.
              </p>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>
                InvoiceAgent automatise la génération de votre FEC directement depuis vos factures PDF — sans ressaisie, sans erreur de format et en conformité totale avec les spécifications techniques DGFiP. Le fichier généré contient les 18 champs obligatoires et peut être contrôlé immédiatement avec l'outil officiel Test Compta Demat de la DGFiP.
              </p>
            </div>

            {/* 18 CHAMPS FEC */}
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' }}>
              Les 18 champs obligatoires du FEC générés automatiquement
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {[
                { champ: 'JournalCode', desc: 'Code du journal comptable' },
                { champ: 'JournalLib', desc: 'Libellé du journal' },
                { champ: 'EcritureNum', desc: 'Numéro séquentiel unique' },
                { champ: 'EcritureDate', desc: 'Date de saisie' },
                { champ: 'CompteNum', desc: 'Numéro de compte' },
                { champ: 'CompteLib', desc: 'Libellé du compte' },
                { champ: 'CompAuxNum', desc: 'Numéro compte auxiliaire' },
                { champ: 'CompAuxLib', desc: 'Libellé compte auxiliaire' },
                { champ: 'PieceRef', desc: 'Référence de la pièce' },
                { champ: 'PieceDate', desc: 'Date de la pièce' },
                { champ: 'EcritureLib', desc: 'Libellé de l\'écriture' },
                { champ: 'Debit', desc: 'Montant débit' },
                { champ: 'Credit', desc: 'Montant crédit' },
                { champ: 'EcritureLet', desc: 'Lettrage' },
                { champ: 'DateLet', desc: 'Date de lettrage' },
                { champ: 'ValidDate', desc: 'Date de validation' },
                { champ: 'Montantdevise', desc: 'Montant en devise' },
                { champ: 'Idevise', desc: 'Identifiant devise' },
              ].map((f) => (
                <div key={f.champ} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#2563eb', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>{f.champ}</span>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>{f.desc}</span>
                </div>
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
                Testez l'extraction avant l'export FEC
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px' }}>
                Importez une facture PDF — l'IA extrait les données comptables en quelques secondes.
              </p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* COMMENT CA MARCHE */}
        <section aria-labelledby="process-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="process-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
              Comment générer votre FEC avec InvoiceAgent ?
            </h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '64px', fontSize: '16px' }}>
              Trois étapes pour un FEC conforme DGFiP, sans ressaisie manuelle.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {[
                { n: '01', color: '#292524', title: 'Importez vos factures PDF', desc: "Téléchargez vos factures PDF fournisseurs et clients dans InvoiceAgent. L'IA Gemini extrait automatiquement toutes les données comptables nécessaires à la génération du FEC : numéro de compte, libellé, montant débit/crédit, date de pièce et référence." },
                { n: '02', color: '#2563eb', title: "L'IA structure les écritures comptables", desc: "InvoiceAgent génère automatiquement les écritures comptables au format FEC DGFiP. Chaque facture produit les écritures débit/crédit correspondantes avec les 18 champs obligatoires correctement renseignés selon le plan comptable général (PCG)." },
                { n: '03', color: '#059669', title: 'Exportez et transmettez votre FEC', desc: "Cliquez sur 'Exporter FEC', sélectionnez l'exercice comptable et le fichier est généré instantanément. Transmettez-le directement à votre expert-comptable ou conservez-le pour répondre à un éventuel contrôle fiscal de la DGFiP." },
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

        {/* COMPATIBILITE LOGICIELS */}
        <section aria-labelledby="compat-heading" style={{ padding: '64px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 id="compat-heading" style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>
              Compatible avec tous les logiciels comptables français
            </h2>
            <p style={{ color: '#64748b', marginBottom: '16px', fontSize: '15px' }}>
              Le FEC généré par InvoiceAgent respecte le format standard DGFiP et peut être importé directement dans tous les logiciels comptables du marché français.
            </p>
            <p style={{ color: '#94a3b8', marginBottom: '40px', fontSize: '13px' }}>
              Il peut également être contrôlé avec l'outil officiel Test Compta Demat de la DGFiP avant transmission.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {['Sage 50', 'Sage 100', 'EBP Compta', 'Cegid', 'QuickBooks', 'Coala', 'Pennylane', 'ACD', 'Ciel Compta', 'Quadratus'].map((tool) => (
                <div key={tool} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 18px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>{tool}</div>
              ))}
            </div>
          </div>
        </section>

        {/* POUR QUI */}
        <section aria-labelledby="pourqui-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 id="pourqui-heading" style={{ textAlign: 'center', fontSize: '34px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Pour qui est l'export FEC automatique ?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
              {[
                { title: 'PME soumises au contrôle fiscal', desc: "Toute entreprise tenant une comptabilité informatisée doit pouvoir produire un FEC conforme en cas de contrôle DGFiP. InvoiceAgent le génère automatiquement depuis vos factures PDF." },
                { title: 'Experts-comptables', desc: "Récupérez le FEC de vos clients PME directement depuis InvoiceAgent. Import direct dans Sage, EBP ou Cegid sans ressaisie. Gain de temps considérable sur la liasse fiscale." },
                { title: 'DAF et directeurs financiers', desc: "Préparez votre FEC en amont de la clôture comptable. Contrôlez l'intégrité des écritures avec l'outil Test Compta Demat avant transmission à votre commissaire aux comptes." },
                { title: 'Commissaires aux comptes', desc: "Vérifiez la cohérence des écritures comptables grâce au FEC structuré InvoiceAgent. Format standard DGFiP pour une analyse rapide des journaux et des balances." },
              ].map((p) => (
                <div key={p.title} style={{ backgroundColor: '#f8fafc', padding: '28px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#292524', marginBottom: '10px' }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#292524" accentBg="#f5f5f4" />

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-heading" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="faq-heading" style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>
              Questions fréquentes — Export FEC comptable
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
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Logiciel comptabilité PME', href: `${BASE_URL}/logiciel-comptabilite-pme` },
                { label: 'Facturation freelance', href: `${BASE_URL}/facturation-freelance` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#292524', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Appel à l'action" style={{ background: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Générez votre FEC conforme DGFiP automatiquement</h2>
          <p style={{ fontSize: '18px', marginBottom: '12px', opacity: 0.9 }}>Depuis vos factures PDF — en moins d'une minute.</p>
          <p style={{ fontSize: '15px', marginBottom: '36px', opacity: 0.6 }}>Ne prenez plus de risque en cas de contrôle fiscal. InvoiceAgent génère votre FEC conforme à tout moment.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#1c1917', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Annulez à tout moment</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}