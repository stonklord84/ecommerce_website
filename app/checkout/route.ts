import type { NextRequest } from "next/server";
import { MAX_QUANTITY } from "@/lib/cart-item";
import { type CheckoutLine, type Currency, createCheckoutSession, isCurrency } from "@/lib/checkout";
import { getProductsByFacebookIds, isOutOfStock } from "@/lib/products";

// The Facebook Shop's checkout URL (set in Commerce Manager → Settings → Shop details).
// When a buyer taps Buy, Meta sends them here as
//   /checkout?products=4589272928:1,4589280467:2&coupon=CODE
// where each ID is the product's Content ID in the Facebook catalog. We match those
// to Supabase products by facebook_id and send the buyer straight to Stripe.
// Anything we can't sell (missing/unknown IDs, out of stock) lands on the site instead.

// "4589272928:1,4589280467:2" → Map { "4589272928" → 1, "4589280467" → 2 }
function parseProducts(param: string | null): Map<string, number> {
  const quantities = new Map<string, number>();
  for (const entry of (param ?? "").split(",")) {
    const [rawId, rawQuantity] = entry.split(":");
    const id = rawId?.trim();
    if (!id) continue;
    const quantity = Number.parseInt(rawQuantity ?? "", 10);
    const safe = Number.isInteger(quantity) && quantity >= 1 ? quantity : 1;
    quantities.set(id, Math.min((quantities.get(id) ?? 0) + safe, MAX_QUANTITY));
  }
  return quantities;
}

// Same rule as proxy.ts: a saved choice wins, else Canada → CAD, everywhere else → USD.
function pickCurrency(request: NextRequest): Currency {
  const saved = request.cookies.get("currency")?.value;
  if (isCurrency(saved)) return saved;
  const country = request.headers.get("x-vercel-ip-country");
  if (country) return country === "CA" ? "cad" : "usd";
  return "cad";
}

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const home = Response.redirect(`${origin}/`, 307);

  const quantities = parseProducts(request.nextUrl.searchParams.get("products"));
  if (quantities.size === 0) return home;

  let products;
  try {
    products = await getProductsByFacebookIds([...quantities.keys()]);
  } catch (error) {
    console.error("Facebook checkout: product lookup failed", error);
    return home;
  }

  const lines: CheckoutLine[] = products
    .filter((product) => !isOutOfStock(product))
    .map((product) => ({ product, quantity: quantities.get(product.facebook_id)! }));

  if (lines.length === 0) {
    // Known but out of stock: show its product page (with the badge) rather than the homepage.
    return products.length > 0 ? Response.redirect(`${origin}/products/${products[0].slug}`, 307) : home;
  }

  let url: string;
  try {
    url = await createCheckoutSession({
      lines,
      currency: pickCurrency(request),
      origin,
      successUrl: `${origin}/checkout/success`,
      // Stripe's back arrow returns to the (first) product's page on the site.
      cancelUrl: `${origin}/products/${lines[0].product.slug}`,
    });
  } catch (error) {
    console.error("Facebook checkout: Stripe session failed", error);
    return Response.redirect(`${origin}/products/${lines[0].product.slug}`, 307);
  }

  // 303 so the browser always follows with a plain GET to Stripe.
  return Response.redirect(url, 303);
}
