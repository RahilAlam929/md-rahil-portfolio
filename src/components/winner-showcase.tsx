"use client";

import { motion } from "framer-motion";
import { Trophy, Crown, Sparkles, Code2, Brain } from "lucide-react";

const winners = [
  {
    title: "Hackathon Winner",
    icon: Code2,
  },
  {
    title: "Ideathon Winner",
    icon: Brain,
  },
];

export default function WinnerShowcase() {
  return (
    <section id="winners" className="section-shell px-5 py-10 md:px-10 lg:px-12">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-slate-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-amber-300/80">
            <Sparkles className="h-4 w-4" />
            Winners Showcase
          </div>

          <h2 className="mt-4 text-2xl font-semibold text-sky-300">
            BuildQuest 1.0 2026
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Top winners will be featured here after the final evaluation.
          </p>
        </div>

        {/* Winner Slots */}
        <div className="grid gap-6 md:grid-cols-2">
          {winners.map((winner, index) => {
            const Icon = winner.icon;

            return (
              <motion.div
                key={winner.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-dashed border-slate-800/70 bg-slate-950/40 p-6 text-center transition hover:border-sky-500/30"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition group-hover:opacity-100 bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-fuchsia-500/10" />

                <div className="relative flex flex-col items-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-800/70 bg-slate-950/60">
                    <Icon className="h-8 w-8 text-sky-300" />

                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
                      <Crown className="h-4 w-4 text-amber-300" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-slate-100">
                    {winner.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Coming soon
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    <Trophy className="h-3.5 w-3.5 text-amber-300" />
                    Awaiting Results
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}