import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const GENERIC_ERROR = "Failed to send message. Please try again.";
const CONFIG_ERROR = "Server email is not configured. Please try again later.";

function getEnvConfig(): {
  user: string | null;
  pass: string | null;
  missing: string[];
} {
  const user = process.env.EMAIL_USER?.trim() || null;
  const pass = (process.env.EMAIL_PASS?.trim() ?? "").replace(/\s/g, "") || null;
  const missing: string[] = [];
  if (!user) missing.push("EMAIL_USER");
  if (!pass) missing.push("EMAIL_PASS");
  return { user, pass, missing };
}

function createTransporter(user: string, pass: string) {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export async function POST(request: Request) {
  try {
    const config = getEnvConfig();
    if (!config.user || !config.pass) {
      const isDev = process.env.NODE_ENV === "development";
      const hint = isDev && config.missing.length
        ? ` Set ${config.missing.join(" and ")} in .env.local (project root) and restart the dev server.`
        : "";
      return NextResponse.json(
        {
          success: false,
          error: CONFIG_ERROR + (isDev ? hint : ""),
        },
        { status: 503 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const name = typeof body.name === "string" ? body.name : "";
    const email = typeof body.email === "string" ? body.email : "";
    const subject = typeof body.subject === "string" ? body.subject : "";
    const message = typeof body.message === "string" ? body.message : "";

    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const transporter = createTransporter(config.user, config.pass);
    const mailOptions = {
      from: `"Portfolio Contact" <${config.user}>`,
      to: config.user,
      replyTo: email.trim(),
      subject: subject.trim() ? `[Portfolio] ${subject.trim()}` : "[Portfolio] New message",
      text: [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        subject.trim() ? `Subject: ${subject.trim()}` : "",
        "",
        message.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
      html: [
        "<p><strong>Name:</strong> " + escapeHtml(name.trim()) + "</p>",
        "<p><strong>Email:</strong> " + escapeHtml(email.trim()) + "</p>",
        subject.trim()
          ? "<p><strong>Subject:</strong> " + escapeHtml(subject.trim()) + "</p>"
          : "",
        "<p><strong>Message:</strong></p>",
        "<pre style=\"white-space:pre-wrap;font-family:inherit;\">" +
          escapeHtml(message.trim()) +
          "</pre>",
      ]
        .filter(Boolean)
        .join(""),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (process.env.NODE_ENV === "development") {
      console.error("[contact API] Send failed:", msg);
    }
    const isAuthError =
      /invalid login|authentication|username and password|535|credentials|invalid credentials|oauth/i.test(msg) ||
      msg.includes("EMAIL_USER") ||
      msg.includes("EMAIL_PASS");
    const isConfig = isAuthError;
    const devAuthHint =
      process.env.NODE_ENV === "development" && isConfig
        ? " Check that EMAIL_PASS in .env.local is your Gmail App Password (Google Account → Security → App passwords), not your normal password."
        : "";
    return NextResponse.json(
      {
        success: false,
        error: (isConfig ? CONFIG_ERROR : GENERIC_ERROR) + devAuthHint,
      },
      { status: isConfig ? 503 : 500 }
    );
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (c) => map[c] ?? c);
}
