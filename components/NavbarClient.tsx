"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const GOLD = "#e8b84b";
const BG = "#131f2e";
const BORDER = "#2e4058";

const links = [
  { href: "/invoices", label: "Importer" },
  { href: "/dashboard", label: "Mes factures" },
  { href: "/reconciliation", label: "Banque" },
  { href: "/pricing", label: "Tarifs" },
];

const marketingPaths = [
  '/blog', '/tarifs', '/mentions-legales', '/cgu', '/confidentialite',
  '/extraction-facture-pdf', '/reconciliation-bancaire-csv', '/analyse-contrat-ia',
  '/logiciel-comptabilite-pme', '/facturation-', '/export-fec-comptable',
  '/tva-automatique-pme', '/logiciel-facturation-', '/logiciel-comptabilite-', '/landing',
];

function Logo() {
  return (
    <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: BG, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: GOLD, fontFamily: "DM Sans, sans-serif", letterSpacing: -1 }}>IA</span>
        <div style={{ position: "absolute", top: 3, right: 3, width: 5, height: 5, borderRadius: "50%", background: "#818cf8" }} />
      </div>
      <span style={{ fontSize: 15, fontWeight: 700, color: "#111827", letterSpacing: -0.3 }}>InvoiceAgent</span>
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
          .ia-nav-mobile { position: sticky; top: 0; z-index: 100; background: #fff; border-bottom: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
          .ia-nav-bar { display: flex; align-items: center; justify-content: space-between; padding: 0 16px; height: 54px; }
          .ia-dropdown { background: white; border-top: 1px solid #f3f4f6; padding: 8px 12px 14px; display: flex; flex-direction: column; gap: 2px; }
          .ia-mob-link { display: flex; align-items: center; justify-content: space-between; padding: 11px 14px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500; color: #374151; }
          .ia-mob-link.active { color: ${GOLD}; background: #fef9ec; font-weight: 700; border-left: 3px solid ${GOLD}; }
          .ia-hamburger { display: flex; flex-direction: column; gap: 4px; cursor: pointer; padding: 8px; border: none; background: none; }
          .ia-hamburger span { display: block; width: 20px; height: 2px; background: #374151; border-radius: 2px; transition: all 0.2s; }
        `}</style>
        <nav className="ia-nav-mobile">
          <div className="ia-nav-bar">
            <Logo />
            <button className="ia-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
            </button>
          </div>
          {menuOpen && (
            <div className="ia-dropdown">
              {links.map((link) => {
                const isActive = pathname?.startsWith(link.href);
                return (
                  <a key={link.href} href={link.href} className={`ia-mob-link${isActive ? ' active' : ''}`}>
                    {link.label}
                    {isActive && <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD }} />}
                  </a>
                );
              })}
              <div style={{ height: 1, background: "#f3f4f6", margin: "6px 0" }} />
              {isLoggedIn ? (
                <button onClick={handleLogout} style={{ padding: "11px 14px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 600, color: "#ef4444", background: "#fef2f2", cursor: "pointer", textAlign: "left" }}>
                  Déconnexion
                </button>
              ) : (
                <a href="/auth/login" style={{ padding: "11px 14px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, color: "white", background: BG, textAlign: "center", display: "block" }}>
                  Connexion
                </a>
              )}
            </div>
          )}
        </nav>
      </>
    );
  }

  // DESKTOP — Logo left | Links center | Auth right
  return (
    <>
      <style>{`
        .ia-navbar { position: sticky; top: 0; z-index: 100; background: #ffffff; border-bottom: 1px solid #e5e7eb; height: 58px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0 28px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .ia-nav-center { display: flex; align-items: center; gap: 2px; }
        .ia-nav-right { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
        .ia-link { display: flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 8px; text-decoration: none; font-size: 13.5px; font-weight: 500; color: #6b7280; transition: all 0.15s; white-space: nowrap; border-bottom: 2px solid transparent; }
        .ia-link:hover { color: #111827; background: #f9fafb; }
        .ia-link.active { color: ${GOLD}; font-weight: 700; border-bottom: 2px solid ${GOLD}; background: #fef9ec; }
        .ia-logout { padding: 7px 16px; border-radius: 8px; border: none; font-size: 13.5px; font-weight: 600; color: #ef4444; background: #fef2f2; cursor: pointer; }
        .ia-login { padding: 7px 18px; border-radius: 8px; text-decoration: none; font-size: 13.5px; font-weight: 600; color: white; background: ${BG}; border: 1px solid ${BORDER}; }
        .ia-login:hover { background: #1e2d40; }
      `}</style>
      <nav className="ia-navbar">
        {/* LEFT — Logo */}
        <div><Logo /></div>

        {/* CENTER — Links */}
        <div className="ia-nav-center">
          {links.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <a key={link.href} href={link.href} className={`ia-link${isActive ? ' active' : ''}`}>
                {link.label}
                {isActive && <span style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD, display: "inline-block" }} />}
              </a>
            );
          })}
        </div>

        {/* RIGHT — Auth */}
        <div className="ia-nav-right">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="ia-logout">Déconnexion</button>
          ) : (
            <a href="/auth/login" className="ia-login">Connexion</a>
          )}
        </div>
      </nav>
    </>
  );
}