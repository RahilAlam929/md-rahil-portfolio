import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

function generateTeamId() {
  return "TEAM-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      type,
      challengeType,
      name,
      email,
      college,
      year,
      teamName,
      teamMembers,
      reason,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          message: "Name and email are required",
        },
        { status: 400 }
      );
    }

    const finalChallengeType = challengeType || type || "register";

    const teamId =
      finalChallengeType === "hackathon" ||
      finalChallengeType === "ideathon"
        ? generateTeamId()
        : null;

    const registration = {
      id: Date.now().toString(),
      type: type || null,
      challengeType: finalChallengeType,
      name: name.trim(),
      email: email.trim(),
      college: college?.trim() || "",
      year: year?.trim() || "",
      teamName: teamName?.trim() || "",
      teamMembers: teamMembers?.trim() || "",
      reason: reason?.trim() || "",
      teamId,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("portfolio");

    await db.collection("challenge_registrations").insertOne(registration);

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: `"Challenge Team" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Your Challenge Registration is Successful 🚀",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
            <h2>Registration Successful ✅</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Your registration has been completed successfully.</p>

            <p><strong>Challenge Type:</strong> ${finalChallengeType}</p>
            <p><strong>College:</strong> ${college || "Not provided"}</p>
            <p><strong>Year:</strong> ${year || "Not provided"}</p>
            <p><strong>Team Name:</strong> ${teamName || "Not provided"}</p>
            <p><strong>Total Team Members:</strong> ${teamMembers || "Not provided"}</p>
            ${
              teamId
                ? `<p><strong>Team ID:</strong> ${teamId}</p>
                   <p>Please keep this Team ID safe.</p>`
                : ""
            }
          </div>
        `,
      });

      if (process.env.CONTACT_TO_EMAIL) {
        await transporter.sendMail({
          from: `"Challenge Admin Bot" <${process.env.GMAIL_USER}>`,
          to: process.env.CONTACT_TO_EMAIL,
          subject: `New ${finalChallengeType} Registration - ${teamName || name}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #111827;">
              <h2>New Registration Received 📩</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Challenge Type:</strong> ${finalChallengeType}</p>
              <p><strong>College:</strong> ${college || "Not provided"}</p>
              <p><strong>Year:</strong> ${year || "Not provided"}</p>
              <p><strong>Team Name:</strong> ${teamName || "Not provided"}</p>
              <p><strong>Team Members:</strong> ${teamMembers || "Not provided"}</p>
              <p><strong>Reason:</strong> ${reason || "Not provided"}</p>
              <p><strong>Team ID:</strong> ${teamId || "N/A"}</p>
            </div>
          `,
        });
      }
    } catch (mailError) {
      console.error("Mail error:", mailError);
    }

    return NextResponse.json({
      ok: true,
      success: true,
      message: "Registration successful",
      teamId,
    });
  } catch (error: any) {
    console.error("Challenge register error:", error);

    return NextResponse.json(
      {
        ok: false,
        success: false,
        message: error?.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}