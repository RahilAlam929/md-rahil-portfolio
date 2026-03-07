"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Github,
  Terminal,
  FileText,
  GraduationCap,
  Cloud,
  Shield,
} from "lucide-react";

type RoadmapKey =
  | "frontend"
  | "backend"
  | "fullstack"
  | "ai"
  | "datascience"
  | "devops"
  | "mobile"
  | "uiux"
  | "cyber"
  | "robotics";

const roadmaps: Record<
  RoadmapKey,
  { label: string; href: string; summary: string }
> = {
  frontend: {
    label: "Frontend Developer",
    href: "https://roadmap.sh/frontend",
    summary: "HTML → CSS → JavaScript → React → Next.js",
  },
  backend: {
    label: "Backend Developer",
    href: "https://roadmap.sh/backend",
    summary: "APIs → Auth → Databases → Scaling",
  },
  fullstack: {
    label: "Full Stack Developer",
    href: "https://roadmap.sh/full-stack",
    summary: "Frontend + Backend + Deployment",
  },
  ai: {
    label: "AI / ML Engineer",
    href: "https://roadmap.sh/ai-data-scientist",
    summary: "Python → ML → Deep Learning",
  },
  datascience: {
    label: "Data / Analytics",
    href: "https://roadmap.sh/data-analyst",
    summary: "SQL → Analysis → Visualization",
  },
  devops: {
    label: "DevOps Engineer",
    href: "https://roadmap.sh/devops",
    summary: "Docker → CI/CD → Cloud → Monitoring",
  },
  mobile: {
    label: "Mobile App Developer",
    href: "https://roadmap.sh/android",
    summary: "Android / Flutter / React Native",
  },
  uiux: {
    label: "UI/UX Designer",
    href: "https://roadmap.sh/ux-design",
    summary: "Figma → UX → Design Systems",
  },
  cyber: {
    label: "Cybersecurity Engineer",
    href: "https://roadmap.sh/cyber-security",
    summary: "Networking → Security → Pentesting",
  },
  robotics: {
    label: "Robotics / Embedded AI",
    href: "https://roadmap.sh",
    summary: "Hardware → Sensors → Control → AI",
  },
};

const essentialResources = [
  {
    title: "Linux Journey (Free)",
    desc: "Best beginner Linux course: terminal, filesystem, permissions.",
    icon: Terminal,
    href: "https://linuxjourney.com/",
  },
  {
    title: "Linux Command Cheat Sheet",
    desc: "Daily-use Linux commands in one place.",
    icon: Terminal,
    href: "https://cheatography.com/davechild/cheat-sheets/linux-command-line/",
  },
  {
    title: "Git Official Tutorial",
    desc: "Learn Git from official docs (beginner → pro).",
    icon: Github,
    href: "https://git-scm.com/docs/gittutorial",
  },
  {
    title: "GitHub Skills (Free)",
    desc: "Official interactive GitHub learning labs + certificates.",
    icon: Github,
    href: "https://skills.github.com/",
  },
  {
    title: "First Contributions",
    desc: "Make your first open-source contribution step-by-step.",
    icon: Github,
    href: "https://firstcontributions.github.io/",
  },
  {
    title: "Deploy on Vercel (Docs)",
    desc: "Deployment + env setup guide (Next.js friendly).",
    icon: Cloud,
    href: "https://vercel.com/docs",
  },
  {
    title: "Home LAN / Networking",
    desc: "Home networking and homelab learning resource.",
    icon: Cloud,
    href: "https://terrich-hash.github.io/homelab/",
  },
  {
    title: "ATS Resume Templates (Free)",
    desc: "Professional resume templates for students/devs.",
    icon: FileText,
    href: "https://www.overleaf.com/latex/templates/tagged/cv",
  },
  {
    title: "UI Inspiration (Landingfolio)",
    desc: "Modern UI inspiration for landing pages & portfolios.",
    icon: BookOpen,
    href: "https://www.landingfolio.com/",
  },
];

