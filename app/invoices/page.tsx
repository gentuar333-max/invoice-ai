"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { InvoiceData, SavedInvoice } from "@/lib/invoice-schema";
import { saveInvoiceToSupabase } from "@/lib/save-invoice";
import UpgradeModal from "@/components/UpgradeModal";
import { getUserPlan, PLAN_LIMITS } from "@/lib/plan";

function fmt(value: number | null): string {
  if (value === null) return "—";
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2 }).format(value) + " €";
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: "0.68rem", fontWeight: 600, color: "#9A7A5A", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        style={{ background: "#F9F4EE", border: "1.5px solid #E3D5C4", borderRadius: 10, padding: "10px 12px", fontSize: 14, color: "#2C1A0E", outline: "none", fontFamily: "inherit", transition: "border 0.15s" }}
        onFocus={e => (e.target.style.borderColor = "#6B4A2A")}
        onBlur={e => (e.target.style.borderColor = "#E3D5C4")}
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
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: done || active ? "#6B4A2A" : "#E3D5C4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: done || active ? "#F9F4EE" : "#9A7A5A", transition: "all 0.3s" }}>
                {done ? "✓" : n}
              </div>
              <span style={{ fontSize: 9, fontWeight: 600, color: active ? "#6B4A2A" : done ? "#2C1A0E" : "#9A7A5A", whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: step > n ? "#6B4A2A" : "#E3D5C4", margin: "0 6px 14px", transition: "all 0.3s" }} />
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
    <div style={{ background: "#FDFAF7", borderRadius: 16, padding: "40px 24px", textAlign: "center", border: "1px solid #E3D5C4" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 48, height: 48, border: "3px solid #E3D5C4", borderTopColor: "#6B4A2A", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 20px" }} />
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 300, color: "#2C1A0E", marginBottom: 4 }}>Analyse en cours</h3>
      <p style={{ fontSize: 12, color: "#9A7A5A", marginBottom: 20 }}>{filename}</p>
      <div style={{ background: "#EFE7DC", borderRadius: 99, height: 4, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ height: "100%", background: "#6B4A2A", borderRadius: 99, width: `${pct}%`, transition: "width 0.15s" }} />
      </div>
      <p style={{ fontSize: 13, color: "#6B4A2A", fontWeight: 500 }}>{msgs[idx]}</p>
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu { animation: fadeUp 0.25s ease forwards; }
        .btn-cafe { background: #6B4A2A; color: #F9F4EE; border: none; padding: 13px; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; transition: background 0.2s; letter-spacing: 0.02em; }
        .btn-cafe:hover { background: #8D6840; }
        .btn-outline { background: #FDFAF7; color: #9A7A5A; border: 1.5px solid #E3D5C4; padding: 13px 20px; border-radius: 12px; font-size: 14px; cursor: pointer; font-family: inherit; transition: all 0.15s; }
        .btn-outline:hover { border-color: #6B4A2A; color: #6B4A2A; }
      `}</style>

      {showUpgrade && <UpgradeModal reason="invoices" onClose={() => { setShowUpgrade(false); setFile(null); }} />}

      <div style={{ background: "#F9F4EE", minHeight: "100vh", padding: "20px 16px 100px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>

          <StepBar step={step} />

          {invoiceCount >= maxInvoices - 1 && invoiceCount < maxInvoices && (
            <div style={{ background: "#F5EDD8", border: "1px solid #e8d5a8", borderRadius: 12, padding: "11px 14px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 13, color: "#B8923A", fontWeight: 600 }}>Il vous reste 1 facture sur votre plan.</p>
              <a href="/pricing" style={{ fontSize: 12, fontWeight: 700, color: "#B8923A", textDecoration: "none", background: "#efe7dc", padding: "5px 12px", borderRadius: 8 }}>Upgrader</a>
            </div>
          )}

          {/* ETAPE 1 — Upload */}
          {step === 1 && (
            <div className="fu">
              <div style={{ padding: "0 0 20px" }}>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, color: "#2C1A0E", marginBottom: 4 }}>Nouvelle facture</h1>
                <p style={{ fontSize: "0.78rem", color: "#9A7A5A", fontWeight: 300 }}>Importez votre facture — l'IA extrait tout automatiquement</p>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ background: dragging ? "#EFE7DC" : "#FDFAF7", border: `1.5px dashed ${dragging ? "#6B4A2A" : "#C4A882"}`, borderRadius: 12, padding: "40px 24px", textAlign: "center", transition: "all 0.2s", marginBottom: 16 }}
              >
                <div style={{ width: 44, height: 44, background: "#E3D5C4", borderRadius: 10, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B4A2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                <p style={{ fontSize: "0.92rem", fontWeight: 500, color: "#5C3D20", marginBottom: 5 }}>Deposer une facture PDF</p>
                <p style={{ fontSize: "0.75rem", color: "#9A7A5A", lineHeight: 1.5, marginBottom: 16 }}>PDF, JPG, PNG — 10 Mo maximum</p>
                <label style={{ background: "#6B4A2A", color: "#F9F4EE", padding: "10px 22px", borderRadius: 8, cursor: "pointer", fontSize: "0.82rem", fontWeight: 500, display: "inline-block", letterSpacing: "0.03em" }}>
                  Choisir un fichier
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={e => setFile(e.target.files?.[0] || null)} />
                </label>
              </div>

              {error && (
                <div style={{ background: "#F2E4E1", border: "1px solid #e8c4bb", borderRadius: 10, padding: "11px 14px", color: "#8A3A2A", fontSize: 13, marginBottom: 12 }}>
                  {error}
                </div>
              )}

              <div style={{ background: "#FDFAF7", borderRadius: 12, padding: "16px", border: "1px solid #E3D5C4" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9A7A5A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>En 30 secondes, l'IA extrait et structure</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[{label:"Fournisseur",desc:"Nom, SIRET, adresse"},{label:"Montants",desc:"HT, TVA, TTC"},{label:"Dates",desc:"Emission et echeance"},{label:"Lignes",desc:"Articles et quantites"}].map(item => (
                    <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6B4A2A", flexShrink: 0, marginTop: 5 }} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#2C1A0E", marginBottom: 1 }}>{item.label}</p>
                        <p style={{ fontSize: 11, color: "#9A7A5A" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #EFE7DC", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#5A7A4A" }} />
                  <p style={{ fontSize: 12, color: "#9A7A5A" }}>Detection automatique des doublons incluse</p>
                </div>
              </div>
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
              <div style={{ padding: "0 0 16px" }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 300, color: "#2C1A0E", marginBottom: 4 }}>
                  {edited.vendor_name || "Facture extraite"}
                </h2>
                <p style={{ fontSize: "0.78rem", color: "#9A7A5A" }}>Verifiez et corrigez les donnees extraites</p>
              </div>

              {duplicateWarning && (
                <div style={{ background: "#F5EDD8", border: "1px solid #e8d5a8", borderRadius: 10, padding: "11px 14px", color: "#B8923A", fontSize: 13, marginBottom: 12 }}>
                  {duplicateWarning}
                </div>
              )}

              <div style={{ background: "#6B4A2A", borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.65rem", fontWeight: 500, color: "#C4A882", marginBottom: 2, letterSpacing: "0.05em", textTransform: "uppercase" }}>Fournisseur</p>
                  <p style={{ fontSize: "1rem", fontWeight: 500, color: "#F9F4EE" }}>{edited.vendor_name || "Inconnu"}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 500, color: "#C4A882", marginBottom: 2, letterSpacing: "0.05em", textTransform: "uppercase" }}>Total TTC</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: "#F9F4EE" }}>{fmt(edited.total_amount)}</p>
                </div>
              </div>

              <div style={{ background: "#FDFAF7", borderRadius: 12, padding: "16px", border: "1px solid #E3D5C4", marginBottom: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 12 }}>
                  <Field label="Fournisseur" value={edited.vendor_name || ""} onChange={v => updateField("vendor_name", v)} />
                  <Field label="N Facture" value={edited.invoice_number || ""} onChange={v => updateField("invoice_number", v)} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Date facture" value={edited.invoice_date || ""} onChange={v => updateField("invoice_date", v)} type="date" />
                    <Field label="Date echeance" value={edited.due_date || ""} onChange={v => updateField("due_date", v)} type="date" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <Field label="Sous-total" value={String(edited.subtotal ?? "")} onChange={v => updateField("subtotal", parseFloat(v) || null)} type="number" />
                  <Field label="TVA" value={String(edited.tax_amount ?? "")} onChange={v => updateField("tax_amount", parseFloat(v) || null)} type="number" />
                  <Field label="Total TTC" value={String(edited.total_amount ?? "")} onChange={v => updateField("total_amount", parseFloat(v) || null)} type="number" />
                </div>
              </div>

              {edited.line_items && edited.line_items.length > 0 && (
                <div style={{ background: "#FDFAF7", borderRadius: 12, padding: "14px 16px", border: "1px solid #E3D5C4", marginBottom: 12 }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9A7A5A", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{edited.line_items.length} ligne(s) detectee(s)</p>
                  {edited.line_items.map((item, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, padding: "8px 0", borderTop: i > 0 ? "1px solid #EFE7DC" : "none", alignItems: "center" }}>
                      <input value={item.description || ""} onChange={e => updateLineItem(i, "description", e.target.value)}
                        style={{ background: "transparent", border: "none", outline: "none", color: "#2C1A0E", fontSize: 13, fontFamily: "inherit" }} />
                      <input type="number" value={item.quantity ?? ""} onChange={e => updateLineItem(i, "quantity", parseFloat(e.target.value) || null)}
                        style={{ width: 50, background: "#F9F4EE", border: "1px solid #E3D5C4", borderRadius: 6, padding: "4px 6px", fontSize: 12, color: "#9A7A5A", textAlign: "center", fontFamily: "inherit" }} />
                      <input type="number" value={item.total ?? ""} onChange={e => updateLineItem(i, "total", parseFloat(e.target.value) || null)}
                        style={{ width: 80, background: "#F9F4EE", border: "1px solid #E3D5C4", borderRadius: 6, padding: "4px 6px", fontSize: 12, fontWeight: 700, color: "#2C1A0E", textAlign: "right", fontFamily: "inherit" }} />
                    </div>
                  ))}
                </div>
              )}

              {edited.missing_fields && edited.missing_fields.length > 0 && (
                <div style={{ background: "#F5EDD8", border: "1px solid #e8d5a8", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
                  <p style={{ fontSize: 12, color: "#B8923A", fontWeight: 600, marginBottom: 4 }}>Certains champs n'ont pas pu etre detectes :</p>
                  <p style={{ fontSize: 11, color: "#B8923A" }}>{edited.missing_fields.map((f: string) => {
                    const labels: Record<string, string> = { vendor_name: "Fournisseur", invoice_number: "N facture", invoice_date: "Date facture", due_date: "Date echeance", subtotal: "Sous-total", tax_amount: "TVA", total_amount: "Total TTC", currency: "Devise", siret: "SIRET", category: "Categorie", line_items: "Lignes" };
                    return labels[f] || f;
                  }).join(", ")}</p>
                </div>
              )}

              {saveError && (
                <div style={{ background: "#F2E4E1", border: "1px solid #e8c4bb", borderRadius: 10, padding: "10px 14px", color: "#8A3A2A", fontSize: 13, marginBottom: 12 }}>
                  {saveError}
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={handleSave} className="btn-cafe" style={{ flex: 1 }}>Confirmer et enregistrer</button>
                <button onClick={handleReset} className="btn-outline">Annuler</button>
              </div>
            </div>
          )}

          {/* ETAPE 4 — Succes */}
          {step === 4 && saved && (
            <div className="fu" style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 64, height: 64, background: "#EAF0E6", border: "2px solid #c4d8be", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 20px", color: "#5A7A4A" }}>
                ✓
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#2C1A0E", marginBottom: 6 }}>Facture enregistree</h2>
              <p style={{ color: "#9A7A5A", fontSize: 13, marginBottom: 4 }}>
                {edited?.vendor_name} · {fmt(edited?.total_amount ?? null)}
              </p>
              <p style={{ color: "#6B4A2A", fontSize: 12, fontWeight: 500, marginBottom: 28 }}>
                Redirection dans {countdown}s...
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={() => router.push("/dashboard")} className="btn-cafe" style={{ padding: "12px 28px" }}>Voir mes factures</button>
                <button onClick={handleReset} className="btn-outline" style={{ padding: "12px 20px" }}>Nouvelle facture</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}