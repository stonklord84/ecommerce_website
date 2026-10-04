"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/price";
import type { CollectionWithProducts } from "@/lib/products";
import BespokePanel from "./BespokePanel";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

type CollectionsProps = {
  collections: CollectionWithProducts[];
};

export default function Collections({ collections }: CollectionsProps) {
  const [active, setActive] = useState(0);
  const tabs = [...collections.map((c) => c.name), "Atelier Bespoke"];
  const collection = collections[active];
  const lowestPriced = collection?.products.reduce(
    (min, p) => (p.price_cad < min.price_cad ? p : min),
    collection.products[0],
  );

  return (
    <section id="collections" className="mx-auto max-w-[1280px] px-6 py-[70px]">
      <SectionHeader
        eyebrow="Curated Collections"
        title="Four Expressions of Style & Atelier Bespoke"
      />

      <div role="tablist" className="mb-[30px] flex flex-wrap justify-center gap-2.5">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`cursor-pointer rounded-[2px] border px-[18px] py-2.5 text-xs uppercase tracking-[1px] transition duration-300 ease-silk ${
              i === active ? "border-gold bg-gold text-white" : "border-line bg-white"
            }`}
          >
            {i + 1}. {tab}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {!collection ? (
          <BespokePanel />
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded border border-line bg-white px-5 py-4">
              <div className="flex flex-wrap gap-5 text-xs text-muted">
                {collection.specs.map((spec) => (
                  <div key={spec.label}>
                    {spec.label}:<strong className="ml-1 text-ink">{spec.value}</strong>
                  </div>
                ))}
              </div>
              {lowestPriced && (
                <div className="font-serif text-[22px] font-semibold text-gold">
                  {formatPrice(lowestPriced)}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {collection.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  description={collection.description}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
