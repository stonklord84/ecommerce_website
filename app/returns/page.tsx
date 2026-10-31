import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Returns, exchanges, and refunds within 60 days of delivery. Free returns on eligible items.",
};

// Linked from the footer, product pages, and the Stripe checkout page.
export default function ReturnsPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[640px] px-6 py-[100px]">
        <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[3px] text-gold">
          Client Care
        </p>
        <h1 className="mb-10 text-center font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px] sm:text-[42px]">
          Returns & Refunds
        </h1>
        <div className="space-y-5 text-sm leading-[1.7] text-muted">
          <p>
            We accept returns, exchanges, and refunds within 60 days of delivery. Items must be unused, unwashed,
            and in original condition.
          </p>
          <p>Free returns apply to all eligible products; exceptions may apply to final-sale items.</p>
          <p>If an item arrives damaged or defective, we will provide a full refund or free replacement.</p>
          <p>
            To start a return, contact us at{" "}
            <a href={`mailto:${site.email}`} className="border-b border-gold text-ink">
              {site.email}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
