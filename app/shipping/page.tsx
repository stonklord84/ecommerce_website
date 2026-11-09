import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage, { Mail } from "@/components/PolicyPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "We ship to Canada and the United States. Shipping is currently complimentary on every order.",
};

export default function ShippingPage() {
  return (
    <PolicyPage title="Shipping Policy">
      <h2>Where We Ship</h2>
      <p>We currently ship to addresses in Canada and the United States only.</p>

      <h2>Shipping Cost</h2>
      <p>
        Shipping is currently complimentary on every order — no promo code needed. Free shipping is applied
        automatically at checkout.
      </p>

      <h2>Order Processing &amp; Tracking</h2>
      <p>
        Once your order has shipped, you will receive a confirmation email with tracking details. Delivery times
        vary by destination and carrier.
      </p>

      <h2>Duties &amp; Taxes</h2>
      <p>
        Orders ship from Canada. Orders delivered outside Canada may be subject to import duties, taxes, or brokerage
        fees charged by the destination country, which are the responsibility of the recipient.
      </p>

      <h2>Address Accuracy</h2>
      <p>
        Please make sure your shipping address is complete and correct at checkout. We are not responsible for
        orders delivered to an incorrect address provided at checkout. If you notice an error, contact us as soon as
        possible and we will do our best to update it before the order ships.
      </p>

      <h2>Lost or Damaged Parcels</h2>
      <p>
        If your parcel is lost in transit or arrives damaged, please contact us and we will make it right. See our{" "}
        <Link href="/returns" className="border-b border-gold text-ink">
          Returns &amp; Refunds
        </Link>{" "}
        policy for details.
      </p>

      <h2>Questions</h2>
      <p>
        Contact us at <Mail email={site.email} /> or {site.phoneDisplay}.
      </p>
    </PolicyPage>
  );
}
