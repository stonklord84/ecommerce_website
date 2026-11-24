import type { Metadata } from "next";
import GuideLayout from "@/components/GuideLayout";
import GuideList from "@/components/GuideList";
import { getGuides } from "@/lib/content";

// Guides come from Supabase; the /api/revalidate webhook refreshes this page on every edit.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Style and Care Guide | Lumière East",
  description:
    "Guides to styling, gifting and caring for 100% Mulberry silk and wool-silk scarves, from the Lumière East atelier.",
  alternates: { canonical: "/style-and-care-guide" },
};

export default async function StyleAndCareGuidePage() {
  const guides = await getGuides();

  return (
    <GuideLayout>
      <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[3px] text-gold">Lumière East</p>
      <h1 className="mb-4 text-center font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px] sm:text-[42px]">
        Style and Care Guide
      </h1>
      <p className="mx-auto mb-12 max-w-[560px] text-center text-sm leading-[1.7] text-muted">
        How to wear, gift and care for Mulberry silk — written by our atelier.
      </p>

      {guides.length > 0 ? (
        <GuideList guides={guides} showDates />
      ) : (
        <p className="text-center text-sm text-muted">New guides are on their way. Please check back soon.</p>
      )}
    </GuideLayout>
  );
}
