import { type CartItem, MAX_QUANTITY } from "@/lib/cart-item";
import { type CheckoutLine, createCheckoutSession, isCurrency } from "@/lib/checkout";
import { getProduct, isOutOfStock } from "@/lib/products";

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
  const lines: CheckoutLine[] = [];
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
    lines.push({ product, quantity: items[i].quantity });
  }

  const origin = new URL(request.url).origin;

  const url = await createCheckoutSession({
    lines,
    currency,
    origin,
    // The success page empties the cart only when the cart is what got paid for.
    successUrl: `${origin}/checkout/success${fromCart ? "?from=cart" : ""}`,
    // Stripe's back arrow: the cart, or the product page for Buy Now.
    cancelUrl: fromCart ? `${origin}/cart` : `${origin}/products/${items[0].slug}`,
  });

  return Response.json({ url });
}
