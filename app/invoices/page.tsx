 "use client";
import { useState, useCallback, useEffect } from "react";
import type { InvoiceData, SavedInvoice } from "@/lib/invoice-schema";
import { saveInvoiceToSupabase } from "@/lib/save-invoice";

function formatAmount(value: number | null, currency: string | null): string {
  if (value === null) return "—";
  const symbol = currency === "EUR" ? "€" : (currency || "");
  return `${value.toFixed(2)} ${symbol}`.trim();
}

function EditableField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-blue-400 bg-white"
      />
    </div>
  );
}

export default function InvoicesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extracted, setExtracted] = useState<InvoiceData | null>(null);
  const [edited, setEdited] = useState<InvoiceData | null>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState("");
  const [history, setHistory] = useState<SavedInvoice[]>([]);

  useEffect(() => {
    try {
      const s = localStorage.getItem("invoices_v3");
      if (s) setHistory(JSON.parse(s));
    } catch {}
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  }, []);

  async function handleExtract() {
    if (!file) return;
    setLoading(true);
    setError("");
    setExtracted(null);
    setEdited(null);
    setSaved(false);
    setDuplicateWarning("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/invoices/extract", { method: "POST", body: formData });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      setExtracted(json.data);
      setEdited(json.data);
      checkDuplicate(json.data);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  function checkDuplicate(data: InvoiceData) {
    const duplicate = history.find((inv) => {
      const sameVendor = inv.data.vendor_name?.toLowerCase() === data.vendor_name?.toLowerCase();
      const sameNumber = data.invoice_number && inv.data.invoice_number === data.invoice_number;
      const sameTotal = inv.data.total_amount === data.total_amount;
      const sameDate = inv.data.invoice_date === data.invoice_date;
      return sameVendor && (sameNumber || (sameTotal && sameDate));
    });
    if (duplicate) {
      setDuplicateWarning(`Facture similaire déjà enregistrée — ${duplicate.data.vendor_name}, ${duplicate.data.invoice_date}, ${duplicate.data.total_amount}€`);
    }
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
    try {
      await saveInvoiceToSupabase(edited);
    } catch (err) {
      console.error("Erreur Supabase:", err);
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
  }

  function handleExportCSV() {
    if (!history.length) return;
    const headers = ["vendor_name","invoice_number","invoice_date","due_date","currency","subtotal","tax_amount","total_amount","filename","processed_at"];
    const rows = history.map((inv) => [inv.data.vendor_name||"",inv.data.invoice_number||"",inv.data.invoice_date||"",inv.data.due_date||"",inv.data.currency||"EUR",inv.data.subtotal??"",inv.data.tax_amount??"",inv.data.total_amount??"",inv.filename,inv.processed_at]);
    const csv = [headers,...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `factures_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleReset() {
    setFile(null);
    setExtracted(null);
    setEdited(null);
    setSaved(false);
    setError("");
    setDuplicateWarning("");
  }

  function deleteHistory(id: string) {
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("invoices_v3", JSON.stringify(updated));
  }

  function openFromHistory(inv: SavedInvoice) {
    setEdited(inv.data);
    setExtracted(inv.data);
    setSaved(false);
    setFile(null);
    setDuplicateWarning("");
  }return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Invoice Agent 🤖</h1>
          <p className="text-gray-500 text-sm">Importez, vérifiez et enregistrez vos factures</p>
        </div>
        {history.length > 0 && (
          <button onClick={handleExportCSV} className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
            Export CSV
          </button>
        )}
      </div>

      {!extracted && (
        <>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all mb-4 ${dragging ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
          >
            <div className="text-4xl mb-3">📄</div>
            <p className="font-semibold text-gray-700 mb-1">Glissez votre facture ici</p>
            <p className="text-gray-400 text-xs mb-5">PDF, JPG, PNG · 10 Mo maximum</p>
            <label className="bg-white border border-gray-300 px-4 py-2 rounded-lg cursor-pointer text-sm text-gray-600 hover:bg-gray-50 transition">
              Parcourir les fichiers
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>

          {file && (
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-3">
              <span>📎</span>
              <span className="flex-1 text-sm font-medium text-blue-800 truncate">{file.name}</span>
              <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(0)} Ko</span>
              <button onClick={() => setFile(null)} className="text-gray-300 hover:text-gray-500 text-lg">×</button>
            </div>
          )}

          {file && (
            <button onClick={handleExtract} disabled={loading} className={`w-full py-3 rounded-lg text-white font-semibold text-sm transition mb-4 ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
              {loading ? "⏳ Extraction en cours..." : "🤖 Extraire les données"}
            </button>
          )}
        </>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm mb-4">⚠️ {error}</div>
      )}

      {duplicateWarning && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-700 text-sm mb-4">⚠️ {duplicateWarning}</div>
      )}

      {edited && !saved && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
          <div className="bg-blue-600 px-6 py-4 flex items-start justify-between">
            <div>
              <p className="text-blue-200 text-xs uppercase tracking-wider mb-1">Vérifiez et corrigez avant d'enregistrer</p>
              <h2 className="text-white text-xl font-bold">{edited.vendor_name || "Fournisseur inconnu"}</h2>
            </div>
            <button onClick={handleReset} className="text-blue-200 hover:text-white text-sm border border-blue-400 hover:border-white px-3 py-1 rounded-lg transition">
              Retour
            </button>
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
                <p className="text-xs text-amber-600 font-medium mb-1">⚠️ Champs non trouvés :</p>
                <p className="text-xs text-amber-500">{edited.missing_fields.join(", ")}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-sm transition">
                Confirmer et enregistrer
              </button>
              <button onClick={handleReset} className="border border-gray-200 text-gray-500 hover:bg-gray-50 font-medium py-3 px-5 rounded-lg text-sm transition">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}{saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-center">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-bold text-green-800 mb-1">Facture enregistrée</h3>
          <p className="text-green-600 text-sm mb-4">
            {edited?.vendor_name} · {formatAmount(edited?.total_amount ?? null, edited?.currency ?? null)}
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={handleReset} className="bg-white border border-green-200 text-green-700 px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition">
              Nouvelle facture
            </button>
            <a href="/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              Voir le dashboard
            </a>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Historique · {history.length}
          </h2>
          {history.map((inv) => (
            <div
              key={inv.id}
              onClick={() => openFromHistory(inv)}
              className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 mb-2 hover:border-blue-300 hover:bg-blue-50 transition cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  {inv.data.vendor_name || "Inconnu"}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {inv.filename} · {inv.data.invoice_date || "—"}
                </p>
              </div>
              <span className="text-sm font-bold text-gray-700">
                {formatAmount(inv.data.total_amount, inv.data.currency)}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteHistory(inv.id); }}
                className="text-gray-200 hover:text-gray-400 text-lg leading-none"
              >×</button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}