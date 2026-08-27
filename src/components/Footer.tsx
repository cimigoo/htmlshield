import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-lg mb-3">
              <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              HTMLShield
            </div>
            <p className="text-sm text-[var(--muted)]">
              Secure HTML sanitization API. Protect your applications from XSS attacks.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><Link href="/app" className="hover:text-[var(--primary)]">Playground</Link></li>
              <li><Link href="/docs" className="hover:text-[var(--primary)]">API Docs</Link></li>
              <li><Link href="/#pricing" className="hover:text-[var(--primary)]">Pricing</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--primary)]">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><Link href="/privacy" className="hover:text-[var(--primary)]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--primary)]">Terms of Service</Link></li>
              <li><Link href="/refunds" className="hover:text-[var(--primary)]">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li><Link href="/docs" className="hover:text-[var(--primary)]">Getting Started</Link></li>
              <li><a href="/api/health" className="hover:text-[var(--primary)]">Health Check</a></li>
              <li><a href="https://github.com/cimigoo/htmlshield" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)]">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-[var(--muted)]">
          &copy; {new Date().getFullYear()} HTMLShield. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
