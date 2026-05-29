import type { Metadata, Viewport } from "next";
import "./globals.css";
import NavbarClient from "@/components/NavbarClient";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
export const metadata: Metadata = {
  title: { default: "InvoiceAgent - Extrayez et analysez vos factures en 15s - Gratuit", template: "%s | InvoiceAgent" },
  description: "Importez vos factures gratuitement, l IA extrait les donnees en 15 secondes. Rapprochement bancaire CSV, detection doublons et clauses abusives. Sans carte bancaire.",
  keywords: ["logiciel facture automatique", "rapprochement bancaire automatique", "extraction facture IA"],
  authors: [{ name: "InvoiceAgent" }],
  creator: "InvoiceAgent",
  publisher: "InvoiceAgent",
  metadataBase: new URL("https://invoiceagent.fr"),
  alternates: { canonical: "https://invoiceagent.fr" },
  openGraph: { type: "website", locale: "fr_FR", url: "https://invoiceagent.fr", siteName: "InvoiceAgent", title: "InvoiceAgent - Extrayez et analysez vos factures en 15s - Gratuit", description: "Importez vos factures gratuitement, l IA extrait les donnees en 15 secondes." },
  twitter: { card: "summary_large_image", title: "InvoiceAgent - Extrayez vos factures en 15s - Gratuit", description: "Importez vos factures gratuitement, l IA extrait les donnees en 15 secondes. Sans carte bancaire." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: { google: "LeC_eM_ljGwGHtXKOyKwXlC7AXxcw2FiE9UYLgLKpT8" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, maximumScale: 1, userScalable: false };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body style={{ margin: 0, padding: 0, background: "#fafaf9" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          html, body { overflow-x: hidden; max-width: 100vw; }
          body { font-family: 'DM Sans', sans-serif; }
        `}</style>
        <NavbarClient />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
