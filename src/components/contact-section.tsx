"use client";

import { motion } from "framer-motion";
import { Send, Lightbulb } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type Mode = "contact" | "idea";

const categories = ["App", "AI", "Robotics", "SaaS", "Social Impact", "Other"];

export default function ContactSection() {
  const [mode, setMode] = useState<Mode>("contact");

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: categories[0],
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(
    null
  );

  const rules = useMemo(() => {
    const nameOk = form.name.trim().length >= 2;
    const emailOk = form.email.trim().length >= 5;
    const msgLen = form.message.trim().length;

    if (mode === "idea") {
      return {
        ok: nameOk && msgLen >= 20, // email optional in idea mode
        msg: "Name + Idea (min 20 chars) required.",
      };
    }

    return {
      ok: nameOk && emailOk && msgLen >= 5,
      msg: "Name, Email, and Message are required.",
    };
  }, [form.name, form.email, form.message, mode]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    if (!rules.ok) {
      setStatus({ type: "err", msg: rules.msg });
      return;
    }

    setLoading(true);
    try {
      const payload =
        mode === "idea"
          ? {
              type: "idea",
              name: form.name.trim(),
              email: form.email.trim(), // optional
              category: form.category.trim(),
              message: form.message.trim(),
            }
          : {
              type: "contact",
              name: form.name.trim(),
              email: form.email.trim(),
              subject: form.subject.trim(),
              message: form.message.trim(),
            };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send.");
      }

      setStatus({
        type: "ok",
        msg: mode === "idea" ? "Idea submitted ✅ I’ll review it!" : "Message sent successfully ✅",
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: categories[0],
      });
    } catch (err: any) {
      setStatus({ type: "err", msg: err?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-shell px-5 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-col items-center gap-3">
          <h2 className="text-center text-xl font-semibold text-sky-300">
            {mode === "idea" ? "Build With Me" : "Contact Me"}
          </h2>

          {/* Tabs */}
          <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/60 p-1">
            <button
              type="button"
              onClick={() => setMode("contact")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                mode === "contact"
                  ? "bg-sky-500/20 text-sky-200"
                  : "text-slate-300 hover:text-sky-200"
              }`}
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => setMode("idea")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                mode === "idea"
                  ? "bg-fuchsia-500/20 text-fuchsia-200"
                  : "text-slate-300 hover:text-fuchsia-200"
              }`}
            >
              Share Idea
            </button>
          </div>

          <p className="text-center text-sm text-slate-400">
            {mode === "idea"
              ? "Have an idea? Share problem + target users + features. If it’s strong, I’ll reply."
              : "Send me a message. I usually reply quickly."}
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-700 bg-slate-950/80 p-6"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              placeholder="Name *"
              className="input-glass w-full px-4 py-2"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              type="email"
              placeholder={mode === "idea" ? "Email (optional)" : "Email *"}
              className="input-glass w-full px-4 py-2"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </div>

          {/* Idea-only category */}
          {mode === "idea" && (
            <select
              className="input-glass w-full px-4 py-2"
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}

          {/* Contact-only subject */}
          {mode === "contact" && (
            <input
              placeholder="Subject"
              className="input-glass w-full px-4 py-2"
              value={form.subject}
              onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            />
          )}

          <textarea
            rows={5}
            placeholder={mode === "idea" ? "Describe your idea (min 20 chars) *" : "Message *"}
            className="textarea-glass w-full px-4 py-2"
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Sending..." : mode === "idea" ? "Submit Idea" : "Send Message"}
            {mode === "idea" ? <Lightbulb className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          </button>

          {status && (
            <p className={`text-sm ${status.type === "ok" ? "text-emerald-300" : "text-rose-300"}`}>
              {status.msg}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}