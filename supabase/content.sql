-- Editable site content: FAQ, Silk Library cards, and the Style and Care Guide.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- Then add a Database Webhook for each of the three tables (Insert/Update/Delete →
-- POST https://lumiereeast.com/api/revalidate with header x-revalidate-secret), the same
-- as the existing products/collections webhooks, so edits appear on the site immediately.
--
-- Text columns marked "Markdown" accept: ## Heading, ### Subheading, **bold**, *italic*,
-- [link text](/products/some-slug), "- " bullet lists, "1. " numbered lists, and | tables |.
-- Leave a blank line between paragraphs.

-- ─── Tables ────────────────────────────────────────────────────────────────

-- Homepage "Frequently Asked Questions" section (also sent to Google as FAQPage data).
create table public.faqs (
  id         bigint generated always as identity primary key,
  question   text not null,
  -- Plain text. Blank lines start a new paragraph.
  answer     text not null,
  -- Lower numbers show first; the first question starts expanded.
  sort_order int not null default 0
);

-- Homepage "The Silk Library" cards.
create table public.silk_library (
  id         bigint generated always as identity primary key,
  -- Small gold label above the title, e.g. "The Origin"
  tag        text not null,
  title      text not null,
  -- Markdown
  body       text not null,
  -- true = the card spans the full width of the grid (like "Care Protocol")
  wide       boolean not null default false,
  sort_order int not null default 0
);

-- Style and Care Guide articles: /style-and-care-guide/<slug>
create table public.guides (
  id               bigint generated always as identity primary key,
  -- URL of the guide page; lowercase words separated by hyphens
  slug             text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  -- Heading on the page and on the link boxes
  title            text not null,
  -- <title> shown in Google results; falls back to title when empty
  seo_title        text,
  -- Google result snippet, ideally 120–160 characters
  meta_description text not null,
  -- 1–2 sentences shown under the title on the homepage and the guide index
  excerpt          text not null,
  -- Markdown; the full article
  body             text not null,
  -- Guides are listed newest first. Empty = draft (hidden). A future date stays hidden until then.
  published_at     date,
  -- Optional "Last updated" date shown on the page and in the sitemap
  updated_at       date
);

-- ─── Security: anyone may read, nobody may write through the public API ────

alter table public.faqs enable row level security;
alter table public.silk_library enable row level security;
alter table public.guides enable row level security;

create policy "FAQs are publicly readable"
  on public.faqs for select to anon, authenticated using (true);

create policy "Silk Library is publicly readable"
  on public.silk_library for select to anon, authenticated using (true);

-- Drafts (no publish date, or a future one) are invisible to the website.
create policy "Published guides are publicly readable"
  on public.guides for select to anon, authenticated
  using (published_at is not null and published_at <= current_date);

-- ─── Seed data (today's content, unchanged) ────────────────────────────────

insert into public.faqs (question, answer, sort_order) values
  ('How do I wash a 100% Mulberry silk scarf?',
   'Hand wash in cool water (under 30°C) with a pH-neutral silk detergent. Do not wring or soak. Roll in a clean towel to absorb moisture, then lay flat to air dry away from direct sunlight.', 1),
  ('What makes Mulberry silk superior to polyester satin?',
   'Mulberry silk is a 100% natural protein fiber produced by Bombyx mori silkworms, offering natural temperature regulation, breathability, and hypoallergenic properties. Satin is a weave often made from synthetic polyester that lacks breathability.', 2),
  ('What is Momme and why does it matter for scarves?',
   'Momme (mm) measures the density and weight of silk fabric. High-quality fashion scarves typically range from 14 to 18 Momme, balancing lightweight drape with durability and opacity.', 3),
  ('Can I wear my silk scarf in the rain?',
   'Yes. Light rain or humidity will not damage Mulberry silk. Allow the scarf to air-dry flat at room temperature, and the fibers will settle back into their original alignment.', 4),
  ('How should I store my scarves between seasons?',
   'Fold your scarves flat inside a breathable cotton storage pouch or an acid-free gift box. Store them in a cool, dry place away from direct sunlight. Avoid keeping square scarves on wire or clip hangers for extended periods.', 5);

insert into public.silk_library (tag, title, body, wide, sort_order) values
  ('The Origin', 'Grade 6A Mulberry Silk',
   $$The highest tier of natural silk fiber obtainable worldwide. Harvested from Bombyx mori silkworms fed exclusively on fresh white mulberry leaves. Features a triangular prism structure that reflects light with a soft, shifting glow, while pure protein fibroin matches human skin pH.$$,
   false, 1),
  ('The Technique', 'Artisan Hand-Rolled Hems',
   $$An artisan rolls the edge inward toward the printed face and secures it with tiny, nearly invisible hand stitches (30–45 minutes per scarf). Unlike rigid machine stitching, hand-rolled hems preserve the fabric's diagonal bias, letting it drape freely.$$,
   false, 2),
  ('Textile Science', 'Mulberry Silk vs. Polyester Satin',
   $$While “satin” is merely a weave type, most commercial satin is made from non-breathable synthetic polyester. Mulberry silk possesses natural micro-porous, hollow-core fibers that breathe dynamically, eliminating static cling and regulating temperature.$$,
   false, 3),
  ('Weight Guide', 'Understanding Momme (mm)',
   $$Momme measures fabric weight in pounds per 100 yards at 45 inches wide.

| Tier | Characteristics | Application |
| --- | --- | --- |
| 8–12 mm | Ultra-sheer, lightweight | Ribbons, chiffons |
| **14–16 mm** | **Gold standard balance** | **Lumière East square scarves** |
| 18–22 mm | Dense, structured drape | Winter wraps, pillowcases |$$,
   false, 4),
  ('Care Protocol', 'Daily Maintenance & Hand Washing',
   $$Hand wash in cool water below 30°C with pH-neutral silk detergent. Swirl gently for 2–3 minutes without wringing. Lay flat inside a dry cotton towel and roll up like a roll cake to extract moisture, then air dry flat away from direct sunlight.$$,
   true, 5);

-- Two starter guides, saved as DRAFTS (published_at is empty) so nothing goes live until
-- the team has reviewed or replaced the text. To publish: set published_at to today's date.
insert into public.guides (slug, title, seo_title, meta_description, excerpt, body) values
  ('silk-scarf-care-guide',
   'The Silk Scarf Care Guide',
   'Silk Scarf Care Guide: How to Wash, Dry & Store Mulberry Silk',
   'How to hand wash, dry, iron and store a 100% Mulberry silk scarf so it keeps its colour, softness and drape for years.',
   'Washing, drying, ironing and storing your Mulberry silk and wool-silk scarves, step by step.',
   $$Mulberry silk is a natural protein fiber. Treated gently, a silk scarf keeps its colour, softness and drape for many years.

## Hand Washing

1. Fill a basin with cool water below 30°C and add a small amount of pH-neutral silk detergent.
2. Swirl the scarf gently for 2–3 minutes. Do not soak, scrub or wring.
3. Rinse in clean cool water until no detergent remains.

## Drying

Lay the scarf flat inside a dry cotton towel and roll it up to absorb the moisture. Unroll and leave it to air dry flat, away from direct sunlight and heat.

## Storing Between Seasons

Fold your scarves flat inside a breathable cotton storage pouch or an acid-free gift box, and keep them in a cool, dry place away from direct sunlight. Avoid keeping square scarves on wire or clip hangers for long periods.$$),
  ('silk-scarf-style-guide',
   'The Silk Scarf Style Guide',
   'Silk Scarf Style Guide: Ways to Tie & Wear a Square Silk Scarf',
   'Simple ways to tie and wear a square Mulberry silk scarf — at the neck, in the hair, on a bag — for every season.',
   'Easy ways to tie and wear a square silk scarf, from the classic neck knot to the hair and handbag.',
   $$A square silk scarf is one of the most versatile pieces in a wardrobe.

## At the Neck

Fold the scarf into a long band and tie a loose knot at the side of the neck for an easy, polished look.

## In the Hair

Fold into a narrow band and wear it as a headband, or tie it around a ponytail.

## On a Handbag

Wrap the scarf around a bag handle, or tie it in a bow on the strap.$$);
