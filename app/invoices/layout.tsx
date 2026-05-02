 
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Importer une facture — Extraction automatique par IA",
  description: "Importez vos factures, l'IA extrait les données automatiquement : fournisseur, montants HT/TVA/TTC, dates et lignes de détail. Détection des doublons incluse.",
  alternates: {
    canonical: "https://invoiceagent.fr/invoices",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function InvoicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}