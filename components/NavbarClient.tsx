"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const C = {
  bg:     "#ffffff",
  border: "#e4e4e7",
  orange: "#f97316",
  text:   "#18181b",
  muted:  "#71717a",
};

const bottomTabs = [
  { href: "/dashboard",      label: "Factures" },
  { href: "/invoices",       label: "Nouvelle",  fab: true },
  { href: "/reconciliation", label: "Banque" },
  { href: "/settings",       label: "Profil" },
];

const desktopLinks = [
  { href: "/dashboard",          label: "Factures" },
  { href: "/reconciliation",     label: "Banque" },
  { href: "/pricing",            label: "Tarifs" },
  { href: "/dashboard/referral", label: "Parrainage" },
  { href: "/settings",           label: "Profil" },
];

const marketingPaths = [
  '/blog', '/tarifs', '/mentions-legales', '/cgu', '/confidentialite',
  '/extraction-facture-pdf', '/reconciliation-bancaire-csv', '/analyse-contrat-ia',
  '/logiciel-comptabilite-pme', '/facturation-', '/export-fec-comptable',
  '/tva-automatique-pme', '/logiciel-facturation-', '/logiciel-comptabilite-', '/landing',
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
  '/scanner-facture-detecter-erreurs',
];

function Logo() {
  return (
    <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5" />
        <text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="DM Sans">I</text>
        <text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontStyle="italic">A</text>
        <circle cx="28" cy="5" r="3" fill="#818cf8" />
      </svg>
      <span style={{ fontSize: 16, fontWeight: 800, color: C.text }}>InvoiceAgent</span>
    </a>
  );
}

export default function NavbarClient() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768); }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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

  if (pathname === "/" || marketingPaths.some(p => pathname?.startsWith(p))) return null;

  // ── MOBILE ─────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <style>{`
          .top-bar {
            position: sticky; top: 0; z-index: 99;
            background: ${C.bg}; border-bottom: 1px solid ${C.border};
            padding: 0 16px; height: 52px;
            display: flex; align-items: center; justify-content: space-between;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }
          .btm { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; background: ${C.bg}; border-top: 1px solid ${C.border}; display: flex; box-shadow: 0 -2px 12px rgba(0,0,0,0.06); padding-bottom: env(safe-area-inset-bottom, 0px); }
          .btm-item { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 10px 4px 8px; text-decoration: none; border: none; background: none; cursor: pointer; gap: 3px; }
          .btm-label { font-size: 10px; font-weight: 600; color: ${C.muted}; font-family: 'DM Sans', sans-serif; }
          .btm-item.active .btm-label { color: ${C.orange}; font-weight: 700; }
          .btm-dot { width: 4px; height: 4px; border-radius: 50%; background: ${C.orange}; }
          .btm-icon { width: 22px; height: 22px; }
          .btm-fab { display: flex; flex-direction: column; align-items: center; justify-content: center; text-decoration: none; }
          .btm-fab .fab-icon { font-size: 26px; color: ${C.muted}; line-height: 1; font-weight: 300; }
          .logout-btn { font-size: 12px; font-weight: 700; color: #ef4444; background: #fef2f2; border: 1px solid #fecaca; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-family: inherit; }
        `}</style>

        {/* Top bar */}
        <div className="top-bar">
          <Logo />
          {isLoggedIn && <button className="logout-btn" onClick={handleLogout}>Deconnexion</button>}
        </div>

        {/* Bottom tabs */}
        <nav className="btm">
          {bottomTabs.map(tab => {
            const isActive = pathname?.startsWith(tab.href) && !tab.fab;
            if (tab.fab) {
              return (
                <a key={tab.href} href={tab.href} className={`btm-item${pathname?.startsWith(tab.href) ? " active" : ""}`}>
                  <svg className="btm-icon" viewBox="0 0 24 24" fill="none" stroke={pathname?.startsWith(tab.href) ? C.orange : C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span className="btm-label">{tab.label}</span>
                </a>
              );
            }
            return (
              <a key={tab.href} href={tab.href} className={`btm-item${isActive ? " active" : ""}`}>
                {/* Icone SVG simple */}
                <svg className="btm-icon" viewBox="0 0 24 24" fill="none" stroke={isActive ? C.orange : C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {tab.href === "/dashboard" && <>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </>}
                  {tab.href === "/reconciliation" && <>
                    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                  </>}
                {tab.href === "/settings" && <>
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </>}
                </svg>
                <span className="btm-label">{tab.label}</span>
                {isActive && <div className="btm-dot" />}
              </a>
            );
          })}
        </nav>
      </>
    );
  }

  // ── DESKTOP ────────────────────────────────────────────
  return (
    <>
      <style>{`
        .desk-nav { position: sticky; top: 0; z-index: 100; background: ${C.bg}; border-bottom: 1px solid ${C.border}; height: 60px; display: flex; align-items: center; padding: 0 28px; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .desk-links { display: flex; align-items: center; gap: 2px; }
        .desk-link { display: flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 600; color: ${C.muted}; transition: all 0.15s; white-space: nowrap; border: none; background: none; cursor: pointer; font-family: inherit; }
        .desk-link:hover { color: ${C.text}; background: #f4f4f5; }
        .desk-link.active { color: ${C.orange}; background: #fff7ed; font-weight: 700; }
        .desk-cta { padding: 8px 20px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; color: white; background: ${C.orange}; box-shadow: 0 2px 8px rgba(249,115,22,0.3); margin-left: 8px; }
        .desk-logout { padding: 7px 16px; border-radius: 10px; border: 1px solid #fecaca; font-size: 12px; font-weight: 700; color: #ef4444; background: #fef2f2; cursor: pointer; font-family: inherit; }
      `}</style>
      <nav className="desk-nav">
        <Logo />
        <div className="desk-links">
          {desktopLinks.map(link => (
            <a key={link.href} href={link.href} className={`desk-link${pathname?.startsWith(link.href) ? " active" : ""}`}>
              {link.label}
            </a>
          ))}
          <a href="/invoices" className="desk-cta">+ Nouvelle facture</a>
        </div>
        {isLoggedIn
          ? <button className="desk-logout" onClick={handleLogout}>Deconnexion</button>
          : <a href="/auth/login" className="desk-cta">Connexion</a>
        }
      </nav>
    </>
  );
}