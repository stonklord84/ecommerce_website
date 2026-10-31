"use client";

import { useEffect } from "react";
import { clearCart } from "@/lib/cart";

// Rendered on the success page after a cart checkout, so the paid-for items leave the cart.
export default function ClearCart() {
  useEffect(() => {
    clearCart();
  }, []);
  return null;
}
