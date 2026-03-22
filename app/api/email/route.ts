 
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "AgentHub <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  try {
    const { type, to, data } = await request.json();

    let subject = "";
    let html = "";

    if (type === "welcome") {
      subject = "Bienvenue sur AgentHub 🤖";
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f1923; color: #ffffff; padding: 40px; border-radius: 8px;">
          <h1 style="color: #e8b84b; font-size: 24px; margin-bottom: 16px;">Bienvenue sur AgentHub</h1>
          <p style="color: #a8c4d8; font-size: 15px; line-height: 1.6;">
            Votre compte a été créé avec succès. Vous pouvez maintenant importer vos factures et automatiser votre comptabilité.
          </p>
          <a href="https://invoice-ai-y2lf.vercel.app/dashboard" style="display: inline-block; background: #e8b84b; color: #0f1923; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; margin-top: 24px; font-size: 13px; letter-spacing: 1px;">
            ACCEDER AU DASHBOARD
          </a>
          <p style="color: #4a6a85; font-size: 12px; margin-top: 32px;">
            <a href="https://invoice-ai-y2lf.vercel.app/unsubscribe?email=${to}" style="color: #4a6a85;">Se désabonner</a>
          </p>
        </div>
      `;
    }

    else if (type === "payment_confirmed") {
      subject = `Paiement confirmé — Plan ${data?.plan?.toUpperCase()} ✅`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f1923; color: #ffffff; padding: 40px; border-radius: 8px;">
          <h1 style="color: #4ade80; font-size: 24px; margin-bottom: 16px;">Paiement confirmé</h1>
          <p style="color: #a8c4d8; font-size: 15px; line-height: 1.6;">
            Votre abonnement <strong style="color: #e8b84b;">${data?.plan?.toUpperCase()}</strong> est maintenant actif.
          </p>
          <div style="background: #1e2d40; border: 1px solid #2e4058; border-radius: 4px; padding: 20px; margin: 24px 0;">
            <p style="color: #a8c4d8; margin: 0; font-size: 14px;">Plan: <strong style="color: #ffffff;">${data?.plan?.toUpperCase()}</strong></p>
            <p style="color: #a8c4d8; margin: 8px 0 0; font-size: 14px;">Montant: <strong style="color: #e8b84b;">${data?.amount}</strong></p>
          </div>
          <a href="https://invoice-ai-y2lf.vercel.app/dashboard" style="display: inline-block; background: #e8b84b; color: #0f1923; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 1px;">
            ACCEDER AU DASHBOARD
          </a>
          <p style="color: #4a6a85; font-size: 12px; margin-top: 32px;">
            <a href="https://invoice-ai-y2lf.vercel.app/unsubscribe?email=${to}" style="color: #4a6a85;">Se désabonner</a>
          </p>
        </div>
      `;
    }

    else if (type === "invoice_unpaid") {
      subject = `Facture non payée — ${data?.vendor_name} ${data?.amount}`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f1923; color: #ffffff; padding: 40px; border-radius: 8px;">
          <h1 style="color: #ef4444; font-size: 24px; margin-bottom: 16px;">Facture non payée</h1>
          <p style="color: #a8c4d8; font-size: 15px; line-height: 1.6;">
            La facture suivante n'a pas encore été réglée:
          </p>
          <div style="background: #1e2d40; border: 1px solid #ef444440; border-radius: 4px; padding: 20px; margin: 24px 0;">
            <p style="color: #a8c4d8; margin: 0; font-size: 14px;">Fournisseur: <strong style="color: #ffffff;">${data?.vendor_name}</strong></p>
            <p style="color: #a8c4d8; margin: 8px 0 0; font-size: 14px;">Montant: <strong style="color: #ef4444;">${data?.amount}</strong></p>
            <p style="color: #a8c4d8; margin: 8px 0 0; font-size: 14px;">Date: <strong style="color: #ffffff;">${data?.date}</strong></p>
          </div>
          <a href="https://invoice-ai-y2lf.vercel.app/dashboard" style="display: inline-block; background: #ef4444; color: #ffffff; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 1px;">
            VOIR LA FACTURE
          </a>
          <p style="color: #4a6a85; font-size: 12px; margin-top: 32px;">
            <a href="https://invoice-ai-y2lf.vercel.app/unsubscribe?email=${to}" style="color: #4a6a85;">Se désabonner</a>
          </p>
        </div>
      `;
    }

    else if (type === "tva_reminder") {
      subject = `TVA à déclarer avant le ${data?.deadline} — ${data?.amount}`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f1923; color: #ffffff; padding: 40px; border-radius: 8px;">
          <h1 style="color: #f59e0b; font-size: 24px; margin-bottom: 16px;">Rappel TVA</h1>
          <p style="color: #a8c4d8; font-size: 15px; line-height: 1.6;">
            N'oubliez pas de déclarer votre TVA avant le <strong style="color: #f59e0b;">${data?.deadline}</strong>.
          </p>
          <div style="background: #1e2d40; border: 1px solid #f59e0b40; border-radius: 4px; padding: 20px; margin: 24px 0;">
            <p style="color: #a8c4d8; margin: 0; font-size: 14px;">TVA à déclarer: <strong style="color: #f59e0b;">${data?.amount}</strong></p>
            <p style="color: #a8c4d8; margin: 8px 0 0; font-size: 14px;">Échéance: <strong style="color: #ffffff;">${data?.deadline}</strong></p>
          </div>
          <a href="https://invoice-ai-y2lf.vercel.app/dashboard" style="display: inline-block; background: #f59e0b; color: #0f1923; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 1px;">
            VOIR LE DASHBOARD
          </a>
          <p style="color: #4a6a85; font-size: 12px; margin-top: 32px;">
            <a href="https://invoice-ai-y2lf.vercel.app/unsubscribe?email=${to}" style="color: #4a6a85;">Se désabonner</a>
          </p>
        </div>
      `;
    }

    else if (type === "monthly_report") {
      subject = `Rapport mensuel — ${data?.month}`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f1923; color: #ffffff; padding: 40px; border-radius: 8px;">
          <h1 style="color: #60a5fa; font-size: 24px; margin-bottom: 16px;">Rapport mensuel — ${data?.month}</h1>
          <div style="background: #1e2d40; border: 1px solid #2e4058; border-radius: 4px; padding: 20px; margin: 24px 0;">
            <p style="color: #a8c4d8; margin: 0; font-size: 14px;">Total factures: <strong style="color: #ffffff;">${data?.total_invoices}</strong></p>
            <p style="color: #a8c4d8; margin: 8px 0 0; font-size: 14px;">Montant TTC: <strong style="color: #4ade80;">${data?.total_amount}</strong></p>
            <p style="color: #a8c4d8; margin: 8px 0 0; font-size: 14px;">TVA: <strong style="color: #f59e0b;">${data?.tva}</strong></p>
            <p style="color: #a8c4d8; margin: 8px 0 0; font-size: 14px;">Factures payées: <strong style="color: #4ade80;">${data?.paid}</strong></p>
            <p style="color: #a8c4d8; margin: 8px 0 0; font-size: 14px;">Factures en attente: <strong style="color: #ef4444;">${data?.unpaid}</strong></p>
          </div>
          <a href="https://invoice-ai-y2lf.vercel.app/dashboard" style="display: inline-block; background: #60a5fa; color: #0f1923; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 13px; letter-spacing: 1px;">
            VOIR LE RAPPORT COMPLET
          </a>
          <p style="color: #4a6a85; font-size: 12px; margin-top: 32px;">
            <a href="https://invoice-ai-y2lf.vercel.app/unsubscribe?email=${to}" style="color: #4a6a85;">Se désabonner</a>
          </p>
        </div>
      `;
    }

    if (!subject || !html) {
      return NextResponse.json({ error: "Type invalide" }, { status: 400 });
    }

    const { data: result, error } = await resend.emails.send({
      from: FROM,
      to,
      subject,
      html,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true, id: result?.id });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}