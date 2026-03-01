"use client";

import { motion } from "framer-motion";

const badges = [
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "C++",
  "AI/ML",
  "Robotics",
  "AWS",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-shell scroll-mt-28 relative overflow-hidden px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-x-10 -top-24 h-32 bg-gradient-to-b from-sky-500/20 via-transparent to-transparent blur-3xl" />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <motion.div
          className="md:w-2/3"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
            About
          </h2>

          <p className="mt-2 text-xl font-semibold text-slate-50 md:text-2xl">
            Full stack engineering fused with robotics intelligence.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-300/90 md:text-[15px]">
            I&apos;m MD Rahil, a{" "}
            <span className="font-semibold text-sky-300">
              Full Stack Web Developer
            </span>{" "}
            and{" "}
            <span className="font-semibold text-fuchsia-300">
              Robotics Enthusiast
            </span>{" "}
            focused on building systems where digital interfaces control
            physical behavior. From real-time dashboards to autonomous robots, I
            love architecting solutions that are both technically precise and
            visually premium.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-300/85 md:text-[15px]">
            My work blends modern web stacks like{" "}
            <span className="font-semibold text-sky-200">Next.js</span> with{" "}
            <span className="font-semibold text-sky-200">Node.js</span>, data
            layers powered by{" "}
            <span className="font-semibold text-sky-200">MongoDB</span>, and
            intelligent control written in{" "}
            <span className="font-semibold text-sky-200">C++ &amp; ML</span>.
            The result: interfaces that feel like an AI control room — fast,
            responsive, and deeply interactive.
          </p>
        </motion.div>

        <motion.div
          className="md:w-1/3"
          initial={{ opacity: 0, x: 22 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="rounded-2xl border border-slate-700/80 bg-slate-950/70 p-4">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
              Core Stack
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <motion.span
                  key={badge}
                  className="badge-pill px-3 py-1 text-xs text-sky-50/90"
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  {badge}
                </motion.span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="space-y-1 rounded-xl border border-sky-500/30 bg-slate-900/80 p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Focus
                </p>
                <p>Robotics dashboards, control systems, and full stack apps.</p>
              </div>

              <div className="space-y-1 rounded-xl border border-fuchsia-500/30 bg-slate-900/80 p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Mindset
                </p>
                <p>Clean architecture, predictable systems, and delightful UX.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}