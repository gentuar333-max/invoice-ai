"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { logAudit } from "@/lib/audit";
import { FeedbackWidget } from "@/app/feedback/page";
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

  useEffect(() => { loadInvoices(); }, []);

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
    const { data, error } = await supabase
      .from("invoices")
      .select("id, vendor_name, invoice_number, invoice_date, due_date, subtotal, tax_amount, total_amount, created_at, status")
      .order("created_at", { ascending: false });
    if (!error && data) setInvoices(data);
    setLoading(false);
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
    await logAudit({
      action: "DELETE",
      entity: "invoice",
      entity_id: id,
      old_data: inv,
    });
  }

  async function confirmPayment(id: string) {
    const supabase = createClient();
    const inv = invoices.find((i) => i.id === id);
    await supabase.from("invoices").update({ status: "paid" }).eq("id", id);
    setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status: "paid" } : i));
    await logAudit({
      action: "CONFIRM_PAYMENT",
      entity: "invoice",
      entity_id: id,
      old_data: { status: inv?.status },
      new_data: { status: "paid" },
    });
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

  const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    paid: { label: "PAYE", color: "#4ade80", bg: "#4ade8020", dot: "🔵" },
    rapproche: { label: "RAPPROCHE", color: "#4ade80", bg: "#4ade8020", dot: "🟢" },
    suggestion_ai: { label: "SUGGESTION AI", color: "#e8b84b", bg: "#e8b84b20", dot: "🟡" },
    correspondance_partielle: { label: "PARTIEL", color: "#fb923c", bg: "#fb923c20", dot: "🟡" },
    pending: { label: "EN ATTENTE", color: "#fb923c", bg: "#fb923c20", dot: "🟡" },
    overdue: { label: "EN RETARD", color: "#ef4444", bg: "#ef444420", dot: "🔴" },
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: MUTED, fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>CHARGEMENT...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "28px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>MES FACTURES</h1>
            <p style={{ color: MUTED, fontSize: 11, letterSpacing: 1 }}>{filtered.length} FACTURE{filtered.length !== 1 ? "S" : ""} · {paidCount} PAYEE{paidCount !== 1 ? "S" : ""}</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/invoices" style={{ background: GOLD, color: "#0f1923", padding: "10px 22px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
              + NOUVELLE FACTURE
            </Link>
            <Link href="/reconciliation" style={{ background: "transparent", color: GOLD, border: `1px solid ${GOLD}`, padding: "10px 22px", borderRadius: 3, fontSize: 11, fontWeight: 700, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
              + CSV BANCAIRE
            </Link>
            {filtered.length > 0 && (
              <>
                <button onClick={exportCSV} style={{ background: "transparent", color: TEXT, border: `1px solid ${BORDER}`, padding: "10px 18px", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>EXPORT CSV</button>
                <button onClick={generatePDF} style={{ background: "transparent", color: TEXT, border: `1px solid ${BORDER}`, padding: "10px 18px", borderRadius: 3, fontSize: 11, fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>RAPPORT PDF</button>
              </>
            )}
          </div>
        </div>

        {/* ALERTS */}
        {filtered.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {(overdueCount + pendingCount) > 0 && (
              <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 4, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🔴</span>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", letterSpacing: 1, textTransform: "uppercase" }}>
                      {overdueCount + pendingCount} FACTURE{(overdueCount + pendingCount) > 1 ? "S" : ""} NON PAYEE{(overdueCount + pendingCount) > 1 ? "S" : ""}
                    </p>
                    <p style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>Montant total en attente: {fmt(unpaidTotal)}</p>
                  </div>
                </div>
                <Link href="/reconciliation" style={{ background: "#ef444420", color: "#ef4444", border: "1px solid #ef444440", padding: "6px 14px", borderRadius: 3, fontSize: 10, fontWeight: 700, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
                  RAPPROCHER
                </Link>
              </div>
            )}
            {totalTax > 0 && (
              <div style={{ background: "#f59e0b15", border: "1px solid #f59e0b40", borderRadius: 4, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🟡</span>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", letterSpacing: 1, textTransform: "uppercase" }}>TVA A DECLARER</p>
                    <p style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>Avant le 20/{String(nextMonth).padStart(2, "0")}/{tvaYear} — {fmt(totalTax)}</p>
                  </div>
                </div>
                <span style={{ background: "#f59e0b20", color: "#f59e0b", border: "1px solid #f59e0b40", padding: "6px 14px", borderRadius: 3, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
                  {fmt(totalTax)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* MONEY BOX */}
        {filtered.length > 0 && (
          <div style={{ background: `${GOLD}12`, border: `1px solid ${GOLD}40`, borderRadius: 4, padding: "18px 22px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <p style={{ fontSize: 10, color: GOLD, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>MONTANT NON ENCAISSE</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: GOLD }}>{fmt(unpaidTotal)}</p>
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>NON PAYEES</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#ef4444" }}>{overdueCount + pendingCount}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>EN RETARD</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#ef4444" }}>{overdueCount}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>PAYEES</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: "#4ade80" }}>{paidCount}</p>
              </div>
            </div>
          </div>
        )}

        {/* Period filter */}
        <div style={{ display: "flex", gap: 2, marginBottom: 20, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 3, padding: 3, width: "fit-content" }}>
          {periods.map((p) => (
            <button key={p.key} onClick={() => setPeriod(p.key)} style={{ padding: "7px 18px", borderRadius: 2, border: "none", fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: period === p.key ? "#0f1923" : MUTED, background: period === p.key ? GOLD : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
              {p.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 10 }}>
          {[
            { label: "TOTAL FACTURES", value: filtered.length, color: GOLD },
            { label: "MONTANT TOTAL TTC", value: fmt(totalAmount), color: "#4ade80" },
            { label: "TVA TOTALE", value: fmt(totalTax), color: "#fb923c" },
            { label: "MOYENNE / FACTURE", value: fmt(avgAmount), color: "#60a5fa" },
          ].map((s) => (
            <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "16px 20px" }}>
              <p style={{ fontSize: 10, color: MUTED, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>{s.label}</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Status cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: "#4ade8020", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✓</div>
            <div>
              <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>MONTANT HT</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#4ade80" }}>{fmt(totalSubtotal)}</p>
            </div>
          </div>
          <div style={{ background: CARD, border: `1px solid ${overdueCount > 0 ? "#ef444450" : BORDER}`, borderRadius: 4, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: overdueCount > 0 ? "#ef444420" : "#fb923c20", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
              {overdueCount > 0 ? "⚠" : "⏳"}
            </div>
            <div>
              <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>
                {overdueCount > 0 ? "EN RETARD" : "EN ATTENTE"}
              </p>
              <p style={{ fontSize: 16, fontWeight: 700, color: overdueCount > 0 ? "#ef4444" : "#fb923c" }}>
                {overdueCount > 0 ? overdueCount : pendingCount} FACTURE{(overdueCount || pendingCount) !== 1 ? "S" : ""}
              </p>
            </div>
          </div>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: "#3b82f620", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📊</div>
            <div>
              <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>TVA A DECLARER</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#60a5fa" }}>{fmt(totalTax)}</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
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

        {/* Banque CTA */}
        <div style={{ background: CARD, border: `1px solid ${GOLD}40`, borderRadius: 4, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>RAPPROCHEMENT BANCAIRE</p>
            <p style={{ fontSize: 12, color: MUTED }}>Importez le CSV de votre banque — l'IA rapproche automatiquement</p>
          </div>
          <Link href="/reconciliation" style={{ background: GOLD, color: "#0f1923", padding: "10px 22px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>
            + IMPORTER CSV
          </Link>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "48px 32px", textAlign: "center" }}>
            <p style={{ color: MUTED, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>AUCUNE FACTURE</p>
            <Link href="/invoices" style={{ background: GOLD, color: "#0f1923", padding: "10px 24px", borderRadius: 3, fontSize: 11, fontWeight: 800, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
              + NOUVELLE FACTURE
            </Link>
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
                              {sc.dot} {sc.label}
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

      </div>

      {/* Feedback Widget */}
      {showFeedback && (
        <FeedbackWidget trigger="auto" onClose={() => setShowFeedback(false)} />
      )}

    </div>
  );
}