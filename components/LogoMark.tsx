import Image from "next/image";
import logoDarkBg from "@/public/logo-darkbg.jpg";
import logoWhiteBg from "@/public/logo-whitebg.jpg";

type LogoMarkProps = {
  // "light" for white/cream backgrounds, "dark" for the forest-green sections.
  variant: "light" | "dark";
  // Set the height here (e.g. "h-[60px]"); width follows the logo's proportions.
  className?: string;
};

// Arched gateway with a lotus, cropped from public/whitebg.jpg and public/darkbg.jpg.
export default function LogoMark({ variant, className = "" }: LogoMarkProps) {
  return (
    <Image
      src={variant === "dark" ? logoDarkBg : logoWhiteBg}
      alt=""
      aria-hidden="true"
      className={`w-auto ${className}`}
    />
  );
}
