"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Price from "./Price";
import ProductImage from "./ProductImage";

type Suggestion = {
  slug: string;
  name: string;
  collection: string;
  image: string | null;
  price_cad: number;
  price_usd: number;
};

// The header magnifier: opens a search bar with live suggestions (from /api/search);
// pressing Enter goes to the full results page at /search?q=...
export default function SearchButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const q = query.trim();

  // Fetch suggestions 200ms after the visitor stops typing; drop stale responses.
  useEffect(() => {
    if (!q) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        if (res.ok) setResults((await res.json()).results);
      } catch {
        // Aborted or offline: keep the previous suggestions.
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [q]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
    setResults([]);
  }

  const shown = q ? results : [];

  return (
    <>
      <button type="button" aria-label="Search" onClick={() => setOpen(true)} className="cursor-pointer">
        🔍
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30" onClick={close} aria-hidden />
          <div
            role="dialog"
            aria-label="Search products"
            className="relative mx-auto mt-0 w-full max-w-[640px] bg-white px-5 pb-5 pt-5 shadow-xl sm:mt-16 sm:rounded"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!q) return;
                router.push(`/search?q=${encodeURIComponent(q)}`);
                close();
              }}
              className="flex items-center gap-3 border-b border-line pb-3"
            >
              <span aria-hidden>🔍</span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scarves, collections…"
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none"
              />
              <button
                type="button"
                onClick={close}
                className="cursor-pointer text-[11px] uppercase tracking-[2px] text-muted hover:text-gold"
              >
                Close
              </button>
            </form>

            {q && (
              <div className="pt-3">
                {shown.length > 0 ? (
                  <ul>
                    {shown.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/products/${p.slug}`}
                          onClick={close}
                          className="flex items-center gap-4 rounded px-2 py-2 hover:bg-cream"
                        >
                          <div className="w-14 shrink-0">
                            <ProductImage src={p.image} alt={p.name} sizes="56px" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-serif text-base font-semibold">{p.name}</p>
                            <p className="truncate text-xs text-muted">{p.collection}</p>
                          </div>
                          <div className="shrink-0 text-xs text-gold">
                            <Price product={p} />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-2 py-3 text-sm text-muted">{loading ? "Searching…" : "No matching pieces."}</p>
                )}
                <Link
                  href={`/search?q=${encodeURIComponent(q)}`}
                  onClick={close}
                  className="mt-3 block border-t border-line px-2 pt-3 text-[11px] uppercase tracking-[2px] text-ink hover:text-gold"
                >
                  See all results for &ldquo;{q}&rdquo; →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
