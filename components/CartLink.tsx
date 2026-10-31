"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

// The shopping bag in the header, with the number of items in the cart.
export default function CartLink() {
  const count = useCart().reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`} className="relative">
      🛍️
      {count > 0 && (
        <span className="absolute -right-2 -top-2 rounded-full bg-forest px-[5px] py-0.5 text-[9px] leading-none text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
