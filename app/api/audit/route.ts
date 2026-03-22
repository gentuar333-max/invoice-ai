 
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { user_id, action, entity, entity_id, old_data, new_data } = await request.json();

    const ip = request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { error } = await supabase.from("audit_trail").insert({
      user_id: user_id || null,
      action,
      entity,
      entity_id: entity_id || null,
      old_data: old_data || null,
      new_data: new_data || null,
      ip_address: ip,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const limit = parseInt(searchParams.get("limit") || "50");

    let query = supabase
      .from("audit_trail")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (user_id) query = query.eq("user_id", user_id);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}