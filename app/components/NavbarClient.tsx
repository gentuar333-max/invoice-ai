"use client";
import { usePathname } from "next/navigation";

const links = [
  { href: "/invoices", label: "Créer une facture", icon: "📄" },
  { href: "/dashboard", label: "Mes factures", icon: "📊" },
  { href: "/reconciliation", label: "Banque", icon: "🏦" },
];

export default function NavbarClient() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {links.map((link) => {
        const isActive = pathname?.startsWith(link.href);
        return (
          <a key={link.href} href={link.href} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: isActive ? 600 : 500, color: isActive ? "#4f46e5" : "#6b7280", background: isActive ? "#eef2ff" : "transparent", border: `1px solid ${isActive ? "#e0e7ff" : "transparent"}`, transition: "all 0.15s", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 15 }}>{link.icon}</span>
            {link.label}
            {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1", display: "inline-block", marginLeft: 2 }} />}
          </a>
        );
      })}
      <div style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 8px" }} />
      <a href="/auth/login" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 18px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, color: "white", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 2px 8px rgba(99,102,241,0.25)", whiteSpace: "nowrap" }}>
        Connexion
      </a>
    </div>
  );
}