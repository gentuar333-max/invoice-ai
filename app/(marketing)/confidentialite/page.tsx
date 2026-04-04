import { Metadata } from 'next'
import SharedNav from '@/components/SharedNav'
import SharedFooter from '@/components/SharedFooter'

const BASE_URL = 'https://invoiceagent.fr'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | InvoiceAgent',
  description: 'Politique de confidentialité InvoiceAgent — collecte, traitement et protection de vos données personnelles. Conformité RGPD.',
  alternates: { canonical: `${BASE_URL}/confidentialite` },
  robots: { index: false, follow: false },
}

export default function ConfidentialitePage() {
  return (
    <>
      <SharedNav />
      <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', borderRadius: '16px', padding: '48px', border: '1px solid #e2e8f0' }}>

          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Politique de Confidentialité</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '48px' }}>Dernière mise à jour : mars 2026 — Conforme RGPD (Règlement UE 2016/679)</p>

          {[
            {
              title: '1. Responsable du traitement',
              content: "Le responsable du traitement des données personnelles collectées via invoiceagent.fr est Riart Mehanja, 9 rue Édouard Herriot, 21300 Chenôve, France. Contact : contact@invoiceagent.fr"
            },
            {
              title: '2. Données collectées',
              content: "InvoiceAgent collecte les données suivantes :\n\n• Données de compte : adresse email, mot de passe (chiffré), plan d'abonnement.\n• Données de facturation : factures PDF et photos uploadées par l'utilisateur, données extraites (fournisseur, SIRET, montants, TVA, dates).\n• Données bancaires : relevés bancaires CSV importés par l'utilisateur.\n• Données contractuelles : contrats PDF uploadés pour analyse.\n• Données techniques : adresse IP, navigateur, logs de connexion.\n\nInvoiceAgent ne collecte jamais vos identifiants bancaires ni vos coordonnées de carte de crédit."
            },
            {
              title: '3. Finalités du traitement',
              content: "Les données collectées sont utilisées pour :\n\n• Fournir le service d'extraction automatique de factures par IA.\n• Effectuer la réconciliation bancaire automatique.\n• Analyser les contrats fournisseurs.\n• Générer les fichiers FEC comptables.\n• Envoyer des alertes TVA et notifications de service par email.\n• Facturer les abonnements payants (via Stripe).\n• Améliorer la précision de l'IA (données anonymisées uniquement)."
            },
            {
              title: '4. Base légale du traitement',
              content: "Le traitement de vos données est fondé sur :\n\n• L'exécution du contrat : traitement nécessaire à la fourniture du service.\n• Le consentement : pour l'envoi d'emails marketing (révocable à tout moment).\n• L'intérêt légitime : pour la sécurité du service et la prévention des fraudes."
            },
            {
              title: '5. Hébergement et transferts de données',
              content: "Vos données sont hébergées exclusivement dans l'Union Européenne, sur les serveurs de Supabase (Frankfurt, Allemagne). Aucune donnée personnelle n'est transférée en dehors de l'UE.\n\nPrestataires tiers impliqués dans le traitement :\n• Supabase (base de données) — Frankfurt, UE\n• Vercel (hébergement web) — CDN mondial, données utilisateur en UE\n• Stripe (paiement) — conforme PCI DSS\n• Resend (emails transactionnels) — conforme RGPD\n• Google Gemini AI (extraction IA) — les documents sont traités puis supprimés immédiatement"
            },
            {
              title: '6. Durée de conservation',
              content: "• Données de compte : conservées pendant toute la durée de l'abonnement + 3 ans après résiliation.\n• Factures et données extraites : conservées pendant la durée de l'abonnement + 1 an.\n• Logs techniques : conservés 12 mois.\n• Données de paiement : gérées par Stripe selon leur politique (5 ans).\n\nÀ l'expiration de ces délais, vos données sont supprimées de manière définitive."
            },
            {
              title: '7. Vos droits',
              content: "Conformément au RGPD, vous disposez des droits suivants :\n\n• Droit d'accès : obtenir une copie de vos données personnelles.\n• Droit de rectification : corriger des données inexactes.\n• Droit à l'effacement : demander la suppression de vos données.\n• Droit à la portabilité : recevoir vos données dans un format structuré.\n• Droit d'opposition : vous opposer au traitement de vos données.\n• Droit de limitation : restreindre le traitement de vos données.\n\nPour exercer ces droits, contactez : contact@invoiceagent.fr\n\nVous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) — cnil.fr"
            },
            {
              title: '8. Sécurité des données',
              content: "InvoiceAgent met en œuvre les mesures de sécurité suivantes :\n\n• Chiffrement AES-256 des données en transit (HTTPS) et au repos.\n• Authentification sécurisée via Supabase Auth.\n• Accès aux données restreint au minimum nécessaire.\n• Sauvegardes régulières chiffrées.\n• Aucun stockage de mot de passe en clair (hachage bcrypt).\n\nEn cas de violation de données, vous serez informé dans les 72 heures conformément au RGPD."
            },
            {
              title: '9. Cookies',
              content: "InvoiceAgent utilise uniquement des cookies techniques nécessaires au fonctionnement du service :\n\n• Cookie de session : maintient votre connexion (durée : session).\n• Cookie d'authentification Supabase : nécessaire à la sécurité du compte.\n\nAucun cookie publicitaire ou de tracking tiers n'est utilisé."
            },
            {
              title: '10. Modifications',
              content: "Cette politique de confidentialité peut être modifiée. Toute modification substantielle sera notifiée par email. La date de dernière mise à jour est indiquée en haut de cette page."
            },
            {
              title: '11. Contact',
              content: "Pour toute question relative à cette politique ou à vos données personnelles :\n\nEmail : contact@invoiceagent.fr\nAdresse : 9 rue Édouard Herriot, 21300 Chenôve, France\n\nAutorité de contrôle : CNIL — 3 Place de Fontenoy, 75007 Paris — cnil.fr"
            },
          ].map((section) => (
            <section key={section.title} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #6366f1' }}>{section.title}</h2>
              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{section.content}</p>
            </section>
          ))}

          <div style={{ backgroundColor: '#eff6ff', borderRadius: '10px', padding: '20px', border: '1px solid #bfdbfe', marginTop: '16px' }}>
            <p style={{ color: '#1e40af', fontSize: '13px', margin: 0, fontWeight: 500 }}>
              ✓ Données hébergées en Europe (Frankfurt, UE) · ✓ Conformité RGPD · ✓ Aucune vente de données · ✓ Suppression sur demande
            </p>
          </div>

        </div>
      </main>
      <SharedFooter />
    </>
  )
}