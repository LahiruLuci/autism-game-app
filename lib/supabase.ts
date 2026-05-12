import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Warn during build if env vars are missing, but don't crash static generation.
// The real error will surface at runtime if the client is actually used without valid credentials.
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined" || process.env.NODE_ENV === "development") {
    console.error(
      "[BrightPath] Missing Supabase environment variables. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);

