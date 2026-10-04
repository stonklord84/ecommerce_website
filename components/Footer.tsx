import { site } from "@/lib/site";
import LogoMark from "./LogoMark";
import NewsletterForm from "./NewsletterForm";

const heading = "mb-6 text-xs font-medium uppercase tracking-[3px] text-gold-light";
const link = "text-[#9a938a] transition duration-300 ease-silk hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-[#0d0c0b] px-6 pb-[30px] pt-[70px] text-[13px] text-[#9a938a]">
      <div className="mx-auto mb-[50px] grid max-w-[1280px] grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
        <div>
          <div className="mb-5 flex items-center gap-3 font-serif text-xl uppercase tracking-[4px] text-white">
            <LogoMark lotus={false} className="h-[33px] w-[22px] stroke-2 text-gold-light" />
            <span>LUMIÈRE EAST</span>
          </div>
          <p className="mb-3 italic text-[#e2dfd9]">Where East Meets West.</p>
          <p className="mb-3 italic text-[#e2dfd9]">
            100% Pure Mulberry Silk Accessories designed in Ontario, Canada.
          </p>
          <div className="mt-6 text-[11px] uppercase tracking-[2px] text-gold-light">
            Designed in Ontario, Canada
          </div>
        </div>

        <div>
          <h4 className={heading}>Collections</h4>
          <ul className="space-y-3">
            <li><a href="#collections" className={link}>Heritage Paisley Collection</a></li>
            <li><a href="#collections" className={link}>Spring Flora Collection</a></li>
            <li><a href="#collections" className={link}>Winter Classics Collection</a></li>
            <li><a href="#collections" className={link}>Bespoke Gift Sets</a></li>
          </ul>
        </div>

        <div>
          <h4 className={heading}>Concierge</h4>
          <div className="mb-4">
            Email:{" "}
            <a href={`mailto:${site.email}`} className="border-b border-gold-light text-[#e2dfd9]">
              {site.email}
            </a>
          </div>
          <div className="mb-4">Phone: {site.phoneDisplay}</div>
          <ul className="mt-4 space-y-3">
            <li><a href="#library" className={link}>Silk Wash & Care Instructions</a></li>
            <li><a href="#" className={link}>Complimentary Canada & US Delivery</a></li>
          </ul>
        </div>

        <div>
          <h4 className={heading}>Private Previews</h4>
          <p className="mb-4">Receive exclusive notifications on small-batch seasonal releases.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col flex-wrap items-center justify-center gap-5 border-t border-[#222] pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>© 2026 LUMIÈRE EAST. All rights reserved. 100% Mulberry Silk.</div>
        <div className="flex gap-5">
          <a href="#" className={link}>Privacy Policy</a>
          <a href="#" className={link}>Terms of Service</a>
          <a href="#" className={link}>Shipping & Returns</a>
        </div>
      </div>
    </footer>
  );
}
