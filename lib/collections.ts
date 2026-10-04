export type Product = {
  name: string;
  // SVG path data drawn in a 100x100 viewBox; placeholder until real product photos exist.
  icon: string;
};

export type Collection = {
  tab: string;
  description: string;
  specs: { label: string; value: string }[];
  price: string;
  products: Product[];
};

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

const silkSpecs = [
  { label: "Material", value: "100% Grade 6A Mulberry Silk" },
  { label: "Weave / Weight", value: "Twill / 14 Momme" },
  { label: "Hem", value: "Hand-rolled" },
  { label: "Size", value: "70 x 70 cm (27.56 x 27.56 in)" },
];

const woolBlendSpecs = [
  { label: "Material", value: "70% Wool / 30% Mulberry Silk" },
  { label: "Weave", value: "Twill / Lightweight Warmth" },
  { label: "Hem", value: "Hand-rolled" },
  { label: "Size", value: "70 x 70 cm (27.56 x 27.56 in)" },
];

const price = "CAD $49.00 / USD $35.00";

export const collections: Collection[] = [
  {
    tab: "Heritage Silk",
    description: "Timeless patterns inspired by tradition.",
    specs: silkSpecs,
    price,
    products: [
      { name: "Noir Gold Paisley", icon: circle(50, 50, 35) },
      { name: "Turquoise Baroque Paisley", icon: "M25 25h50v50H25z" },
      { name: "Azure Medallion Paisley", icon: "M50 15 85 50 50 85 15 50Z" },
      {
        name: "Golden Medallion Paisley",
        icon: `${circle(50, 35, 12)}${circle(50, 65, 12)}`,
      },
    ],
  },
  {
    tab: "Spring Flora",
    description: "Feminine floral expressions inspired by spring.",
    specs: silkSpecs,
    price,
    products: [
      { name: "Emerald Flora", icon: "M50 20C30 40 30 70 50 85C70 70 70 40 50 20Z" },
      { name: "Midnight Flora", icon: circle(50, 50, 30) },
      { name: "Blue Peony", icon: `${circle(40, 40, 15)}${circle(60, 60, 15)}` },
      { name: "Blush Peony", icon: `${circle(50, 50, 10)}${circle(50, 50, 28)}` },
    ],
  },
  {
    tab: "Winter Classics",
    description: "Refined, unisex winter style with understated elegance.",
    specs: woolBlendSpecs,
    price,
    products: [
      {
        name: "Navy Polka Dot Paisley",
        icon: `${circle(35, 35, 4)}${circle(65, 35, 4)}${circle(50, 65, 4)}`,
      },
      { name: "Crimson Garden Paisley", icon: "M30 30h40v40H30z" },
      { name: "Sage Garden Paisley", icon: "M20 50h60M50 20v60" },
      { name: "Heritage Houndstooth", icon: "M25 25h20v20H25zM45 45h20v20H45z" },
    ],
  },
  {
    tab: "Winter Heritage Paisley",
    description: "Heritage patterns with warmth, softness, and character.",
    specs: woolBlendSpecs,
    price,
    products: [
      { name: "Grey Heritage", icon: circle(50, 50, 30) },
      { name: "Brown & Navy", icon: "M30 70Q50 20 70 70" },
      { name: "Sage", icon: "M30 30 70 70M70 30 30 70" },
      { name: "Blue & Red", icon: "M30 70 50 30 70 70Z" },
    ],
  },
];
