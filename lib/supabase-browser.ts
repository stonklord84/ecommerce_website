"use client";

import { createClient } from "@supabase/supabase-js";

// Browser-side Supabase client for customer accounts and saved carts. Uses the same
// public anon key as lib/supabase.ts (exposed through next.config.ts); row level
// security in supabase/carts.sql limits each customer to their own cart.
// The sign-in session is kept in localStorage.
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!,
);
