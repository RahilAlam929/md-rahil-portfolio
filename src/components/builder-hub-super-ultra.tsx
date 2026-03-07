"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ChevronRight,
  Crown,
  DollarSign,
  GraduationCap,
  Layers,
  MessageCircle,
  Plus,
  Rocket,
  Search,
  Send,
  Terminal,
  Users,
  Wand2,
  X,
} from "lucide-react";

import type { CofounderPost, Difficulty, Dev, Project, State } from "@/lib/builder-hub-super-store";
import {
  formatDate,
  loadState,
  norm,
  saveState,
  scoreMatch,
  uid,
  uniq,
} from "@/lib/builder-hub-super-store";

type TabKey = "Idea Engine" | "Projects" | "Teams" | "Developers" | "Terminal" | "Leaderboard" | "Funding";

const tabs: { key: TabKey; icon: any }[] = [
  { key: "Idea Engine", icon: Wand2 },
  { key: "Projects", icon: Layers },
  { key: "Teams", icon: Users },
  { key: "Developers", icon: GraduationCap },
  { key: "Terminal", icon: Terminal },
  { key: "Leaderboard", icon: Award },
  { key: "Funding", icon: DollarSign },
];

const ideaBank = [
  {
    title: "WhatsApp Shop Assistant",
    diff: "Beginner" as Difficulty,
    skills: ["API", "Node", "UI"],
    roadmap: ["Chat UI", "Orders flow", "Invoice", "Deploy"],
    stack: ["Next.js", "Node", "WhatsApp Cloud API (later)"],
  },
  {
    title: "Portfolio Critique Bot",
    diff: "Beginner" as Difficulty,
    skills: ["UI", "React"],
    roadmap: ["Checklist UI", "Score rules", "Share report", "Deploy"],
    stack: ["Next.js", "LocalStorage"],
  },
  {
    title: "Voice-first Civic Helpdesk",
    diff: "Intermediate" as Difficulty,
    skills: ["Speech", "API", "UI"],
    roadmap: ["Voice input", "FAQ search", "Eligibility rules", "Offline UI"],
    stack: ["Next.js", "Web Speech", "FastAPI (optional)"],
  },
  {
    title: "Open Source Starter Kit Factory",
    diff: "Advanced" as Difficulty,
    skills: ["Next.js", "CI/CD", "Docs"],
    roadmap: ["Template repo", "Docs site", "Issues", "Deploy scripts"],
    stack: ["Next.js", "GitHub Actions", "MDX"],
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-800/70 bg-slate-950/40 px-3 py-1 text-[11px] text-slate-200/85">
      {children}
    </span>
  );
}

