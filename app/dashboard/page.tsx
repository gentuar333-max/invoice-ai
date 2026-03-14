"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

type Invoice = {
  id: string;
  supplier: string;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  subtotal: number;
  tva: number;
  total_ttc: number;
  created_at: string;
};

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setInvoices(data);
      const sum = data.reduce((acc, inv) => acc + (inv.total_ttc || 0), 0);
      setTotal(sum);
    }
    setLoading(false);
  }

  async function deleteInvoice(id: string) {
    const supabase = createClient();
    await supabase.from("invoices").delete().eq("id", id);
    setInvoices(invoices.filter((inv) => inv.id !== id));
  }

  function exportCSV() {
    if (!invoices.length) return;

    const headers = [
      "supplier", "invoice_number", "invoice_date",
      "due_date", "subtotal", "tva", "total_ttc", "created_at",
    ];

    const rows = invoices.map((inv) => [
      inv.supplier || "",
      inv.invoice_number || "",
      inv.invoice_date || "",
      inv.due_date || "",
      inv.subtotal ?? "",
      inv.tva ?? "",
      inv.total_ttc ?? "",
      inv.created_at,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `factures_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-gray-400 text-sm">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            {invoices.length} facture{invoices.length !== 1 ? "s" : ""} enregistrée{invoices.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/invoices"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            + Nouvelle facture
          </Link>
          {invoices.length > 0 && (
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Total factures
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {invoices.length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Montant total TTC
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {total.toFixed(2)} €
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            TVA totale
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {invoices.reduce((acc, inv) => acc + (inv.tva || 0), 0).toFixed(2)} €
          </p>
        </div>
      </div>

      {/* Table */}
      {invoices.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Aucune facture enregistrée
          </p>
          <Link
            href="/invoices"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Importer une facture
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs text-gray-400 uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Fournisseur</th>
                <th className="text-left px-4 py-3 font-medium">N° Facture</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-right px-4 py-3 font-medium">Sous-total</th>
                <th className="text-right px-4 py-3 font-medium">TVA</th>
                <th className="text-right px-4 py-3 font-medium">Total TTC</th>
                <th className="text-right px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, i) => (
                <tr
                  key={inv.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition ${
                    i === invoices.length - 1 ? "border-0" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {inv.supplier || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                    {inv.invoice_number || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {inv.invoice_date || "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {inv.subtotal ? `${inv.subtotal.toFixed(2)} €` : "—"}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-700">
                    {inv.tva ? `${inv.tva.toFixed(2)} €` : "—"}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    {inv.total_ttc ? `${inv.total_ttc.toFixed(2)} €` : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteInvoice(inv.id)}
                      className="text-gray-200 hover:text-red-400 text-lg leading-none transition"
                    >×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}