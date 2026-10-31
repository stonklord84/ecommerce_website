"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { MAX_QUANTITY, removeFromCart, setQuantity, useCart, useCartLoaded } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { isOutOfStock } from "@/lib/stock";
import CheckoutButton from "./CheckoutButton";
import Price from "./Price";
import ProductImage from "./ProductImage";

type CartViewProps = {
  // Every product on the site, so the cart shows current prices and stock.
  products: Product[];
};

const qtyButton =
  "flex h-8 w-8 cursor-pointer items-center justify-center text-base transition duration-300 hover:text-gold disabled:cursor-not-allowed disabled:opacity-30";

export default function CartView({ products }: CartViewProps) {
  const cart = useCart();
  const loaded = useCartLoaded();
  const { ready: authReady, user } = useAuth();

  // Items whose product was deleted from Supabase are left out.
  const lines = cart.flatMap((item) => {
    const product = products.find((p) => p.slug === item.slug);
    return product ? [{ ...item, product }] : [];
  });
  const soldOut = lines.filter((line) => isOutOfStock(line.product));
  const subtotal = lines.reduce(
    (sum, { product, quantity }) => ({
      price_cad: sum.price_cad + product.price_cad * quantity,
      price_usd: sum.price_usd + product.price_usd * quantity,
    }),
    { price_cad: 0, price_usd: 0 },
  );
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);

  if (!loaded) return null;

  if (lines.length === 0) {
    return (
      <div className="text-center">
        <p className="mb-8 text-sm text-muted">Your cart is empty.</p>
        <Link
          href="/#collections"
          className="inline-block bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-[2px] text-white transition duration-300 ease-silk hover:bg-gold"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_340px]">
      <ul className="divide-y divide-line border-y border-line">
        {lines.map(({ slug, quantity, product }) => (
          <li key={slug} className="flex gap-5 py-6">
            <Link href={`/products/${slug}`} className="w-24 shrink-0 sm:w-28">
              <ProductImage src={product.image_urls[0] ?? null} alt={product.name} sizes="112px" />
            </Link>

            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <Link href={`/products/${slug}`} className="font-serif text-lg font-semibold hover:text-gold">
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted">
                    <Price product={product} /> each
                  </p>
                  {isOutOfStock(product) && (
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[1px] text-[#9b3b2f]">
                      Out of Stock
                    </p>
                  )}
                </div>
                <p className="font-serif text-lg font-semibold text-gold">
                  <Price
                    product={{ price_cad: product.price_cad * quantity, price_usd: product.price_usd * quantity }}
                  />
                </p>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex items-center border border-line bg-white" role="group" aria-label={`Quantity of ${product.name}`}>
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(slug, quantity - 1)}
                    className={qtyButton}
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={quantity >= MAX_QUANTITY}
                    onClick={() => setQuantity(slug, quantity + 1)}
                    className={qtyButton}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(slug)}
                  className="cursor-pointer text-[11px] uppercase tracking-[1px] text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  Remove
                </button>
              </div>
              {quantity >= MAX_QUANTITY && (
                <p className="text-[11px] text-muted">Maximum of {MAX_QUANTITY} per item.</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="border border-line bg-white p-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted">
            Subtotal ({count} {count === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold">
            <Price product={subtotal} />
          </span>
        </div>
        <p className="mb-6 text-[12px] text-muted">Shipping and promo codes are applied at checkout.</p>
        <CheckoutButton
          items={lines.map(({ slug, quantity }) => ({ slug, quantity }))}
          label="Proceed to Checkout"
          fromCart
          disabled={soldOut.length > 0}
        />
        {soldOut.length > 0 && (
          <p className="mt-3 text-[13px] text-[#9b3b2f]">
            Please remove sold-out items to continue.
          </p>
        )}
        {authReady && !user && (
          <p className="mt-5 border-t border-line pt-5 text-center text-[12px] text-muted">
            <Link href="/account" className="border-b border-gold text-ink">
              Sign in
            </Link>{" "}
            to save your cart across devices.
          </p>
        )}
      </div>
    </div>
  );
}
