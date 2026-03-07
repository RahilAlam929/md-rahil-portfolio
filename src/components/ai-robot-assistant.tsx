"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Volume2, VolumeX, Bug } from "lucide-react";

export default function AIRobotAssistant() {
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const log = (m: string) => setLogs((p) => [m, ...p].slice(0, 6));

  // ✅ preload voices
  useEffect(() => {
    setErr(null);
    log("Assistant mounted ✅");

    if (!("speechSynthesis" in window)) {
      setErr("SpeechSynthesis not supported in this browser.");
      log("SpeechSynthesis NOT supported ❌");
      return;
    }

    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      const v = window.speechSynthesis.getVoices();
      log(`Voices loaded: ${v.length}`);
    };

    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SR) {
      setErr("SpeechRecognition not supported. Use Chrome desktop.");
      log("SpeechRecognition NOT supported ❌");
      return;
    }

    const rec = new SR();
    rec.lang = "en-IN";
    rec.continuous = true;
    rec.interimResults = false;

    rec.onstart = () => log("Mic started ✅");
    rec.onend = () => {
      log("Mic ended");
      setListening(false);
    };
    rec.onerror = (e: any) => {
      const msg = e?.error ? String(e.error) : "unknown error";
      setErr(`Recognition error: ${msg}`);
      log(`Recognition error: ${msg}`);
      setListening(false);
    };

    rec.onresult = (event: any) => {
      const text =
        event.results[event.results.length - 1][0].transcript?.trim() || "";
      log(`Heard: ${text}`);

      // basic command
      if (text.toLowerCase().includes("projects")) {
        speak("Opening projects section.");
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
      } else {
        speak("I heard you. Say projects to open projects.");
      }
    };

    recognitionRef.current = rec;
    log("Recognition ready ✅");
  }, []);

  const speak = (text: string) => {
    try {
      if (!voiceOn) {
        log("Voice OFF (skipped speaking)");
        return;
      }
      if (!("speechSynthesis" in window)) {
        setErr("SpeechSynthesis not supported.");
        return;
      }

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
      u.pitch = 1.05;

      u.onstart = () => log("Speaking started ✅");
      u.onend = () => log("Speaking ended");

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e: any) {
      setErr(`Speak error: ${e?.message || String(e)}`);
      log("Speak error ❌");
    }
  };

  const toggleMic = () => {
    setErr(null);
    const rec = recognitionRef.current;
    if (!rec) {
      setErr("Recognition not ready (or not supported). Use Chrome.");
      log("No recognition instance ❌");
      return;
    }

    if (listening) {
      try {
        rec.stop();
        setListening(false);
        log("Mic stop clicked");
      } catch (e: any) {
        setErr(`Stop error: ${e?.message || String(e)}`);
      }
      return;
    }

    // start
    try {
      rec.start(); // MUST be in user click
      setListening(true);
      log("Mic start clicked");
      // small delay so mic start doesn't swallow speech
      setTimeout(() => speak("Jarvis online. I am listening."), 250);
    } catch (e: any) {
      setErr(`Start error: ${e?.message || String(e)}`);
      log("Mic start failed ❌");
      setListening(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
      {/* Debug box */}
      <div className="w-[320px] rounded-2xl border border-slate-800/70 bg-slate-950/70 p-3 text-xs text-slate-200">
        <div className="mb-2 flex items-center gap-2 text-slate-300">
          <Bug className="h-4 w-4" />
          <span className="uppercase tracking-widest">Jarvis Debug</span>
        </div>

        {err && (
          <div className="mb-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-200">
            {err}
          </div>
        )}

        <div className="space-y-1 text-slate-300/90">
          {logs.map((l, i) => (
            <div key={i}>• {l}</div>
          ))}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => speak("Hello! This is a voice test from Jarvis.")}
            className="flex-1 rounded-xl bg-slate-900/60 px-3 py-2 text-slate-100 hover:text-sky-300"
          >
            Test Voice
          </button>

          <button
            type="button"
            onClick={() => setVoiceOn((v) => !v)}
            className="rounded-xl bg-slate-900/60 px-3 py-2 text-slate-100 hover:text-sky-300"
            aria-label="Toggle voice"
          >
            {voiceOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main mic button */}
      <button
        type="button"
        onClick={toggleMic}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-3 text-white shadow-soft-glow hover:brightness-110"
      >
        {listening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        {listening ? "AI Listening..." : "Talk to Assistant"}
      </button>
    </div>
  );
}