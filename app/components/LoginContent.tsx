"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Kap ?ref=IAXXXXXX nga URL dhe ruaj në localStorage
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      localStorage.setItem("referral_code", ref.toUpperCase());
      setMode("register"); // hap direkt tab-in e regjistrimit
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

        // Lidh referral_code me userin e ri nëse ekziston
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
        setSuccess("Compte cree! Verifiez votre email pour confirmer.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
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
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "40px 36px", width: "100%", maxWidth: 380 }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🤖</div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>AgentHub</h1>
          <p style={{ fontSize: 12, color: MUTED, letterSpacing: 1 }}>
            {mode === "login" ? "CONNECTEZ-VOUS A VOTRE COMPTE" : "CREEZ VOTRE COMPTE"}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={{ width: "100%", background: "#0f1923", border: `1px solid ${BORDER}`, borderRadius: 3, padding: "11px 14px", fontSize: 13, color: TEXT, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 6 }}>MOT DE PASSE</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={{ width: "100%", background: "#0f1923", border: `1px solid ${BORDER}`, borderRadius: 3, padding: "11px 14px", fontSize: 13, color: TEXT, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
            />
          </div>
        </div>

        {error && (
          <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 3, padding: "10px 14px", color: "#ef4444", fontSize: 12, marginBottom: 14 }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ background: "#4ade8015", border: "1px solid #4ade8040", borderRadius: 3, padding: "10px 14px", color: "#4ade80", fontSize: 12, marginBottom: 14 }}>
            {success}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          style={{ width: "100%", background: loading || !email || !password ? BORDER : GOLD, color: "#0f1923", border: "none", padding: "12px", borderRadius: 3, fontSize: 11, fontWeight: 800, cursor: loading || !email || !password ? "not-allowed" : "pointer", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}
        >
          {loading ? "CHARGEMENT..." : mode === "login" ? "SE CONNECTER" : "CREER UN COMPTE"}
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: MUTED }}>
          {mode === "login" ? (
            <>
              Pas encore de compte?{" "}
              <button onClick={() => setMode("register")} style={{ background: "none", border: "none", color: GOLD, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                S'inscrire
              </button>
            </>
          ) : (
            <>
              Deja un compte?{" "}
              <button onClick={() => setMode("login")} style={{ background: "none", border: "none", color: GOLD, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                Se connecter
              </button>
            </>
          )}
        </p>

      </div>
    </div>
  );
}