 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logiciel facturation coach et consultant — Automatisé par IA",
  description: "Gérez vos factures clients automatiquement. L'IA extrait et exporte vos données comptables. Idéal pour coaches et consultants indépendants.",
  alternates: {
    canonical: "https://invoiceagent.fr/facturation-coach",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}