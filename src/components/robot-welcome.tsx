"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, Radio, Mic, Cpu } from "lucide-react";

const ModelViewer = "model-viewer" as any;

export default function RobotWelcome() {
  const [mounted, setMounted] = useState(false);
  const [spoken, setSpoken] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [typedText, setTypedText] = useState("");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const fullText = useMemo(
    () => "Welcome to Rahil Portfolio",
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(timer);
    }, 55);

    return () => clearInterval(timer);
  }, [fullText]);

  useEffect(() => {
    if (!mounted) return;
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, [mounted]);

  const speakWelcome = () => {
    try {
      if (spoken) return;
      if (!("speechSynthesis" in window)) return;

      const voices = window.speechSynthesis.getVoices();
      const chosenVoice =
        voices.find((x) => x.name.includes("Google UK English Female")) ||
        voices.find((x) => x.lang === "en-IN") ||
        voices.find((x) => x.lang?.startsWith("en")) ||
        voices[0];

      const utterance = new SpeechSynthesisUtterance(
        "Hello, welcome to Rahil Portfolio."
      );

      if (chosenVoice) utterance.voice = chosenVoice;
      utterance.lang = "en-IN";
      utterance.rate = 0.95;
      utterance.pitch = 1.02;
      utterance.volume = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setSpoken(true);
    } catch {
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      speakWelcome();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [spoken]);

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
            <span className="gradient-text">{typedText}</span>
            <span className="typing-cursor" />
          </h1>

          <p className="mt-3 text-sm text-slate-400 md:text-base">
            Explore projects, experiments, and BuildQuest challenge arena.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/50 px-4 py-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <Bot className="h-4 w-4 text-sky-300" />
              AI Robot Active
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/50 px-4 py-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <Cpu className="h-4 w-4 text-fuchsia-300" />
              3D Interface Loaded
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/50 px-4 py-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <Mic className={`h-4 w-4 ${spoken ? "text-emerald-300" : "text-amber-300"}`} />
              {spoken ? "Voice Initialized" : "Click Anywhere For Welcome"}
            </div>
          </div>
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

            {/* MODEL CONTAINER */}
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
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              )}

              {/* TOP LEFT CHIP */}
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-slate-700/70 bg-slate-950/60 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                AI unit active
              </div>

              {/* BOTTOM RIGHT CHIP */}
              <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-fuchsia-300">
                auto rotate enabled
              </div>

              {/* SPEAKING OVERLAY */}
              <AnimatePresence>
                {isSpeaking && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_45%)]"
                    />

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
                    >
                      <div className="flex items-center gap-2 rounded-full border border-sky-500/20 bg-slate-950/70 px-4 py-2 text-xs uppercase tracking-[0.16em] text-sky-300">
                        <Mic className="h-4 w-4 animate-pulse" />
                        Voice Active
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}