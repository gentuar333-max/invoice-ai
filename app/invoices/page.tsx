"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { InvoiceData, SavedInvoice } from "@/lib/invoice-schema";
import { saveInvoiceToSupabase } from "@/lib/save-invoice";

const BG = "#131f2e";
const CARD = "#1e2d40";
const BORDER = "#2e4058";
const GOLD = "#e8b84b";
const TEXT = "#ffffff";
const MUTED = "#a8c4d8";

function formatAmount(value: number | null, currency: string | null): string {
  if (value === null) return "—";
  const symbol = currency === "EUR" ? "€" : (currency || "");
  return `${value.toFixed(2)} ${symbol}`.trim();
}

function EditableField({ label, value, onChange, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 10, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase" }}>{label}</label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{ background: "#0f1923", border: `1px solid ${BORDER}`, borderRadius: 3, padding: "10px 12px", fontSize: 13, color: TEXT, outline: "none", fontFamily: "inherit" }}
      />
    </div>
  );
}

function StreamingText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else { setDone(true); clearInterval(interval); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      {!done && <span style={{ display: "inline-block", width: 2, height: "1em", background: GOLD, marginLeft: 2, animation: "blink 0.7s infinite", verticalAlign: "text-bottom" }} />}
    </span>
  );
}

function StepIndicator({ step }: { step: number }) {
  const steps = [
    { n: 1, label: "IMPORT" },
    { n: 2, label: "ANALYSE IA" },
    { n: 3, label: "VERIFICATION" },
    { n: 4, label: "ENREGISTRE" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {steps.map((s, i) => (
        <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 30, height: 30, borderRadius: 3, background: step >= s.n ? GOLD : BORDER, border: `1px solid ${step >= s.n ? GOLD : BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: step >= s.n ? "#0f1923" : MUTED, transition: "all 0.3s" }}>
              {step > s.n ? "✓" : s.n}
            </div>
            <span style={{ fontSize: 9, color: step >= s.n ? GOLD : MUTED, fontWeight: 700, letterSpacing: 1.5, whiteSpace: "nowrap" }}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 55, height: 2, background: step > s.n ? GOLD : BORDER, margin: "0 4px 18px", transition: "all 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function AIAnalyzing({ filename }: { filename: string }) {
  const messages = ["Lecture du document...","Identification du fournisseur...","Extraction des montants...","Analyse de la TVA...","Verification des lignes...","Finalisation..."];
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const msgInterval = setInterval(() => setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev)), 700);
    const progInterval = setInterval(() => setProgress((prev) => (prev < 90 ? prev + 3 : prev)), 150);
    return () => { clearInterval(msgInterval); clearInterval(progInterval); };
  }, []);
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, padding: "48px 32px", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, background: `${GOLD}20`, border: `2px solid ${GOLD}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 20px" }}>🤖</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>ANALYSE EN COURS</h3>
      <p style={{ fontSize: 11, color: MUTED, marginBottom: 24, fontFamily: "monospace", letterSpacing: 1 }}>{filename}</p>
      <div style={{ background: "#0f1923", borderRadius: 3, height: 4, marginBottom: 16, overflow: "hidden" }}>
        <div style={{ height: "100%", background: GOLD, borderRadius: 3, width: `${progress}%`, transition: "width 0.15s ease" }} />
      </div>
      <p style={{ fontSize: 13, color: GOLD, fontWeight: 500, minHeight: 20, letterSpacing: 0.5 }}>
        <StreamingText text={messages[msgIndex]} speed={25} />
      </p>
    </div>
  );
}

export default function InvoicesPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState<InvoiceData | null>(null);
  const [edited, setEdited] = useState<InvoiceData | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState("");
  const [history, setHistory] = useState<SavedInvoice[]>([]);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    try {
      const s = localStorage.getItem("invoices_v3");
      if (s) setHistory(JSON.parse(s));
    } catch {}
  }, []);

  useEffect(() => {
    if (saved) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) { clearInterval(interval); router.push("/dashboard"); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [saved, router]);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragging(true); }, []);
  const handleDragLeave = useCallback(() => setDragging(false), []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  useEffect(() => {
    if (file && step === 1) handleExtract();
  }, [file]);

  async function handleExtract() {
    if (!file) return;
    setLoading(true);
    setStep(2);
    setError("");
    setExtracted(null);
    setEdited(null);
    setSaved(false);
    setSaveError("");
    setDuplicateWarning("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/invoices/extract", { method: "POST", body: formData });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setExtracted(json.data);
      setEdited(json.data);
      setStep(3);
      checkDuplicate(json.data);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
      setStep(1);
    } finally {
      setLoading(false);
    }
  }

  function checkDuplicate(data: InvoiceData) {
    const duplicate = history.find((inv) => {
      const sameVendor = inv.data.vendor_name?.toLowerCase() === data.vendor_name?.toLowerCase();
      const sameTotal = inv.data.total_amount === data.total_amount;
      const sameDate = inv.data.invoice_date === data.invoice_date;
      return sameVendor && sameTotal && sameDate;
    });
    if (duplicate) setDuplicateWarning(`Facture similaire — ${duplicate.data.vendor_name}, ${duplicate.data.invoice_date}`);
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
      await saveInvoiceToSupabase(edited);
    } catch (err: any) {
      setSaveError("Erreur: " + err.message);
      return;
    }
    const newEntry: SavedInvoice = {
      id: Date.now().toString(),
      filename: file?.name || "manuel",
      processed_at: new Date().toISOString(),
      data: edited,
    };
    const updated = [newEntry, ...history].slice(0, 100);
    setHistory(updated);
    localStorage.setItem("invoices_v3", JSON.stringify(updated));
    setSaved(true);
    setStep(4);
    setCountdown(3);
  }

  function handleReset() {
    setFile(null);
    setExtracted(null);
    setEdited(null);
    setSaved(false);
    setStep(1);
    setError("");
    setSaveError("");
    setDuplicateWarning("");
    setCountdown(3);
  }

  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .fade-in { animation: fadeIn 0.3s ease forwards; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.7); }
        input::placeholder { color: #4a6a85; }
        input:focus { border-color: #e8b84b !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: BG, padding: "28px 20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          <StepIndicator step={step} />

          {/* STEP 1 */}
          {step === 1 && (
            <div className="fade-in">
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 20, fontWeight: 600, color: TEXT, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>NOUVELLE FACTURE</h1>
                <p style={{ color: MUTED, fontSize: 12, letterSpacing: 1 }}>IMPORTEZ VOTRE FACTURE — L'IA EXTRAIT TOUT AUTOMATIQUEMENT</p>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ border: `2px dashed ${dragging ? GOLD : BORDER}`, borderRadius: 4, padding: "56px 32px", textAlign: "center", background: dragging ? `${GOLD}08` : CARD, transition: "all 0.2s", cursor: "pointer" }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>📄</div>
                <p style={{ fontWeight: 600, color: TEXT, marginBottom: 6, fontSize: 15, letterSpacing: 0.5 }}>Glissez votre facture ici</p>
                <p style={{ color: MUTED, fontSize: 12, marginBottom: 24, letterSpacing: 1 }}>PDF, JPG, PNG · 10 Mo maximum</p>
                <label style={{ background: GOLD, color: "#0f1923", padding: "10px 28px", borderRadius: 3, cursor: "pointer", fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
                  PARCOURIR LES FICHIERS
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display: "none" }} onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>
                <p style={{ fontSize: 11, color: MUTED, marginTop: 16, letterSpacing: 1 }}>L'ANALYSE DEMARRE AUTOMATIQUEMENT</p>
              </div>

              {error && (
                <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 3, padding: "12px 16px", color: "#ef4444", fontSize: 12, marginTop: 14 }}>⚠ {error}</div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && file && (
            <div className="fade-in">
              <AIAnalyzing filename={file.name} />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && edited && (
            <div className="fade-in">
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 4, letterSpacing: 0.5 }}>
                  <StreamingText text={`FACTURE ${(edited.vendor_name || "EXTRAITE").toUpperCase()}`} speed={40} />
                </h2>
                <p style={{ color: MUTED, fontSize: 12, letterSpacing: 1 }}>VERIFIEZ LES DONNEES EXTRAITES PAR L'IA</p>
              </div>

              {duplicateWarning && (
                <div style={{ background: "#f59e0b15", border: "1px solid #f59e0b40", borderRadius: 3, padding: "12px 16px", color: "#f59e0b", fontSize: 12, marginBottom: 14 }}>⚠ {duplicateWarning}</div>
              )}

              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 4, overflow: "hidden", marginBottom: 14 }}>
                <div style={{ background: `${GOLD}15`, borderBottom: `1px solid ${GOLD}30`, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ fontSize: 10, color: GOLD, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>FOURNISSEUR DETECTE</p>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: TEXT }}>{edited.vendor_name || "INCONNU"}</h3>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: 10, color: GOLD, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>TOTAL TTC</p>
                    <p style={{ fontSize: 22, fontWeight: 800, color: GOLD }}>{formatAmount(edited.total_amount, edited.currency)}</p>
                  </div>
                </div>

                <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <EditableField label="Fournisseur" value={edited.vendor_name || ""} onChange={(v) => updateField("vendor_name", v)} />
                    <EditableField label="N Facture" value={edited.invoice_number || ""} onChange={(v) => updateField("invoice_number", v)} />
                    <EditableField label="Date facture" value={edited.invoice_date || ""} onChange={(v) => updateField("invoice_date", v)} type="date" />
                    <EditableField label="Date echeance" value={edited.due_date || ""} onChange={(v) => updateField("due_date", v)} type="date" />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                    <EditableField label="Sous-total" value={String(edited.subtotal ?? "")} onChange={(v) => updateField("subtotal", parseFloat(v) || null)} type="number" />
                    <EditableField label="TVA" value={String(edited.tax_amount ?? "")} onChange={(v) => updateField("tax_amount", parseFloat(v) || null)} type="number" />
                    <EditableField label="Total TTC" value={String(edited.total_amount ?? "")} onChange={(v) => updateField("total_amount", parseFloat(v) || null)} type="number" />
                  </div>

                  {edited.line_items && edited.line_items.length > 0 && (
                    <div>
                      <p style={{ fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>LIGNES · {edited.line_items.length} ARTICLES</p>
                      <div style={{ border: `1px solid ${BORDER}`, borderRadius: 3, overflow: "hidden" }}>
                        <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                          <thead style={{ background: "#0f1923" }}>
                            <tr>
                              {["DESCRIPTION","QTE","TOTAL"].map((h) => (
                                <th key={h} style={{ textAlign: h === "TOTAL" ? "right" : h === "QTE" ? "center" : "left", padding: "8px 12px", fontSize: 10, color: MUTED, letterSpacing: 1.5, fontWeight: 600 }}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {edited.line_items.map((item, i) => (
                              <tr key={i} style={{ borderTop: `1px solid ${BORDER}` }}>
                                <td style={{ padding: "8px 12px" }}>
                                  <input value={item.description || ""} onChange={(e) => updateLineItem(i, "description", e.target.value)} style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: TEXT, fontSize: 12 }} />
                                </td>
                                <td style={{ padding: "8px 12px", textAlign: "center" }}>
                                  <input type="number" value={item.quantity ?? ""} onChange={(e) => updateLineItem(i, "quantity", parseFloat(e.target.value) || null)} style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: MUTED, fontSize: 12, textAlign: "center" }} />
                                </td>
                                <td style={{ padding: "8px 12px", textAlign: "right" }}>
                                  <input type="number" value={item.total ?? ""} onChange={(e) => updateLineItem(i, "total", parseFloat(e.target.value) || null)} style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: item.total !== null && item.total < 0 ? "#ef4444" : TEXT, fontSize: 12, textAlign: "right", fontWeight: 600 }} />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {edited.missing_fields && edited.missing_fields.length > 0 && (
                    <div style={{ background: "#f59e0b10", border: "1px solid #f59e0b30", borderRadius: 3, padding: "10px 14px" }}>
                      <p style={{ fontSize: 10, color: "#f59e0b", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>CHAMPS NON DETECTES</p>
                      <p style={{ fontSize: 11, color: MUTED }}>{edited.missing_fields.join(", ")}</p>
                    </div>
                  )}

                  {saveError && (
                    <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 3, padding: "10px 14px", color: "#ef4444", fontSize: 12 }}>⚠ {saveError}</div>
                  )}

                  <div style={{ display: "flex", gap: 10, paddingTop: 6 }}>
                    <button onClick={handleSave} style={{ flex: 1, background: GOLD, color: "#0f1923", border: "none", padding: "12px", borderRadius: 3, fontSize: 11, fontWeight: 800, cursor: "pointer", letterSpacing: 2, textTransform: "uppercase" }}>
                      CONFIRMER ET ENREGISTRER
                    </button>
                    <button onClick={handleReset} style={{ background: "transparent", color: MUTED, border: `1px solid ${BORDER}`, padding: "12px 20px", borderRadius: 3, fontSize: 11, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}>
                      ANNULER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && saved && (
            <div className="fade-in" style={{ textAlign: "center" }}>
              <div style={{ width: 64, height: 64, background: `${GOLD}20`, border: `2px solid ${GOLD}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 20px" }}>✓</div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>FACTURE ENREGISTREE</h2>
              <p style={{ color: MUTED, fontSize: 13, marginBottom: 6 }}>
                {edited?.vendor_name} · {formatAmount(edited?.total_amount ?? null, edited?.currency ?? null)}
              </p>
              <p style={{ color: GOLD, fontSize: 12, fontWeight: 600, marginBottom: 28, letterSpacing: 1 }}>
                REDIRECTION DANS {countdown}S...
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={() => router.push("/dashboard")} style={{ background: GOLD, color: "#0f1923", border: "none", padding: "11px 28px", borderRadius: 3, fontSize: 11, fontWeight: 800, cursor: "pointer", letterSpacing: 2, textTransform: "uppercase" }}>
                  VOIR MES FACTURES
                </button>
                <button onClick={handleReset} style={{ background: "transparent", color: MUTED, border: `1px solid ${BORDER}`, padding: "11px 20px", borderRadius: 3, fontSize: 11, cursor: "pointer", letterSpacing: 1.5, textTransform: "uppercase" }}>
                  NOUVELLE FACTURE
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}