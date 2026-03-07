"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UIToggles from "@/components/ui-toggles";
import CommandPalette from "@/components/command-palette"; 

// optional, but already in layout

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Resources ", href: "#resources " },
  { label: "Skills", href: "#skills" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
  { label: "Challenge", href: "#challenge" },
  
];

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  // ✅ Navbar shrink on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Close on outside click (capture phase)
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

  // ✅ close menu first, then scroll
  const handleNavClick = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(href), 180);
  };

  return (
    <motion.header
      ref={containerRef}
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={[
        "fixed z-50 mx-auto max-w-5xl",
        "left-1/2 -translate-x-1/2",
        "rounded-2xl border",
        "backdrop-blur-xl",
        "transition-all duration-300",
        // width + position feel
        scrolled
          ? "top-3 w-[92%] sm:w-[86%] md:w-[78%]"
          : "top-4 w-[96%] sm:w-[90%] md:w-[82%]",
        // glass + border + glow changes
        scrolled
          ? "border-slate-700/60 bg-slate-950/70 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
          : "border-slate-800/70 bg-slate-950/45 shadow-soft-glow",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between gap-3",
          "transition-all duration-300",
          scrolled ? "px-4 py-2 sm:px-5" : "px-4 py-2.5 sm:px-5",
        ].join(" ")}
      >
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
              className="chip-soft px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-200/85 transition hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900/50 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <div className="relative h-5 w-6">
            <motion.span
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-0 top-0 h-[2px] w-full rounded bg-slate-100"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-0 top-2 h-[2px] w-full rounded bg-slate-100"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
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
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="sm:hidden"
          >
            <div className="px-4 pb-4">
              <div className="glass-surface w-full rounded-xl border border-slate-700/60 p-3">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavClick(item.href);
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-100 hover:bg-slate-900/40 hover:text-sky-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                      >
                        {item.label}
                      </button>
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