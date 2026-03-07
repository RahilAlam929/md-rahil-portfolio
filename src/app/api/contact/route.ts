import nodemailer from "nodemailer";

type Body = {
  type?: "contact" | "idea" | "challenge";
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  category?: string; // idea-only
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const type: "contact" | "idea" = body?.type === "idea" ? "idea" : "contact";

    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const message = (body?.message || "").trim();
    const subject = (body?.subject || "").trim();
    const category = (body?.category || "Other").trim();

    // ✅ validations
    if (!name || name.length < 2) {
      return Response.json({ ok: false, error: "Name required." }, { status: 400 });
    }

    if (type === "contact") {
      if (!email) {
        return Response.json({ ok: false, error: "Email required." }, { status: 400 });
      }
      if (!message) {
        return Response.json({ ok: false, error: "Message required." }, { status: 400 });
      }
    } else {
      // idea
      if (message.length < 20) {
        return Response.json(
          { ok: false, error: "Idea must be at least 20 characters." },
          { status: 400 }
        );
      }
      // email optional in idea mode
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!gmailUser || !gmailPass || !toEmail) {
      return Response.json({ ok: false, error: "Server env missing." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass, // ✅ app password
      },
    });

    // ✅ subject
    const finalSubject =
      type === "idea"
        ? `🚀 New Idea (${category}) — ${name}`
        : subject || "Portfolio Contact";

    await transporter.sendMail({
      from: `"Portfolio ${type === "idea" ? "Idea" : "Contact"}" <${gmailUser}>`,
      to: toEmail,
      replyTo: email || undefined, // ✅ reply works only if email provided
      subject: finalSubject,
      text:
        type === "idea"
          ? `Type: IDEA\nName: ${name}\nEmail: ${email || "(not provided)"}\nCategory: ${category}\n\n${message}`
          : `Type: CONTACT\nName: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <h3>New ${type === "idea" ? "Idea Submission" : "Portfolio Contact"}</h3>
        <p><b>Type:</b> ${escapeHtml(type.toUpperCase())}</p>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email || "(not provided)")}</p>
        ${
          type === "idea"
            ? `<p><b>Category:</b> ${escapeHtml(category)}</p>`
            : `<p><b>Subject:</b> ${escapeHtml(finalSubject)}</p>`
        }
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

// ✅ helper to avoid HTML injection
function escapeHtml(input: string) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}