"use client";
import { usePathname } from "next/navigation";

const links = [
  { href: "/invoices", label: "Créer une facture", icon: "📄" },
  { href: "/dashboard", label: "Mes factures", icon: "📊" },
  { href: "/reconciliation", label: "Banque", icon: "🏦" },
];

// All marketing/SEO paths where dashboard navbar should be hidden
const marketingPaths = [
  "/analyse-contrat-ia",
  "/analyse-contrat-prestation",
  "/blog",
  "/cgu",
  "/confidentialite",
  "/detection-clauses-abusives",
  "/detection-doublons-factures",
  "/detection-frais-caches",
  "/export-fec-comptable",
  "/extraction-facture-pdf",
  "/facturation-agence-communication",
  "/facturation-agence-immobiliere",
  "/facturation-architecte",
  "/facturation-artisan",
  "/facturation-auto-entrepreneur",
  "/facturation-avocat",
  "/facturation-btp-construction",
  "/facturation-cabinet-comptable",
  "/facturation-cabinet-medical",
  "/facturation-carreleur",
  "/facturation-coach",
  "/facturation-consultant-it",
  "/facturation-electricien",
  "/facturation-freelance",
  "/facturation-macon",
  "/facturation-menuisier",
  "/facturation-micro-entreprise",
  "/facturation-peintre",
  "/facturation-photographe",
  "/facturation-plombier",
  "/facturation-restaurant",
  "/facturation-traducteur",
  "/landing",
  "/logiciel-comptabilite-pme",
  "/logiciel-facturation-angers",
  "/logiciel-facturation-bordeaux",
  "/logiciel-facturation-dijon",
  "/logiciel-facturation-grenoble",
  "/logiciel-facturation-ia",
  "/logiciel-facturation-le-havre",
  "/logiciel-facturation-lille",
  "/logiciel-facturation-lyon",
  "/logiciel-facturation-marseille",
  "/logiciel-facturation-montpellier",
  "/logiciel-facturation-nantes",
  "/logiciel-facturation-nice",
  "/logiciel-facturation-nimes",
  "/logiciel-facturation-paris",
  "/logiciel-facturation-reims",
  "/logiciel-facturation-rennes",
  "/logiciel-facturation-saint-etienne",
  "/logiciel-facturation-strasbourg",
  "/logiciel-facturation-toulon",
  "/logiciel-facturation-toulouse",
  "/logiciel-facturation-tours",
  "/mentions-legales",
  "/pricing",
  "/reconciliation-bancaire-csv",
  "/tarifs",
  "/tva-automatique-pme",
  "/verifier-contrat-avant-signature",
  // NEW SEO pages
  "/perte-argent-facture-entreprise",
  "/frais-caches-facture-comment-detecter",
  "/erreurs-facturation-tva-artisan",
  "/comment-eviter-pertes-comptabilite-pme",
  "/tva-recuperable-erreur-facture",
  "/erreur-tva-facture-comment-corriger",
  "/logiciel-tva-automatique-pme",
  "/calcul-tva-erreur-entreprise",
  "/erreurs-facture-frequentes-pme",
  "/comment-verifier-facture-fournisseur",
  "/doublon-facture-que-faire",
  "/controle-facture-automatise",
  "/clauses-abusives-contrat-exemple",
  "/comment-analyser-contrat-fournisseur",
  "/risque-contrat-prestation-entreprise",
  "/frais-caches-contrat-entreprise",
  "/rapprochement-bancaire-erreur",
  "/logiciel-rapprochement-bancaire-automatique",
  "/ecart-rapprochement-bancaire-solution",
  "/comment-detecter-erreur-facture-pdf",
  "/outil-analyse-facture-automatique",
  "/scanner-facture-detecter-erreurs",
  "/extraction-donnees-facture",
  "/ocr-factures-pdf",
];

export default function NavbarClient() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  if (marketingPaths.some((p) => pathname?.startsWith(p))) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {links.map((link) => {
        const isActive = pathname?.startsWith(link.href);
        return (
          <a key={link.href} href={link.href} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: isActive ? 600 : 500, color: isActive ? "#4f46e5" : "#6b7280", background: isActive ? "#eef2ff" : "transparent", border: `1px solid ${isActive ? "#e0e7ff" : "transparent"}`, transition: "all 0.15s", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 15 }}>{link.icon}</span>
            {link.label}
            {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block", marginLeft: 2 }} />}
          </a>
        );
      })}
      <div style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 8px" }} />
      <a href="/auth/login" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, color: "white", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 2px 8px rgba(99,102,241,0.25)", whiteSpace: "nowrap" }}>
        Connexion
      </a>
    </div>
  );
}