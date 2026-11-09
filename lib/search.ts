import "server-only";
import { getCollections, type ProductWithCollection } from "./products";

// Lowercase and strip accents, so "lumiere" matches "Lumière".
function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// The catalogue is small, so we load it (one Supabase query) and filter in memory.
// Every word in the query must appear somewhere in the product's text; products whose
// name matches rank above those that only match on description or collection.
export async function searchProducts(query: string, limit?: number): Promise<ProductWithCollection[]> {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const collections = await getCollections();
  const scored: { product: ProductWithCollection; score: number }[] = [];

  for (const { products, ...collection } of collections) {
    for (const product of products) {
      const name = normalize(product.name);
      const text = normalize(
        [product.name, product.seo_title, product.description, collection.name, collection.description]
          .filter(Boolean)
          .join(" "),
      );
      if (!words.every((w) => text.includes(w))) continue;

      const score = words.filter((w) => name.includes(w)).length;
      scored.push({ product: { ...product, collection }, score });
    }
  }

  // Array.prototype.sort is stable, so equal scores keep the collection order.
  scored.sort((a, b) => b.score - a.score);
  const results = scored.map((s) => s.product);
  return limit ? results.slice(0, limit) : results;
}
