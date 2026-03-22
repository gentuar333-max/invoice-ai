 
export async function logAudit(params: {
  user_id?: string;
  action: string;
  entity: string;
  entity_id?: string;
  old_data?: any;
  new_data?: any;
}) {
  try {
    await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
  } catch {
    // silent fail — audit nuk duhet të bllokojë app-in
  }
}