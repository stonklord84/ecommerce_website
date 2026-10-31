import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartCheckoutButton from "@/components/CartCheckoutButton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Price from "@/components/Price";
import ProductImage from "@/components/ProductImage";
import { getProduct } from "@/lib/products";

export const metadata: Metadata = {
  title: "Added to Cart",
  robots: { index: false },
};

// Shown after "Add to Cart" (/cart/added?item=<slug>). The item is already in
// the cart by the time this page loads; this just confirms it.
export default async function AddedToCartPage({ searchParams }: PageProps<"/cart/added">) {
  const { item } = await searchParams;
  const product = typeof item === "string" ? await getProduct(item) : null;
  if (!product) redirect("/cart");

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[560px] px-6 py-[70px]">
        <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[3px] text-gold">
          ✓ Added to Cart
        </p>

        <div className="mb-10 flex items-center gap-5 border-y border-line py-6">
          <div className="w-24 shrink-0">
            <ProductImage src={product.image_urls[0] ?? null} alt={product.name} sizes="96px" />
          </div>
          <div>
            <p className="font-serif text-xl font-semibold">{product.name}</p>
            <p className="text-sm text-gold">
              <Price product={product} />
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <CartCheckoutButton />
          <Link
            href="/cart"
            className="block border border-ink bg-white px-6 py-4 text-center text-xs font-semibold uppercase tracking-[2px] text-ink transition duration-300 ease-silk hover:bg-ink hover:text-white"
          >
            Go to Cart
          </Link>
          <Link
            href="/#collections"
            className="block pt-3 text-center text-[11px] uppercase tracking-[2px] text-muted transition duration-300 ease-silk hover:text-gold"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
