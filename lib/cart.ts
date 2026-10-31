"use client";

import { useSyncExternalStore } from "react";
import { type CartItem, MAX_QUANTITY } from "./cart-item";
import { supabaseBrowser } from "./supabase-browser";

// The shopping cart, remembered in localStorage and shared by every component
// that calls useCart(). Only slugs and quantities are stored; prices and stock
// always come from Supabase (on the cart page and in /api/checkout).
// When a customer is signed in, every change is also saved to their account
// (the carts table), so the cart follows them to other devices.
export { type CartItem, MAX_QUANTITY };

const STORAGE_KEY = "cart";
const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();

// useSyncExternalStore needs the same array back until the cart actually changes.
let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY;

function isCartItem(value: unknown): value is CartItem {
  const item = value as CartItem;
  return (
    typeof item?.slug === "string" &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1 &&
    item.quantity <= MAX_QUANTITY
  );
}

function read(): CartItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked: treat the cart as empty.
  }
  if (raw === cachedRaw) return cachedItems;

  cachedRaw = raw;
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    cachedItems = Array.isArray(parsed) ? parsed.filter(isCartItem) : EMPTY;
  } catch {
    cachedItems = EMPTY;
  }
  return cachedItems;
}

function writeLocal(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage blocked (e.g. private mode): the cart just won't be remembered.
  }
  listeners.forEach((listener) => listener());
}

function write(items: CartItem[]) {
  writeLocal(items);
  saveToAccount();
}

// ─── Account sync ──────────────────────────────────────────────────────────

// Saves run one after another, each sending the cart as it is at that moment,
// so quick clicks can't land out of order and leave an older cart saved.
let saving = Promise.resolve();

function saveToAccount() {
  saving = saving.then(async () => {
    const { data } = await supabaseBrowser.auth.getSession();
    const userId = data.session?.user.id;
    if (!userId) return;
    const { error } = await supabaseBrowser
      .from("carts")
      .upsert({ user_id: userId, items: read(), updated_at: new Date().toISOString() });
    if (error) console.error("Couldn't save cart to account:", error.message);
  });
}

async function fetchAccountCart(userId: string): Promise<CartItem[] | null> {
  const { data, error } = await supabaseBrowser.from("carts").select("items").eq("user_id", userId).maybeSingle();
  if (error) {
    console.error("Couldn't load cart from account:", error.message);
    return null;
  }
  const items: unknown = data?.items ?? [];
  return Array.isArray(items) ? items.filter(isCartItem) : [];
}

// Combines two carts; quantities of the same item add up (still capped at MAX_QUANTITY).
function mergeCarts(a: CartItem[], b: CartItem[]): CartItem[] {
  const merged = a.map((item) => ({ ...item }));
  for (const item of b) {
    const existing = merged.find((m) => m.slug === item.slug);
    if (existing) existing.quantity = Math.min(existing.quantity + item.quantity, MAX_QUANTITY);
    else merged.push({ ...item });
  }
  return merged;
}

// Called right after signing in: anything added while signed out joins the account's cart.
export async function mergeCartIntoAccount(userId: string) {
  const saved = await fetchAccountCart(userId);
  if (saved === null) return;
  write(mergeCarts(saved, read()));
}

// Called on page load while signed in: the account's cart wins, so removing an item
// on one device removes it everywhere. If the account has no cart yet (e.g. a new
// account), the cart already in this browser is saved to it instead.
export async function loadAccountCart(userId: string) {
  const saved = await fetchAccountCart(userId);
  if (saved === null) return;
  if (saved.length > 0) writeLocal(saved);
  else if (read().length > 0) saveToAccount();
}

// Called on sign-out, after the session is gone, so the account's saved cart is kept
// and the next person on this device starts with an empty cart.
export function clearLocalCart() {
  writeLocal(EMPTY);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other open tabs in sync too.
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function addToCart(slug: string) {
  const items = read();
  const existing = items.find((item) => item.slug === slug);
  write(
    existing
      ? items.map((item) =>
          item.slug === slug ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) } : item,
        )
      : [...items, { slug, quantity: 1 }],
  );
}

export function setQuantity(slug: string, quantity: number) {
  const clamped = Math.min(Math.max(quantity, 1), MAX_QUANTITY);
  write(read().map((item) => (item.slug === slug ? { ...item, quantity: clamped } : item)));
}

export function removeFromCart(slug: string) {
  write(read().filter((item) => item.slug !== slug));
}

export function clearCart() {
  write(EMPTY);
}

// Pages are pre-rendered with an empty cart; the saved one applies right after load.
export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

// False during pre-rendering and the first render, so pages can avoid flashing
// "Your cart is empty" before the saved cart is read.
export function useCartLoaded(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

function noopSubscribe() {
  return () => {};
}
