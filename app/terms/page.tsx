import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage, { Mail } from "@/components/PolicyPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you use the ${site.name} website and purchase our products.`,
};

const inlineLink = "border-b border-gold text-ink";

export default function TermsPage() {
  return (
    <PolicyPage title="Terms of Service" updated="November 8, 2026">
      <p>
        These Terms of Service govern your use of the {site.name} website and any purchase you make from us. By using
        the site or placing an order, you agree to these terms.
      </p>

      <h2>Products &amp; Pricing</h2>
      <p>
        We make every effort to display our products, colours, and prices accurately, but slight variations may
        occur and we cannot guarantee that every description is error-free. Prices and availability may change
        without notice. We reserve the right to refuse or cancel any order, including orders affected by pricing
        errors or suspected fraud; if we cancel an order after payment, we will issue a full refund.
      </p>

      <h2>Orders &amp; Payment</h2>
      <p>
        Payment is processed securely by our third-party payment processor at checkout. By placing an order, you
        confirm that the information you provide is accurate and that you are authorized to use the payment method.
      </p>

      <h2>Shipping, Returns &amp; Refunds</h2>
      <p>
        Shipping is described in our{" "}
        <Link href="/shipping" className={inlineLink}>
          Shipping Policy
        </Link>
        , and returns and refunds in our{" "}
        <Link href="/returns" className={inlineLink}>
          Returns &amp; Refunds
        </Link>{" "}
        policy. Both form part of these terms.
      </p>

      <h2>Accounts</h2>
      <p>
        If you create an account, you are responsible for keeping your login details confidential and for activity
        under your account. Let us know promptly if you suspect unauthorized use.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this site — including text, images, designs, logos, and graphics — belongs to {site.name} or
        its licensors and may not be copied, reproduced, or used without our written permission.
      </p>

      <h2>Acceptable Use</h2>
      <p>
        You agree not to use the site for any unlawful purpose, to interfere with its operation or security, or to
        attempt to access accounts or data that are not yours.
      </p>

      <h2>Disclaimer &amp; Limitation of Liability</h2>
      <p>
        The site is provided &quot;as is&quot; and &quot;as available&quot;. To the fullest extent permitted by law,{" "}
        {site.name} is not liable for any indirect, incidental, or consequential damages arising from your use of the
        site or our products, and our total liability for any claim is limited to the amount you paid for the product
        giving rise to the claim. Nothing in these terms limits any rights you have under applicable consumer
        protection law.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable
        there.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these terms from time to time. Changes take effect when posted on this page with a new
        &quot;Last updated&quot; date.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about these terms? Email <Mail email={site.email} /> or call {site.phoneDisplay}.
      </p>
    </PolicyPage>
  );
}
