"use client";

import { motion } from "framer-motion";

type UpdateItem = {
  title: string;
  timestamp: string;
  summary: string;
  label: string;
};

const updates: UpdateItem[] = [
  {
    title: "Shipping a faster, cleaner UI system",
    timestamp: "2026 · Recently",
    summary:
      "Refined motion timings, improved spacing, and tuned glass layers for a more premium, Silicon Valley feel.",
    label: "UI",
  },
  {
    title: "Robotics dashboard experiments",
    timestamp: "2026 · Ongoing",
    summary:
      "Exploring real-time telemetry cards, alert surfaces, and operator-centric flows for autonomous systems.",
    label: "Robotics",
  },
  {
    title: "AI summaries for project impact",
    timestamp: "2026 · In progress",
    summary:
      "Designing compact project narratives tailored to different audiences: recruiters, builders, and product teams.",
    label: "AI",
  },
];

export default function UpdatesSection() {
  return (
    <section
      id="updates"
      className="section-shell relative overflow-hidden px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-fuchsia-500/10 opacity-70 blur-3xl" />

      <div className="relative space-y-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
              Updates
            </h2>
            <p className="mt-2 text-xl font-semibold text-slate-50 md:text-2xl">
              What I’m building and improving.
            </p>
          </div>
          <p className="max-w-md text-xs text-slate-400 md:text-[13px]">
            Short release notes from my lab — product polish, robotics systems,
            and applied AI experiments.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {updates.map((item, index) => (
            <motion.article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/70 p-4 shadow-soft-glow"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.65,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 160, damping: 18 },
              }}
            >
              <div className="pointer-events-none absolute -inset-x-10 -top-16 h-32 bg-gradient-to-b from-fuchsia-500/20 via-transparent to-transparent opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                      {item.label}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-50">
                      {item.title}
                    </h3>
                  </div>
                  <span className="badge-pill px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-200">
                    {item.timestamp}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-slate-300/85 md:text-[13px]">
                  {item.summary}
                </p>

                <div className="pt-1">
                  <span className="chip-soft inline-flex px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-fuchsia-200/90">
                    Read more soon
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

