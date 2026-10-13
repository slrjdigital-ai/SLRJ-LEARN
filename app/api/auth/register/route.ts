import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, track } = await req.json();

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Full name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required." },
        { status: 400 }
      );
    }

    const normalized = email.trim().toLowerCase();

    const user = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: normalized,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(normalized)}`,
      role: "student",
      track: track || "Full-Stack Web Development",
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
      { success: false, error: "Registration failed." },
      { status: 500 }
    );
  }
}
