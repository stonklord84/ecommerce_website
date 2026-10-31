import { type CartItem, MAX_QUANTITY } from "@/lib/cart-item";
import { getProduct, isOutOfStock } from "@/lib/products";
import { stripe } from "@/lib/stripe";

const currencies = ["cad", "usd"] as const;
type Currency = (typeof currencies)[number];

function isCurrency(value: unknown): value is Currency {
  return currencies.includes(value as Currency);
}

// A non-empty list of distinct slugs, each with a quantity from 1 to MAX_QUANTITY.
function isValidItems(value: unknown): value is CartItem[] {
  if (!Array.isArray(value) || value.length === 0) return false;
  const slugs = value.map((item: CartItem) => item?.slug);
  return (
    new Set(slugs).size === slugs.length &&
    value.every(
      (item: CartItem) =>
        typeof item?.slug === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity >= 1 &&
        item.quantity <= MAX_QUANTITY,
    )
  );
}

// Called by the Buy Now button (one item) and the cart (every item in it).
// Creates a Stripe Checkout page and returns its URL; the browser then redirects there.
export async function POST(request: Request) {
  const { items, currency, fromCart } = (await request.json()) as {
    items?: unknown;
    currency?: string;
    fromCart?: boolean;
  };

  if (!isValidItems(items) || !isCurrency(currency)) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // Prices always come from Supabase, never from the browser.
  const products = await Promise.all(items.map((item) => getProduct(item.slug)));
  const lineItems = [];
  for (const [i, product] of products.entries()) {
    if (!product) {
      return Response.json(
        { error: "An item in your order is no longer available. Please remove it and try again." },
        { status: 404 },
      );
    }
    if (isOutOfStock(product)) {
      return Response.json(
        { error: `${product.name} is out of stock. Please remove it and try again.` },
        { status: 409 },
      );
    }

    const price = currency === "usd" ? product.price_usd : product.price_cad;
    lineItems.push({
      quantity: items[i].quantity,
      price_data: {
        currency,
        // Stripe takes amounts in cents.
        unit_amount: Math.round(price * 100),
        product_data: {
          name: product.name,
          ...(product.image_urls.length > 0 && { images: [product.image_urls[0]] }),
        },
      },
    });
  }

  const origin = new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    // Stripe's default English shows CAD as "CA$" but USD as a bare "$".
    // en-GB labels both ("CA$49.00" / "US$35.00"), so the currency is never ambiguous.
    locale: "en-GB",
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ["CA", "US"] },
    adaptive_pricing: { enabled: false },
    // Shows Stripe's "Add promotion code" field (e.g. FBGIFT).
    allow_promotion_codes: true,
    // Shown under the Pay button.
    custom_text: {
      submit: { message: `Free returns within 60 days of delivery. Return policy: ${origin}/returns` },
    },
    // e.g. "noir x2, spring-bloom x1"; shown on the payment in the Stripe Dashboard.
    metadata: { items: items.map((item) => `${item.slug} x${item.quantity}`).join(", ").slice(0, 500) },
    // The success page empties the cart only when the cart is what got paid for.
    success_url: `${origin}/checkout/success${fromCart ? "?from=cart" : ""}`,
    // Stripe's back arrow: the cart, or the product page for Buy Now.
    cancel_url: fromCart ? `${origin}/cart` : `${origin}/products/${items[0].slug}`,
  });

  return Response.json({ url: session.url });
}
