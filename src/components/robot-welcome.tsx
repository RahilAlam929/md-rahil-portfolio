"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Play,
  Bot,
  Sparkles,
  Cpu,
  ShieldCheck,
} from "lucide-react";

const ModelViewer = "model-viewer" as any;

export default function RobotWelcome() {
  const [mounted, setMounted] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, [mounted]);

  const speak = (text: string) => {
    try {
      if (!voiceOn) return;
      if (!("speechSynthesis" in window)) return;

      const voices = window.speechSynthesis.getVoices();
      const v =
        voices.find((x) => x.name.includes("Google UK English Female")) ||
        voices.find((x) => x.lang === "en-IN") ||
        voices.find((x) => x.lang?.startsWith("en")) ||
        voices[0];

      const u = new SpeechSynthesisUtterance(text);
      if (v) u.voice = v;
      u.lang = "en-IN";
      u.rate = 0.95;
      u.pitch = 1.02;
      u.volume = 1;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {}
  };

  return (
    <section
      id="robot"
      className="section-shell relative overflow-hidden px-6 py-10 md:px-10 md:py-12 lg:px-12"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1fr]">
        {/* LEFT SIDE */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-300/80">
            <Sparkles className="h-4 w-4" />
            AI Welcome Interface
          </div>

          <div>
            <h2 className="text-3xl font-semibold leading-tight text-slate-100 md:text-5xl">
              Welcome to my
              <span className="gradient-text"> intelligent portfolio </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
              A futuristic developer portfolio with AI-inspired interaction,
              robotics aesthetics, and immersive interface design. Explore projects,
              challenges, and creative builds with a smarter experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setVoiceOn((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/50 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-sky-500/40 hover:text-sky-300"
            >
              {voiceOn ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              {voiceOn ? "Voice ON" : "Voice OFF"}
            </button>

            <button
              type="button"
              onClick={() =>
                speak(
                  "Hello. Welcome to Rahil portfolio. Explore my projects, skills, and BuildQuest challenge arena."
                )
              }
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft-glow transition hover:brightness-110"
            >
              <Play className="h-4 w-4" />
              Start Voice
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
              <div className="flex items-center gap-2 text-sky-300">
                <Bot className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">Assistant</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-100">
                Interactive Robot
              </p>
              <p className="mt-1 text-xs leading-6 text-slate-500">
                Immersive 3D welcome interface
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
              <div className="flex items-center gap-2 text-fuchsia-300">
                <Cpu className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">System</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-100">
                Live Visual
              </p>
              <p className="mt-1 text-xs leading-6 text-slate-500">
                Motion + 3D + futuristic style
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
              <div className="flex items-center gap-2 text-emerald-300">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs uppercase tracking-[0.16em]">Status</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-100">
                System Ready
              </p>
              <p className="mt-1 text-xs leading-6 text-slate-500">
                Voice and robot controls active
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-sky-500/10 via-transparent to-fuchsia-500/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-800/70 bg-slate-950/45 p-3">
            <div className="mb-3 flex items-center justify-between rounded-2xl border border-slate-800/70 bg-slate-950/70 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>

              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                robot-viewer
              </div>

              <div className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-sky-300">
                online
              </div>
            </div>

            <div className="relative h-[440px] w-full overflow-hidden rounded-[1.5rem] border border-slate-800/70 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_35%),rgba(2,6,23,0.95)]">
              {!mounted ? (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                  Loading robot...
                </div>
              ) : (
                <div suppressHydrationWarning className="h-full w-full">
                  <ModelViewer
                    src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"
                    autoplay
                    auto-rotate
                    camera-controls
                    interaction-prompt="none"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              )}

              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                AI unit active
              </div>

              <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-fuchsia-300">
                auto rotate enabled
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}