"use client";

import Image from "next/image";
import { useState } from "react";
import ProductImage from "./ProductImage";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

const arrowClass =
  "absolute top-1/2 z-10 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line bg-white/85 text-xl text-ink transition duration-300 ease-silk hover:bg-gold hover:text-white";

// Main image with left/right arrows and clickable thumbnails. Starts on the first image.
export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const show = (i: number) => setIndex((i + count) % count); // wraps around both ends

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") show(index - 1);
        if (e.key === "ArrowRight") show(index + 1);
      }}
      className="outline-none"
    >
      <div className="relative">
        <ProductImage
          src={images[index] ?? null}
          alt={count > 1 ? `${alt} — image ${index + 1} of ${count}` : alt}
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={index === 0}
        />

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => show(index - 1)}
              className={`${arrowClass} left-3`}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => show(index + 1)}
              className={`${arrowClass} right-3`}
            >
              ›
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`relative aspect-square cursor-pointer overflow-hidden border-2 transition duration-300 ease-silk ${
                i === index ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
