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
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, total]) => ({ month, total: parseFloat(total.toFixed(2)) }));
  }

  async function generatePDF() {
    const { default: jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const now = new Date();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Rapport de factures", 20, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Genere le: ${now.toLocaleDateString("fr-FR")}`, 20, 30);
    doc.text(`Periode: ${period === "month" ? "Ce mois" : period === "quarter" ? "3 derniers mois" : period === "halfyear" ? "6 derniers mois" : "Toutes les factures"}`, 20, 38);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Resume", 20, 52);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Total factures: ${filtered.length}`, 20, 62);
    doc.text(`Montant HT total: ${totalSubtotal.toFixed(2)} EUR`, 20, 70);
    doc.text(`TVA totale: ${totalTax.toFixed(2)} EUR`, 20, 78);
    doc.text(`Montant TTC total: ${totalAmount.toFixed(2)} EUR`, 20, 86);
    doc.text(`Moyenne par facture: ${avgAmount.toFixed(2)} EUR`, 20, 94);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Fournisseur", 20, 110);
    doc.text("N Facture", 75, 110);
    doc.text("Date", 120, 110);
    doc.text("HT", 148, 110);
    doc.text("TVA", 163, 110);
    doc.text("TTC", 178, 110);

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 113, 195, 113);

    doc.setFont("helvetica", "normal");
    let y = 120;
    filtered.forEach((inv) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text((inv.vendor_name || "").substring(0, 22), 20, y);
      doc.text((inv.invoice_number || "").substring(0, 18), 75, y);
      doc.text(inv.invoice_date || "", 120, y);
      doc.text(inv.subtotal ? `${Number(inv.subtotal).toFixed(2)}` : "", 148, y);
      doc.text(inv.tax_amount ? `${Number(inv.tax_amount).toFixed(2)}` : "", 163, y);
      doc.text(inv.total_amount ? `${Number(inv.total_amount).toFixed(2)}` : "", 178, y);
      y += 8;
    });

    doc.line(20, y + 2, 195, y + 2);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL", 20, y + 10);
    doc.text(totalSubtotal.toFixed(2), 148, y + 10);
    doc.text(totalTax.toFixed(2), 163, y + 10);
    doc.text(totalAmount.toFixed(2), 178, y + 10);

    doc.save(`rapport_factures_${now.toISOString().split("T")[0]}.pdf`);
  }

  function exportCSV() {
    if (!filtered.length) return;
    const headers = ["vendor_name","invoice_number","invoice_date","due_date","subtotal","tax_amount","total_amount","statut"];
    const rows = filtered.map((inv) => [
      inv.vendor_name||"", inv.invoice_number||"", inv.invoice_date||"",
      inv.due_date||"", inv.subtotal??"", inv.tax_amount??"",
      inv.total_amount??"", getStatus(inv),
    ]);
    const csv = [headers,...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
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
    { key: "month", label: "Ce mois" },
    { key: "quarter", label: "3 mois" },
    { key: "halfyear", label: "6 mois" },
    { key: "all", label: "Tout" },
  ];

  const statusColor: Record<string, string> = { pending: "#f59e0b", overdue: "#ef4444" };
  const statusLabel: Record<string, string> = { pending: "En attente", overdue: "En retard" };

  if (loading) {
    return (
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
        <p style={{ color: "#9ca3af", fontSize: 14 }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 16px" }}>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111827", marginBottom: 4, letterSpacing: -0.5 }}>
            Mes factures
          </h1>
          <p style={{ color: "#9ca3af", fontSize: 14 }}>
            {filtered.length} facture{filtered.length !== 1 ? "s" : ""} enregistree{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/invoices" style={{ background: "#6366f1", color: "white", padding: "9px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            + Nouvelle facture
          </Link>
          <Link href="/reconciliation" style={{ background: "#3b82f6", color: "white", padding: "9px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            + CSV bancaire
          </Link>
          {filtered.length > 0 && (
            <>
              <button onClick={exportCSV} style={{ background: "#10b981", color: "white", border: "none", padding: "9px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Export CSV
              </button>
              <button onClick={generatePDF} style={{ background: "#f59e0b", color: "white", border: "none", padding: "9px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Rapport PDF
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 24, background: "white", border: "1px solid #e5e7eb", borderRadius: 10, padding: 4, width: "fit-content" }}>
        {periods.map((p) => (
          <button key={p.key} onClick={() => setPeriod(p.key)} style={{ padding: "7px 16px", borderRadius: 7, border: "none", fontSize: 13, fontWeight: period === p.key ? 600 : 400, color: period === p.key ? "white" : "#6b7280", background: period === p.key ? "#6366f1" : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 12 }}>
        {[
          { label: "Total factures", value: filtered.length, suffix: "", color: "#6366f1" },
          { label: "Montant total TTC", value: totalAmount.toFixed(2), suffix: " EUR", color: "#10b981" },
          { label: "TVA totale", value: totalTax.toFixed(2), suffix: " EUR", color: "#f59e0b" },
          { label: "Moyenne par facture", value: avgAmount.toFixed(2), suffix: " EUR", color: "#8b5cf6" },
        ].map((s) => (
          <div key={s.label} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "18px 20px" }}>
            <p style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{s.label}</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}{s.suffix}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "#dcfce7", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>✓</div>
          <div>
            <p style={{ fontSize: 11, color: "#166534", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>HT total</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#166534" }}>{totalSubtotal.toFixed(2)} EUR</p>
          </div>
        </div>
        <div style={{ background: overdueCount > 0 ? "#fef2f2" : "#fffbeb", border: `1px solid ${overdueCount > 0 ? "#fecaca" : "#fde68a"}`, borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: overdueCount > 0 ? "#fee2e2" : "#fef3c7", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
            {overdueCount > 0 ? "⚠" : "⏳"}
          </div>
          <div>
            <p style={{ fontSize: 11, color: overdueCount > 0 ? "#991b1b" : "#92400e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>
              {overdueCount > 0 ? "En retard" : "En attente"}
            </p>
            <p style={{ fontSize: 18, fontWeight: 700, color: overdueCount > 0 ? "#dc2626" : "#d97706" }}>
              {overdueCount > 0 ? overdueCount : pendingCount} facture{(overdueCount || pendingCount) !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: "#dbeafe", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📊</div>
          <div>
            <p style={{ fontSize: 11, color: "#1e40af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>TVA a declarer</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: "#1d4ed8" }}>{totalTax.toFixed(2)} EUR</p>
          </div>
        </div>
      </div>

      {chartData.length > 0 && (
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 16 }}>Depenses par mois (EUR)</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #e5e7eb", borderRadius: 8 }} formatter={(value: any) => [`${value} EUR`, "Total TTC"]} />
              <Bar dataKey="total" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg, #eff6ff, #f0f9ff)", border: "1px solid #bfdbfe", borderRadius: 12, padding: "18px 24px", marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1d4ed8", marginBottom: 4 }}>Rapprochement bancaire automatique</p>
          <p style={{ fontSize: 13, color: "#3b82f6" }}>Importez le CSV de votre banque — l'IA rapproche vos factures automatiquement</p>
        </div>
        <Link href="/reconciliation" style={{ background: "#3b82f6", color: "white", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
          + Importer CSV bancaire
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "60px 32px", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📄</div>
          <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 20 }}>Aucune facture pour cette periode</p>
          <Link href="/invoices" style={{ background: "#6366f1", color: "white", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Importer une facture
          </Link>
        </div>
      ) : (
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse", minWidth: 600 }}>
              <thead style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <tr>
                  {["Fournisseur","N Facture","Date","Sous-total","TVA","Total TTC","Statut",""].map((h) => (
                    <th key={h} style={{ textAlign: ["Sous-total","TVA","Total TTC",""].includes(h) ? "right" : "left", padding: "12px 16px", fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv, i) => {
                  const status = getStatus(inv);
                  return (
                    <tr key={inv.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                    >
                      <td style={{ padding: "13px 16px", fontWeight: 600, color: "#111827" }}>{inv.vendor_name || "—"}</td>
                      <td style={{ padding: "13px 16px", color: "#6b7280", fontFamily: "monospace", fontSize: 12 }}>{inv.invoice_number || "—"}</td>
                      <td style={{ padding: "13px 16px", color: "#6b7280", whiteSpace: "nowrap" }}>{inv.invoice_date || "—"}</td>
                      <td style={{ padding: "13px 16px", textAlign: "right", color: "#374151", whiteSpace: "nowrap" }}>{inv.subtotal ? `${Number(inv.subtotal).toFixed(2)} EUR` : "—"}</td>
                      <td style={{ padding: "13px 16px", textAlign: "right", color: "#374151", whiteSpace: "nowrap" }}>{inv.tax_amount ? `${Number(inv.tax_amount).toFixed(2)} EUR` : "—"}</td>
                      <td style={{ padding: "13px 16px", textAlign: "right", fontWeight: 700, color: "#111827", whiteSpace: "nowrap" }}>{inv.total_amount ? `${Number(inv.total_amount).toFixed(2)} EUR` : "—"}</td>
                      <td style={{ padding: "13px 16px" }}>
                        <span style={{ background: `${statusColor[status]}15`, color: statusColor[status], padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
                          {status === "overdue" ? "⚠" : "⏳"} {statusLabel[status]}
                        </span>
                      </td>
                      <td style={{ padding: "13px 16px", textAlign: "right" }}>
                        <button onClick={() => deleteInvoice(inv.id)}
                          style={{ background: "none", border: "none", color: "#d1d5db", cursor: "pointer", fontSize: 18, lineHeight: 1 }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "#d1d5db")}
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
  );
}