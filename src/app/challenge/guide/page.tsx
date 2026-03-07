"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

export default function ChallengeGuidePage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "hackathon";
  const isIdeathon = type === "ideathon";

  const steps = isIdeathon
    ? [
        "Understand the user data ownership problem",
        "Identify why current systems fail",
        "Design a permission-based user-controlled data system",
        "Explain privacy, security, and transparency model",
        "Present business impact and scalability",
        "Submit PPT/PDF with your idea",
      ]
    : [
        "Understand the user problem",
        "Plan the MVP",
        "Design a clean UI",
        "Build the core product",
        "Add optional upgrades",
        "Deploy and submit your project",
      ];

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-12 text-white">
      <div className="rounded-3xl border border-slate-800/70 bg-slate-950/50 p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Step Guide
            </div>
            <h1 className="mt-2 text-3xl font-semibold text-fuchsia-300">
              {isIdeathon ? "How to prepare your ideathon solution" : "How to build your hackathon project"}
            </h1>
          </div>

          <Link
            href="/#challenge"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 text-slate-300 transition hover:border-fuchsia-400 hover:text-fuchsia-300"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Link>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-2xl border border-slate-800/70 bg-slate-950/40 p-4 text-sm text-slate-300"
            >
              <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 text-white">
                {index + 1}
              </span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}