import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileToBase64, getMimeType, validateFile } from "@/lib/file-to-base64";
import type { InvoiceData } from "@/lib/invoice-schema";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `
Tu es un expert en extraction de donnees de factures francaises.
Analyse ce document et extrais les donnees en JSON.
REGLES STRICTES:
- Retourne UNIQUEMENT du JSON valide, aucun texte autour
- Si une valeur est absente ou illisible, retourne null (ne jamais inventer)
- Les dates doivent etre au format YYYY-MM-DD
- Les montants doivent etre des nombres (ex: 1250.00, pas "1 250,00 EUR")
- missing_fields doit lister les champs que tu n'as pas trouves
- Pour le SIRET: cherche un numero a 14 chiffres sur la facture
- Pour la categorie: choisis parmi: Alimentation, Energie, Transport, Informatique, Fournitures, Loyer, Services, Autre

FORMAT JSON ATTENDU:
{
  "vendor_name": "string ou null",
  "invoice_number": "string ou null",
  "invoice_date": "YYYY-MM-DD ou null",
  "due_date": "YYYY-MM-DD ou null",
  "currency": "EUR ou code devise ou null",
  "subtotal": number ou null,
  "tax_amount": number ou null,
  "total_amount": number ou null,
  "siret": "14 chiffres ou null",
  "category": "Alimentation|Energie|Transport|Informatique|Fournitures|Loyer|Services|Autre ou null",
  "line_items": [
    {
      "description": "string",
      "quantity": number ou null,
      "unit_price": number ou null,
      "total": number ou null
    }
  ],
  "missing_fields": ["liste des champs manquants"]
}
`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ success: false, error: "Aucun fichier recu." }, { status: 400 });
    }

    const validationError = validateFile(file);
    if (validationError) {
      return NextResponse.json({ success: false, error: validationError }, { status: 400 });
    }

    const base64 = await fileToBase64(file);
    const mimeType = getMimeType(file);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([
      SYSTEM_PROMPT,
      { inlineData: { mimeType, data: base64 } },
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ success: false, error: "Reponse IA invalide. Reessayez." }, { status: 500 });
    }

    const invoiceData: InvoiceData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ success: true, data: invoiceData });
  } catch (error: any) {
    console.error("Erreur extract route:", error);
    if (error.message?.includes("API_KEY")) {
      return NextResponse.json({ success: false, error: "Cle API invalide." }, { status: 401 });
    }
    if (error.message?.includes("429")) {
      return NextResponse.json({ success: false, error: "Quota API depasse. Reessayez." }, { status: 429 });
    }
    return NextResponse.json({ success: false, error: "Erreur serveur. Reessayez." }, { status: 500 });
  }
}