import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const teamId = String(formData.get("teamId") || "").trim().toUpperCase();
    const challengeType = String(formData.get("challengeType") || "");
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const projectLink = String(formData.get("projectLink") || "");
    const githubLink = String(formData.get("githubLink") || "");
    const note = String(formData.get("note") || "");
    const attachment = formData.get("attachment") as File | null;

    if (!teamId || !name || !email) {
      return NextResponse.json(
        {
          ok: false,
          error: "Team ID, name, and email are required.",
        },
        { status: 400 }
      );
    }

    let fileBuffer: Buffer | null = null;
    let fileName = "";
    let fileType = "";

    if (attachment && attachment.size > 0) {
      const bytes = await attachment.arrayBuffer();
      fileBuffer = Buffer.from(bytes);
      fileName = attachment.name;
      fileType = attachment.type;
    }

    const client = await clientPromise;
    const db = client.db("portfolio");

    const teamExists = await db.collection("challenge_registrations").findOne({
      teamId,
    });

    if (!teamExists) {
      return NextResponse.json(
        { ok: false, error: "Invalid Team ID." },
        { status: 404 }
      );
    }

    await db.collection("challenge_submissions").insertOne({
      teamId,
      challengeType,
      name,
      email,
      projectLink,
      githubLink,
      note,
      attachmentName: fileName || "",
      attachmentType: fileType || "",
      createdAt: new Date(),
    });

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
        subject: "Challenge Submission Received 🚀",
        html: `
          <h2>Submission Received</h2>
          <p>Hello <b>${name}</b>,</p>
          <p>Your submission has been successfully received.</p>
          <p><b>Team ID:</b> ${teamId}</p>
          <p><b>Challenge Type:</b> ${challengeType}</p>
          <p>Our team will review your project soon.</p>
        `,
      });

      if (process.env.CONTACT_TO_EMAIL) {
        await transporter.sendMail({
          from: `"Challenge Bot" <${process.env.GMAIL_USER}>`,
          to: process.env.CONTACT_TO_EMAIL,
          subject: `New ${challengeType} Submission - ${teamId}`,
          html: `
            <h2>New Challenge Submission</h2>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Team ID:</b> ${teamId}</p>
            <p><b>Challenge Type:</b> ${challengeType}</p>
            <p><b>Project Link:</b> ${projectLink}</p>
            <p><b>GitHub:</b> ${githubLink}</p>
            <p><b>Note:</b> ${note}</p>
          `,
          attachments: fileBuffer
            ? [
                {
                  filename: fileName,
                  content: fileBuffer,
                },
              ]
            : [],
        });
      }
    } catch (mailError) {
      console.error("SUBMIT MAIL ERROR:", mailError);
    }

    return NextResponse.json({
      ok: true,
      message: "Submission received",
    });
  } catch (error: any) {
    console.error("SUBMIT ERROR:", error);

    return NextResponse.json(
      { ok: false, error: error?.message || "Something went wrong" },
      { status: 500 }
    );
  }
}