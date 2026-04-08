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

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return NextResponse.json({ success: false, error: `Gemini error: ${errText}` }, { status: 500 });
    }

    const geminiData = await geminiRes.json();
    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      return NextResponse.json({ success: false, error: "Gemini returned empty response" }, { status: 500 });
    }

    const clean = text.replace(/```json|```/g, "").trim();

    let parsed: any;
    try {
      parsed = JSON.parse(clean);
    } catch (parseErr: any) {
      return NextResponse.json({ success: false, error: `JSON parse error: ${parseErr.message}` }, { status: 500 });
    }

    // Save to DB - ignore errors for demo mode without auth
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