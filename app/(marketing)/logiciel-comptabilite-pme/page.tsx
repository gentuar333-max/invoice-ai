// ─── UDHEZIME ────────────────────────────────────────────────────────────────
// Kopjo secilin bllok në filen e duhur:
//
// 1. app/(marketing)/logiciel-comptabilite-pme/layout.tsx
// 2. app/(marketing)/facturation-coach/layout.tsx
// 3. app/(marketing)/logiciel-facturation-reims/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────


// ═══════════════════════════════════════════════════════════════════════
// 1. app/(marketing)/logiciel-comptabilite-pme/layout.tsx
// ═══════════════════════════════════════════════════════════════════════
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logiciel comptabilité PME automatisé par IA — Factures, banque, contrats",
  description: "Importez vos factures, l'IA extrait les données automatiquement. Rapprochement bancaire CSV, détection clauses abusives, export FEC. Essai gratuit.",
  alternates: {
    canonical: "https://invoiceagent.fr/logiciel-comptabilite-pme",
  },
  openGraph: {
    title: "Logiciel comptabilité PME — InvoiceAgent",
    description: "Importez vos factures, l'IA extrait les données automatiquement. Rapprochement bancaire, export FEC. Essai gratuit.",
    url: "https://invoiceagent.fr/logiciel-comptabilite-pme",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


// ═══════════════════════════════════════════════════════════════════════
// 2. app/(marketing)/facturation-coach/layout.tsx
// ═══════════════════════════════════════════════════════════════════════
// import type { Metadata } from "next";
//
// export const metadata: Metadata = {
//   title: "Logiciel facturation coach et consultant — Automatisé par IA",
//   description: "Gérez vos factures clients automatiquement. L'IA extrait, catégorise et exporte vos données comptables. Idéal pour coaches et consultants indépendants.",
//   alternates: {
//     canonical: "https://invoiceagent.fr/facturation-coach",
//   },
//   openGraph: {
//     title: "Facturation coach — InvoiceAgent",
//     description: "Gérez vos factures clients automatiquement. Essai gratuit.",
//     url: "https://invoiceagent.fr/facturation-coach",
//   },
// };
//
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return <>{children}</>;
// }


// ═══════════════════════════════════════════════════════════════════════
// 3. app/(marketing)/logiciel-facturation-reims/layout.tsx
// ═══════════════════════════════════════════════════════════════════════
// import type { Metadata } from "next";
//
// export const metadata: Metadata = {
//   title: "Logiciel facturation Reims — Extraction automatique par IA",
//   description: "Importez vos factures, l'IA extrait les données automatiquement. Solution comptable pour PME et artisans à Reims et Champagne-Ardenne.",
//   alternates: {
//     canonical: "https://invoiceagent.fr/logiciel-facturation-reims",
//   },
//   openGraph: {
//     title: "Logiciel facturation Reims — InvoiceAgent",
//     description: "Extraction automatique de factures par IA. Essai gratuit.",
//     url: "https://invoiceagent.fr/logiciel-facturation-reims",
//   },
// };
//
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return <>{children}</>;
// }