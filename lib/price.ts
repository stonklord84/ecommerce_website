// Safe to import from client components (no Supabase access here).
export function formatPrice({ price_cad, price_usd }: { price_cad: number; price_usd: number }) {
  return `CAD $${price_cad.toFixed(2)} / USD $${price_usd.toFixed(2)}`;
}
