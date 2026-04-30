"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { logAudit } from "@/lib/audit";
import { FeedbackWidget } from "@/app/feedback/page";
import InsightsTab from "@/components/InsightsTab";
import Link from "next/link";

// ── DESIGN TOKENS ──────────────────────────────────────────
const C = {
  bg:       "#f4f4f5",
  white:    "#ffffff",
  orange:   "#f97316",
  orangeL:  "#fff7ed",
  orangeB:  "#fed7aa",
  text:     "#18181b",
  muted:    "#71717a",
  border:   "#e4e4e7",
  red:      "#ef4444",
  redL:     "#fef2f2",
  green:    "#22c55e",
  greenL:   "#f0fdf4",
  amber:    "#f59e0b",
  amberL:   "#fffbeb",
  blue:     "#3b82f6",
  blueL:    "#eff6ff",
};

type Invoice = {
  id: string;
  vendor_name: string;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  created_at: string;
  status: string;
};

type Period = "month" | "quarter" | "halfyear" | "all";
type Tab = "factures" | "contrats" | "insights";
type FilterTab = "Toutes" | "Brouillon" | "En attente" | "Payee";

function fmt(value: number): string {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) + " €";
}

function getStatus(inv: Invoice): string {
  if (inv.status === "paid") return "paid";
  if (inv.status === "rapproche") return "rapproche";
  if (inv.status === "suggestion_ai") return "suggestion_ai";
  if (inv.status === "correspondance_partielle") return "correspondance_partielle";
  if (!inv.due_date) return "pending";
  const due = new Date(inv.due_date);
  const now = new Date();
  if (due < now) return "overdue";
  return "pending";
}

