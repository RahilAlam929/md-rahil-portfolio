export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Dev = {
  id: string;
  name: string;
  role: string; // Frontend/Backend/Fullstack/UI/AI
  skills: string[];
  availability: string; // "Weekend", "2 hrs/day"
  bio?: string;
  points: number;
};

export type Project = {
  id: string;
  title: string;
  pitch: string;
  description: string;
  difficulty: Difficulty;
  requiredSkills: string[];
  tags: string[];
  teamSize: number;
  status: "Open" | "Building" | "Shipped";
  createdAt: number;
  owner: string;
};

export type TeamJoin = {
  id: string;
  projectId: string;
  devId: string;
  note?: string;
  createdAt: number;
};

export type Chat = {
  id: string;
  projectId: string;
  name: string;
  text: string;
  createdAt: number;
};

export type CofounderPost = {
  id: string;
  title: string; // "Looking for UI cofounder"
  description: string;
  skillsWanted: string[];
  commitment: string; // "part-time", "full-time"
  createdAt: number;
};

export type State = {
  devs: Dev[];
  projects: Project[];
  joins: TeamJoin[];
  chat: Chat[];
  posts: CofounderPost[];
};

const KEY = "rahil_builderhub_super_ultra_v1";

export function uid(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function uniq(arr: string[]) {
  return Array.from(new Set(arr.map((x) => x.trim()).filter(Boolean)));
}

export function norm(s: string) {
  return s.trim().toLowerCase();
}

export function loadState(): State {
  if (typeof window === "undefined") return seedState();
  const raw = localStorage.getItem(KEY);
  if (!raw) return seedState();
  try {
    const s = JSON.parse(raw) as State;
    return {
      devs: s.devs ?? [],
      projects: s.projects ?? [],
      joins: s.joins ?? [],
      chat: s.chat ?? [],
      posts: s.posts ?? [],
    };
  } catch {
    return seedState();
  }
}

export function saveState(state: State) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function scoreMatch(required: string[], have: string[]) {
  const r = required.map(norm);
  const h = have.map(norm);
  const hit = r.filter((x) => h.includes(x)).length;
  const score = r.length ? Math.round((hit / r.length) * 100) : 0;
  return { score, hit, total: r.length };
}

export function formatDate(ts: number) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

function seedState(): State {
  const rahil = {
    id: "dev_rahil",
    name: "Rahil",
    role: "Fullstack",
    skills: ["Next.js", "Node", "UI", "AI", "Git"],
    availability: "Evenings",
    bio: "Building community tools + robotics/AI.",
    points: 30,
  } as Dev;

  return {
    devs: [rahil],
    projects: [
      {
        id: "proj_1",
        title: "Civic Voice Helpdesk",
        pitch: "Voice-first assistant for govt schemes & docs checklist",
        description:
          "Build low-bandwidth UI + voice query + scheme eligibility + docs checklist. Target: Hindi/English.",
        difficulty: "Intermediate",
        requiredSkills: ["Next.js", "UI", "API", "Speech"],
        tags: ["civic", "voice", "low-bandwidth"],
        teamSize: 4,
        status: "Open",
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 6,
        owner: "Rahil",
      },
      {
        id: "proj_2",
        title: "Open Source Starter Kits",
        pitch: "Templates + docs for beginners to ship fast",
        description:
          "Next.js + API + Auth + Deploy. Docs + good-first-issues for contributors.",
        difficulty: "Advanced",
        requiredSkills: ["Next.js", "Docs", "CI/CD", "Node"],
        tags: ["opensource", "templates", "devops"],
        teamSize: 5,
        status: "Open",
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
        owner: "Community",
      },
    ],
    joins: [],
    chat: [],
    posts: [
      {
        id: "post_1",
        title: "Looking for UI/UX Cofounder",
        description: "Need someone to craft futuristic UI for Builder Hub + landing.",
        skillsWanted: ["UI", "Figma", "Brand"],
        commitment: "part-time",
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
      },
    ],
  };
}