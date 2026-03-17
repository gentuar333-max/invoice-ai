import { createClient } from "@/lib/supabase";
import type { InvoiceData } from "@/lib/invoice-schema";

export async function saveInvoiceToSupabase(
  data: InvoiceData,
  filename?: string
) {
  const supabase = createClient();

  const payload = {
    vendor_name: data.vendor_name || null,
    invoice_number: data.invoice_number || null,
    invoice_date: data.invoice_date || null,
    due_date: data.due_date || null,
    currency: data.currency || "EUR",
    subtotal: data.subtotal || null,
    tax_amount: data.tax_amount || null,
    total_amount: data.total_amount || null,
    line_items: data.line_items || [],
    missing_fields: data.missing_fields || [],
    filename: filename || null,
    processed_at: new Date().toISOString(),
  };

  const { data: result, error } = await supabase
    .from("invoices")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", JSON.stringify(error, null, 2));
    throw new Error(error.message);
  }

  return result;
}