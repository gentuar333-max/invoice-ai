 
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

const C = {
  bg:      "#f4f4f5",
  white:   "#ffffff",
  orange:  "#f97316",
  orangeL: "#fff7ed",
  orangeB: "#fed7aa",
  text:    "#18181b",
  muted:   "#71717a",
  border:  "#e4e4e7",
  red:     "#ef4444",
  redL:    "#fef2f2",
  green:   "#22c55e",
  greenL:  "#f0fdf4",
};

const PLAN_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  free:     { label: "Gratuit",  color: C.muted,   bg: "#f4f4f5" },
  starter:  { label: "Starter",  color: "#3b82f6",  bg: "#eff6ff" },
  pro:      { label: "Pro",      color: C.orange,   bg: C.orangeL },
  business: { label: "Business", color: C.green,    bg: C.greenL },
};

function Avatar({ email }: { email: string }) {
  const initials = email ? email.slice(0, 2).toUpperCase() : "IA";
  return (
    <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: C.white, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push("/auth/login"); return; }
        setEmail(user.email || "");
        const { data: profile } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", user.id)
          .single();
        if (profile?.plan) setPlan(profile.plan);
      } catch {}
      finally { setLoading(false); }
    }
    load();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ width: 32, height: 32, border: `3px solid ${C.border}`, borderTopColor: C.orange, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  const planInfo = PLAN_LABELS[plan] ?? PLAN_LABELS.free;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingBottom: 100, fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ background: `linear-gradient(150deg, #fff7ed 0%, #ffedd5 100%)`, padding: "20px 16px", borderBottom: `1px solid ${C.orangeB}` }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Parametres</h1>
      </div>

      <div style={{ padding: "16px" }}>

        {/* Profil card */}
        <div style={{ background: C.white, borderRadius: 16, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>Mon profil</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Avatar email={email} />
            <div>
              <p style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 3 }}>
                {email.split("@")[0]}
              </p>
              <p style={{ fontSize: 13, color: C.muted }}>{email}</p>
            </div>
          </div>
        </div>

        {/* Plan card */}
        <div style={{ background: C.white, borderRadius: 16, padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>Mon abonnement</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: planInfo.color, background: planInfo.bg, padding: "4px 12px", borderRadius: 99, display: "inline-block", marginBottom: 8 }}>
                Plan {planInfo.label}
              </span>
              <p style={{ fontSize: 12, color: C.muted }}>
                {plan === "free" ? "5 factures/mois incluses" : plan === "starter" ? "50 factures/mois" : plan === "pro" ? "200 factures/mois" : "Illimite"}
              </p>
            </div>
            {plan === "free" && (
              <Link href="/pricing" style={{ background: C.orange, color: C.white, padding: "9px 18px", borderRadius: 12, fontSize: 13, fontWeight: 700, textDecoration: "none", boxShadow: "0 2px 8px rgba(249,115,22,0.3)", whiteSpace: "nowrap" }}>
                Upgrader
              </Link>
            )}
            {plan !== "free" && (
              <Link href="/pricing" style={{ color: C.orange, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                Changer
              </Link>
            )}
          </div>
        </div>

        {/* Liens */}
        <div style={{ background: C.white, borderRadius: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 12, overflow: "hidden" }}>
          {[
            { label: "Parrainage", sub: "Gagnez 35€ par filleul", href: "/dashboard/referral" },
            { label: "Tarifs",     sub: "Voir tous les plans",     href: "/pricing" },
          ].map((item, i) => (
            <Link key={item.href} href={item.href}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: i === 0 ? `1px solid ${C.border}` : "none", textDecoration: "none" }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 2 }}>{item.label}</p>
                <p style={{ fontSize: 12, color: C.muted }}>{item.sub}</p>
              </div>
              <span style={{ fontSize: 18, color: C.muted }}>›</span>
            </Link>
          ))}
        </div>

        {/* Deconnexion */}
        <button onClick={handleLogout}
          style={{ width: "100%", background: C.redL, border: `1px solid #fecaca`, borderRadius: 14, padding: "14px", fontSize: 14, fontWeight: 700, color: C.red, cursor: "pointer", fontFamily: "inherit" }}>
          Deconnexion
        </button>

        <p style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 20 }}>
          InvoiceAgent · <a href="/mentions-legales" style={{ color: C.muted }}>Mentions legales</a> · <a href="/confidentialite" style={{ color: C.muted }}>Confidentialite</a>
        </p>

      </div>
    </div>
  );
}