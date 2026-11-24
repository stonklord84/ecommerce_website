import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Components } from "react-markdown";
import GuideLayout from "@/components/GuideLayout";
import Markdown from "@/components/Markdown";
import { formatDate, getGuide, getGuides } from "@/lib/content";
import { site } from "@/lib/site";

// Re-fetch from Supabase at most once an hour (the /api/revalidate webhook makes edits
// show immediately). Guides added after a build render on their first visit; unknown
// or draft slugs return a 404.
export const revalidate = 3600;

export async function generateStaticParams() {
  const guides = await getGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/style-and-care-guide/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.seo_title ?? guide.title,
    description: guide.meta_description,
    alternates: { canonical: `/style-and-care-guide/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.seo_title ?? guide.title,
      description: guide.meta_description,
      publishedTime: guide.published_at,
      ...(guide.updated_at && { modifiedTime: guide.updated_at }),
    },
  };
}

// Article typography: navy-ink serif headings, muted body text, gold accents.
const articleMarkdown: Components = {
  h1: ({ children }) => <h2 className="mb-4 mt-12 font-serif text-[28px] font-semibold leading-[1.2] text-ink">{children}</h2>,
  h2: ({ children }) => <h2 className="mb-4 mt-12 font-serif text-[28px] font-semibold leading-[1.2] text-ink">{children}</h2>,
  h3: ({ children }) => <h3 className="mb-3 mt-8 font-serif text-[22px] font-semibold leading-[1.25] text-ink">{children}</h3>,
  h4: ({ children }) => <h4 className="mb-2 mt-6 text-[12px] font-semibold uppercase tracking-[2px] text-gold">{children}</h4>,
  p: ({ children }) => <p className="mb-5 text-[15px] leading-[1.8] text-muted">{children}</p>,
  ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.8] text-muted marker:text-gold">{children}</ul>,
  ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-5 text-[15px] leading-[1.8] text-muted marker:text-gold">{children}</ol>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-2 border-gold pl-6 font-serif text-[20px] italic text-ink [&_p]:text-[20px] [&_p]:text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-line" />,
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse bg-white text-[13px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-cream">{children}</thead>,
  th: ({ children }) => <th className="border border-line px-3.5 py-2.5 text-left">{children}</th>,
  td: ({ children }) => <td className="border border-line px-3.5 py-2.5 text-left">{children}</td>,
  // eslint-disable-next-line @next/next/no-img-element -- images may come from any URL typed into Supabase
  img: ({ src, alt }) => <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} className="my-8 w-full rounded" />,
};

export default async function GuidePage({ params }: PageProps<"/style-and-care-guide/[slug]">) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const url = `${site.url}/style-and-care-guide/${guide.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.seo_title ?? guide.title,
    description: guide.meta_description,
    datePublished: guide.published_at,
    dateModified: guide.updated_at ?? guide.published_at,
    mainEntityOfPage: url,
    url,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}/#organization` },
  };

  return (
    <GuideLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <article>
        <nav className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[3px] text-gold">
          <Link href="/style-and-care-guide" className="transition duration-300 ease-silk hover:text-ink">
            Style and Care Guide
          </Link>
        </nav>
        <h1 className="mb-4 text-center font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px] sm:text-[42px]">
          {guide.title}
        </h1>
        <p className="mb-12 text-center text-[12px] text-muted">
          {guide.updated_at && guide.updated_at !== guide.published_at
            ? `Updated ${formatDate(guide.updated_at)}`
            : formatDate(guide.published_at)}
        </p>

        <Markdown components={articleMarkdown}>{guide.body}</Markdown>
      </article>

      <div className="mt-16 border-t border-line pt-8 text-center">
        <Link
          href="/style-and-care-guide"
          className="border-b border-gold pb-0.5 text-[12px] font-semibold uppercase tracking-[2px] text-ink transition duration-300 ease-silk hover:text-gold"
        >
          ← All guides
        </Link>
      </div>
    </GuideLayout>
  );
}
