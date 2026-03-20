"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

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
  status: "reconciled" | "unmatched" | "error";
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
  const [step, setStep] = useState(1);

  const stats = {
    total: transactions.length,
    reconciled: transactions.filter((t) => t.status === "reconciled").length,
    unmatched: transactions.filter((t) => t.status === "unmatched").length,
    error: transactions.filter((t) => t.status === "error").length,
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

  function downloadSampleCSV() {
    const sample = `Date,Description,Amount\n2026-03-14,LIDL,-11.26\n2026-03-13,CLIENT ABC,1500.00\n2026-03-12,EDF ELECTRICITE,-80.00`;
    const blob = new Blob([sample], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "exemple_releve_bancaire.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function runAutoMatch(importedCount: number) {
    setMatching(true);
    try {
      const res = await fetch("/api/reconciliation/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (json.success && json.matched > 0) {
        setSuccessMsg(`${importedCount} importee(s) · ${json.matched} rapprochee(s) automatiquement.`);
        setStep(3);
      } else {
        setSuccessMsg(`${importedCount} transaction(s) importee(s). Verification manuelle requise.`);
        setStep(2);
      }
      await loadData();
    } catch (err) {
      console.error("Auto-match error:", err);
    } finally {
      setMatching(false);
    }
  }

  async function handleCSVUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      if (rows.length === 0) throw new Error("CSV vide. Format: Date,Description,Amount");
      const supabase = createClient();
      const { data: existing } = await supabase.from("bank_transactions").select("date, description, amount");
      const filtered = rows.filter((r) => !existing?.some((e: any) => e.date === r.date && e.description === r.description && Math.abs(parseFloat(e.amount) - r.amount) < 0.01));
      if (filtered.length === 0) throw new Error("Toutes ces transactions ont deja ete importees.");
      const { error: insertError } = await supabase.from("bank_transactions").insert(filtered.map((r) => ({ ...r, status: "unmatched" })));
      if (insertError) throw new Error(insertError.message);
      await loadData();
      setLoading(false);
      setTimeout(() => runAutoMatch(filtered.length), 300);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    } finally {
      e.target.value = "";
    }
  }

  async function handleAutoMatch() {
    setMatching(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/reconciliation/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      if (json.matched === 0) {
        setError(`Aucun match trouve. Factures disponibles: ${invoices.length}`);
      } else {
        setSuccessMsg(`${json.matched} transaction(s) rapprochee(s).`);
        setStep(3);
      }
      await loadData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setMatching(false);
    }
  }

  async function handleManualMatch(txId: string, invoiceId: string) {
    if (!invoiceId || !txId) return;
    const supabase = createClient();
    const { error: updateError } = await supabase.from("bank_transactions").update({ status: "reconciled", matched_invoice_id: invoiceId, match_confidence: 100 }).eq("id", txId);
    if (updateError) { setError("Erreur: " + updateError.message); return; }
    setTransactions((prev) => prev.map((t) => t.id === txId ? { ...t, status: "reconciled", matched_invoice_id: invoiceId, match_confidence: 100 } : t));
  }

  async function handleClearAll() {
    const supabase = createClient();
    await supabase.from("bank_transactions").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    setTransactions([]);
    setSuccessMsg("");
    setError("");
    setStep(1);
  }

  function exportReport() {
    const headers = ["date","description","amount","status","matched_invoice_id","confidence"];
    const rows = transactions.map((t) => [t.date, t.description, t.amount, t.status, t.matched_invoice_id || "", t.match_confidence || ""]);
    const csv = [headers,...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapprochement_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ minHeight: "100vh", background: BG, padding: "28px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
            RAPPROCHEMENT BANCAIRE
          </h1>
          <p style={{ color: MUTED, fontSize: 12, letterSpacing: 1 }}>
            IMPORTEZ VOTRE RELEVE CSV — LE MATCHING SE FAIT AUTOMATIQUEMENT
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", gap: 0, marginBottom: 24, background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden" }}>
          {[
            { num: 1, label: "IMPORTER", desc: "Chargez votre CSV" },
            { num: 2, label: "MATCHING IA", desc: "Automatique" },
            { num: 3, label: "EXPORTER", desc: "Rapport final" },
          ].map((s, i) => (
            <div key={s.num} style={{ flex: 1, padding: "14px 18px", borderRight: i < 2 ? `1px solid ${BORDER}` : "none", background: step === s.num ? "#1f2f45" : "transparent", borderBottom: step === s.num ? `2px solid ${GOLD}` : "2px solid transparent", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <div style={{ width: 20, height: 20, borderRadius: 2, background: step >= s.num ? GOLD : BORDER, color: step >= s.num ? "#0f1923" : MUTED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>
                  {step > s.num ? "✓" : s.num}
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: step === s.num ? GOLD : MUTED }}>{s.label}</span>
                {step === s.num && s.num === 2 && matching && (
                  <span style={{ fontSize: 10, color: GOLD, fontStyle: "italic" }}>en cours...</span>
                )}
              </div>
              <p style={{ fontSize: 11, color: MUTED, marginLeft: 28 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        {stats.total > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
            {[
              { label: "TOTAL", value: stats.total, color: GOLD },
              { label: "RAPPROCHEES", value: stats.reconciled, color: "#4ade80" },
              { label: "EN ATTENTE", value: stats.unmatched, color: "#fb923c" },
              { label: "ERREURS", value: stats.error, color: "#ef4444" },
            ].map((s) => (
              <div key={s.label} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "14px 16px" }}>
                <div style={{ fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Upload zone */}
        {transactions.length === 0 && (
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "32px 24px", marginBottom: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: TEXT, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>IMPORTER VOTRE RELEVE BANCAIRE</h3>
            <p style={{ fontSize: 12, color: MUTED, marginBottom: 16, lineHeight: 1.6 }}>
              Format requis: <span style={{ color: GOLD, fontFamily: "monospace" }}>Date, Description, Amount</span>
            </p>
            <div style={{ background: "#0f1923", border: `1px solid ${BORDER}`, borderRadius: 4, padding: "12px 16px", marginBottom: 20, fontFamily: "monospace", fontSize: 11, color: MUTED }}>
              <div style={{ color: GOLD, marginBottom: 4 }}>// EXEMPLE FORMAT</div>
              <div>Date,Description,Amount</div>
              <div>2026-03-14,LIDL,-11.26</div>
              <div>2026-03-13,CLIENT ABC,1500.00</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <label style={{ background: GOLD, color: "#0f1923", padding: "10px 24px", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer", display: "inline-block", letterSpacing: 1.5, textTransform: "uppercase" }}>
                {loading ? "CHARGEMENT..." : "IMPORTER MON RELEVE CSV"}
                <input type="file" accept=".csv" style={{ display: "none" }} onChange={handleCSVUpload} disabled={loading} />
              </label>
              <button onClick={downloadSampleCSV} style={{ background: "transparent", color: MUTED, border: `1px solid ${BORDER}`, padding: "10px 20px", borderRadius: 4, fontSize: 11, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}>
                TELECHARGER EXEMPLE
              </button>
            </div>
          </div>
        )}

        {/* Matching en cours */}
        {matching && (
          <div style={{ background: CARD, border: `1px solid ${GOLD}50`, borderRadius: 4, padding: "14px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 16, height: 16, border: `2px solid ${GOLD}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: GOLD, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>MATCHING EN COURS...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Actions */}
        {transactions.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={handleAutoMatch} disabled={matching || stats.unmatched === 0} style={{ background: matching || stats.unmatched === 0 ? BORDER : GOLD, color: matching || stats.unmatched === 0 ? MUTED : "#0f1923", border: "none", padding: "10px 22px", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: matching || stats.unmatched === 0 ? "not-allowed" : "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}>
              {matching ? "MATCHING..." : `AUTO-MATCH (${stats.unmatched})`}
            </button>
            <button onClick={exportReport} style={{ background: "transparent", color: "#4ade80", border: "1px solid #4ade8050", padding: "10px 22px", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}>
              EXPORTER
            </button>
            <label style={{ background: "transparent", color: MUTED, border: `1px solid ${BORDER}`, padding: "10px 16px", borderRadius: 4, fontSize: 11, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}>
              + IMPORTER CSV
              <input type="file" accept=".csv" style={{ display: "none" }} onChange={handleCSVUpload} />
            </label>
            <button onClick={handleClearAll} style={{ background: "transparent", color: "#ef4444", border: "1px solid #ef444430", padding: "10px 16px", borderRadius: 4, fontSize: 11, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase", marginLeft: "auto" }}>
              TOUT EFFACER
            </button>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 4, padding: "12px 16px", color: "#ef4444", fontSize: 12, marginBottom: 14, letterSpacing: 0.5 }}>
            {error}
          </div>
        )}
        {successMsg && (
          <div style={{ background: "#4ade8015", border: "1px solid #4ade8040", borderRadius: 4, padding: "12px 16px", color: "#4ade80", fontSize: 12, marginBottom: 14, letterSpacing: 0.5 }}>
            ✓ {successMsg}
          </div>
        )}

        {/* Table */}
        {transactions.length > 0 && (
          <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#151f2e" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: TEXT, letterSpacing: 1.5, textTransform: "uppercase" }}>
                {transactions.length} TRANSACTIONS
              </span>
              <span style={{ fontSize: 11, color: MUTED, letterSpacing: 1 }}>
                {stats.reconciled} RAPPROCHEES · {stats.unmatched} EN ATTENTE
              </span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse", minWidth: 700 }}>
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
                    const isReconciled = tx.status === "reconciled";
                    return (
                      <tr key={tx.id} style={{ borderBottom: i < transactions.length - 1 ? `1px solid ${BORDER}` : "none", background: isReconciled ? "#16a34a10" : "transparent", transition: "background 0.1s" }}
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
                            {isReconciled ? "✓ RAPPROCHE" : "? EN ATTENTE"}
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
                            <select onChange={(e) => handleManualMatch(tx.id, e.target.value)} style={{ fontSize: 11, border: `1px solid ${BORDER}`, borderRadius: 3, padding: "4px 8px", color: TEXT, background: "#0f1923", maxWidth: 160, letterSpacing: 0.5 }} defaultValue="">
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
  );
}