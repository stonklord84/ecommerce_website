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
        <LogoMark className="h-1/2 w-1/3 stroke-1 text-gold opacity-60" />
      )}
    </div>
  );
}
