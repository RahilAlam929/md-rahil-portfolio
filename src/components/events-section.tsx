"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  ArrowUpRight,
  Clock3,
  Sparkles,
  Trophy,
} from "lucide-react";

type EventItem = {
  title: string;
  date?: string;
  location?: string;
  description?: string;
  timeline?: string;
  link?: string;
};

type EventsSectionProps = {
  events?: EventItem[];
};

const defaultEvents: EventItem[] = [
  {
    title: "BuildQuest 1.0 2026 — Hackathon + Ideathon",
    date: "Starting Soon",
    location: "Online",
    timeline: "1 Week Challenge Timeline",
    description:
      "A premium innovation challenge where participants can choose Hackathon or Ideathon tracks, solve real-world problems, and compete for exciting prizes and winner spotlight.",
    link: "/#challenge",
  },
];

export default function EventsSection({
  events = defaultEvents,
}: EventsSectionProps) {
  const hasEvents = events.length > 0;

  return (
    <section
      id="events"
      className="section-shell relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14"
    >
      <div className="grid-bg pointer-events-none" aria-hidden />

      <div className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-300/80">
          <Sparkles className="h-4 w-4" />
          Events & Updates
        </div>

        <h2 className="mt-4 text-lg font-semibold tracking-wide text-sky-200">
          Upcoming Events
        </h2>
      </div>

      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          <div className="absolute -inset-3 rounded-[1.4rem] neon-ring pointer-events-none" />

          <div className="glass-surface relative z-10 rounded-[1.25rem] p-6 sm:p-7">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-900/50 ring-1 ring-sky-500/20 shadow-soft-glow">
              <Calendar className="h-8 w-8 text-sky-300" />
            </div>

            {!hasEvents ? (
              <div className="text-center">
                <h3 className="mt-5 text-xl font-semibold text-slate-100">
                  No Events Yet
                </h3>
                <p className="mt-3 text-sm text-slate-300">
                  New events coming soon...
                </p>

                <button
                  type="button"
                  className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-sky-400/30 bg-gradient-to-r from-sky-600/5 to-sky-700/5 px-4 py-2 text-sm font-medium text-sky-100 shadow-soft-glow hover:brightness-105 focus:outline-none"
                >
                  Stay Tuned
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {events.map((ev, idx) => (
                  <motion.div
                    key={`${ev.title}-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group rounded-2xl border border-slate-700/60 bg-slate-950/40 p-5 transition hover:border-sky-500/30"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-amber-300">
                          <Trophy className="h-3.5 w-3.5" />
                          Featured Event
                        </div>

                        {ev.link ? (
                          <a
                            href={ev.link}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-4 py-2 text-sm font-medium text-white shadow-soft-glow transition hover:brightness-110"
                          >
                            View Challenge
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold leading-snug text-slate-100">
                          {ev.title}
                        </h3>

                        <p className="mt-2 text-[13px] text-slate-400">
                          {ev.date ? ev.date : "Date TBA"}
                          {ev.location ? ` • ${ev.location}` : ""}
                        </p>
                      </div>

                      {ev.timeline ? (
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 px-3 py-1 text-xs text-fuchsia-300">
                          <Clock3 className="h-3.5 w-3.5" />
                          {ev.timeline}
                        </div>
                      ) : null}

                      {ev.description ? (
                        <p className="text-sm leading-7 text-slate-300">
                          {ev.description}
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 events-inner-grid" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}