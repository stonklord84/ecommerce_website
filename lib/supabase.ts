import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_KEY. Add them to .env (see .env.example) with your Supabase project's values.",
  );
}

// Server-only: the env vars have no NEXT_PUBLIC_ prefix, so they never reach the browser.
export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});

export const PRODUCT_IMAGES_BUCKET = "product-images";
