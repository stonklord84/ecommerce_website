import type { Metadata } from "next";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Reset Password",
  robots: { index: false },
};

// Linked from "Forgot your password?" on /account.
export default function ResetPasswordPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="mx-auto max-w-[440px] px-6 py-[70px]">
        <h1 className="mb-10 text-center font-serif text-[34px] font-normal uppercase leading-[1.15] tracking-[2px]">
          Reset Password
        </h1>
        <ResetPasswordForm />
      </main>
      <Footer />
    </>
  );
}
