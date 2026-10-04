import type { Product } from "@/lib/collections";

type ProductCardProps = Product & {
  description: string;
};

export default function ProductCard({ name, icon, description }: ProductCardProps) {
  return (
    <div className="flex flex-col justify-between border border-line bg-white p-[18px] text-center">
      <div>
        <div className="mb-3.5 flex aspect-square w-full items-center justify-center border border-[#dfd6c9] bg-[#ede6dc]">
          <svg viewBox="0 0 100 100" className="size-1/2 fill-none stroke-gold" aria-hidden="true">
            <path d={icon} />
          </svg>
        </div>
        <h4 className="mb-1.5 font-serif text-lg font-semibold">{name}</h4>
        <p className="mb-3.5 text-xs text-muted">{description}</p>
      </div>
      <button
        type="button"
        className="cursor-pointer border border-ink px-3 py-2 text-[11px] uppercase tracking-[1px] transition duration-300 ease-silk hover:bg-ink hover:text-white"
      >
        Select Scarf
      </button>
    </div>
  );
}
