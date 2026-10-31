"use client";

import Link from "next/link";
import { useState } from "react";
import { sendPasswordReset } from "@/lib/auth";
import { authStyles } from "./authStyles";

// /account/reset-password: emails a link to /account/update-password.
export default function ResetPasswordForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const message = await sendPasswordReset(String(new FormData(e.currentTarget).get("email")));
    setError(message);
    setStatus(message ? "idle" : "sent");
  }

  if (status === "sent") {
    return (
      <p className="text-center text-sm leading-[1.7] text-muted">
        If an account exists for that email, a link to choose a new password is on its way.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-[18px]">
      <p className="text-center text-[13px] leading-[1.6] text-muted">
        Enter your email and we&apos;ll send you a link to choose a new password.
      </p>
      <div>
        <label htmlFor="reset-email" className={authStyles.label}>Email Address</label>
        <input id="reset-email" name="email" type="email" required autoComplete="email" className={authStyles.field} />
      </div>
      {error && (
        <p role="alert" className={authStyles.error}>
          {error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className={`w-full ${authStyles.primary}`}>
        {status === "sending" ? "Sending…" : "Send Reset Link"}
      </button>
      <p className="text-center">
        <Link href="/account" className={authStyles.link}>
          Back to Sign In
        </Link>
      </p>
    </form>
  );
}
