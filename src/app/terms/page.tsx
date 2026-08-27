export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="space-y-6 text-sm leading-relaxed text-[var(--muted)]">
        <p className="text-base">Last updated: January 2026</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">1. Acceptance of Terms</h2>
        <p>By accessing or using HTMLShield ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">2. Description of Service</h2>
        <p>HTMLShield provides an HTML sanitization API that removes malicious scripts and dangerous HTML elements from user-supplied content. The Service is provided "as is" without warranties of any kind.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">3. Free Tier</h2>
        <p>The free tier allows up to 3 requests per day per IP address without authentication. We reserve the right to modify or discontinue the free tier at any time.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">4. Paid Subscriptions</h2>
        <p>Paid plans are billed monthly in advance through Paddle. All paid plans include a 1-day free trial. You may cancel at any time. Refunds are available within 14 days of purchase as described in our Refund Policy.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">5. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use the Service for any unlawful purpose</li>
          <li>Attempt to bypass rate limits or authentication</li>
          <li>Send excessively large payloads to disrupt the service</li>
          <li>Reverse engineer or attempt to extract source code</li>
          <li>Resell or redistribute API access without authorization</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">6. Limitation of Liability</h2>
        <p>HTMLShield provides sanitization as a tool but does not guarantee that all malicious content will be removed in every scenario. You are responsible for implementing additional security measures appropriate for your use case. We shall not be liable for any indirect, incidental, or consequential damages.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">7. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">8. Contact</h2>
        <p>For questions about these terms, contact us through the information provided on our homepage.</p>
      </div>
    </div>
  );
}
