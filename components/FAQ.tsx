import { faqs } from "@/lib/faqs";
import SectionHeader from "./SectionHeader";

export default function FAQ() {
  return (
    <section id="qa" className="mx-auto max-w-[1280px] px-6 py-[70px]">
      <SectionHeader eyebrow="Client Support" title="Frequently Asked Questions" />

      <div className="mx-auto max-w-[840px]">
        {faqs.map((faq, i) => (
          <details
            key={faq.question}
            open={i === 0}
            className="group mb-3 rounded-[3px] border border-line bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-[22px] py-[18px] font-serif text-[19px] font-semibold [&::-webkit-details-marker]:hidden">
              {i + 1}. {faq.question}
              <span className="transition duration-300 ease-silk group-open:rotate-45">+</span>
            </summary>
            <div className="px-[22px] pb-5 text-sm leading-[1.7] text-muted">{faq.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
