"use client";

import { useEffect, useState } from "react";
import type { CartItem } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";

type CheckoutButtonProps = {
  items: CartItem[];
  label: string;
  // True when checking out the cart, so it's emptied after payment and
  // Stripe's back arrow returns to /cart.
  fromCart?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function CheckoutButton({ items, label, fromCart = false, disabled, className = "" }: CheckoutButtonProps) {
  const currency = useCurrency();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // Pressing Back from Stripe can restore this page from the browser's
  // back-forward cache, still showing "Redirecting…". Reset it when that happens.
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => {
      if (e.persisted) setStatus("idle");
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  async function handleCheckout() {
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, currency, fromCart }),
      });
      const { url, error } = await res.json();
      if (!res.ok || !url) {
        // Out-of-stock and removed-product errors are written for shoppers.
        setError(res.status === 404 || res.status === 409 ? error : null);
        throw new Error();
      }
      // Go to Stripe's hosted payment page.
      window.location.href = url;
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleCheckout}
        disabled={disabled || status === "loading" || items.length === 0}
        className="w-full cursor-pointer bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-[2px] text-white transition duration-300 ease-silk hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Redirecting…" : label}
      </button>
      {status === "error" && (
        <p role="alert" className="mt-3 text-[13px] text-muted">
          {error ?? "Something went wrong starting checkout. Please try again."}
        </p>
      )}
    </div>
  );
}
