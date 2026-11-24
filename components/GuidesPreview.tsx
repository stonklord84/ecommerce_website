import Link from "next/link";
import type { GuideSummary } from "@/lib/content";
import GuideList from "./GuideList";
import SectionHeader from "./SectionHeader";

// Homepage block: the latest few guides, so the homepage length never grows.
export default function GuidesPreview({ guides }: { guides: GuideSummary[] }) {
  if (guides.length === 0) return null;

  return (
    <section id="guides" className="mx-auto max-w-[1280px] px-6 py-[70px]">
      <SectionHeader eyebrow="Style & Care" title="Style and Care Guide" />
      <GuideList guides={guides} />
      <div className="mt-6 text-center">
        <Link
          href="/style-and-care-guide"
          className="border-b border-gold pb-0.5 text-[12px] font-semibold uppercase tracking-[2px] text-ink transition duration-300 ease-silk hover:text-gold"
        >
          View all guides
        </Link>
      </div>
    </section>
  );
}
