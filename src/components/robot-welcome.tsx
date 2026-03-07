"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Radio, Trophy, Volume2 } from "lucide-react";

const ModelViewer = "model-viewer" as any;

export default function RobotWelcome() {
  const [mounted, setMounted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setMounted(true);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();

      const handleVoices = () => {
        window.speechSynthesis.getVoices();
      };

      window.speechSynthesis.onvoiceschanged = handleVoices;
    }

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakWelcome = () => {
    try {
      if (!("speechSynthesis" in window)) return;

      const synth = window.speechSynthesis;
      const voices = synth.getVoices();

      const selectedVoice =
        voices.find((v) => v.name.includes("Google UK English Female")) ||
        voices.find((v) => v.lang === "en-IN") ||
        voices.find((v) => v.lang?.startsWith("en")) ||
        null;

      const utterance = new SpeechSynthesisUtterance(
        "Hello, welcome to Rahil Portfolio."
      );

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.lang = "en-IN";
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.cancel();
      synth.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  return (
    <section
      id="robot"
      className="section-shell relative overflow-hidden px-6 py-8 md:px-10 md:py-10 lg:px-12"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* TOP TEXT */}
        <div className="mb-7 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-950/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-300/80">
            <Sparkles className="h-4 w-4" />
            AI Portfolio Interface
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-slate-100 md:text-5xl">
            <span className="gradient-text">Welcome to Rahil Portfolio</span>
          </h1>

          <p className="mt-3 text-sm text-slate-400 md:text-base">
            Explore projects, experiments, and BuildQuest challenge arena.
          </p>
        </div>

        {/* ROBOT */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-sky-500/10 via-transparent to-fuchsia-500/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/70 bg-slate-950/45 p-3 shadow-[0_0_0_1px_rgba(15,23,42,0.75),0_20px_60px_rgba(2,6,23,0.45)]">
            {/* TOP BAR */}
            <div className="mb-3 flex items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>

              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                robot-console
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-sky-300">
                <Radio className={`h-3.5 w-3.5 ${isSpeaking ? "animate-pulse" : ""}`} />
                {isSpeaking ? "speaking" : "online"}
              </div>
            </div>

            {/* ROBOT MODEL */}
            <div className="relative h-[540px] w-full overflow-hidden rounded-[1.5rem] border border-slate-800/70 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_35%),rgba(2,6,23,0.95)]">
              {!mounted ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-slate-400">
                  <div className="h-16 w-16 animate-pulse rounded-2xl border border-slate-800/70 bg-slate-900/60" />
                  <div className="text-sm">Loading robot interface...</div>
                </div>
              ) : (
                <div suppressHydrationWarning className="h-full w-full">
                  <ModelViewer
                    src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"
                    autoplay
                    auto-rotate
                    camera-controls
                    interaction-prompt="none"
                    style={{ width: "80%", height: "80%" }}
                  />
                </div>
              )}

              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                AI unit active
              </div>

              <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-fuchsia-300">
                auto rotate enabled
              </div>

              {isSpeaking && (
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_45%)]" />
              )}
            </div>
          </div>
        </motion.div>

        {/* BUTTON */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={speakWelcome}
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-sky-500/30 bg-slate-950/70 px-6 py-3 text-sm font-semibold text-sky-300 shadow-soft-glow transition hover:border-sky-400 hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20 text-sky-300 transition group-hover:bg-sky-500 group-hover:text-white">
              <Volume2 className="h-4 w-4" />
            </span>
            Start AI Welcome
          </button>
        </div>

        {/* BUILDQUEST BOX */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/60 px-5 py-3 shadow-soft-glow">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 text-white shadow-soft-glow">
              <Trophy className="h-5 w-5" />
            </div>

            <div className="text-left">
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Featured Arena
              </div>
              <div className="text-sm font-semibold text-slate-100">
                BuildQuest
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}