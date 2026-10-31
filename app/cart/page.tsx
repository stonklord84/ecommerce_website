import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartView from "@/components/CartView";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getCollections } from "@/lib/products";

export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false },
};

// Re-fetch products from Supabase at most once an hour.
export const revalidate = 3600;

// The cart itself lives in the browser (lib/cart.ts); this page supplies current
// product details and prices for whatever is in it.
export default async function CartPage() {
  const products = (await getCollections()).flatMap((c) => c.products);

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[1080px] px-6 py-[70px]">
        <h1 className="mb-10 text-center font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px] sm:text-[42px]">
          Your Cart
        </h1>
        <CartView products={products} />
      </main>
      <Footer />
    </>
  );
}
