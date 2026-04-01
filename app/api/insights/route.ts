import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  console.log("[insights] POST called");

  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch (e) {
      console.error("[insights] JSON parse error:", e);
      return NextResponse.json({ success: false, error: "Body invalide" }, { status: 400 });
    }

    const { user_id } = body;
    console.log("[insights] user_id:", user_id);

    if (!user_id) {
      return NextResponse.json({ success: false, error: "user_id manquant" }, { status: 400 });
    }

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: invoices, error: invError } = await admin
      .from("invoices")
      .select("vendor_name, invoice_number, invoice_date, due_date, total_amount, tax_amount, status, created_at")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .limit(50);

    console.log("[insights] invoices count:", invoices?.length, "error:", invError);

    const { data: contracts } = await admin
      .from("contracts")
      .select("vendor_name, payment_terms, risk_clauses, hidden_fees, summary, created_at")
      .eq("user_id", user_id)
      .limit(20);

    console.log("[insights] contracts count:", contracts?.length);

    if (!invoices || invoices.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "Importez des factures pour générer des insights."
      });
    }

    const invoiceSummary = buildInvoiceSummary(invoices);
    const contractSummary = buildContractSummary(contracts || []);

    console.log("[insights] Calling Gemini...");

    const prompt = `Tu es un analyste financier expert pour PME françaises.
Analyse ces données et génère des insights financiers précis.

FACTURES:
${invoiceSummary}

CONTRATS:
${contractSummary}

Retourne UNIQUEMENT ce JSON valide, sans texte autour, sans backticks:
{
  "insights": [
    {
      "id": "insight_1",
      "type": "risk",
      "vendor": "nom fournisseur",
      "title": "titre court",
      "description": "explication avec chiffres",
      "amount": 100.00,
      "amount_label": "Risque financier",
      "action": "action concrète",
      "priority": "high"
    }
  ],
  "summary": {
    "total_at_risk": 100.00,
    "total_savings_possible": 0.00,
    "health_score": 70
  }
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("[insights] Gemini response length:", text.length);

    // Clean response — remove markdown backticks if present
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      console.error("[insights] No JSON found in response:", text.substring(0, 200));
      return NextResponse.json({ success: false, error: "Réponse IA invalide — réessayez" }, { status: 500 });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    console.log("[insights] Success, insights count:", parsed.insights?.length);

    return NextResponse.json({ success: true, data: parsed });

  } catch (error: any) {
    console.error("[insights] Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Erreur serveur" }, { status: 500 });
  }
}

function buildInvoiceSummary(invoices: any[]): string {
  const byVendor: Record<string, any[]> = {};
  invoices.forEach((inv) => {
    const vendor = inv.vendor_name || "Inconnu";
    if (!byVendor[vendor]) byVendor[vendor] = [];
    byVendor[vendor].push(inv);
  });

  let summary = "";
  Object.entries(byVendor).forEach(([vendor, invList]) => {
    const total = invList.reduce((acc, inv) => acc + (inv.total_amount || 0), 0);
    const unpaid = invList.filter((inv) => inv.status !== "paid" && inv.status !== "rapproche");
    const overdue = unpaid.filter((inv) => inv.due_date && new Date(inv.due_date) < new Date());
    const amounts = invList.map((inv) => inv.total_amount);
    const duplicates = amounts.filter((amt, idx) => amounts.indexOf(amt) !== idx);

    summary += `Fournisseur: ${vendor}\n`;
    summary += `  Factures: ${invList.length}, Total: ${total.toFixed(2)}EUR\n`;
    summary += `  Non payees: ${unpaid.length} (${unpaid.reduce((acc, inv) => acc + (inv.total_amount || 0), 0).toFixed(2)}EUR)\n`;
    summary += `  En retard: ${overdue.length}\n`;
    if (duplicates.length > 0) summary += `  DOUBLONS DETECTES: ${duplicates.join(", ")}EUR\n`;
    summary += "\n";
  });

  return summary;
}

function buildContractSummary(contracts: any[]): string {
  if (!contracts.length) return "Aucun contrat analyse.\n";
  let summary = "";
  contracts.forEach((contract) => {
    summary += `Contrat: ${contract.vendor_name || "Inconnu"}\n`;
    if (contract.payment_terms) summary += `  Paiement: ${contract.payment_terms}\n`;
    if (contract.risk_clauses?.length > 0) {
      const high = contract.risk_clauses.filter((c: any) => c.severity === "high");
      summary += `  Clauses risque: ${contract.risk_clauses.length} (${high.length} elevees)\n`;
      high.forEach((c: any) => summary += `  - ${c.clause}\n`);
    }
    if (contract.hidden_fees?.length > 0) {
      contract.hidden_fees.forEach((f: any) => summary += `  Frais cache: ${f.description}: ${f.amount || "?"}\n`);
    }
    summary += "\n";
  });
  return summary;
}