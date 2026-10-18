import type { Currency } from "./currency";

// Safe to import from client components (no Supabase access here).
export function formatPrice(
  { price_cad, price_usd }: { price_cad: number; price_usd: number },
  currency: Currency,
) {
  const price = currency === "usd" ? price_usd : price_cad;
  return `$${price.toFixed(2)} ${currency.toUpperCase()}`;
}
