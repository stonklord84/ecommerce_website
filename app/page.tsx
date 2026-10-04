import AnnouncementBar from "@/components/AnnouncementBar";
import Collections from "@/components/Collections";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Philosophy from "@/components/Philosophy";
import SilkLibrary from "@/components/SilkLibrary";
import { faqs } from "@/lib/faqs";
import { getCollections } from "@/lib/products";
import { site } from "@/lib/site";

// Re-fetch products from Supabase at most once an hour.
export const revalidate = 3600;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      slogan: site.slogan,
      description:
        "Lumière East brings together Eastern-inspired heritage and contemporary elegance through 100% mulberry silk and wool-silk blend scarves.",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Ontario",
        addressCountry: "CA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: site.email,
        telephone: site.phone,
        contactType: "customer service",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${site.url}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default async function Home() {
  const collections = await getCollections();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Collections collections={collections} />
        <Journey />
        <SilkLibrary />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
