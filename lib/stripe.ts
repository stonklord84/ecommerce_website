import "server-only";
import Stripe from "stripe";

const key = process.env.lumiere_website_payment;

if (!key) {
  throw new Error("Missing lumiere_website_payment. Add it to .env (see .env.example) with your Stripe secret key.");
}

// Server-only: the secret key has no NEXT_PUBLIC_ prefix, so it never reaches the browser.
export const stripe = new Stripe(key);
