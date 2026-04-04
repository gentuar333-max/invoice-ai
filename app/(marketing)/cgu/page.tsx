
import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | InvoiceAgent",
  description: "Conditions générales d'utilisation du service InvoiceAgent — droits, obligations, abonnements et responsabilités.",
  alternates: { canonical: `${BASE_URL}/cgu` },
  robots: { index: false, follow: false },
}

export default function CGUPage() {
  return (
    <>
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '16px', padding: '48px', border: '1px solid #e2e8f0' }}>

          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Conditions Générales d'Utilisation</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '48px' }}>Dernière mise à jour : mars 2026</p>

          {[
            { title: '1. Objet', content: "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du service InvoiceAgent, accessible à l'adresse invoiceagent.fr. En créant un compte ou en utilisant le service, l'utilisateur accepte sans réserve les présentes CGU." },
            { title: '2. Description du service', content: "InvoiceAgent est un service d'automatisation comptable par intelligence artificielle. Il permet l'extraction automatique de données de factures PDF, la réconciliation bancaire via import CSV, l'analyse de contrats fournisseurs et la génération de fichiers FEC conformes DGFiP. Le service est fourni « en l'état » et l'éditeur ne garantit pas l'exactitude à 100% des données extraites par l'IA. L'utilisateur est responsable de la vérification des données avant toute utilisation fiscale ou comptable." },
            { title: '3. Inscription et compte utilisateur', content: "L'accès au service nécessite la création d'un compte. L'utilisateur s'engage à fournir des informations exactes lors de l'inscription et à maintenir la confidentialité de ses identifiants. L'utilisateur est seul responsable des actions effectuées depuis son compte. En cas de suspicion d'utilisation frauduleuse, l'éditeur se réserve le droit de suspendre ou supprimer le compte sans préavis." },
            { title: '4. Plans et abonnements', content: "InvoiceAgent propose plusieurs plans d'abonnement : un plan gratuit limité à 5 extractions de factures par mois, et des plans payants (Starter à 19€/mois, Pro à 29€/mois, Business à 49€/mois). Les abonnements payants sont sans engagement et peuvent être résiliés à tout moment. En cas de résiliation, l'accès aux fonctionnalités payantes reste actif jusqu'à la fin de la période déjà payée. Les tarifs peuvent être modifiés avec un préavis de 30 jours par email." },
            { title: '5. Paiement', content: "Les paiements sont traités par Stripe, un prestataire de paiement tiers sécurisé. InvoiceAgent ne stocke aucune donnée bancaire. La facturation est mensuelle ou annuelle selon le plan choisi. En cas de paiement échoué, l'accès aux fonctionnalités payantes peut être suspendu jusqu'à régularisation." },
            { title: '6. Données utilisateur', content: "L'utilisateur conserve la propriété de ses données (factures, relevés bancaires, contrats). En utilisant le service, l'utilisateur accorde à InvoiceAgent une licence limitée pour traiter ces données aux fins de fourniture du service. Les données sont traitées conformément à la politique de confidentialité. L'éditeur s'engage à ne pas utiliser les données des utilisateurs à des fins commerciales ou publicitaires." },
            { title: '7. Utilisation acceptable', content: "L'utilisateur s'engage à utiliser le service conformément à la loi française et européenne. Sont notamment interdits : l'utilisation du service à des fins illégales, le contournement des limitations du plan gratuit, la revente ou redistribution du service, et toute tentative d'accès non autorisé aux systèmes d'InvoiceAgent." },
            { title: '8. Disponibilité du service', content: "L'éditeur s'efforce d'assurer la disponibilité du service 24h/24, 7j/7. Des interruptions de service peuvent survenir pour maintenance, mises à jour ou raisons techniques indépendantes de la volonté de l'éditeur. L'éditeur ne saurait être tenu responsable des interruptions de service." },
            { title: '9. Responsabilité', content: "InvoiceAgent est un outil d'aide à la gestion comptable. Les données extraites par l'IA (montants, TVA, SIRET, dates) doivent être vérifiées par l'utilisateur ou son expert-comptable avant utilisation à des fins fiscales. L'éditeur ne saurait être tenu responsable des erreurs d'extraction, d'interprétation ou de calcul. La responsabilité de l'éditeur est limitée au montant des abonnements payés par l'utilisateur au cours des 12 derniers mois." },
            { title: '10. Modification des CGU', content: "L'éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés par email de toute modification substantielle. L'utilisation continue du service après modification vaut acceptation des nouvelles CGU." },
            { title: '11. Résiliation', content: "L'utilisateur peut résilier son compte à tout moment depuis son dashboard ou en contactant contact@invoiceagent.fr. L'éditeur se réserve le droit de résilier tout compte en cas de violation des présentes CGU." },
            { title: '12. Droit applicable', content: "Les présentes CGU sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux de Dijon seront seuls compétents." },
          ].map((section) => (
            <section key={section.title} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>{section.title}</h2>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8 }}>{section.content}</p>
            </section>
          ))}

          <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '20px', border: '1px solid #e2e8f0', marginTop: '16px' }}>
            <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
              Pour toute question relative aux présentes CGU :<br />
              <a href="mailto:contact@invoiceagent.fr" style={{ color: '#6366f1', textDecoration: 'none' }}>contact@invoiceagent.fr</a> · 9 rue Édouard Herriot, 21300 Chenôve, France
            </p>
          </div>

        </div>
      </main>
      <SharedFooter />
    </>
  )
}