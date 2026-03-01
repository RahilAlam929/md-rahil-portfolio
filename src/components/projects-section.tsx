"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tech: string;
};

const projects: Project[] = [
  {
    title: "Autonomous Robotics Control Hub",
    description:
      "A real-time Next.js dashboard to monitor and control autonomous robots with live telemetry, path planning, and AI alerts.",
    tech: "Next.js · WebSockets · Node.js · Robotics",
  },
  {
    title: "AI-Powered Task Orchestrator",
    description:
      "Microservice architecture that coordinates distributed workers using machine learning models for intelligent job routing.",
    tech: "Node.js · C++ · ML · MongoDB",
  },
  {
    title: "3D Robotics Simulation Interface",
    description:
      "Browser-based interface to visualize robotic arms and mobile robots in 3D with simulated sensor data and control inputs.",
    tech: "React · Three.js · Control Systems",
  },
  {
    title: "Intelligent Portfolio Platform",
    description:
      "A futuristic portfolio CMS with analytics and AI summaries that explain project impact to different audiences.",
    tech: "Next.js · Tailwind CSS · Framer Motion",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 24, rotateX: 8 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
};

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section-shell scroll-mt-28 relative overflow-hidden px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-500/15 via-transparent to-transparent blur-3xl" />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
              Projects
            </h2>
            <p className="mt-2 text-xl font-semibold text-slate-50 md:text-2xl">
              Featured builds from my robotics & full stack lab.
            </p>
          </div>
          <p className="max-w-md text-xs text-slate-400 md:text-[13px]"></p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/70 p-4 shadow-soft-glow"
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.65,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                y: -4,
                rotateX: 3,
                rotateY: -3,
                transition: { type: "spring", stiffness: 140, damping: 18 },
              }}
            >
              <div className="pointer-events-none absolute -inset-x-10 -top-16 h-32 bg-gradient-to-b from-sky-500/25 via-transparent to-transparent opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex h-full flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-50 md:text-[15px]">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-300/85 md:text-[13px]">
                      {project.description}
                    </p>
                  </div>
                  <span className="badge-pill px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-200">
                    Live
                  </span>
                </div>

                <p className="text-[11px] font-mono text-sky-200/80">
                  {project.tech}
                </p>

                <div className="mt-1 flex items-center justify-between gap-2 pt-1 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-medium text-slate-100 transition hover:bg-slate-800"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 px-3 py-1 text-[11px] font-medium text-slate-50 transition hover:brightness-110"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Live Demo</span>
                    </button>
                  </div>
                  <span className="hidden text-[10px] text-slate-500 sm:inline"></span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}