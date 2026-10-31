"use client";

import Link from "next/link";
import { useState } from "react";
import { updatePassword, useAuth } from "@/lib/auth";
import { authStyles } from "./authStyles";

// /account/update-password: where the password-reset email's link lands. Supabase
// signs the customer in from the link, then they choose a new password here.
export default function UpdatePasswordForm() {
  const { ready, user } = useAuth();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("password") !== form.get("confirm")) {
      setError("Passwords don't match.");
      return;
    }
    setStatus("sending");
    const message = await updatePassword(String(form.get("password")));
    setError(message);
    setStatus(message ? "idle" : "done");
  }

  if (!ready) return null;

  if (status === "done") {
    return (
      <div className="text-center">
        <p className="mb-8 text-sm leading-[1.7] text-muted">Your password has been updated.</p>
        <Link href="/account" className={`inline-block ${authStyles.primary}`}>
          Go to Your Account
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <p className="text-center text-sm leading-[1.7] text-muted">
        This link has expired or was already used.{" "}
        <Link href="/account/reset-password" className="border-b border-gold text-ink">
          Request a new one
        </Link>
        .
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-[18px]">
      <div>
        <label htmlFor="new-password" className={authStyles.label}>New Password</label>
        <input
          id="new-password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={authStyles.field}
        />
        <p className="mt-1.5 text-[11px] text-muted">At least 8 characters.</p>
      </div>
      <div>
        <label htmlFor="confirm-password" className={authStyles.label}>Confirm Password</label>
        <input id="confirm-password" name="confirm" type="password" required autoComplete="new-password" className={authStyles.field} />
      </div>
      {error && (
        <p role="alert" className={authStyles.error}>
          {error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className={`w-full ${authStyles.primary}`}>
        {status === "sending" ? "Saving…" : "Save New Password"}
      </button>
    </form>
  );
}
