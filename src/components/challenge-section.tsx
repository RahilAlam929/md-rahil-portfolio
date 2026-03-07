"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  CalendarDays,
  Trophy,
  Gift,
  Sparkles,
  X,
  Brain,
  Code2,
} from "lucide-react";

type ChallengeKey = "hackathon" | "ideathon";

const challenges: Record<
  ChallengeKey,
  {
    key: ChallengeKey;
    pill: string;
    title: string;
    subtitle: string;
    regEnds: string;
    registerHref: string;
    submitHref: string;
    problemHref: string;
    guideHref: string;
    accent: string;
    ring: string;
  }
> = {
  hackathon: {
    key: "hackathon",
    pill: "Hackathon",
    title: "Developer Progress Tracker",
    subtitle: "BUILD | LIVE PRODUCT",
    regEnds: "Tue Mar 10 2026",
    registerHref: "/challenge/register?type=hackathon",
    submitHref: "/challenge/submit?type=hackathon",
    problemHref: "/challenge/problem?type=hackathon",
    guideHref: "/challenge/guide?type=hackathon",
    accent: "from-sky-500 via-blue-500 to-indigo-500",
    ring: "border-sky-500/30",
  },
  ideathon: {
    key: "ideathon",
    pill: "Ideathon",
    title: "Personal Data Ownership",
    subtitle: "IDEA | SOLUTION FRAMEWORK",
    regEnds: "Tue Mar 10 2026",
    registerHref: "/challenge/register?type=ideathon",
    submitHref: "/challenge/submit?type=ideathon",
    problemHref: "/challenge/problem?type=ideathon",
    guideHref: "/challenge/guide?type=ideathon",
    accent: "from-fuchsia-500 via-purple-500 to-sky-500",
    ring: "border-fuchsia-500/30",
  },
};

export default function ChallengeTypes() {
  const [tab, setTab] = useState<ChallengeKey>("hackathon");
  const [timelineOpen, setTimelineOpen] = useState(false);

  const challenge = useMemo(() => challenges[tab], [tab]);

  const togglePrev = () => {
    setTab((prev) => (prev === "hackathon" ? "ideathon" : "hackathon"));
  };

  const toggleNext = () => {
    setTab((prev) => (prev === "hackathon" ? "ideathon" : "hackathon"));
  };

  return (
    <section
      id="challenge"
      className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <div className="mb-5 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Flagship Innovation Challenges
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-slate-400 sm:text-sm">
            Choose your track and complete registration in a clean single-card flow.
          </p>
        </div>

        <div className="mb-4 flex justify-center">
          <div className="inline-flex w-full max-w-md rounded-full border border-slate-800/70 bg-slate-950/70 p-1.5">
            <button
              type="button"
              onClick={() => setTab("hackathon")}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                tab === "hackathon"
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                  : "text-slate-300 hover:text-sky-300"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Hackathon
              </span>
            </button>

            <button
              type="button"
              onClick={() => setTab("ideathon")}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                tab === "ideathon"
                  ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20"
                  : "text-slate-300 hover:text-fuchsia-300"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Ideathon
              </span>
            </button>
          </div>
        </div>

        <div className="relative mx-auto flex max-w-md items-center justify-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={togglePrev}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-800/70 bg-slate-900/80 text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={challenge.key}
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`overflow-hidden rounded-[28px] border ${challenge.ring} bg-slate-950/75 shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_16px_40px_rgba(2,6,23,0.42)]`}
              >
                <div className="p-3 sm:p-4">
                  <div
                    className={`rounded-2xl bg-gradient-to-r ${challenge.accent} p-[1px]`}
                  >
                    <div className="rounded-2xl bg-slate-950/92 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                          <Sparkles className="h-3.5 w-3.5" />
                          BuildQuest 1.0
                        </div>

                        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                          {challenge.pill}
                        </div>
                      </div>

                      <div className="mt-3 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-3">
                        <div className="flex h-24 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-center sm:h-28">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                              Innovation Challenge
                            </div>
                            <div className="mt-1 text-base font-semibold text-white sm:text-lg">
                              {challenge.pill}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                          {challenge.title}
                        </h3>

                        <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-slate-500 sm:text-xs">
                          {challenge.subtitle}
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-slate-800/70 bg-slate-900/50 p-3 text-center">
                        <div className="flex items-center justify-center gap-2 text-slate-300">
                          <CalendarDays className="h-4 w-4 text-sky-300" />
                          <span className="text-sm font-medium">
                            Registration Ends on
                          </span>
                        </div>
                        <div className="mt-2 text-base font-semibold text-white sm:text-lg">
                          {challenge.regEnds}
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-3 text-center">
                          <div className="flex items-center justify-center gap-2 text-amber-300">
                            <Trophy className="h-4 w-4" />
                            <span className="text-[10px] uppercase tracking-[0.16em]">
                              Winners
                            </span>
                          </div>
                          <div className="mt-2 text-sm font-semibold text-white">
                            Top 2
                          </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-3 text-center">
                          <div className="flex items-center justify-center gap-2 text-emerald-300">
                            <Gift className="h-4 w-4" />
                            <span className="text-[10px] uppercase tracking-[0.16em]">
                              Rewards
                            </span>
                          </div>
                          <div className="mt-2 text-sm font-semibold text-white">
                            Prize
                          </div>
                        </div>
                      </div>

                      <Link
                        href={challenge.registerHref}
                        className={`mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r ${challenge.accent} px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110`}
                      >
                        Register Now
                      </Link>

                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Link
                          href={challenge.problemHref}
                          className="inline-flex items-center justify-center rounded-2xl border border-slate-800/70 bg-slate-900/60 px-4 py-2.5 text-xs font-medium text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
                        >
                          Problem
                        </Link>

                        <Link
                          href={challenge.guideHref}
                          className="inline-flex items-center justify-center rounded-2xl border border-slate-800/70 bg-slate-900/60 px-4 py-2.5 text-xs font-medium text-slate-200 transition hover:border-fuchsia-400 hover:text-fuchsia-300"
                        >
                          Guide
                        </Link>
                      </div>

                      <Link
                        href={challenge.submitHref}
                        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                      >
                        Submit Entry <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={toggleNext}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-800/70 bg-slate-900/80 text-slate-300 transition hover:border-fuchsia-400 hover:text-fuchsia-300"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {(["hackathon", "ideathon"] as ChallengeKey[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`h-2.5 rounded-full transition ${
                tab === item ? "w-8 bg-sky-400" : "w-2.5 bg-slate-700"
              }`}
              aria-label={item}
            />
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setTimelineOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Our Initiatives <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {timelineOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTimelineOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-3xl border border-slate-800/70 bg-slate-950/95 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Challenge Timeline
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                    BuildQuest 1.0 Schedule
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setTimelineOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Phase 01
                  </div>
                  <div className="mt-2 font-semibold text-white">
                    Registration Opens
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    March 7, 2026
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Phase 02
                  </div>
                  <div className="mt-2 font-semibold text-white">
                    Build / Ideate Period
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    March 8 – March 16, 2026
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Phase 03
                  </div>
                  <div className="mt-2 font-semibold text-white">
                    Final Submission
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    March 17, 2026
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Phase 04
                  </div>
                  <div className="mt-2 font-semibold text-white">
                    Winner Announcement
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    March 18, 2026
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}