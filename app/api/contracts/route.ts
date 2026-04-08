import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ success: false, error: "Aucun fichier" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mimeType = file.type || "application/pdf";

    const prompt = `Tu es un expert juridique. Analyse ce contrat et reponds UNIQUEMENT en JSON valide sans markdown:
{
  "vendor_name": "nom du fournisseur",
  "payment_terms": "conditions de paiement",
  "hidden_fees": [{"description": "frais cache", "amount": "montant"}],
  "risk_clauses": [{"clause": "clause a risque", "severity": "high/medium/low"}],
  "penalties": "penalites de retard ou resiliation",
  "key_dates": [{"date": "date", "description": "signification"}],
  "obligations": "principales obligations",
  "summary": "resume en 2-3 phrases"
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent([
      prompt,
      { inlineData: { mimeType, data: base64 } },
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ success: false, error: "Reponse IA invalide" }, { status: 500 });
    }

    const parsed = JSON.parse(jsonMatch[0]);

    try {
      await supabase.from("contracts").insert({
        filename: file.name,
        vendor_name: parsed.vendor_name || null,
        payment_terms: parsed.payment_terms || null,
        hidden_fees: parsed.hidden_fees || [],
        risk_clauses: parsed.risk_clauses || [],
        penalties: parsed.penalties || null,
        key_dates: parsed.key_dates || [],
        obligations: parsed.obligations || null,
        raw_analysis: parsed.summary || null,
      });
    } catch (_) {}

    return NextResponse.json({ success: true, data: parsed });

  } catch (error: any) {
    console.error("Contract analysis error:", error);
    if (error.message?.includes("API_KEY")) {
      return NextResponse.json({ success: false, error: "Cle API invalide." }, { status: 401 });
    }
    if (error.message?.includes("429")) {
      return NextResponse.json({ success: false, error: "Quota API depasse. Reessayez." }, { status: 429 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("contracts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}