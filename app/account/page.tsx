import type { Metadata } from "next";
import AccountView from "@/components/AccountView";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Your Account",
  robots: { index: false },
};

// Customer accounts are handled in the browser (lib/auth.ts), so this page is static.
export default function AccountPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[440px] px-6 py-[70px]">
        <h1 className="mb-10 text-center font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px]">
          Your Account
        </h1>
        <AccountView />
      </main>
      <Footer />
    </>
  );
}
