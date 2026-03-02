"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Events", href: "#events" },
  { label: "Updates", href: "#updates" },
  { label: "Contact", href: "#contact" },
];

const itemVariants: Variants = {
  closed: { opacity: 0, y: 10 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut", // ✅ FIX: array -> string
    },
  }),
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  // ✅ Close on outside click (capture phase so it behaves stable on mobile)
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      if (open && !el.contains(e.target as Node)) setOpen(false);
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, [open]);

  // ✅ close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // ✅ smooth scroll with navbar offset
  const scrollToId = (href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;

    const yOffset = -95;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.history.replaceState(null, "", href);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // ✅ close menu first, then scroll (delay to allow AnimatePresence exit)
  const handleNavClick = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(href), 180);
  };

  return (
    <motion.header
      ref={containerRef}
      className="nav-blur fixed inset-x-4 top-4 z-50 mx-auto max-w-5xl rounded-2xl border border-slate-800/70 shadow-soft-glow sm:inset-x-6"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
        {/* Brand */}
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
              Full Stack Web Developer · Robotics · AI
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 text-xs font-medium text-slate-300 sm:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="chip-soft px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-200/85 transition hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900/50 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <div className="relative h-5 w-6">
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 top-0 h-[2px] w-full rounded bg-slate-100"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-2 h-[2px] w-full rounded bg-slate-100"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 top-4 h-[2px] w-full rounded bg-slate-100"
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="sm:hidden"
          >
            <div className="px-4 pb-4">
              <div className="glass-surface w-full rounded-xl border border-slate-700/60 p-3">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, i) => (
                    <li key={item.href}>
                      <motion.button
                        type="button"
                        variants={itemVariants}
                        initial="closed"
                        animate="open"
                        custom={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavClick(item.href);
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-100 hover:bg-slate-900/40 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        {item.label}
                      </motion.button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}