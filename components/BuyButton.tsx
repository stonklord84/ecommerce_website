"use client";

import { useEffect, useState } from "react";
import { useCurrency } from "@/lib/currency";

type BuyButtonProps = {
  slug: string;
};

export default function BuyButton({ slug }: BuyButtonProps) {
  const currency = useCurrency();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  // Pressing Back from Stripe can restore this page from the browser's
  // back-forward cache, still showing "Redirecting…". Reset it when that happens.
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => {
      if (e.persisted) setStatus("idle");
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  async function handleBuy() {
    setStatus("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, currency }),
      });
      const { url } = await res.json();
      if (!res.ok || !url) throw new Error();
      // Go to Stripe's hosted payment page.
      window.location.href = url;
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleBuy}
        disabled={status === "loading"}
        className="cursor-pointer bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-[2px] text-white transition duration-300 ease-silk hover:bg-gold disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? "Redirecting…" : "Buy Now"}
      </button>
      {status === "error" && (
        <p role="alert" className="mt-3 text-[13px] text-muted">
          Something went wrong starting checkout. Please try again.
        </p>
      )}
    </>
  );
}
