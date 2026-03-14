 import { createClient } from "@/lib/supabase";
import type { InvoiceData } from "@/lib/invoice-schema";

export async function saveInvoiceToSupabase(data: InvoiceData) {
  const supabase = createClient();
  const { error } = await supabase.from("invoices").insert({
    supplier: data.vendor_name,
    invoice_number: data.invoice_number,
    invoice_date: data.invoice_date,
    due_date: data.due_date,
    subtotal: data.subtotal,
    tva: data.tax_amount,
    total_ttc: data.total_amount,
    raw_json: data,
  });
  if (error) throw error;
}