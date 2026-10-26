import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid request payload." }, { status: 400 });
    }

    const {
      name,
      email,
      username,
      bio,
      institution,
      educationLevel,
      skills,
      weeklyGoalHours,
      dailyGoalMinutes,
      notifications,
      privacy,
    } = body;

    // Server-side validation
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 60) {
        return NextResponse.json(
          { success: false, error: "Full Name must be between 2 and 60 characters." },
          { status: 400 }
        );
      }
    }

    if (email !== undefined) {
      if (typeof email !== "string" || !email.includes("@") || email.length < 5) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    if (username !== undefined && username !== "") {
      if (typeof username !== "string" || !/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
        return NextResponse.json(
          { success: false, error: "Username must be 3-30 characters (letters, numbers, underscores only)." },
          { status: 400 }
        );
      }
    }

    if (bio !== undefined && typeof bio === "string" && bio.length > 300) {
      return NextResponse.json(
        { success: false, error: "Bio cannot exceed 300 characters." },
        { status: 400 }
      );
    }

    if (weeklyGoalHours !== undefined) {
      const hours = Number(weeklyGoalHours);
      if (isNaN(hours) || hours < 1 || hours > 60) {
        return NextResponse.json(
          { success: false, error: "Weekly goal must be between 1 and 60 hours." },
          { status: 400 }
        );
      }
    }

    if (dailyGoalMinutes !== undefined) {
      const mins = Number(dailyGoalMinutes);
      if (isNaN(mins) || mins < 5 || mins > 360) {
        return NextResponse.json(
          { success: false, error: "Daily goal must be between 5 and 360 minutes." },
          { status: 400 }
        );
      }
    }

    const sanitized = {
      ...(name !== undefined && { name: name.trim() }),
      ...(email !== undefined && { email: email.trim().toLowerCase() }),
      ...(username !== undefined && { username: username.trim() }),
      ...(bio !== undefined && { bio: bio.trim() }),
      ...(institution !== undefined && { institution: institution.trim() }),
      ...(educationLevel !== undefined && { educationLevel: educationLevel.trim() }),
      ...(Array.isArray(skills) && { skills: skills.slice(0, 20).map((s) => String(s).trim()) }),
      ...(weeklyGoalHours !== undefined && { weeklyGoalHours: Number(weeklyGoalHours) }),
      ...(dailyGoalMinutes !== undefined && { dailyGoalMinutes: Number(dailyGoalMinutes) }),
      ...(notifications !== undefined && { notifications }),
      ...(privacy !== undefined && { privacy }),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      profile: sanitized,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process profile update." },
      { status: 500 }
    );
  }
}
