import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const teamId = String(searchParams.get("teamId") || "")
      .trim()
      .toUpperCase();

    if (!teamId) {
      return NextResponse.json(
        { ok: false, error: "Team ID is required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");

    const matchedTeam = await db.collection("challenge_registrations").findOne({
      teamId,
    });

    if (!matchedTeam) {
      return NextResponse.json(
        { ok: false, error: "Invalid Team ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      team: {
        teamId: matchedTeam.teamId || "",
        challengeType: matchedTeam.challengeType || "",
        name: matchedTeam.name || "",
        email: matchedTeam.email || "",
        college: matchedTeam.college || "",
        year: matchedTeam.year || "",
        teamName: matchedTeam.teamName || "",
        teamMembers: matchedTeam.teamMembers || "",
      },
    });
  } catch (error: any) {
    console.error("TEAM FETCH ERROR:", error);

    return NextResponse.json(
      { ok: false, error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}