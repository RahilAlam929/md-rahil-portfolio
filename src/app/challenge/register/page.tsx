"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, UserPlus, X } from "lucide-react";

export default function ChallengeRegisterPage() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    challengeType: "hackathon",
    name: "",
    email: "",
    college: "",
    year: "",
    teamName: "",
    teamMembers: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "hackathon" || type === "ideathon") {
      setForm((p) => ({ ...p, challengeType: type }));
    }
  }, [searchParams]);

  const submit = async () => {
    setStatus(null);
    setTeamId("");

    if (!form.name || !form.email || !form.teamName || !form.teamMembers) {
      setStatus({
        type: "err",
        msg: "Name, email, team name, and total team members are required.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/challenge-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("REGISTER RESPONSE:", data);

      if (!res.ok || !data.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }

      setTeamId(data.teamId || "");
      setStatus({
        type: "ok",
        msg: data.message || "Your registration was successful.",
      });

      setForm((p) => ({
        ...p,
        name: "",
        email: "",
        college: "",
        year: "",
        teamName: "",
        teamMembers: "",
        reason: "",
      }));
    } catch (err: any) {
      setStatus({
        type: "err",
        msg: err?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10 text-white">
      <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-950/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-blue-300/80">
              <UserPlus className="h-4 w-4" />
              Register
            </div>

            <h1 className="mt-3 text-3xl font-semibold text-sky-300">
              Register your team
            </h1>
          </div>

          <Link
            href="/#challenge"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-sky-400 hover:text-sky-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>

        <div className="space-y-4">
          <select
            value={form.challengeType}
            onChange={(e) => setForm((p) => ({ ...p, challengeType: e.target.value }))}
            className="input-glass w-full px-4 py-3"
          >
            <option value="hackathon">Hackathon</option>
            <option value="ideathon">Ideathon</option>
          </select>

          <input
            className="input-glass w-full px-4 py-3"
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />

          <input
            type="email"
            className="input-glass w-full px-4 py-3"
            placeholder="Email *"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />

          <input
            className="input-glass w-full px-4 py-3"
            placeholder="College / University"
            value={form.college}
            onChange={(e) => setForm((p) => ({ ...p, college: e.target.value }))}
          />

          <input
            className="input-glass w-full px-4 py-3"
            placeholder="Year"
            value={form.year}
            onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
          />

          <input
            className="input-glass w-full px-4 py-3"
            placeholder="Team Name *"
            value={form.teamName}
            onChange={(e) => setForm((p) => ({ ...p, teamName: e.target.value }))}
          />

          <input
            className="input-glass w-full px-4 py-3"
            placeholder="Total Team Members *"
            value={form.teamMembers}
            onChange={(e) => setForm((p) => ({ ...p, teamMembers: e.target.value }))}
          />

          <textarea
            rows={4}
            className="textarea-glass w-full px-4 py-3"
            placeholder="Why do you want to participate?"
            value={form.reason}
            onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
          />

          <button
            type="button"
            onClick={submit}
            disabled={loading}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-soft-glow transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Registering..." : "Complete Registration"}
            <ArrowRight className="h-4 w-4" />
          </button>

          {teamId && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-300">
              Team ID: <span className="font-mono">{teamId}</span>
            </div>
          )}

          {status && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                status.type === "ok"
                  ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
                  : "border-rose-500/20 bg-rose-500/5 text-rose-300"
              }`}
            >
              {status.msg}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}