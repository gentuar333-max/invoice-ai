"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import UpgradeModal from "@/components/UpgradeModal";

const BG = "#0f1923";
const CARD = "#1a2535";
const BORDER = "#2a3a50";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

type BankTransaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
  matched_invoice_id: string | null;
  match_confidence: number | null;
};

type Invoice = {
  id: string;
  vendor_name: string;
  invoice_number: string;
  total_amount: number;
  invoice_date: string;
};

export default function ReconciliationPage() {
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [matching, setMatching] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [dragging, setDragging] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const stats = {
    total: transactions.length,
    reconciled: transactions.filter((t) => t.status === "reconciled" || t.status === "rapproche").length,
    unmatched: transactions.filter((t) => t.status === "unmatched").length,
  };

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const supabase = createClient();
    const [{ data: txData }, { data: invData }] = await Promise.all([
      supabase.from("bank_transactions").select("*").order("date", { ascending: false }),
      supabase.from("invoices").select("id, vendor_name, invoice_number, total_amount, invoice_date"),
    ]);
    if (txData) setTransactions(txData as BankTransaction[]);
    if (invData) setInvoices(invData as Invoice[]);
  }

  function parseCSV(text: string) {
    const lines = text.trim().split("\n").filter((l) => l.trim());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map((c) => c.trim().replace(/"/g, ""));
      if (cols.length < 3) continue;
      const amount = parseFloat(cols[2].replace(",", "."));
      if (isNaN(amount)) continue;
      rows.push({ date: cols[0], description: cols[1], amount });
    }
    return rows;
  }

  async function handleFile(file: File) {
    if (!file) return;

    const plan = localStorage.getItem("user_plan") || "free";
    if (plan === "free") {
      setShowUpgrade(true);
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      if (rows.length === 0) throw new Error("CSV vide. Format requis: Date,Description,Amount");

      const supabase = createClient();
      const { data: existing } = await supabase.from("bank_transactions").select("date, description, amount");
      const filtered = rows.filter((r) => !existing?.some((e: any) =>
        e.date === r.date && e.description === r.description && Math.abs(parseFloat(e.amount) - r.amount) < 0.01
      ));

      if (filtered.length === 0) throw new Error("Toutes ces transactions ont deja ete importees.");

      const { error: insertError } = await supabase.from("bank_transactions").insert(
        filtered.map((r) => ({ ...r, status: "unmatched" }))
      );
      if (insertError) throw new Error(insertError.message);

      await loadData();
      setLoading(false);

      // Auto-match
      setMatching(true);
      const res = await fetch("/api/reconciliation/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg(`${filtered.length} transaction(s) importee(s) — ${json.matched || 0} rapprochee(s) automatiquement.`);
      }
      await loadData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setMatching(false);
    }
  }

  async function handleManualMatch(txId: string, invoiceId: string) {
    if (!invoiceId || !txId) return;
    const supabase = createClient();
    await supabase.from("bank_transactions").update({
      status: "reconciled",
      matched_invoice_id: invoiceId,
      match_confidence: 100,
    }).eq("id", txId);
    setTransactions((prev) => prev.map((t) => t.id === txId ? { ...t, status: "reconciled", matched_invoice_id: invoiceId, match_confidence: 100 } : t));
  }

  function exportReport() {
    if (!transactions.length) return;
    const headers = ["date","description","amount","status","matched_invoice","confidence"];
    const rows = transactions.map((t) => {
      const inv = invoices.find((i) => i.id === t.matched_invoice_id);
      return [t.date, t.description, t.amount, t.status, inv ? `${inv.vendor_name} ${inv.total_amount}EUR` : "", t.match_confidence || ""];
    });
    const csv = [headers,...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapprochement_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadSampleCSV() {
    const sample = `Date,Description,Amount\n2026-03-24,LIDL CHENOVE,-13.72\n2026-03-13,CLIENT ABC,1500.00`;
    const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exemple_releve.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      {showUpgrade && <UpgradeModal reason="csv" onClose={() => setShowUpgrade(false)} />}

      <div style={{ minHeight: "100vh", background: BG, padding: "28px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 600, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>RAPPROCHEMENT BANCAIRE</h1>
              <p style={{ color: MUTED, fontSize: 12, letterSpacing: 1 }}>IMPORTEZ VOTRE RELEVE CSV — LE MATCHING SE FAIT AUTOMATIQUEMENT</p>
            </div>
            {transactions.length > 0 && (
              <button onClick={exportReport} style={{ background: "transparent", color: "#4ade80", border: "1px solid #4ade8050", padding: "10px 22px", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}>
                EXPORTER RAPPORT
              </button>
            )}
          </div>

          {/* Stats */}
          {transactions.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
              {[
                { label: "TOTAL", value: stats.total, color: GOLD },
                { label: "RAPPROCHEES", value: stats.reconciled, color: "#4ade80" },
                { label: "EN ATTENTE", value: stats.unmatched, color: "#fb923c" },
              ].map((s) => (
                <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Messages */}
          {error && (
            <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 4, padding: "12px 16px", color: "#ef4444", fontSize: 12, marginBottom: 16 }}>
              {error}
            </div>
          )}
          {successMsg && (
            <div style={{ background: "#4ade8015", border: "1px solid #4ade8040", borderRadius: 4, padding: "12px 16px", color: "#4ade80", fontSize: 12, marginBottom: 16 }}>
              {successMsg}
            </div>
          )}
          {matching && (
            <div style={{ background: CARD, border: `1px solid ${GOLD}50`, borderRadius: 4, padding: "12px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 14, height: 14, border: `2px solid ${GOLD}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: GOLD, fontWeight: 600, letterSpacing: 1 }}>MATCHING EN COURS...</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Upload zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            style={{ background: dragging ? `${GOLD}08` : CARD, border: `2px dashed ${dragging ? GOLD : BORDER}`, borderRadius: 4, padding: "36px 24px", textAlign: "center", marginBottom: 20, transition: "all 0.2s" }}
          >
            <p style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 6 }}>
              {loading ? "Importation en cours..." : "Glissez votre releve bancaire ici"}
            </p>
            <p style={{ fontSize: 12, color: MUTED, marginBottom: 20 }}>Format CSV · Date, Description, Amount</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <label style={{ background: loading ? BORDER : GOLD, color: "#0f1923", padding: "10px 24px", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "inline-block", letterSpacing: 1.5, textTransform: "uppercase" }}>
                {loading ? "CHARGEMENT..." : "IMPORTER MON RELEVE CSV"}
                <input type="file" accept=".csv" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} disabled={loading} />
              </label>
              <button onClick={downloadSampleCSV} style={{ background: "transparent", color: MUTED, border: `1px solid ${BORDER}`, padding: "10px 20px", borderRadius: 4, fontSize: 11, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}>
                TELECHARGER EXEMPLE
              </button>
            </div>
          </div>

          {/* Add more CSV button */}
          {transactions.length > 0 && (
            <div style={{ marginBottom: 16, textAlign: "right" }}>
              <label style={{ background: "transparent", color: MUTED, border: `1px solid ${BORDER}`, padding: "8px 16px", borderRadius: 4, fontSize: 11, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}>
                + IMPORTER CSV SUPPLEMENTAIRE
                <input type="file" accept=".csv" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
              </label>
            </div>
          )}

          {/* Table */}
          {transactions.length > 0 && (
            <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, background: "#151f2e", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: TEXT, letterSpacing: 1.5, textTransform: "uppercase" }}>
                  {transactions.length} TRANSACTIONS
                </span>
                <span style={{ fontSize: 11, color: MUTED }}>
                  {stats.reconciled} RAPPROCHEES · {stats.unmatched} EN ATTENTE
                </span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse", minWidth: 600 }}>
                  <thead style={{ background: "#151f2e", borderBottom: `1px solid ${BORDER}` }}>
                    <tr>
                      {["DATE","DESCRIPTION","MONTANT","STATUT","FACTURE","CONFIANCE","ACTION"].map((h) => (
                        <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 10, color: MUTED, letterSpacing: 1.5, fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, i) => {
                      const matchedInv = invoices.find((inv) => inv.id === tx.matched_invoice_id);
                      const isReconciled = tx.status === "reconciled" || tx.status === "rapproche";
                      return (
                        <tr key={tx.id}
                          style={{ borderBottom: i < transactions.length - 1 ? `1px solid ${BORDER}` : "none", background: isReconciled ? "#16a34a10" : "transparent" }}
                          onMouseEnter={(e) => !isReconciled && (e.currentTarget.style.background = "#1f2f45")}
                          onMouseLeave={(e) => !isReconciled && (e.currentTarget.style.background = "transparent")}
                        >
                          <td style={{ padding: "11px 14px", color: MUTED, fontFamily: "monospace", fontSize: 11, whiteSpace: "nowrap" }}>{tx.date}</td>
                          <td style={{ padding: "11px 14px", fontWeight: 600, color: TEXT }}>{tx.description}</td>
                          <td style={{ padding: "11px 14px", fontFamily: "monospace", fontWeight: 700, color: tx.amount > 0 ? "#4ade80" : TEXT, whiteSpace: "nowrap" }}>
                            {tx.amount > 0 ? "+" : ""}{tx.amount} EUR
                          </td>
                          <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>
                            <span style={{ background: isReconciled ? "#4ade8020" : "#fb923c20", color: isReconciled ? "#4ade80" : "#fb923c", padding: "3px 8px", borderRadius: 2, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                              {isReconciled ? "RAPPROCHE" : "EN ATTENTE"}
                            </span>
                          </td>
                          <td style={{ padding: "11px 14px", fontSize: 11, color: MUTED }}>
                            {matchedInv ? `${matchedInv.vendor_name} — ${matchedInv.total_amount} EUR` : "—"}
                          </td>
                          <td style={{ padding: "11px 14px", fontSize: 11, color: GOLD, fontFamily: "monospace" }}>
                            {tx.match_confidence ? `${tx.match_confidence}%` : "—"}
                          </td>
                          <td style={{ padding: "11px 14px" }}>
                            {!isReconciled && (
                              <select onChange={(e) => handleManualMatch(tx.id, e.target.value)} style={{ fontSize: 11, border: `1px solid ${BORDER}`, borderRadius: 3, padding: "4px 8px", color: TEXT, background: "#0f1923", maxWidth: 160 }} defaultValue="">
                                <option value="">ASSOCIER</option>
                                {invoices.map((inv) => (
                                  <option key={inv.id} value={inv.id}>{inv.vendor_name} — {inv.total_amount} EUR</option>
                                ))}
                              </select>
                            )}
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
    </>
  );
}