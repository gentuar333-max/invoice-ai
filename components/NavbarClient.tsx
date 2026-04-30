"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const C = {
  bg:     "#ffffff",
  border: "#e4e4e7",
  orange: "#f97316",
  text:   "#18181b",
  muted:  "#71717a",
  tabBg:  "#ffffff",
};

const navLinks = [
  { href: "/dashboard",          label: "Factures",   icon: "📄" },
  { href: "/invoices",           label: "Nouvelle",   icon: "+" },
  { href: "/reconciliation",     label: "Banque",      icon: "🏦" },
  { href: "/pricing",            label: "Tarifs",      icon: "⭐" },
  { href: "/dashboard/referral", label: "Parrainage",  icon: "🎁" },
];

const marketingPaths = [
  '/blog', '/tarifs', '/mentions-legales', '/cgu', '/confidentialite',
  '/extraction-facture-pdf', '/reconciliation-bancaire-csv', '/analyse-contrat-ia',
  '/logiciel-comptabilite-pme', '/facturation-', '/export-fec-comptable',
  '/tva-automatique-pme', '/logiciel-facturation-', '/logiciel-comptabilite-', '/landing',
  '/detection-clauses-abusives', '/detection-frais-caches', '/detection-doublons-factures',
  '/verifier-contrat-avant-signature', '/analyse-contrat-prestation',
  '/extraction-donnees-facture', '/ocr-factures-pdf',
  '/programme-parrainage',
  '/erreur-tva-facture-comment-corriger', '/logiciel-tva-automatique-pme', '/calcul-tva-erreur-entreprise',
  '/erreurs-facture-frequentes-pme', '/comment-verifier-facture-fournisseur',
  '/doublon-facture-que-faire', '/controle-facture-automatise',
  '/clauses-abusives-contrat-exemple', '/comment-analyser-contrat-fournisseur',
  '/risque-contrat-prestation-entreprise', '/frais-caches-contrat-entreprise',
  '/rapprochement-bancaire-erreur', '/logiciel-rapprochement-bancaire-automatique',
  '/ecart-rapprochement-bancaire-solution',
  '/comment-detecter-erreur-facture-pdf', '/outil-analyse-facture-automatique',
  '/scanner-facture-detecter-erreurs',
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
      <span style={{ fontSize: 16, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>InvoiceAgent</span>
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

  // ── MOBILE: top bar + bottom tab bar ─────────────────────
  if (isMobile) {
    return (
      <>
        <style>{`
          .bottom-tab-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
            background: ${C.tabBg};
            border-top: 1px solid ${C.border};
            display: flex;
            padding-bottom: env(safe-area-inset-bottom, 0px);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
          }
          .tab-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 8px 4px;
            text-decoration: none;
            border: none;
            background: none;
            cursor: pointer;
            gap: 3px;
            transition: all 0.15s;
          }
          .tab-item .tab-icon {
            font-size: 20px;
            line-height: 1;
            transition: transform 0.15s;
          }
          .tab-item.active .tab-icon { transform: scale(1.1); }
          .tab-item .tab-label {
            font-size: 10px;
            font-weight: 600;
            color: ${C.muted};
            letter-spacing: 0.2px;
          }
          .tab-item.active .tab-label { color: ${C.orange}; font-weight: 700; }
          .tab-fab {
            background: ${C.orange} !important;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            margin-top: -16px;
            box-shadow: 0 4px 12px rgba(249,115,22,0.45);
            align-self: flex-start;
          }
          .tab-fab .tab-icon { font-size: 28px; color: white; }
          .tab-fab .tab-label { color: white !important; }
          .top-bar {
            position: sticky;
            top: 0;
            z-index: 99;
            background: ${C.bg};
            border-bottom: 1px solid ${C.border};
            padding: 0 16px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          }
        `}</style>

        {/* Top bar minimal */}
        <div className="top-bar">
          <Logo />
          {isLoggedIn && (
            <button onClick={handleLogout}
              style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", padding: "6px 14px", borderRadius: 8, cursor: "pointer" }}>
              Déconnexion
            </button>
          )}
        </div>

        {/* Bottom tab bar */}
        <nav className="bottom-tab-bar">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            const isFab = link.href === "/invoices";
            return (
              <a
                key={link.href}
                href={link.href}
                className={`tab-item${isActive ? " active" : ""}${isFab ? " tab-fab" : ""}`}
              >
                <span className="tab-icon">{link.icon}</span>
                {!isFab && <span className="tab-label">{link.label}</span>}
              </a>
            );
          })}
        </nav>
      </>
    );
  }

  // ── DESKTOP: top navbar ───────────────────────────────────
  return (
    <>
      <style>{`
        .desk-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: ${C.bg};
          border-bottom: 1px solid ${C.border};
          height: 60px;
          display: flex;
          align-items: center;
          padding: 0 28px;
          justify-content: space-between;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .desk-links { display: flex; align-items: center; gap: 4px; }
        .desk-link {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 10px;
          text-decoration: none; font-size: 13px; font-weight: 600;
          color: ${C.muted}; transition: all 0.15s; white-space: nowrap;
        }
        .desk-link:hover { color: ${C.text}; background: #f4f4f5; }
        .desk-link.active { color: ${C.orange}; background: #fff7ed; font-weight: 700; }
        .desk-link .link-icon { font-size: 15px; }
        .desk-logout { padding: 7px 16px; border-radius: 10px; border: 1px solid #fecaca; font-size: 12px; font-weight: 700; color: #ef4444; background: #fef2f2; cursor: pointer; }
        .desk-login { padding: 8px 20px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 700; color: white; background: ${C.orange}; box-shadow: 0 2px 8px rgba(249,115,22,0.3); }
      `}</style>
      <nav className="desk-nav">
        <Logo />
        <div className="desk-links">
          {navLinks.filter(l => l.href !== "/invoices").map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <a key={link.href} href={link.href} className={`desk-link${isActive ? " active" : ""}`}>
                <span className="link-icon">{link.icon}</span>
                {link.label}
                {isActive && <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.orange, display: "inline-block" }} />}
              </a>
            );
          })}
          <a href="/invoices" style={{ marginLeft: 8, background: C.orange, color: "white", padding: "8px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none", boxShadow: "0 2px 8px rgba(249,115,22,0.3)" }}>
            + Nouvelle
          </a>
        </div>
        <div>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="desk-logout">Déconnexion</button>
          ) : (
            <a href="/auth/login" className="desk-login">Connexion</a>
          )}
        </div>
      </nav>
    </>
  );
}