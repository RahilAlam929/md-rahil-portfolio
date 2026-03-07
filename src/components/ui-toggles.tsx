"use client";

import { Terminal, Volume2, VolumeX } from "lucide-react";
import { useCrazyUI } from "./crazy-pack-provider";

export default function UIToggles() {
  const { terminalMode, setTerminalMode, soundOn, setSoundOn } = useCrazyUI();

  return (
    <div className="hidden items-center gap-2 sm:flex">
      <button
        type="button"
        onClick={() => setTerminalMode(!terminalMode)}
        className="chip-soft inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300 hover:text-sky-300 cursor-pointer"
      >
        <Terminal className="h-4 w-4" />
        {terminalMode ? "Terminal: ON" : "Terminal: OFF"}
      </button>

      <button
        type="button"
        onClick={() => setSoundOn(!soundOn)}
        className="chip-soft inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300 hover:text-sky-300 cursor-pointer"
      >
        {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        Sound
      </button>
    </div>
  );
}