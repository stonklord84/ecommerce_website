import Link from "next/link";
import { formatDate, type GuideSummary } from "@/lib/content";

// Guide links styled like the FAQ rows: white bordered rectangles, serif titles.
export default function GuideList({ guides, showDates }: { guides: GuideSummary[]; showDates?: boolean }) {
  return (
    <ul className="mx-auto max-w-[840px]">
      {guides.map((guide) => (
        <li key={guide.slug} className="mb-3">
          <Link
            href={`/style-and-care-guide/${guide.slug}`}
            className="group flex items-center justify-between gap-6 rounded-[3px] border border-line bg-white px-[22px] py-[18px] transition duration-300 ease-silk hover:border-gold"
          >
            <div>
              <h3 className="font-serif text-[19px] font-semibold">{guide.title}</h3>
              <p className="mt-1 text-sm leading-[1.7] text-muted">{guide.excerpt}</p>
              {showDates && (
                <p className="mt-2 text-[11px] uppercase tracking-[2px] text-gold">
                  {formatDate(guide.published_at)}
                </p>
              )}
            </div>
            <span
              aria-hidden
              className="text-gold transition duration-300 ease-silk group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
