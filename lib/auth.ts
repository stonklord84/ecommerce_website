"use client";

import type { User } from "@supabase/supabase-js";
import { useSyncExternalStore } from "react";
import { clearLocalCart, loadAccountCart, mergeCartIntoAccount } from "./cart";
import { supabaseBrowser } from "./supabase-browser";

// Customer accounts (Supabase Auth, email + password). useAuth() gives every
// component the signed-in user; the functions below wrap Supabase's auth calls
// and keep the saved cart (lib/cart.ts) in step with signing in and out.

type AuthState = {
  // False until Supabase has checked for a saved session, so pages don't
  // briefly show "signed out" to someone who is signed in.
  ready: boolean;
  user: User | null;
};

const SIGNED_OUT: AuthState = { ready: false, user: null };
let state: AuthState = SIGNED_OUT;
const listeners = new Set<() => void>();
let started = false;

function start() {
  if (started) return;
  started = true;
  supabaseBrowser.auth.onAuthStateChange((event, session) => {
    state = { ready: true, user: session?.user ?? null };
    listeners.forEach((listener) => listener());

    // Supabase warns against awaiting its own calls inside this callback, hence setTimeout.
    // INITIAL_SESSION fires once per page load, including right after following an
    // email-confirmation link.
    const userId = session?.user.id;
    if (event === "INITIAL_SESSION" && userId) setTimeout(() => loadAccountCart(userId), 0);
  });
}

function subscribe(listener: () => void) {
  start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useAuth(): AuthState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => SIGNED_OUT,
  );
}

// Each returns an error message for the customer, or null on success.

export async function signIn(email: string, password: string): Promise<string | null> {
  const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
  if (error) return error.message;
  await mergeCartIntoAccount(data.user.id);
  return null;
}

// "confirm" means Supabase emailed a confirmation link and the customer isn't signed in yet.
export async function signUp(
  email: string,
  password: string,
): Promise<{ error: string | null; confirm: boolean }> {
  const { data, error } = await supabaseBrowser.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${window.location.origin}/account` },
  });
  if (error) return { error: error.message, confirm: false };
  if (data.session) {
    await mergeCartIntoAccount(data.session.user.id);
    return { error: null, confirm: false };
  }
  return { error: null, confirm: true };
}

export async function signOut() {
  await supabaseBrowser.auth.signOut();
  clearLocalCart();
}

export async function sendPasswordReset(email: string): Promise<string | null> {
  const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/account/update-password`,
  });
  return error?.message ?? null;
}

export async function updatePassword(password: string): Promise<string | null> {
  const { error } = await supabaseBrowser.auth.updateUser({ password });
  return error?.message ?? null;
}
