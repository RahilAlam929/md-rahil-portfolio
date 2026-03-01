import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body || {};

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Name, Email, Message required." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!gmailUser || !gmailPass || !toEmail) {
      return Response.json(
        { ok: false, error: "Server env missing." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass, // ✅ app password
      },
    });

    const safeSubject = subject?.trim() || "Portfolio Contact";

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: toEmail,
      replyTo: email, // ✅ so you can reply directly to sender
      subject: safeSubject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h3>New Portfolio Contact</h3>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Subject:</b> ${escapeHtml(safeSubject)}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${escapeHtml(
          message
        )}</pre>
      `,
    });

    return Response.json({ ok: true });
  } catch (err: any) {
    return Response.json(
      { ok: false, error: err?.message || "Failed to send." },
      { status: 500 }
    );
  }
}

// small helper to avoid HTML injection
function escapeHtml(input: string) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}