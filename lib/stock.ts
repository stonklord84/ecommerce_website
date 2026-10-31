// Safe to import from client components (no Supabase access here).

// Products with this status can't be bought; matched case-insensitively.
export function isOutOfStock(product: { status: string | null }): boolean {
  return product.status?.trim().toLowerCase() === "out of stock";
}
