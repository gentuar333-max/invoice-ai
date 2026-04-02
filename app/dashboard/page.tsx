"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { logAudit } from "@/lib/audit";
import { FeedbackWidget } from "@/app/feedback/page";
import InsightsTab from "@/components/InsightsTab";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

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

function fmt(value: number): string {
  return value.toFixed(2).replace(".", ",") + " €";
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

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filtered, setFiltered] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("all");
  const [showFeedback, setShowFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<"factures" | "contrats" | "insights">("factures");
  const [contracts, setContracts] = useState<any[]>([]);
  const [contractLoading, setContractLoading] = useState(false);
  const [contractResult, setContractResult] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    function checkMobile() { setIsMobile(window.innerWidth < 768); }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => { loadInvoices(); loadContracts(); }, []);

  useEffect(() => {
    async function loadUser() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) setCurrentUserId(session.user.id);
    }
    loadUser();
  }, []);

  useEffect(() => {
    if (invoices.length >= 0) filterByPeriod(invoices, period);
  }, [invoices, period]);

  useEffect(() => {
    if (invoices.length >= 5 && !localStorage.getItem("feedback_shown")) {
      setTimeout(() => {
        setShowFeedback(true);
        localStorage.setItem("feedback_shown", "true");
      }, 3000);
    }
  }, [invoices]);

  async function loadInvoices() {
    const supabase = createClient();
    
    // Get user
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.id) setCurrentUserId(user.id);
    } catch {}

    const { data, error } = await supabase
      .from("invoices")
      .select("id, vendor_name, invoice_number, invoice_date, due_date, subtotal, tax_amount, total_amount, created_at, status, user_id")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setInvoices(data);
      // Extract user_id from first invoice as fallback
      if (!currentUserId && data[0]?.user_id) {
        setCurrentUserId(data[0].user_id);
      }
    }
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
      if (json.success) {
        setContractResult(json.data);
        await loadContracts();
      }
    } catch {}
    finally {
      setContractLoading(false);
      e.target.value = "";
    }
  }

  function filterByPeriod(data: Invoice[], p: Period) {
    if (p === "all") { setFiltered(data); return; }
    const now = new Date();
    const months = p === "month" ? 1 : p === "quarter" ? 3 : 6;
    const cutoff = new Date(now.getFullYear(), now.getMonth() - months + 1, 1);
    setFiltered(data.filter((inv) => {
      const d = new Date(inv.invoice_date || inv.created_at);
      if (isNaN(d.getTime())) return false;
      return d >= cutoff;
    }));
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

  function getChartData() {
    const map: Record<string, number> = {};
    filtered.forEach((inv) => {
      const d = new Date(inv.invoice_date || inv.created_at);
      if (isNaN(d.getTime())) return;
      const year = d.getFullYear();
      if (year < 2020 || year > 2030) return;
      const key = `${year}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      map[key] = (map[key] || 0) + (inv.total_amount || 0);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).map(([month, total]) => ({ month, total: parseFloat(total.toFixed(2)) }));
  }

  async function generatePDF() {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const now = new Date();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Rapport de factures", 20, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Genere le: ${now.toLocaleDateString("fr-FR")}`, 20, 30);
    doc.text(`Total: ${filtered.length} factures`, 20, 42);
    doc.text(`HT: ${totalSubtotal.toFixed(2)} EUR`, 20, 50);
    doc.text(`TVA: ${totalTax.toFixed(2)} EUR`, 20, 58);
    doc.text(`TTC: ${totalAmount.toFixed(2)} EUR`, 20, 66);
    doc.setFont("helvetica", "bold");
    doc.text("Fournisseur", 20, 82);
    doc.text("Date", 90, 82);
    doc.text("HT", 130, 82);
    doc.text("TVA", 150, 82);
    doc.text("TTC", 170, 82);
    doc.setDrawColor(180, 180, 180);
    doc.line(20, 85, 195, 85);
    doc.setFont("helvetica", "normal");
    let y = 92;
    filtered.forEach((inv) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text((inv.vendor_name || "").substring(0, 25), 20, y);
      doc.text(inv.invoice_date || "", 90, y);
      doc.text(inv.subtotal ? Number(inv.subtotal).toFixed(2) : "", 130, y);
      doc.text(inv.tax_amount ? Number(inv.tax_amount).toFixed(2) : "", 150, y);
      doc.text(inv.total_amount ? Number(inv.total_amount).toFixed(2) : "", 170, y);
      y += 7;
    });
    doc.save(`rapport_${now.toISOString().split("T")[0]}.pdf`);
  }

  function exportCSV() {
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
  const totalSubtotal = filtered.reduce((acc, inv) => acc + (inv.subtotal || 0), 0);
  const avgAmount = filtered.length ? totalAmount / filtered.length : 0;
  const paidCount = filtered.filter((inv) => getStatus(inv) === "paid").length;
  const overdueCount = filtered.filter((inv) => getStatus(inv) === "overdue").length;
  const pendingCount = filtered.filter((inv) => getStatus(inv) === "pending").length;
  const unpaidTotal = filtered.filter((inv) => !["paid","rapproche"].includes(getStatus(inv))).reduce((acc, inv) => acc + (inv.total_amount || 0), 0);
  const chartData = getChartData();

  const periods: { key: Period; label: string }[] = [
    { key: "month", label: "CE MOIS" },
    { key: "quarter", label: "3 MOIS" },
    { key: "halfyear", label: "6 MOIS" },
    { key: "all", label: "TOUT" },
  ];

  const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    paid: { label: "PAYE", color: "#4ade80", bg: "#4ade8020" },
    rapproche: { label: "RAPPROCHE", color: "#4ade80", bg: "#4ade8020" },
    suggestion_ai: { label: "SUGGESTION AI", color: "#e8b84b", bg: "#e8b84b20" },
    correspondance_partielle: { label: "PARTIEL", color: "#fb923c", bg: "#fb923c20" },
    pending: { label: "EN ATTENTE", color: "#fb923c", bg: "#fb923c20" },
    overdue: { label: "EN RETARD", color: "#ef4444", bg: "#ef444420" },
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: MUTED, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>CHARGEMENT...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, padding: isMobile ? "16px 12px" : "28px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
            <div>
              <h1 style={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>MES DOCUMENTS</h1>
              <p style={{ color: MUTED, fontSize: 11, letterSpacing: 1 }}>{filtered.length} FACTURE{filtered.length !== 1 ? "S" : ""} · {paidCount} PAYEE{paidCount !== 1 ? "S" : ""}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/invoices" style={{ background: GOLD, color: "#0f1923", padding: isMobile ? "8px 14px" : "10px 22px", borderRadius: 3, fontSize: isMobile ? 10 : 11, fontWeight: 800, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
              + NOUVELLE FACTURE
            </Link>
            <Link href="/reconciliation" style={{ background: "transparent", color: GOLD, border: `1px solid ${GOLD}`, padding: isMobile ? "8px 14px" : "10px 22px", borderRadius: 3, fontSize: isMobile ? 10 : 11, fontWeight: 700, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
              + CSV BANCAIRE
            </Link>
            {!isMobile && filtered.length > 0 && (
              <>
                <button onClick={exportCSV} style={{ background: "transparent", color: TEXT, border: `1px solid ${BORDER}`, padding: "10px 18px", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>EXPORT CSV</button>
                <button onClick={generatePDF} style={{ background: "transparent", color: TEXT, border: `1px solid ${BORDER}`, padding: "10px 18px", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>RAPPORT PDF</button>
              </>
            )}
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 0, marginBottom: 20, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden", width: "fit-content" }}>
          {[
            { key: "factures", label: "FACTURES", count: filtered.length },
            { key: "contrats", label: "CONTRATS", count: contracts.length },
            { key: "insights", label: isMobile ? "⚡" : "INSIGHTS ⚡", count: null },
          ].map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)} style={{ padding: isMobile ? "8px 14px" : "10px 24px", border: "none", fontSize: isMobile ? 10 : 11, fontWeight: 700, letterSpacing: 1.5, color: activeTab === tab.key ? "#0f1923" : MUTED, background: activeTab === tab.key ? (tab.key === "insights" ? "#f59e0b" : GOLD) : "transparent", cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
              {tab.label}
              {tab.count !== null && (
                <span style={{ background: activeTab === tab.key ? "#0f192320" : BORDER, color: activeTab === tab.key ? "#0f1923" : MUTED, fontSize: 10, fontWeight: 800, padding: "1px 6px", borderRadius: 10 }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB: FACTURES */}
        {activeTab === "factures" && (
          <>
            {filtered.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {(overdueCount + pendingCount) > 0 && (
                  <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 4, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#ef4444", letterSpacing: 1, textTransform: "uppercase" }}>
                          {overdueCount + pendingCount} FACTURE{(overdueCount + pendingCount) > 1 ? "S" : ""} NON PAYEE{(overdueCount + pendingCount) > 1 ? "S" : ""}
                        </p>
                        <p style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>Montant en attente: {fmt(unpaidTotal)}</p>
                      </div>
                    </div>
                    <Link href="/reconciliation" style={{ background: "#ef444420", color: "#ef4444", border: "1px solid #ef444440", padding: "5px 12px", borderRadius: 3, fontSize: 10, fontWeight: 700, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                      RAPPROCHER
                    </Link>
                  </div>
                )}
                {totalTax > 0 && (
                  <div style={{ background: "#f59e0b15", border: "1px solid #f59e0b40", borderRadius: 4, padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#f59e0b", letterSpacing: 1, textTransform: "uppercase" }}>TVA A DECLARER</p>
                        <p style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>Avant le 20/{String(nextMonth).padStart(2, "0")}/{tvaYear}</p>
                      </div>
                    </div>
                    <span style={{ background: "#f59e0b20", color: "#f59e0b", border: "1px solid #f59e0b40", padding: "5px 12px", borderRadius: 3, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
                      {fmt(totalTax)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {filtered.length > 0 && (
              <div style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}40`, borderRadius: 4, padding: isMobile ? "12px 14px" : "18px 22px", marginBottom: 16 }}>
                <p style={{ fontSize: 10, color: GOLD, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>MONTANT NON ENCAISSE</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <p style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: GOLD }}>{fmt(unpaidTotal)}</p>
                  <div style={{ display: "flex", gap: isMobile ? 16 : 20 }}>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>NON PAYEES</p>
                      <p style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#ef4444" }}>{overdueCount + pendingCount}</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>EN RETARD</p>
                      <p style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#ef4444" }}>{overdueCount}</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>PAYEES</p>
                      <p style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#4ade80" }}>{paidCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 2, marginBottom: 16, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 3, padding: 3, width: "fit-content" }}>
              {periods.map((p) => (
                <button key={p.key} onClick={() => setPeriod(p.key)} style={{ padding: isMobile ? "5px 10px" : "7px 18px", borderRadius: 2, border: "none", fontSize: isMobile ? 9 : 10, fontWeight: 800, letterSpacing: 1.5, color: period === p.key ? "#0f1923" : MUTED, background: period === p.key ? GOLD : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
                  {p.label}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
              {[
                { label: "TOTAL FACTURES", value: filtered.length, color: GOLD },
                { label: "MONTANT TOTAL TTC", value: fmt(totalAmount), color: "#4ade80" },
                { label: "TVA TOTALE", value: fmt(totalTax), color: "#fb923c" },
                { label: "MOYENNE / FACTURE", value: fmt(avgAmount), color: "#60a5fa" },
              ].map((s) => (
                <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: isMobile ? "10px 12px" : "16px 20px" }}>
                  <p style={{ fontSize: 9, color: MUTED, letterSpacing: 1.5, marginBottom: 4, textTransform: "uppercase" }}>{s.label}</p>
                  <p style={{ fontSize: isMobile ? 16 : 24, fontWeight: 700, color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: isMobile ? "8px 10px" : "14px 18px" }}>
                <p style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>MONTANT HT</p>
                <p style={{ fontSize: isMobile ? 12 : 16, fontWeight: 700, color: "#4ade80" }}>{fmt(totalSubtotal)}</p>
              </div>
              <div style={{ background: CARD, border: `1px solid ${overdueCount > 0 ? "#ef444450" : BORDER}`, borderRadius: 4, padding: isMobile ? "8px 10px" : "14px 18px" }}>
                <p style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>
                  {overdueCount > 0 ? "EN RETARD" : "EN ATTENTE"}
                </p>
                <p style={{ fontSize: isMobile ? 12 : 16, fontWeight: 700, color: overdueCount > 0 ? "#ef4444" : "#fb923c" }}>
                  {overdueCount > 0 ? overdueCount : pendingCount} FAC.
                </p>
              </div>
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: isMobile ? "8px 10px" : "14px 18px" }}>
                <p style={{ fontSize: 9, color: MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>TVA</p>
                <p style={{ fontSize: isMobile ? 12 : 16, fontWeight: 700, color: "#60a5fa" }}>{fmt(totalTax)}</p>
              </div>
            </div>

            {!isMobile && chartData.length > 0 && (
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "18px 20px", marginBottom: 16 }}>
                <p style={{ fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>DEPENSES PAR MOIS</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a3a50" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 3, fontSize: 11, color: TEXT }} formatter={(value: any) => [`${String(value).replace(".", ",")} €`, "TTC"]} />
                    <Bar dataKey="total" fill={GOLD} radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div style={{ background: CARD, border: `1px solid ${GOLD}40`, borderRadius: 4, padding: isMobile ? "10px 12px" : "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <p style={{ fontSize: isMobile ? 10 : 11, fontWeight: 700, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 2 }}>RAPPROCHEMENT BANCAIRE</p>
                {!isMobile && <p style={{ fontSize: 12, color: MUTED }}>Importez le CSV de votre banque</p>}
              </div>
              <Link href="/reconciliation" style={{ background: GOLD, color: "#0f1923", padding: isMobile ? "7px 12px" : "10px 22px", borderRadius: 3, fontSize: isMobile ? 10 : 11, fontWeight: 800, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                + IMPORTER CSV
              </Link>
            </div>

            {filtered.length === 0 ? (
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "48px 32px", textAlign: "center" }}>
                <p style={{ color: MUTED, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>AUCUNE FACTURE</p>
                <Link href="/invoices" style={{ background: GOLD, color: "#0f1923", padding: "10px 24px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
                  + NOUVELLE FACTURE
                </Link>
              </div>
            ) : isMobile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {filtered.map((inv) => {
                  const status = getStatus(inv);
                  const sc = statusConfig[status] || statusConfig["pending"];
                  const canConfirm = status === "suggestion_ai" || status === "correspondance_partielle";
                  return (
                    <div key={inv.id} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "10px 12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{inv.vendor_name || "—"}</p>
                          <p style={{ fontSize: 10, color: MUTED }}>{inv.invoice_date || "—"}</p>
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: GOLD }}>{inv.total_amount ? fmt(Number(inv.total_amount)) : "—"}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ background: sc.bg, color: sc.color, padding: "2px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                          {sc.label}
                        </span>
                        <div style={{ display: "flex", gap: 6 }}>
                          {canConfirm && (
                            <button onClick={() => confirmPayment(inv.id)} style={{ background: "#4ade8015", color: "#4ade80", border: "1px solid #4ade8040", padding: "2px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>
                              CONFIRMER
                            </button>
                          )}
                          <button onClick={() => deleteInvoice(inv.id)} style={{ background: "none", border: "none", color: BORDER, cursor: "pointer", fontSize: 16 }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = BORDER)}
                          >×</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse", minWidth: 600 }}>
                    <thead>
                      <tr style={{ background: "#151f2e", borderBottom: `1px solid ${BORDER}` }}>
                        {["FOURNISSEUR","N FACTURE","DATE","SOUS-TOTAL","TVA","TOTAL TTC","STATUT",""].map((h) => (
                          <th key={h} style={{ textAlign: ["SOUS-TOTAL","TVA","TOTAL TTC",""].includes(h) ? "right" : "left", padding: "10px 14px", fontSize: 10, color: MUTED, letterSpacing: 1.5, fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((inv, i) => {
                        const status = getStatus(inv);
                        const sc = statusConfig[status] || statusConfig["pending"];
                        const canConfirm = status === "suggestion_ai" || status === "correspondance_partielle";
                        return (
                          <tr key={inv.id}
                            style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : "none" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#1f2f45")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <td style={{ padding: "11px 14px", fontWeight: 600, color: TEXT }}>{inv.vendor_name || "—"}</td>
                            <td style={{ padding: "11px 14px", color: MUTED, fontFamily: "monospace", fontSize: 11 }}>{inv.invoice_number || "—"}</td>
                            <td style={{ padding: "11px 14px", color: MUTED, whiteSpace: "nowrap", fontSize: 11 }}>{inv.invoice_date || "—"}</td>
                            <td style={{ padding: "11px 14px", textAlign: "right", color: TEXT, whiteSpace: "nowrap" }}>{inv.subtotal ? fmt(Number(inv.subtotal)) : "—"}</td>
                            <td style={{ padding: "11px 14px", textAlign: "right", color: MUTED, whiteSpace: "nowrap" }}>{inv.tax_amount ? fmt(Number(inv.tax_amount)) : "—"}</td>
                            <td style={{ padding: "11px 14px", textAlign: "right", fontWeight: 700, color: GOLD, whiteSpace: "nowrap" }}>{inv.total_amount ? fmt(Number(inv.total_amount)) : "—"}</td>
                            <td style={{ padding: "11px 14px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                                <span style={{ background: sc.bg, color: sc.color, padding: "3px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                                  {sc.label}
                                </span>
                                {canConfirm && (
                                  <button onClick={() => confirmPayment(inv.id)} style={{ background: "#4ade8015", color: "#4ade80", border: "1px solid #4ade8040", padding: "3px 10px", borderRadius: 2, fontSize: 10, fontWeight: 700, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase", whiteSpace: "nowrap" }}>
                                    CONFIRMER
                                  </button>
                                )}
                              </div>
                            </td>
                            <td style={{ padding: "11px 14px", textAlign: "right" }}>
                              <button onClick={() => deleteInvoice(inv.id)}
                                style={{ background: "none", border: "none", color: BORDER, cursor: "pointer", fontSize: 16 }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = BORDER)}
                              >×</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB: CONTRATS */}
        {activeTab === "contrats" && (
          <div>
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: isMobile ? "20px 16px" : "32px 24px", marginBottom: 20, textAlign: "center" }}>
              <h3 style={{ fontSize: isMobile ? 12 : 14, fontWeight: 700, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                ANALYSER UN CONTRAT
              </h3>
              <p style={{ fontSize: 12, color: MUTED, marginBottom: isMobile ? 12 : 16, lineHeight: 1.6 }}>
                L'IA analyse votre contrat et detecte les clauses importantes, les frais caches et les risques.
              </p>
              {!isMobile && (
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
                  {["Conditions de paiement", "Clauses a risque", "Frais caches", "Dates cles"].map((tag) => (
                    <span key={tag} style={{ background: `${GOLD}15`, color: GOLD, border: `1px solid ${GOLD}30`, padding: "4px 10px", borderRadius: 20, fontSize: 11 }}>{tag}</span>
                  ))}
                </div>
              )}
              <label style={{ background: contractLoading ? BORDER : GOLD, color: "#0f1923", padding: isMobile ? "10px 20px" : "11px 28px", borderRadius: 3, cursor: contractLoading ? "not-allowed" : "pointer", fontSize: isMobile ? 10 : 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", display: "inline-block" }}>
                {contractLoading ? "ANALYSE EN COURS..." : "IMPORTER UN CONTRAT (PDF)"}
                <input type="file" accept=".pdf" style={{ display: "none" }} onChange={handleContractUpload} disabled={contractLoading} />
              </label>
            </div>

            {contractResult && (
              <div style={{ background: CARD, border: `1px solid ${GOLD}40`, borderRadius: 4, padding: isMobile ? "16px" : "24px", marginBottom: 20 }}>
                <p style={{ fontSize: 10, color: GOLD, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>RESULTAT DE L'ANALYSE IA</p>
                {contractResult.summary && (
                  <div style={{ background: "#0f1923", borderRadius: 3, padding: "14px 16px", marginBottom: 16 }}>
                    <p style={{ fontSize: 11, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>RESUME</p>
                    <p style={{ fontSize: 13, color: TEXT, lineHeight: 1.7 }}>{contractResult.summary}</p>
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  {contractResult.vendor_name && (
                    <div style={{ background: "#0f1923", borderRadius: 3, padding: "12px 14px" }}>
                      <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>FOURNISSEUR</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{contractResult.vendor_name}</p>
                    </div>
                  )}
                  {contractResult.payment_terms && (
                    <div style={{ background: "#0f1923", borderRadius: 3, padding: "12px 14px" }}>
                      <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>CONDITIONS DE PAIEMENT</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#4ade80" }}>{contractResult.payment_terms}</p>
                    </div>
                  )}
                </div>
                {contractResult.hidden_fees && contractResult.hidden_fees.length > 0 && (
                  <div style={{ background: "#ef444410", border: "1px solid #ef444430", borderRadius: 3, padding: "14px 16px", marginBottom: 12 }}>
                    <p style={{ fontSize: 11, color: "#ef4444", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>FRAIS CACHES DETECTES</p>
                    {contractResult.hidden_fees.map((fee: any, i: number) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <p style={{ fontSize: 12, color: TEXT }}>{fee.description}</p>
                        {fee.amount && <span style={{ fontSize: 12, fontWeight: 700, color: "#ef4444" }}>{fee.amount}</span>}
                      </div>
                    ))}
                  </div>
                )}
                {contractResult.risk_clauses && contractResult.risk_clauses.length > 0 && (
                  <div style={{ background: "#f59e0b10", border: "1px solid #f59e0b30", borderRadius: 3, padding: "14px 16px", marginBottom: 12 }}>
                    <p style={{ fontSize: 11, color: "#f59e0b", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>CLAUSES A RISQUE</p>
                    {contractResult.risk_clauses.map((clause: any, i: number) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: clause.severity === "high" ? "#ef4444" : clause.severity === "medium" ? "#f59e0b" : MUTED, background: clause.severity === "high" ? "#ef444420" : "#f59e0b20", padding: "2px 6px", borderRadius: 2, whiteSpace: "nowrap", marginTop: 2 }}>
                          {clause.severity?.toUpperCase()}
                        </span>
                        <p style={{ fontSize: 12, color: TEXT, lineHeight: 1.5 }}>{clause.clause}</p>
                      </div>
                    ))}
                  </div>
                )}
                {contractResult.key_dates && contractResult.key_dates.length > 0 && (
                  <div style={{ background: "#0f1923", borderRadius: 3, padding: "12px 14px" }}>
                    <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>DATES CLES</p>
                    {contractResult.key_dates.map((d: any, i: number) => (
                      <div key={i} style={{ display: "flex", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, color: GOLD, fontWeight: 700, whiteSpace: "nowrap" }}>{d.date}</span>
                        <span style={{ fontSize: 12, color: TEXT }}>{d.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {contracts.length > 0 && (
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, background: "#151f2e" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: TEXT, letterSpacing: 1.5, textTransform: "uppercase" }}>{contracts.length} CONTRAT{contracts.length > 1 ? "S" : ""} ANALYSE{contracts.length > 1 ? "S" : ""}</p>
                </div>
                <div>
                  {contracts.map((contract, i) => (
                    <div key={contract.id} style={{ padding: isMobile ? "10px 12px" : "14px 18px", borderBottom: i < contracts.length - 1 ? `1px solid ${BORDER}` : "none", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 2 }}>{contract.vendor_name || contract.filename}</p>
                        <p style={{ fontSize: 10, color: MUTED }}>{contract.payment_terms || "—"} · {new Date(contract.created_at).toLocaleDateString("fr-FR")}</p>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {contract.risk_clauses && contract.risk_clauses.length > 0 && (
                          <span style={{ background: "#f59e0b20", color: "#f59e0b", padding: "2px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700 }}>
                            {contract.risk_clauses.length} RISQUE{contract.risk_clauses.length > 1 ? "S" : ""}
                          </span>
                        )}
                        {contract.hidden_fees && contract.hidden_fees.length > 0 && (
                          <span style={{ background: "#ef444420", color: "#ef4444", padding: "2px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700 }}>
                            {contract.hidden_fees.length} FRAIS
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: INSIGHTS */}
        {activeTab === "insights" && (
          <InsightsTab isMobile={isMobile} userId={currentUserId} />
        )}

      </div>

      {showFeedback && (
        <FeedbackWidget trigger="auto" onClose={() => setShowFeedback(false)} />
      )}

    </div>
  );
}