"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

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
};

type Period = "month" | "quarter" | "halfyear" | "all";

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filtered, setFiltered] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>("all");

  useEffect(() => { loadInvoices(); }, []);
  useEffect(() => { filterByPeriod(invoices, period); }, [invoices, period]);

  async function loadInvoices() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("invoices")
      .select("id, vendor_name, invoice_number, invoice_date, due_date, subtotal, tax_amount, total_amount, created_at")
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
    await supabase.from("invoices").delete().eq("id", id);
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  }

  function getStatus(inv: Invoice): "pending" | "overdue" {
    if (!inv.due_date) return "pending";
    const due = new Date(inv.due_date);
    const now = new Date();
    return due < now ? "overdue" : "pending";
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
    doc.text(`Total factures: ${filtered.length}`, 20, 42);
    doc.text(`Montant HT: ${totalSubtotal.toFixed(2)} EUR`, 20, 50);
    doc.text(`TVA: ${totalTax.toFixed(2)} EUR`, 20, 58);
    doc.text(`Total TTC: ${totalAmount.toFixed(2)} EUR`, 20, 66);
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
    doc.line(20, y + 2, 195, y + 2);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL", 20, y + 9);
    doc.text(totalSubtotal.toFixed(2), 130, y + 9);
    doc.text(totalTax.toFixed(2), 150, y + 9);
    doc.text(totalAmount.toFixed(2), 170, y + 9);
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

  const totalAmount = filtered.reduce((acc, inv) => acc + (inv.total_amount || 0), 0);
  const totalTax = filtered.reduce((acc, inv) => acc + (inv.tax_amount || 0), 0);
  const totalSubtotal = filtered.reduce((acc, inv) => acc + (inv.subtotal || 0), 0);
  const avgAmount = filtered.length ? totalAmount / filtered.length : 0;
  const overdueCount = filtered.filter((inv) => getStatus(inv) === "overdue").length;
  const pendingCount = filtered.filter((inv) => getStatus(inv) === "pending").length;
  const chartData = getChartData();

  const periods: { key: Period; label: string }[] = [
    { key: "month", label: "CE MOIS" },
    { key: "quarter", label: "3 MOIS" },
    { key: "halfyear", label: "6 MOIS" },
    { key: "all", label: "TOUT" },
  ];

  const BG = "#0f1923";
  const CARD = "#1a2535";
  const BORDER = "#2a3a50";
  const GOLD = "#e8b84b";
  const TEXT = "#e2e8f0";
  const MUTED = "#7a9bb5";

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: BG, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: MUTED, fontSize: 14, letterSpacing: 2, textTransform: "uppercase" }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "28px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
              MES FACTURES
            </h1>
            <p style={{ color: MUTED, fontSize: 12, letterSpacing: 1 }}>
              {filtered.length} FACTURE{filtered.length !== 1 ? "S" : ""} ENREGISTREE{filtered.length !== 1 ? "S" : ""}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link href="/invoices" style={{ background: GOLD, color: "#0f1923", padding: "10px 22px", borderRadius: 4, fontSize: 12, fontWeight: 700, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
              + NOUVELLE FACTURE
            </Link>
            <Link href="/reconciliation" style={{ background: "transparent", color: GOLD, border: `1px solid ${GOLD}`, padding: "10px 22px", borderRadius: 4, fontSize: 12, fontWeight: 700, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
              + CSV BANCAIRE
            </Link>
            {filtered.length > 0 && (
              <>
                <button onClick={exportCSV} style={{ background: "transparent", color: TEXT, border: `1px solid ${BORDER}`, padding: "10px 18px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>
                  EXPORT CSV
                </button>
                <button onClick={generatePDF} style={{ background: "transparent", color: TEXT, border: `1px solid ${BORDER}`, padding: "10px 18px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase" }}>
                  RAPPORT PDF
                </button>
              </>
            )}
          </div>
        </div>

        {/* Period filter */}
        <div style={{ display: "flex", gap: 2, marginBottom: 24, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: 3, width: "fit-content" }}>
          {periods.map((p) => (
            <button key={p.key} onClick={() => setPeriod(p.key)} style={{ padding: "7px 18px", borderRadius: 3, border: "none", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: period === p.key ? "#0f1923" : MUTED, background: period === p.key ? GOLD : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
              {p.label}
            </button>
          ))}
        </div>

        {/* Stats 4 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 10 }}>
          {[
            { label: "TOTAL FACTURES", value: filtered.length, suffix: "", color: GOLD },
            { label: "MONTANT TOTAL TTC", value: totalAmount.toFixed(2), suffix: " EUR", color: "#4ade80" },
            { label: "TVA TOTALE", value: totalTax.toFixed(2), suffix: " EUR", color: "#fb923c" },
            { label: "MOYENNE / FACTURE", value: avgAmount.toFixed(2), suffix: " EUR", color: "#60a5fa" },
          ].map((s) => (
            <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "16px 20px" }}>
              <p style={{ fontSize: 10, color: MUTED, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase" }}>{s.label}</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: s.color, letterSpacing: -0.5 }}>{s.value}{s.suffix}</p>
            </div>
          ))}
        </div>

        {/* Status summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: "#16a34a30", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✓</div>
            <div>
              <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>HT TOTAL</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#4ade80" }}>{totalSubtotal.toFixed(2)} EUR</p>
            </div>
          </div>
          <div style={{ background: CARD, border: `1px solid ${overdueCount > 0 ? "#ef444450" : BORDER}`, borderRadius: 4, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, background: overdueCount > 0 ? "#ef444430" : "#f59e0b30", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
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
            <div style={{ width: 32, height: 32, background: "#3b82f630", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📊</div>
            <div>
              <p style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 3 }}>TVA A DECLARER</p>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#60a5fa" }}>{totalTax.toFixed(2)} EUR</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "18px 20px", marginBottom: 16 }}>
            <p style={{ fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>DEPENSES PAR MOIS (EUR)</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3a50" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: MUTED }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1a2535", border: "1px solid #2a3a50", borderRadius: 4, fontSize: 11, color: TEXT }} formatter={(value: any) => [`${value} EUR`, "TTC"]} />
                <Bar dataKey="total" fill={GOLD} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Banque CTA */}
        <div style={{ background: CARD, border: `1px solid ${GOLD}40`, borderRadius: 4, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: GOLD, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>RAPPROCHEMENT BANCAIRE</p>
            <p style={{ fontSize: 12, color: MUTED }}>Importez le CSV de votre banque — l'IA rapproche automatiquement</p>
          </div>
          <Link href="/reconciliation" style={{ background: GOLD, color: "#0f1923", padding: "10px 22px", borderRadius: 4, fontSize: 11, fontWeight: 700, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>
            + IMPORTER CSV
          </Link>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "48px 32px", textAlign: "center" }}>
            <p style={{ color: MUTED, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>AUCUNE FACTURE</p>
            <Link href="/invoices" style={{ background: GOLD, color: "#0f1923", padding: "10px 24px", borderRadius: 4, fontSize: 11, fontWeight: 700, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase" }}>
              + NOUVELLE FACTURE
            </Link>
          </div>
        ) : (
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    {["FOURNISSEUR","N FACTURE","DATE","SOUS-TOTAL","TVA","TOTAL TTC","STATUT",""].map((h) => (
                      <th key={h} style={{ textAlign: ["SOUS-TOTAL","TVA","TOTAL TTC",""].includes(h) ? "right" : "left", padding: "10px 14px", fontSize: 10, color: MUTED, letterSpacing: 1.5, fontWeight: 600, whiteSpace: "nowrap", background: "#151f2e" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((inv, i) => {
                    const status = getStatus(inv);
                    return (
                      <tr key={inv.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${BORDER}` : "none", transition: "background 0.1s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#1f2f45")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <td style={{ padding: "11px 14px", fontWeight: 600, color: TEXT }}>{inv.vendor_name || "—"}</td>
                        <td style={{ padding: "11px 14px", color: MUTED, fontFamily: "monospace", fontSize: 11 }}>{inv.invoice_number || "—"}</td>
                        <td style={{ padding: "11px 14px", color: MUTED, whiteSpace: "nowrap", fontSize: 11 }}>{inv.invoice_date || "—"}</td>
                        <td style={{ padding: "11px 14px", textAlign: "right", color: TEXT, whiteSpace: "nowrap" }}>{inv.subtotal ? `${Number(inv.subtotal).toFixed(2)}` : "—"}</td>
                        <td style={{ padding: "11px 14px", textAlign: "right", color: MUTED, whiteSpace: "nowrap" }}>{inv.tax_amount ? `${Number(inv.tax_amount).toFixed(2)}` : "—"}</td>
                        <td style={{ padding: "11px 14px", textAlign: "right", fontWeight: 700, color: GOLD, whiteSpace: "nowrap" }}>{inv.total_amount ? `${Number(inv.total_amount).toFixed(2)} EUR` : "—"}</td>
                        <td style={{ padding: "11px 14px" }}>
                          <span style={{ background: status === "overdue" ? "#ef444420" : "#f59e0b20", color: status === "overdue" ? "#ef4444" : "#fb923c", padding: "3px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                            {status === "overdue" ? "EN RETARD" : "EN ATTENTE"}
                          </span>
                        </td>
                        <td style={{ padding: "11px 14px", textAlign: "right" }}>
                          <button onClick={() => deleteInvoice(inv.id)}
                            style={{ background: "none", border: "none", color: BORDER, cursor: "pointer", fontSize: 16, lineHeight: 1 }}
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
    </div>
  );
}