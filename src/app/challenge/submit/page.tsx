"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Github,
  Link as LinkIcon,
  Upload,
  ArrowRight,
  X,
  ShieldCheck,
  Search,
} from "lucide-react";

export default function ChallengeSubmitPage() {
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    teamId: "",
    challengeType: "",
    name: "",
    email: "",
    projectLink: "",
    githubLink: "",
    note: "",
  });

  const [teamInfo, setTeamInfo] = useState<{
    challengeType: string;
    teamName: string;
    teamMembers: string;
  } | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingTeam, setFetchingTeam] = useState(false);
  const [status, setStatus] = useState<{
    type: "ok" | "err";
    msg: string;
  } | null>(null);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "hackathon" || type === "ideathon") {
      setForm((p) => ({ ...p, challengeType: type }));
    }
  }, [searchParams]);

  const fetchTeam = async () => {
    setStatus(null);
    setTeamInfo(null);

    if (!form.teamId.trim()) {
      setStatus({ type: "err", msg: "Please enter Team ID first." });
      return;
    }

    setFetchingTeam(true);

    try {
      const res = await fetch(
        `/api/challenge-team?teamId=${encodeURIComponent(
          form.teamId.trim().toUpperCase()
        )}`
      );

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Invalid Team ID");
      }

      setForm((prev) => ({
        ...prev,
        teamId: data.team.teamId || "",
        challengeType: data.team.challengeType || "",
        name: data.team.name || "",
        email: data.team.email || "",
      }));

      setTeamInfo({
        challengeType: data.team.challengeType || "",
        teamName: data.team.teamName || "",
        teamMembers: data.team.teamMembers || "",
      });

      setStatus({
        type: "ok",
        msg: "Team verified successfully.",
      });
    } catch (err: any) {
      setStatus({
        type: "err",
        msg: err?.message || "Could not verify Team ID.",
      });
    } finally {
      setFetchingTeam(false);
    }
  };

  const isVerified = !!teamInfo;
  const isIdeathon = teamInfo?.challengeType === "ideathon";
  const isHackathon = teamInfo?.challengeType === "hackathon";

  const submit = async () => {
    setStatus(null);

    if (!isVerified) {
      setStatus({
        type: "err",
        msg: "Please verify your Team ID first.",
      });
      return;
    }

    if (!form.teamId || !form.name || !form.email) {
      setStatus({
        type: "err",
        msg: "Team details are missing. Please verify Team ID again.",
      });
      return;
    }

    if (isHackathon && !form.projectLink.trim()) {
      setStatus({
        type: "err",
        msg: "Live Project Link is required for hackathon submission.",
      });
      return;
    }

    if (isIdeathon && !form.note.trim() && !file) {
      setStatus({
        type: "err",
        msg: "Please add solution details or upload a file for ideathon submission.",
      });
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();
      body.append("teamId", form.teamId);
      body.append("challengeType", form.challengeType);
      body.append("name", form.name);
      body.append("email", form.email);
      body.append("projectLink", form.projectLink);
      body.append("githubLink", form.githubLink);
      body.append("note", form.note);

      if (file) {
        body.append("attachment", file);
      }

      const res = await fetch("/api/challenge-submit", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus({
        type: "ok",
        msg: data.message || "Submission successful.",
      });

      setForm({
        teamId: "",
        challengeType: "",
        name: "",
        email: "",
        projectLink: "",
        githubLink: "",
        note: "",
      });

      setTeamInfo(null);
      setFile(null);
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
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-12 text-white">
      <div className="rounded-3xl border border-slate-800/70 bg-slate-950/60 p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Submit Entry
            </div>

            <h1 className="mt-2 text-3xl font-semibold text-fuchsia-300">
              Submit your final challenge entry
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Verify Team ID first. Then your correct challenge type will load automatically.
            </p>
          </div>

          <Link
            href="/#challenge"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-fuchsia-400 hover:text-fuchsia-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4">
            <div className="flex items-center gap-2 text-sky-300">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm font-semibold">Team Verification Required</span>
            </div>

            <p className="mt-2 text-sm text-slate-300">
              Enter the Team ID you received during registration.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              className="input-glass w-full px-4 py-3"
              placeholder="Team ID * (e.g. TEAM-AB12CD)"
              value={form.teamId}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  teamId: e.target.value.toUpperCase(),
                }))
              }
            />

            <button
              type="button"
              onClick={fetchTeam}
              disabled={fetchingTeam}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-5 py-3 text-sm font-semibold text-sky-300 transition hover:bg-sky-500/20 disabled:opacity-60"
            >
              {fetchingTeam ? "Checking..." : "Verify Team"}
              <Search className="h-4 w-4" />
            </button>
          </div>

          {status && (
            <p
              className={`text-sm ${
                status.type === "ok" ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {status.msg}
            </p>
          )}

          {isVerified && (
            <>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-slate-200">
                <div>
                  <strong>Challenge Type:</strong> {teamInfo.challengeType}
                </div>
                <div>
                  <strong>Team Name:</strong> {teamInfo.teamName}
                </div>
                <div>
                  <strong>Total Members:</strong> {teamInfo.teamMembers}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  className="input-glass w-full px-4 py-3"
                  value={form.name}
                  readOnly
                  placeholder="Registered Name"
                />
                <input
                  className="input-glass w-full px-4 py-3"
                  value={form.email}
                  readOnly
                  placeholder="Registered Email"
                />
              </div>

              {isHackathon && (
                <>
                  <div className="relative">
                    <LinkIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      className="input-glass w-full py-3 pl-11 pr-4"
                      placeholder="Live Project Link *"
                      value={form.projectLink}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, projectLink: e.target.value }))
                      }
                    />
                  </div>

                  <div className="relative">
                    <Github className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      className="input-glass w-full py-3 pl-11 pr-4"
                      placeholder="GitHub Repo Link"
                      value={form.githubLink}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, githubLink: e.target.value }))
                      }
                    />
                  </div>
                </>
              )}

              <textarea
                rows={4}
                className="textarea-glass w-full px-4 py-3"
                placeholder={
                  isIdeathon
                    ? "Write your solution summary / framework / impact / business model"
                    : "Short note about your approach / features"
                }
                value={form.note}
                onChange={(e) =>
                  setForm((p) => ({ ...p, note: e.target.value }))
                }
              />

              <label className="block cursor-pointer rounded-2xl border border-dashed border-slate-700/70 bg-slate-950/40 p-4">
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-sky-300" />
                  <div>
                    <div className="text-sm font-semibold text-slate-100">
                      Upload PDF / PPT / PPTX
                    </div>
                    <div className="text-xs text-slate-500">
                      {isIdeathon
                        ? "Solution presentation"
                        : "Optional explanation file"}
                    </div>
                  </div>
                </div>

                <input
                  type="file"
                  accept=".pdf,.ppt,.pptx"
                  className="mt-4 block w-full cursor-pointer text-sm text-slate-300 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-sky-500/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-sky-300"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              {file && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-300">
                  Selected: {file.name}
                </div>
              )}

              <button
                type="button"
                onClick={submit}
                disabled={loading}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-soft-glow transition hover:brightness-110 disabled:opacity-60"
              >
                {loading
                  ? "Submitting..."
                  : isIdeathon
                  ? "Submit Solution"
                  : "Submit Project"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}