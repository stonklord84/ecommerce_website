import Image from "next/image";
import LogoMark from "./LogoMark";

type ProductImageProps = {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

// Shows the product photo from Supabase Storage, or a branded placeholder until one is uploaded.
export default function ProductImage({ src, alt, sizes, priority, className = "" }: ProductImageProps) {
  return (
    <div
      className={`relative flex aspect-square w-full items-center justify-center overflow-hidden border border-[#dfd6c9] bg-[#ede6dc] ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        // multiply blends the logo's white background into the beige tile.
        <LogoMark variant="light" className="h-1/2 opacity-60 mix-blend-multiply" />
      )}
    </div>
  );
}