function getDaysUntilDue(due_date: string): number | null {
  if (!due_date) return null;
  const due = new Date(due_date);
  const now = new Date();
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function ProgressBar({ dueDate, status }: { dueDate: string; status: string }) {
  if (status === "paid" || status === "rapproche") return null;
  const days = getDaysUntilDue(dueDate);
  if (days === null) return null;
  const pct = Math.max(0, Math.min(100, ((30 - Math.max(0, days)) / 30) * 100));
  const color = days < 0 ? C.red : days < 7 ? C.amber : C.orange;
  return (
    <div style={{ height: 3, background: C.border, borderRadius: 99, overflow: "hidden", marginTop: 8 }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.6s ease" }} />
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    paid:                    { label: "Payée",      color: C.green,  bg: C.greenL },
    rapproche:               { label: "Rapproché",  color: C.green,  bg: C.greenL },
    suggestion_ai:           { label: "Suggestion", color: C.blue,   bg: C.blueL },
    correspondance_partielle:{ label: "Partiel",    color: C.amber,  bg: C.amberL },
    pending:                 { label: "En attente", color: C.amber,  bg: C.amberL },
    overdue:                 { label: "En retard",  color: C.red,    bg: C.redL },
  };
  const s = map[status] ?? map["pending"];
  return (
    <span style={{ fontSize: 11, fontWeight: 700, color: s.color, background: s.bg, padding: "3px 10px", borderRadius: 99, whiteSpace: "nowrap" }}>
      {s.label}
    </span>
  );
}

function StatCard({ icon, label, value, sub, color = C.text }: { icon: string; label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ background: C.white, borderRadius: 16, padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flex: 1 }}>
      <div style={{ width: 36, height: 36, background: C.orangeL, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 10 }}>{icon}</div>
      <p style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1, marginBottom: 4 }}>{value}</p>
      <p style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 2 }}>{label}</p>
      {sub && <p style={{ fontSize: 10, color: C.muted }}>{sub}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filtered, setFiltered] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("all");
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("factures");
  const [filterTab, setFilterTab] = useState<FilterTab>("Toutes");
  const [contracts, setContracts] = useState<any[]>([]);
  const [contractLoading, setContractLoading] = useState(false);
  const [contractResult, setContractResult] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [insightsData, setInsightsData] = useState<any>(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState("");

  async function fetchInsights(uid: string) {
    setInsightsLoading(true);
    setInsightsError("");
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: uid }),
      });
      const json = await res.json();
      if (json.success) {
        setInsightsData(json.data);
        localStorage.setItem("insights_cache", JSON.stringify({ data: json.data, timestamp: new Date().toLocaleString("fr-FR") }));
      } else {
        setInsightsError(json.error || "Erreur");
      }
    } catch (e: any) {
      setInsightsError(e.message);
    } finally {
      setInsightsLoading(false);
    }
  }

  useEffect(() => { loadInvoices(); loadContracts(); }, []);

  useEffect(() => {
    if (invoices.length >= 0) applyFilters(invoices, period, filterTab);
  }, [invoices, period, filterTab]);

  useEffect(() => {
    if (invoices.length >= 5 && !localStorage.getItem("feedback_shown")) {
      setTimeout(() => { setShowFeedback(true); localStorage.setItem("feedback_shown", "true"); }, 3000);
    }
  }, [invoices]);

  async function loadInvoices() {
    const supabase = createClient();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) setCurrentUserId(user.id);
    } catch {}
    const { data, error } = await supabase
      .from("invoices")
      .select("id, vendor_name, invoice_number, invoice_date, due_date, subtotal, tax_amount, total_amount, created_at, status, user_id")
      .order("created_at", { ascending: false });
    if (!error && data) setInvoices(data);
    setLoading(false);
  }

  async function loadContracts() {
    try {
      const res = await fetch("/api/contracts");
      const json = await res.json();
      if (json.success) setContracts(json.data);
    } catch {}
  }

  async function handleContractUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setContractLoading(true);
    setContractResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/contracts", { method: "POST", body: formData });
      const json = await res.json();
      if (json.success) { setContractResult(json.data); await loadContracts(); }
    } catch {}
    finally { setContractLoading(false); e.target.value = ""; }
  }

  function applyFilters(data: Invoice[], p: Period, ft: FilterTab) {
    let result = [...data];
    // Period filter
    if (p !== "all") {
      const now = new Date();
      const months = p === "month" ? 1 : p === "quarter" ? 3 : 6;
      const cutoff = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
      result = result.filter((inv) => {
        const d = new Date(inv.invoice_date || inv.created_at);
        return !isNaN(d.getTime()) && d >= cutoff;
      });
    }
    // Status filter
    if (ft === "En attente") result = result.filter(inv => ["pending", "overdue"].includes(getStatus(inv)));
    else if (ft === "Payee") result = result.filter(inv => ["paid", "rapproche"].includes(getStatus(inv)));
    else if (ft === "Brouillon") result = result.filter(inv => getStatus(inv) === "suggestion_ai");
    setFiltered(result);
  }

  async function deleteInvoice(id: string) {
    const supabase = createClient();
    const inv = invoices.find((i) => i.id === id);
    await supabase.from("invoices").delete().eq("id", id);
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    await logAudit({ action: "DELETE", entity: "invoice", entity_id: id, old_data: inv });
  }

  async function confirmPayment(id: string) {
    const supabase = createClient();
    const inv = invoices.find((i) => i.id === id);
    await supabase.from("invoices").update({ status: "paid" }).eq("id", id);
    setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status: "paid" } : i));
    await logAudit({ action: "CONFIRM_PAYMENT", entity: "invoice", entity_id: id, old_data: { status: inv?.status }, new_data: { status: "paid" } });
  }

  async function exportCSV() {
    if (!filtered.length) return;
    const headers = ["vendor_name","invoice_number","invoice_date","subtotal","tax_amount","total_amount","statut"];
    const rows = filtered.map((inv) => [inv.vendor_name||"",inv.invoice_number||"",inv.invoice_date||"",inv.subtotal??"",inv.tax_amount??"",inv.total_amount??"",getStatus(inv)]);
    const csv = [headers,...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `factures_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const now = new Date();
  const nextMonth = now.getMonth() + 2 > 12 ? 1 : now.getMonth() + 2;
  const tvaYear = now.getMonth() + 2 > 12 ? now.getFullYear() + 1 : now.getFullYear();
  const totalAmount = filtered.reduce((acc, inv) => acc + (inv.total_amount || 0), 0);
  const totalTax = filtered.reduce((acc, inv) => acc + (inv.tax_amount || 0), 0);
  const paidCount = filtered.filter((inv) => ["paid","rapproche"].includes(getStatus(inv))).length;
  const overdueCount = filtered.filter((inv) => getStatus(inv) === "overdue").length;
  const pendingCount = filtered.filter((inv) => getStatus(inv) === "pending").length;
  const unpaidTotal = filtered.filter((inv) => !["paid","rapproche"].includes(getStatus(inv))).reduce((acc, inv) => acc + (inv.total_amount || 0), 0);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: `3px solid ${C.border}`, borderTopColor: C.orange, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
          <p style={{ color: C.muted, fontSize: 13 }}>Chargement...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; font-family: 'DM Sans', sans-serif; }
        .filter-chip { padding: 8px 18px; border-radius: 99px; border: 1.5px solid ${C.border}; background: ${C.white}; font-size: 13px; font-weight: 600; color: ${C.muted}; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
        .filter-chip.active { background: ${C.text}; color: ${C.white}; border-color: ${C.text}; }
        .inv-card { background: ${C.white}; border-radius: 14px; padding: 14px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); transition: box-shadow 0.15s; }
        .inv-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .period-btn { padding: 6px 14px; border-radius: 8px; border: none; font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.15s; letter-spacing: 0.5px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.3s ease forwards; }
      `}</style>

      <div style={{ background: C.bg, minHeight: "100vh", paddingBottom: 90 }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)`, padding: "20px 16px 24px", borderBottom: `1px solid ${C.orangeB}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>Mes Factures</h1>
              <p style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{invoices.length} factures · {paidCount} payées</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => loadInvoices()} style={{ width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${C.border}`, background: C.white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                ↻
              </button>
              <Link href="/invoices" style={{ width: 38, height: 38, borderRadius: "50%", background: C.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: C.white, textDecoration: "none", fontWeight: 700, boxShadow: "0 4px 12px rgba(249,115,22,0.4)" }}>
                +
              </Link>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: "flex", gap: 10 }}>
            <StatCard icon="📄" label="Total factures" value={String(invoices.length)} sub={`${paidCount} payées`} />
            <StatCard icon="⏰" label="En attente" value={fmt(unpaidTotal)} sub={`${overdueCount + pendingCount} factures`} color={unpaidTotal > 0 ? C.orange : C.text} />
          </div>
        </div>

        {/* Alertes */}
        <div style={{ padding: "12px 16px 0" }}>
          {overdueCount > 0 && (
            <div style={{ background: C.redL, border: `1px solid #fecaca`, borderRadius: 12, padding: "12px 14px", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>⚠️</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.red }}>{overdueCount} facture{overdueCount > 1 ? "s" : ""} en retard</p>
                  <p style={{ fontSize: 11, color: C.muted }}>Action requise</p>
                </div>
              </div>
              <Link href="/reconciliation" style={{ fontSize: 12, fontWeight: 700, color: C.red, textDecoration: "none", background: "#fee2e2", padding: "5px 12px", borderRadius: 8 }}>
                Rapprocher →
              </Link>
            </div>
          )}

          {totalTax > 0 && (
            <div style={{ background: C.amberL, border: `1px solid #fde68a`, borderRadius: 12, padding: "12px 14px", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>📊</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.amber }}>TVA à déclarer · {fmt(totalTax)}</p>
                  <p style={{ fontSize: 11, color: C.muted }}>Avant le 20/{String(nextMonth).padStart(2,"0")}/{tvaYear}</p>
                </div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.amber, background: "#fef3c7", padding: "5px 12px", borderRadius: 8 }}>
                {fmt(totalTax)}
              </span>
            </div>
          )}
        </div>

        {/* Tabs principaux */}
        <div style={{ padding: "14px 16px 0", display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, background: C.white, marginTop: 12 }}>
          {(["factures", "contrats", "insights"] as Tab[]).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ flex: 1, padding: "12px 8px", border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: activeTab === tab ? 700 : 500, color: activeTab === tab ? C.orange : C.muted, borderBottom: activeTab === tab ? `2px solid ${C.orange}` : "2px solid transparent", transition: "all 0.15s", textTransform: "capitalize" }}>
              {tab === "insights" ? "⚡ Insights" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* TAB FACTURES */}
        {activeTab === "factures" && (
          <div style={{ padding: "16px" }}>

            {/* Période */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
              {(["month","quarter","halfyear","all"] as Period[]).map((p) => {
                const labels: Record<Period, string> = { month: "Ce mois", quarter: "3 mois", halfyear: "6 mois", all: "Tout" };
                return (
                  <button key={p} onClick={() => setPeriod(p)} className="period-btn"
                    style={{ background: period === p ? C.orange : C.white, color: period === p ? C.white : C.muted, border: `1.5px solid ${period === p ? C.orange : C.border}` }}>
                    {labels[p]}
                  </button>
                );
              })}
            </div>

            {/* Filter chips */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
              {(["Toutes", "Brouillon", "En attente", "Payee"] as FilterTab[]).map((ft) => (
                <button key={ft} onClick={() => setFilterTab(ft)} className={`filter-chip${filterTab === ft ? " active" : ""}`}>
                  {ft}
                </button>
              ))}
            </div>

            {/* Réconciliation CTA */}
            <div style={{ background: C.white, borderRadius: 14, padding: "14px 16px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Rapprochement bancaire</p>
                <p style={{ fontSize: 11, color: C.muted }}>Importez votre CSV bancaire</p>
              </div>
              <Link href="/reconciliation" style={{ background: C.orange, color: C.white, padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                + CSV
              </Link>
            </div>

            {/* Export */}
            {filtered.length > 0 && (
              <button onClick={exportCSV} style={{ width: "100%", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "11px", fontSize: 13, fontWeight: 600, color: C.muted, cursor: "pointer", marginBottom: 16 }}>
                Exporter CSV ({filtered.length} factures)
              </button>
            )}

            {/* Liste factures */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 24px", background: C.white, borderRadius: 16 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 6 }}>Aucune facture</p>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Importez votre première facture</p>
                <Link href="/invoices" style={{ background: C.orange, color: C.white, padding: "11px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                  + Nouvelle facture
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filtered.map((inv, idx) => {
                  const status = getStatus(inv);
                  const canConfirm = status === "suggestion_ai" || status === "correspondance_partielle";
                  const days = getDaysUntilDue(inv.due_date);
                  return (
                    <div key={inv.id} className="inv-card fade-up" style={{ animationDelay: `${idx * 0.04}s` }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {inv.vendor_name || "—"}
                          </p>
                          <p style={{ fontSize: 12, color: C.muted }}>
                            {inv.invoice_number ? `${inv.invoice_number} · ` : ""}{inv.invoice_date || "—"}
                            {days !== null && status !== "paid" && (
                              <span style={{ color: days < 0 ? C.red : days < 7 ? C.amber : C.muted }}>
                                {" "}· {days < 0 ? `${Math.abs(days)}j de retard` : `Échéance ${inv.due_date ? new Date(inv.due_date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) : ""}`}
                              </span>
                            )}
                          </p>
                        </div>
                        <p style={{ fontSize: 16, fontWeight: 800, color: C.text, marginLeft: 12, whiteSpace: "nowrap" }}>
                          {inv.total_amount ? fmt(Number(inv.total_amount)) : "—"}
                        </p>
                      </div>

                      <ProgressBar dueDate={inv.due_date} status={status} />

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        <StatusPill status={status} />
                        <div style={{ display: "flex", gap: 8 }}>
                          {canConfirm && (
                            <button onClick={() => confirmPayment(inv.id)}
                              style={{ fontSize: 11, fontWeight: 700, color: C.green, background: C.greenL, border: "none", padding: "4px 12px", borderRadius: 8, cursor: "pointer" }}>
                              Confirmer ✓
                            </button>
                          )}
                          <button onClick={() => deleteInvoice(inv.id)}
                            style={{ fontSize: 16, color: C.border, background: "none", border: "none", cursor: "pointer", padding: "2px 6px", borderRadius: 6, lineHeight: 1 }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = C.red)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = C.border)}>
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTRATS */}
        {activeTab === "contrats" && (
          <div style={{ padding: "16px" }}>
            <div style={{ background: C.white, borderRadius: 16, padding: "24px 20px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", marginBottom: 16 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6 }}>Analyser un contrat</h3>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>L'IA detecte les clauses à risque, frais cachés et conditions importantes</p>
              <label style={{ background: contractLoading ? C.border : C.orange, color: C.white, padding: "12px 28px", borderRadius: 12, cursor: contractLoading ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 700, display: "inline-block" }}>
                {contractLoading ? "Analyse en cours..." : "📎 Importer un contrat PDF"}
                <input type="file" accept=".pdf" style={{ display: "none" }} onChange={handleContractUpload} disabled={contractLoading} />
              </label>
            </div>

            {contractResult && (
              <div style={{ background: C.white, borderRadius: 16, padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.orange, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>Résultat analyse IA</p>
                {contractResult.summary && (
                  <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginBottom: 14 }}>{contractResult.summary}</p>
                )}
                {contractResult.risk_clauses?.length > 0 && (
                  <div style={{ background: C.amberL, borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.amber, marginBottom: 8 }}>⚠ {contractResult.risk_clauses.length} clause(s) à risque</p>
                    {contractResult.risk_clauses.map((c: any, i: number) => (
                      <p key={i} style={{ fontSize: 12, color: C.text, marginBottom: 4 }}>· {c.clause}</p>
                    ))}
                  </div>
                )}
                {contractResult.hidden_fees?.length > 0 && (
                  <div style={{ background: C.redL, borderRadius: 10, padding: "12px 14px" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.red, marginBottom: 8 }}>💸 {contractResult.hidden_fees.length} frais caché(s)</p>
                    {contractResult.hidden_fees.map((f: any, i: number) => (
                      <p key={i} style={{ fontSize: 12, color: C.text, marginBottom: 4 }}>· {f.description}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            {contracts.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {contracts.map((c) => (
                  <div key={c.id} style={{ background: C.white, borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{c.vendor_name || c.filename}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {c.risk_clauses?.length > 0 && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.amber, background: C.amberL, padding: "2px 8px", borderRadius: 6 }}>
                          {c.risk_clauses.length} risque(s)
                        </span>
                      )}
                      {c.hidden_fees?.length > 0 && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: C.red, background: C.redL, padding: "2px 8px", borderRadius: 6 }}>
                          {c.hidden_fees.length} frais
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: C.muted }}>{new Date(c.created_at).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB INSIGHTS */}
        {activeTab === "insights" && (
          <div style={{ padding: "16px" }}>
            <InsightsTab
              isMobile={true}
              userId={currentUserId}
              insightsData={insightsData}
              insightsLoading={insightsLoading}
              insightsError={insightsError}
              onGenerate={() => currentUserId && fetchInsights(currentUserId)}
            />
          </div>
        )}

      </div>

      {showFeedback && <FeedbackWidget trigger="auto" onClose={() => setShowFeedback(false)} />}
    </>
  );
}