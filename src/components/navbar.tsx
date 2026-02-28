"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Events", href: "#events" },
  { label: "Updates", href: "#updates" },
  { label: "Contact", href: "#contact" },
] as const;

const itemVariants = {
  closed: { opacity: 0, y: -8 },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, y: -8 },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (!el) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    event.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  return (
    <motion.header
      className="nav-blur fixed inset-x-4 top-4 z-40 mx-auto w-[min(72rem,calc(100%-2rem))] rounded-2xl border border-slate-800/70 shadow-soft-glow"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <div className="relative h-7 w-7 shrink-0 rounded-full bg-sky-400/40 dot-pulse">
            <div className="neon-ring absolute inset-1 rounded-full bg-slate-950/80" />
            <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-fuchsia-500" />
          </div>
          <div className="min-w-0 leading-none">
            <span className="block truncate text-xs font-medium uppercase tracking-[0.18em] text-sky-300/80">
              MD RAHIL
            </span>
            <span className="hidden truncate text-[11px] text-slate-400 sm:block">
              Full Stack Web Developer· Robotics · AI
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 text-xs font-medium text-slate-300 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleLinkClick(event, item.href)}
              className="chip-soft px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-200/85 transition hover:text-sky-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger — icon animates to X when open */}
        <button
          type="button"
          className="chip-soft relative inline-flex h-9 w-9 items-center justify-center text-slate-100 transition-colors hover:text-sky-300 sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="relative flex h-4 w-4 items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                >
                  <X className="h-4 w-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                >
                  <Menu className="h-4 w-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </button>
      </div>

      {/* Mobile menu — slides down smoothly */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id={menuId}
            className="border-t border-slate-800/70 px-3 pb-3 pt-2 sm:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="grid gap-1.5 text-[11px] font-medium text-slate-300">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  custom={i}
                  onClick={(event) => handleLinkClick(event, item.href)}
                  className="chip-soft block w-full px-4 py-2.5 text-left uppercase tracking-[0.14em] text-slate-200/90 transition-colors hover:text-sky-300 active:bg-slate-800/50"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

