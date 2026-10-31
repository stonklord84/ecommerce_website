"use client";

import { useCart } from "@/lib/cart";
import CheckoutButton from "./CheckoutButton";

// "Proceed to Checkout" for everything in the cart.
export default function CartCheckoutButton() {
  return <CheckoutButton items={useCart()} label="Proceed to Checkout" fromCart />;
}
