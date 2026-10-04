"use client";

import { useState } from "react";

// Not connected to a mailing service yet; only confirms the submission locally.
export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <p className="italic text-[#e2dfd9]">Thank you — you&apos;re on the list.</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-3"
    >
      <input
        type="email"
        required
        aria-label="Email address"
        placeholder="Enter your email address"
        className="rounded border border-[#333] bg-[#1a1816] px-4 py-3.5 text-[13px] text-white outline-none focus:border-gold-light"
      />
      <button
        type="submit"
        className="cursor-pointer rounded bg-gold-light p-3.5 text-xs font-semibold uppercase tracking-[2px] text-[#111] transition duration-300 ease-silk hover:bg-white"
      >
        Subscribe
      </button>
    </form>
  );
}
