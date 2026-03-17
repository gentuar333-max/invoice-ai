import type { Metadata } from "next";
import "./globals.css";
import NavbarClient from "@/components/NavbarClient";

export const metadata: Metadata = {
  title: "AgentHub",
  description: "Agents IA pour automatiser votre comptabilite",
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
          .navbar-logo-icon {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
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
            <div className="navbar-logo-icon">🤖</div>
            <span className="navbar-logo-text">AgentHub</span>
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