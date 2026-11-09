import { searchProducts } from "@/lib/search";

// Powers the live suggestions in the header search box (components/SearchButton.tsx).
export async function GET(request: Request) {
  const q = (new URL(request.url).searchParams.get("q") ?? "").slice(0, 100);
  const products = await searchProducts(q, 6);

  return Response.json({
    results: products.map((p) => ({
      slug: p.slug,
      name: p.name,
      collection: p.collection.name,
      image: p.image_urls[0] ?? null,
      price_cad: p.price_cad,
      price_usd: p.price_usd,
    })),
  });
}
