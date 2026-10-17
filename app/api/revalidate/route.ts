import { revalidatePath } from "next/cache";

// Called by the Supabase Database Webhooks on the products and collections tables,
// so edits show on the site right away instead of after the hourly revalidate.
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || request.headers.get("x-revalidate-secret") !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Marks every page stale; each one rebuilds with fresh Supabase data on its next visit.
  revalidatePath("/", "layout");

  return Response.json({ revalidated: true });
}
