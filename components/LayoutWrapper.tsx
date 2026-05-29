"use client";
import { usePathname } from "next/navigation";

const marketingPaths = [
  '/blog', '/tarifs', '/mentions-legales', '/cgu', '/confidentialite',
  '/extraction-facture-pdf', '/reconciliation-bancaire-csv', '/analyse-contrat-ia',
  '/logiciel-comptabilite-pme', '/facturation-', '/export-fec-comptable',
  '/tva-automatique-pme', '/logiciel-facturation-', '/landing',
  '/detection-clauses-abusives', '/detection-frais-caches', '/detection-doublons-factures',
  '/verifier-contrat-avant-signature', '/analyse-contrat-prestation',
  '/extraction-donnees-facture', '/ocr-factures-pdf', '/programme-parrainage',
  '/erreur-tva-facture-comment-corriger', '/logiciel-tva-automatique-pme',
  '/calcul-tva-erreur-entreprise', '/erreurs-facture-frequentes-pme',
  '/comment-verifier-facture-fournisseur', '/doublon-facture-que-faire',
  '/controle-facture-automatise', '/clauses-abusives-contrat-exemple',
  '/comment-analyser-contrat-fournisseur', '/risque-contrat-prestation-entreprise',
  '/frais-caches-contrat-entreprise', '/rapprochement-bancaire-erreur',
  '/logiciel-rapprochement-bancaire-automatique', '/ecart-rapprochement-bancaire-solution',
  '/comment-detecter-erreur-facture-pdf', '/outil-analyse-facture-automatique',
  '/scanner-facture-detecter-erreurs', '/perte-argent-facture-entreprise',
  '/frais-caches-facture-comment-detecter', '/erreurs-facturation-tva-artisan',
  '/comment-eviter-pertes-comptabilite-pme', '/tva-recuperable-erreur-facture',
  '/erreurs-facture-frequentes-pme',
];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMarketing = pathname === "/" || marketingPaths.some(p => pathname?.startsWith(p));
  const isAuth = pathname?.startsWith("/auth");
  if (isMarketing || isAuth) return <>{children}</>;
  return (
    <>
      <style>{`
        @media (min-width: 768px) { .layout-offset { margin-left: 220px; min-height: 100vh; } }
        @media (max-width: 767px) { .layout-offset { margin-left: 0; min-height: 100vh; } }
      `}</style>
      <div className="layout-offset">{children}</div>
    </>
  );
}
