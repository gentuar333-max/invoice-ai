"use client";
import { useEffect, useState } from "react";

const C = {
  bg:      "#f4f4f5",
  white:   "#ffffff",
  orange:  "#f97316",
  orangeL: "#fff7ed",
  text:    "#18181b",
  muted:   "#71717a",
  border:  "#e4e4e7",
  green:   "#22c55e",
  greenL:  "#f0fdf4",
  amber:   "#f59e0b",
  amberL:  "#fffbeb",
  red:     "#ef4444",
  redL:    "#fef2f2",
  blue:    "#3b82f6",
  blueL:   "#eff6ff",
};

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

const typeConfig: Record<InsightType, { color: string; bg: string; border: string; label: string }> = {
  risk:        { color: C.red,    bg: C.redL,    border: "#fecaca", label: "Risque" },
  warning:     { color: C.amber,  bg: C.amberL,  border: "#fde68a", label: "Attention" },
  opportunity: { color: C.green,  bg: C.greenL,  border: "#bbf7d0", label: "Opportunite" },
  info:        { color: C.blue,   bg: C.blueL,   border: "#bfdbfe", label: "Info" },
};

const priorityLabel: Record<Priority, string> = {
  high: "Haute", medium: "Moyenne", low: "Basse",
};

function fmt(v: number) {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(v) + " €";
}

function HealthScore({ score }: { score: number }) {
  const color = score >= 70 ? C.green : score >= 40 ? C.amber : C.red;
  const label = score >= 70 ? "Bon" : score >= 40 ? "Moyen" : "Critique";
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke={C.border} strokeWidth="6" />
          <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" transform="rotate(-90 32 32)" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 16, fontWeight: 800, color }}>{score}</span>
        </div>
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color }}>{label}</p>
        <p style={{ fontSize: 11, color: C.muted }}>Sante financiere</p>
      </div>
    </div>
  );
}

type Props = {
  isMobile: boolean;
  userId: string | null;
  insightsData: any;
  insightsLoading: boolean;
  insightsError: string;
  onGenerate: () => void;
};

export default function InsightsTab({ insightsData, insightsLoading, insightsError, onGenerate }: Props) {
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  useEffect(() => {
    try {
      const cached = localStorage.getItem("insights_cache");
      if (cached) setLastGenerated(JSON.parse(cached).timestamp);
    } catch {}
  }, []);

  useEffect(() => {
    if (insightsData) setLastGenerated(new Date().toLocaleString("fr-FR"));
  }, [insightsData]);

  const insights: Insight[] = insightsData?.insights || [];
  const summary: Summary | null = insightsData?.summary || null;

  // Loading
  if (insightsLoading) {
    return (
      <div style={{ background: C.white, borderRadius: 14, padding: "40px 20px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ width: 36, height: 36, border: `3px solid ${C.border}`, borderTopColor: C.orange, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Analyse en cours...</p>
        <p style={{ fontSize: 12, color: C.muted }}>Analyse de vos factures et contrats</p>
      </div>
    );
  }

  // Etat vide
  if (!insightsData) {
    return (
      <div style={{ background: C.white, borderRadius: 14, padding: "36px 20px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ width: 48, height: 48, background: C.orangeL, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="2" strokeLinecap="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6 }}>Analyse risques et opportunites</h3>
        <p style={{ fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>
          L'IA analyse vos factures et contrats pour detecter les risques financiers et economies possibles.
        </p>
        {insightsError && (
          <div style={{ background: C.redL, border: `1px solid #fecaca`, borderRadius: 10, padding: "10px 14px", color: C.red, fontSize: 12, marginBottom: 16 }}>
            {insightsError}
          </div>
        )}
        <button onClick={onGenerate}
          style={{ background: C.orange, color: C.white, border: "none", padding: "12px 32px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(249,115,22,0.3)" }}>
          Generer mes insights
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

      {/* Summary card */}
      {summary && (
        <div style={{ background: C.white, borderRadius: 14, padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <HealthScore score={summary.health_score} />
          <div style={{ height: 1, background: C.border, margin: "14px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 4 }}>Montant a risque</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: C.red }}>{fmt(summary.total_at_risk)}</p>
            </div>
            <div>
              <p style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 4 }}>Economies possibles</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: C.green }}>{fmt(summary.total_savings_possible)}</p>
            </div>
          </div>
          {lastGenerated && <p style={{ fontSize: 10, color: C.muted, marginTop: 10 }}>Mis a jour : {lastGenerated}</p>}
        </div>
      )}

      {/* Insights */}
      {insights.map(ins => {
        const cfg = typeConfig[ins.type] ?? typeConfig.info;
        return (
          <div key={ins.id} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", borderLeft: `3px solid ${cfg.color}` }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, padding: "2px 8px", borderRadius: 99 }}>
                    {cfg.label}
                  </span>
                  <span style={{ fontSize: 10, color: C.muted }}>{priorityLabel[ins.priority]}</span>
                  {ins.vendor && <span style={{ fontSize: 10, color: C.muted }}>{ins.vendor}</span>}
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{ins.title}</p>
              </div>
              {ins.amount !== null && ins.amount !== undefined && (
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 9, color: C.muted, marginBottom: 2 }}>{ins.amount_label}</p>
                  <p style={{ fontSize: 16, fontWeight: 800, color: cfg.color }}>{fmt(ins.amount)}</p>
                </div>
              )}
            </div>
            <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 10 }}>{ins.description}</p>
            <div style={{ background: cfg.bg, borderRadius: 8, padding: "8px 12px" }}>
              <p style={{ fontSize: 12, color: cfg.color, fontWeight: 600 }}>{ins.action}</p>
            </div>
          </div>
        );
      })}

      {/* Actualiser */}
      <button onClick={onGenerate}
        style={{ background: C.white, color: C.orange, border: `1.5px solid #fed7aa`, padding: "11px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        Actualiser l'analyse
      </button>
    </div>
  );
}