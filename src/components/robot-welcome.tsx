"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Sparkles } from "lucide-react";

const ModelViewer = "model-viewer" as any;

export default function RobotWelcome() {
  const [mounted, setMounted] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setMounted(true);

    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getMaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    return (
      voices.find((v) => v.name.toLowerCase().includes("male")) ||
      voices.find((v) => v.name.toLowerCase().includes("david")) ||
      voices.find((v) => v.lang === "en-IN") ||
      voices.find((v) => v.lang.startsWith("en"))
    );
  };

  const speak = () => {
    try {
      const synth = window.speechSynthesis;
      const voice = getMaleVoice();

      const utter = new SpeechSynthesisUtterance(
        "Welcome to Rahil Portfolio"
      );

      if (voice) utter.voice = voice;

      utter.rate = 0.9;
      utter.pitch = 0.85;

      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);

      synth.cancel();
      synth.speak(utter);
    } catch {}
  };

  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-10">
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="mx-auto max-w-6xl text-center">
        {/* HERO TEXT */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-950/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-300">
            <Sparkles className="h-4 w-4" />
            AI Interface
          </div>

          <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-fuchsia-400 bg-clip-text text-transparent">
              Rahil Portfolio
            </span>
          </h1>
        </div>

        {/* ROBOT PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="rounded-[28px] border border-slate-800/70 bg-black/50 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

            {/* MAC BAR */}
            <div className="mb-3 flex items-center justify-between rounded-xl border border-slate-800/70 bg-black/60 px-4 py-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>

              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                rahil.ai.system
              </div>

              <div className="text-[10px] uppercase text-sky-300">
                {speaking ? "voice active" : "online"}
              </div>
            </div>

            {/* ROBOT */}
            <div className="h-[420px] rounded-2xl border border-slate-800/70 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_40%),rgba(2,6,23,0.95)]">
              {!mounted ? (
                <div className="flex h-full items-center justify-center text-slate-400">
                  Loading AI...
                </div>
              ) : (
                <ModelViewer
                  src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"
                  autoplay
                  auto-rotate
                  camera-controls
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* VOICE BUTTON */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={speak}
            className="flex items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110"
          >
            <Volume2 className="h-4 w-4" />
            {speaking ? "Voice Running..." : "Voice On"}
          </button>
        </div>
      </div>
    </section>
  );
}