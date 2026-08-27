import { NextRequest, NextResponse } from "next/server";
import { sanitize, type SanitizeOptions } from "@/lib/sanitizer";
import { verifyApiKey, extractApiKey, deductCredits, PLAN_CREDITS } from "@/lib/auth";
import { getClientIp, consumeFreeRequest, getRemainingFreeRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization,x-api-key",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { html, options } = body as { html?: string; options?: SanitizeOptions };

    if (!html || typeof html !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid 'html' field" },
        { status: 400 }
      );
    }

    if (html.length > 5_000_000) {
      return NextResponse.json(
        { success: false, error: "HTML content too large (max 5MB)" },
        { status: 413 }
      );
    }

    const authHeader = req.headers.get("authorization") || req.headers.get("x-api-key");
    let remaining: number;
    let isPaid = false;

    if (authHeader) {
      // Paid user - verify API key
      const { key } = extractApiKey(req.headers);
      if (!key) {
        return NextResponse.json(
          { success: false, error: "Invalid authorization format" },
          { status: 401 }
        );
      }
      const verifyResult = verifyApiKey(key);
      if (!verifyResult.valid || !verifyResult.payload) {
        return NextResponse.json(
          { success: false, error: verifyResult.error || "Invalid API key" },
          { status: 401 }
        );
      }

      if (verifyResult.payload.credits <= 0) {
        return NextResponse.json(
          { success: false, error: "Credit limit reached. Please upgrade your plan." },
          { status: 402 }
        );
      }

      const newCredits = verifyResult.payload.credits - 1;
      remaining = newCredits;
      isPaid = true;
    } else {
      // Free tier - rate limit by IP
      const ip = getClientIp(req);
      const rateResult = consumeFreeRequest(ip);
      if (!rateResult.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: "Free tier limit reached (3 requests/day per IP). Sign up for a paid plan for more.",
            upgrade_url: "/#pricing",
          },
          { status: 429 }
        );
      }
      remaining = rateResult.remaining;
    }

    const result = sanitize(html, options || {});

    return NextResponse.json({
      success: true,
      data: {
        sanitized: result.sanitized,
        stats: result.stats,
        mode: result.mode,
      },
      remaining,
      plan: isPaid ? undefined : "free",
    });
  } catch (err) {
    console.error("[sanitize] error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
