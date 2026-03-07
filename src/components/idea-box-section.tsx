"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type FormState = {
  name: string;
  email: string;
  idea: string;
  category: string;
};

const categories = ["App", "AI", "Robotics", "SaaS", "Social Impact", "Other"];

export default function IdeaBoxSection() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    idea: "",
    category: categories[0],
  });

  const canSubmit = useMemo(() => {
    const ideaLen = form.idea.trim().length;
    const nameLen = form.name.trim().length;
    return ideaLen >= 20 && nameLen >= 2 && !loading;
  }, [form.idea, form.name, loading]);

  const update = (k: keyof FormState, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setMsg("");

    if (!canSubmit) {
      setStatus("err");
      setMsg("Please add your name and a bit more detail (min 20 characters).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        setStatus("err");
        setMsg(data.message || "Something went wrong. Please try again.");
      } else {
        setStatus("ok");
        setMsg("Idea received ✅ I’ll review it and get back if needed!");
        setForm({ name: "", email: "", idea: "", category: categories[0] });
      }
    } catch {
      setStatus("err");
      setMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="idea" className="mx-auto w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="rounded-3xl border border-slate-800/60 bg-slate-950/30 p-5 sm:p-7 shadow-soft-glow"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-sky-300/80">
              Idea Box
            </div>
            <h2 className="mt-2 text-xl font-semibold text-slate-100">
              Share your idea — I’ll build / collaborate 🚀
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Got an app idea, AI automation, robotics concept, or a problem worth solving?
              Drop it here. If it’s interesting, I’ll reply.
            </p>
          </div>

          <div className="mt-2 text-xs text-slate-500">
            Tip: include problem + target users + key features.
          </div>
        </div>

        <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs uppercase tracking-[0.16em] text-slate-400">
              Your Name
            </label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-sky-500/60"
              placeholder="e.g., Amaan"
              autoComplete="name"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs uppercase tracking-[0.16em] text-slate-400">
              Email (optional)
            </label>
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-sky-500/60"
              placeholder="so I can reply"
              autoComplete="email"
            />
          </div>

          <div className="sm:col-span-1">
            <label className="mb-1 block text-xs uppercase tracking-[0.16em] text-slate-400">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              className="w-full rounded-xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-sky-500/60"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs uppercase tracking-[0.16em] text-slate-400">
              Idea (min 20 chars)
            </label>
            <textarea
              value={form.idea}
              onChange={(e) => update("idea", e.target.value)}
              className="min-h-[130px] w-full rounded-xl border border-slate-800/70 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none focus:border-sky-500/60"
              placeholder="Example: Problem + who it helps + key features + why now…"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-700/70 bg-gradient-to-r from-sky-500/20 via-blue-500/15 to-fuchsia-500/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:brightness-110 disabled:opacity-40"
            >
              {loading ? "Sending..." : "Submit Idea →"}
            </button>

            <div
              className={`text-sm ${
                status === "ok"
                  ? "text-emerald-300/90"
                  : status === "err"
                  ? "text-rose-300/90"
                  : "text-slate-400"
              }`}
            >
              {msg}
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
}