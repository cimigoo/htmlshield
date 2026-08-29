import Link from "next/link";
import type { Metadata } from "next";

const faqs = [
  {
    category: "General",
    items: [
      { q: "What is HTMLShield?", a: "HTMLShield is an HTML sanitization API that removes malicious scripts, dangerous tags, and harmful attributes from HTML strings. It helps protect your applications from Cross-Site Scripting (XSS) attacks." },
      { q: "What is XSS?", a: "Cross-Site Scripting (XSS) is a security vulnerability where attackers inject malicious scripts into web pages. When other users view these pages, the scripts execute in their browsers, potentially stealing data or performing actions on their behalf." },
      { q: "How does HTMLShield work?", a: "You send an HTML string via POST request to our API. We parse it using the sanitize-html library, remove all dangerous elements based on the selected mode, and return the clean, safe HTML along with statistics on what was removed." },
      { q: "Is HTMLShield open source?", a: "The core sanitization engine uses the open-source sanitize-html library. Our API wrapper and infrastructure are proprietary." },
    ],
  },
  {
    category: "Usage",
    items: [
      { q: "Do I need an API key to use HTMLShield?", a: "No API key is needed for the free tier, which allows 3 requests per day per IP address. For higher limits, you'll need a paid plan and API key." },
      { q: "What's the maximum HTML size per request?", a: "Each request can contain up to 5MB of HTML content." },
      { q: "Which sanitization mode should I use?", a: "Use Strict for maximum safety (basic text only), Standard for rich text content (default), Permissive for trusted content that includes media, or Custom for full control over allowed tags and attributes." },
      { q: "Can I use HTMLShield in any programming language?", a: "Yes. HTMLShield is a REST API accessible from any language that can make HTTP requests, including Python, JavaScript, Ruby, Go, Java, PHP, and more." },
    ],
  },
  {
    category: "Billing",
    items: [
      { q: "How does the free trial work?", a: "All paid plans come with a 1-day free trial. You can explore the full features of your chosen plan without being charged. If you cancel within the trial period, you won't be billed." },
      { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards and debit cards through Paddle, our payment processor. Paddle also supports PayPal and local payment methods in many regions." },
      { q: "Do you offer refunds?", a: "Yes, we offer a 14-day money-back guarantee. If you're not satisfied, contact us within 14 days of your payment for a full refund." },
    ],
  },
  {
    category: "Security & Privacy",
    items: [
      { q: "Do you store my HTML data?", a: "No. We have a strict zero data retention policy. Your HTML is processed in memory and immediately discarded after the response is sent. We don't use a database to store any content." },
      { q: "Is my API key secure?", a: "Yes. API keys are signed using HMAC-SHA256 and transmitted over HTTPS. We never log full API keys. Keep your key secret and don't expose it in client-side code." },
      { q: "What happens if my API key is compromised?", a: "Contact us immediately and we'll issue a new key. Your old key will be invalidated." },
    ],
  },
];

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about HTMLShield — the HTML sanitizer API for XSS protection. Answers on usage, billing, security, and data privacy.",
  alternates: { canonical: "https://htmlshield.vercel.app/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="text-4xl font-bold mb-2">Frequently Asked Questions</h1>
      <p className="text-lg text-[var(--muted)] mb-10">Everything you need to know about HTMLShield.</p>

      {faqs.map((section) => (
        <section key={section.category} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{section.category}</h2>
          <div className="space-y-3">
            {section.items.map((item, i) => (
              <details key={i} className="group bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between gap-4">
                  {item.q}
                  <svg className="w-5 h-5 text-[var(--muted)] shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
        <h3 className="font-bold mb-2">Still have questions?</h3>
        <p className="text-sm text-[var(--muted)] mb-4">Try the playground or read the API documentation.</p>
        <div className="flex justify-center gap-4">
          <Link href="/app" className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)]">Playground</Link>
          <Link href="/docs" className="border border-[var(--border)] px-5 py-2 rounded-lg text-sm font-medium hover:border-[var(--primary)]">API Docs</Link>
        </div>
      </div>
    </div>
  );
}
