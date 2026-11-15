"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { saveTab } from "@/lib/collection-tab";

// A link that opens one collection's tab on the homepage and scrolls to it.
// The tab choice is saved first, so it applies both on the homepage and when
// coming from another page (where the link's /#collections jump does the scroll).
export default function CollectionLink({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href="/#collections"
      className={className}
      onClick={(e) => {
        saveTab(slug);
        // Already on the homepage: a same-page hash link doesn't reliably scroll
        // (e.g. when the URL is already /#collections), so scroll ourselves.
        if (pathname === "/") {
          e.preventDefault();
          document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
          history.replaceState(history.state, "", "/#collections");
        }
      }}
    >
      {children}
    </Link>
  );
}
