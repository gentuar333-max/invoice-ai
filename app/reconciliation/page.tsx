"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import UpgradeModal from "@/components/UpgradeModal";

const C = {
  bg:      "#f4f4f5",
  white:   "#ffffff",
  orange:  "#f97316",
  orangeL: "#fff7ed",
  orangeB: "#fed7aa",
  text:    "#18181b",
  muted:   "#71717a",
  border:  "#e4e4e7",
  green:   "#22c55e",
  greenL:  "#f0fdf4",
  amber:   "#f59e0b",
  amberL:  "#fffbeb",
  red:     "#ef4444",
  redL:    "#fef2f2",
};

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

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(n) + " €";
}

export default function ReconciliationPage() {
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [matching, setMatching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragging, setDragging] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const total      = transactions.length;
  const reconciled = transactions.filter(t => ["reconciled","rapproche"].includes(t.status)).length;
  const unmatched  = transactions.filter(t => t.status === "unmatched").length;

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    const supabase = createClient();
    const [{ data: tx }, { data: inv }] = await Promise.all([
      supabase.from("bank_transactions").select("*").order("date", { ascending: false }),
      supabase.from("invoices").select("id, vendor_name, invoice_number, total_amount, invoice_date"),
    ]);
    if (tx) setTransactions(tx as BankTransaction[]);
    if (inv) setInvoices(inv as Invoice[]);
  }

  function parseCSV(text: string) {
    const lines = text.trim().split("\n").filter(l => l.trim());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map(c => c.trim().replace(/"/g, ""));
      if (cols.length < 3) continue;
      const amount = parseFloat(cols[2].replace(",", "."));
      if (isNaN(amount)) continue;
      rows.push({ date: cols[0], description: cols[1], amount });
    }
    return rows;
  }

  async function handleFile(file: File) {
    const plan = localStorage.getItem("user_plan") || "free";
    if (plan === "free") { setShowUpgrade(true); return; }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const text = await file.text();
      const rows = parseCSV(text);
      if (!rows.length) throw new Error("CSV vide. Format requis: Date,Description,Amount");
      const supabase = createClient();
      const { data: existing } = await supabase.from("bank_transactions").select("date, description, amount");
      const filtered = rows.filter(r => !existing?.some((e: any) =>
        e.date === r.date && e.description === r.description && Math.abs(parseFloat(e.amount) - r.amount) < 0.01
      ));
      if (!filtered.length) throw new Error("Toutes ces transactions ont deja ete importees.");
      const { error: err } = await supabase.from("bank_transactions").insert(filtered.map(r => ({ ...r, status: "unmatched" })));
      if (err) throw new Error(err.message);
      await loadData();
      setLoading(false);
      setMatching(true);
      const res = await fetch("/api/reconciliation/match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
      const json = await res.json();
      if (json.success) setSuccess(`${filtered.length} transaction(s) importee(s) · ${json.matched || 0} rapprochee(s) automatiquement`);
      await loadData();
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); setMatching(false); }
  }

  async function handleManualMatch(txId: string, invoiceId: string) {
    if (!invoiceId || !txId) return;
    const supabase = createClient();
    await supabase.from("bank_transactions").update({ status: "reconciled", matched_invoice_id: invoiceId, match_confidence: 100 }).eq("id", txId);
    setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: "reconciled", matched_invoice_id: invoiceId, match_confidence: 100 } : t));
  }

  function exportReport() {
    if (!transactions.length) return;
    const headers = ["date","description","amount","status","matched_invoice","confidence"];
    const rows = transactions.map(t => {
      const inv = invoices.find(i => i.id === t.matched_invoice_id);
      return [t.date, t.description, t.amount, t.status, inv ? `${inv.vendor_name} ${inv.total_amount}` : "", t.match_confidence || ""];
    });
    const csv = [headers,...rows].map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+csv],{type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapprochement_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      {showUpgrade && <UpgradeModal reason="csv" onClose={() => setShowUpgrade(false)} />}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.25s ease forwards; }
        .tx-row { background: ${C.white}; border-radius: 12px; padding: 12px 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
      `}</style>

      <div style={{ background: C.bg, minHeight: "100vh", paddingBottom: 84, fontFamily: "'DM Sans', sans-serif" }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(150deg, #fff7ed 0%, #ffedd5 100%)`, padding: "20px 16px", borderBottom: `1px solid ${C.orangeB}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: total > 0 ? 16 : 0 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>Banque</h1>
              <p style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>Rapprochement bancaire automatique</p>
            </div>
            {total > 0 && (
              <button onClick={exportReport} style={{ fontSize: 12, fontWeight: 700, color: C.green, background: C.greenL, border: `1px solid #bbf7d0`, padding: "7px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>
                Exporter
              </button>
            )}
          </div>

          {/* Stats */}
          {total > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { label: "Total",       value: total,      color: C.text },
                { label: "Rapprochees", value: reconciled, color: C.green },
                { label: "En attente",  value: unmatched,  color: C.amber },
              ].map(s => (
                <div key={s.label} style={{ background: C.white, borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <p style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: C.muted, fontWeight: 600 }}>{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: "16px" }}>

          {/* Messages */}
          {error && (
            <div style={{ background: C.redL, border: `1px solid #fecaca`, borderRadius: 10, padding: "11px 14px", color: C.red, fontSize: 13, marginBottom: 12 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: C.greenL, border: `1px solid #bbf7d0`, borderRadius: 10, padding: "11px 14px", color: C.green, fontSize: 13, marginBottom: 12 }}>
              {success}
            </div>
          )}
          {matching && (
            <div style={{ background: C.orangeL, border: `1px solid ${C.orangeB}`, borderRadius: 10, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 14, height: 14, border: `2px solid ${C.orange}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: C.orange, fontWeight: 600 }}>Matching en cours...</span>
            </div>
          )}

          {/* Upload zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            style={{ background: dragging ? C.orangeL : C.white, border: `2px dashed ${dragging ? C.orange : C.border}`, borderRadius: 14, padding: "28px 20px", textAlign: "center", marginBottom: 16, transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
          >
            <p style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>
              {loading ? "Importation en cours..." : "Glissez votre releve bancaire ici"}
            </p>
            <p style={{ fontSize: 12, color: C.muted, marginBottom: 18 }}>Format CSV · Date, Description, Amount</p>
            <label style={{ background: loading ? C.muted : C.orange, color: C.white, padding: "11px 24px", borderRadius: 12, fontSize: 13, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "inline-block", boxShadow: loading ? "none" : "0 2px 8px rgba(249,115,22,0.3)" }}>
              {loading ? "Chargement..." : "Importer mon releve CSV"}
              <input type="file" accept=".csv" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} disabled={loading} />
            </label>
          </div>

          {/* CSV supplementaire */}
          {total > 0 && (
            <label style={{ display: "block", width: "100%", textAlign: "center", background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "11px", fontSize: 13, fontWeight: 600, color: C.muted, cursor: "pointer", marginBottom: 16, boxSizing: "border-box" }}>
              + Importer un autre CSV
              <input type="file" accept=".csv" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
            </label>
          )}

          {/* Transactions */}
          {total > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                {total} transactions · {reconciled} rapprochees · {unmatched} en attente
              </p>
              {transactions.map((tx, idx) => {
                const inv = invoices.find(i => i.id === tx.matched_invoice_id);
                const isOk = ["reconciled","rapproche"].includes(tx.status);
                return (
                  <div key={tx.id} className="tx-row fu" style={{ animationDelay: `${idx * 0.02}s`, borderLeft: `3px solid ${isOk ? C.green : C.amber}` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>
                          {tx.description}
                        </p>
                        <p style={{ fontSize: 11, color: C.muted }}>{tx.date}</p>
                      </div>
                      <p style={{ fontSize: 15, fontWeight: 800, color: tx.amount > 0 ? C.green : C.text, marginLeft: 12, whiteSpace: "nowrap" }}>
                        {tx.amount > 0 ? "+" : ""}{fmt(tx.amount)}
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: isOk ? C.green : C.amber, background: isOk ? C.greenL : C.amberL, padding: "2px 8px", borderRadius: 99 }}>
                          {isOk ? "Rapproche" : "En attente"}
                        </span>
                        {inv && <span style={{ fontSize: 11, color: C.muted }}>{inv.vendor_name}</span>}
                        {tx.match_confidence && <span style={{ fontSize: 11, color: C.orange, fontWeight: 700 }}>{tx.match_confidence}%</span>}
                      </div>
                      {!isOk && (
                        <select onChange={e => handleManualMatch(tx.id, e.target.value)} defaultValue=""
                          style={{ fontSize: 11, border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 8px", color: C.text, background: C.white, maxWidth: 150, fontFamily: "inherit" }}>
                          <option value="">Associer...</option>
                          {invoices.map(i => (
                            <option key={i.id} value={i.id}>{i.vendor_name} · {i.total_amount}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
}