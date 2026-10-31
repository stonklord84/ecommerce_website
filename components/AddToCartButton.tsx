"use client";

import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/cart";

type AddToCartButtonProps = {
  slug: string;
};

// Adds one of the product to the cart, then shows the "Added to cart" page.
export default function AddToCartButton({ slug }: AddToCartButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        addToCart(slug);
        router.push(`/cart/added?item=${encodeURIComponent(slug)}`);
      }}
      className="w-full cursor-pointer border border-ink bg-white px-6 py-4 text-xs font-semibold uppercase tracking-[2px] text-ink transition duration-300 ease-silk hover:bg-ink hover:text-white"
    >
      Add to Cart
    </button>
  );
}
