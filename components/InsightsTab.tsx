"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

type InsightType = "risk" | "opportunity" | "warning" | "info";
type Priority = "high" | "medium" | "low";

type Insight = {
  id: string;
  type: InsightType;
  vendor: string;
  title: string;
  description: string;
  amount: number | null;
  amount_label: string;
  action: string;
  priority: Priority;
};

type Summary = {
  total_at_risk: number;
  total_savings_possible: number;
  health_score: number;
};

const typeConfig: Record<InsightType, { icon: string; color: string; bg: string; label: string }> = {
  risk:        { icon: "⚠", color: "#ef4444", bg: "#ef444415", label: "RISQUE" },
  warning:     { icon: "⚡", color: "#f59e0b", bg: "#f59e0b15", label: "ATTENTION" },
  opportunity: { icon: "💡", color: "#4ade80", bg: "#4ade8015", label: "OPPORTUNITÉ" },
  info:        { icon: "ℹ", color: "#60a5fa", bg: "#60a5fa15", label: "INFO" },
};

const priorityColor: Record<Priority, string> = {
  high:   "#ef4444",
  medium: "#f59e0b",
  low:    "#60a5fa",
};

function fmt(value: number): string {
  return value.toFixed(2).replace(".", ",") + " €";
}

function HealthScore({ score }: { score: number }) {
  const color = score >= 70 ? "#4ade80" : score >= 40 ? "#f59e0b" : "#ef4444";
  const label = score >= 70 ? "BON" : score >= 40 ? "MOYEN" : "CRITIQUE";
  const circumference = 2 * Math.PI * 32;
  const dash = (score / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="32" fill="none" stroke="#2e4058" strokeWidth="8" />
          <circle cx="40" cy="40" r="32" fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circumference}`}
            strokeLinecap="round" transform="rotate(-90 40 40)"
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 800, color }}>{score}</span>
        </div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 1.5 }}>{label}</span>
    </div>
  );
}

export default function InsightsTab({ isMobile }: { isMobile: boolean }) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("insights_cache");
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (data?.insights) setInsights(data.insights);
        if (data?.summary) setSummary(data.summary);
        setLastGenerated(timestamp);
      }
    } catch {}
  }, []);

  async function generateInsights() {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("Non connecté — rechargez la page");
        return;
      }

      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      const json = await res.json();

      if (!json.success) {
        setError(json.error || "Erreur lors de la génération");
        return;
      }

      if (json.message) {
        setMessage(json.message);
        return;
      }

      if (json.data?.insights) {
        setInsights(json.data.insights);
        setSummary(json.data.summary || null);
        const timestamp = new Date().toLocaleString("fr-FR");
        setLastGenerated(timestamp);
        localStorage.setItem("insights_cache", JSON.stringify({ data: json.data, timestamp }));
      }
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "48px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🤖</div>
        <p style={{ fontSize: 13, fontWeight: 700, color: GOLD, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
          ANALYSE IA EN COURS...
        </p>
        <p style={{ fontSize: 12, color: MUTED, marginBottom: 20 }}>Analyse de vos factures, contrats et mouvements bancaires</p>
        <div style={{ height: 4, background: "#0f1923", borderRadius: 2, margin: "0 auto", maxWidth: 300, overflow: "hidden" }}>
          <div style={{ height: "100%", background: GOLD, borderRadius: 2, width: "70%" }} />
        </div>
      </div>
    );
  }

  if (insights.length === 0 && !message) {
    return (
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "48px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
          INSIGHTS & RISQUES IA
        </h3>
        <p style={{ fontSize: 13, color: MUTED, marginBottom: 8, lineHeight: 1.6 }}>
          L'IA analyse vos factures, contrats et données bancaires pour détecter les risques financiers et économies possibles.
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
          {["Risques fournisseurs", "Doublons détectés", "Économies possibles", "Clauses dangereuses"].map((tag) => (
            <span key={tag} style={{ background: `${GOLD}15`, color: GOLD, border: `1px solid ${GOLD}30`, padding: "4px 10px", borderRadius: 20, fontSize: 11 }}>{tag}</span>
          ))}
        </div>
        {error && (
          <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 3, padding: "10px 14px", color: "#ef4444", fontSize: 12, marginBottom: 16 }}>
            ⚠ {error}
          </div>
        )}
        <button onClick={generateInsights} style={{ background: GOLD, color: "#0f1923", border: "none", padding: "12px 32px", borderRadius: 3, fontSize: 11, fontWeight: 800, cursor: "pointer", letterSpacing: 2, textTransform: "uppercase" }}>
          GÉNÉRER MES INSIGHTS
        </button>
      </div>
    );
  }

  if (message) {
    return (
      <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "48px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>📊</div>
        <p style={{ color: MUTED, fontSize: 13 }}>{message}</p>
        <p style={{ color: MUTED, fontSize: 12, marginTop: 8 }}>Importez vos premières factures pour commencer.</p>
      </div>
    );
  }

  return (
    <div>
      {summary && (
        <div style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}30`, borderRadius: 4, padding: isMobile ? "14px" : "20px 24px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: isMobile ? 16 : 32, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontSize: 9, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>MONTANT À RISQUE</p>
              <p style={{ fontSize: isMobile ? 18 : 24, fontWeight: 800, color: "#ef4444" }}>{fmt(summary.total_at_risk)}</p>
            </div>
            <div>
              <p style={{ fontSize: 9, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>ÉCONOMIES POSSIBLES</p>
              <p style={{ fontSize: isMobile ? 18 : 24, fontWeight: 800, color: "#4ade80" }}>{fmt(summary.total_savings_possible)}</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <HealthScore score={summary.health_score} />
            <div>
              <p style={{ fontSize: 9, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>SANTÉ FINANCIÈRE</p>
              {lastGenerated && <p style={{ fontSize: 10, color: "#475569" }}>Mis à jour: {lastGenerated}</p>}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 3, padding: "12px 16px", color: "#ef4444", fontSize: 12, marginBottom: 12 }}>
          ⚠ {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {insights.map((insight) => {
          const config = typeConfig[insight.type] || typeConfig.info;
          return (
            <div key={insight.id} style={{ background: config.bg, border: `1px solid ${config.color}30`, borderRadius: 4, padding: isMobile ? "14px" : "20px 24px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 20 }}>{config.icon}</span>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: config.color, letterSpacing: 1.5, textTransform: "uppercase", background: `${config.color}20`, padding: "2px 8px", borderRadius: 2 }}>
                        {config.label}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: priorityColor[insight.priority] || MUTED, letterSpacing: 1 }}>
                        {(insight.priority || "").toUpperCase()}
                      </span>
                      <span style={{ fontSize: 11, color: MUTED }}>{insight.vendor}</span>
                    </div>
                    <p style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: TEXT, marginTop: 4, lineHeight: 1.3 }}>{insight.title}</p>
                  </div>
                </div>
                {insight.amount !== null && insight.amount !== undefined && (
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: 9, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>{insight.amount_label}</p>
                    <p style={{ fontSize: isMobile ? 16 : 20, fontWeight: 800, color: config.color }}>{fmt(insight.amount)}</p>
                  </div>
                )}
              </div>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 12 }}>{insight.description}</p>
              <div style={{ background: "#0f192360", borderRadius: 3, padding: "10px 14px", display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: config.color, fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
                <p style={{ fontSize: 12, color: TEXT, fontWeight: 600, lineHeight: 1.5 }}>{insight.action}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center" }}>
        <button onClick={generateInsights} style={{ background: "transparent", color: GOLD, border: `1px solid ${GOLD}40`, padding: "8px 24px", borderRadius: 3, fontSize: 10, fontWeight: 700, cursor: "pointer", letterSpacing: 2, textTransform: "uppercase" }}>
          ↻ ACTUALISER LES INSIGHTS
        </button>
      </div>
    </div>
  );
}