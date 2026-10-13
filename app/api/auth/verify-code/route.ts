import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/lib/authOtp";
import { DEMO_USERS } from "@/context/AuthContext";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }

    if (!code || typeof code !== "string" || code.trim().length !== 6) {
      return NextResponse.json(
        { success: false, error: "Please enter the 6-digit code received in your email." },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();

    // Verify OTP code
    const result = verifyOTP(normalized, code.trim());
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 401 }
      );
    }

    // Auth succeeded! Return user profile
    const existingDemo = DEMO_USERS[normalized];
    if (existingDemo) {
      return NextResponse.json({
        success: true,
        user: existingDemo,
        token: `auth_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      });
    }

    const namePart = normalized.split("@")[0].replace(/[._-]/g, " ");
    const formattedName = namePart
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    const user = {
      id: `usr_${Date.now()}`,
      name: formattedName || "Student Developer",
      email: normalized,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalized)}`,
      role: "student",
      track: "Full-Stack Web Development",
      level: "Beginner",
      joinedDate: "October 2026",
      bookmarkedNotes: ["how-the-internet-works", "nextjs-app-router-layouts"],
      completedRoadmapSteps: [1],
      downloadedPdfs: ["web-fundamentals-complete-handbook"],
    };

    return NextResponse.json({
      success: true,
      user,
      token: `auth_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    });
  } catch (err) {
    console.error("verify-code API Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal verification error." },
      { status: 500 }
    );
  }
}
