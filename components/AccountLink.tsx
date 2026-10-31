"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

// The account icon in the header. Being on every page, it also starts the auth
// listener, which loads a signed-in customer's saved cart.
export default function AccountLink() {
  const { user } = useAuth();

  return (
    <Link href="/account" aria-label={user ? "Your account" : "Sign in"} title={user?.email ?? "Sign in"}>
      👤
    </Link>
  );
}
