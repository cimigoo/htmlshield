import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">API Documentation</h1>
      <p className="text-lg text-[var(--muted)] mb-10">Everything you need to integrate HTMLShield into your application.</p>

      {/* Base URL */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Base URL</h2>
        <pre><code>https://htmlshield.vercel.app</code></pre>
      </section>

      {/* Authentication */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Authentication</h2>
        <p className="mb-4 text-[var(--muted)]">
          The free tier allows <strong>3 requests per day per IP</strong> without an API key.
          For higher limits, pass your API key in the Authorization header:
        </p>
        <pre><code><span className="token-property">Authorization</span>: Bearer hshield_live_your_api_key_here</code></pre>
      </section>

      {/* POST /api/sanitize */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          <span className="text-green-600">POST</span> /api/sanitize
        </h2>
        <p className="mb-4 text-[var(--muted)]">Sanitizes an HTML string and returns the safe result.</p>

        <h3 className="text-lg font-semibold mt-6 mb-3">Request Body</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--border)] rounded-xl overflow-hidden mb-6">
            <thead className="bg-[var(--card)]">
              <tr>
                <th className="text-left p-3 font-semibold">Field</th>
                <th className="text-left p-3 font-semibold">Type</th>
                <th className="text-left p-3 font-semibold">Required</th>
                <th className="text-left p-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--border)]">
                <td className="p-3 font-mono">html</td>
                <td className="p-3">string</td>
                <td className="p-3">Yes</td>
                <td className="p-3">The HTML string to sanitize (max 5MB)</td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="p-3 font-mono">options</td>
                <td className="p-3">object</td>
                <td className="p-3">No</td>
                <td className="p-3">Sanitization options (see below)</td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="p-3 font-mono">options.mode</td>
                <td className="p-3">string</td>
                <td className="p-3">No</td>
                <td className="p-3">strict, standard (default), permissive, or custom</td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="p-3 font-mono">options.allowedTags</td>
                <td className="p-3">string[]</td>
                <td className="p-3">No</td>
                <td className="p-3">Custom allowed tags (mode must be &quot;custom&quot;)</td>
              </tr>
              <tr className="border-t border-[var(--border)]">
                <td className="p-3 font-mono">options.allowedAttributes</td>
                <td className="p-3">object</td>
                <td className="p-3">No</td>
                <td className="p-3">Custom allowed attributes per tag</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* cURL */}
        <h3 className="text-lg font-semibold mt-8 mb-3">cURL Example</h3>
        <pre><code>{`curl -X POST https://htmlshield.vercel.app/api/sanitize \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer hshield_live_your_key" \\
  -d '{
  "html": "<p>Hello</p><script>alert(\"XSS\")</script>",
  "options": { "mode": "strict" }
}'`}</code></pre>

        {/* Python */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Python Example</h3>
        <pre><code>{`import requests

response = requests.post(
    "https://htmlshield.vercel.app/api/sanitize",
    json={
        "html": '<p>Hello</p><script>alert("XSS")</script>',
        "options": {"mode": "standard"}
    },
    headers={"Authorization": "Bearer hshield_live_your_key"}
)

result = response.json()
print(result["data"]["sanitized"])
# Output: <p>Hello</p>`}</code></pre>

        {/* JavaScript */}
        <h3 className="text-lg font-semibold mt-8 mb-3">JavaScript Example</h3>
        <pre><code>{`const response = await fetch("https://htmlshield.vercel.app/api/sanitize", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer hshield_live_your_key"
  },
  body: JSON.stringify({
    html: \`<p>Hello</p><script>alert("XSS")</script>\`,
    options: { mode: "standard" }
  })
});

const result = await response.json();
console.log(result.data.sanitized);
// Output: <p>Hello</p>`}</code></pre>

        {/* Response */}
        <h3 className="text-lg font-semibold mt-8 mb-3">Response</h3>
        <pre><code>{`{
  "success": true,
  "data": {
    "sanitized": "<p>Hello</p>",
    "stats": {
      "original_length": 56,
      "sanitized_length": 12,
      "tags_removed": 1,
      "attributes_removed": 0
    },
    "mode": "strict"
  },
  "remaining": 14999
}`}</code></pre>
      </section>

      {/* GET /api/health */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          <span className="text-blue-600">GET</span> /api/health
        </h2>
        <p className="mb-4 text-[var(--muted)]">Health check endpoint. Returns service status and version.</p>
        <pre><code>{`curl https://htmlshield.vercel.app/api/health

{
  "status": "ok",
  "service": "HTMLShield",
  "version": "1.0.0",
  "timestamp": "2026-01-01T00:00:00.000Z"
}`}</code></pre>
      </section>

      {/* Modes */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Sanitization Modes</h2>
        <div className="space-y-4">
          <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
            <h3 className="font-bold mb-1">Strict</h3>
            <p className="text-sm text-[var(--muted)]">Only basic text formatting tags: p, a, b, i, em, strong, lists, headings, blockquote, code, pre. No images, no styles, no iframes.</p>
          </div>
          <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
            <h3 className="font-bold mb-1">Standard <span className="text-xs text-[var(--primary)] font-normal">(default)</span></h3>
            <p className="text-sm text-[var(--muted)]">Everything in strict plus img, table, span, div, hr, and common attributes. Suitable for rich text editors and CMS content.</p>
          </div>
          <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
            <h3 className="font-bold mb-1">Permissive</h3>
            <p className="text-sm text-[var(--muted)]">Everything in standard plus video, audio, HTML5 semantic elements, and iframes from trusted hosts (YouTube, Vimeo). Use only with trusted content sources.</p>
          </div>
          <div className="p-4 bg-[var(--card)] rounded-xl border border-[var(--border)]">
            <h3 className="font-bold mb-1">Custom</h3>
            <p className="text-sm text-[var(--muted)]">Specify your own allowedTags and allowedAttributes. Full control over what passes through.</p>
          </div>
        </div>
      </section>

      {/* Errors */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Error Codes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--border)] rounded-xl overflow-hidden">
            <thead className="bg-[var(--card)]">
              <tr>
                <th className="text-left p-3 font-semibold">Status</th>
                <th className="text-left p-3 font-semibold">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-[var(--border)]"><td className="p-3 font-mono">400</td><td className="p-3">Missing or invalid html field</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="p-3 font-mono">401</td><td className="p-3">Invalid or missing API key</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="p-3 font-mono">402</td><td className="p-3">Credit limit reached</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="p-3 font-mono">413</td><td className="p-3">HTML content too large (max 5MB)</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="p-3 font-mono">429</td><td className="p-3">Rate limit exceeded (free tier)</td></tr>
              <tr className="border-t border-[var(--border)]"><td className="p-3 font-mono">500</td><td className="p-3">Internal server error</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-bold mb-2">Need an API key?</h3>
        <p className="text-sm text-[var(--muted)] mb-4">Sign up for a paid plan to get your API key and higher limits.</p>
        <Link href="/#pricing" className="inline-block bg-[var(--primary)] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)]">
          View Pricing
        </Link>
      </div>
    </div>
  );
}
