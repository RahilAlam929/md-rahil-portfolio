"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

export default function ChallengeProblemPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "hackathon";

  const isIdeathon = type === "ideathon";

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-12 text-white">
      <div className="rounded-3xl border border-slate-800/70 bg-slate-950/50 p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Problem Statement
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-sky-300">
              {isIdeathon ? "Personal Data Ownership" : "Developer Progress Tracker"}
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

        {isIdeathon ? (
          <div className="space-y-4 text-sm leading-7 text-slate-300">
            <p>
              Users generate massive amounts of personal data online, but they do not
              truly own or control it.
            </p>
            <p>
              Companies collect, analyze, and monetize user data without giving users
              clear control, visibility, or rewards.
            </p>
            <p>
              Design a system where users own their data, control access, and benefit
              from transparent permission-based sharing.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-sm leading-7 text-slate-300">
            <p>
              Many students and beginner developers learn from courses, tutorials, and
              projects, but they do not have a structured way to measure real progress.
            </p>
            <p>
              Build a product that helps developers track skills, projects, GitHub activity,
              and job-readiness in one place.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}