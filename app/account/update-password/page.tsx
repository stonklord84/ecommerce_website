import type { Metadata } from "next";
import UpdatePasswordForm from "@/components/UpdatePasswordForm";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "New Password",
  robots: { index: false },
};

// The password-reset email links here (see sendPasswordReset in lib/auth.ts).
export default function UpdatePasswordPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[440px] px-6 py-[70px]">
        <h1 className="mb-10 text-center font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px]">
          New Password
        </h1>
        <UpdatePasswordForm />
      </main>
      <Footer />
    </>
  );
}
