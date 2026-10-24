import { getProduct } from "@/lib/products";
import { stripe } from "@/lib/stripe";

const currencies = ["cad", "usd"] as const;
type Currency = (typeof currencies)[number];

function isCurrency(value: unknown): value is Currency {
  return currencies.includes(value as Currency);
}

// Called by the Buy Now button. Creates a Stripe Checkout page for one product
// and returns its URL; the browser then redirects there.
export async function POST(request: Request) {
  const { slug, currency } = (await request.json()) as { slug?: string; currency?: string };

  if (!slug || !isCurrency(currency)) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  // The price always comes from Supabase, never from the browser.
  const product = await getProduct(slug);
  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const price = currency === "usd" ? product.price_usd : product.price_cad;
  const origin = new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    // Stripe's default English shows CAD as "CA$" but USD as a bare "$".
    // en-GB labels both ("CA$49.00" / "US$35.00"), so the currency is never ambiguous.
    locale: "en-GB",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          // Stripe takes amounts in cents.
          unit_amount: Math.round(price * 100),
          product_data: {
            name: product.name,
            ...(product.image_urls.length > 0 && { images: [product.image_urls[0]] }),
          },
        },
      },
    ],
    shipping_address_collection: { allowed_countries: ["CA", "US"] },
    // Shows Stripe's "Add promotion code" field (e.g. FBGIFT).
    allow_promotion_codes: true,
    metadata: { slug: product.slug },
    success_url: `${origin}/checkout/success`,
    cancel_url: `${origin}/products/${product.slug}`,
  });

  return Response.json({ url: session.url });
}
