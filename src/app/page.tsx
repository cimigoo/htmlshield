import Link from "next/link";
import { PricingTable } from "@/components/PricingTable";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-[var(--primary)] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              API Live &mdash; No signup required for free tier
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Sanitize HTML.
              <br />
              <span className="text-[var(--primary)]">Block XSS.</span> Protect Users.
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] mb-10 max-w-2xl mx-auto">
              A powerful HTML sanitization API that removes malicious scripts, dangerous tags,
              and harmful attributes with a single POST request. Pure rules, zero data retention.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/app"
                className="w-full sm:w-auto bg-[var(--primary)] text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-[var(--primary-hover)] transition-colors shadow-lg shadow-blue-500/25"
              >
                Try Playground Free
              </a>
              <Link
                href="/docs"
                className="w-full sm:w-auto border-2 border-[var(--border)] px-8 py-3.5 rounded-xl font-semibold text-lg hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              >
                Read API Docs
              </Link>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-[var(--code-bg)] rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-slate-400 text-sm font-mono">cURL</span>
              </div>
              <pre className="p-6 text-sm leading-relaxed overflow-x-auto">
                <code>
                  <span className="token-function">curl</span> -X POST https://htmlshield.vercel.app/api/sanitize \

                  {"  "}-H <span className="token-string">"Content-Type: application/json"</span> \

                  {"  "}-d <span className="token-string">'{`
{
  "html": "<p>Hello</p><script>alert(\"XSS\")</script>",
  "options": { "mode": "standard" }
}`}'</span>
                </code>
              </pre>
            </div>
            <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">Response:</p>
              <pre className="text-xs bg-transparent p-0 text-green-900 dark:text-green-200">
{`{
  "success": true,
  "data": {
    "sanitized": "<p>Hello</p>",
    "stats": {
      "original_length": 56,
      "sanitized_length": 12,
      "tags_removed": 1,
      "attributes_removed": 0
    },
    "mode": "standard"
  },
  "remaining": 2
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why HTMLShield?</h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Built for developers who need reliable HTML sanitization without the complexity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "XSS Protection",
                desc: "Automatically strips <script> tags, event handlers (onclick, onerror), javascript: URLs, and other XSS vectors.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Lightning Fast",
                desc: "Pure rule-based processing with no database queries. Most requests complete in under 50ms.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Zero Data Retention",
                desc: "We never store your HTML. Each request is processed in memory and immediately discarded. Your data stays yours.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Flexible Modes",
                desc: "Strict, Standard, Permissive, or fully Custom. Choose exactly which tags and attributes to allow.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ),
                title: "Edge-Ready",
                desc: "Deployed on Vercel's global edge network. Low latency from anywhere in the world.",
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
                title: "Developer First",
                desc: "Clean REST API with cURL, Python, and JavaScript examples. Comprehensive docs. Integrate in minutes.",
              },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-[var(--primary)] rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-[var(--muted)]">Three simple steps to secure your HTML content.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Send HTML", desc: "POST your HTML string to /api/sanitize with optional mode settings." },
              { step: "02", title: "We Sanitize", desc: "Our engine strips all malicious scripts, dangerous tags, and harmful attributes." },
              { step: "03", title: "Get Safe HTML", desc: "Receive clean, safe HTML with detailed stats on what was removed." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-6xl font-extrabold text-blue-100 dark:text-blue-900/50 mb-3">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-slate-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Start free, upgrade when you need more. All paid plans include a 1-day free trial.
            </p>
          </div>
          <PricingTable />
          <p className="text-center text-sm text-[var(--muted)] mt-8">
            All prices in USD. Cancel anytime. Need higher limits?{" "}
            <a href="mailto:hello@htmlshield.vercel.app" className="text-[var(--primary)] hover:underline">Contact us</a>.
          </p>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "What is XSS and why do I need sanitization?", a: "Cross-Site Scripting (XSS) is a security vulnerability where attackers inject malicious scripts into web pages viewed by other users. HTML sanitization removes these scripts before content reaches your users' browsers." },
              { q: "Do I need an API key to use the free tier?", a: "No. The free tier allows 3 requests per day per IP address without any authentication. Simply POST your HTML to /api/sanitize." },
              { q: "What's the difference between modes?", a: "Strict allows only basic text tags. Standard adds images and tables. Permissive allows HTML5 media and structural tags. Custom lets you specify exact allowed tags and attributes." },
              { q: "Do you store my HTML data?", a: "No. We have zero data retention policy. Your HTML is processed in memory and immediately discarded. We don't use a database." },
            ].map((item, i) => (
              <details key={i} className="group bg-white dark:bg-slate-900 rounded-xl border border-[var(--border)] p-5">
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <svg className="w-5 h-5 text-[var(--muted)] group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="text-[var(--primary)] font-medium hover:underline">View all FAQs &rarr;</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to secure your HTML?</h2>
          <p className="text-blue-100 text-lg mb-8">Start with 3 free requests per day. No credit card required.</p>
          <a
            href="/app"
            className="inline-block bg-white text-[var(--primary)] px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            Open Playground
          </a>
        </div>
      </section>
    </div>
  );
}
