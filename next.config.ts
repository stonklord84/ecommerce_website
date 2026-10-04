import type { NextConfig } from "next";

const supabaseUrl = process.env.SUPABASE_URL;

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    // Allow next/image to load product photos from the Supabase storage bucket.
    remotePatterns: supabaseUrl
      ? [new URL(`${supabaseUrl}/storage/v1/object/public/product-images/**`)]
      : [],
  },

};

export default nextConfig;
