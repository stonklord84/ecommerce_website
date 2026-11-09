import Link from "next/link";
import AccountLink from "./AccountLink";
import CartLink from "./CartLink";
import LogoMark from "./LogoMark";
import SearchButton from "./SearchButton";

const navLink =
  "text-[11px] uppercase tracking-[2px] text-muted transition duration-300 ease-silk hover:text-gold";

export default function Header() {
  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <nav className="flex flex-1 justify-start">
          <ul className="hidden gap-[30px] sm:flex">
            <li>
              <Link href="/#collections" className={navLink}>Collections</Link>
            </li>
            <li>
              <Link href="/#philosophy" className={navLink}>Our Story</Link>
            </li>
          </ul>
        </nav>

        <Link href="/" className="flex flex-1 flex-col items-center gap-3.5">
          <LogoMark variant="light" className="h-[60px]" />
          <div className="text-center">
            <p className="mb-1 font-serif text-[28px] font-normal uppercase leading-[1.1] tracking-[5px]">
              LUMIÈRE EAST
            </p>
            <p className="font-serif text-[10px] italic uppercase tracking-[2px] text-gold">
              Where East Meets West
            </p>
          </div>
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-[30px]">
          <Link href="/#journey" className={`hidden lg:inline ${navLink}`}>The Silk Journey</Link>
          <Link href="/#library" className={`hidden lg:inline ${navLink}`}>Silk Care</Link>
          <Link href="/#qa" className={`hidden lg:inline ${navLink}`}>Q&A</Link>
          <SearchButton />
          <AccountLink />
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
