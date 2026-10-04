import type { ReactNode } from "react";
import SectionHeader from "./SectionHeader";

type LibraryCardProps = {
  tag: string;
  title: string;
  wide?: boolean;
  children: ReactNode;
};

function LibraryCard({ tag, title, wide, children }: LibraryCardProps) {
  return (
    <div className={`rounded border border-line bg-white p-[30px] ${wide ? "md:col-span-2" : ""}`}>
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[2px] text-gold">{tag}</div>
      <h3 className="mb-3 font-serif text-2xl font-semibold">{title}</h3>
      {children}
    </div>
  );
}

const body = "text-sm leading-[1.7] text-muted";
const cell = "border border-line px-3.5 py-2.5 text-left";

const mommeTiers = [
  { tier: "8–12 mm", traits: "Ultra-sheer, lightweight", use: "Ribbons, chiffons" },
  { tier: "14–16 mm", traits: "Gold standard balance", use: "Lumière East square scarves", highlight: true },
  { tier: "18–22 mm", traits: "Dense, structured drape", use: "Winter wraps, pillowcases" },
];

export default function SilkLibrary() {
  return (
    <section id="library" className="mx-auto max-w-[1280px] px-6 py-[70px]">
      <SectionHeader eyebrow="Educational Guide" title="The Silk Library" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LibraryCard tag="The Origin" title="Grade 6A Mulberry Silk">
          <p className={body}>
            The highest tier of natural silk fiber obtainable worldwide. Harvested from Bombyx mori
            silkworms fed exclusively on fresh white mulberry leaves. Features a triangular prism
            structure that reflects light with a soft, shifting glow, while pure protein fibroin
            matches human skin pH.
          </p>
        </LibraryCard>

        <LibraryCard tag="The Technique" title="Artisan Hand-Rolled Hems">
          <p className={body}>
            An artisan rolls the edge inward toward the printed face and secures it with tiny,
            nearly invisible hand stitches (30–45 minutes per scarf). Unlike rigid machine
            stitching, hand-rolled hems preserve the fabric&apos;s diagonal bias, letting it drape
            freely.
          </p>
        </LibraryCard>

        <LibraryCard tag="Textile Science" title="Mulberry Silk vs. Polyester Satin">
          <p className={body}>
            While &ldquo;satin&rdquo; is merely a weave type, most commercial satin is made from
            non-breathable synthetic polyester. Mulberry silk possesses natural micro-porous,
            hollow-core fibers that breathe dynamically, eliminating static cling and regulating
            temperature.
          </p>
        </LibraryCard>

        <LibraryCard tag="Weight Guide" title="Understanding Momme (mm)">
          <p className={body}>Momme measures fabric weight in pounds per 100 yards at 45 inches wide.</p>
          <table className="mt-4 w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-cream">
                <th className={cell}>Tier</th>
                <th className={cell}>Characteristics</th>
                <th className={cell}>Application</th>
              </tr>
            </thead>
            <tbody>
              {mommeTiers.map((row) => (
                <tr key={row.tier} className={row.highlight ? "font-bold" : undefined}>
                  <td className={cell}>{row.tier}</td>
                  <td className={cell}>{row.traits}</td>
                  <td className={cell}>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </LibraryCard>

        <LibraryCard wide tag="Care Protocol" title="Daily Maintenance & Hand Washing">
          <p className={body}>
            Hand wash in cool water below 30°C with pH-neutral silk detergent. Swirl gently for 2–3
            minutes without wringing. Lay flat inside a dry cotton towel and roll up like a roll
            cake to extract moisture, then air dry flat away from direct sunlight.
          </p>
        </LibraryCard>
      </div>
    </section>
  );
}
