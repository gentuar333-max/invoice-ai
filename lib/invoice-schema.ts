export type LineItem = {
  description: string;
  quantity: number | null;
  unit_price: number | null;
  total: number | null;
};

export type InvoiceData = {
  vendor_name: string | null;
  invoice_number: string | null;
  invoice_date: string | null;
  due_date: string | null;
  currency: string | null;
  subtotal: number | null;
  tax_amount: number | null;
  total_amount: number | null;
  line_items: LineItem[];
  missing_fields: string[];
};

export type SavedInvoice = {
  id: string;
  filename: string;
  processed_at: string;
  data: InvoiceData;
};