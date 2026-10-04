import Link from "next/link";
import { formatPrice } from "@/lib/price";
import type { ProductWithCollection } from "@/lib/products";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import Header from "./Header";
import ProductGallery from "./ProductGallery";

type ProductDetailProps = {
  product: ProductWithCollection;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const { collection } = product;

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[1280px] px-6 py-[70px]">
        <nav aria-label="Breadcrumb" className="mb-8 text-[11px] uppercase tracking-[2px] text-muted">
          <Link href="/#collections" className="transition duration-300 ease-silk hover:text-gold">
            Collections
          </Link>
          <span className="mx-2">/</span>
          <span>{collection.name}</span>
        </nav>

        <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-[60px]">
          <div className="border border-line bg-white p-[18px]">
            <ProductGallery images={product.image_urls} alt={product.name} />
          </div>

          <div className="flex flex-col">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[3px] text-gold">
              {collection.name} Collection
            </p>
            <h1 className="mb-6 font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px] sm:text-[42px]">
              {product.name}
            </h1>

            <div className="mb-8 space-y-4 border-y border-line py-6 text-sm leading-[1.7] text-muted">
              <p>
                {product.description ??
                  `Product description coming soon. This space will describe the pattern, colours, and story behind the ${product.name} scarf.`}
              </p>
              <p>{collection.description}</p>
            </div>

            <p className="mb-6 font-serif text-[26px] font-semibold text-gold">{formatPrice(product)}</p>

            <button
              type="button"
              className="cursor-pointer bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-[2px] text-white transition duration-300 ease-silk hover:bg-gold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
