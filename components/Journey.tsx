import Image from "next/image";
import SectionHeader from "./SectionHeader";

const stages = [
  {
    step: "STAGE I",
    image: "/journey/stage-1.webp",
    alt: "A silk moth resting on a dew-covered mulberry leaf at sunrise",
    title: "The Awakening",
    text: "Spring winds stir, and the white mulberry grove awakens into fresh green canopy, yielding nature's pure nourishment.",
  },
  {
    step: "STAGE II",
    image: "/journey/stage-2.webp",
    alt: "A hand drawing a fine silk filament from a white cocoon onto a wooden reel",
    title: "The Silver Thread",
    text: "In quiet devotion, the filament is spun—a single, unbroken strand carrying natural tensile strength and soft luster.",
  },
  {
    step: "STAGE III",
    image: "/journey/stage-3.webp",
    alt: "White silk threads strung on a wooden hand loom",
    title: "Loom & Hue",
    text: "Warp and weft meet patiently beneath fine mineral pigments, turning distant blues and pale pinks into breathing color.",
  },
  {
    step: "STAGE IV",
    image: "/journey/stage-4.webp",
    alt: "Hands rolling the edge of an ivory silk scarf",
    title: "The Heirloom",
    text: "Meticulously finished with hand-rolled, hand-sewn edges. Each piece drapes light as a cloud with fluid grace.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="border-y border-line bg-sand">
      <div className="mx-auto max-w-[1280px] px-6 py-[70px]">
        <SectionHeader eyebrow="Master Sericulture & Craft" title="A Strand of Silk — The Journey" />
        
        <p className="mx-auto mb-10 text-center font-serif text-[19px] italic leading-[1.8] text-[#383431]">
          &ldquo;Spring breeze stirs the mulberry tree, fine threads spun in quiet grace. Woven into
          clouds of silk, resting in a warm embrace.&rdquo;
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.step} className="overflow-hidden border border-line bg-white">
              <div className="relative aspect-[4/3]">
                <Image
                  src={stage.image}
                  alt={stage.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-1.5 text-[11px] font-semibold tracking-[2px] text-gold">
                  {stage.step}
                </div>
                <h3 className="mb-2.5 font-serif text-xl font-semibold">{stage.title}</h3>
                <p className="text-[13px] leading-[1.6] text-muted">{stage.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
