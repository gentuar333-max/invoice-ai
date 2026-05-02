 
// app/api/fingerprint/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST — regjistro fingerprint dhe kontrollo nese ka trial
export async function POST(req: NextRequest) {
  try {
    const { fingerprint, user_id } = await req.json();

    if (!fingerprint || !user_id) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // Kontrollo nese fingerprint ekziston per nje user tjeter
    const { data: existing } = await supabase
      .from("device_fingerprints")
      .select("user_id")
      .eq("fingerprint", fingerprint)
      .single();

    if (existing && existing.user_id !== user_id) {
      // Device e njohur — ky user ka perdorur trial me llogari tjeter
      // Vendos trial_ended = true
      await supabase
        .from("profiles")
        .update({
          trial_ended: true,
          trial_started_at: null,
        })
        .eq("id", user_id);

      return NextResponse.json({ trial_blocked: true });
    }

    // Regjistro fingerprint nese nuk ekziston
    if (!existing) {
      await supabase
        .from("device_fingerprints")
        .upsert({ fingerprint, user_id }, { onConflict: "fingerprint" });
    }

    return NextResponse.json({ trial_blocked: false });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}