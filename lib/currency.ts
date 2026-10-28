"use client";

import { useSyncExternalStore } from "react";

// The shopper's chosen display/checkout currency, remembered in localStorage
// and shared by every component that calls useCurrency(). Until they pick one,
// the "currency" cookie set by proxy.ts from their country is used.
export type Currency = "cad" | "usd";

const STORAGE_KEY = "currency";
const COOKIE_NAME = "currency";
const listeners = new Set<() => void>();

function toCurrency(value: string | null | undefined): Currency | null {
  return value === "cad" || value === "usd" ? value : null;
}

function readCookie(): Currency | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return toCurrency(match?.[1]);
}

function read(): Currency {
  let saved: Currency | null = null;
  try {
    saved = toCurrency(localStorage.getItem(STORAGE_KEY));
  } catch {
    // Storage blocked: fall through to the cookie.
  }
  return saved ?? readCookie() ?? "cad";
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

export function setCurrency(currency: Currency) {
  try {
    localStorage.setItem(STORAGE_KEY, currency);
  } catch {
    // Storage blocked (e.g. private mode): the choice just won't be remembered.
  }
  listeners.forEach((listener) => listener());
}

// Pages are pre-rendered in CAD; the saved choice applies right after load.
export function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, read, () => "cad");
}