function CardGrid({
  items,
}: {
  items: {
    title: string;
    desc: string;
    href: string;
    icon: any;
    tag?: string;
  }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((r, i) => {
        const Icon = r.icon;

        return (
          <motion.a
            key={r.title}
            href={r.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.03 }}
            className="group relative rounded-2xl border border-slate-800/60 bg-slate-950/40 p-4 sm:p-5 transition hover:border-sky-500/40 hover:bg-slate-950/60"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-fuchsia-500/10 opacity-0 blur-xl transition group-hover:opacity-100" />

            <div className="relative flex items-start gap-3">
              <div className="shrink-0 rounded-xl border border-slate-800/70 bg-slate-950/60 p-2">
                <Icon className="h-5 w-5 text-sky-300/80" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-100 transition group-hover:text-sky-300 sm:text-base break-words">
                    {r.title}
                  </h3>

                  {r.tag && (
                    <span className="rounded-full border border-slate-700/70 bg-slate-950/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-300">
                      {r.tag}
                    </span>
                  )}
                </div>

                <p className="mt-1 break-words text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {r.desc}
                </p>
              </div>

              <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:text-sky-300" />
            </div>

            <div className="relative mt-5 text-xs uppercase tracking-[0.18em] text-slate-500">
              Open
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}

type LearnKey =
  | "web"
  | "ai"
  | "linux"
  | "git"
  | "cloud"
  | "cyber"
  | "data"
  | "networking";

const learningPacks: Record<
  LearnKey,
  {
    label: string;
    summary: string;
    items: { title: string; desc: string; href: string; icon: any; tag?: string }[];
  }
> = {
  web: {
    label: "Web Dev",
    summary: "Best free courses to become job-ready in web development.",
    items: [
      {
        title: "Harvard CS50 (Free)",
        desc: "World-famous intro to CS (strong credibility).",
        icon: GraduationCap,
        href: "https://cs50.harvard.edu/",
        tag: "Course",
      },
      {
        title: "MDN Web Docs (Learn)",
        desc: "Best free learning for HTML/CSS/JS.",
        icon: BookOpen,
        href: "https://developer.mozilla.org/en-US/docs/Learn",
        tag: "Course",
      },
      {
        title: "Next.js Learn",
        desc: "Official Next.js guided course (free).",
        icon: BookOpen,
        href: "https://nextjs.org/learn",
        tag: "Course",
      },
      {
        title: "freeCodeCamp Certifications",
        desc: "Free certifications + projects (Web, JS, Backend, etc.).",
        icon: GraduationCap,
        href: "https://www.freecodecamp.org/learn/",
        tag: "Certificate",
      },
    ],
  },
  ai: {
    label: "AI / ML",
    summary: "Beginner-friendly AI learning + certifications.",
    items: [
      {
        title: "Kaggle Learn (Free)",
        desc: "Micro-courses: Python, Pandas, ML, SQL.",
        icon: BookOpen,
        href: "https://www.kaggle.com/learn",
        tag: "Course",
      },
      {
        title: "DeepLearning.AI Courses",
        desc: "High-quality AI courses (many have audit/free options).",
        icon: BookOpen,
        href: "https://www.deeplearning.ai/courses/",
        tag: "Course",
      },
      {
        title: "IBM SkillsBuild (Free Certificates)",
        desc: "AI + Cloud learning + badges/certs.",
        icon: GraduationCap,
        href: "https://skillsbuild.org/learners",
        tag: "Certificate",
      },
      {
        title: "Google Certificates",
        desc: "Career certificates (Data/Cyber/IT).",
        icon: GraduationCap,
        href: "https://grow.google/certificates/",
        tag: "Certificate",
      },
    ],
  },
  linux: {
    label: "Linux",
    summary: "Linux + command line learning (must-have for devs).",
    items: [
      {
        title: "Linux Journey",
        desc: "Best Linux course for beginners.",
        icon: Terminal,
        href: "https://linuxjourney.com/",
        tag: "Course",
      },
      {
        title: "OverTheWire Bandit",
        desc: "Fun way to learn Linux & security basics.",
        icon: Terminal,
        href: "https://overthewire.org/wargames/bandit/",
        tag: "Practice",
      },
      {
        title: "Linux Command Cheat Sheet",
        desc: "Most used Linux commands.",
        icon: Terminal,
        href: "https://cheatography.com/davechild/cheat-sheets/linux-command-line/",
        tag: "Cheat",
      },
    ],
  },
  git: {
    label: "Git & GitHub",
    summary: "Version control + GitHub workflow + certificates.",
    items: [
      {
        title: "Git Official Tutorial",
        desc: "Learn Git from official docs.",
        icon: Github,
        href: "https://git-scm.com/docs/gittutorial",
        tag: "Course",
      },
      {
        title: "GitHub Skills (Certificates)",
        desc: "Interactive GitHub learning modules.",
        icon: GraduationCap,
        href: "https://skills.github.com/",
        tag: "Certificate",
      },
      {
        title: "First Contributions",
        desc: "Your first open-source contribution.",
        icon: Github,
        href: "https://firstcontributions.github.io/",
        tag: "Practice",
      },
    ],
  },
  cloud: {
    label: "Cloud / Deploy",
    summary: "Hosting + deployment learning (projects go live).",
    items: [
      {
        title: "Vercel Docs",
        desc: "Deploy Next.js sites + env setup.",
        icon: Cloud,
        href: "https://vercel.com/docs",
        tag: "Docs",
      },
      {
        title: "AWS Skill Builder",
        desc: "AWS learning + some free courses.",
        icon: Cloud,
        href: "https://skillbuilder.aws/",
        tag: "Course",
      },
      {
        title: "Google Cloud Skills Boost",
        desc: "Hands-on cloud labs (often free tiers).",
        icon: Cloud,
        href: "https://www.cloudskillsboost.google/",
        tag: "Labs",
      },
    ],
  },
  cyber: {
    label: "Cybersecurity",
    summary: "Security foundations + beginner courses.",
    items: [
      {
        title: "Cisco NetAcad",
        desc: "Free networking/cyber courses.",
        icon: Shield,
        href: "https://www.netacad.com/",
        tag: "Course",
      },
      {
        title: "OverTheWire",
        desc: "Security practice wargames.",
        icon: Shield,
        href: "https://overthewire.org/wargames/",
        tag: "Practice",
      },
      {
        title: "Roadmap: Cyber Security",
        desc: "Step-by-step cybersecurity path.",
        icon: BookOpen,
        href: "https://roadmap.sh/cyber-security",
        tag: "Roadmap",
      },
    ],
  },
  data: {
    label: "Data / Analytics",
    summary: "SQL + analysis + visualization resources.",
    items: [
      {
        title: "Kaggle Learn (SQL/Pandas)",
        desc: "Fast, beginner-friendly data learning.",
        icon: BookOpen,
        href: "https://www.kaggle.com/learn",
        tag: "Course",
      },
      {
        title: "Google Certificates",
        desc: "Data Analytics certificate path.",
        icon: GraduationCap,
        href: "https://grow.google/certificates/",
        tag: "Certificate",
      },
      {
        title: "Roadmap: Data Analyst",
        desc: "Clear path for analytics career.",
        icon: BookOpen,
        href: "https://roadmap.sh/data-analyst",
        tag: "Roadmap",
      },
    ],
  },
  networking: {
    label: "Home LAN / Networking",
    summary: "Home networking and homelab learning resources.",
    items: [
      {
        title: "Homelab Docs",
        desc: "Home LAN, self-hosting, and networking resource.",
        icon: Cloud,
        href: "https://terrich-hash.github.io/homelab/",
        tag: "Docs",
      },
      {
        title: "Networking Basics",
        desc: "Good starting point for learning practical home networking.",
        icon: BookOpen,
        href: "https://terrich-hash.github.io/homelab/",
        tag: "Basics",
      },
      {
        title: "Home Lab Setup",
        desc: "Explore setup ideas for personal network and lab environment.",
        icon: Cloud,
        href: "https://terrich-hash.github.io/homelab/",
        tag: "Setup",
      },
      {
        title: "Secure Networking",
        desc: "Learn home network structure and safer access patterns.",
        icon: Shield,
        href: "https://terrich-hash.github.io/homelab/",
        tag: "Security",
      },
    ],
  },
};

export default function ResourcesSection() {
  const [selectedRoadmap, setSelectedRoadmap] =
    useState<RoadmapKey>("frontend");
  const roadmap = useMemo(
    () => roadmaps[selectedRoadmap],
    [selectedRoadmap]
  );

  const [learnKey, setLearnKey] = useState<LearnKey>("web");
  const pack = useMemo(() => learningPacks[learnKey], [learnKey]);

  return (
    <section
      id="resources"
      className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-10"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-sky-300 sm:text-xl">
          Builder Toolkit & Roadmaps
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          Career roadmaps + essentials + free courses/certifications in one
          place.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/35 p-5 sm:p-6 md:p-7"
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-sky-300/80">
              Roadmap Hub
            </div>
            <h3 className="mt-3 text-base font-semibold text-slate-100 sm:text-lg">
              Choose a career path
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {roadmap.summary}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-auto md:items-end">
            <label className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Select roadmap
            </label>

            <select
              value={selectedRoadmap}
              onChange={(e) =>
                setSelectedRoadmap(e.target.value as RoadmapKey)
              }
              className="w-full rounded-xl border border-slate-800/70 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none focus:border-sky-500/60 md:w-[340px]"
            >
              {Object.entries(roadmaps).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.label}
                </option>
              ))}
            </select>

            <a
              href={roadmap.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500/25 via-blue-500/15 to-fuchsia-500/20 px-4 py-3 text-sm font-semibold text-slate-100 hover:brightness-110 md:w-auto"
            >
              Open Full Roadmap <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>

      <div className="mt-8">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-100 sm:text-lg">
            Essentials (Linux + Git + Deploy)
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            Must-have resources for every beginner developer.
          </p>
        </div>

        <CardGrid items={essentialResources} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative mt-10 overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/35 p-5 sm:p-6 md:p-7"
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-fuchsia-500/8 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-emerald-300/80">
              Free Courses & Certifications
            </div>
            <h3 className="mt-3 text-base font-semibold text-slate-100 sm:text-lg">
              Pick a category and start learning
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {pack.summary}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 md:w-auto md:items-end">
            <label className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Select category
            </label>
            <select
              value={learnKey}
              onChange={(e) => setLearnKey(e.target.value as LearnKey)}
              className="w-full rounded-xl border border-slate-800/70 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none focus:border-emerald-400/60 md:w-[340px]"
            >
              {Object.entries(learningPacks).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative mt-6">
          <CardGrid items={pack.items} />
        </div>
      </motion.div>
    </section>
  );
}