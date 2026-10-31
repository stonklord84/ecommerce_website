import Link from "next/link";
import { isOutOfStock, type ProductWithCollection } from "@/lib/products";
import AnnouncementBar from "./AnnouncementBar";
import BuyButton from "./BuyButton";
import Footer from "./Footer";
import Header from "./Header";
import Price from "./Price";
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

            {collection.product_spec?.trim() && <ProductSpec spec={collection.product_spec} />}

            <p className="mb-6 font-serif text-[26px] font-semibold text-gold"><Price product={product} /></p>

            {!isOutOfStock(product) && (
              <>
                <BuyButton slug={product.slug} />
                <p className="mt-4 text-[12px] text-muted">
                  Free returns within 60 days of delivery.{" "}
                  <Link href="/returns" className="border-b border-line transition duration-300 ease-silk hover:text-gold">
                    Return policy
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Renders collections.product_spec: "Label: value" lines become label/value rows,
// lines without a colon (e.g. "Comes with a matching packing set") are shown as-is.
function ProductSpec({ spec }: { spec: string }) {
  const lines = spec
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <details className="group mb-8 border-b border-line pb-6">
      <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[3px] text-ink transition duration-300 ease-silk hover:text-gold [&::-webkit-details-marker]:hidden">
        Product Details
        <span aria-hidden="true" className="text-base font-normal text-gold transition duration-300 ease-silk group-open:rotate-45">
          +
        </span>
      </summary>
      <ul className="mt-5 space-y-3 text-sm leading-[1.7]">
        {lines.map((line, i) => {
          const colon = line.indexOf(":");
          if (colon === -1) {
            return (
              <li key={i} className="text-muted">
                {line}
              </li>
            );
          }
          return (
            <li key={i} className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-4">
              <span className="text-[11px] uppercase tracking-[2px] text-ink">{line.slice(0, colon).trim()}</span>
              <span className="text-muted">{line.slice(colon + 1).trim()}</span>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
