"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { logAudit } from "@/lib/audit";
import { FeedbackWidget } from "@/app/feedback/page";
import InsightsTab from "@/components/InsightsTab";
import Link from "next/link";

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
type FilterTab = "Toutes" | "En attente" | "Payees";

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
  if (due < new Date()) return "overdue";
  return "pending";
}

function getDaysUntilDue(due_date: string): number | null {
  if (!due_date) return null;
  const due = new Date(due_date);
  return Math.ceil((due.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function getInitials(name: string): string {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    paid:                     { label: "Payee",      cls: "status-payee" },
    rapproche:                { label: "Rapproche",  cls: "status-payee" },
    suggestion_ai:            { label: "Suggestion", cls: "status-attente" },
    correspondance_partielle: { label: "Partiel",    cls: "status-attente" },
    pending:                  { label: "En attente", cls: "status-attente" },
    overdue:                  { label: "En retard",  cls: "status-retard" },
  };
  const s = map[status] ?? map["pending"];
  return <span className={`status-badge ${s.cls}`}>{s.label}</span>;
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
  const [unmatchedCount, setUnmatchedCount] = useState(0);
  const [trialDaysLeft, setTrialDaysLeft] = useState<number | null>(null);
  const [trialExpired, setTrialExpired] = useState(false);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [openContrat, setOpenContrat] = useState<string | null>(null);

  async function fetchInsights(uid: string) {
    setInsightsLoading(true);
    setInsightsError("");
    try {
      const res = await fetch("/api/insights", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_id: uid }) });
      const json = await res.json();
      if (json.success) { setInsightsData(json.data); localStorage.setItem("insights_cache", JSON.stringify({ data: json.data, timestamp: new Date().toLocaleString("fr-FR") })); }
      else setInsightsError(json.error || "Erreur");
    } catch (e: any) { setInsightsError(e.message); }
    finally { setInsightsLoading(false); }
  }

  useEffect(() => { loadInvoices(); loadContracts(); loadUnmatched(); loadTrial(); }, []);
  useEffect(() => { applyFilters(invoices, period, filterTab); }, [invoices, period, filterTab]);
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

  async function loadUnmatched() {
    try {
      const supabase = createClient();
      const { count } = await supabase.from("bank_transactions").select("id", { count: "exact", head: true }).eq("status", "unmatched");
      setUnmatchedCount(count ?? 0);
    } catch {}
  }

  async function loadTrial() {
    try {
      const { getTrialStatus } = await import("@/lib/plan");
      const trial = await getTrialStatus();
      setTrialDaysLeft(trial.daysLeft);
      setTrialExpired(trial.trialExpired);
      if (trial.trialExpired) setShowTrialModal(true);
    } catch {}
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
    if (p !== "all") {
      const months = p === "month" ? 1 : p === "quarter" ? 3 : 6;
      const cutoff = new Date(new Date().getFullYear(), new Date().getMonth() - months + 1, 1);
      result = result.filter(inv => { const d = new Date(inv.invoice_date || inv.created_at); return !isNaN(d.getTime()) && d >= cutoff; });
    }
    if (ft === "En attente") result = result.filter(inv => ["pending","overdue","suggestion_ai"].includes(getStatus(inv)));
    else if (ft === "Payees") result = result.filter(inv => ["paid","rapproche"].includes(getStatus(inv)));
    setFiltered(result);
  }

  async function deleteInvoice(id: string) {
    const supabase = createClient();
    const inv = invoices.find(i => i.id === id);
    await supabase.from("invoices").delete().eq("id", id);
    setInvoices(prev => prev.filter(i => i.id !== id));
    await logAudit({ action: "DELETE", entity: "invoice", entity_id: id, old_data: inv });
  }

  async function confirmPayment(id: string) {
    const supabase = createClient();
    const inv = invoices.find(i => i.id === id);
    await supabase.from("invoices").update({ status: "paid" }).eq("id", id);
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: "paid" } : i));
    await logAudit({ action: "CONFIRM_PAYMENT", entity: "invoice", entity_id: id, old_data: { status: inv?.status }, new_data: { status: "paid" } });
  }

  const now = new Date();
  const nextMonth = now.getMonth() + 2 > 12 ? 1 : now.getMonth() + 2;
  const tvaYear = now.getMonth() + 2 > 12 ? now.getFullYear() + 1 : now.getFullYear();
  const totalTax = filtered.reduce((a, i) => a + (i.tax_amount || 0), 0);
  const paidCount = filtered.filter(i => ["paid","rapproche"].includes(getStatus(i))).length;
  const overdueCount = filtered.filter(i => getStatus(i) === "overdue").length;
  const unpaidTotal = filtered.filter(i => !["paid","rapproche"].includes(getStatus(i))).reduce((a, i) => a + (i.total_amount || 0), 0);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#F9F4EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ width: 36, height: 36, border: "3px solid #E3D5C4", borderTopColor: "#6B4A2A", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        :root {
          --creme: #F9F4EE;
          --creme-fonce: #EFE7DC;
          --creme-profond: #E3D5C4;
          --cafe: #6B4A2A;
          --cafe-clair: #8D6840;
          --cafe-pale: #C4A882;
          --texte-fonce: #2C1A0E;
          --texte-moyen: #5C3D20;
          --texte-pale: #9A7A5A;
          --blanc: #FDFAF7;
          --vert-succes: #5A7A4A;
          --rouge-alerte: #8A3A2A;
          --or-accent: #B8923A;
        }
        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: var(--creme); }

        .section-title { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 300; color: var(--texte-fonce); line-height: 1.2; }
        .section-sub { font-size: 0.78rem; color: var(--texte-pale); margin-top: 4px; font-weight: 300; }

        .stat-card { background: var(--blanc); border-radius: 12px; padding: 16px; border: 1px solid var(--creme-profond); }
        .stat-label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--texte-pale); margin-bottom: 6px; }
        .stat-value { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: var(--texte-fonce); line-height: 1; }
        .stat-change { font-size: 0.7rem; margin-top: 4px; color: var(--texte-pale); }
        .stat-change.up { color: var(--vert-succes); }
        .stat-change.down { color: var(--rouge-alerte); }

        .ia-nav-tabs-inner { display: flex; gap: 0; background: var(--cafe); border-bottom: none; overflow-x: auto; scrollbar-width: none; }
        .ia-nav-tabs-inner::-webkit-scrollbar { display: none; }
        .ia-tab-btn { flex-shrink: 0; padding: 10px 18px 14px; font-size: 0.78rem; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; color: var(--cafe-pale); cursor: pointer; border-bottom: 2px solid transparent; border-top: none; border-left: none; border-right: none; transition: all 0.2s; white-space: nowrap; background: none; font-family: 'DM Sans', sans-serif; }
        .ia-tab-btn.active { color: var(--creme); border-bottom-color: var(--cafe-pale); }

        .period-btn { padding: 6px 14px; border-radius: 8px; border: 1.5px solid var(--creme-profond); background: var(--blanc); font-size: 0.75rem; font-weight: 500; color: var(--texte-pale); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; }
        .period-btn.on { background: var(--cafe); color: var(--creme); border-color: var(--cafe); }

        .filter-chip { padding: 6px 14px; border-radius: 99px; border: 1.5px solid var(--creme-profond); background: var(--blanc); font-size: 0.75rem; font-weight: 500; color: var(--texte-pale); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; white-space: nowrap; }
        .filter-chip.on { background: var(--texte-fonce); color: var(--creme); border-color: var(--texte-fonce); }

        .invoice-item { background: var(--blanc); border-radius: 12px; padding: 14px 16px; margin-bottom: 10px; border: 1px solid var(--creme-profond); display: flex; align-items: center; gap: 12px; transition: border-color 0.2s; }
        .invoice-item:hover { border-color: var(--cafe-pale); }
        .invoice-initials { width: 38px; height: 38px; border-radius: 10px; background: var(--creme-profond); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 500; color: var(--cafe); flex-shrink: 0; letter-spacing: 0.03em; }
        .invoice-name { font-size: 0.88rem; font-weight: 500; color: var(--texte-fonce); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .invoice-date { font-size: 0.72rem; color: var(--texte-pale); margin-top: 2px; }
        .invoice-amount { font-family: 'Cormorant Garamond', serif; font-size: 1.05rem; font-weight: 600; color: var(--texte-fonce); }

        .status-badge { display: inline-block; font-size: 0.62rem; padding: 2px 8px; border-radius: 20px; font-weight: 500; letter-spacing: 0.04em; text-transform: uppercase; margin-top: 3px; }
        .status-payee { background: #EAF0E6; color: var(--vert-succes); }
        .status-attente { background: #F5EDD8; color: var(--or-accent); }
        .status-retard { background: #F2E4E1; color: var(--rouge-alerte); }

        .upload-zone { margin: 0 0 20px; border: 1.5px dashed var(--cafe-pale); border-radius: 12px; padding: 28px 20px; text-align: center; background: var(--blanc); cursor: pointer; transition: all 0.2s; }
        .upload-zone:hover { border-color: var(--cafe); background: var(--creme-fonce); }
        .btn-upload { margin-top: 14px; display: inline-block; background: var(--cafe); color: var(--creme); padding: 10px 22px; border-radius: 8px; font-size: 0.82rem; font-weight: 500; letter-spacing: 0.03em; border: none; cursor: pointer; transition: background 0.2s; font-family: 'DM Sans', sans-serif; }
        .btn-upload:hover { background: var(--cafe-clair); }
        .btn-upload:disabled { background: var(--cafe-pale); cursor: not-allowed; }

        .contrat-item { background: var(--blanc); border-radius: 12px; overflow: hidden; border: 1px solid var(--creme-profond); margin-bottom: 14px; }
        .contrat-header { padding: 14px 16px; display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .contrat-icon { width: 36px; height: 36px; background: var(--creme-profond); border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .contrat-name { font-size: 0.88rem; font-weight: 500; color: var(--texte-fonce); }
        .contrat-date { font-size: 0.72rem; color: var(--texte-pale); margin-top: 2px; }
        .risk-badge { font-size: 0.62rem; padding: 3px 9px; border-radius: 20px; font-weight: 500; letter-spacing: 0.03em; text-transform: uppercase; }
        .risk-low { background: #EAF0E6; color: var(--vert-succes); }
        .risk-medium { background: #F5EDD8; color: var(--or-accent); }
        .risk-high { background: #F2E4E1; color: var(--rouge-alerte); }
        .contrat-detail { padding: 0 16px 14px; border-top: 1px solid var(--creme-fonce); }
        .clause-item { display: flex; align-items: flex-start; gap: 8px; padding: 6px 0; font-size: 0.78rem; color: var(--texte-moyen); line-height: 1.4; border-bottom: 1px solid var(--creme-fonce); }
        .clause-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }

        .list-label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--texte-pale); margin-bottom: 8px; margin-top: 4px; }

        .fab { position: fixed; bottom: 24px; right: 20px; width: 52px; height: 52px; background: var(--cafe); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(107,74,42,0.35); cursor: pointer; z-index: 200; border: none; transition: transform 0.2s, background 0.2s; text-decoration: none; }
        .fab:hover { transform: scale(1.08); background: var(--cafe-clair); }

        .alert-box { border-radius: 12px; padding: 12px 14px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; }
        .alert-link { font-size: 12px; font-weight: 700; text-decoration: none; padding: 6px 12px; border-radius: 8px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.25s ease forwards; }
      `}</style>

      <div style={{ background: "var(--creme)", minHeight: "100vh", paddingBottom: 100, fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── SECTION HEADER ── */}
        <div style={{ padding: "22px 20px 16px" }}>
          <h1 className="section-title">Vue d&apos;ensemble</h1>
          <p className="section-sub">{new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</p>
        </div>

        {/* ── STATS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 20px", marginBottom: 20 }}>
          <div className="stat-card fu">
            <div className="stat-label">Total TTC</div>
            <div className="stat-value">{fmt(filtered.reduce((a, i) => a + (i.total_amount || 0), 0))}</div>
            <div className={`stat-change ${invoices.length > 0 ? "up" : ""}`}>{invoices.length} factures</div>
          </div>
          <div className="stat-card fu">
            <div className="stat-label">En attente</div>
            <div className="stat-value">{fmt(unpaidTotal)}</div>
            <div className="stat-change down">{invoices.length - paidCount} factures</div>
          </div>
          <div className="stat-card fu">
            <div className="stat-label">Payees</div>
            <div className="stat-value">{fmt(filtered.filter(i => ["paid","rapproche"].includes(getStatus(i))).reduce((a, i) => a + (i.total_amount || 0), 0))}</div>
            <div className="stat-change up">{paidCount} factures</div>
          </div>
          <div className="stat-card fu">
            <div className="stat-label">En retard</div>
            <div className="stat-value">{overdueCount}</div>
            <div className="stat-change down">{overdueCount > 0 ? "Action requise" : "Aucun retard"}</div>
          </div>
        </div>

        {/* ── ALERTES ── */}
        <div style={{ padding: "0 20px" }}>
          {overdueCount > 0 && (
            <div className="alert-box fu" style={{ background: "#F2E4E1", border: "1px solid #e8c4bb" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--rouge-alerte)" }}>{overdueCount} facture{overdueCount > 1 ? "s" : ""} en retard</p>
                <p style={{ fontSize: 11, color: "var(--texte-pale)" }}>Rapprocher maintenant</p>
              </div>
              <Link href="/reconciliation" className="alert-link" style={{ color: "var(--rouge-alerte)", background: "#f5d5cf" }}>Voir</Link>
            </div>
          )}
          {totalTax > 0 && (
            <div className="alert-box fu" style={{ background: "#F5EDD8", border: "1px solid #e8d5a8" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--or-accent)" }}>TVA a declarer · {fmt(totalTax)}</p>
                <p style={{ fontSize: 11, color: "var(--texte-pale)" }}>Avant le 20/{String(nextMonth).padStart(2,"0")}/{tvaYear}</p>
              </div>
            </div>
          )}
          {unmatchedCount > 0 && (
            <div className="alert-box fu" style={{ background: "#e8f0e6", border: "1px solid #c4d8be" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--vert-succes)" }}>{unmatchedCount} transaction{unmatchedCount > 1 ? "s" : ""} non rapprochee{unmatchedCount > 1 ? "s" : ""}</p>
                <p style={{ fontSize: 11, color: "var(--texte-pale)" }}>A verifier dans Banque</p>
              </div>
              <a href="/reconciliation" className="alert-link" style={{ color: "var(--vert-succes)", background: "#d0e8ca" }}>Voir</a>
            </div>
          )}
        </div>

        {/* ── TABS ── */}
        <div className="ia-nav-tabs-inner" style={{ marginTop: 12 }}>
          {(["factures","contrats","insights"] as Tab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`ia-tab-btn${activeTab === tab ? " active" : ""}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* ── TAB: FACTURES ── */}
        {activeTab === "factures" && (
          <div style={{ padding: "14px 20px" }}>

            <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", paddingBottom: 2 }}>
              {([["month","Ce mois"],["quarter","3 mois"],["halfyear","6 mois"],["all","Tout"]] as [Period,string][]).map(([p,l]) => (
                <button key={p} onClick={() => setPeriod(p)} className={`period-btn${period === p ? " on" : ""}`}>{l}</button>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
              {(["Toutes","En attente","Payees"] as FilterTab[]).map(ft => (
                <button key={ft} onClick={() => setFilterTab(ft)} className={`filter-chip${filterTab === ft ? " on" : ""}`}>{ft}</button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="upload-zone" onClick={() => window.location.href = "/invoices"}>
                <div style={{ width: 44, height: 44, margin: "0 auto 12px", background: "var(--creme-profond)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cafe)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <div style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--texte-moyen)", marginBottom: 5 }}>Deposer une facture PDF</div>
                <div style={{ fontSize: "0.75rem", color: "var(--texte-pale)", lineHeight: 1.5 }}>L'IA extrait automatiquement fournisseur, SIRET, montants HT / TVA / TTC et lignes</div>
                <button className="btn-upload">Importer PDF</button>
              </div>
            ) : (
              <>
                <div className="list-label">Factures recentes</div>
                {filtered.map((inv, idx) => {
                  const status = getStatus(inv);
                  const canConfirm = ["suggestion_ai","correspondance_partielle"].includes(status);
                  const days = getDaysUntilDue(inv.due_date);
                  return (
                    <div key={inv.id} className="invoice-item fu" style={{ animationDelay: `${idx * 0.03}s` }}>
                      <div className="invoice-initials">{getInitials(inv.vendor_name)}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="invoice-name">{inv.vendor_name || "—"}</div>
                        <div className="invoice-date">
                          {inv.invoice_number ? `${inv.invoice_number} · ` : ""}
                          {inv.invoice_date || "—"}
                          {days !== null && !["paid","rapproche"].includes(status) && (
                            <span style={{ color: days < 0 ? "var(--rouge-alerte)" : days < 7 ? "var(--or-accent)" : "var(--texte-pale)" }}>
                              {" · "}{days < 0 ? `${Math.abs(days)}j de retard` : inv.due_date ? new Date(inv.due_date).toLocaleDateString("fr-FR",{day:"numeric",month:"short"}) : ""}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div className="invoice-amount">{inv.total_amount ? fmt(Number(inv.total_amount)) : "—"}</div>
                        <StatusBadge status={status} />
                        {canConfirm && (
                          <div>
                            <button onClick={() => confirmPayment(inv.id)}
                              style={{ fontSize: 11, fontWeight: 700, color: "var(--vert-succes)", background: "#EAF0E6", border: "none", padding: "2px 8px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", marginTop: 3 }}>
                              Confirmer
                            </button>
                          </div>
                        )}
                      </div>
                      <button onClick={() => deleteInvoice(inv.id)}
                        style={{ fontSize: 16, color: "var(--creme-profond)", background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: "0 2px" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--rouge-alerte)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--creme-profond)")}>
                        ×
                      </button>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* ── TAB: CONTRATS ── */}
        {activeTab === "contrats" && (
          <div style={{ padding: "14px 20px" }}>
            <div className="upload-zone">
              <div style={{ width: 44, height: 44, margin: "0 auto 12px", background: "var(--creme-profond)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cafe)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--texte-moyen)", marginBottom: 5 }}>Analyser un contrat</div>
              <div style={{ fontSize: "0.75rem", color: "var(--texte-pale)", lineHeight: 1.5 }}>L'IA detecte les clauses dangereuses, frais caches et conditions importantes</div>
              <label>
                <button className="btn-upload" disabled={contractLoading} onClick={() => (document.getElementById("contract-upload") as HTMLInputElement)?.click()}>
                  {contractLoading ? "Analyse en cours..." : "Deposer contrat PDF"}
                </button>
                <input id="contract-upload" type="file" accept=".pdf" style={{ display: "none" }} onChange={handleContractUpload} />
              </label>
            </div>

            {contractResult && (
              <div className="contrat-item fu" style={{ marginBottom: 16 }}>
                <div style={{ padding: "14px 16px" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--cafe)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Resultat analyse IA</p>
                  {contractResult.summary && <p style={{ fontSize: "0.82rem", color: "var(--texte-moyen)", lineHeight: 1.6, marginBottom: 10 }}>{contractResult.summary}</p>}
                  {contractResult.risk_clauses?.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {contractResult.risk_clauses.map((c: any, i: number) => (
                        <li key={i} className="clause-item">
                          <span className="clause-dot" style={{ background: "var(--rouge-alerte)" }} />
                          {c.clause}
                        </li>
                      ))}
                    </ul>
                  )}
                  {contractResult.hidden_fees?.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
                      {contractResult.hidden_fees.map((f: any, i: number) => (
                        <li key={i} className="clause-item">
                          <span className="clause-dot" style={{ background: "var(--or-accent)" }} />
                          {f.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {contracts.length > 0 && (
              <>
                <div className="list-label">Historique des analyses</div>
                {contracts.map((c, idx) => (
                  <div key={c.id} className="contrat-item fu" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="contrat-header" onClick={() => setOpenContrat(openContrat === c.id ? null : c.id)}>
                      <div className="contrat-icon">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--cafe)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="contrat-name">{c.vendor_name || c.filename || "Contrat"}</div>
                        <div className="contrat-date">{new Date(c.created_at).toLocaleDateString("fr-FR")}</div>
                      </div>
                      <span className={`risk-badge ${c.risk_clauses?.length > 2 ? "risk-high" : c.risk_clauses?.length > 0 ? "risk-medium" : "risk-low"}`}>
                        {c.risk_clauses?.length > 2 ? "Risque eleve" : c.risk_clauses?.length > 0 ? "Risque moyen" : "Risque faible"}
                      </span>
                    </div>
                    {openContrat === c.id && (
                      <div className="contrat-detail">
                        {c.risk_clauses?.map((cl: any, i: number) => (
                          <div key={i} className="clause-item">
                            <span className="clause-dot" style={{ background: "var(--rouge-alerte)" }} />
                            {cl.clause}
                          </div>
                        ))}
                        {c.hidden_fees?.map((f: any, i: number) => (
                          <div key={i} className="clause-item">
                            <span className="clause-dot" style={{ background: "var(--or-accent)" }} />
                            {f.description}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ── TAB: INSIGHTS ── */}
        {activeTab === "insights" && (
          <div style={{ padding: "14px 20px" }}>
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

      {/* ── FAB ── */}
      <a href="/invoices" className="fab">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--creme)" strokeWidth="1.8" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </a>

      {showFeedback && <FeedbackWidget trigger="auto" onClose={() => setShowFeedback(false)} />}

      {trialDaysLeft !== null && trialDaysLeft > 0 && trialDaysLeft <= 14 && (
        <div style={{ position: "fixed", bottom: 84, left: 0, right: 0, zIndex: 50, padding: "0 16px" }}>
          <div style={{ background: "var(--cafe)", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 16px rgba(107,74,42,0.35)" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--creme)" }}>Essai gratuit — {trialDaysLeft} jour{trialDaysLeft > 1 ? "s" : ""} restant{trialDaysLeft > 1 ? "s" : ""}</p>
            <a href="/pricing" style={{ fontSize: 12, fontWeight: 700, color: "var(--cafe)", background: "var(--creme)", padding: "5px 12px", borderRadius: 8, textDecoration: "none" }}>Upgrader</a>
          </div>
        </div>
      )}

      {showTrialModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(44,26,14,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "var(--blanc)", borderRadius: 20, padding: "32px 24px", maxWidth: 360, width: "100%", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: "var(--creme-profond)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cafe)" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: "var(--texte-fonce)", fontFamily: "'Cormorant Garamond', serif", marginBottom: 8 }}>Votre essai gratuit est termine</h2>
            <p style={{ fontSize: 14, color: "var(--texte-pale)", lineHeight: 1.6, marginBottom: 24 }}>Choisissez un plan pour continuer a utiliser InvoiceAgent.</p>
            <a href="/pricing" style={{ display: "block", background: "var(--cafe)", color: "var(--creme)", padding: "13px", borderRadius: 12, fontSize: 14, fontWeight: 500, textDecoration: "none", marginBottom: 10 }}>Voir les abonnements</a>
            <button onClick={() => setShowTrialModal(false)} style={{ background: "none", border: "none", color: "var(--texte-pale)", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Continuer en mode gratuit</button>
          </div>
        </div>
      )}
    </>
  );
}