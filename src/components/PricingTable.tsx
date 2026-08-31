"use client";

import { useState } from "react";

interface PaddleWindow extends Window {
  Paddle?: {
    Checkout: {
      open: (options: { items: Array<{ priceId: string; quantity: number }> }) => void;
    };
    Initialize?: (options: { token: string }) => void;
  };
}

interface Plan {
  name: string;
  price: string;
  period: string;
  calls: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
  priceId?: string;
}

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    calls: "3 requests/day/IP",
    features: [
      "No API key required",
      "Standard sanitization mode",
      "All XSS protections",
      "Rate limited by IP",
    ],
    cta: "Start Free",
  },
  {
    name: "Starter",
    price: "$3",
    period: "/month",
    calls: "15,000 calls/month",
    features: [
      "API key authentication",
      "All sanitization modes",
      "Custom allowed tags/attributes",
      "Email support",
      "1-day free trial",
    ],
    cta: "Start Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    calls: "100,000 calls/month",
    features: [
      "Everything in Starter",
      "Priority processing",
      "Advanced permissive mode",
      "Priority email support",
      "1-day free trial",
    ],
    cta: "Start Trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$25",
    period: "/month",
    calls: "500,000 calls/month",
    features: [
      "Everything in Pro",
      "Highest rate limits",
      "Dedicated support",
      "Custom integrations",
      "1-day free trial",
    ],
    cta: "Start Trial",
    highlighted: false,
  },
];

export function PricingTable() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (planName: string) => {
    const planKey = planName.toLowerCase();
    setLoading(planName);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });
      const json = await res.json();
      if (!res.ok || !json.checkoutUrl) {
        alert(json.error || "Could not start checkout. Please try again.");
        setLoading(null);
        return;
      }
      window.location.href = json.checkoutUrl;
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Network error. Please check your connection and try again.");
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-2xl p-6 border transition-all ${
            plan.highlighted
              ? "border-[var(--primary)] bg-blue-50 dark:bg-blue-950/30 shadow-lg shadow-blue-500/10 scale-[1.02]"
              : "border-[var(--border)] bg-[var(--card)]"
          }`}
        >
          {plan.highlighted && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
          )}
          <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl font-extrabold">{plan.price}</span>
            <span className="text-sm text-[var(--muted)]">{plan.period}</span>
          </div>
          <p className="text-sm text-[var(--primary)] font-medium mb-4">{plan.calls}</p>
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          {plan.name === "Free" ? (
            <a
              href="/app"
              className="block w-full text-center py-2.5 rounded-lg border border-[var(--border)] font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {plan.cta}
            </a>
          ) : (
            <button
              onClick={() => handleCheckout(plan.name)}
              disabled={loading === plan.name}
              className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 ${
                plan.highlighted
                  ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                  : "border border-[var(--primary)] text-[var(--primary)] hover:bg-blue-50 dark:hover:bg-blue-950/50"
              }`}
            >
              {loading === plan.name ? "Redirecting to Paddle…" : plan.cta}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
