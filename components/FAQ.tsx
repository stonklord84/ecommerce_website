import type { Faq } from "@/lib/content";
import SectionHeader from "./SectionHeader";

export default function FAQ({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section id="qa" className="mx-auto max-w-[1280px] px-6 py-[70px]">
      <SectionHeader eyebrow="Client Support" title="Frequently Asked Questions" />

      <div className="mx-auto max-w-[840px]">
        {faqs.map((faq, i) => (
          <details
            key={faq.id}
            open={i === 0}
            className="group mb-3 rounded-[3px] border border-line bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-[22px] py-[18px] font-serif text-[19px] font-semibold [&::-webkit-details-marker]:hidden">
              {i + 1}. {faq.question}
              <span className="transition duration-300 ease-silk group-open:rotate-45">+</span>
            </summary>
            {/* pre-line keeps paragraph breaks typed into the answer in Supabase. */}
            <div className="whitespace-pre-line px-[22px] pb-5 text-sm leading-[1.7] text-muted">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
