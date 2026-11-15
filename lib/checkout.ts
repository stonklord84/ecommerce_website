import "server-only";
import type { Product } from "./products";
import { stripe } from "./stripe";

export type Currency = "cad" | "usd";

export function isCurrency(value: unknown): value is Currency {
  return value === "cad" || value === "usd";
}

export type CheckoutLine = { product: Product; quantity: number };

// Creates a Stripe Checkout page for already-validated products and returns its URL.
// Shared by /api/checkout (Buy Now and the cart) and /checkout (the Facebook Shop).
// Prices always come from Supabase (via the products passed in), never from the browser.
export async function createCheckoutSession({
  lines,
  currency,
  origin,
  successUrl,
  cancelUrl,
}: {
  lines: CheckoutLine[];
  currency: Currency;
  origin: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    // Stripe's default English shows CAD as "CA$" but USD as a bare "$".
    // en-GB labels both ("CA$49.00" / "US$35.00"), so the currency is never ambiguous.
    locale: "en-GB",
    line_items: lines.map(({ product, quantity }) => ({
      quantity,
      price_data: {
        currency,
        // Stripe takes amounts in cents.
        unit_amount: Math.round((currency === "usd" ? product.price_usd : product.price_cad) * 100),
        product_data: {
          name: product.name,
          ...(product.image_urls.length > 0 && { images: [product.image_urls[0]] }),
        },
      },
    })),
    shipping_address_collection: { allowed_countries: ["CA", "US"] },
    adaptive_pricing: { enabled: false },
    // Shows Stripe's "Add promotion code" field (e.g. FBGIFT).
    allow_promotion_codes: true,
    // Shown under the Pay button.
    custom_text: {
      submit: { message: `Free returns within 60 days of delivery. Return policy: ${origin}/returns` },
    },
    // e.g. "noir x2, spring-bloom x1"; shown on the payment in the Stripe Dashboard.
    metadata: {
      items: lines
        .map(({ product, quantity }) => `${product.slug} x${quantity}`)
        .join(", ")
        .slice(0, 500),
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  return session.url;
}
