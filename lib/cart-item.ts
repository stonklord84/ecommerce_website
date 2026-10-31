// Shared by the browser cart (lib/cart.ts) and /api/checkout, which validates against it.
export type CartItem = { slug: string; quantity: number };

export const MAX_QUANTITY = 10;
