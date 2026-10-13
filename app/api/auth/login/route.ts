import { NextRequest, NextResponse } from "next/server";
import { DEMO_USERS } from "@/context/AuthContext";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required." },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();

    // Check pre-configured demo account
    if (DEMO_USERS[normalized]) {
      return NextResponse.json({
        success: true,
        user: DEMO_USERS[normalized],
        token: `mock_jwt_${Date.now()}`,
      });
    }

    // Dynamic user creation for quick login
    const namePart = normalized.split("@")[0].replace(/[._-]/g, " ");
    const user = {
      id: `usr_${Date.now()}`,
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1) || "Student Developer",
      email: normalized,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalized)}`,
      role: "student",
      track: "Full-Stack Web Development",
      level: "Beginner",
      joinedDate: "October 2026",
      bookmarkedNotes: ["how-the-internet-works"],
      completedRoadmapSteps: [1],
      downloadedPdfs: ["web-fundamentals-complete-handbook"],
    };

    return NextResponse.json({
      success: true,
      user,
      token: `mock_jwt_${Date.now()}`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal authentication error." },
      { status: 500 }
    );
  }
}
