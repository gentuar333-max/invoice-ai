 
import { createClient } from "@/lib/supabase";

export type Plan = "free" | "starter" | "pro" | "business";

export async function getUserPlan(): Promise<Plan> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return "free";
    const { data } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single();
    return (data?.plan as Plan) || "free";
  } catch {
    return "free";
  }
}

export const PLAN_LIMITS = {
  free: {
    max_invoices: 5,
    csv_bank: false,
    ai_matching: false,
    reconciliation: false,
    export_advanced: false,
  },
  starter: {
    max_invoices: 100,
    csv_bank: true,
    ai_matching: false,
    reconciliation: true,
    export_advanced: true,
  },
  pro: {
    max_invoices: 999,
    csv_bank: true,
    ai_matching: true,
    reconciliation: true,
    export_advanced: true,
  },
  business: {
    max_invoices: 999,
    csv_bank: true,
    ai_matching: true,
    reconciliation: true,
    export_advanced: true,
  },
};