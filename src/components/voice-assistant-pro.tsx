"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { routeVoiceCommand } from "@/lib/voice-brain";

type RecType = any;

export default function VoiceAssistantPro() {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [lastHeard, setLastHeard] = useState<string>("");
  const [lastReply, setLastReply] = useState<string>("");

  const recognitionRef = useRef<RecType | null>(null);

  const WELCOME_TEXT = useMemo(
    () =>
      "Hello! Welcome to Rahil’s profile. I’m your voice assistant. Say: open projects, open resources, open challenge, or contact.",
    []
  );

  const pickBestVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((v) => v.name.includes("Google UK English Female")) ||
      voices.find((v) => v.name.includes("Google US English")) ||
      voices.find((v) => v.name.includes("Microsoft")) ||
      voices.find((v) => v.lang === "en-IN") ||
      voices[0] ||
      null
    );
  };

  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      const v = pickBestVoice();
      if (v) u.voice = v;
      u.lang = "en-IN";
      u.rate = 0.95;
      u.pitch = 1.08;
      u.volume = 1;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
      setLastReply(text);
    } catch {}
  };

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash);
    if (!el) return;

    // navbar offset feel
    const yOffset = -95;
    const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY + yOffset;

    window.history.replaceState(null, "", hash);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const openUrl = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SR) {
      setSupported(false);
      return;
    }

    const rec = new SR();
    rec.lang = "en-IN";
    rec.continuous = true;
    rec.interimResults = false;

    rec.onresult = (event: any) => {
      const text =
        event.results[event.results.length - 1][0].transcript?.toLowerCase()?.trim() || "";

      if (!text) return;

      setLastHeard(text);

      const res = routeVoiceCommand(text);

      // Action
      if (res.action.type === "scroll") scrollTo(res.action.target);
      if (res.action.type === "open") openUrl(res.action.url);

      // Reply
      speak(res.reply);

      // stop command
      if (text.includes("stop listening") || text === "stop" || text.includes("pause")) {
        try {
          rec.stop();
        } catch {}
        setListening(false);
      }
    };

    rec.onerror = () => {
      // if mic denied / error
      setListening(false);
    };

    recognitionRef.current = rec;
  }, []);

  // ✅ first welcome voice (once)
  useEffect(() => {
    const key = "voice:welcomed:v1";
    try {
      if (localStorage.getItem(key) === "1") return;
      const t = setTimeout(() => {
        // ensure voices loaded (some browsers load async)
        window.speechSynthesis.onvoiceschanged = () => speak(WELCOME_TEXT);
        speak(WELCOME_TEXT);
        localStorage.setItem(key, "1");
      }, 900);
      return () => clearTimeout(t);
    } catch {
      // if storage blocked, still speak once
      const t = setTimeout(() => speak(WELCOME_TEXT), 900);
      return () => clearTimeout(t);
    }
  }, [WELCOME_TEXT]);

  const toggle = () => {
    const rec = recognitionRef.current;
    if (!rec) return;

    try {
      if (listening) {
        rec.stop();
        setListening(false);
        speak("Voice assistant stopped.");
      } else {
        rec.start();
        setListening(true);
        speak("Listening. Tell me what to open.");
      }
    } catch {
      setListening(false);
    }
  };

  if (!supported) {
    // Chrome works best; Safari support varies
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-2">
      {/* tiny status bubble */}
      {(lastHeard || lastReply) && (
        <div className="max-w-[320px] rounded-2xl border border-slate-800/70 bg-slate-950/80 p-3 text-xs text-slate-200 shadow-soft-glow">
          {lastHeard && (
            <div className="text-slate-400">
              <span className="text-slate-500">You:</span> {lastHeard}
            </div>
          )}
          {lastReply && (
            <div className="mt-1">
              <span className="text-slate-500">Bot:</span> {lastReply}
            </div>
          )}
        </div>
      )}

      {/* main button */}
      <button
        type="button"
        onClick={toggle}
        className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110"
        aria-label={listening ? "Stop voice assistant" : "Start voice assistant"}
      >
        {listening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        {listening ? "Listening…" : "Talk to Bot"}
        <Volume2 className="h-4 w-4 opacity-80" />
      </button>
    </div>
  );
}