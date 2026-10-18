"use client";

import { useSyncExternalStore } from "react";

// The shopper's chosen display/checkout currency, remembered in localStorage
// and shared by every component that calls useCurrency().
export type Currency = "cad" | "usd";

const STORAGE_KEY = "currency";
const listeners = new Set<() => void>();

function read(): Currency {
  try {
    return localStorage.getItem(STORAGE_KEY) === "usd" ? "usd" : "cad";
  } catch {
    return "cad";
  }
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
