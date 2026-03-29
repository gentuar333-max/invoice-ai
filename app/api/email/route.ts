import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "InvoiceAgent <noreply@premiumartisan.fr>";
const BASE = "https://invoiceagent.fr";

export async function POST(request: NextRequest) {
  try {
    const { type, to, data } = await request.json();

    let subject = "";
    let html = "";

    if (type === "welcome") {
      subject = "Bienvenue sur InvoiceAgent — votre compte est prêt";
      html = `
        <div style="font-family:'DM Sans',sans-serif; max-width:600px; margin:0 auto; background:#09090b; color:#fafafa; padding:48px 40px; border-radius:12px; border:1px solid rgba(99,102,241,0.2);">
          
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:40px;">
            <div style="width:36px; height:36px; background:#09090b; border:1.5px solid #6366f1; border-radius:7px; display:inline-flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; color:#6366f1; font-family:monospace;">IA</div>
            <span style="font-size:16px; font-weight:700; color:#fafafa; letter-spacing:-0.3px;">InvoiceAgent</span>
          </div>

          <h1 style="font-size:26px; font-weight:700; color:#fafafa; margin:0 0 12px;">Bienvenue sur InvoiceAgent 👋</h1>
          <p style="color:#71717a; font-size:15px; line-height:1.7; margin:0 0 32px;">
            Votre compte est créé et prêt à utiliser. Commencez dès maintenant à automatiser votre comptabilité avec l'IA Gemini.
          </p>

          <div style="background:#18181b; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:24px; margin-bottom:32px;">
            <p style="color:#a1a1aa; font-size:13px; margin:0 0 16px; text-transform:uppercase; letter-spacing:0.08em;">3 premières étapes</p>
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="display:flex; gap:12px; align-items:flex-start;">
                <div style="width:24px; height:24px; background:rgba(99,102,241,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#818cf8; flex-shrink:0;">1</div>
                <p style="color:#e4e4e7; font-size:14px; margin:0; line-height:1.5;"><strong>Importez une facture PDF</strong> — l'IA extrait fournisseur, TVA et montants en moins de 5 secondes.</p>
              </div>
              <div style="display:flex; gap:12px; align-items:flex-start;">
                <div style="width:24px; height:24px; background:rgba(99,102,241,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#818cf8; flex-shrink:0;">2</div>
                <p style="color:#e4e4e7; font-size:14px; margin:0; line-height:1.5;"><strong>Importez votre relevé CSV</strong> — réconciliation bancaire automatique avec vos factures.</p>
              </div>
              <div style="display:flex; gap:12px; align-items:flex-start;">
                <div style="width:24px; height:24px; background:rgba(99,102,241,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; color:#818cf8; flex-shrink:0;">3</div>
                <p style="color:#e4e4e7; font-size:14px; margin:0; line-height:1.5;"><strong>Exportez votre FEC</strong> — fichier comptable conforme DGFiP prêt pour votre comptable.</p>
              </div>
            </div>
          </div>

          <a href="${BASE}/invoices" style="display:inline-block; background:#6366f1; color:#ffffff; padding:14px 32px; border-radius:10px; text-decoration:none; font-weight:700; font-size:15px; margin-bottom:32px;">
            Importer ma première facture →
          </a>

          <div style="border-top:1px solid rgba(255,255,255,0.06); padding-top:24px;">
            <p style="color:#3f3f46; font-size:12px; margin:0 0 8px;">Plan gratuit actif — 5 factures/mois, sans carte bancaire.</p>
            <p style="color:#3f3f46; font-size:12px; margin:0;">
              <a href="${BASE}/tarifs" style="color:#6366f1; text-decoration:none;">Voir les plans payants</a> · 
              <a href="${BASE}/unsubscribe?email=${to}" style="color:#3f3f46; text-decoration:none;">Se désabonner</a>
            </p>
          </div>

        </div>
      `;
    }

    else if (type === "payment_confirmed") {
      subject = `Paiement confirmé — Plan ${data?.plan?.toUpperCase()} ✅`;
      html = `
        <div style="font-family:'DM Sans',sans-serif; max-width:600px; margin:0 auto; background:#09090b; color:#fafafa; padding:48px 40px; border-radius:12px; border:1px solid rgba(99,102,241,0.2);">
          <div style="margin-bottom:32px;">
            <span style="font-size:16px; font-weight:700; color:#fafafa;">InvoiceAgent</span>
          </div>
          <h1 style="font-size:26px; font-weight:700; color:#4ade80; margin:0 0 12px;">Paiement confirmé ✅</h1>
          <p style="color:#71717a; font-size:15px; line-height:1.7; margin:0 0 24px;">
            Votre abonnement <strong style="color:#fafafa;">${data?.plan?.toUpperCase()}</strong> est maintenant actif.
          </p>
          <div style="background:#18181b; border:1px solid rgba(74,222,128,0.2); border-radius:10px; padding:24px; margin-bottom:32px;">
            <p style="color:#a1a1aa; margin:0; font-size:14px;">Plan: <strong style="color:#fafafa;">${data?.plan?.toUpperCase()}</strong></p>
            <p style="color:#a1a1aa; margin:8px 0 0; font-size:14px;">Montant: <strong style="color:#4ade80;">${data?.amount}</strong></p>
          </div>
          <a href="${BASE}/dashboard" style="display:inline-block; background:#6366f1; color:#ffffff; padding:14px 32px; border-radius:10px; text-decoration:none; font-weight:700; font-size:15px;">
            Accéder au dashboard →
          </a>
          <p style="color:#3f3f46; font-size:12px; margin-top:32px;">
            <a href="${BASE}/unsubscribe?email=${to}" style="color:#3f3f46; text-decoration:none;">Se désabonner</a>
          </p>
        </div>
      `;
    }

    else if (type === "invoice_unpaid") {
      subject = `Facture non payée — ${data?.vendor_name} ${data?.amount}`;
      html = `
        <div style="font-family:'DM Sans',sans-serif; max-width:600px; margin:0 auto; background:#09090b; color:#fafafa; padding:48px 40px; border-radius:12px; border:1px solid rgba(99,102,241,0.2);">
          <div style="margin-bottom:32px;">
            <span style="font-size:16px; font-weight:700; color:#fafafa;">InvoiceAgent</span>
          </div>
          <h1 style="font-size:26px; font-weight:700; color:#ef4444; margin:0 0 12px;">Facture non payée ⚠️</h1>
          <p style="color:#71717a; font-size:15px; line-height:1.7; margin:0 0 24px;">
            La facture suivante n'a pas encore été réglée:
          </p>
          <div style="background:#18181b; border:1px solid rgba(239,68,68,0.3); border-radius:10px; padding:24px; margin-bottom:32px;">
            <p style="color:#a1a1aa; margin:0; font-size:14px;">Fournisseur: <strong style="color:#fafafa;">${data?.vendor_name}</strong></p>
            <p style="color:#a1a1aa; margin:8px 0 0; font-size:14px;">Montant: <strong style="color:#ef4444;">${data?.amount}</strong></p>
            <p style="color:#a1a1aa; margin:8px 0 0; font-size:14px;">Date: <strong style="color:#fafafa;">${data?.date}</strong></p>
          </div>
          <a href="${BASE}/dashboard" style="display:inline-block; background:#ef4444; color:#ffffff; padding:14px 32px; border-radius:10px; text-decoration:none; font-weight:700; font-size:15px;">
            Voir la facture →
          </a>
          <p style="color:#3f3f46; font-size:12px; margin-top:32px;">
            <a href="${BASE}/unsubscribe?email=${to}" style="color:#3f3f46; text-decoration:none;">Se désabonner</a>
          </p>
        </div>
      `;
    }

    else if (type === "tva_reminder") {
      subject = `TVA à déclarer avant le ${data?.deadline} — ${data?.amount}`;
      html = `
        <div style="font-family:'DM Sans',sans-serif; max-width:600px; margin:0 auto; background:#09090b; color:#fafafa; padding:48px 40px; border-radius:12px; border:1px solid rgba(99,102,241,0.2);">
          <div style="margin-bottom:32px;">
            <span style="font-size:16px; font-weight:700; color:#fafafa;">InvoiceAgent</span>
          </div>
          <h1 style="font-size:26px; font-weight:700; color:#f59e0b; margin:0 0 12px;">Rappel TVA 📅</h1>
          <p style="color:#71717a; font-size:15px; line-height:1.7; margin:0 0 24px;">
            N'oubliez pas de déclarer votre TVA avant le <strong style="color:#f59e0b;">${data?.deadline}</strong>.
          </p>
          <div style="background:#18181b; border:1px solid rgba(245,158,11,0.3); border-radius:10px; padding:24px; margin-bottom:32px;">
            <p style="color:#a1a1aa; margin:0; font-size:14px;">TVA à déclarer: <strong style="color:#f59e0b;">${data?.amount}</strong></p>
            <p style="color:#a1a1aa; margin:8px 0 0; font-size:14px;">Échéance: <strong style="color:#fafafa;">${data?.deadline}</strong></p>
          </div>
          <a href="${BASE}/dashboard" style="display:inline-block; background:#f59e0b; color:#09090b; padding:14px 32px; border-radius:10px; text-decoration:none; font-weight:700; font-size:15px;">
            Voir le dashboard →
          </a>
          <p style="color:#3f3f46; font-size:12px; margin-top:32px;">
            <a href="${BASE}/unsubscribe?email=${to}" style="color:#3f3f46; text-decoration:none;">Se désabonner</a>
          </p>
        </div>
      `;
    }

    else if (type === "monthly_report") {
      subject = `Rapport mensuel InvoiceAgent — ${data?.month}`;
      html = `
        <div style="font-family:'DM Sans',sans-serif; max-width:600px; margin:0 auto; background:#09090b; color:#fafafa; padding:48px 40px; border-radius:12px; border:1px solid rgba(99,102,241,0.2);">
          <div style="margin-bottom:32px;">
            <span style="font-size:16px; font-weight:700; color:#fafafa;">InvoiceAgent</span>
          </div>
          <h1 style="font-size:26px; font-weight:700; color:#60a5fa; margin:0 0 12px;">Rapport mensuel — ${data?.month}</h1>
          <div style="background:#18181b; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:24px; margin-bottom:32px;">
            <p style="color:#a1a1aa; margin:0; font-size:14px;">Total factures: <strong style="color:#fafafa;">${data?.total_invoices}</strong></p>
            <p style="color:#a1a1aa; margin:8px 0 0; font-size:14px;">Montant TTC: <strong style="color:#4ade80;">${data?.total_amount}</strong></p>
            <p style="color:#a1a1aa; margin:8px 0 0; font-size:14px;">TVA: <strong style="color:#f59e0b;">${data?.tva}</strong></p>
            <p style="color:#a1a1aa; margin:8px 0 0; font-size:14px;">Factures payées: <strong style="color:#4ade80;">${data?.paid}</strong></p>
            <p style="color:#a1a1aa; margin:8px 0 0; font-size:14px;">Factures en attente: <strong style="color:#ef4444;">${data?.unpaid}</strong></p>
          </div>
          <a href="${BASE}/dashboard" style="display:inline-block; background:#6366f1; color:#ffffff; padding:14px 32px; border-radius:10px; text-decoration:none; font-weight:700; font-size:15px;">
            Voir le rapport complet →
          </a>
          <p style="color:#3f3f46; font-size:12px; margin-top:32px;">
            <a href="${BASE}/unsubscribe?email=${to}" style="color:#3f3f46; text-decoration:none;">Se désabonner</a>
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