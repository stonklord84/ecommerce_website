import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductImage from "./ProductImage";

type ProductCardProps = {
  product: Product;
  description: string;
};

export default function ProductCard({ product, description }: ProductCardProps) {
  const href = `/products/${product.slug}`;

  return (
    <div className="flex flex-col justify-between border border-line bg-white p-[18px] text-center">
      <div>
        <Link href={href} className="relative block">
          <ProductImage
            src={product.image_urls[0] ?? null}
            alt={product.name}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="mb-3.5"
          />
          {product.status && (
            <span className="absolute left-2.5 top-2.5 bg-ink px-2 py-1 text-[10px] uppercase tracking-[1px] text-white">
              {product.status}
            </span>
          )}
        </Link>
        <h4 className="mb-1.5 font-serif text-lg font-semibold">
          <Link href={href} className="hover:text-gold">
            {product.name}
          </Link>
        </h4>
        <p className="mb-3.5 text-xs text-muted">{description}</p>
      </div>
      <Link
        href={href}
        className="border border-ink px-3 py-2 text-[11px] uppercase tracking-[1px] transition duration-300 ease-silk hover:bg-ink hover:text-white"
      >
        Select Scarf
      </Link>
    </div>
  );
}
