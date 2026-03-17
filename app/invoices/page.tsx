"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { InvoiceData, SavedInvoice } from "@/lib/invoice-schema";
import { saveInvoiceToSupabase } from "@/lib/save-invoice";

function formatAmount(value: number | null, currency: string | null): string {
  if (value === null) return "—";
  const symbol = currency === "EUR" ? "€" : (currency || "");
  return `${value.toFixed(2)} ${symbol}`.trim();
}

function EditableField({ label, value, onChange, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400 uppercase tracking-wider">{label}</label>
      <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400 bg-white" />
    </div>
  );
}

// Streaming text component
function StreamingText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span>
      {displayed}
      {!done && <span style={{ display: "inline-block", width: 2, height: "1em", background: "#6366f1", marginLeft: 2, animation: "blink 0.7s infinite", verticalAlign: "text-bottom" }} />}
    </span>
  );
}

// Step indicator
function StepIndicator({ step }: { step: number }) {
  const steps = [
    { n: 1, label: "Import" },
    { n: 2, label: "Analyse IA" },
    { n: 3, label: "Verification" },
    { n: 4, label: "Enregistre" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
      {steps.map((s, i) => (
        <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: step >= s.n ? "#6366f1" : step === s.n - 1 ? "#eef2ff" : "#f3f4f6",
              border: `2px solid ${step >= s.n ? "#6366f1" : step === s.n - 1 ? "#c7d2fe" : "#e5e7eb"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700,
              color: step >= s.n ? "white" : "#9ca3af",
              transition: "all 0.3s",
            }}>
              {step > s.n ? "✓" : s.n}
            </div>
            <span style={{ fontSize: 11, color: step >= s.n ? "#6366f1" : "#9ca3af", fontWeight: step >= s.n ? 600 : 400, whiteSpace: "nowrap" }}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ width: 60, height: 2, background: step > s.n ? "#6366f1" : "#e5e7eb", margin: "0 4px 18px", transition: "all 0.3s" }} />
          )}
        </div>
      ))}
    </div>
  );
}

// AI Loading animation
function AIAnalyzing({ filename }: { filename: string }) {
  const messages = [
    "Lecture du document...",
    "Identification du fournisseur...",
    "Extraction des montants...",
    "Analyse de la TVA...",
    "Verification des lignes...",
    "Finalisation...",
  ];
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 700);
    const progInterval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 3 : prev));
    }, 150);
    return () => { clearInterval(msgInterval); clearInterval(progInterval); };
  }, []);

  return (
    <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 20px" }}>🤖</div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Analyse en cours</h3>
      <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24, fontFamily: "monospace" }}>{filename}</p>

      <div style={{ background: "#f3f4f6", borderRadius: 8, height: 6, marginBottom: 16, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 8, width: `${progress}%`, transition: "width 0.15s ease" }} />
      </div>

      <p style={{ fontSize: 14, color: "#6366f1", fontWeight: 500, minHeight: 20 }}>
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

  // Auto-redirect après save
  useEffect(() => {
    if (saved) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            router.push("/dashboard");
            return 0;
          }
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
    if (dropped) { setFile(dropped); }
  }, []);

  // Auto-extract quand fichier sélectionné
  useEffect(() => {
    if (file && step === 1) {
      handleExtract();
    }
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
      `}</style>

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Step indicator */}
        <StepIndicator step={step} />

        {/* STEP 1 — Upload */}
        {step === 1 && (
          <div className="fade-in">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Nouvelle facture</h1>
              <p className="text-gray-400 text-sm">Importez votre facture — l'IA extrait tout automatiquement</p>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-16 text-center transition-all cursor-pointer ${dragging ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50"}`}
            >
              <div className="text-5xl mb-4">📄</div>
              <p className="font-semibold text-gray-700 mb-2 text-lg">Glissez votre facture ici</p>
              <p className="text-gray-400 text-sm mb-6">PDF, JPG, PNG · 10 Mo maximum</p>
              <label className="bg-indigo-600 text-white px-6 py-3 rounded-lg cursor-pointer text-sm font-semibold hover:bg-indigo-700 transition">
                Parcourir les fichiers
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </label>
              <p className="text-xs text-gray-300 mt-4">L'analyse démarre automatiquement après la sélection</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm mt-4">⚠️ {error}</div>
            )}
          </div>
        )}

        {/* STEP 2 — AI Analyzing */}
        {step === 2 && file && (
          <div className="fade-in">
            <AIAnalyzing filename={file.name} />
          </div>
        )}

        {/* STEP 3 — Review */}
        {step === 3 && edited && (
          <div className="fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                <StreamingText text={`Facture ${edited.vendor_name || "extraite"}`} speed={40} />
              </h2>
              <p className="text-gray-400 text-sm">Vérifiez les données extraites par l'IA</p>
            </div>

            {duplicateWarning && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-700 text-sm mb-4">⚠️ {duplicateWarning}</div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-4">
              <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-indigo-200 text-xs uppercase tracking-wider mb-1">Fournisseur détecté</p>
                  <h3 className="text-white text-xl font-bold">{edited.vendor_name || "Inconnu"}</h3>
                </div>
                <div className="text-right">
                  <p className="text-indigo-200 text-xs uppercase tracking-wider mb-1">Total TTC</p>
                  <p className="text-white text-2xl font-bold">{formatAmount(edited.total_amount, edited.currency)}</p>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <EditableField label="Fournisseur" value={edited.vendor_name || ""} onChange={(v) => updateField("vendor_name", v)} />
                  <EditableField label="N° Facture" value={edited.invoice_number || ""} onChange={(v) => updateField("invoice_number", v)} />
                  <EditableField label="Date facture" value={edited.invoice_date || ""} onChange={(v) => updateField("invoice_date", v)} type="date" />
                  <EditableField label="Date échéance" value={edited.due_date || ""} onChange={(v) => updateField("due_date", v)} type="date" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <EditableField label="Sous-total" value={String(edited.subtotal ?? "")} onChange={(v) => updateField("subtotal", parseFloat(v) || null)} type="number" />
                  <EditableField label="TVA" value={String(edited.tax_amount ?? "")} onChange={(v) => updateField("tax_amount", parseFloat(v) || null)} type="number" />
                  <EditableField label="Total TTC" value={String(edited.total_amount ?? "")} onChange={(v) => updateField("total_amount", parseFloat(v) || null)} type="number" />
                </div>

                {edited.line_items && edited.line_items.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Lignes · {edited.line_items.length} articles</p>
                    <div className="border border-gray-100 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr className="text-xs text-gray-400">
                            <th className="text-left px-3 py-2 font-medium">Description</th>
                            <th className="text-center px-3 py-2 font-medium w-16">Qté</th>
                            <th className="text-right px-3 py-2 font-medium w-24">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {edited.line_items.map((item, i) => (
                            <tr key={i} className="border-t border-gray-50">
                              <td className="px-3 py-2">
                                <input value={item.description || ""} onChange={(e) => updateLineItem(i, "description", e.target.value)} className="w-full text-sm text-gray-700 border-0 focus:outline-none bg-transparent" />
                              </td>
                              <td className="px-3 py-2 text-center">
                                <input type="number" value={item.quantity ?? ""} onChange={(e) => updateLineItem(i, "quantity", parseFloat(e.target.value) || null)} className="w-full text-sm text-center text-gray-500 border-0 focus:outline-none bg-transparent" />
                              </td>
                              <td className="px-3 py-2 text-right">
                                <input type="number" value={item.total ?? ""} onChange={(e) => updateLineItem(i, "total", parseFloat(e.target.value) || null)} className={`w-full text-sm text-right border-0 focus:outline-none bg-transparent font-medium ${item.total !== null && item.total < 0 ? "text-red-500" : "text-gray-900"}`} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {edited.missing_fields && edited.missing_fields.length > 0 && (
                  <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
                    <p className="text-xs text-amber-600 font-medium mb-1">Champs non détectés :</p>
                    <p className="text-xs text-amber-500">{edited.missing_fields.join(", ")}</p>
                  </div>
                )}

                {saveError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">⚠️ {saveError}</div>
                )}

                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} className="flex-1 text-white font-semibold py-3 rounded-lg text-sm transition" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
                    Confirmer et enregistrer
                  </button>
                  <button onClick={handleReset} className="border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium py-3 px-5 rounded-lg text-sm transition">
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — Saved */}
        {step === 4 && saved && (
          <div className="fade-in text-center">
            <div style={{ width: 72, height: 72, background: "linear-gradient(135deg, #10b981, #059669)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 20px" }}>✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Facture enregistrée</h2>
            <p className="text-gray-500 text-sm mb-2">
              {edited?.vendor_name} · {formatAmount(edited?.total_amount ?? null, edited?.currency ?? null)}
            </p>
            <p className="text-indigo-500 text-sm font-medium mb-8">
              Redirection vers Mes factures dans {countdown}s...
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => router.push("/dashboard")} className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
                Voir mes factures
              </button>
              <button onClick={handleReset} className="border border-gray-200 text-gray-500 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Nouvelle facture
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}