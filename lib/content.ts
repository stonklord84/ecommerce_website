import "server-only";
import { cache } from "react";
import { supabase } from "./supabase";

// Mirrors the tables in supabase/content.sql.
export type Faq = { id: number; question: string; answer: string };

export type SilkLibraryCard = { id: number; tag: string; title: string; body: string; wide: boolean };

export type Guide = {
  id: number;
  slug: string;
  title: string;
  seo_title: string | null;
  meta_description: string;
  excerpt: string;
  body: string;
  // "YYYY-MM-DD"
  published_at: string;
  updated_at: string | null;
};

export type GuideSummary = Pick<Guide, "slug" | "title" | "excerpt" | "published_at" | "updated_at">;

// Wrapped in React's cache() so the FAQ section and the FAQPage JSON-LD share one query.
export const getFaqs = cache(async (): Promise<Faq[]> => {
  const { data, error } = await supabase.from("faqs").select("id, question, answer").order("sort_order");
  if (error) throw new Error(`Failed to load FAQs: ${error.message}`);
  return data;
});

export const getSilkLibrary = cache(async (): Promise<SilkLibraryCard[]> => {
  const { data, error } = await supabase
    .from("silk_library")
    .select("id, tag, title, body, wide")
    .order("sort_order");
  if (error) throw new Error(`Failed to load Silk Library: ${error.message}`);
  return data;
});

// Published guides only (drafts are filtered out by the row-level security policy), newest first.
export const getGuides = cache(async (limit?: number): Promise<GuideSummary[]> => {
  let query = supabase
    .from("guides")
    .select("slug, title, excerpt, published_at, updated_at")
    .order("published_at", { ascending: false })
    .order("id", { ascending: false });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to load guides: ${error.message}`);
  return data;
});

export const getGuide = cache(async (slug: string): Promise<Guide | null> => {
  const { data, error } = await supabase.from("guides").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(`Failed to load guide "${slug}": ${error.message}`);
  return data;
});

// "2026-11-23" → "November 23, 2026", without timezone shifts.
export function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
