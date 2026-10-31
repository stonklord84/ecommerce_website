"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, signUp, useAuth } from "@/lib/auth";
import { authStyles } from "./authStyles";

// /account: sign-in and create-account forms, or the account summary once signed in.
export default function AccountView() {
  const { ready, user } = useAuth();

  if (!ready) return null;

  if (user) {
    return (
      <div className="text-center">
        <p className="mb-2 text-sm text-muted">Signed in as</p>
        <p className="mb-8 font-serif text-xl">{user.email}</p>
        <p className="mb-8 text-[13px] leading-[1.6] text-muted">
          Your cart is saved to your account, so it&apos;s waiting for you on any device you sign in on.
        </p>
        <div className="space-y-3">
          <Link href="/cart" className={`block text-center ${authStyles.primary}`}>
            View Cart
          </Link>
          <button type="button" onClick={signOut} className={`w-full ${authStyles.secondary}`}>
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return <AuthForms />;
}

function AuthForms() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [status, setStatus] = useState<"idle" | "sending" | "confirm">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    if (mode === "signup" && password !== form.get("confirm")) {
      setError("Passwords don't match.");
      return;
    }

    setError(null);
    setStatus("sending");
    if (mode === "signin") {
      setError(await signIn(email, password));
      setStatus("idle");
    } else {
      const result = await signUp(email, password);
      setError(result.error);
      setStatus(result.confirm ? "confirm" : "idle");
    }
  }

  if (status === "confirm") {
    return (
      <p className="text-center text-sm leading-[1.7] text-muted">
        Almost there — we&apos;ve sent a confirmation link to your email. Open it to activate your account.
      </p>
    );
  }

  const switchTo = (next: "signin" | "signup") => {
    setMode(next);
    setError(null);
  };

  return (
    <>
      <div role="tablist" className="mb-8 grid grid-cols-2 border-b border-line">
        {(["signin", "signup"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={mode === tab}
            onClick={() => switchTo(tab)}
            className={`-mb-px cursor-pointer border-b-2 pb-3 text-[11px] font-semibold uppercase tracking-[2px] transition duration-300 ${
              mode === tab ? "border-gold text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-[18px]">
        <div>
          <label htmlFor="account-email" className={authStyles.label}>Email Address</label>
          <input id="account-email" name="email" type="email" required autoComplete="email" className={authStyles.field} />
        </div>
        <div>
          <label htmlFor="account-password" className={authStyles.label}>Password</label>
          <input
            id="account-password"
            name="password"
            type="password"
            required
            minLength={mode === "signup" ? 8 : undefined}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className={authStyles.field}
          />
          {mode === "signup" && <p className="mt-1.5 text-[11px] text-muted">At least 8 characters.</p>}
        </div>
        {mode === "signup" && (
          <div>
            <label htmlFor="account-confirm" className={authStyles.label}>Confirm Password</label>
            <input
              id="account-confirm"
              name="confirm"
              type="password"
              required
              autoComplete="new-password"
              className={authStyles.field}
            />
          </div>
        )}

        {error && (
          <p role="alert" className={authStyles.error}>
            {error}
          </p>
        )}

        <button type="submit" disabled={status === "sending"} className={`w-full ${authStyles.primary}`}>
          {status === "sending" ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>

        {mode === "signin" && (
          <p className="text-center">
            <Link href="/account/reset-password" className={authStyles.link}>
              Forgot your password?
            </Link>
          </p>
        )}
      </form>
    </>
  );
}
