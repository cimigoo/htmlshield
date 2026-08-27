"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <svg className="w-8 h-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
            <span>HTMLShield</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/app" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Playground</Link>
            <Link href="/docs" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Docs</Link>
            <Link href="/#pricing" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">Pricing</Link>
            <Link href="/faq" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">FAQ</Link>
            <a
              href="/#pricing"
              className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
            >
              Get API Key
            </a>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/app" className="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Playground</Link>
            <Link href="/docs" className="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Docs</Link>
            <Link href="/#pricing" className="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">Pricing</Link>
            <Link href="/faq" className="block px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">FAQ</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
