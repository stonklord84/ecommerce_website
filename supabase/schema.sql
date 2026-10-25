-- Lumière East product catalog.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.

-- ─── Tables ────────────────────────────────────────────────────────────────

create table public.collections (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  name        text not null,
  description text not null,
  -- Shown in the spec bar above the product grid, e.g. [{"label": "Hem", "value": "Hand-rolled"}]
  specs       jsonb not null default '[]',
  -- Collapsible "Product Details" on each product page; one "Label: value" per line.
  -- Leave empty to hide the section for this collection's products.
  product_spec text,
  sort_order  int not null default 0
);

create table public.products (
  id            bigint generated always as identity primary key,
  collection_id bigint not null references public.collections (id) on delete restrict,
  -- URL of the product page: /products/<slug>
  slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name          text not null,
  -- <title> of the product page; falls back to name when empty
  seo_title     text,
  description   text,
  price_cad     numeric(10, 2) not null check (price_cad >= 0),
  price_usd     numeric(10, 2) not null check (price_usd >= 0),
  -- Path inside the "product-images" storage bucket, e.g. "noir-gold-paisley.jpg"
  image_path    text,
  -- Badge on the product card, e.g. "Out of Stock"; leave empty for no badge
  status        text,
  sort_order    int not null default 0
);

create index products_collection_id_idx on public.products (collection_id);

-- ─── Security: anyone may read, nobody may write through the public API ────
-- Edit data through the Supabase dashboard (which bypasses these policies).

alter table public.collections enable row level security;
alter table public.products enable row level security;

create policy "Collections are publicly readable"
  on public.collections for select to anon, authenticated using (true);

create policy "Products are publicly readable"
  on public.products for select to anon, authenticated using (true);

-- ─── Image storage ─────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- ─── Seed data (the current catalog) ───────────────────────────────────────

insert into public.collections (slug, name, description, specs, sort_order) values
  ('heritage-silk', 'Heritage Silk', 'Timeless patterns inspired by tradition.',
   '[{"label": "Material", "value": "100% Grade 6A Mulberry Silk"},
     {"label": "Weave / Weight", "value": "Twill / 14 Momme"},
     {"label": "Hem", "value": "Hand-rolled"},
     {"label": "Size", "value": "70 x 70 cm (27.56 x 27.56 in)"}]', 1),
  ('spring-flora', 'Spring Flora', 'Feminine floral expressions inspired by spring.',
   '[{"label": "Material", "value": "100% Grade 6A Mulberry Silk"},
     {"label": "Weave / Weight", "value": "Twill / 14 Momme"},
     {"label": "Hem", "value": "Hand-rolled"},
     {"label": "Size", "value": "70 x 70 cm (27.56 x 27.56 in)"}]', 2),
  ('winter-classics', 'Winter Classics', 'Refined, unisex winter style with understated elegance.',
   '[{"label": "Material", "value": "70% Wool / 30% Mulberry Silk"},
     {"label": "Weave", "value": "Twill / Lightweight Warmth"},
     {"label": "Hem", "value": "Hand-rolled"},
     {"label": "Size", "value": "70 x 70 cm (27.56 x 27.56 in)"}]', 3),
  ('winter-heritage-paisley', 'Winter Heritage Paisley', 'Heritage patterns with warmth, softness, and character.',
   '[{"label": "Material", "value": "70% Wool / 30% Mulberry Silk"},
     {"label": "Weave", "value": "Twill / Lightweight Warmth"},
     {"label": "Hem", "value": "Hand-rolled"},
     {"label": "Size", "value": "70 x 70 cm (27.56 x 27.56 in)"}]', 4);

insert into public.products (collection_id, slug, name, seo_title, price_cad, price_usd, sort_order)
select c.id, v.slug, v.name, v.seo_title, 49.00, 35.00, v.sort_order
from (values
  ('heritage-silk', 'noir-gold-paisley-silk-scarf',         'Noir Gold Paisley',         'Gold Paisley Silk Scarf',                    1),
  ('heritage-silk', 'turquoise-baroque-paisley-silk-scarf', 'Turquoise Baroque Paisley', 'Turquoise Baroque Paisley Silk Scarf',       2),
  ('heritage-silk', 'azure-medallion-paisley-silk-scarf',   'Azure Medallion Paisley',   'Azure Medallion Paisley Silk Scarf',         3),
  ('heritage-silk', 'golden-medallion-paisley-silk-scarf',  'Golden Medallion Paisley',  'Golden Medallion Paisley Silk Scarf',        4),

  ('spring-flora', 'emerald-flora-silk-scarf',  'Emerald Flora',  'Emerald Flora Silk Scarf',  1),
  ('spring-flora', 'midnight-flora-silk-scarf', 'Midnight Flora', 'Midnight Flora Silk Scarf', 2),
  ('spring-flora', 'blue-peony-silk-scarf',     'Blue Peony',     'Blue Peony Silk Scarf',     3),
  ('spring-flora', 'blush-peony-silk-scarf',    'Blush Peony',    'Blush Peony Silk Scarf',    4),

  ('winter-classics', 'navy-polka-dot-paisley-wool-silk-scarf', 'Navy Polka Dot Paisley', 'Navy Polka Dot Paisley Wool & Silk Scarf', 1),
  ('winter-classics', 'crimson-garden-paisley-wool-silk-scarf', 'Crimson Garden Paisley', 'Crimson Garden Paisley Wool & Silk Scarf', 2),
  ('winter-classics', 'sage-garden-paisley-wool-silk-scarf',    'Sage Garden Paisley',    'Sage Garden Paisley Wool & Silk Scarf',    3),
  ('winter-classics', 'heritage-houndstooth-wool-silk-scarf',   'Heritage Houndstooth',   'Heritage Houndstooth Wool & Silk Scarf',   4),

  ('winter-heritage-paisley', 'grey-heritage-wool-silk-scarf', 'Grey Heritage', 'Grey Heritage Paisley Wool & Silk Scarf', 1),
  ('winter-heritage-paisley', 'brown-navy-wool-silk-scarf',    'Brown & Navy',  'Brown & Navy Paisley Wool & Silk Scarf',  2),
  ('winter-heritage-paisley', 'sage-wool-silk-scarf',          'Sage',          'Sage Paisley Wool & Silk Scarf',          3),
  ('winter-heritage-paisley', 'blue-red-wool-silk-scarf',      'Blue & Red',    'Blue & Red Paisley Wool & Silk Scarf',    4)
) as v (collection_slug, slug, name, seo_title, sort_order)
join public.collections c on c.slug = v.collection_slug;
