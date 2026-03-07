import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

function generateTeamId() {
  return "TEAM-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const challengeType = String(body.challengeType || "").trim();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const college = String(body.college || "").trim();
    const year = String(body.year || "").trim();
    const teamName = String(body.teamName || "").trim();
    const teamMembers = String(body.teamMembers || "").trim();
    const reason = String(body.reason || "").trim();

    if (!challengeType || !name || !email || !teamName || !teamMembers) {
      return NextResponse.json(
        { ok: false, error: "Challenge type, name, email, team name, and team members are required." },
        { status: 400 }
      );
    }

    const teamId = generateTeamId();

    const dataDir = path.join(process.cwd(), "data");
    fs.mkdirSync(dataDir, { recursive: true });

    const jsonFile = path.join(dataDir, "challenge-registrations.json");
    const existing = fs.existsSync(jsonFile)
      ? JSON.parse(fs.readFileSync(jsonFile, "utf-8") || "[]")
      : [];

    existing.push({
      id: Date.now().toString(),
      challengeType,
      name,
      email,
      college,
      year,
      teamName,
      teamMembers,
      reason,
      teamId,
      createdAt: new Date().toISOString(),
    });

    fs.writeFileSync(jsonFile, JSON.stringify(existing, null, 2));

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 1) Mail to participant
    await transporter.sendMail({
      from: `"Challenge Team" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your Challenge Registration is Successful 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
          <h2>Registration Successful ✅</h2>
          <p>Hello <strong>${name}</strong>,</p>
          <p>Your registration has been completed successfully.</p>

          <p><strong>Challenge Type:</strong> ${challengeType}</p>
          <p><strong>College:</strong> ${college || "Not provided"}</p>
          <p><strong>Year:</strong> ${year || "Not provided"}</p>
          <p><strong>Team Name:</strong> ${teamName}</p>
          <p><strong>Total Team Members:</strong> ${teamMembers}</p>
          <p><strong>Team ID:</strong> ${teamId}</p>

          <p>Please keep this Team ID safe.</p>
        </div>
      `,
    });

    // 2) Mail to admin (you)
    if (process.env.CONTACT_TO_EMAIL) {
      await transporter.sendMail({
        from: `"Challenge Admin Bot" <${process.env.GMAIL_USER}>`,
        to: process.env.CONTACT_TO_EMAIL,
        subject: `New ${challengeType} Registration - ${teamName}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
            <h2>New Registration Received</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Challenge Type:</strong> ${challengeType}</p>
            <p><strong>College:</strong> ${college || "Not provided"}</p>
            <p><strong>Year:</strong> ${year || "Not provided"}</p>
            <p><strong>Team Name:</strong> ${teamName}</p>
            <p><strong>Total Team Members:</strong> ${teamMembers}</p>
            <p><strong>Team ID:</strong> ${teamId}</p>
            <p><strong>Reason:</strong> ${reason || "Not provided"}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      ok: true,
      teamId,
      message: "Registration successful and emails sent.",
    });
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { ok: false, error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}