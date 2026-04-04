"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

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
];

function Logo() {
  return (
    <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5" />
        <text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="DM Sans">I</text>
        <text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontStyle="italic">A</text>
        <circle cx="28" cy="5" r="3" fill="#818cf8" />
      </svg>
      <span style={{ fontSize: 16, fontWeight: 700, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        InvoiceAgent
      </span>
    </a>
  );
}

export default function NavbarClient() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  async function handleLogout() {
    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      router.push("/auth/login");
    } catch {}
  }

  if (pathname === "/" || marketingPaths.some(p => pathname?.startsWith(p))) return null;

  // MOBILE
  if (isMobile) {
    return (
      <>
        <style>{`
          .nav-mobile { position: sticky; top: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
          .nav-mobile-bar { display: flex; align-items: center; justify-content: space-between; padding: 0 16px; height: 54px; }
          .nav-mobile-dropdown { background: white; border-top: 1px solid #f3f4f6; padding: 8px 12px 12px; display: flex; flex-direction: column; gap: 4px; }
          .nav-mobile-link { display: flex; align-items: center; padding: 10px 12px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500; color: #374151; transition: all 0.15s; }
          .nav-mobile-link.active { color: #4f46e5; background: #eef2ff; font-weight: 700; }
          .nav-mobile-link:hover { background: #f9fafb; }
          .hamburger { display: flex; flex-direction: column; gap: 4px; cursor: pointer; padding: 8px; border: none; background: none; }
          .hamburger span { display: block; width: 20px; height: 2px; background: #374151; border-radius: 2px; transition: all 0.2s; }
        `}</style>
        <nav className="nav-mobile">
          <div className="nav-mobile-bar">
            <Logo />
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
            </button>
          </div>
          {menuOpen && (
            <div className="nav-mobile-dropdown">
              {links.map((link) => {
                const isActive = pathname?.startsWith(link.href);
                return (
                  <a key={link.href} href={link.href} className={`nav-mobile-link${isActive ? ' active' : ''}`}>
                    {link.label}
                    {isActive && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />}
                  </a>
                );
              })}
              <div style={{ height: 1, background: '#f3f4f6', margin: '6px 0' }} />
              {isLoggedIn ? (
                <button onClick={handleLogout} style={{ padding: "10px 12px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 600, color: "#ef4444", background: "#fef2f2", cursor: "pointer", textAlign: "left" }}>
                  Déconnexion
                </button>
              ) : (
                <a href="/auth/login" style={{ padding: "10px 12px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, color: "white", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", textAlign: "center" }}>
                  Connexion
                </a>
              )}
            </div>
          )}
        </nav>
      </>
    );
  }

  // DESKTOP
  return (
    <>
      <style>{`
        .navbar { position: sticky; top: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e5e7eb; padding: 0 32px; height: 58px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .nav-links { display: flex; align-items: center; gap: 4px; }
        .nav-link { display: flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500; color: #6b7280; transition: all 0.15s; border: 1px solid transparent; }
        .nav-link:hover { color: #4f46e5; background: #f5f3ff; }
        .nav-link.active { color: #4f46e5; background: #eef2ff; font-weight: 600; border-color: #e0e7ff; }
        .nav-divider { width: 1px; height: 20px; background: #e5e7eb; margin: 0 8px; }
        .nav-logout { padding: 8px 18px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600; color: #ef4444; background: #fef2f2; cursor: pointer; }
        .nav-login { padding: 8px 18px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600; color: white; background: linear-gradient(135deg, #6366f1, #8b5cf6); box-shadow: 0 2px 8px rgba(99,102,241,0.25); }
      `}</style>
      <nav className="navbar">
        <Logo />
        <div className="nav-links">
          {links.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <a key={link.href} href={link.href} className={`nav-link${isActive ? ' active' : ''}`}>
                {link.label}
                {isActive && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#6366f1" }} />}
              </a>
            );
          })}
          <div className="nav-divider" />
          {isLoggedIn ? (
            <button onClick={handleLogout} className="nav-logout">Déconnexion</button>
          ) : (
            <a href="/auth/login" className="nav-login">Connexion</a>
          )}
        </div>
      </nav>
    </>
  );
}