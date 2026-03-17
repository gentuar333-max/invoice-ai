import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

function normalize(str: string): string {
  return (str || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function dateDiffDays(d1: string, d2: string): number {
  try {
    const a = new Date(d1).getTime();
    const b = new Date(d2).getTime();
    if (isNaN(a) || isNaN(b)) return 999;
    return Math.abs((a - b) / (1000 * 60 * 60 * 24));
  } catch { return 999; }
}

function amountMatch(txAmount: number, invoiceTotal: number): boolean {
  return Math.abs(Math.abs(txAmount) - Math.abs(invoiceTotal)) < 0.5;
}

function nameMatch(description: string, vendor: string): boolean {
  const desc = normalize(description);
  const ven = normalize(vendor);
  if (!desc || !ven) return false;
  if (desc.includes(ven) || ven.includes(desc)) return true;
  const words = ven.split(" ").filter((w) => w.length > 2);
  if (words.length === 0) return false;
  const matched = words.filter((w) => desc.includes(w));
  return matched.length / words.length >= 0.5;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    const { data: transactions, error: txError } = await supabase
      .from("bank_transactions")
      .select("*")
      .eq("status", "unmatched");

    if (txError) throw new Error("Erreur transactions: " + txError.message);

    if (!transactions || transactions.length === 0) {
      return NextResponse.json({
        success: true,
        matched: 0,
        message: "Aucune transaction non reconciliee",
      });
    }

    const { data: invoices, error: invError } = await supabase
      .from("invoices")
      .select("id, vendor_name, total_amount, invoice_date");

    if (invError) throw new Error("Erreur invoices: " + invError.message);

    if (!invoices || invoices.length === 0) {
      return NextResponse.json({
        success: true,
        matched: 0,
        message: "Aucune facture trouvee",
      });
    }

    let reconciled = 0;

    for (const tx of transactions) {
      let bestInvoice: any = null;
      let bestScore = 0;

      for (const inv of invoices) {
        if (!amountMatch(tx.amount, inv.total_amount)) continue;

        let score = 50;
        if (nameMatch(tx.description, inv.vendor_name)) score += 40;
        const days = dateDiffDays(tx.date, inv.invoice_date);
        if (days <= 1) score += 10;
        else if (days <= 7) score += 5;
        else if (days <= 30) score += 2;

        if (score > bestScore) {
          bestScore = score;
          bestInvoice = inv;
        }
      }

      if (bestInvoice && bestScore >= 50) {
        const { error: updateError } = await supabase
          .from("bank_transactions")
          .update({
            status: "reconciled",
            matched_invoice_id: bestInvoice.id,
            match_confidence: Math.min(bestScore, 100),
          })
          .eq("id", tx.id);

        if (!updateError) reconciled++;
        else console.error("Update error:", updateError.message);
      }
    }

    const { data: allTx } = await supabase
      .from("bank_transactions")
      .select("status");

    return NextResponse.json({
      success: true,
      matched: reconciled,
      counts: {
        total: allTx?.length || 0,
        reconciled: allTx?.filter((t: any) => t.status === "reconciled").length || 0,
        unmatched: allTx?.filter((t: any) => t.status === "unmatched").length || 0,
      },
    });

  } catch (error: any) {
    console.error("Reconciliation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}