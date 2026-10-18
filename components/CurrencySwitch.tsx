"use client";

import { type Currency, setCurrency, useCurrency } from "@/lib/currency";

const options: Currency[] = ["cad", "usd"];

export default function CurrencySwitch() {
  const currency = useCurrency();

  return (
    <span role="group" aria-label="Currency" className="flex items-center gap-1.5">
      {options.map((option, i) => (
        <span key={option} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true">|</span>}
          <button
            type="button"
            onClick={() => setCurrency(option)}
            aria-pressed={currency === option}
            className={`cursor-pointer uppercase tracking-[1.5px] transition duration-300 ease-silk hover:text-gold-light ${
              currency === option ? "font-semibold text-gold-light" : "opacity-60"
            }`}
          >
            {option} ($)
          </button>
        </span>
      ))}
    </span>
  );
}
