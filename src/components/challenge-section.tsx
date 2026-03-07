"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Code2,
  ArrowRight,
  Lightbulb,
  Sparkles,
  Trophy,
  Gift,
  Rocket,
  BadgeCheck,
  CalendarDays,
  Stars,
  X,
} from "lucide-react";

export default function ChallengeTypes() {
  const [tab, setTab] = useState<"hackathon" | "ideathon">("hackathon");
  const [timelineOpen, setTimelineOpen] = useState(false);

  return (
    <section className="relative overflow-hidden section-shell px-5 py-10 md:px-10 lg:px-12">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mb-10 rounded-[28px] border border-slate-800/70 bg-slate-950/55 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_20px_60px_rgba(2,6,23,0.5)] md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-950/60 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-sky-300/80">
                <Stars className="h-4 w-4" />
                Challenge Arena
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                BuildQuest <span className="text-sky-300">1.0</span>{" "}
                <span className="text-fuchsia-300">2026</span>
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 md:text-base">
                A premium innovation arena for builders, thinkers, and future founders.
                Choose your path: build a working product in the Hackathon track or
                pitch a breakthrough solution in the Ideathon track.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sky-300">
                  <Trophy className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.16em]">Winners</span>
                </div>
                <div className="mt-2 text-lg font-semibold text-white">4 Total</div>
                <div className="mt-1 text-xs text-slate-500">2 Hackathon + 2 Ideathon</div>
              </div>

              <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-300">
                  <Gift className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.16em]">Rewards</span>
                </div>
                <div className="mt-2 text-lg font-semibold text-white">Exciting Prize</div>
                <div className="mt-1 text-xs text-slate-500">Prize + coffee + spotlight</div>
              </div>

              <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 px-4 py-4 text-center">
                <div className="flex items-center justify-center gap-2 text-fuchsia-300">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.16em]">Edition</span>
                </div>
                <div className="mt-2 text-lg font-semibold text-white">2026</div>
                <div className="mt-1 text-xs text-slate-500">Launch edition 1.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline small box */}
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            onClick={() => setTimelineOpen(true)}
            className="w-full max-w-xl cursor-pointer rounded-3xl border border-slate-800/70 bg-slate-950/55 p-5 text-left transition hover:border-sky-500/40 hover:bg-slate-950/70"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Challenge Timeline
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-100">
                  BuildQuest 1.0 2026 • March 7 → March 18
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Click to view full schedule
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-fuchsia-300">
                <CalendarDays className="h-4 w-4" />
                12 Days
              </div>
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => setTab("hackathon")}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              tab === "hackathon"
                ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                : "border border-slate-700/70 bg-slate-950/50 text-slate-300 hover:border-sky-500/40 hover:text-sky-300"
            }`}
          >
            <Code2 className="h-4 w-4" />
            Hackathon
          </button>

          <button
            onClick={() => setTab("ideathon")}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              tab === "ideathon"
                ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20"
                : "border border-slate-700/70 bg-slate-950/50 text-slate-300 hover:border-fuchsia-500/40 hover:text-fuchsia-300"
            }`}
          >
            <Brain className="h-4 w-4" />
            Ideathon
          </button>
        </div>

        {/* Hackathon */}
        {tab === "hackathon" && (
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/55 p-6">
              <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-16 -bottom-16 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-300">
                  <Code2 className="h-4 w-4" />
                  Hackathon Track
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-slate-100">
                  Developer Progress Tracker
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Build a real product that helps developers track skills, projects,
                  GitHub activity, learning consistency, and job-readiness in one place.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2 text-sky-300">
                      <Trophy className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-[0.16em]">Winners</span>
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-100">2 Winners</div>
                    <p className="mt-1 text-xs text-slate-500">Top 2 hackathon teams</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <Gift className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-[0.16em]">Reward</span>
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-100">Exciting Prize</div>
                    <p className="mt-1 text-xs text-slate-500">Prize + coffee + feature</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2 text-fuchsia-300">
                      <Rocket className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-[0.16em]">Output</span>
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-100">Working Product</div>
                    <p className="mt-1 text-xs text-slate-500">Build + deploy + submit</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/45 p-4">
                    <div className="text-sm font-semibold text-slate-100">What to build</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-400">
                      <li>• Skill tracker</li>
                      <li>• Project tracker</li>
                      <li>• Progress dashboard</li>
                      <li>• Optional GitHub integration</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/45 p-4">
                    <div className="text-sm font-semibold text-slate-100">Submission format</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-400">
                      <li>• Live deployed link</li>
                      <li>• GitHub repo link</li>
                      <li>• Optional PDF / PPT</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/55 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Actions</div>

              <div className="mt-5 space-y-3">
                <Link
                  href="/challenge/problem?type=hackathon"
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4 transition hover:border-sky-500/40"
                >
                  <span className="text-sm font-semibold text-slate-100">Problem Statement</span>
                  <ArrowRight className="h-4 w-4 text-sky-300" />
                </Link>

                <Link
                  href="/challenge/guide?type=hackathon"
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4 transition hover:border-fuchsia-500/40"
                >
                  <span className="text-sm font-semibold text-slate-100">Step Guide</span>
                  <ArrowRight className="h-4 w-4 text-fuchsia-300" />
                </Link>

                <Link
                  href="/challenge/register?type=hackathon"
                  className="flex cursor-pointer items-center justify-between rounded-2xl bg-blue-600 p-4 transition hover:bg-blue-700"
                >
                  <span className="text-sm font-semibold text-white">Register</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </Link>

                <Link
                  href="/challenge/submit?type=hackathon"
                  className="flex cursor-pointer items-center justify-between rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 p-4 transition hover:brightness-110"
                >
                  <span className="text-sm font-semibold text-white">Submit Project</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </Link>
              </div>

              <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                <div className="flex items-center gap-2 text-amber-300">
                  <BadgeCheck className="h-4 w-4" />
                  <span className="text-sm font-semibold">Hackathon Rewards</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  <strong>2 winners</strong> will receive an exciting prize, coffee, and
                  premium featured recognition.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ideathon */}
        {tab === "ideathon" && (
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/55 p-6">
              <div className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -right-16 -bottom-16 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-fuchsia-300">
                  <Brain className="h-4 w-4" />
                  Ideathon Track
                </div>

                <h3 className="mt-4 text-2xl font-semibold text-slate-100">
                  Personal Data Ownership
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Design a startup-level solution where users truly own their personal data,
                  control who accesses it, and benefit from transparent permission-based sharing.
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2 text-fuchsia-300">
                      <Trophy className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-[0.16em]">Winners</span>
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-100">2 Winners</div>
                    <p className="mt-1 text-xs text-slate-500">Top 2 ideathon teams</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <Gift className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-[0.16em]">Reward</span>
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-100">Exciting Prize</div>
                    <p className="mt-1 text-xs text-slate-500">Prize + coffee + spotlight</p>
                  </div>

                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                    <div className="flex items-center gap-2 text-sky-300">
                      <Lightbulb className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-[0.16em]">Output</span>
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-100">Smart Solution</div>
                    <p className="mt-1 text-xs text-slate-500">Idea + framework + impact</p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/45 p-4">
                    <div className="text-sm font-semibold text-slate-100">What to submit</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-400">
                      <li>• Problem understanding</li>
                      <li>• Solution framework</li>
                      <li>• User flow</li>
                      <li>• Business / impact model</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-800/70 bg-slate-950/45 p-4">
                    <div className="text-sm font-semibold text-slate-100">Submission format</div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-400">
                      <li>• PDF / PPT</li>
                      <li>• Optional solution note</li>
                      <li>• No coding required</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/55 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Actions</div>

              <div className="mt-5 space-y-3">
                <Link
                  href="/challenge/problem?type=ideathon"
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4 transition hover:border-sky-500/40"
                >
                  <span className="text-sm font-semibold text-slate-100">Problem Statement</span>
                  <ArrowRight className="h-4 w-4 text-sky-300" />
                </Link>

                <Link
                  href="/challenge/guide?type=ideathon"
                  className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4 transition hover:border-fuchsia-500/40"
                >
                  <span className="text-sm font-semibold text-slate-100">Step Guide</span>
                  <ArrowRight className="h-4 w-4 text-fuchsia-300" />
                </Link>

                <Link
                  href="/challenge/register?type=ideathon"
                  className="flex cursor-pointer items-center justify-between rounded-2xl bg-blue-600 p-4 transition hover:bg-blue-700"
                >
                  <span className="text-sm font-semibold text-white">Register</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </Link>

                <Link
                  href="/challenge/submit?type=ideathon"
                  className="flex cursor-pointer items-center justify-between rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-sky-500 p-4 transition hover:brightness-110"
                >
                  <span className="text-sm font-semibold text-white">Submit Solution</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </Link>
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                <div className="flex items-center gap-2 text-emerald-300">
                  <BadgeCheck className="h-4 w-4" />
                  <span className="text-sm font-semibold">Ideathon Rewards</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  <strong>2 winners</strong> will receive an exciting prize, coffee, and
                  featured innovation recognition.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Modal */}
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
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl border border-slate-800/70 bg-slate-950/95 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_20px_60px_rgba(2,6,23,0.55)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Full Schedule
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-sky-300">
                    BuildQuest 1.0 Timeline
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setTimelineOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
                  aria-label="Close timeline"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Phase 01
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-100">
                    Registration Opens
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    March 7, 2026
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Phase 02
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-100">
                    Build / Ideate Period
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    March 8 – March 16, 2026
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Phase 03
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-100">
                    Final Submission
                  </div>
                  <div className="mt-1 text-sm text-slate-400">
                    March 17, 2026
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                    Phase 04
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-100">
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