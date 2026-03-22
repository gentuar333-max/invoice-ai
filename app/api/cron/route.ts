 
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://invoice-ai-y2lf.vercel.app";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  let sent = 0;

  // 1. Invoice unpaid alerts
  const { data: overdueInvoices } = await supabase
    .from("invoices")
    .select("id, vendor_name, total_amount, invoice_date, due_date, user_id")
    .lt("due_date", now.toISOString().split("T")[0])
    .neq("status", "paid");

  if (overdueInvoices && overdueInvoices.length > 0) {
    const userIds = [...new Set(overdueInvoices.map((inv) => inv.user_id))].filter(Boolean);

    for (const userId of userIds) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("email, email_notifications")
        .eq("id", userId)
        .single();

      if (!profile?.email || !profile?.email_notifications) continue;

      const userInvoices = overdueInvoices.filter((inv) => inv.user_id === userId);

      for (const inv of userInvoices) {
        await fetch(`${APP_URL}/api/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "invoice_unpaid",
            to: profile.email,
            data: {
              vendor_name: inv.vendor_name || "Inconnu",
              amount: `${Number(inv.total_amount).toFixed(2).replace(".", ",")} €`,
              date: inv.due_date || inv.invoice_date || "",
            },
          }),
        });
        sent++;
      }
    }
  }

  // 2. TVA reminder — le 15 du mois
  if (now.getDate() === 15) {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];

    const { data: invoices } = await supabase
      .from("invoices")
      .select("user_id, tax_amount")
      .gte("invoice_date", firstDay)
      .lte("invoice_date", lastDay);

    if (invoices && invoices.length > 0) {
      const userTVA: Record<string, number> = {};
      invoices.forEach((inv) => {
        if (inv.user_id) {
          userTVA[inv.user_id] = (userTVA[inv.user_id] || 0) + (inv.tax_amount || 0);
        }
      });

      for (const [userId, tva] of Object.entries(userTVA)) {
        if (tva <= 0) continue;

        const { data: profile } = await supabase
          .from("profiles")
          .select("email, email_notifications")
          .eq("id", userId)
          .single();

        if (!profile?.email || !profile?.email_notifications) continue;

        const nextMonth = now.getMonth() + 2 > 12 ? 1 : now.getMonth() + 2;
        const tvaYear = now.getMonth() + 2 > 12 ? now.getFullYear() + 1 : now.getFullYear();
        const deadline = `20/${String(nextMonth).padStart(2, "0")}/${tvaYear}`;

        await fetch(`${APP_URL}/api/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "tva_reminder",
            to: profile.email,
            data: {
              amount: `${tva.toFixed(2).replace(".", ",")} €`,
              deadline,
            },
          }),
        });
        sent++;
      }
    }
  }

  // 3. Monthly report — le 1er du mois
  if (now.getDate() === 1) {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const firstDay = lastMonth.toISOString().split("T")[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split("T")[0];
    const monthName = lastMonth.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

    const { data: invoices } = await supabase
      .from("invoices")
      .select("user_id, total_amount, tax_amount, status")
      .gte("invoice_date", firstDay)
      .lte("invoice_date", lastDay);

    if (invoices && invoices.length > 0) {
      const userIds = [...new Set(invoices.map((inv) => inv.user_id))].filter(Boolean);

      for (const userId of userIds) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("email, email_notifications")
          .eq("id", userId)
          .single();

        if (!profile?.email || !profile?.email_notifications) continue;

        const userInvoices = invoices.filter((inv) => inv.user_id === userId);
        const totalAmount = userInvoices.reduce((acc, inv) => acc + (inv.total_amount || 0), 0);
        const totalTVA = userInvoices.reduce((acc, inv) => acc + (inv.tax_amount || 0), 0);
        const paid = userInvoices.filter((inv) => inv.status === "paid").length;
        const unpaid = userInvoices.filter((inv) => inv.status !== "paid").length;

        await fetch(`${APP_URL}/api/email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "monthly_report",
            to: profile.email,
            data: {
              month: monthName,
              total_invoices: userInvoices.length,
              total_amount: `${totalAmount.toFixed(2).replace(".", ",")} €`,
              tva: `${totalTVA.toFixed(2).replace(".", ",")} €`,
              paid,
              unpaid,
            },
          }),
        });
        sent++;
      }
    }
  }

  return NextResponse.json({ success: true, sent });
}