"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      if (mode === "register") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccess("Compte cree! Verifiez votre email pour confirmer.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push("/invoices");
      }
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">AgentHub 🤖</h1>
          <p className="text-gray-500 text-sm">
            {mode === "login" ? "Connectez-vous a votre compte" : "Creez votre compte"}
          </p>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@exemple.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-400" />
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm mb-4">⚠️ {error}</div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-sm mb-4">✓ {success}</div>
        )}
        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          className={`w-full py-3 rounded-lg text-white font-semibold text-sm transition ${loading || !email || !password ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Chargement..." : mode === "login" ? "Se connecter" : "Creer un compte"}
        </button>
        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? (
            <>Pas encore de compte?{" "}<button onClick={() => setMode("register")} className="text-blue-600 font-medium hover:underline">S'inscrire</button></>
          ) : (
            <>Deja un compte?{" "}<button onClick={() => setMode("login")} className="text-blue-600 font-medium hover:underline">Se connecter</button></>
          )}
        </p>
      </div>
    </div>
  );
}