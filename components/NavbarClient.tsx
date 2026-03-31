"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const links = [
  { href: "/invoices", label: "Importer" },
  { href: "/dashboard", label: "Mes factures" },
  { href: "/reconciliation", label: "Banque" },
  { href: "/pricing", label: "Tarifs" },
];

const marketingPaths = [
  '/blog',
  '/tarifs',
  '/mentions-legales',
  '/cgu',
  '/confidentialite',
  '/extraction-facture-pdf',
  '/reconciliation-bancaire-csv',
  '/analyse-contrat-ia',
  '/logiciel-comptabilite-pme',
  '/facturation-',
  '/export-fec-comptable',
  '/tva-automatique-pme',
  '/logiciel-facturation-',
  '/logiciel-comptabilite-',
  '/landing',
]

export default function NavbarClient() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() { setIsMobile(window.innerWidth < 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    async function checkUser() {
      try {
        const { createClient } = await import("@/lib/supabase");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
      } catch {}
    }
    checkUser();
  }, [pathname]);

  async function handleLogout() {
    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      router.push("/auth/login");
    } catch {}
  }

  // Fshih navbar te homepage dhe te gjitha faqet marketing
  if (pathname === "/" || marketingPaths.some(p => pathname?.startsWith(p))) return null;

  if (isMobile) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 2, overflowX: "auto", WebkitOverflowScrolling: "touch", flexWrap: "nowrap", width: "100%", scrollbarWidth: "none" }}>
        <style>{`nav-scroll::-webkit-scrollbar{display:none}`}</style>
        {links.map((link) => {
          const isActive = pathname?.startsWith(link.href);
          return (
            <a key={link.href} href={link.href} style={{ display: "flex", alignItems: "center", padding: "6px 10px", borderRadius: 6, textDecoration: "none", fontSize: 12, fontWeight: isActive ? 700 : 500, color: isActive ? "#4f46e5" : "#6b7280", background: isActive ? "#eef2ff" : "transparent", whiteSpace: "nowrap", flexShrink: 0, borderBottom: isActive ? "2px solid #6366f1" : "2px solid transparent" }}>
              {link.label}
            </a>
          );
        })}
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          {isLoggedIn ? (
            <button onClick={handleLogout} style={{ padding: "6px 12px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, color: "#ef4444", background: "#fef2f2", cursor: "pointer", whiteSpace: "nowrap" }}>
              Déco.
            </button>
          ) : (
            <a href="/auth/login" style={{ padding: "6px 12px", borderRadius: 6, textDecoration: "none", fontSize: 12, fontWeight: 600, color: "white", background: "#6366f1", whiteSpace: "nowrap" }}>
              Connexion
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {links.map((link) => {
        const isActive = pathname?.startsWith(link.href);
        return (
          <a key={link.href} href={link.href} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: isActive ? 600 : 500, color: isActive ? "#4f46e5" : "#6b7280", background: isActive ? "#eef2ff" : "transparent", border: `1px solid ${isActive ? "#e0e7ff" : "transparent"}`, transition: "all 0.15s", whiteSpace: "nowrap" }}>
            {link.label}
            {isActive && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />}
          </a>
        );
      })}
      <div style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 8px" }} />
      {isLoggedIn ? (
        <button onClick={handleLogout} style={{ padding: "8px 18px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 600, color: "#ef4444", background: "#fef2f2", cursor: "pointer", whiteSpace: "nowrap" }}>
          Déconnexion
        </button>
      ) : (
        <a href="/auth/login" style={{ padding: "8px 18px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, color: "white", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 2px 8px rgba(99,102,241,0.25)", whiteSpace: "nowrap" }}>
          Connexion
        </a>
      )}
    </div>
  );
}