import type { Metadata } from "next";
import "./globals.css";
import NavbarClient from "@/components/NavbarClient";

export const metadata: Metadata = {
  title: "InvoiceAgent",
  description: "Agents IA pour automatiser votre comptabilité",
  verification: {
    google: "LeC_eM_ljGwGHtXKOyKwXlC7AXxcw2FiE9UYLgLKpT8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, background: "#f8fafc" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; }
          body { font-family: 'DM Sans', sans-serif; }
          .navbar {
            position: sticky;
            top: 0;
            z-index: 100;
            background: #ffffff;
            border-bottom: 1px solid #e5e7eb;
            padding: 0 40px;
            height: 58px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          }
          .navbar-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
          }
          .navbar-logo-text {
            font-size: 15px;
            font-weight: 700;
            color: #111827;
            letter-spacing: -0.02em;
          }
          .page-content { min-height: calc(100vh - 58px); }
        `}</style>
        <nav className="navbar">
          <a href="/" className="navbar-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5"/>
              <text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="'DM Sans',sans-serif">I</text>
              <text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontFamily="'Instrument Serif',serif" fontStyle="italic">A</text>
              <circle cx="28" cy="5" r="3" fill="#818cf8"/>
            </svg>
            <span className="navbar-logo-text">InvoiceAgent</span>
          </a>
          <NavbarClient />
        </nav>
        <div className="page-content">
          {children}
        </div>
      </body>
    </html>
  );
}