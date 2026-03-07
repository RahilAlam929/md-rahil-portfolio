"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Slide = {
  tag: string;
  title: string;
  points: string[];
  metrics?: { label: string; value: string }[];
};

const slides: Slide[] = [
  {
    tag: "01 · Problem",
    title: "People lose hours on busywork, not deep work.",
    points: [
      "Students & researchers spend time on admin: notes, formatting, searching, follow-ups.",
      "Knowledge stays scattered across docs, chats, tabs.",
      "Low-bandwidth + local-language users face extra friction.",
    ],
    metrics: [
      { label: "Target", value: "Students & Researchers" },
      { label: "Pain", value: "Time + context switching" },
    ],
  },
  {
    tag: "02 · Solution",
    title: "DeepWork OS — an AI Copilot that orchestrates your workflow.",
    points: [
      "Research copilot: finds sources, manages notes, drafts with citations.",
      "Smart automation: reminders, summaries, repetitive tasks.",
      "Private-by-default + low-bandwidth friendly experience.",
    ],
    metrics: [
      { label: "Core", value: "AI + Automation" },
      { label: "Focus", value: "Accessibility-first" },
    ],
  },
  {
    tag: "03 · Why now",
    title: "AI is ready — users want simple, trustworthy tools.",
    points: [
      "LLMs make summarization & drafting faster, but UX is still messy.",
      "Opportunity: a focused product for deep work (not generic chat).",
      "Build MVP → pilot users → iterate fast.",
    ],
    metrics: [
      { label: "Stage", value: "MVP Building" },
      { label: "Ask", value: "Collabs / pilots" },
    ],
  },
];

export default function PitchDeckModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);

  const slide = useMemo(() => slides[index], [index]);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(slides.length - 1, i + 1));

  // Esc + arrow keys
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onClose]);

  // reset slide when opening
  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <button
            aria-label="Close pitch deck"
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 18, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-950/90 shadow-soft-glow backdrop-blur"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-slate-800/60 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.18em] text-sky-300/80">
                  Startup Pitch
                </span>
                <span className="text-xs text-slate-400">
                  ({index + 1}/{slides.length})
                </span>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg px-2 py-1 text-slate-300 hover:bg-slate-900/50"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="px-5 py-5 sm:px-6">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                {slide.tag}
              </div>

              <div className="mt-2 text-xl font-semibold text-slate-100">
                {slide.title}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-200/90">
                {slide.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-sky-400/70" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {slide.metrics?.length ? (
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {slide.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-3"
                    >
                      <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
                        {m.label}
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-100">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Footer / Controls */}
            <div className="flex items-center justify-between gap-3 border-t border-slate-800/60 px-5 py-4 sm:px-6">
              <div className="text-xs text-slate-400">
                Tip: ← → keys • Esc to close
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  disabled={index === 0}
                  className="rounded-lg border border-slate-800/70 bg-slate-950/40 px-3 py-2 text-sm text-slate-200 disabled:opacity-40 hover:border-sky-400/60"
                >
                  ← Prev
                </button>

                {index < slides.length - 1 ? (
                  <button
                    onClick={next}
                    className="rounded-lg bg-sky-500/20 px-3 py-2 text-sm text-sky-300 hover:bg-sky-500/30"
                  >
                    Next →
                  </button>
                ) : (
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="rounded-lg bg-sky-500/20 px-3 py-2 text-sm text-sky-300 hover:bg-sky-500/30"
                  >
                    Collaborate
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}