function Modal({
  open,
  title,
  subtitle,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="w-full max-w-3xl rounded-3xl border border-slate-800/70 bg-slate-950/90 p-6 shadow-soft-glow"
            initial={{ y: 16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-sky-300/80">{title}</p>
                {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="cursor-pointer rounded-full border border-slate-800/70 bg-slate-950/40 p-2 text-slate-200 hover:text-sky-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BuilderHubSuperUltra() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<TabKey>("Idea Engine");

  const [state, setState] = useState<State>(() => loadState());
  const [toast, setToast] = useState<string | null>(null);

  // filters
  const [q, setQ] = useState("");
  const [diff, setDiff] = useState<Difficulty | "All">("All");

  // idea engine
  const [ideaSkill, setIdeaSkill] = useState("UI");
  const [ideaDiff, setIdeaDiff] = useState<Difficulty>("Beginner");
  const [ideaOut, setIdeaOut] = useState<any>(null);

  // modals
  const [openProject, setOpenProject] = useState(false);
  const [openDev, setOpenDev] = useState(false);
  const [openFunding, setOpenFunding] = useState(false);

  const [roomProject, setRoomProject] = useState<Project | null>(null);

  // forms
  const [projectForm, setProjectForm] = useState({
    title: "",
    pitch: "",
    description: "",
    difficulty: "Beginner" as Difficulty,
    requiredSkills: "",
    tags: "",
    teamSize: 4,
  });

  const [devForm, setDevForm] = useState({
    name: "",
    role: "Frontend",
    skills: "",
    availability: "Weekend",
    bio: "",
  });

  const [fundingForm, setFundingForm] = useState({
    title: "",
    description: "",
    skillsWanted: "",
    commitment: "part-time",
  });

  // chat
  const [chatName, setChatName] = useState("");
  const [chatMsg, setChatMsg] = useState("");

  // terminal
  const [termLines, setTermLines] = useState<string[]>([
    "SUPER ULTRA Terminal — type: help",
    "Try: goto projects",
  ]);
  const [termInput, setTermInput] = useState("");
  const termRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    setState(loadState());
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    saveState(state);
  }, [mounted, state]);

  const ping = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1100);
  };

  const allSkills = useMemo(() => {
    const s = [
      ...state.devs.flatMap((d) => d.skills),
      ...state.projects.flatMap((p) => p.requiredSkills),
      ...state.posts.flatMap((p) => p.skillsWanted),
      "Next.js",
      "React",
      "UI",
      "Node",
      "API",
      "AI",
      "Speech",
      "Docs",
      "CI/CD",
      "Git",
      "Linux",
      "Home Lab & Server ",
    ];
    return uniq(s).sort((a, b) => a.localeCompare(b));
  }, [state]);

  const filteredProjects = useMemo(() => {
    const nq = norm(q);
    return state.projects
      .filter((p) => {
        if (diff !== "All" && p.difficulty !== diff) return false;
        if (!nq) return true;
        const hay = `${p.title} ${p.pitch} ${p.description} ${p.tags.join(" ")} ${p.requiredSkills.join(" ")}`.toLowerCase();
        return hay.includes(nq);
      })
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [state.projects, q, diff]);

  const leaderboard = useMemo(() => {
    return [...state.devs].sort((a, b) => b.points - a.points).slice(0, 10);
  }, [state.devs]);

  const pickIdea = () => {
    const matches = ideaBank.filter((x) => x.diff === ideaDiff && x.skills.map(norm).includes(norm(ideaSkill)));
    const pool = matches.length ? matches : ideaBank.filter((x) => x.diff === ideaDiff);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setIdeaOut(pick);
    ping("✨ Generated an idea");
  };

  const createProject = () => {
    if (projectForm.title.trim().length < 4 || projectForm.pitch.trim().length < 10) {
      ping("⚠️ Title(4+) & Pitch(10+) required");
      return;
    }
    const p: Project = {
      id: uid("proj"),
      title: projectForm.title.trim(),
      pitch: projectForm.pitch.trim(),
      description: projectForm.description.trim() || projectForm.pitch.trim(),
      difficulty: projectForm.difficulty,
      requiredSkills: uniq(projectForm.requiredSkills.split(",")),
      tags: uniq(projectForm.tags.split(",")),
      teamSize: Number(projectForm.teamSize) || 4,
      status: "Open",
      createdAt: Date.now(),
      owner: devForm.name.trim() || "Community",
    };
    setState((s) => ({ ...s, projects: [p, ...s.projects] }));
    setOpenProject(false);
    setProjectForm({
      title: "",
      pitch: "",
      description: "",
      difficulty: "Beginner",
      requiredSkills: "",
      tags: "",
      teamSize: 4,
    });
    ping("✅ Project created");
  };

  const createDev = () => {
    if (devForm.name.trim().length < 2) return ping("⚠️ Name required");
    const d: Dev = {
      id: uid("dev"),
      name: devForm.name.trim(),
      role: devForm.role.trim(),
      skills: uniq(devForm.skills.split(",")),
      availability: devForm.availability.trim(),
      bio: devForm.bio.trim(),
      points: 0,
    };
    setState((s) => ({ ...s, devs: [d, ...s.devs] }));
    setOpenDev(false);
    setDevForm({ name: "", role: "Frontend", skills: "", availability: "Weekend", bio: "" });
    ping("✅ Developer added");
  };

  const createFunding = () => {
    if (fundingForm.title.trim().length < 6) return ping("⚠️ Title required");
    const post: CofounderPost = {
      id: uid("post"),
      title: fundingForm.title.trim(),
      description: fundingForm.description.trim(),
      skillsWanted: uniq(fundingForm.skillsWanted.split(",")),
      commitment: fundingForm.commitment,
      createdAt: Date.now(),
    };
    setState((s) => ({ ...s, posts: [post, ...s.posts] }));
    setOpenFunding(false);
    setFundingForm({ title: "", description: "", skillsWanted: "", commitment: "part-time" });
    ping("✅ Posted");
  };

  const suggestedDevs = (p: Project) => {
    return state.devs
      .map((d) => {
        const m = scoreMatch(p.requiredSkills, d.skills);
        return { dev: d, score: m.score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  };

  const roomChat = useMemo(() => {
    if (!roomProject) return [];
    return state.chat.filter((c) => c.projectId === roomProject.id).sort((a, b) => a.createdAt - b.createdAt);
  }, [state.chat, roomProject]);

  const sendChat = () => {
    if (!roomProject) return;
    const name = (chatName || "Anonymous").trim();
    const text = chatMsg.trim();
    if (!text) return;
    setState((s) => ({
      ...s,
      chat: [
        ...s.chat,
        { id: uid("msg"), projectId: roomProject.id, name, text, createdAt: Date.now() },
      ],
    }));
    setChatMsg("");
  };

  const award = (name: string, pts: number) => {
    setState((s) => ({
      ...s,
      devs: s.devs.map((d) => (norm(d.name) === norm(name) ? { ...d, points: d.points + pts } : d)),
    }));
    ping(`🏆 +${pts} points to ${name}`);
  };

  const pushTerm = (lines: string[]) => {
    setTermLines((p) => [...p, ...lines]);
    setTimeout(() => termRef.current?.scrollTo({ top: termRef.current.scrollHeight, behavior: "smooth" }), 0);
  };

  const runTerminal = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    pushTerm([`> ${cmd}`]);

    const c = cmd.toLowerCase();

    if (c === "help") {
      pushTerm([
        "commands:",
        "goto ideas | projects | teams | devs | terminal | leaderboard | funding",
        "list projects",
        "match <projectId> <devName>",
        "award <devName> <points>",
      ]);
      return;
    }

    if (c.startsWith("goto ")) {
      const x = c.replace("goto ", "").trim();
      const map: Record<string, TabKey> = {
        ideas: "Idea Engine",
        projects: "Projects",
        teams: "Teams",
        devs: "Developers",
        terminal: "Terminal",
        leaderboard: "Leaderboard",
        funding: "Funding",
      };
      const t = map[x];
      if (!t) return pushTerm(["Unknown tab. Try: goto projects"]);
      setTab(t);
      pushTerm([`Opened: ${t}`]);
      return;
    }

    if (c === "list projects") {
      pushTerm(state.projects.slice(0, 10).map((p) => `${p.id} • ${p.title} • ${p.difficulty}`));
      return;
    }

    if (c.startsWith("award ")) {
      const parts = cmd.split(" ");
      if (parts.length < 3) return pushTerm(["Usage: award <devName> <points>"]);
      const name = parts[1];
      const pts = Number(parts[2]);
      if (!Number.isFinite(pts)) return pushTerm(["Points must be a number"]);
      award(name, pts);
      pushTerm([`ok: awarded ${pts} to ${name}`]);
      return;
    }

    if (c.startsWith("match ")) {
      const parts = cmd.split(" ");
      if (parts.length < 3) return pushTerm(["Usage: match <projectId> <devName>"]);
      const pid = parts[1];
      const dn = parts.slice(2).join(" ");
      const p = state.projects.find((x) => x.id.toLowerCase() === pid.toLowerCase());
      const d = state.devs.find((x) => norm(x.name) === norm(dn));
      if (!p) return pushTerm(["Project not found. Try: list projects"]);
      if (!d) return pushTerm(["Dev not found. Try: goto devs"]);
      const m = scoreMatch(p.requiredSkills, d.skills);
      pushTerm([`match: ${m.score}% (${m.hit}/${m.total})`]);
      return;
    }

    pushTerm(["Unknown command. Type: help"]);
  };

  return (
    <section id="builder-hub" className="section-shell relative overflow-hidden px-6 py-16 md:px-10 lg:px-12">
      <div className="pointer-events-none absolute -left-32 -top-40 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-40 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-sky-300/80">
              <Crown className="h-4 w-4" />
              Builder Hub SUPER ULTRA
            </div>
            <h2 className="mt-3 text-balance text-3xl font-semibold text-slate-100 sm:text-4xl">
              Build teams. Ship open-source. Launch startups.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300/90 md:text-base">
              One dashboard. Multiple pages inside. Terminal commands included.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setOpenProject(true)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110"
            >
              <Plus className="h-4 w-4" />
              Create Project
            </button>

            <button
              onClick={() => setOpenDev(true)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:text-sky-300"
            >
              <GraduationCap className="h-4 w-4" />
              Add Developer
            </button>

            <button
              onClick={() => setOpenFunding(true)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-6 py-2.5 text-sm font-semibold text-slate-100 hover:text-sky-300"
            >
              <DollarSign className="h-4 w-4" />
              Post Cofounder
            </button>
          </div>
        </div>

        {toast && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-4 py-2 text-sm text-emerald-300">
            <Award className="h-4 w-4" />
            {toast}
          </div>
        )}

        {/* SINGLE MEDIUM BOX */}
        <div className="mt-10 rounded-[2rem] border border-slate-800/70 bg-slate-950/45 p-6 sm:p-8">
          {/* tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`cursor-pointer inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 text-white shadow-soft-glow"
                      : "border border-slate-800/70 bg-slate-950/40 text-slate-200 hover:text-sky-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.key}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            {/* IDEA ENGINE */}
            {tab === "Idea Engine" && (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Idea Engine</p>
                  <p className="mt-2 text-sm text-slate-300/90">
                    Choose skill + difficulty → get idea + roadmap + stack.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <select
                      value={ideaSkill}
                      onChange={(e) => setIdeaSkill(e.target.value)}
                      className="cursor-pointer rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
                    >
                      {allSkills.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>

                    <select
                      value={ideaDiff}
                      onChange={(e) => setIdeaDiff(e.target.value as Difficulty)}
                      className="cursor-pointer rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  <button
                    onClick={pickIdea}
                    className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110"
                  >
                    <Wand2 className="h-4 w-4" />
                    Generate
                  </button>

                  {ideaOut && (
                    <div className="mt-5 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                      <p className="text-lg font-semibold text-slate-100">{ideaOut.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{ideaOut.diff}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {ideaOut.skills.map((s: string) => (
                          <Chip key={s}>{s}</Chip>
                        ))}
                      </div>

                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Roadmap</p>
                        <ul className="mt-2 list-disc pl-5 text-sm text-slate-300/90">
                          {ideaOut.roadmap.map((x: string) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Stack</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {ideaOut.stack.map((x: string) => (
                            <Chip key={x}>{x}</Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Launch Checklist</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-300/90">
                    <p>✅ Define MVP (one sentence)</p>
                    <p>✅ Create “good first issues”</p>
                    <p>✅ Team roles (UI/Backend/Docs)</p>
                    <p>✅ Demo + deploy</p>
                    <p>✅ Share + get feedback</p>
                  </div>
                  <div className="mt-5 rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4 text-xs text-slate-400">
                    This is portfolio-demo mode. Real version: auth + DB + GitHub sync.
                  </div>
                </div>
              </div>
            )}

            {/* PROJECTS */}
            {tab === "Projects" && (
              <div className="space-y-6">
                <div className="grid gap-3 lg:grid-cols-3">
                  <div className="relative lg:col-span-2">
                    <Search className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search projects..."
                      className="w-full rounded-2xl border border-slate-800/70 bg-slate-950/40 pl-10 pr-4 py-2.5 text-sm text-slate-100 outline-none"
                    />
                  </div>

                  <select
                    value={diff}
                    onChange={(e) => setDiff(e.target.value as any)}
                    className="cursor-pointer rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
                  >
                    <option value="All">All</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="grid gap-4">
                  {filteredProjects.map((p) => (
                    <div key={p.id} className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-lg font-semibold text-slate-100">{p.title}</p>
                            <Chip>{p.difficulty}</Chip>
                            <Chip>{p.status}</Chip>
                            <Chip>Owner: {p.owner}</Chip>
                          </div>

                          <p className="mt-2 text-sm text-slate-300/90">{p.pitch}</p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {p.requiredSkills.slice(0, 8).map((s) => (
                              <Chip key={s}>{s}</Chip>
                            ))}
                            {p.tags.slice(0, 6).map((t) => (
                              <Chip key={t}>#{t}</Chip>
                            ))}
                          </div>

                          <p className="mt-3 text-xs text-slate-500">
                            Created: {formatDate(p.createdAt)} • team: {p.teamSize}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setRoomProject(p)}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Team Room
                          </button>

                          <button
                            onClick={() => {
                              setTab("Teams");
                              ping("Opened team matching");
                            }}
                            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:text-sky-300"
                          >
                            <Users className="h-4 w-4" />
                            Match
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredProjects.length === 0 && (
                    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-8 text-center text-slate-400">
                      No projects found.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TEAMS */}
            {tab === "Teams" && (
              <div className="grid gap-6">
                {state.projects.map((p) => (
                  <div key={p.id} className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-100">{p.title}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Needed: {p.requiredSkills.join(", ")}
                        </p>
                      </div>
                      <button
                        onClick={() => setRoomProject(p)}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:text-sky-300"
                      >
                        Open Room <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {suggestedDevs(p).length === 0 ? (
                        <p className="text-sm text-slate-500 md:col-span-3">No suggested devs yet.</p>
                      ) : (
                        suggestedDevs(p).map(({ dev, score }) => (
                          <div key={dev.id} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                            <p className="font-semibold text-slate-100">{dev.name}</p>
                            <p className="text-xs text-slate-500">{dev.role} • match {score}%</p>
                            <p className="mt-2 text-xs text-slate-400">{dev.skills.join(", ")}</p>
                            <button
                              onClick={() => award(dev.name, 3)}
                              className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white shadow-soft-glow hover:brightness-110"
                            >
                              <Award className="h-4 w-4" />
                              +3 pts
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* DEVELOPERS */}
            {tab === "Developers" && (
              <div className="grid gap-4 md:grid-cols-2">
                {state.devs.map((d) => (
                  <div key={d.id} className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-slate-100">{d.name}</p>
                        <p className="text-xs text-slate-500">{d.role} • {d.availability}</p>
                      </div>
                      <Chip>{d.points} pts</Chip>
                    </div>
                    <p className="mt-3 text-sm text-slate-300/90">{d.bio || "—"}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {d.skills.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                    <button
                      onClick={() => award(d.name, 5)}
                      className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-800/70 bg-slate-950/40 px-5 py-2.5 text-sm font-semibold text-slate-100 hover:text-sky-300"
                    >
                      <Award className="h-4 w-4" />
                      Award +5
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TERMINAL */}
            {tab === "Terminal" && (
              <div className="rounded-3xl border border-slate-800/70 bg-black/60 p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  <Chip>help</Chip>
                  <Chip>goto projects</Chip>
                  <Chip>list projects</Chip>
                  <Chip>match {'<projectId>'} {'<devName>'}</Chip>
                  <Chip>award {'<devName>'} {'<points>'}</Chip>
                </div>

                <div
                  ref={termRef}
                  className="h-[320px] overflow-auto rounded-2xl border border-slate-800/70 bg-black p-4 font-mono text-[12px] text-green-300"
                >
                  {termLines.map((l, i) => (
                    <div key={i} className="whitespace-pre-wrap">
                      {l}
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex gap-3">
                  <input
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        runTerminal(termInput);
                        setTermInput("");
                      }
                    }}
                    placeholder="type command..."
                    className="w-full rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 font-mono text-sm text-slate-100 outline-none"
                  />
                  <button
                    onClick={() => {
                      runTerminal(termInput);
                      setTermInput("");
                    }}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110"
                  >
                    Run
                  </button>
                </div>
              </div>
            )}

            {/* LEADERBOARD */}
            {tab === "Leaderboard" && (
              <div className="grid gap-4">
                {leaderboard.length === 0 ? (
                  <div className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-8 text-center text-slate-400">
                    No scores yet.
                  </div>
                ) : (
                  leaderboard.map((d, idx) => (
                    <div
                      key={d.id}
                      className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl border border-slate-800/70 bg-slate-950/40 flex items-center justify-center text-sm font-semibold text-slate-100">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{d.name}</p>
                          <p className="text-xs text-slate-500">{d.role}</p>
                        </div>
                      </div>
                      <Chip>{d.points} pts</Chip>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* FUNDING */}
            {tab === "Funding" && (
              <div className="grid gap-4 md:grid-cols-2">
                {state.posts.map((p) => (
                  <div key={p.id} className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-6">
                    <p className="text-lg font-semibold text-slate-100">{p.title}</p>
                    <p className="mt-2 text-sm text-slate-300/90">{p.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.skillsWanted.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                      <Chip>{p.commitment}</Chip>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">Posted: {formatDate(p.createdAt)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALS */}
      <Modal
        open={openProject}
        title="Create Project"
        subtitle="Open source project board (demo mode)"
        onClose={() => setOpenProject(false)}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={projectForm.title}
            onChange={(e) => setProjectForm((p) => ({ ...p, title: e.target.value }))}
            placeholder="Title *"
            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          />
          <select
            value={projectForm.difficulty}
            onChange={(e) => setProjectForm((p) => ({ ...p, difficulty: e.target.value as Difficulty }))}
            className="cursor-pointer rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        <input
          value={projectForm.pitch}
          onChange={(e) => setProjectForm((p) => ({ ...p, pitch: e.target.value }))}
          placeholder="Pitch *"
          className="mt-3 w-full rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
        />

        <textarea
          value={projectForm.description}
          onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))}
          placeholder="Description"
          rows={4}
          className="mt-3 w-full rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
        />

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input
            value={projectForm.requiredSkills}
            onChange={(e) => setProjectForm((p) => ({ ...p, requiredSkills: e.target.value }))}
            placeholder="Required skills (comma) e.g. Next.js, UI"
            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          />
          <input
            value={projectForm.tags}
            onChange={(e) => setProjectForm((p) => ({ ...p, tags: e.target.value }))}
            placeholder="Tags (comma) e.g. civic, voice"
            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <input
            type="number"
            min={2}
            max={10}
            value={projectForm.teamSize}
            onChange={(e) => setProjectForm((p) => ({ ...p, teamSize: Number(e.target.value) }))}
            className="w-28 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          />
          <button
            onClick={createProject}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            Create
          </button>
        </div>
      </Modal>

      <Modal open={openDev} title="Add Developer" subtitle="Developer wall (demo mode)" onClose={() => setOpenDev(false)}>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={devForm.name}
            onChange={(e) => setDevForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Name *"
            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          />
          <input
            value={devForm.role}
            onChange={(e) => setDevForm((p) => ({ ...p, role: e.target.value }))}
            placeholder="Role"
            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          />
        </div>

        <input
          value={devForm.skills}
          onChange={(e) => setDevForm((p) => ({ ...p, skills: e.target.value }))}
          placeholder="Skills (comma) e.g. React, UI, Git"
          className="mt-3 w-full rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
        />

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input
            value={devForm.availability}
            onChange={(e) => setDevForm((p) => ({ ...p, availability: e.target.value }))}
            placeholder="Availability"
            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          />
          <input
            value={devForm.bio}
            onChange={(e) => setDevForm((p) => ({ ...p, bio: e.target.value }))}
            placeholder="Bio (optional)"
            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          />
        </div>

        <button
          onClick={createDev}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110"
        >
          <GraduationCap className="h-4 w-4" />
          Add
        </button>
      </Modal>

      <Modal open={openFunding} title="Post Cofounder / Funding" subtitle="Startup board (demo mode)" onClose={() => setOpenFunding(false)}>
        <input
          value={fundingForm.title}
          onChange={(e) => setFundingForm((p) => ({ ...p, title: e.target.value }))}
          placeholder="Title * (e.g. Looking for UI cofounder)"
          className="w-full rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
        />
        <textarea
          value={fundingForm.description}
          onChange={(e) => setFundingForm((p) => ({ ...p, description: e.target.value }))}
          placeholder="Description"
          rows={4}
          className="mt-3 w-full rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
        />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input
            value={fundingForm.skillsWanted}
            onChange={(e) => setFundingForm((p) => ({ ...p, skillsWanted: e.target.value }))}
            placeholder="Skills wanted (comma)"
            className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          />
          <select
            value={fundingForm.commitment}
            onChange={(e) => setFundingForm((p) => ({ ...p, commitment: e.target.value }))}
            className="cursor-pointer rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
          >
            <option value="part-time">part-time</option>
            <option value="full-time">full-time</option>
          </select>
        </div>

        <button
          onClick={createFunding}
          className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110"
        >
          <DollarSign className="h-4 w-4" />
          Post
        </button>
      </Modal>

      {/* TEAM ROOM */}
      <Modal
        open={!!roomProject}
        title="Team Room"
        subtitle={roomProject ? `${roomProject.title} • ${roomProject.id}` : ""}
        onClose={() => setRoomProject(null)}
      >
        {roomProject && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Suggested Builders</p>

              <div className="mt-3 grid gap-3">
                {suggestedDevs(roomProject).length === 0 ? (
                  <p className="text-sm text-slate-500">No suggested devs yet. Add developers first.</p>
                ) : (
                  suggestedDevs(roomProject).map(({ dev, score }) => (
                    <div key={dev.id} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-100">{dev.name}</p>
                          <p className="text-xs text-slate-500">{dev.role} • match {score}%</p>
                        </div>
                        <button
                          onClick={() => award(dev.name, 5)}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white shadow-soft-glow hover:brightness-110"
                        >
                          <Award className="h-4 w-4" />
                          +5
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">{dev.skills.join(", ")}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-slate-950/40 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Chat</p>

              <div className="mt-3 h-[280px] overflow-auto rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4">
                {roomChat.length === 0 ? (
                  <p className="text-sm text-slate-500">No messages yet.</p>
                ) : (
                  <div className="space-y-3">
                    {roomChat.map((m) => (
                      <div key={m.id} className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-3">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold text-slate-200">{m.name}</span>
                          <span>{new Date(m.createdAt).toLocaleTimeString()}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-200">{m.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <input
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  placeholder="Name"
                  className="rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
                />
                <input
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendChat();
                  }}
                  placeholder="Message..."
                  className="sm:col-span-2 rounded-2xl border border-slate-800/70 bg-slate-950/40 px-4 py-2.5 text-sm text-slate-100 outline-none"
                />
              </div>

              <button
                onClick={sendChat}
                className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-soft-glow hover:brightness-110"
              >
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}