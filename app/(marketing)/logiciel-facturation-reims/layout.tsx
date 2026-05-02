 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logiciel facturation Reims — Extraction automatique par IA",
  description: "Importez vos factures, l'IA extrait les données automatiquement. Solution comptable pour PME et artisans à Reims et Champagne-Ardenne.",
  alternates: {
    canonical: "https://invoiceagent.fr/logiciel-facturation-reims",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}