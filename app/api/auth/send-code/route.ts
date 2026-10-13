import { NextRequest, NextResponse } from "next/server";
import { generateOTP, saveOTP, sendOtpEmail, canResendOTP, checkIpRateLimit } from "@/lib/authOtp";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    if (!checkIpRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many authentication requests. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Valid email address is required." },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address (e.g., student@example.com)." },
        { status: 400 }
      );
    }

    // Check cooldown
    const cooldownCheck = canResendOTP(normalized);
    if (!cooldownCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Please wait ${cooldownCheck.waitSeconds}s before requesting a new code.`,
          waitSeconds: cooldownCheck.waitSeconds,
        },
        { status: 429 }
      );
    }

    // Generate and save code
    const code = generateOTP();
    saveOTP(normalized, code);

    // Send email via Gmail SMTP
    const sent = await sendOtpEmail(normalized, code);

    if (!sent) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to dispatch email code. Please verify your internet connection or email address.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `A 6-digit security code has been sent to ${normalized}.`,
      expiresIn: "10 minutes",
    });
  } catch (err) {
    console.error("send-code API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error while dispatching code." },
      { status: 500 }
    );
  }
}
