import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://invoiceagent.fr"),
  title: {
    default: "InvoiceAgent — Extrayez, rapprochez et analysez vos factures en 30s",
    template: "%s | InvoiceAgent",
  },
  description: "Importez vos factures, l'IA extrait les données automatiquement. Rapprochement bancaire CSV, détection de doublons et clauses abusives inclus. Essai gratuit.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "InvoiceAgent",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ margin: 0, padding: 0 }}>{children}</div>;
}