"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import UpgradeModal from "@/components/UpgradeModal";

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
    setLoading(true); setError(""); setSuccess("");
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
      setLoading(false); setMatching(true);
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
    const a = document.createElement("a"); a.href = url; a.download = `rapprochement_${new Date().toISOString().split("T")[0]}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      {showUpgrade && <UpgradeModal reason="csv" onClose={() => setShowUpgrade(false)} />}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.25s ease forwards; }
        .tx-row { background: #FDFAF7; border-radius: 12px; padding: 12px 14px; border: 1px solid #E3D5C4; }
        .tx-row:hover { border-color: #C4A882; }
        .btn-cafe { background: #6B4A2A; color: #F9F4EE; border: none; padding: 11px 24px; border-radius: 10px; font-size: 0.82rem; font-weight: 500; cursor: pointer; font-family: inherit; letter-spacing: 0.03em; transition: background 0.2s; }
        .btn-cafe:hover { background: #8D6840; }
        .btn-cafe:disabled { background: #C4A882; cursor: not-allowed; }
      `}</style>

      <div style={{ background: "#F9F4EE", minHeight: "100vh", paddingBottom: 84, fontFamily: "'DM Sans', sans-serif" }}>

        {/* Section header */}
        <div style={{ padding: "22px 20px 16px" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, color: "#2C1A0E", lineHeight: 1.2 }}>
            Rapprochement bancaire
          </h1>
          <p style={{ fontSize: "0.78rem", color: "#9A7A5A", marginTop: 4, fontWeight: 300 }}>
            Import CSV · matching automatique IA
          </p>
        </div>

        {/* Stats */}
        {total > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: "0 20px", marginBottom: 20 }}>
            {[
              { label: "Total", value: total, color: "#2C1A0E", change: "" },
              { label: "Rapprochees", value: reconciled, color: "#5A7A4A", change: `${total > 0 ? Math.round(reconciled/total*100) : 0}%` },
              { label: "En attente", value: unmatched, color: "#B8923A", change: unmatched > 0 ? "Action requise" : "OK" },
            ].map(s => (
              <div key={s.label} style={{ background: "#FDFAF7", borderRadius: 12, padding: 16, border: "1px solid #E3D5C4" }}>
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#9A7A5A", marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: s.color, lineHeight: 1 }}>{s.value}</div>
                {s.change && <div style={{ fontSize: "0.7rem", marginTop: 4, color: s.color }}>{s.change}</div>}
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: "0 20px", maxWidth: 640, margin: "0 auto" }}>

          {/* Messages */}
          {error && (
            <div style={{ background: "#F2E4E1", border: "1px solid #e8c4bb", borderRadius: 10, padding: "11px 14px", color: "#8A3A2A", fontSize: 13, marginBottom: 12 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: "#EAF0E6", border: "1px solid #c4d8be", borderRadius: 10, padding: "11px 14px", color: "#5A7A4A", fontSize: 13, marginBottom: 12 }}>
              {success}
            </div>
          )}
          {matching && (
            <div style={{ background: "#F5EDD8", border: "1px solid #e8d5a8", borderRadius: 10, padding: "11px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 14, height: 14, border: "2px solid #B8923A", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#B8923A", fontWeight: 500 }}>Matching en cours...</span>
            </div>
          )}

          {/* Upload zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            style={{ background: dragging ? "#EFE7DC" : "#FDFAF7", border: `1.5px dashed ${dragging ? "#6B4A2A" : "#C4A882"}`, borderRadius: 12, padding: "28px 20px", textAlign: "center", marginBottom: 16, transition: "all 0.2s" }}
          >
            <div style={{ width: 44, height: 44, background: "#E3D5C4", borderRadius: 10, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B4A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <p style={{ fontSize: "0.92rem", fontWeight: 500, color: "#5C3D20", marginBottom: 5 }}>
              {loading ? "Importation en cours..." : "Glissez votre releve bancaire ici"}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#9A7A5A", lineHeight: 1.5, marginBottom: 16 }}>Format CSV · Date, Description, Amount</p>
            <label>
              <button className="btn-cafe" disabled={loading} onClick={() => (document.getElementById("csv-upload") as HTMLInputElement)?.click()}>
                {loading ? "Chargement..." : "Importer mon releve CSV"}
              </button>
              <input id="csv-upload" type="file" accept=".csv" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} disabled={loading} />
            </label>
          </div>

          {/* Export */}
          {total > 0 && (
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <label style={{ flex: 1, display: "block", textAlign: "center", background: "#FDFAF7", border: "1.5px solid #E3D5C4", borderRadius: 10, padding: "10px", fontSize: "0.82rem", fontWeight: 500, color: "#9A7A5A", cursor: "pointer" }}>
                + Importer un autre CSV
                <input type="file" accept=".csv" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />
              </label>
              <button onClick={exportReport} style={{ background: "#6B4A2A", color: "#F9F4EE", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.02em" }}>
                Exporter
              </button>
            </div>
          )}

          {/* Transactions */}
          {total > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9A7A5A", marginBottom: 4 }}>
                Resultats du matching
              </div>
              {transactions.map((tx, idx) => {
                const inv = invoices.find(i => i.id === tx.matched_invoice_id);
                const isOk = ["reconciled","rapproche"].includes(tx.status);
                return (
                  <div key={tx.id} className="tx-row fu" style={{ animationDelay: `${idx * 0.02}s` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: isOk ? "#5A7A4A" : tx.status === "unmatched" ? "#8A3A2A" : "#B8923A", flexShrink: 0 }} />
                          <p style={{ fontSize: "0.88rem", fontWeight: 500, color: "#2C1A0E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {tx.description}
                          </p>
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "#9A7A5A", marginLeft: 15 }}>{tx.date}</p>
                      </div>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 600, color: tx.amount > 0 ? "#5A7A4A" : "#2C1A0E", marginLeft: 12, whiteSpace: "nowrap" }}>
                        {tx.amount > 0 ? "+" : ""}{fmt(tx.amount)}
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: "0.62rem", fontWeight: 500, color: isOk ? "#5A7A4A" : "#B8923A", background: isOk ? "#EAF0E6" : "#F5EDD8", padding: "2px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                          {isOk ? "Rapproche" : "En attente"}
                        </span>
                        {inv && <span style={{ fontSize: "0.72rem", color: "#9A7A5A" }}>{inv.vendor_name}</span>}
                        {tx.match_confidence && <span style={{ fontSize: "0.72rem", color: "#6B4A2A", fontWeight: 500 }}>{tx.match_confidence}%</span>}
                      </div>
                      {!isOk && (
                        <select onChange={e => handleManualMatch(tx.id, e.target.value)} defaultValue=""
                          style={{ fontSize: "0.72rem", border: "1px solid #E3D5C4", borderRadius: 8, padding: "4px 8px", color: "#2C1A0E", background: "#F9F4EE", maxWidth: 150, fontFamily: "inherit" }}>
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

          {total === 0 && !loading && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#9A7A5A" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E3D5C4" strokeWidth="1" strokeLinecap="round" style={{ margin: "0 auto 12px", display: "block" }}>
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>Importez votre premier releve CSV pour commencer le rapprochement automatique</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}