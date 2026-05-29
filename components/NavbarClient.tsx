"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
const C = { bg: "#ffffff", sidebar: "#fafaf9", border: "#e8e5e0", accent: "#6366f1", text: "#1c1917", muted: "#78716c", hover: "#f5f4f2", active: "#eeecff" };
const navLinks = [
  { href: "/dashboard", label: "Mes factures" },
  { href: "/invoices", label: "Nouvelle facture" },
  { href: "/reconciliation", label: "Banque" },
  { href: "/pricing", label: "Abonnements" },
  { href: "/settings", label: "Profil" },
];
const marketingPaths = [
  '/blog', '/tarifs', '/mentions-legales', '/cgu', '/confidentialite',
  '/extraction-facture-pdf', '/reconciliation-bancaire-csv', '/analyse-contrat-ia',
  '/logiciel-comptabilite-pme', '/facturation-', '/export-fec-comptable',
  '/tva-automatique-pme', '/logiciel-facturation-', '/landing',
  '/detection-clauses-abusives', '/detection-frais-caches', '/detection-doublons-factures',
  '/verifier-contrat-avant-signature', '/analyse-contrat-prestation',
  '/extraction-donnees-facture', '/ocr-factures-pdf', '/programme-parrainage',
  '/erreur-tva-facture-comment-corriger', '/logiciel-tva-automatique-pme',
  '/calcul-tva-erreur-entreprise', '/erreurs-facture-frequentes-pme',
  '/comment-verifier-facture-fournisseur', '/doublon-facture-que-faire',
  '/controle-facture-automatise', '/clauses-abusives-contrat-exemple',
  '/comment-analyser-contrat-fournisseur', '/risque-contrat-prestation-entreprise',
  '/frais-caches-contrat-entreprise', '/rapprochement-bancaire-erreur',
  '/logiciel-rapprochement-bancaire-automatique', '/ecart-rapprochement-bancaire-solution',
  '/comment-detecter-erreur-facture-pdf', '/outil-analyse-facture-automatique',
  '/scanner-facture-detecter-erreurs', '/perte-argent-facture-entreprise',
  '/frais-caches-facture-comment-detecter', '/erreurs-facturation-tva-artisan',
  '/comment-eviter-pertes-comptabilite-pme', '/tva-recuperable-erreur-facture',
];
function Logo() {
  return (
    <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", padding: "0 4px" }}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5" />
        <text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="DM Sans">I</text>
        <text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontStyle="italic">A</text>
        <circle cx="28" cy="5" r="3" fill="#818cf8" />
      </svg>
      <span style={{ fontSize: 15, fontWeight: 700, color: "#1c1917", letterSpacing: "-0.02em" }}>InvoiceAgent</span>
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
    function check() { setIsMobile(window.innerWidth < 768); }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
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
  if (pathname === "/" || marketingPaths.some(p => pathname?.startsWith(p))) return null;
  if (isMobile) {
    return (
      <>
        <style>{`
          .mob-top { position: sticky; top: 0; z-index: 200; background: #ffffff; border-bottom: 1px solid #e8e5e0; padding: 0 20px; height: 54px; display: flex; align-items: center; justify-content: space-between; }
          .mob-hamburger { display: flex; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
          .mob-hamburger span { display: block; width: 22px; height: 2px; background: #1c1917; border-radius: 2px; transition: all 0.2s; }
          .mob-drawer { position: fixed; top: 54px; left: 0; right: 0; bottom: 0; background: #ffffff; z-index: 199; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; border-top: 1px solid #e8e5e0; animation: slideDown 0.18s ease; }
          @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
          .mob-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; text-decoration: none; font-size: 14px; font-weight: 600; color: #78716c; transition: all 0.15s; }
          .mob-link.active { color: #6366f1; background: #eeecff; }
          .mob-link:not(.active):hover { background: #f5f4f2; color: #1c1917; }
          .mob-divider { height: 1px; background: #e8e5e0; margin: 8px 0; }
          .mob-logout { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; font-size: 14px; font-weight: 600; color: #ef4444; background: none; border: none; cursor: pointer; font-family: inherit; width: 100%; }
          .mob-logout:hover { background: #fef2f2; }
        `}</style>
        <div className="mob-top">
          <Logo />
          <button className="mob-hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
        {menuOpen && (
          <div className="mob-drawer">
            {navLinks.map(link => {
              const active = !!pathname?.startsWith(link.href);
              return <a key={link.href} href={link.href} className={`mob-link${active ? " active" : ""}`}>{link.label}</a>;
            })}
            <div className="mob-divider" />
            {isLoggedIn
              ? <button className="mob-logout" onClick={handleLogout}>Deconnexion</button>
              : <a href="/auth/login" className="mob-link" style={{ color: "#6366f1" }}>Connexion</a>
            }
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <style>{`
        .sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: 220px; z-index: 100; background: #fafaf9; border-right: 1px solid #e8e5e0; display: flex; flex-direction: column; padding: 20px 12px; gap: 4px; }
        .sidebar-logo { padding: 4px 8px 20px; border-bottom: 1px solid #e8e5e0; margin-bottom: 8px; }
        .sidebar-link { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; text-decoration: none; font-size: 13.5px; font-weight: 600; color: #78716c; transition: all 0.15s; white-space: nowrap; }
        .sidebar-link:hover { color: #1c1917; background: #f5f4f2; }
        .sidebar-link.active { color: #6366f1; background: #eeecff; }
        .sidebar-bottom { margin-top: auto; padding-top: 12px; border-top: 1px solid #e8e5e0; }
        .sidebar-logout { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; color: #78716c; background: none; border: none; cursor: pointer; font-family: inherit; width: 100%; transition: all 0.15s; }
        .sidebar-logout:hover { color: #ef4444; background: #fef2f2; }
      `}</style>
      <aside className="sidebar">
        <div className="sidebar-logo"><Logo /></div>
        {navLinks.map(link => {
          const active = !!pathname?.startsWith(link.href);
          return <a key={link.href} href={link.href} className={`sidebar-link${active ? " active" : ""}`}>{link.label}</a>;
        })}
        <div className="sidebar-bottom">
          {isLoggedIn
            ? <button className="sidebar-logout" onClick={handleLogout}>Deconnexion</button>
            : <a href="/auth/login" className="sidebar-link" style={{ color: "#6366f1" }}>Connexion</a>
          }
        </div>
      </aside>
    </>
  );
}
