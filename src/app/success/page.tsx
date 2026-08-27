"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(!!email);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!email) return;
    let retries = 0;
    const maxRetries = 10;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/retrieve-key?email=${encodeURIComponent(email)}`);
        if (res.ok) {
          const data = await res.json();
          setApiKey(data.apiKey);
          setLoading(false);
          clearInterval(interval);
        } else {
          retries++;
          if (retries >= maxRetries) {
            setLoading(false);
            setNotFound(true);
            clearInterval(interval);
          }
        }
      } catch {
        retries++;
        if (retries >= maxRetries) {
          setLoading(false);
          setNotFound(true);
          clearInterval(interval);
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [email]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg text-[var(--muted)] mb-8">
        Thank you for subscribing to HTMLShield. Your API key is being generated.
      </p>

      {loading && (
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center gap-3">
            <svg className="w-5 h-5 animate-spin text-[var(--primary)]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm">Generating your API key... This may take a few seconds.</span>
          </div>
        </div>
      )}

      {apiKey && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6 text-left">
          <h2 className="font-bold text-lg mb-2">Your API Key</h2>
          <p className="text-sm text-[var(--muted)] mb-3">Copy this key and keep it safe. Use it in the Authorization header.</p>
          <div className="bg-[var(--code-bg)] p-4 rounded-lg font-mono text-sm text-green-400 break-all">
            {apiKey}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(apiKey)}
            className="mt-3 text-sm text-[var(--primary)] hover:underline"
          >
            Copy to clipboard
          </button>
        </div>
      )}

      {notFound && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-6">
          <p className="text-sm">
            Your API key is still being processed. Please check your email for confirmation,
            or contact support if you don&apos;t receive it within a few minutes.
          </p>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Link href="/docs" className="bg-[var(--primary)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--primary-hover)]">
          Read API Docs
        </Link>
        <Link href="/" className="border border-[var(--border)] px-6 py-3 rounded-xl font-medium hover:border-[var(--primary)]">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
