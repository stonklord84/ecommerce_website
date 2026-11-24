import type { Components } from "react-markdown";
import type { SilkLibraryCard } from "@/lib/content";
import Markdown from "./Markdown";
import SectionHeader from "./SectionHeader";

const cell = "border border-line px-3.5 py-2.5 text-left";

// Card text comes from the silk_library table as Markdown; these keep it looking exactly
// like the original hand-written cards (muted paragraphs, bordered table, bold = highlighted row).
const cardMarkdown: Components = {
  p: ({ children }) => <p className="text-sm leading-[1.7] text-muted [&:not(:first-child)]:mt-3">{children}</p>,
  ul: ({ children }) => <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-[1.7] text-muted">{children}</ul>,
  ol: ({ children }) => <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-[1.7] text-muted">{children}</ol>,
  table: ({ children }) => <table className="mt-4 w-full border-collapse text-[13px]">{children}</table>,
  thead: ({ children }) => <thead className="bg-cream">{children}</thead>,
  th: ({ children }) => <th className={cell}>{children}</th>,
  td: ({ children }) => <td className={cell}>{children}</td>,
};

export default function SilkLibrary({ cards }: { cards: SilkLibraryCard[] }) {
  if (cards.length === 0) return null;

  return (
    <section id="library" className="mx-auto max-w-[1280px] px-6 py-[70px]">
      <SectionHeader eyebrow="Educational Guide" title="The Silk Library" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`rounded border border-line bg-white p-[30px] ${card.wide ? "md:col-span-2" : ""}`}
          >
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-gold">{card.tag}</div>
            <h3 className="mb-3 font-serif text-2xl font-semibold">{card.title}</h3>
            <Markdown components={cardMarkdown}>{card.body}</Markdown>
          </div>
        ))}
      </div>
    </section>
  );
}
