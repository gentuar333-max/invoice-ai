"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

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

const tabs = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/invoices", label: "Factures" },
  { href: "/reconciliation", label: "Banque" },
  { href: "/dashboard/referral", label: "Contrats" },
];

export default function NavbarClient() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initials, setInitials] = useState("IA");
  useEffect(() => {
    async function checkUser() {
      try {
        const { createClient } = await import("@/lib/supabase");
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
        if (user?.email) {
          const parts = user.email.split("@")[0].split(/[._-]/);
          const ini = parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : user.email.slice(0,2).toUpperCase();
          setInitials(ini);
        }
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
  const activeTab = tabs.find(t => pathname?.startsWith(t.href))?.href || "/dashboard";
  return (
    <>
      <style>{`
        .ia-header { background: #6B4A2A; color: #F9F4EE; padding: 20px 20px 0; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(107,74,42,0.18); }
        .ia-header-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .ia-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.55rem; font-weight: 600; letter-spacing: 0.02em; color: #F9F4EE; text-decoration: none; }
        .ia-logo span { color: #C4A882; font-style: italic; }
        .ia-avatar { width: 36px; height: 36px; border-radius: 50%; background: #C4A882; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 500; color: #6B4A2A; letter-spacing: 0.05em; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; }
        .ia-nav-tabs { display: flex; gap: 0; overflow-x: auto; scrollbar-width: none; }
        .ia-nav-tabs::-webkit-scrollbar { display: none; }
        .ia-nav-tab { flex-shrink: 0; padding: 10px 18px 14px; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; color: #C4A882; cursor: pointer; border-bottom: 2px solid transparent; border-top: none; border-left: none; border-right: none; transition: all 0.2s; white-space: nowrap; background: none; text-decoration: none; display: inline-block; font-family: 'DM Sans', sans-serif; }
        .ia-nav-tab.active { color: #F9F4EE; border-bottom-color: #C4A882; }
        .ia-nav-tab:hover:not(.active) { color: #e0cdb8; }
      `}</style>
      <header className="ia-header">
        <div className="ia-header-top">
          <a href="/dashboard" className="ia-logo">Invoice<span>Agent</span></a>
          {isLoggedIn
            ? <button className="ia-avatar" onClick={handleLogout} title="Deconnexion">{initials}</button>
            : <a href="/auth/login" className="ia-avatar" style={{ textDecoration: "none" }}>IA</a>
          }
        </div>
        <nav className="ia-nav-tabs">
          {tabs.map(tab => (
            <a key={tab.href} href={tab.href} className={`ia-nav-tab${activeTab === tab.href ? " active" : ""}`}>{tab.label}</a>
          ))}
        </nav>
      </header>
    </>
  );
}
