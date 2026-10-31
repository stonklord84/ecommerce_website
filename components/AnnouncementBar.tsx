import CurrencySwitch from "./CurrencySwitch";

export default function AnnouncementBar() {
  return (
    <div className="flex flex-wrap items-center sticky top-0 z-50 justify-center gap-x-6 gap-y-1 bg-[#15241d] px-6 py-2.5 text-center text-[11px] uppercase tracking-[1.5px] text-[#d6e0d9] md:justify-between">
      <span className="hidden md:inline">The Art of Mulberry Silk</span>
      <span>Launch Celebration — Complimentary Shipping on Every Order Before March 15, 2027</span>
      <CurrencySwitch />
    </div>
  );
}
