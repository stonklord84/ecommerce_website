import type { ReactNode } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import Header from "./Header";

// Shared layout for the policy pages linked from the footer.
export default function PolicyPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[720px] px-6 py-[100px]">
        <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[3px] text-gold">
          Client Care
        </p>
        <h1 className="mb-4 text-center font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px] sm:text-[42px]">
          {title}
        </h1>
        {updated && <p className="mb-10 text-center text-[12px] text-muted">Last updated: {updated}</p>}
        <div className="space-y-5 text-sm leading-[1.7] text-muted [&_h2]:pt-4 [&_h2]:font-serif [&_h2]:text-lg [&_h2]:uppercase [&_h2]:tracking-[1px] [&_h2]:text-ink [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function Mail({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className="border-b border-gold text-ink">
      {email}
    </a>
  );
}
