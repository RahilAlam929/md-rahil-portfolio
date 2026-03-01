"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

type EventItem = {
  title: string;
  date?: string; // e.g. "2026-03-10" or "Mar 10, 2026"
  location?: string;
  description?: string;
  link?: string;
};

type EventsSectionProps = {
  events?: EventItem[];
};

export default function EventsSection({ events = [] }: EventsSectionProps) {
  const hasEvents = events.length > 0;

  return (
    <section
      id="events"
      className="section-shell relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14"
    >
      <div className="grid-bg pointer-events-none" aria-hidden />

      <h2 className="mb-6 text-center text-lg font-semibold tracking-wide text-sky-200">
        Events & Updates
      </h2>

      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl"
        >
          <div className="absolute -inset-6 rounded-[1.4rem] neon-ring pointer-events-none" />

          <div className="glass-surface relative z-10 mx-4 rounded-[1.25rem] p-7 text-center neon-border float-anim fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-900/50 ring-1 ring-sky-500/20 shadow-soft-glow">
              <Calendar className="h-8 w-8 text-sky-300" />
            </div>

            {!hasEvents ? (
              <>
                <h3 className="mt-5 text-xl font-semibold text-slate-100">
                  No Events Yet
                </h3>
                <p className="mt-3 text-sm text-slate-300">
                  New events coming soon...
                </p>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-gradient-to-r from-sky-600/5 to-sky-700/5 px-4 py-2 text-sm font-medium text-sky-100 shadow-soft-glow hover:brightness-105 focus:outline-none"
                >
                  Stay Tuned
                </button>
              </>
            ) : (
              <>
                <h3 className="mt-5 text-xl font-semibold text-slate-100">
                  Upcoming
                </h3>

                <ul className="mt-4 space-y-3 text-left">
                  {events.map((ev, idx) => (
                    <li
                      key={`${ev.title}-${idx}`}
                      className="rounded-xl border border-slate-700/60 bg-slate-950/40 p-4"
                    >
                      <p className="text-sm font-semibold text-slate-100">
                        {ev.title}
                      </p>
                      <p className="mt-1 text-[12px] text-slate-400">
                        {ev.date ? ev.date : "Date TBA"}
                        {ev.location ? ` • ${ev.location}` : ""}
                      </p>
                      {ev.description ? (
                        <p className="mt-2 text-sm text-slate-300">
                          {ev.description}
                        </p>
                      ) : null}

                      {ev.link ? (
                        <a
                          href={ev.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex text-sm font-medium text-sky-300 hover:text-sky-200"
                        >
                          View details →
                        </a>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 events-inner-grid" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}