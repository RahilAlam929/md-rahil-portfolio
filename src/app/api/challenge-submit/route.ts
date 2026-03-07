import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {

    const formData = await req.formData()

    const teamId = String(formData.get("teamId") || "")
    const challengeType = String(formData.get("challengeType") || "")
    const name = String(formData.get("name") || "")
    const email = String(formData.get("email") || "")
    const projectLink = String(formData.get("projectLink") || "")
    const githubLink = String(formData.get("githubLink") || "")
    const note = String(formData.get("note") || "")
    const attachment = formData.get("attachment") as File | null


    let fileBuffer: Buffer | null = null
    let fileName = ""

    if (attachment) {

      const bytes = await attachment.arrayBuffer()
      fileBuffer = Buffer.from(bytes)
      fileName = attachment.name

      const uploadDir = path.join(process.cwd(), "public/uploads")

      fs.mkdirSync(uploadDir, { recursive: true })

      fs.writeFileSync(path.join(uploadDir, fileName), fileBuffer)
    }


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })


    // USER EMAIL
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
    })


    // ADMIN EMAIL (YOU)
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
    })


    return NextResponse.json({
      ok: true,
      message: "Submission received",
    })

  } catch (error: any) {

    console.error("SUBMIT ERROR:", error)

    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    )
  }
}