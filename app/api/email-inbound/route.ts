import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("Email received from:", body.From);
    console.log("Subject:", body.Subject);

    // Merr PDF attachment
    const attachment = body.Attachments?.find((a: any) =>
      a.ContentType === "application/pdf" || a.Name?.endsWith(".pdf")
    );

    if (!attachment) {
      return NextResponse.json({ message: "No PDF found" }, { status: 200 });
    }

    // Ekstrakto email-in e dërguesit
    const senderEmail = body.From?.match(/<(.+)>/)?.[1] || body.From;

    // Thirr API extract ekzistuese
    const base64 = attachment.Content;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent([
      `Tu es un expert en extraction de données de factures françaises.
      Analyse ce document et extrais les données en JSON.
      Retourne UNIQUEMENT du JSON valide:
      {
        "vendor_name": "string ou null",
        "invoice_number": "string ou null", 
        "invoice_date": "YYYY-MM-DD ou null",
        "due_date": "YYYY-MM-DD ou null",
        "total_amount": number ou null,
        "tax_amount": number ou null,
        "subtotal": number ou null,
        "siret": "string ou null",
        "category": "string ou null",
        "missing_fields": []
      }`,
      { inlineData: { mimeType: "application/pdf", data: base64 } }
    ]);

    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ message: "AI parse error" }, { status: 200 });
    }
    
    const invoiceData = JSON.parse(jsonMatch[0]);

    // Ruaj në Supabase
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Gjej user-in nga email
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", senderEmail)
      .single();

    if (profile?.id) {
      await supabase.from("invoices").insert({
        user_id: profile.id,
        vendor_name: invoiceData.vendor_name,
        invoice_number: invoiceData.invoice_number,
        invoice_date: invoiceData.invoice_date,
        due_date: invoiceData.due_date,
        total_amount: invoiceData.total_amount,
        tax_amount: invoiceData.tax_amount,
        subtotal: invoiceData.subtotal,
        siret: invoiceData.siret,
        category: invoiceData.category,
        source: "email",
        status: "pending",
      });

      // Dërgo email konfirmimi
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "invoice_imported",
          to: senderEmail,
          data: { vendor: invoiceData.vendor_name, amount: invoiceData.total_amount }
        })
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Email inbound error:", error);
    return NextResponse.json({ error: error.message }, { status: 200 }); // 200 që Postmark mos retry
  }
}