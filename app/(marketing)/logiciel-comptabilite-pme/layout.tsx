import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logiciel comptabilité PME automatisé par IA — Factures, banque, contrats",
  description: "Importez vos factures, l'IA extrait les données automatiquement. Rapprochement bancaire CSV, détection clauses abusives, export FEC. Essai gratuit.",
  alternates: {
    canonical: "https://invoiceagent.fr/logiciel-comptabilite-pme",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}