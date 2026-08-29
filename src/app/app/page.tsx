"use client";

import { useState } from "react";

const MODES = [
  { value: "strict", label: "Strict", desc: "Basic text tags only" },
  { value: "standard", label: "Standard", desc: "Rich text + images + tables" },
  { value: "permissive", label: "Permissive", desc: "HTML5 media + structure" },
];

const SAMPLE_HTML = `<div class="post">
  <h1 onclick="alert('hacked')">Hello World</h1>
  <p>This is a <strong>safe</strong> paragraph with a <a href="https://example.com">link</a>.</p>
  <script>alert('XSS attack!')</script>
  <img src=x onerror="alert('xss')" alt="broken">
  <iframe src="javascript:alert('xss')"></iframe>
  <p style="color:red">Styled text is fine in standard mode.</p>
</div>`;

interface SanitizeStats {
  original_length: number;
  sanitized_length: number;
  tags_removed: number;
  attributes_removed: number;
}

interface SanitizeResponse {
  success: boolean;
  data?: {
    sanitized: string;
    stats: SanitizeStats;
    mode: string;
  };
  remaining?: number;
  error?: string;
}

export default function PlaygroundPage() {
  const [input, setInput] = useState(SAMPLE_HTML);
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("standard");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<SanitizeStats | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleSanitize = async () => {
    setLoading(true);
    setError("");
    setOutput("");
    setStats(null);

    try {
      const res = await fetch("/api/sanitize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: input, options: { mode } }),
      });
      const data: SanitizeResponse = await res.json();
      if (data.success && data.data) {
        setOutput(data.data.sanitized);
        setStats(data.data.stats);
        setRemaining(data.remaining ?? null);
      } else {
        setError(data.error || "Sanitization failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Playground</h1>
        <p className="text-[var(--muted)]">Test HTML sanitization in real-time. No API key needed (free tier: 3/day).</p>
      </div>

      {/* Mode Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === m.value
                ? "bg-[var(--primary)] text-white shadow-md"
                : "bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)]"
            }`}
          >
            {m.label}
            <span className="block text-xs opacity-70 mt-0.5">{m.desc}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">Input HTML</label>
            <button
              onClick={() => setInput(SAMPLE_HTML)}
              className="text-xs text-[var(--primary)] hover:underline"
            >
              Load sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-80 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            placeholder="Paste your HTML here..."
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">Sanitized Output</label>
            {remaining !== null && (
              <span className="text-xs text-[var(--muted)]">
                {remaining} free request{remaining !== 1 ? "s" : ""} remaining today
              </span>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-80 p-4 rounded-xl border border-[var(--border)] bg-[var(--code-bg)] text-green-400 font-mono text-sm resize-none"
            placeholder="Sanitized HTML will appear here..."
            spellCheck={false}
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleSanitize}
          disabled={loading || !input.trim()}
          className="bg-[var(--primary)] text-white px-10 py-3 rounded-xl font-semibold text-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 shadow-lg shadow-blue-500/25"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sanitizing...
            </span>
          ) : (
            "Sanitize HTML"
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 max-w-2xl mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="mt-8 max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Original Length", value: stats.original_length },
            { label: "Sanitized Length", value: stats.sanitized_length },
            { label: "Tags Removed", value: stats.tags_removed },
            { label: "Attributes Removed", value: stats.attributes_removed },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
              <div className="text-2xl font-extrabold text-[var(--primary)]">{stat.value}</div>
              <div className="text-xs text-[var(--muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
