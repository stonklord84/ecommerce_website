import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProduct, getProductSlugs } from "@/lib/products";
import { site } from "@/lib/site";

// Re-fetch from Supabase at most once an hour. Products added after a build
// are rendered on their first visit; unknown slugs return a 404.
export const revalidate = 3600;

// Pre-build a page for every product that exists in Supabase at build time.
export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return {
    title: product.seo_title ?? product.name,
    description:
      product.description ??
      `${product.name} — ${product.collection.description} Hand-rolled hems, designed in Ontario, Canada.`,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.seo_title ?? product.name,
    description: product.description ?? product.collection.description,
    ...(product.image_urls.length > 0 && { image: product.image_urls }),
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      url: `${site.url}/products/${product.slug}`,
      price: product.price_cad.toFixed(2),
      priceCurrency: "CAD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetail product={product} />
    </>
  );
}
