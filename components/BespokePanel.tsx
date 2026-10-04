import { site } from "@/lib/site";

export default function BespokePanel() {
  return (
    <div className="mx-auto max-w-[750px] border border-dashed border-gold bg-[#fdfbf8] px-6 py-[50px] text-center">
      <h3 className="mb-3 font-serif text-[30px] text-gold">Collection V: Atelier Bespoke</h3>
      <p className="mb-5 text-sm text-muted">
        Specialized & Customized Design Services for bridal suites, commemorative events, and
        custom colorway developments.
      </p>
      <div className="mb-5 text-[13px] tracking-[1px] text-gold">
        Product Name & Pattern Editions: Available upon consultation
      </div>
      <a
        href={`mailto:${site.email}?subject=Bespoke%20Consultation`}
        className="inline-block border border-ink px-3 py-2 text-[11px] uppercase tracking-[1px] transition duration-300 ease-silk hover:bg-ink hover:text-white"
      >
        Request Custom Consultation
      </a>
    </div>
  );
}
