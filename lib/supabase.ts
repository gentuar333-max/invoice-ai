import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    if (typeof window === "undefined") {
      return { auth: { signUp: async () => ({}), signInWithPassword: async () => ({}), signOut: async () => ({}) }, from: () => ({ select: () => ({ order: () => ({}) }) }) } as any;
    }
    throw new Error("Supabase URL and Key are required");
  }
  
  return createBrowserClient(url, key);
}