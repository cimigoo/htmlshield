import { NextRequest, NextResponse } from "next/server";
import { createCheckoutTransaction } from "@/lib/paddle";

export const runtime = "nodejs";

const PRICE_MAP: Record<string, string> = {
  starter: "pri_01m11xzejyaaypfgccvbjzgfz3",
  pro: "pri_01m11xzfsfrayq44dcdj1cfecj",
  business: "pri_01m11xzh8fh1accbgy934z6wqe",
};

export async function POST(req: NextRequest) {
  let plan: string;
  try {
    const body = (await req.json()) as { plan?: string };
    plan = (body.plan || "").toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const priceId = PRICE_MAP[plan];
  if (!priceId) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  try {
    const tx = await createCheckoutTransaction(priceId, "htmlshield");
    return NextResponse.json({ checkoutUrl: tx.checkoutUrl, transactionId: tx.id });
  } catch (err) {
    console.error("[create-checkout] failed:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 502 }
    );
  }
}
