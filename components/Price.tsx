"use client";

import { useCurrency } from "@/lib/currency";
import { formatPrice } from "@/lib/price";

type PriceProps = {
  product: { price_cad: number; price_usd: number };
};

// A product's price in the currency picked in the announcement bar.
export default function Price({ product }: PriceProps) {
  return <>{formatPrice(product, useCurrency())}</>;
}
