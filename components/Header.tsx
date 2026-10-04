import Link from "next/link";
import LogoMark from "./LogoMark";

const navLink =
  "text-[11px] uppercase tracking-[2px] text-muted transition duration-300 ease-silk hover:text-gold";

export default function Header() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <nav className="flex flex-1 justify-start">
          <ul className="hidden gap-[30px] sm:flex">
            <li>
              <a href="#collections" className={navLink}>Collections</a>
            </li>
            <li>
              <a href="#philosophy" className={navLink}>Our Story</a>
            </li>
          </ul>
        </nav>

        <Link href="/" className="flex flex-1 flex-col items-center gap-3.5">
          <LogoMark className="h-[60px] w-10 stroke-[1.6] text-gold" />
          <div className="text-center">
            <h1 className="mb-1 font-serif text-[28px] font-normal uppercase leading-[1.1] tracking-[5px]">
              LUMIÈRE EAST
            </h1>
            <p className="font-serif text-[10px] italic uppercase tracking-[2px] text-gold">
              Where East Meets West
            </p>
          </div>
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-[30px]">
          <a href="#journey" className={`hidden lg:inline ${navLink}`}>The Silk Journey</a>
          <a href="#library" className={`hidden lg:inline ${navLink}`}>Silk Care</a>
          <a href="#qa" className={`hidden lg:inline ${navLink}`}>Q&A</a>
          <button type="button" aria-label="Search" className="cursor-pointer">
            🔍
          </button>
          <button type="button" aria-label="Shopping bag" className="relative cursor-pointer">
            🛍️
            <span className="absolute -right-2 -top-2 rounded-full bg-forest px-[5px] py-0.5 text-[9px] leading-none text-white">
              4
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
