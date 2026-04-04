"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

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
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5" />
        <text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="DM Sans">I</text>
        <text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontStyle="italic">A</text>
        <circle cx="28" cy="5" r="3" fill="#818cf8" />
      </svg>
      <span style={{ fontSize: 15, fontWeight: 700, color: TEXT, letterSpacing: -0.3 }}>InvoiceAgent</span>
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
          .ia-nav { position: sticky; top: 0; z-index: 100; background: ${BG}; border-bottom: 1px solid ${BORDER}; }
          .ia-nav-bar { display: flex; align-items: center; justify-content: space-between; padding: 0 16px; height: 54px; }
          .ia-dropdown { background: ${CARD}; border-top: 1px solid ${BORDER}; padding: 8px 12px 14px; display: flex; flex-direction: column; gap: 2px; }
          .ia-mob-link { display: flex; align-items: center; justify-content: space-between; padding: 11px 14px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 500; color: ${MUTED}; letter-spacing: 0.5px; }
          .ia-mob-link.active { color: ${GOLD}; background: ${GOLD}15; font-weight: 700; }
          .ia-hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; padding: 8px; border: none; background: none; }
          .ia-hamburger span { display: block; width: 20px; height: 2px; background: ${MUTED}; border-radius: 2px; transition: all 0.2s; }
        `}</style>
        <nav className="ia-nav">
          <div className="ia-nav-bar">
            <Logo />
            <button className="ia-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
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
              <div style={{ height: 1, background: BORDER, margin: "6px 0" }} />
              {isLoggedIn ? (
                <button onClick={handleLogout} style={{ padding: "11px 14px", borderRadius: 6, border: "none", fontSize: 13, fontWeight: 600, color: "#ef4444", background: "#ef444415", cursor: "pointer", textAlign: "left", letterSpacing: 0.5 }}>
                  Déconnexion
                </button>
              ) : (
                <a href="/auth/login" style={{ padding: "11px 14px", borderRadius: 6, textDecoration: "none", fontSize: 13, fontWeight: 700, color: "#0f1923", background: GOLD, textAlign: "center", display: "block", letterSpacing: 1 }}>
                  CONNEXION
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
        .ia-navbar { position: sticky; top: 0; z-index: 100; background: ${BG}; border-bottom: 1px solid ${BORDER}; height: 58px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0 28px; }
        .ia-center { display: flex; align-items: center; gap: 2px; }
        .ia-right { display: flex; align-items: center; justify-content: flex-end; }
        .ia-link { display: flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 500; color: ${MUTED}; transition: all 0.15s; white-space: nowrap; letter-spacing: 0.5px; border-bottom: 2px solid transparent; }
        .ia-link:hover { color: ${TEXT}; background: ${CARD}; }
        .ia-link.active { color: ${GOLD}; font-weight: 700; border-bottom: 2px solid ${GOLD}; background: ${GOLD}12; }
        .ia-logout { padding: 7px 16px; border-radius: 6px; border: 1px solid #ef444440; font-size: 12px; font-weight: 700; color: #ef4444; background: #ef444415; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; }
        .ia-login { padding: 7px 18px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 800; color: #0f1923; background: ${GOLD}; letter-spacing: 1px; text-transform: uppercase; }
        .ia-login:hover { background: #d4a43a; }
      `}</style>
      <nav className="ia-navbar">
        <div><Logo /></div>
        <div className="ia-center">
          {links.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <a key={link.href} href={link.href} className={`ia-link${isActive ? ' active' : ''}`}>
                {link.label}
                {isActive && <span style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD }} />}
              </a>
            );
          })}
        </div>
        <div className="ia-right">
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