import SectionHeader from "./SectionHeader";

const stages = [
  {
    step: "STAGE I",
    title: "The Awakening",
    text: "Spring winds stir, and the white mulberry grove awakens into fresh green canopy, yielding nature's pure nourishment.",
  },
  {
    step: "STAGE II",
    title: "The Silver Thread",
    text: "In quiet devotion, the filament is spun—a single, unbroken strand carrying natural tensile strength and soft luster.",
  },
  {
    step: "STAGE III",
    title: "Loom & Hue",
    text: "Warp and weft meet patiently beneath fine mineral pigments, turning distant blues and pale pinks into breathing color.",
  },
  {
    step: "STAGE IV",
    title: "The Heirloom",
    text: "Meticulously finished with hand-rolled, hand-sewn edges. Each piece drapes light as a cloud with fluid grace.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="border-y border-line bg-sand">
      <div className="mx-auto max-w-[1280px] px-6 py-[70px]">
        <SectionHeader eyebrow="Master Sericulture & Craft" title="A Strand of Silk — The Journey" />

        <div className="mx-auto mb-[50px] flex max-w-[680px] flex-col justify-center gap-2 text-center font-serif text-[19px] italic leading-[1.8] text-[#383431] sm:flex-row sm:flex-wrap sm:gap-9">
          <div>
            &ldquo;Spring breeze stirs the mulberry tree,
            <br />
            Fine threads spun in quiet grace.
          </div>
          <div>
            Woven into clouds of silk,
            <br />
            Resting in a warm embrace.&rdquo;
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.step} className="border border-line bg-white p-6">
              <div className="mb-1.5 text-[11px] font-semibold tracking-[2px] text-gold">
                {stage.step}
              </div>
              <h3 className="mb-2.5 font-serif text-xl font-semibold">{stage.title}</h3>
              <p className="text-[13px] leading-[1.6] text-muted">{stage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
