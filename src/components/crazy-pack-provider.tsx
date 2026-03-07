"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type UIContextType = {
  terminalMode: boolean;
  setTerminalMode: (v: boolean) => void;
  soundOn: boolean;
  setSoundOn: (v: boolean) => void;
};

const UIContext = createContext<UIContextType | null>(null);

const LS_TERMINAL = "ui:terminalMode";
const LS_SOUND = "ui:soundOn";

export function CrazyPackProvider({ children }: { children: React.ReactNode }) {
  const [terminalMode, setTerminalMode] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    try {
      setTerminalMode(localStorage.getItem(LS_TERMINAL) === "1");
      setSoundOn(localStorage.getItem(LS_SOUND) === "1");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LS_TERMINAL, terminalMode ? "1" : "0");
      document.documentElement.classList.toggle("terminal-mode", terminalMode);
    } catch {}
  }, [terminalMode]);

  useEffect(() => {
    try {
      localStorage.setItem(LS_SOUND, soundOn ? "1" : "0");
    } catch {}
  }, [soundOn]);

  const value = useMemo(
    () => ({ terminalMode, setTerminalMode, soundOn, setSoundOn }),
    [terminalMode, soundOn]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useCrazyUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useCrazyUI must be used within CrazyPackProvider");
  return ctx;
}