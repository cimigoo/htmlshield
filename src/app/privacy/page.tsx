export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed text-[var(--muted)]">
        <p className="text-base">Last updated: January 2026</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">1. Zero Data Retention</h2>
        <p>HTMLShield does not store any HTML content sent through our API. All content is processed in memory and immediately discarded after the sanitized result is returned. We do not maintain a database of user content.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">2. Information We Collect</h2>
        <p>When you subscribe to a paid plan, our payment processor Paddle collects the following information:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Email address</li>
          <li>Billing information (processed securely by Paddle)</li>
          <li>Payment method details (we never see or store full card numbers)</li>
        </ul>
        <p>For free tier usage, we temporarily track request counts by IP address in server memory for rate limiting purposes. This data is ephemeral and not persisted.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">3. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To process payments and manage subscriptions</li>
          <li>To generate and manage API keys</li>
          <li>To enforce rate limits on the free tier</li>
          <li>To communicate about your account or service updates</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">4. Data Security</h2>
        <p>All API requests are encrypted using HTTPS/TLS. API keys are signed using HMAC-SHA256. We follow industry best practices to protect your information.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">5. Third-Party Services</h2>
        <p>We use Paddle (paddle.com) for payment processing. Their privacy policy applies to payment data. We use Vercel (vercel.com) for hosting and infrastructure.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">6. Contact</h2>
        <p>For privacy-related questions, contact us at the email provided on our homepage.</p>
      </div>
    </div>
  );
}
