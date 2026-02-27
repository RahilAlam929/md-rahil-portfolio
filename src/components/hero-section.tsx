"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

const phrases = [
  "Full Stack Web Developer",
  "Robotics Enthusiast",
  "AI Builder",
];

function useTypingCarousel(words: string[], delay = 140, pause = 1500) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [direction, setDirection] = useState<"typing" | "erasing">("typing");

  useEffect(() => {
    const currentWord = words[index];

    if (direction === "typing") {
      if (text.length < currentWord.length) {
        const timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length + 1)),
          delay
        );
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => setDirection("erasing"), pause);
      return () => clearTimeout(timeout);
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(
          () => setText(currentWord.slice(0, text.length - 1)),
          delay / 1.4
        );
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setDirection("typing");
      }, 260);
      return () => clearTimeout(timeout);
    }
  }, [text, direction, index, words, delay, pause]);

  return text;
}

export default function HeroSection() {
  const typed = useTypingCarousel(phrases);

  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="section-shell relative overflow-hidden px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14"
    >
      <div className="pointer-events-none absolute -left-32 -top-40 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-40 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-slate-900/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-sky-200/80"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400">
              <span className="absolute inset-[-4px] rounded-full bg-sky-400/40 blur-md" />
            </span>
            Available for remote & on-site opportunities
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="gradient-text text-balance text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl lg:text-[3.1rem]">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-sky-300 via-sky-100 to-fuchsia-300 bg-clip-text text-transparent">
                MD RAHIL
              </span>
            </h1>
            <p className="typing-cursor text-sm font-mono uppercase tracking-[0.26em] text-sky-300/85 sm:text-xs md:text-sm">
              {typed || " "}
            </p>
          </motion.div>

          <motion.p
            className="max-w-2xl text-sm leading-relaxed text-slate-300/90 md:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            I build intelligent digital systems that blend{" "}
            <span className="font-semibold text-sky-300">
              full stack web Developer
            </span>{" "}
            with{" "}
            <span className="font-semibold text-fuchsia-300">
              robotics and AI
            </span>{" "}
            to create real-world, impactful solutions – from responsive
            interfaces to smart, autonomous experiences.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3 pt-2 sm:gap-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => scrollTo("#projects")}
              className="shadow-soft-glow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-slate-50 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("#contact")}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/50 bg-slate-900/70 px-5 py-2.5 text-sm font-medium text-sky-200 transition hover:border-sky-300 hover:text-sky-100"
            >
              Contact Me
            </button>

            <div className="ml-1 flex items-center gap-2 text-xs text-slate-400 sm:text-sm">
              <span className="hidden text-slate-500 sm:inline">
                Social radar:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/md-rahil-a070b3329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noreferrer"
                  className="chip-soft inline-flex h-8 w-8 items-center justify-center text-sky-300 hover:text-sky-100"
                  aria-label="LinkedIn (update with your profile URL)"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/mdr_ahil0786/"
                  target="_blank"
                  rel="noreferrer"
                  className="chip-soft inline-flex h-8 w-8 items-center justify-center text-pink-300 hover:text-pink-100"
                  aria-label="Instagram (update with your profile URL)"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="chip-soft inline-flex h-8 w-8 items-center justify-center text-slate-200 hover:text-slate-50"
                  aria-label="GitHub (update with your profile URL)"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-6 flex flex-1 items-center justify-center lg:mt-0"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72">
            <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-tr from-sky-500/25 via-blue-600/10 to-fuchsia-500/30 blur-3xl" />

            <motion.div
              className="glass-surface relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.9rem] border border-slate-700/60 px-6 py-5"
              initial={{ rotateX: 18, rotateY: -18, opacity: 0 }}
              animate={{ rotateX: 15, rotateY: -10, opacity: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky-200">
                  Robotics Console
                </span>
                <span className="chip-soft px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-slate-200">
                  Online
                </span>
              </div>

              <div className="mt-3 space-y-2">
                <p className="text-[11px] font-mono text-sky-200/80">
                  /system
                  <span className="text-slate-400">/status</span>
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-slate-300/90">
                  <p>
                    &gt; deploying{" "}
                    <span className="text-sky-300">full-stack</span> pipelines…
                  </p>
                  <p>
                    &gt; linking{" "}
                    <span className="text-fuchsia-300">robotics sensors</span>…
                  </p>
                  <p>
                    &gt; optimizing{" "}
                    <span className="text-emerald-300">AI control loops</span>…
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-[10px] text-slate-200/80">
                <div className="space-y-1 rounded-xl border border-slate-600/60 bg-slate-950/60 p-2">
                  <p className="font-mono text-[10px] text-slate-400">
                    Stack
                  </p>
                  <p>Next.js · Node.js</p>
                </div>
                <div className="space-y-1 rounded-xl border border-slate-600/60 bg-slate-950/60 p-2">
                  <p className="font-mono text-[10px] text-slate-400">
                    Domain
                  </p>
                  <p>Robotics · AI</p>
                </div>
                <div className="space-y-1 rounded-xl border border-slate-600/60 bg-slate-950/60 p-2">
                  <p className="font-mono text-[10px] text-slate-400">
                    Mode
                  </p>
                  <p>Autonomous</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


