type SectionHeaderProps = {
  eyebrow: string;
  title: string;
};

export default function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="mb-3 text-center">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[3px] text-gold">{eyebrow}</p>
      <h2 className="font-serif text-[38px] font-normal uppercase tracking-[2px]">{title}</h2>
    </div>
  );
}
