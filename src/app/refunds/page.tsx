export const metadata = { title: "Refund Policy" };

export default function RefundsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
      <div className="space-y-6 text-sm leading-relaxed text-[var(--muted)]">
        <p className="text-base">Last updated: January 2026</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">14-Day Money-Back Guarantee</h2>
        <p>We offer a 14-day money-back guarantee for all paid subscription plans. If you are not satisfied with HTMLShield for any reason, you may request a full refund within 14 days of your initial payment.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">How to Request a Refund</h2>
        <p>To request a refund, please contact us with the email address associated with your subscription. We will process your refund within 5-10 business days.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">Free Trial</h2>
        <p>All paid plans include a 1-day free trial. No charge is made during the trial period. If you cancel before the trial ends, you will not be charged.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">Cancellation</h2>
        <p>You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. You will retain access to the Service until that time.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">Refund Processing</h2>
        <p>Refunds are processed through Paddle, our payment processor. The refund will be returned to your original payment method. Processing times may vary depending on your payment provider, typically taking 5-10 business days.</p>

        <h2 className="text-xl font-bold text-[var(--foreground)] mt-8">Exceptions</h2>
        <p>We reserve the right to refuse refunds in cases of fraudulent activity or violation of our Terms of Service.</p>
      </div>
    </div>
  );
}
