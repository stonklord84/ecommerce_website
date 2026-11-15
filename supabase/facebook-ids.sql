-- Links each product to its Content ID in the Facebook Shop catalog, so
-- /checkout (app/checkout/route.ts) knows which scarf a Facebook buyer tapped.
-- Run once in the Supabase dashboard: SQL Editor → New query → paste → Run.
--
-- Adding a product to the Facebook Shop later? Type its Content ID into the
-- facebook_id column of that product in the Table Editor. No code change needed.

alter table public.products
  add column if not exists facebook_id text unique;

update public.products p
set facebook_id = v.facebook_id
from (values
  ('noir-gold-paisley-silk-scarf',           '4589272928'),
  ('azure-medallion-paisley-silk-scarf',     '4589271631'),
  ('turquoise-baroque-paisley-silk-scarf',   '4589275790'),
  ('golden-medallion-paisley-silk-scarf',    '4589278564'),
  ('emerald-flora-silk-scarf',               '4589274749'),
  ('blue-peony-silk-scarf',                  '4589280467'),
  ('blush-peony-silk-scarf',                 '4589283835'),
  ('crimson-garden-paisley-wool-silk-scarf', '4589301628'),
  ('sage-garden-paisley-wool-silk-scarf',    '4589295035'),
  ('navy-polka-dot-paisley-wool-silk-scarf', '4589298174'),
  ('heritage-houndstooth-wool-silk-scarf',   '4589307964')
) as v (slug, facebook_id)
where p.slug = v.slug;

-- Check: should list all 11 with their Facebook IDs.
select name, facebook_id from public.products where facebook_id is not null order by name;
