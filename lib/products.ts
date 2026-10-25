import "server-only";
import { cache } from "react";
import { PRODUCT_IMAGES_BUCKET, supabase } from "./supabase";

// Mirrors the tables in supabase/schema.sql.
export type Collection = {
  id: number;
  slug: string;
  name: string;
  description: string;
  specs: { label: string; value: string }[];
  product_spec: string | null;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  seo_title: string | null;
  description: string | null;
  price_cad: number;
  price_usd: number;
  // Badge text on product cards, e.g. "Out of Stock"; no badge when empty.
  status: string | null;
  // Full URLs of the product's photos, in display order. [0] is the main image.
  image_urls: string[];
};

// Products with this status can't be bought; matched case-insensitively.
export function isOutOfStock(product: Pick<Product, "status">): boolean {
  return product.status?.trim().toLowerCase() === "out of stock";
}

export type CollectionWithProducts =Collection & { products: Product[] };
export type ProductWithCollection = Product & { collection: Collection };

type ProductRow = Omit<Product, "image_urls"> & { image_path: string | null };

// image_path holds one or more file names from the product-images bucket,
// separated by commas, e.g. "noir-1.png, noir-2.png" (surrounding { } are ignored).
function toImageUrls(imagePath: string | null): string[] {
  if (!imagePath) return [];
  return imagePath
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(name).data.publicUrl);
}

function toProduct({ image_path, ...row }: ProductRow): Product {
  return {
    ...row,
    // Postgres numeric can arrive as a string; normalise to numbers.
    price_cad: Number(row.price_cad),
    price_usd: Number(row.price_usd),
    image_urls: toImageUrls(image_path),
  };
}

// Wrapped in React's cache() so generateMetadata and the page share one query per request.
export const getCollections = cache(async (): Promise<CollectionWithProducts[]> => {
  const { data, error } = await supabase
    .from("collections")
    .select("*, products(*)")
    .order("sort_order")
    .order("sort_order", { referencedTable: "products" });

  if (error) throw new Error(`Failed to load collections: ${error.message}`);

  return data.map((c) => ({ ...c, products: (c.products as ProductRow[]).map(toProduct) }));
});

export const getProduct = cache(async (slug: string): Promise<ProductWithCollection | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, collection:collections(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(`Failed to load product "${slug}": ${error.message}`);
  if (!data) return null;

  const { collection, ...row } = data;
  return { ...toProduct(row as ProductRow), collection: collection as Collection };
});

export async function getProductSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("products").select("slug");
  if (error) throw new Error(`Failed to load product slugs: ${error.message}`);
  return data.map((p) => p.slug as string);
}
