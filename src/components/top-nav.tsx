"use client";

import { motion } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Events", href: "#events" },
  { label: "Updates", href: "#updates" },
  { label: "Contact", href: "#contact" },
];

export default function TopNav() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      className="nav-blur fixed inset-x-4 top-4 z-40 mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 rounded-2xl border border-slate-800/70 px-4 py-2.5 shadow-soft-glow sm:flex-row sm:gap-0 sm:px-5"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-7 w-7 rounded-full bg-sky-400/40 dot-pulse">
          <div className="neon-ring absolute inset-1 rounded-full bg-slate-950/80" />
          <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-fuchsia-500" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-sky-300/80">
            MD RAHIL
          </span>
          <span className="text-[11px] text-slate-400">
            Full Stack Web Developer· Robotics · AI
          </span>
        </div>
      </div>

      <nav className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[10px] font-medium text-slate-300 sm:justify-end sm:gap-x-4 sm:gap-y-2 sm:text-xs">
        {navItems.map((item) => (
          <button
            key={item.href}
            type="button"
            onClick={() => handleClick(item.href)}
            className="chip-soft whitespace-nowrap px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-200/85 transition hover:text-sky-300 sm:px-3 sm:text-[11px] sm:tracking-[0.16em]"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </motion.header>
  );
}


