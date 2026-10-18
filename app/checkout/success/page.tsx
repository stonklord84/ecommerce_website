import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

// Where Stripe sends the customer after a successful payment.
export default function CheckoutSuccessPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[640px] px-6 py-[100px] text-center">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[3px] text-gold">Order Confirmed</p>
        <h1 className="mb-6 font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px] sm:text-[42px]">
          Thank You
        </h1>
        <p className="mb-10 text-sm leading-[1.7] text-muted">
          Your payment was successful. A receipt is on its way to your email, and we&apos;ll be in touch when your
          scarf ships. Questions? Reach us at <strong>{site.email}</strong>.
        </p>
        <Link
          href="/#collections"
          className="inline-block bg-ink px-6 py-4 text-xs font-semibold uppercase tracking-[2px] text-white transition duration-300 ease-silk hover:bg-gold"
        >
          Continue Shopping
        </Link>
      </main>
      <Footer />
    </>
  );
}
