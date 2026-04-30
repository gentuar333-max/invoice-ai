"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { InvoiceData, SavedInvoice } from "@/lib/invoice-schema";
import { saveInvoiceToSupabase } from "@/lib/save-invoice";
import UpgradeModal from "@/components/UpgradeModal";
import { getUserPlan, PLAN_LIMITS } from "@/lib/plan";

const C = {
  bg:      "#f4f4f5",
  white:   "#ffffff",
  orange:  "#f97316",
  orangeL: "#fff7ed",
  orangeB: "#fed7aa",
  text:    "#18181b",
  muted:   "#71717a",
  border:  "#e4e4e7",
  red:     "#ef4444",
  redL:    "#fef2f2",
  green:   "#22c55e",
  greenL:  "#f0fdf4",
  amber:   "#f59e0b",
  amberL:  "#fffbeb",
};

function fmt(value: number | null, currency: string | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(value) + " €";
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: C.muted }}>{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", fontSize: 14, color: C.text, outline: "none", fontFamily: "inherit", transition: "border 0.15s" }}
        onFocus={e => (e.target.style.borderColor = C.orange)}
        onBlur={e => (e.target.style.borderColor = C.border)}
      />
    </div>
  );
}

function StepBar({ step }: { step: number }) {
  const steps = ["Import", "Analyse IA", "Verification", "Enregistre"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
      {steps.map((s, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: done || active ? C.orange : C.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: done || active ? C.white : C.muted, transition: "all 0.3s" }}>
                {done ? "✓" : n}
              </div>
              <span style={{ fontSize: 9, fontWeight: 600, color: active ? C.orange : done ? C.text : C.muted, whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: step > n ? C.orange : C.border, margin: "0 6px 14px", transition: "all 0.3s" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function Analyzing({ filename }: { filename: string }) {
  const msgs = ["Lecture du document...","Identification du fournisseur...","Extraction des montants...","Analyse de la TVA...","Verification...","Finalisation..."];
  const [idx, setIdx] = useState(0);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const m = setInterval(() => setIdx(p => p < msgs.length - 1 ? p + 1 : p), 700);
    const p = setInterval(() => setPct(p => p < 90 ? p + 3 : p), 150);
    return () => { clearInterval(m); clearInterval(p); };
  }, []);
  return (
    <div style={{ background: C.white, borderRadius: 16, padding: "40px 24px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ width: 48, height: 48, border: `3px solid ${C.border}`, borderTopColor: C.orange, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 20px" }} />
      <h3 style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>Analyse en cours</h3>
      <p style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>{filename}</p>
      <div style={{ background: C.bg, borderRadius: 99, height: 4, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ height: "100%", background: C.orange, borderRadius: 99, width: `${pct}%`, transition: "width 0.15s" }} />
      </div>
      <p style={{ fontSize: 13, color: C.orange, fontWeight: 600 }}>{msgs[idx]}</p>
    </div>
  );
}

export default function InvoicesPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState<InvoiceData | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState("");
  const [history, setHistory] = useState<SavedInvoice[]>([]);
  const [countdown, setCountdown] = useState(3);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [maxInvoices, setMaxInvoices] = useState(5);

  useEffect(() => {
    async function loadPlan() {
      const plan = await getUserPlan();
      setMaxInvoices(PLAN_LIMITS[plan].max_invoices);
    }
    loadPlan();
    try {
      const s = localStorage.getItem("invoices_v3");
      if (s) { const p = JSON.parse(s); setHistory(p); setInvoiceCount(p.length); }
    } catch {}
  }, []);

  useEffect(() => {
    if (saved) {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) { clearInterval(interval); setTimeout(() => router.push("/dashboard"), 0); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [saved, router]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragging(true); }, []);
  const handleDragLeave = useCallback(() => setDragging(false), []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) setFile(f);
  }, []);

  useEffect(() => { if (file && step === 1) handleExtract(); }, [file]);

  async function handleExtract() {
    if (!file) return;
    if (invoiceCount >= maxInvoices) { setShowUpgrade(true); return; }
    setLoading(true); setStep(2); setError("");
    setEdited(null); setSaved(false); setSaveError(""); setDuplicateWarning("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/invoices/extract", { method: "POST", body: formData });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setEdited(json.data); setStep(3);
      const dup = history.find(inv => inv.data.vendor_name?.toLowerCase() === json.data.vendor_name?.toLowerCase() && inv.data.total_amount === json.data.total_amount);
      if (dup) setDuplicateWarning(`Facture similaire detectee — ${dup.data.vendor_name}, ${dup.data.total_amount} €`);
    } catch (err: any) { setError(err.message || "Erreur inconnue."); setStep(1); }
    finally { setLoading(false); }
  }

  function updateField(field: keyof InvoiceData, value: any) {
    if (!edited) return;
    setEdited({ ...edited, [field]: value });
  }

  function updateLineItem(index: number, field: string, value: any) {
    if (!edited) return;
    const items = [...edited.line_items];
    items[index] = { ...items[index], [field]: value };
    setEdited({ ...edited, line_items: items });
  }

  async function handleSave() {
    if (!edited) return;
    setSaveError("");
    try {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();
      const { data: existing } = await supabase.from("invoices").select("id").eq("vendor_name", edited.vendor_name || "").eq("total_amount", edited.total_amount || 0);
      if (existing && existing.length > 0) { setSaveError("Facture en double — cette facture existe deja."); return; }
    } catch {}
    try { await saveInvoiceToSupabase(edited); }
    catch (err: any) { setSaveError("Erreur: " + err.message); return; }
    const entry: SavedInvoice = { id: Date.now().toString(), filename: file?.name || "manuel", processed_at: new Date().toISOString(), data: edited };
    const updated = [entry, ...history].slice(0, 100);
    setHistory(updated); setInvoiceCount(updated.length);
    localStorage.setItem("invoices_v3", JSON.stringify(updated));
    setSaved(true); setStep(4); setCountdown(3);
  }

  function handleReset() {
    setFile(null); setEdited(null); setSaved(false); setStep(1);
    setError(""); setSaveError(""); setDuplicateWarning(""); setCountdown(3);
  }

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.25s ease forwards; }
      `}</style>

      {showUpgrade && <UpgradeModal reason="invoices" onClose={() => { setShowUpgrade(false); setFile(null); }} />}

      <div style={{ background: C.bg, minHeight: "100vh", padding: "20px 16px 100px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>

          <StepBar step={step} />

          {/* Limite plan */}
          {invoiceCount >= maxInvoices - 1 && invoiceCount < maxInvoices && (
            <div style={{ background: C.amberL, border: `1px solid #fde68a`, borderRadius: 12, padding: "11px 14px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 13, color: C.amber, fontWeight: 600 }}>Il vous reste 1 facture sur votre plan.</p>
              <a href="/pricing" style={{ fontSize: 12, fontWeight: 700, color: C.amber, textDecoration: "none", background: "#fef3c7", padding: "5px 12px", borderRadius: 8 }}>Upgrader</a>
            </div>
          )}

          {/* ETAPE 1 — Upload */}
          {step === 1 && (
            <div className="fu">
              <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 4 }}>Nouvelle facture</h1>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Importez votre facture — l'IA extrait tout automatiquement</p>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ background: dragging ? C.orangeL : C.white, border: `2px dashed ${dragging ? C.orange : C.border}`, borderRadius: 16, padding: "48px 24px", textAlign: "center", transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
              >
                <div style={{ width: 48, height: 48, background: C.orangeL, borderRadius: 14, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Glissez votre facture ici</p>
                <p style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>PDF, JPG, PNG · 10 Mo maximum</p>
                <label style={{ background: C.orange, color: C.white, padding: "11px 28px", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 700, display: "inline-block", boxShadow: "0 2px 8px rgba(249,115,22,0.35)" }}>
                  Choisir un fichier
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>

              {error && (
                <div style={{ background: C.redL, border: `1px solid #fecaca`, borderRadius: 10, padding: "11px 14px", color: C.red, fontSize: 13, marginTop: 12 }}>
                  {error}
                </div>
              )}
            </div>
          )}

          {/* ETAPE 2 — Analyse */}
          {step === 2 && file && (
            <div className="fu">
              <Analyzing filename={file.name} />
            </div>
          )}

          {/* ETAPE 3 — Verification */}
          {step === 3 && edited && (
            <div className="fu">
              <h2 style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 4 }}>
                {edited.vendor_name || "Facture extraite"}
              </h2>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Verifiez et corrigez les donnees extraites</p>

              {duplicateWarning && (
                <div style={{ background: C.amberL, border: `1px solid #fde68a`, borderRadius: 10, padding: "11px 14px", color: C.amber, fontSize: 13, marginBottom: 12 }}>
                  {duplicateWarning}
                </div>
              )}

              {/* Card fournisseur + total */}
              <div style={{ background: C.orangeL, border: `1px solid ${C.orangeB}`, borderRadius: 14, padding: "14px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: C.orange, marginBottom: 2 }}>Fournisseur detecte</p>
                  <p style={{ fontSize: 17, fontWeight: 800, color: C.text }}>{edited.vendor_name || "Inconnu"}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: C.orange, marginBottom: 2 }}>Total TTC</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: C.orange }}>{fmt(edited.total_amount, edited.currency)}</p>
                </div>
              </div>

              {/* Champs editables */}
              <div style={{ background: C.white, borderRadius: 14, padding: "16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 12 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <Field label="Fournisseur" value={edited.vendor_name || ""} onChange={v => updateField("vendor_name", v)} />
                  <Field label="N Facture" value={edited.invoice_number || ""} onChange={v => updateField("invoice_number", v)} />
                  <Field label="Date facture" value={edited.invoice_date || ""} onChange={v => updateField("invoice_date", v)} type="date" />
                  <Field label="Date echeance" value={edited.due_date || ""} onChange={v => updateField("due_date", v)} type="date" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <Field label="Sous-total" value={String(edited.subtotal ?? "")} onChange={v => updateField("subtotal", parseFloat(v) || null)} type="number" />
                  <Field label="TVA" value={String(edited.tax_amount ?? "")} onChange={v => updateField("tax_amount", parseFloat(v) || null)} type="number" />
                  <Field label="Total TTC" value={String(edited.total_amount ?? "")} onChange={v => updateField("total_amount", parseFloat(v) || null)} type="number" />
                </div>
              </div>

              {/* Lignes */}
              {edited.line_items && edited.line_items.length > 0 && (
                <div style={{ background: C.white, borderRadius: 14, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 12 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 10 }}>{edited.line_items.length} ligne(s) detectee(s)</p>
                  {edited.line_items.map((item, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.border}` : "none", alignItems: "center" }}>
                      <input value={item.description || ""} onChange={e => updateLineItem(i, "description", e.target.value)}
                        style={{ background: "transparent", border: "none", outline: "none", color: C.text, fontSize: 13, fontFamily: "inherit" }} />
                      <input type="number" value={item.quantity ?? ""} onChange={e => updateLineItem(i, "quantity", parseFloat(e.target.value) || null)}
                        style={{ width: 50, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 6px", fontSize: 12, color: C.muted, textAlign: "center", fontFamily: "inherit" }} />
                      <input type="number" value={item.total ?? ""} onChange={e => updateLineItem(i, "total", parseFloat(e.target.value) || null)}
                        style={{ width: 80, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 6px", fontSize: 12, fontWeight: 700, color: C.text, textAlign: "right", fontFamily: "inherit" }} />
                    </div>
                  ))}
                </div>
              )}

              {/* Champs manquants */}
              {edited.missing_fields && edited.missing_fields.length > 0 && (
                <div style={{ background: C.amberL, border: `1px solid #fde68a`, borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
                  <p style={{ fontSize: 12, color: C.amber, fontWeight: 600 }}>Champs non detectes : {edited.missing_fields.join(", ")}</p>
                </div>
              )}

              {saveError && (
                <div style={{ background: C.redL, border: `1px solid #fecaca`, borderRadius: 10, padding: "10px 14px", color: C.red, fontSize: 13, marginBottom: 12 }}>
                  {saveError}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleSave}
                  style={{ flex: 1, background: C.orange, color: C.white, border: "none", padding: "13px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(249,115,22,0.35)" }}>
                  Confirmer et enregistrer
                </button>
                <button onClick={handleReset}
                  style={{ background: C.white, color: C.muted, border: `1.5px solid ${C.border}`, padding: "13px 20px", borderRadius: 12, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* ETAPE 4 — Succes */}
          {step === 4 && saved && (
            <div className="fu" style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 64, height: 64, background: C.greenL, border: `2px solid #bbf7d0`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 20px", color: C.green }}>
                ✓
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 6 }}>Facture enregistree</h2>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 4 }}>
                {edited?.vendor_name} · {fmt(edited?.total_amount ?? null, edited?.currency ?? null)}
              </p>
              <p style={{ color: C.orange, fontSize: 12, fontWeight: 700, marginBottom: 28 }}>
                Redirection dans {countdown}s...
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={() => router.push("/dashboard")}
                  style={{ background: C.orange, color: C.white, border: "none", padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Voir mes factures
                </button>
                <button onClick={handleReset}
                  style={{ background: C.white, color: C.muted, border: `1.5px solid ${C.border}`, padding: "12px 20px", borderRadius: 12, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                  Nouvelle facture
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}