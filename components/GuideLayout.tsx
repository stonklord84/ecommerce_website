import type { ReactNode } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import Header from "./Header";

// Shared page shell for the Style and Care Guide index and each guide.
export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[840px] px-6 py-[100px]">{children}</main>
      <Footer />
    </>
  );
}
