import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/lib/search";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw ?? "").trim().slice(0, 100);
  const results = q ? await searchProducts(q) : [];

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[1280px] px-6 py-[70px]">
        <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[3px] text-gold">Search</p>
        <h1 className="mb-8 text-center font-serif text-[30px] font-normal uppercase leading-[1.15] tracking-[2px] sm:text-[38px]">
          {q ? <>Results for &ldquo;{q}&rdquo;</> : "Search Our Silks"}
        </h1>

        <form action="/search" className="mx-auto mb-12 flex max-w-[520px] gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search scarves, collections…"
            aria-label="Search products"
            className="min-w-0 flex-1 rounded border border-line-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <button
            type="submit"
            className="cursor-pointer rounded bg-ink px-5 text-[11px] font-semibold uppercase tracking-[2px] text-white transition duration-300 ease-silk hover:bg-gold"
          >
            Search
          </button>
        </form>

        {q && results.length > 0 && (
          <>
            <p className="mb-6 text-center text-xs text-muted">
              {results.length} {results.length === 1 ? "piece" : "pieces"} found
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} description={product.collection.description} />
              ))}
            </div>
          </>
        )}

        {q && results.length === 0 && (
          <div className="text-center text-sm text-muted">
            <p className="mb-4">No pieces match &ldquo;{q}&rdquo;. Try a different word, or browse our collections.</p>
            <Link href="/#collections" className="border-b border-gold text-ink">
              View all collections
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
