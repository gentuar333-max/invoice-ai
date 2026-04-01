import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient as createServerClient } from "@/lib/supabase-server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET(request: NextRequest) {
  try {
    // Auth check
    const supabase = createServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
    }

    // Admin client for data access
    const admin = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch invoices
    const { data: invoices } = await admin
      .from("invoices")
      .select("vendor_name, invoice_number, invoice_date, due_date, total_amount, tax_amount, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    // Fetch contracts
    const { data: contracts } = await admin
      .from("contracts")
      .select("vendor_name, payment_terms, risk_clauses, hidden_fees, summary, created_at")
      .eq("user_id", user.id)
      .limit(20);

    if (!invoices || invoices.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: "Importez des factures pour générer des insights."
      });
    }

    const invoiceSummary = buildInvoiceSummary(invoices);
    const contractSummary = buildContractSummary(contracts || []);

    const prompt = `Tu es un analyste financier expert pour PME françaises.

Analyse ces données comptables et génère des insights financiers précis et actionnables.

FACTURES:
${invoiceSummary}

CONTRATS:
${contractSummary}

INSTRUCTIONS:
- Identifie les risques financiers concrets avec montants en euros
- Détecte les anomalies (doublons, retards habituels, frais cachés)
- Donne des recommandations pratiques et immédiates
- Priorise par impact financier (du plus grand au plus petit)
- Maximum 5 insights
- Sois précis et direct — pas de généralités

RETOURNE UNIQUEMENT ce JSON valide:
{
  "insights": [
    {
      "id": "string unique",
      "type": "risk|opportunity|warning|info",
      "vendor": "nom du fournisseur ou Général",
      "title": "titre court et percutant max 60 chars",
      "description": "explication détaillée avec chiffres précis",
      "amount": number ou null,
      "amount_label": "description du montant ex Risque financier ou Économie possible",
      "action": "action concrète à prendre maintenant",
      "priority": "high|medium|low"
    }
  ],
  "summary": {
    "total_at_risk": number,
    "total_savings_possible": number,
    "health_score": number entre 0 et 100
  }
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ success: false, error: "Erreur IA" }, { status: 500 });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ success: true, data: parsed });

  } catch (error: any) {
    console.error("Insights error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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
    const overdue = unpaid.filter((inv) => {
      if (!inv.due_date) return false;
      return new Date(inv.due_date) < new Date();
    });

    const delays: number[] = [];
    invList.forEach((inv) => {
      if (inv.invoice_date && inv.due_date) {
        const diff = Math.round((new Date(inv.due_date).getTime() - new Date(inv.invoice_date).getTime()) / (1000 * 60 * 60 * 24));
        if (diff > 0 && diff < 365) delays.push(diff);
      }
    });
    const avgDelay = delays.length ? Math.round(delays.reduce((a, b) => a + b, 0) / delays.length) : null;

    const amounts = invList.map((inv) => inv.total_amount);
    const duplicates = amounts.filter((amt, idx) => amounts.indexOf(amt) !== idx);

    summary += `Fournisseur: ${vendor}\n`;
    summary += `  - Factures: ${invList.length}, Total: ${total.toFixed(2)}€\n`;
    summary += `  - Non payées: ${unpaid.length} (${unpaid.reduce((acc, inv) => acc + (inv.total_amount || 0), 0).toFixed(2)}€)\n`;
    summary += `  - En retard: ${overdue.length}\n`;
    if (avgDelay) summary += `  - Délai moyen: ${avgDelay} jours\n`;
    if (duplicates.length > 0) summary += `  - DOUBLONS POTENTIELS: ${duplicates.join(", ")}€\n`;
    summary += "\n";
  });

  return summary;
}

function buildContractSummary(contracts: any[]): string {
  if (!contracts.length) return "Aucun contrat analysé.\n";

  let summary = "";
  contracts.forEach((contract) => {
    summary += `Contrat: ${contract.vendor_name || "Inconnu"}\n`;
    if (contract.payment_terms) summary += `  - Paiement: ${contract.payment_terms}\n`;
    if (contract.risk_clauses?.length > 0) {
      const highRisk = contract.risk_clauses.filter((c: any) => c.severity === "high");
      summary += `  - Clauses risque: ${contract.risk_clauses.length} (${highRisk.length} élevées)\n`;
      highRisk.forEach((c: any) => summary += `    → ${c.clause}\n`);
    }
    if (contract.hidden_fees?.length > 0) {
      contract.hidden_fees.forEach((f: any) => summary += `  - Frais caché: ${f.description}: ${f.amount || "?"}\n`);
    }
    summary += "\n";
  });

  return summary;
}