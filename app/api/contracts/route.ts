 
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const prompt = `Tu es un expert juridique et comptable. Analyse ce contrat et extrais les informations suivantes.

Réponds UNIQUEMENT en JSON valide sans markdown:
{
  "vendor_name": "nom du fournisseur ou partenaire",
  "payment_terms": "conditions de paiement (ex: Net 30, Net 60, paiement immédiat)",
  "hidden_fees": [
    {"description": "description du frais caché", "amount": "montant si mentionné"}
  ],
  "risk_clauses": [
    {"clause": "description de la clause à risque", "severity": "high/medium/low"}
  ],
  "penalties": "description des pénalités de retard ou résiliation",
  "key_dates": [
    {"date": "date importante", "description": "signification"}
  ],
  "obligations": "principales obligations des parties",
  "summary": "résumé en 2-3 phrases des points les plus importants"
}`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: mimeType, data: base64 } },
              { text: prompt }
            ]
          }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 2000 },
        }),
      }
    );

    const geminiData = await geminiRes.json();
    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    const { data, error } = await supabase.from("contracts").insert({
      filename: file.name,
      vendor_name: parsed.vendor_name || null,
      payment_terms: parsed.payment_terms || null,
      hidden_fees: parsed.hidden_fees || [],
      risk_clauses: parsed.risk_clauses || [],
      penalties: parsed.penalties || null,
      key_dates: parsed.key_dates || [],
      obligations: parsed.obligations || null,
      raw_analysis: parsed.summary || null,
    }).select().single();

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, data: { ...parsed, id: data.id } });
  } catch (error: any) {
    console.error("Contract analysis error:", error);
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