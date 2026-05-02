import { createClient } from "@/lib/supabase";

export type Plan = "free" | "starter" | "pro" | "business";

export const PLAN_LIMITS = {
  free: {
    max_invoices: 10,        // 5 → 10
    csv_bank: false,
    ai_matching: false,
    reconciliation: false,
    export_advanced: false,
    contracts: false,
  },
  starter: {
    max_invoices: 100,
    csv_bank: true,
    ai_matching: false,
    reconciliation: true,
    export_advanced: true,
    contracts: false,
  },
  pro: {
    max_invoices: 999,
    csv_bank: true,
    ai_matching: true,
    reconciliation: true,
    export_advanced: true,
    contracts: true,
  },
  business: {
    max_invoices: 999,
    csv_bank: true,
    ai_matching: true,
    reconciliation: true,
    export_advanced: true,
    contracts: true,
  },
};

export const TRIAL_DAYS = 14;

export async function getUserPlan(): Promise<Plan> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return "free";
    const { data } = await supabase
      .from("profiles")
      .select("plan, trial_started_at, trial_ended")
      .eq("id", user.id)
      .single();
    return (data?.plan as Plan) || "free";
  } catch {
    return "free";
  }
}

export async function getTrialStatus(): Promise<{
  isInTrial: boolean;
  daysLeft: number;
  trialExpired: boolean;
}> {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { isInTrial: false, daysLeft: 0, trialExpired: false };

    const { data } = await supabase
      .from("profiles")
      .select("plan, trial_started_at, trial_ended")
      .eq("id", user.id)
      .single();

    // Si plan paguese — nuk është në trial
    if (data?.plan && data.plan !== "free") {
      return { isInTrial: false, daysLeft: 0, trialExpired: false };
    }

    if (!data?.trial_started_at) {
      return { isInTrial: false, daysLeft: 0, trialExpired: false };
    }

    const started = new Date(data.trial_started_at);
    const now = new Date();
    const diffMs = now.getTime() - started.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const daysLeft = Math.max(0, TRIAL_DAYS - diffDays);
    const trialExpired = daysLeft === 0;

    return {
      isInTrial: !trialExpired,
      daysLeft,
      trialExpired,
    };
  } catch {
    return { isInTrial: false, daysLeft: 0, trialExpired: false };
  }
}