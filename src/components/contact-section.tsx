"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "err", msg: "Name, Email, and Message are required." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus({ type: "ok", msg: "Message sent successfully ✅" });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setStatus({ type: "err", msg: err?.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-shell px-5 py-10 md:px-10 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-xl font-semibold text-sky-300 mb-6">
          Contact Me
        </h2>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-700 bg-slate-950/80 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              placeholder="Name *"
              className="input-glass w-full px-4 py-2"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
            <input
              type="email"
              placeholder="Email *"
              className="input-glass w-full px-4 py-2"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </div>

          <input
            placeholder="Subject"
            className="input-glass w-full px-4 py-2"
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
          />

          <textarea
            rows={5}
            placeholder="Message *"
            className="textarea-glass w-full px-4 py-2"
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
            <Send className="h-4 w-4" />
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