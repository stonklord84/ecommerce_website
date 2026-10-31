import type { NextConfig } from "next";

const supabaseUrl = process.env.SUPABASE_URL;

const nextConfig: NextConfig = {
  devIndicators: false,
  // Sign-in and saved carts run in the browser (lib/supabase-browser.ts), so they need
  // the Supabase URL and anon key there too. The anon key is designed to be public;
  // never map a service_role / secret key here.
  env: {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl ?? "",
    NEXT_PUBLIC_SUPABASE_KEY: process.env.SUPABASE_KEY ?? "",
  },
  images: {
    // Allow next/image to load product photos from the Supabase storage bucket.
    remotePatterns: supabaseUrl
      ? [new URL(`${supabaseUrl}/storage/v1/object/public/product-images/**`)]
      : [],
  },

};

export default nextConfig;
