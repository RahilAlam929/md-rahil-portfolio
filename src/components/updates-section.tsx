"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Sparkles,
  Clock3,
  TerminalSquare,
  Rocket,
} from "lucide-react";

type UpdateItem = {
  title: string;
  status?: "completed" | "in-progress" | "planned";
  description?: string;
  date?: string;
};

type UpdatesSectionProps = {
  updates?: UpdateItem[];
};

export default function UpdatesSection({
  updates = [],
}: UpdatesSectionProps) {
  const hasUpdates = updates.length > 0;

  return (
    <section
      id="updates"
      className="section-shell relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-300/80">
            <Sparkles className="h-4 w-4" />
            Build Log
          </div>

          <h2 className="mt-4 text-xl font-semibold text-sky-300">
            Build Updates
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
            A space to share what I’m building, what I’ve completed, and what’s
            coming next.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/45 p-6"
        >
          <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_30%)]" />

          {!hasUpdates ? (
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-800/70 bg-slate-950/60 shadow-soft-glow">
                <Activity className="h-8 w-8 text-sky-300" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-100">
                No updates yet
              </h3>

              <p className="mt-3 mx-auto max-w-md text-sm leading-7 text-slate-400">
                Project progress, current work, and upcoming launches will appear
                here soon.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/50 px-4 py-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                  <Clock3 className="h-4 w-4 text-amber-300" />
                  Work in progress
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/50 px-4 py-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                  <Rocket className="h-4 w-4 text-fuchsia-300" />
                  Upcoming launches
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/50 px-4 py-2 text-xs uppercase tracking-[0.16em] text-slate-400">
                  <TerminalSquare className="h-4 w-4 text-sky-300" />
                  Dev updates
                </div>
              </div>
            </div>
          ) : (
            <div className="relative space-y-4">
              {updates.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-slate-100">
                      {item.title}
                    </h3>
                    {item.date ? (
                      <span className="text-xs uppercase tracking-[0.16em] text-slate-500">
                        {item.date}
                      </span>
                    ) : null}
                  </div>

                  {item.description ? (
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}