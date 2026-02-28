"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, Github, Send, Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: (formData.get("name") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      subject: (formData.get("subject") as string) ?? "",
      message: (formData.get("message") as string) ?? "",
    };

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="section-shell relative overflow-hidden px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/15 via-transparent to-fuchsia-500/20 opacity-80 blur-3xl" />

      <div className="relative space-y-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
              Contact
            </h2>
            <p className="mt-2 text-xl font-semibold text-slate-50 md:text-2xl">
              Let&apos;s build something intelligent together.
            </p>
          </div>
          <p className="max-w-md text-xs text-slate-400 md:text-[13px]">
            Reach out for collaborations, freelance projects, or full‑time
            roles. I&apos;m especially excited about robotics, AI products, and
            complex full stack systems.
          </p>
        </div>

        <div className="contact-grid">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-slate-700/80 bg-slate-950/85 p-4 sm:p-5"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs text-slate-300/80 sm:text-[13px]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="input-glass w-full px-4 py-2.5 text-sm placeholder:text-slate-500"
                  placeholder="....."
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs text-slate-300/80 sm:text-[13px]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-glass w-full px-4 py-2.5 text-sm placeholder:text-slate-500"
                  placeholder="......"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="subject"
                className="text-xs text-slate-300/80 sm:text-[13px]"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                className="input-glass w-full px-4 py-2.5 text-sm placeholder:text-slate-500"
                placeholder="Project idea, collaboration, robotics, etc."
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-xs text-slate-300/80 sm:text-[13px]"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="textarea-glass w-full px-4 py-2.5 text-sm leading-relaxed placeholder:text-slate-500"
                placeholder="....."
              />
            </div>

            {status === "success" && (
              <p className="text-sm font-medium text-emerald-400">
                Message sent. I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && errorMessage && (
              <p className="text-sm font-medium text-red-400">{errorMessage}</p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-slate-50 shadow-soft-glow transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-70 disabled:pointer-events-none"
              >
                {status === "loading" ? (
                  <>
                    Sending...
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-slate-500">
              
              </p>
            </div>
          </motion.form>

          <motion.div
            className="space-y-4 rounded-2xl border border-slate-700/80 bg-slate-950/85 p-4 sm:p-5"
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-sky-300">
              Direct Channels
            </p>

            <div className="space-y-2 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <div className="chip-soft inline-flex h-8 w-8 items-center justify-center text-sky-300">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    Phone
                  </p>
                  <p className="font-medium">7061156929</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="chip-soft inline-flex h-8 w-8 items-center justify-center text-sky-300">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    Email
                  </p>
                  <p className="font-medium">rahilalam0786s@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                Social Links
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/md-rahil-a070b3329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-1 text-xs text-slate-200 hover:text-sky-300"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/mdr_ahil0786/"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-1 text-xs text-slate-200 hover:text-pink-300"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  Instagram
                </a>
                <a
                  href="https://github.com/RahilAlam929/"
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex items-center gap-1 text-xs text-slate-200 hover:text-slate-50"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


