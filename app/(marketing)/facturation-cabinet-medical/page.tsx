import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'
import InlineDemo from '@/components/InlineDemo'
import PricingToggle from '@/components/PricingToggle'
import FAQAccordion from '@/components/FAQAccordion'

const BASE_URL = 'https://invoiceagent.fr'
const PAGE_URL = `${BASE_URL}/facturation-cabinet-medical`

export const metadata: Metadata = {
  title: 'Facturation Cabinet Médical Automatique par IA | InvoiceAgent',
  description: "Automatisez la facturation de votre cabinet médical avec l'IA. Gestion fournisseurs médicaux, TVA exonérée, honoraires, notes de frais. Gratuit jusqu'à 5 factures.",
  keywords: ['facturation cabinet médical', 'logiciel comptabilité médecin', 'gestion factures cabinet santé', 'comptabilité libérale médecin', 'facturation clinique France'],
  alternates: { canonical: PAGE_URL },
  openGraph: { title: 'Facturation Cabinet Médical Automatique — InvoiceAgent', description: "Automatisez la facturation de votre cabinet médical. Fournisseurs, honoraires, TVA exonérée.", url: PAGE_URL, siteName: 'InvoiceAgent', locale: 'fr_FR', type: 'website', images: [{ url: `${BASE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Facturation cabinet médical InvoiceAgent' }] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const schemaOrg = { '@context': 'https://schema.org', '@type': 'Organization', name: 'InvoiceAgent', url: BASE_URL, address: { '@type': 'PostalAddress', addressCountry: 'FR' } }
const schemaSoftware = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'InvoiceAgent — Facturation Cabinet Médical', applicationCategory: 'BusinessApplication', operatingSystem: 'Web, SaaS', url: PAGE_URL, offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '49', priceCurrency: 'EUR' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '39' } }
const schemaFAQ = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "Les médecins sont-ils soumis à la TVA ?", acceptedAnswer: { '@type': 'Answer', text: "Les actes médicaux sont exonérés de TVA en France (article 261-4-1° du CGI). Cependant, les médecins paient de la TVA sur leurs achats professionnels (fournitures, équipements, loyers) qu'ils ne peuvent pas déduire. InvoiceAgent gère cette particularité automatiquement." } },
    { '@type': 'Question', name: "Comment gérer les factures fournisseurs d'un cabinet médical ?", acceptedAnswer: { '@type': 'Answer', text: "InvoiceAgent extrait automatiquement les données des factures de vos fournisseurs médicaux (Guerbet, Becton Dickinson, laboratoires) par OCR IA. Montants HT/TTC, SIRET et dates d'échéance sont extraits en moins de 5 secondes." } },
    { '@type': 'Question', name: "InvoiceAgent est-il conforme RGPD pour un cabinet médical ?", acceptedAnswer: { '@type': 'Answer', text: "Oui. InvoiceAgent traite uniquement les données comptables (factures fournisseurs, relevés bancaires). Aucune donnée patient n'est collectée. Hébergement Frankfurt (UE), conformité RGPD totale." } },
    { '@type': 'Question', name: "Comment exporter les données pour mon expert-comptable médical ?", acceptedAnswer: { '@type': 'Answer', text: "Export FEC natif compatible Sage, EBP et les logiciels utilisés par les experts-comptables spécialisés en professions libérales médicales." } },
    { '@type': 'Question', name: "InvoiceAgent gère-t-il les cabinets de groupe et SCM ?", acceptedAnswer: { '@type': 'Answer', text: "Oui, dès le plan Business. InvoiceAgent gère les structures multi-praticiens — SCM, SCP, SELAS — avec FEC séparé par entité et tableaux de bord consolidés." } },
  ],
}
const schemaBreadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Facturation Cabinet Médical', item: PAGE_URL }] }

const plans = [
  { name: 'Gratuit', monthly: 0, desc: 'Pour commencer sans risque', items: ['5 factures fournisseurs/mois', 'Scan rapide via smartphone (OCR)', 'Suivi payé / impayé', 'Tableau de bord simple', 'Export PDF'], link: `${BASE_URL}/auth/login`, cta: 'Commencer gratuitement', featured: false },
  { name: 'Starter', monthly: 19, desc: 'Pour les cabinets individuels', items: ['100 factures / mois', 'Calcul automatique de la TVA', 'Réconciliation bancaire (CSV)', 'Alertes factures impayées & TVA', 'Export CSV + PDF', 'Tableau de bord complet'], link: `${BASE_URL}/checkout?plan=starter`, cta: 'Choisir Starter', featured: true },
  { name: 'Pro', monthly: 29, desc: 'Automatisation avancée + contrats', items: ['Factures illimitées', 'IA détecte les correspondances bancaires', 'Export FEC conforme DGFiP', 'Analyse de contrats (5/mois)', 'Détection des clauses à risque', 'Identification des frais cachés'], link: `${BASE_URL}/checkout?plan=pro`, cta: 'Choisir Pro', featured: false },
  { name: 'Business', monthly: 49, desc: 'Pour les cabinets de groupe et SCM', items: ['Toutes les fonctionnalités Pro incluses', 'Multi-établissements simplifié', 'Analyse de contrats illimitée', 'Résumé clair en quelques secondes', 'Historique sécurisé (RGPD)', 'Accompagnement personnalisé'], link: `${BASE_URL}/checkout?plan=business`, cta: 'Choisir Business', featured: false },
]

const faqs = [
  { q: "Les médecins sont-ils soumis à la TVA ?", a: "Les actes médicaux sont exonérés de TVA en France (article 261-4-1° du CGI). Cependant, les médecins paient de la TVA sur leurs achats professionnels (fournitures, équipements médicaux, loyers, abonnements) qu'ils ne peuvent généralement pas récupérer. InvoiceAgent gère cette particularité automatiquement en classifiant correctement les factures fournisseurs." },
  { q: "Comment gérer les factures fournisseurs d'un cabinet médical ?", a: "InvoiceAgent extrait automatiquement les données des factures de vos fournisseurs médicaux (fabricants de matériel, laboratoires, distributeurs de consommables) par OCR IA. Montants HT/TTC, numéros SIRET et dates d'échéance sont extraits en moins de 5 secondes — même depuis une photo smartphone." },
  { q: "InvoiceAgent est-il conforme RGPD pour un cabinet médical ?", a: "Oui. InvoiceAgent traite uniquement les données comptables (factures fournisseurs, relevés bancaires). Aucune donnée patient n'est jamais collectée ou traitée. L'hébergement est à Frankfurt (UE) avec chiffrement AES-256, en conformité totale avec le RGPD." },
  { q: "Comment exporter les données pour mon expert-comptable médical ?", a: "Export FEC natif compatible Sage, EBP et les logiciels utilisés par les experts-comptables spécialisés en professions libérales médicales. Export CSV et PDF également disponibles sur tous les plans." },
  { q: "InvoiceAgent gère-t-il les cabinets de groupe et SCM ?", a: "Oui, dès le plan Business à 49€/mois. InvoiceAgent gère les structures multi-praticiens — SCM, SCP, SELAS — avec FEC séparé par entité et tableaux de bord consolidés pour avoir une vision globale." },
]

export default function FacturationCabinetMedicalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSoftware) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />
      <SharedNav />
      <main>

        {/* HERO */}
        <section aria-labelledby="hero-heading" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', color: 'white', padding: '100px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', marginBottom: '24px', fontFamily: 'monospace' }}>
              Médecins · Chirurgiens · Spécialistes · Cabinets de groupe · Cliniques · SCM
            </div>
            <h1 id="hero-heading" style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1 }}>
              Facturation cabinet médical <span style={{ color: '#6ee7b7' }}>automatique</span> par IA
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, maxWidth: '700px', margin: '0 auto 16px' }}>
              Gérez les factures fournisseurs de votre cabinet médical automatiquement. InvoiceAgent extrait les données de vos factures médicales par OCR IA — exonération TVA gérée automatiquement.
            </p>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', margin: '16px 0 40px' }}>
              Un cabinet médical reçoit en moyenne <strong style={{ color: '#6ee7b7' }}>20 à 60 factures fournisseurs par mois</strong> — consommables, équipements, loyers, abonnements logiciels. InvoiceAgent automatise leur traitement intégral.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
              <a href="#demo" style={{ backgroundColor: '#6ee7b7', color: '#064e3b', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Tester gratuitement</a>
              <a href="#tarifs" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.2)', padding: '16px 32px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Voir les tarifs</a>
            </div>
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.6)', flexWrap: 'wrap' }}>
              <span>Gratuit jusqu'à 5 factures/mois</span>
              <span>Sans carte bancaire</span>
              <span>RGPD — aucune donnée patient collectée</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ backgroundColor: 'white', padding: '48px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {[
              { value: '60+', label: 'Factures fournisseurs/mois', sub: 'moyenne cabinet médical actif' },
              { value: '0%', label: 'TVA sur actes médicaux', sub: 'exonération gérée automatiquement' },
              { value: '< 5s', label: 'Par facture extraite', sub: 'OCR IA depuis votre cabinet' },
              { value: '100%', label: 'Conforme RGPD', sub: 'aucune donnée patient collectée' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '34px', fontWeight: 'bold', color: '#065f46' }}>{s.value}</div>
                <div style={{ color: '#1e293b', fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* DEMO */}
        <section id="demo" style={{ padding: '80px 20px', background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.2)' }}>Demo gratuite — sans inscription</div>
              <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '12px' }}>Testez avec une facture fournisseur médical</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px' }}>Importez une facture fournisseur ou un contrat — l'IA extrait tout en quelques secondes.</p>
            </div>
            <InlineDemo />
          </div>
        </section>

        {/* PROBLEMES SPECIFIQUES */}
        <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Les 6 défis comptables des cabinets médicaux</h2>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '56px', fontSize: '16px' }}>Et comment InvoiceAgent les résout automatiquement.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {[
                { color: '#065f46', problem: "La gestion des factures fournisseurs médicaux aux formats variés", solution: "InvoiceAgent extrait automatiquement les factures de vos distributeurs de consommables, fabricants d'équipements médicaux et prestataires de maintenance. Chaque fournisseur est reconnu par son SIRET — ses factures sont classées automatiquement sans intervention manuelle." },
                { color: '#2563eb', problem: "L'exonération TVA sur les actes médicaux à gérer correctement", solution: "Les actes médicaux sont exonérés de TVA (art. 261-4-1° CGI) mais les achats professionnels restent soumis à TVA non récupérable. InvoiceAgent gère automatiquement cette distinction — aucune erreur de classification entre TVA sur achats et exonération sur honoraires." },
                { color: '#7c3aed', problem: "Les contrats avec les fournisseurs d'équipements médicaux coûteux", solution: "Avant de signer un contrat de maintenance d'équipement médical ou un contrat de location de matériel, uploadez-le dans InvoiceAgent. L'IA identifie les clauses d'exclusivité, les pénalités de résiliation anticipée et les frais cachés de maintenance." },
                { color: '#d97706', problem: "Le suivi des factures dans un cabinet de groupe multi-praticiens", solution: "InvoiceAgent gère les structures multi-praticiens — SCM, SCP, SELAS. Les factures communes (loyer, électricité, secrétariat) sont réparties automatiquement entre les praticiens selon les clés de répartition définies." },
                { color: '#dc2626', problem: "La réconciliation bancaire avec des virements CPAM et mutuelles", solution: "Importez votre relevé bancaire CSV depuis votre banque. InvoiceAgent identifie automatiquement les virements CPAM, les remboursements mutuelles et les paiements directs patients — chacun est rapproché avec la facturation correspondante." },
                { color: '#059669', problem: "L'export FEC pour votre expert-comptable spécialisé médical", solution: "Générez votre FEC conforme DGFiP en un clic. Compatible avec les logiciels utilisés par les experts-comptables spécialisés en professions libérales médicales (Sage, EBP, ACD, Coala)." },
              ].map((item) => (
                <article key={item.problem} style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '28px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Problème</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '16px', lineHeight: 1.4 }}>{item.problem}</h3>
                  <div style={{ width: '32px', height: '2px', backgroundColor: item.color, marginBottom: '16px' }} />
                  <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Solution InvoiceAgent</div>
                  <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{item.solution}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTENU UNIQUE APPROFONDI */}
        <section style={{ padding: '80px 20px', backgroundColor: '#f8fafc' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px', textAlign: 'center' }}>
              La comptabilité d'un cabinet médical libéral : guide complet 2026
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

              {/* SECTION 1 */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#065f46', marginBottom: '20px' }}>La TVA dans les cabinets médicaux : règles et particularités</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  La situation fiscale des médecins libéraux en matière de TVA est particulièrement complexe et source de nombreuses erreurs comptables. Les actes médicaux relevant de la médecine humaine sont exonérés de TVA en vertu de l'article 261-4-1° du Code Général des Impôts (CGI). Cette exonération s'applique aux consultations, aux actes chirurgicaux, aux examens et aux prescriptions médicales — c'est-à-dire à l'intégralité des honoraires perçus d'un médecin dans le cadre de son activité médicale principale.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  Cependant, cette exonération sur les recettes ne signifie pas que le médecin est totalement absent du système de TVA. En tant qu'assujetti exonéré, le médecin paie de la TVA sur ses achats professionnels — fournitures médicales, équipements, loyers, logiciels, abonnements — mais ne peut pas la récupérer via un mécanisme de déduction. Cette TVA sur achats constitue donc un coût définitif pour le cabinet, qu'il convient d'intégrer correctement dans la comptabilité.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  Certaines activités annexes exercées par un médecin peuvent être soumises à TVA, notamment les expertises médicales (médecine du travail, expertises judiciaires), les activités d'enseignement non certifiées, ou les activités esthétiques non thérapeutiques. Ces activités mixtes créent une situation de double statut TVA qui nécessite une comptabilité rigoureuse pour éviter les redressements fiscaux.
                </p>
                <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '10px', padding: '20px' }}>
                  <p style={{ color: '#14532d', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>Comment InvoiceAgent gère-t-il la TVA médicale ?</p>
                  <p style={{ color: '#166534', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                    InvoiceAgent classifie automatiquement les factures fournisseurs selon leur nature — fournitures médicales, équipements, services — et gère correctement la TVA non déductible sur les achats professionnels. L'extraction OCR identifie le taux de TVA mentionné sur chaque facture et l'intègre correctement dans votre comptabilité sans que vous ayez à intervenir.
                  </p>
                </div>
              </div>

              {/* SECTION 2 */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#065f46', marginBottom: '20px' }}>Les régimes comptables des médecins libéraux</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  Les médecins libéraux relèvent de la catégorie des Bénéfices Non Commerciaux (BNC) pour l'imposition de leurs revenus professionnels. Il existe deux régimes principaux : le régime déclaratif spécial (micro-BNC) pour les praticiens dont les recettes annuelles ne dépassent pas 77 700€ en 2026, et la déclaration contrôlée (régime réel) pour les autres ou ceux qui optent volontairement pour ce régime.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  Sous le régime de la déclaration contrôlée, le médecin doit tenir une comptabilité complète de ses recettes et dépenses professionnelles. Les dépenses déductibles comprennent les honoraires rétrocédés (remplaçants), les cotisations sociales et professionnelles, les frais de déplacement, les charges de cabinet (loyer, électricité, téléphone), les fournitures médicales, les frais de formation continue, les équipements et le matériel médical (selon les règles d'amortissement).
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  L'URSSAF et les CPAM imposent des obligations de déclaration trimestrielles ou mensuelles selon le volume d'activité. La gestion de ces flux financiers multiples — honoraires, remboursements CPAM, paiements directs — nécessite un outil de réconciliation bancaire efficace. Un médecin exerçant en secteur 1 et 2 simultanément aura des flux de trésorerie particulièrement complexes à suivre manuellement.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
                  {[
                    { titre: 'Micro-BNC', seuil: '≤ 77 700€', detail: 'Abattement forfaitaire 34% — pas de comptabilité détaillée requise' },
                    { titre: 'Déclaration contrôlée', seuil: '> 77 700€', detail: 'Comptabilité recettes-dépenses complète — FEC recommandé' },
                    { titre: 'SELARL / SELAS', seuil: 'Toutes tailles', detail: 'Comptabilité commerciale obligatoire — FEC obligatoire DGFiP' },
                  ].map((r) => (
                    <div key={r.titre} style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '16px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#065f46', marginBottom: '4px' }}>{r.titre}</div>
                      <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600, marginBottom: '8px' }}>{r.seuil}</div>
                      <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5 }}>{r.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3 */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#065f46', marginBottom: '20px' }}>Gestion des fournisseurs médicaux : équipements, consommables et services</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  La gestion des achats d'un cabinet médical est particulièrement complexe en raison de la diversité des fournisseurs et des types de dépenses. Un cabinet médical de taille moyenne interagit avec une dizaine à une vingtaine de fournisseurs différents chaque mois : distributeurs de consommables médicaux (compresses, seringues, gants), fabricants d'équipements (électrocardiographe, stéthoscope électronique, appareil de mesure tensionnelle), prestataires de services (maintenance des équipements, nettoyage, blanchisserie), éditeurs de logiciels médicaux (Mediboard, Doctolib, logiciel de facturation CPAM).
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  Chacun de ces fournisseurs envoie ses factures dans des formats différents — PDF natifs, scans, formats propriétaires — et avec des fréquences variables (hebdomadaire pour les consommables, trimestrielle pour les loyers de matériel, annuelle pour les contrats de maintenance). La saisie manuelle de ces factures représente un travail administratif considérable pour un médecin dont le temps est précieux.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  La règle des amortissements s'applique différemment selon la nature des achats. Le matériel médical dont le prix unitaire dépasse 500€ HT doit être amorti sur sa durée d'utilisation (généralement 5 à 10 ans selon le type d'équipement) plutôt qu'être déduit immédiatement. InvoiceAgent identifie automatiquement les factures correspondant à des immobilisations et les signale pour un traitement comptable spécifique.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9 }}>
                  Les contrats de location-maintenance sont particulièrement répandus dans les cabinets médicaux pour les équipements coûteux (IRM, scanner, échographe dans les cabinets spécialisés). Ces contrats comportent fréquemment des clauses d'exclusivité fournisseur, des pénalités de résiliation anticipée importantes et des révisions tarifaires automatiques indexées sur des indices économiques. L'analyse systématique de ces contrats avant signature est essentielle pour éviter des engagements financiers problématiques.
                </p>
              </div>

              {/* SECTION 4 */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#065f46', marginBottom: '20px' }}>Cabinets de groupe et structures multi-praticiens : enjeux comptables spécifiques</h3>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  La tendance au regroupement des médecins libéraux en cabinets de groupe, maisons de santé pluriprofessionnelles (MSP) et centres de santé s'est considérablement accélérée en France ces dernières années. Ces structures présentent des enjeux comptables spécifiques liés au partage des charges communes et à la répartition des recettes entre praticiens.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  La Société Civile de Moyens (SCM) est la structure la plus couramment utilisée pour mutualiser les charges d'un cabinet de groupe. Dans ce cadre, la SCM facture à chaque associé sa quote-part des charges communes (loyer, secrétariat, équipements partagés) selon une clé de répartition définie dans les statuts. La comptabilité de la SCM est distincte de celle de chaque praticien associé, ce qui nécessite un suivi rigoureux des flux entre la structure et ses membres.
                </p>
                <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  Les Sociétés d'Exercice Libéral (SELARL, SELAS, SELAFA) permettent aux médecins d'exercer leur activité dans un cadre sociétaire tout en préservant le secret médical et les règles déontologiques. Ces structures sont soumises à la comptabilité commerciale, ce qui implique l'obligation de tenir un FEC conforme DGFiP et de produire des comptes annuels complets.
                </p>
                <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '20px' }}>
                  <p style={{ color: '#9a3412', fontSize: '14px', fontWeight: 600, margin: '0 0 8px' }}>⚠️ Point d'attention pour les SCM et SEL</p>
                  <p style={{ color: '#c2410c', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                    Les cabinets de groupe en SCM ou en SEL sont soumis à l'obligation FEC DGFiP depuis 2014. En cas de contrôle fiscal, l'absence de FEC conforme expose la structure à une amende minimale de 5 000€. InvoiceAgent génère automatiquement le FEC de la structure depuis les factures fournisseurs traitées.
                  </p>
                </div>
              </div>

              {/* SECTION 5 - RGPD */}
              <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '16px', padding: '40px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#065f46', marginBottom: '20px' }}>RGPD et données médicales : ce qu'InvoiceAgent traite (et ne traite pas)</h3>
                <p style={{ color: '#166534', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  Les cabinets médicaux sont soumis à des obligations RGPD renforcées en raison du traitement de données de santé, qui constituent des données sensibles au sens de l'article 9 du RGPD. Il est donc légitime que les praticiens vérifient attentivement quelles données leurs outils informatiques collectent et traitent.
                </p>
                <p style={{ color: '#166534', fontSize: '15px', lineHeight: 1.9, marginBottom: '20px' }}>
                  InvoiceAgent traite exclusivement des données comptables : factures fournisseurs (avec les informations de l'entreprise émettrice, les montants et les dates), relevés bancaires (avec les transactions financières) et contrats de prestation. InvoiceAgent ne collecte, ne traite et ne stocke aucune donnée patient — ni dossier médical, ni identité de patient, ni diagnostic, ni ordonnance.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <p style={{ color: '#059669', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>✓ Ce qu'InvoiceAgent traite</p>
                    {['Factures fournisseurs médicaux', 'Relevés bancaires CSV', 'Contrats prestataires', 'Données comptables générales'].map((item) => (
                      <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ color: '#059669', flexShrink: 0 }}>→</span>
                        <span style={{ color: '#166534', fontSize: '13px' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ color: '#dc2626', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>✗ Ce qu'InvoiceAgent ne traite jamais</p>
                    {['Dossiers médicaux patients', 'Identités ou coordonnées patients', 'Diagnostics ou prescriptions', 'Données de santé sensibles'].map((item) => (
                      <div key={item} style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ color: '#dc2626', flexShrink: 0 }}>→</span>
                        <span style={{ color: '#166534', fontSize: '13px' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* WHY */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#065f46', marginBottom: '16px' }}>Pourquoi les médecins libéraux choisissent InvoiceAgent</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    'OCR factures fournisseurs médicaux en moins de 5 secondes',
                    'Exonération TVA médicale gérée automatiquement',
                    'Rapprochement CPAM et virements patients automatique',
                    'Analyse contrats équipements avant signature',
                    'Export FEC conforme DGFiP — compatible ACD, Coala',
                    'Multi-praticiens — SCM, SCP, SELAS',
                    'Aucune donnée patient collectée — RGPD médical',
                    'Photo smartphone depuis le cabinet ou les urgences',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#065f46', flexShrink: 0 }}>→</span>
                      <p style={{ color: '#475569', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        <PricingToggle plans={plans} accentColor="#065f46" accentBg="#ecfdf5" />

        <section id="faq" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '48px' }}>Questions fréquentes — Facturation cabinet médical</h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        <section style={{ padding: '48px 20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Découvrez toutes les fonctionnalités InvoiceAgent</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Extraction facture PDF', href: `${BASE_URL}/extraction-facture-pdf` },
                { label: 'Analyse contrats IA', href: `${BASE_URL}/analyse-contrat-ia` },
                { label: 'Réconciliation bancaire CSV', href: `${BASE_URL}/reconciliation-bancaire-csv` },
                { label: 'Export FEC comptable', href: `${BASE_URL}/export-fec-comptable` },
                { label: 'TVA automatique PME', href: `${BASE_URL}/tva-automatique-pme` },
              ].map((link) => (
                <a key={link.label} href={link.href} style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', color: '#065f46', textDecoration: 'none', fontWeight: 500 }}>{link.label} →</a>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)', color: 'white', padding: '80px 20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' }}>Automatisez la comptabilité de votre cabinet médical</h2>
          <p style={{ fontSize: '18px', marginBottom: '36px', opacity: 0.9 }}>5 factures gratuites — sans carte bancaire, sans installation.</p>
          <a href={`${BASE_URL}/auth/login`} style={{ display: 'inline-block', backgroundColor: '#6ee7b7', color: '#064e3b', padding: '16px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', textDecoration: 'none' }}>Commencer gratuitement</a>
          <p style={{ marginTop: '16px', opacity: 0.5, fontSize: '14px' }}>Sans engagement · RGPD conforme · Aucune donnée patient collectée</p>
        </section>

      </main>
      <SharedFooter />
    </>
  )
}