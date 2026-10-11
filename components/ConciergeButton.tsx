"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const label = "mb-2 block text-[11px] font-semibold uppercase tracking-[1.5px] text-ink";
const field =
  "w-full rounded-sm border border-line-dark bg-white p-3.5 text-[13px] outline-none transition duration-300 focus:border-gold";

// Floating "Ask Me If Any Questions" button (bottom right) that opens the Client Concierge form.
export default function ConciergeButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const open = () => {
    if (status === "sent" || status === "error") setStatus("idle");
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!site.conciergeFormUrl.startsWith("http")) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.conciergeFormUrl, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="fixed bottom-5 right-5 z-[999] flex cursor-pointer items-center gap-2.5 rounded-full border border-gold-light bg-forest px-5 py-3 text-[11px] font-semibold uppercase tracking-[1px] text-gold-light shadow-[0_10px_25px_rgba(0,0,0,0.2)] transition duration-300 ease-silk hover:-translate-y-0.5 hover:bg-gold-light hover:text-forest sm:bottom-[30px] sm:right-[30px] sm:px-[26px] sm:py-3.5 sm:text-xs"
      >
        <span aria-hidden="true" className="text-base">✉</span>
        Ask Me If Any Questions
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="concierge-title"
        // Clicking the dimmed backdrop (outside the panel) closes the dialog.
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[calc(100%-40px)] max-w-[480px] rounded border border-gold bg-cream p-0 text-ink opacity-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-[opacity,display,overlay] transition-discrete duration-300 open:opacity-100 starting:open:opacity-0 backdrop:bg-[rgba(20,19,18,0.85)]"
      >
        <div className="relative p-8 sm:p-10">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 cursor-pointer text-[28px] leading-none text-muted transition duration-300 hover:text-ink"
          >
            ×
          </button>

          <h3 id="concierge-title" className="mb-2 font-serif text-[28px] uppercase tracking-[2px]">
            Client Concierge
          </h3>

          {status === "sent" ? (
            <p className="text-[13px] leading-[1.6] text-muted">
              Thank you — your inquiry has been sent. Our team will reply to you directly from{" "}
              <strong>{site.email}</strong>.
            </p>
          ) : (
            <>
              <p className="mb-[26px] text-[13px] leading-[1.6] text-muted">
                Leave your details and request below. Our team will reply to you directly from{" "}
                <strong>{site.email}</strong>.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-[18px]">
                  <label htmlFor="concierge-name" className={label}>Name</label>
                  <input id="concierge-name" name="name" type="text" required placeholder="Your full name" className={field} />
                </div>
                <div className="mb-[18px]">
                  <label htmlFor="concierge-email" className={label}>Email Address</label>
                  <input id="concierge-email" name="_replyto" type="email" required placeholder="Your email address" className={field} />
                </div>
                <div className="mb-[18px]">
                  <label htmlFor="concierge-message" className={label}>How may we assist you?</label>
                  <textarea
                    id="concierge-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Questions about bespoke orders, care, or delivery..."
                    className={field}
                  />
                </div>
                <input type="hidden" name="_subject" value="New Lumière East Concierge Request" />

                {status === "error" && (
                  <p role="alert" className="mb-3 text-[13px] leading-[1.6] text-[#9b3b2f]">
                    Sorry, your message couldn&apos;t be sent. Please email us at{" "}
                    <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2.5 w-full cursor-pointer rounded-sm bg-forest p-4 text-xs font-semibold uppercase tracking-[2px] text-gold-light transition duration-300 hover:bg-gold-light hover:text-forest disabled:cursor-wait disabled:opacity-70"
                >
                  {status === "sending" ? "Sending…" : "Send Inquiry"}
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
