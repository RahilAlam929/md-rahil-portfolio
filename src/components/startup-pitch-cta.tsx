"use client";

export default function StartupPitchCTA({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs tracking-[0.25em] text-slate-500">
        CURRENTLY BUILDING AN AI STARTUP
      </p>

      <button
         type="button"
  onClick={onClick}
  className="group relative cursor-pointer"
        aria-label="View Startup Pitch"
      >
        {/* outer gradient border */}
        <span className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-sky-500/70 via-blue-500/60 to-fuchsia-500/70 opacity-70 blur-[0.5px] transition group-hover:opacity-100" />

        {/* glow */}
        <span className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-sky-500/20 via-blue-500/10 to-fuchsia-500/20 opacity-0 blur-2xl transition group-hover:opacity-100" />

        {/* button body */}
        <span className="relative flex items-center gap-3 rounded-2xl border border-slate-700/60 bg-slate-950/55 px-7 py-3 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-[-2px] group-hover:border-slate-600/70">
          {/* icon */}
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/25 via-blue-500/20 to-fuchsia-500/25 ring-1 ring-slate-700/60">
            
          </span>

          {/* text */}
          <span className="flex flex-col items-start leading-none">
            <span className="text-sm font-semibold text-slate-100 group-hover:text-sky-300 transition">
              View Startup Pitch
            </span>
            <span className="mt-1 text-xs text-slate-400">
              3 slides · 30 seconds
            </span>
          </span>

          {/* arrow */}
          <span className="ml-2 text-slate-300/80 transition group-hover:translate-x-1 group-hover:text-slate-100">
            →
          </span>
        </span>
      </button>
    </div>
  );
}