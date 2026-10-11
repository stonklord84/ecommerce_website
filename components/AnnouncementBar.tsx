export default function AnnouncementBar() {
  return (
    <div className="flex items-center justify-center bg-[#15241d] px-6 py-2.5 text-center text-[11px] uppercase tracking-[1.5px] text-[#d6e0d9] md:justify-between">
      <span className="hidden md:inline">The Art of Mulberry Silk</span>
      <span>Complimentary North America Shipping on Orders Over $150 CAD</span>
      <span className="hidden md:inline">CAD ($) | USD ($)</span>
    </div>
  );
}
