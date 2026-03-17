"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

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
    const sample = `Date,Description,Amount\n2026-03-14,LIDL,-11.26\n2026-03-13,CLIENT ABC,1500.00\n2026-03-12,EDF ELECTRICITE,-80.00\n2026-03-10,AMAZON,-45.99`;
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
        setSuccessMsg(`${importedCount} transaction(s) importee(s) · ${json.matched} rapprochee(s) automatiquement.`);
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
      if (rows.length === 0) throw new Error("CSV vide. Colonnes attendues: Date, Description, Amount");
      const supabase = createClient();
      const { data: existing } = await supabase.from("bank_transactions").select("date, description, amount");
      const filtered = rows.filter((r) => {
        return !existing?.some((e: any) =>
          e.date === r.date && e.description === r.description && Math.abs(parseFloat(e.amount) - r.amount) < 0.01
        );
      });
      if (filtered.length === 0) throw new Error("Toutes ces transactions ont deja ete importees.");
      const { error: insertError } = await supabase
        .from("bank_transactions")
        .insert(filtered.map((r) => ({ ...r, status: "unmatched" })));
      if (insertError) throw new Error(insertError.message);
      await loadData();
      setLoading(false);
      // Auto-match apres import
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
        setError(`Aucun match trouve. Verifiez que les montants correspondent. Factures: ${invoices.length}`);
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
    setError("");
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("bank_transactions")
      .update({ status: "reconciled", matched_invoice_id: invoiceId, match_confidence: 100 })
      .eq("id", txId);
    if (updateError) { setError("Erreur: " + updateError.message); return; }
    setTransactions((prev) =>
      prev.map((t) => t.id === txId
        ? { ...t, status: "reconciled", matched_invoice_id: invoiceId, match_confidence: 100 }
        : t
      )
    );
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
    const headers = ["date", "description", "amount", "status", "matched_invoice_id", "confidence"];
    const rows = transactions.map((t) => [
      t.date, t.description, t.amount, t.status,
      t.matched_invoice_id || "", t.match_confidence || "",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapprochement_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const statusColor: Record<string, string> = {
    reconciled: "#10b981",
    unmatched: "#f59e0b",
    error: "#ef4444",
  };

  const statusLabel: Record<string, string> = {
    reconciled: "Rapproche",
    unmatched: "Non rapproche",
    error: "Erreur",
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, letterSpacing: -0.5 }}>
          Rapprochement bancaire
        </h1>
        <p style={{ color: "#6b7280", fontSize: 14 }}>
          Importez votre releve CSV — le matching se fait automatiquement.
        </p>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, background: "white", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        {[
          { num: 1, label: "Importer", desc: "Chargez votre CSV" },
          { num: 2, label: "Matching IA", desc: "Automatique" },
          { num: 3, label: "Exporter", desc: "Rapport final" },
        ].map((s, i) => (
          <div key={s.num} style={{ flex: 1, padding: "14px 16px", borderRight: i < 2 ? "1px solid #f3f4f6" : "none", background: step === s.num ? "#eff6ff" : step > s.num ? "#f0fdf4" : "white", borderBottom: step === s.num ? "2px solid #3b82f6" : step > s.num ? "2px solid #10b981" : "2px solid transparent", transition: "all 0.3s" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: step > s.num ? "#10b981" : step === s.num ? "#3b82f6" : "#e5e7eb", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                {step > s.num ? "✓" : s.num}
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: step === s.num ? "#1d4ed8" : step > s.num ? "#166534" : "#374151" }}>{s.label}</span>
              {step === s.num && s.num === 2 && matching && (
                <span style={{ fontSize: 11, color: "#6366f1", fontStyle: "italic" }}>en cours...</span>
              )}
            </div>
            <p style={{ fontSize: 11, color: "#9ca3af", marginLeft: 30 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      {stats.total > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Total", value: stats.total, color: "#6366f1" },
            { label: "Rapprochees", value: stats.reconciled, color: "#10b981" },
            { label: "En attente", value: stats.unmatched, color: "#f59e0b" },
            { label: "Erreurs", value: stats.error, color: "#ef4444" },
          ].map((s) => (
            <div key={s.label} style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 18px" }}>
              <div style={{ fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      {transactions.length === 0 && (
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "32px 24px", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Importer votre releve bancaire</h3>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, lineHeight: 1.6 }}>
            Format CSV requis: <strong>Date, Description, Amount</strong>
          </p>
          <div style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontFamily: "monospace", fontSize: 12, color: "#374151", overflowX: "auto" }}>
            <div style={{ color: "#9ca3af", marginBottom: 4 }}>Exemple:</div>
            <div>Date,Description,Amount</div>
            <div>2026-03-14,LIDL,-11.26</div>
            <div>2026-03-13,CLIENT ABC,1500.00</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <label style={{ background: "#3b82f6", color: "white", padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-block", textAlign: "center" }}>
              {loading ? "Chargement..." : "Importer mon releve CSV"}
              <input type="file" accept=".csv" style={{ display: "none" }} onChange={handleCSVUpload} disabled={loading} />
            </label>
            <button onClick={downloadSampleCSV} style={{ background: "white", color: "#374151", border: "1px solid #e5e7eb", padding: "12px 20px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
              Telecharger un exemple
            </button>
          </div>
        </div>
      )}

      {/* Matching en cours */}
      {matching && (
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 10, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 20, height: 20, border: "2px solid #3b82f6", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
          <span style={{ fontSize: 14, color: "#1d4ed8", fontWeight: 500 }}>Matching en cours...</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Actions */}
      {transactions.length > 0 && (
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <button
            onClick={handleAutoMatch}
            disabled={matching || stats.unmatched === 0}
            style={{ background: matching || stats.unmatched === 0 ? "#9ca3af" : "#6366f1", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: matching || stats.unmatched === 0 ? "not-allowed" : "pointer" }}
          >
            {matching ? "Matching..." : `Auto-Match (${stats.unmatched})`}
          </button>
          <button onClick={exportReport} style={{ background: "#10b981", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            Exporter
          </button>
          <label style={{ background: "white", color: "#374151", border: "1px solid #e5e7eb", padding: "10px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}>
            + Importer CSV
            <input type="file" accept=".csv" style={{ display: "none" }} onChange={handleCSVUpload} />
          </label>
          <button onClick={handleClearAll} style={{ background: "transparent", color: "#ef4444", border: "1px solid #fecaca", padding: "10px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer", marginLeft: "auto" }}>
            Tout effacer
          </button>
        </div>
      )}

      {/* Messages */}
      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 16px", color: "#dc2626", fontSize: 13, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {successMsg && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 16px", color: "#16a34a", fontSize: 13, marginBottom: 16 }}>
          ✓ {successMsg}
        </div>
      )}

      {/* Table - mobile scroll */}
      {transactions.length > 0 && (
        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
              {transactions.length} transactions
            </span>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>
              {stats.reconciled} rapprochees · {stats.unmatched} en attente
            </span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse", minWidth: 700 }}>
              <thead style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <tr>
                  {["Date", "Description", "Montant", "Statut", "Facture", "Confiance", "Action"].map((h) => (
                    <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 11, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, i) => {
                  const matchedInv = invoices.find((inv) => inv.id === tx.matched_invoice_id);
                  return (
                    <tr key={tx.id} style={{ borderBottom: i < transactions.length - 1 ? "1px solid #f3f4f6" : "none", background: tx.status === "reconciled" ? "#f0fdf4" : "white" }}>
                      <td style={{ padding: "11px 14px", color: "#6b7280", fontFamily: "monospace", fontSize: 12, whiteSpace: "nowrap" }}>{tx.date}</td>
                      <td style={{ padding: "11px 14px", fontWeight: 500 }}>{tx.description}</td>
                      <td style={{ padding: "11px 14px", fontFamily: "monospace", fontWeight: 600, color: tx.amount > 0 ? "#10b981" : "#374151", whiteSpace: "nowrap" }}>
                        {tx.amount > 0 ? "+" : ""}{tx.amount} EUR
                      </td>
                      <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>
                        <span style={{ background: `${statusColor[tx.status]}20`, color: statusColor[tx.status], padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                          {tx.status === "reconciled" ? "✓" : tx.status === "unmatched" ? "?" : "✗"} {statusLabel[tx.status]}
                        </span>
                      </td>
                      <td style={{ padding: "11px 14px", fontSize: 12, color: "#6b7280" }}>
                        {matchedInv ? `${matchedInv.vendor_name} — ${matchedInv.total_amount} EUR` : "—"}
                      </td>
                      <td style={{ padding: "11px 14px", fontSize: 12, color: "#9ca3af", fontFamily: "monospace" }}>
                        {tx.match_confidence ? `${tx.match_confidence}%` : "—"}
                      </td>
                      <td style={{ padding: "11px 14px" }}>
                        {tx.status !== "reconciled" && (
                          <select
                            onChange={(e) => handleManualMatch(tx.id, e.target.value)}
                            style={{ fontSize: 12, border: "1px solid #e5e7eb", borderRadius: 6, padding: "4px 8px", color: "#374151", background: "white", maxWidth: 160 }}
                            defaultValue=""
                          >
                            <option value="">Associer</option>
                            {invoices.map((inv) => (
                              <option key={inv.id} value={inv.id}>
                                {inv.vendor_name} — {inv.total_amount} EUR
                              </option>
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
  );
}