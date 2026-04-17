"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BG = "#09090b";
const CARD = "#18181b";
const BORDER = "rgba(99,102,241,0.2)";
const ACCENT = "#6366f1";
const TEXT = "#fafafa";
const MUTED = "#71717a";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Kap ?ref=IAXXXXXX nga URL
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      localStorage.setItem("referral_code", ref.toUpperCase());
      setMode("register");
    }
  }, [searchParams]);

  async function handleSubmit() {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();

      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        // Lidh referral_code me userin e ri
        const referralCode = localStorage.getItem("referral_code");
        if (referralCode && data.user) {
          await fetch("/api/referral/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ referral_code: referralCode }),
          });
          localStorage.removeItem("referral_code");
        }

        await fetch("/api/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "welcome", to: email, data: {} }),
        });

        setSuccess("Compte créé ! Connectez-vous maintenant.");
        setMode("login");

      } else {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          if (error.message.includes("Email not confirmed")) {
            setError("Votre email n'est pas encore confirmé. Vérifiez votre boite mail.");
          } else if (error.message.includes("Invalid login credentials")) {
            setError("Email ou mot de passe incorrect.");
          } else {
            setError(error.message);
          }
          return;
        }

        if (data.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("plan")
            .eq("id", data.user.id)
            .single();
          if (profile?.plan) {
            localStorage.setItem("user_plan", profile.plan);
          }
        }

        router.refresh();
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "48px 40px", width: "100%", maxWidth: 400, boxShadow: "0 0 40px rgba(99,102,241,0.1)" }}>

        {/* LOGO */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7" fill="#09090b" stroke="#6366f1" strokeWidth="1.5"/>
              <text x="8" y="22" fill="#6366f1" fontSize="15" fontWeight="700" fontFamily="'DM Sans',sans-serif">I</text>
              <text x="16" y="22" fill="white" fontSize="15" fontWeight="300" fontFamily="serif" fontStyle="italic">A</text>
              <circle cx="28" cy="5" r="3" fill="#818cf8"/>
            </svg>
            <span style={{ fontSize: 18, fontWeight: 700, color: TEXT, letterSpacing: "-0.3px" }}>InvoiceAgent</span>
          </div>
          <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>
            {mode === "login" ? "Connectez-vous à votre compte" : "Créez votre compte gratuit"}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 11, color: MUTED, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={{ width: "100%", background: "#09090b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: TEXT, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 11, color: MUTED, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={{ width: "100%", background: "#09090b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: TEXT, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
        </div>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "12px 16px", color: "#ef4444", fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "12px 16px", color: "#4ade80", fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
            {success}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          style={{ width: "100%", background: loading || !email || !password ? "rgba(99,102,241,0.3)" : ACCENT, color: "white", border: "none", padding: "14px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: loading || !email || !password ? "not-allowed" : "pointer", marginBottom: 20 }}
        >
          {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "Créer mon compte"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13, color: MUTED }}>
          {mode === "login" ? (
            <>
              Pas encore de compte ?{" "}
              <button onClick={() => { setMode("register"); setError(""); setSuccess(""); }} style={{ background: "none", border: "none", color: ACCENT, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                S'inscrire gratuitement
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{" "}
              <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }} style={{ background: "none", border: "none", color: ACCENT, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                Se connecter
              </button>
            </>
          )}
        </p>

        {mode === "register" && (
          <p style={{ textAlign: "center", fontSize: 11, color: "#3f3f46", marginTop: 16, lineHeight: 1.6 }}>
            Plan gratuit · 5 factures/mois · Sans carte bancaire
          </p>
        )}

      </div>
    </div>
  );
}

export default function LoginContent() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#09090b" }} />}>
      <LoginForm />
    </Suspense>
  );
}