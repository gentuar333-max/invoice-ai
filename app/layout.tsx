import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invoice Agent",
  description: "Extraction automatique de factures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <nav style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 32px",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>
            Invoice Agent 🤖
          </span>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="/invoices" style={{ fontSize: 14, color: "#374151", textDecoration: "none" }}>
              Nouvelle facture
            </a>
            <a href="/dashboard" style={{ fontSize: 14, color: "#374151", textDecoration: "none" }}>
              Dashboard
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}