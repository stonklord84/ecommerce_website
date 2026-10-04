import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title:
    "LUMIÈRE EAST | Where East Meets West — Mulberry Silk & Wool Blend Accessories",
  description:
    "Lumière East brings together Eastern-inspired heritage and contemporary elegance through 100% Grade 6A Mulberry silk and fine wool-blend scarves. Hand-rolled hems and thoughtful craftsmanship.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans leading-[1.6] text-ink">
        {children}
      </body>
    </html>
  );
}
