"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Cmd = {
  label: string;
  hint?: string;
  action: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const jump = (hash: string) => {
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", hash);
    setOpen(false);
  };

  const cmds: Cmd[] = [
    { label: "Go: Home", hint: "#home", action: () => jump("#home") },
    { label: "Go: Projects", hint: "#projects", action: () => jump("#projects") },
    { label: "Go: Resources", hint: "#resources", action: () => jump("#resources") },
    { label: "Go: Challenge", hint: "#challenge", action: () => jump("#challenge") },
    { label: "Go: Community", hint: "#community", action: () => jump("#community") },
    { label: "Go: Skill Tree", hint: "#skill-tree", action: () => jump("#skill-tree") },
    { label: "Go: Build Log", hint: "#build-log", action: () => jump("#build-log") },
    { label: "Go: Contact", hint: "#contact", action: () => jump("#contact") },
  ];

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return cmds;
    return cmds.filter((c) => c.label.toLowerCase().includes(t) || (c.hint || "").includes(t));
  }, [q]);

  return (
    <>
      {/* small hint pill */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="chip-soft hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-3 py-1 text-xs text-slate-300 hover:text-sky-300 cursor-pointer"
        aria-label="Open command palette (Ctrl+K)"
      >
        <Search className="h-4 w-4" />
        Ctrl+K
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/60 p-4 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/90"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 border-b border-slate-800/70 px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Type a command… (e.g. projects)"
                  className="w-full bg-transparent text-sm text-slate-100 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-2 text-slate-300 hover:text-sky-300 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[320px] overflow-auto p-2">
                {filtered.map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    onClick={c.action}
                    className="w-full rounded-2xl px-3 py-3 text-left hover:bg-slate-900/40 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-100">{c.label}</div>
                        {c.hint && <div className="text-xs text-slate-400">{c.hint}</div>}
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-500" />
                    </div>
                  </button>
                ))}

                {filtered.length === 0 && (
                  <div className="px-4 py-10 text-center text-sm text-slate-400">
                    No commands found.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}