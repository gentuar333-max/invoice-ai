import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileToBase64, getMimeType, validateFile } from "@/lib/file-to-base64";
import type { InvoiceData } from "@/lib/invoice-schema";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `
Tu es un expert en extraction de données de factures.
Analyse ce document et extrais les données en JSON.

RÈGLES STRICTES:
- Retourne UNIQUEMENT du JSON valide, aucun texte autour
- Si une valeur est absente ou illisible, retourne null (ne jamais inventer)
- Les dates doivent être au format YYYY-MM-DD
- Les montants doivent être des nombres (ex: 1250.00, pas "1 250,00 €")
- missing_fields doit lister les champs que tu n'as pas trouvés

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
    // 1. Récupérer le fichier
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Aucun fichier reçu." },
        { status: 400 }
      );
    }

    // 2. Valider le fichier
    const validationError = validateFile(file);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    // 3. Convertir en base64
    const base64 = await fileToBase64(file);
    const mimeType = getMimeType(file);

    // 4. Appeler Gemini
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent([
      SYSTEM_PROMPT,
      {
        inlineData: {
          mimeType,
          data: base64,
        },
      },
    ]);

    const text = result.response.text();

    // 5. Parser le JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Réponse Gemini invalide:", text);
      return NextResponse.json(
        { success: false, error: "Réponse IA invalide. Réessayez." },
        { status: 500 }
      );
    }

    const invoiceData: InvoiceData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      success: true,
      data: invoiceData,
    });

  } catch (error: any) {
    console.error("Erreur extract route:", error);

    if (error.message?.includes("API_KEY")) {
      return NextResponse.json(
        { success: false, error: "Clé API invalide." },
        { status: 401 }
      );
    }

    if (error.message?.includes("429")) {
      return NextResponse.json(
        { success: false, error: "Quota API dépassé. Réessayez dans quelques secondes." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Erreur serveur. Réessayez." },
      { status: 500 }
    );
  }
}