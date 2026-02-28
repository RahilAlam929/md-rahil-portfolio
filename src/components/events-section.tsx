"use client";

import { motion } from "framer-motion";

type EventItem = {
  title: string;
  date: string;
  description: string;
  track: string;
};

const events: EventItem[] = [
  {
    title: "Robotics + Web Systems Meetup",
    date: "2026 · Coming soon",
    description:
      "A hands-on session on building real-time dashboards for autonomous systems: telemetry, safety, and delightful UI.",
    track: "Community",
  },
  {
    title: "AI Control Loops Workshop",
    date: "2026 · Planned",
    description:
      "Practical ML for robotics: sensor fusion concepts, evaluation, and how to surface insights inside product UIs.",
    track: "Workshop",
  },
  {
    title: "Portfolio Build Stream",
    date: "2026 · Quarterly",
    description:
      "Live build notes from my lab: performance, animations, and the small UX details that make interfaces feel premium.",
    track: "Build",
  },
];

export default function EventsSection() {
  return (
    <section
      id="events"
      className="section-shell relative overflow-hidden px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-fuchsia-500/15 via-transparent to-transparent blur-3xl" />

      <div className="relative space-y-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
              Events
            </h2>
            <p className="mt-2 text-xl font-semibold text-slate-50 md:text-2xl">
              Talks, workshops, and community builds.
            </p>
          </div>
          <p className="max-w-md text-xs text-slate-400 md:text-[13px]">
            A curated feed of sessions where I share robotics dashboards, AI
            product thinking, and full stack engineering patterns.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {events.map((item, index) => (
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
              <div className="pointer-events-none absolute -inset-x-10 -top-16 h-32 bg-gradient-to-b from-sky-500/20 via-transparent to-transparent opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">
                      {item.track}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-slate-50">
                      {item.title}
                    </h3>
                  </div>
                  <span className="badge-pill px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-200">
                    {item.date}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-slate-300/85 md:text-[13px]">
                  {item.description}
                </p>

                <div className="pt-1">
                  <span className="chip-soft inline-flex px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-sky-200/90">
                    Join soon
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

