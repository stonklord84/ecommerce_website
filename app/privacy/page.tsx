import type { Metadata } from "next";
import PolicyPage, { Mail } from "@/components/PolicyPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects your personal information.`,
};

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy Policy" updated="November 8, 2026">
      <p>
        {site.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy. This policy explains
        what personal information we collect when you visit our website or make a purchase, how we use it, and the
        choices you have.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Information you provide:</strong> your name, email address, phone number, shipping and billing
          address, account login details, and any messages you send us.
        </li>
        <li>
          <strong>Order information:</strong> the products you purchase and your order history. Payment card details
          are entered directly with our payment processor; we do not store your full card number.
        </li>
        <li>
          <strong>Automatically collected information:</strong> device and browser information, IP address, pages
          viewed, and similar usage data collected through cookies and similar technologies.
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process and fulfil your orders, including payment, shipping, returns, and refunds.</li>
        <li>To create and manage your account and save your cart.</li>
        <li>To respond to your questions and provide customer service.</li>
        <li>To send order updates and, where you have agreed, marketing emails (you can unsubscribe at any time).</li>
        <li>To operate, maintain, secure, and improve our website, and to prevent fraud.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>How We Share Your Information</h2>
      <p>
        We do not sell your personal information. We share it only with service providers who help us run our
        business — such as payment processing, website hosting, account and database services, email and form
        services, shipping carriers, and advertising or analytics partners — and only as needed for them to perform
        those services. We may also disclose information if required by law or to protect our rights.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies and similar technologies to keep you signed in, remember your cart, understand how our site is
        used, and measure the effectiveness of our advertising. You can control cookies through your browser
        settings, though some features of the site may not work without them.
      </p>

      <h2>Data Storage &amp; Security</h2>
      <p>
        We take reasonable measures to protect your personal information. Our service providers may store and process
        information in Canada, the United States, or other countries, where it may be subject to the laws of those
        jurisdictions. We keep personal information only as long as needed for the purposes described here or as
        required by law.
      </p>

      <h2>Your Rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, or delete your personal information,
        or to withdraw your consent to certain uses. To make a request, contact us at <Mail email={site.email} />.
      </p>

      <h2>Children</h2>
      <p>Our website is not directed to children under 13, and we do not knowingly collect their information.</p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Changes take effect when posted on this page with a new
        &quot;Last updated&quot; date.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about this policy? Email <Mail email={site.email} /> or call {site.phoneDisplay}.
      </p>
    </PolicyPage>
  );
}
