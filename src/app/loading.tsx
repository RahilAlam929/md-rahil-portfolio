"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-950 to-black">
      <div className="relative flex flex-col items-center gap-4 text-slate-100">
        <motion.div
          className="relative h-20 w-20 rounded-[1.75rem] border border-sky-500/50 bg-slate-950/80 shadow-soft-glow"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-3 rounded-[1.2rem] border border-slate-700/70"
            animate={{
              rotate: [0, 4, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-[18px] rounded-full border border-sky-400/70"
            animate={{
              scale: [1, 1.14, 1],
              boxShadow: [
                "0 0 18px rgba(56,189,248,0.4)",
                "0 0 36px rgba(56,189,248,0.9)",
                "0 0 18px rgba(56,189,248,0.4)",
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-[30px] rounded-full bg-sky-400"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
        <div className="space-y-1 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-sky-300">
            Initializing Portfolio Systems
          </p>
          <p className="text-[11px] text-slate-400">
            Booting up robotics dashboards & full stack environment…
          </p>
        </div>
      </div>
    </div>
  );
}


