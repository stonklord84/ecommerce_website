"use client";

import { useState } from "react";

// "Private Previews" sign-up, sent to the Zoho Campaigns mailing list.
// Values come from Zoho's embed code for the LUMIÈRE EAST sign-up form (scriptless
// version); they're public by design. Zoho's own look is not used, only its endpoint.
const ZOHO_OPTIN_URL = "https://zgnp-zngp.maillist-manage.com/weboptin.zc";
const ZOHO_FIELDS = {
  submitType: "optinCustomView",
  emailReportId: "",
  formType: "QuickForm",
  zx: "138414f09",
  zcvers: "3.0",
  oldListIds: "",
  mode: "OptinCreateView",
  zcld: "11806f831e801c084",
  zctd: "",
  zc_trackCode: "ZCFORMVIEW",
  zc_formIx: "3z5196a005bfe0e2525df188df923066287245d1c2acbdbba8a36bc07bd75fffda",
  scriptless: "yes",
  // Zoho's script removes its "zc_spmSubmit" spam-trap field before submitting, so it's left out.
};

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  if (status === "done") {
    return <p className="italic text-[#e2dfd9]">Thank you — you&apos;re on the list.</p>;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email");
        if (typeof email !== "string" || !email) return;

        setStatus("sending");
        try {
          // Zoho doesn't allow reading its reply from another site ("no-cors"), so a
          // completed request counts as success; only a network failure shows an error.
          await fetch(ZOHO_OPTIN_URL, {
            method: "POST",
            mode: "no-cors",
            body: new URLSearchParams({ ...ZOHO_FIELDS, CONTACT_EMAIL: email.trim() }),
          });
          setStatus("done");
        } catch {
          setStatus("error");
        }
      }}
      className="flex flex-col gap-3"
    >
      <input
        type="email"
        name="email"
        required
        aria-label="Email address"
        placeholder="Enter your email address"
        className="rounded border border-[#333] bg-[#1a1816] px-4 py-3.5 text-[13px] text-white outline-none focus:border-gold-light"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="cursor-pointer rounded bg-gold-light p-3.5 text-xs font-semibold uppercase tracking-[2px] text-[#111] transition duration-300 ease-silk hover:bg-white"
      >
        Subscribe
      </button>
      {status === "error" && (
        <p role="alert" className="text-[12px] text-[#e2dfd9]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
