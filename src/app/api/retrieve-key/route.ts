import { NextRequest, NextResponse } from "next/server";
import { issuedKeys } from "../paddle-webhook/route";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  const reference = url.searchParams.get("reference");

  if (reference) {
    const record = issuedKeys.get(reference);
    if (!record) {
      return NextResponse.json(
        { error: "Not found yet — webhook may still be processing", pending: true },
        { status: 404 }
      );
    }
    return NextResponse.json({
      apiKey: record.key,
      email: record.payload.email,
      plan: record.payload.plan,
      credits: record.payload.credits,
    });
  }

  if (!email) {
    return NextResponse.json({ error: "Missing 'email' or 'reference' parameter" }, { status: 400 });
  }

  const record = issuedKeys.get(`email:${email}`);
  if (!record) {
    return NextResponse.json(
      { error: "No API key found for this email. If you just completed payment, please wait a moment and try again." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    apiKey: record.key,
    email: record.payload.email,
    plan: record.payload.plan,
    credits: record.payload.credits,
  });
}
