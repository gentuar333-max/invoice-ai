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

function ruleBased(tx: any, inv: any): number {
  let score = 0;
  if (amountMatch(tx.amount, inv.total_amount)) score += 50;
  if (nameMatch(tx.description, inv.vendor_name)) score += 40;
  const days = dateDiffDays(tx.date, inv.invoice_date);
  if (days <= 1) score += 10;
  else if (days <= 7) score += 5;
  else if (days <= 30) score += 2;
  return score;
}

async function geminiAnalyze(tx: any, inv: any): Promise<{ match: boolean; confidence: number; reason: string }> {
  try {
    const prompt = `Tu es un expert comptable. Analyse si cette transaction bancaire correspond à cette facture.

Transaction bancaire:
- Date: ${tx.date}
- Description: ${tx.description}
- Montant: ${tx.amount} EUR

Facture:
- Fournisseur: ${inv.vendor_name}
- Numero: ${inv.invoice_number || "N/A"}
- Date: ${inv.invoice_date}
- Montant total: ${inv.total_amount} EUR

Reponds UNIQUEMENT en JSON valide sans markdown:
{"match": true/false, "confidence": 0-100, "reason": "explication courte"}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 200 },
      }),
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return { match: parsed.match, confidence: parsed.confidence, reason: parsed.reason };
  } catch {
    return { match: false, confidence: 0, reason: "Erreur analyse AI" };
  }
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
      return NextResponse.json({ success: true, matched: 0, message: "Aucune transaction a traiter" });
    }

    const { data: invoices, error: invError } = await supabase
      .from("invoices")
      .select("id, vendor_name, total_amount, invoice_date, invoice_number");

    if (invError) throw new Error("Erreur invoices: " + invError.message);
    if (!invoices || invoices.length === 0) {
      return NextResponse.json({ success: true, matched: 0, message: "Aucune facture trouvee" });
    }

    let processed = 0;

    for (const tx of transactions) {
      let bestInvoice: any = null;
      let bestScore = 0;

      // ETAPE 1 — Rule-based
      for (const inv of invoices) {
        const score = ruleBased(tx, inv);
        if (score > bestScore) {
          bestScore = score;
          bestInvoice = inv;
        }
      }

      // Match clair rule-based (score >= 90)
      if (bestInvoice && bestScore >= 90) {
        await supabase.from("bank_transactions").update({
          status: "rapproche",
          matched_invoice_id: bestInvoice.id,
          match_confidence: bestScore,
          match_source: "rule",
          match_reason: "Correspondance automatique",
        }).eq("id", tx.id);
        processed++;
        continue;
      }

      // ETAPE 2 — Gemini fallback si score entre 40-89
      if (bestInvoice && bestScore >= 40) {
        const gemini = await geminiAnalyze(tx, bestInvoice);

        let newStatus = "unmatched";
        if (gemini.confidence >= 90) newStatus = "suggestion_ai";
        else if (gemini.confidence >= 70) newStatus = "correspondance_partielle";
        else newStatus = "non_rapproche";

        await supabase.from("bank_transactions").update({
          status: newStatus,
          matched_invoice_id: gemini.match ? bestInvoice.id : null,
          match_confidence: gemini.confidence,
          match_source: "gemini",
          match_reason: gemini.reason,
        }).eq("id", tx.id);
        processed++;
      }
    }

    const { data: allTx } = await supabase.from("bank_transactions").select("status");

    return NextResponse.json({
      success: true,
      matched: processed,
      counts: {
        total: allTx?.length || 0,
        rapproche: allTx?.filter((t: any) => t.status === "rapproche").length || 0,
        suggestion_ai: allTx?.filter((t: any) => t.status === "suggestion_ai").length || 0,
        correspondance_partielle: allTx?.filter((t: any) => t.status === "correspondance_partielle").length || 0,
        non_rapproche: allTx?.filter((t: any) => t.status === "non_rapproche" || t.status === "unmatched").length || 0,
      },
    });

  } catch (error: any) {
    console.error("Reconciliation error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}