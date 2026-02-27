"use client";

import { motion } from "framer-motion";

type SkillGroup = {
  label: string;
  skills: { name: string; level: number }[];
};

const groups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 86 },
      { name: "MongoDB", level: 84 },
    ],
  },
  {
    label: "AI & Robotics",
    skills: [
      { name: "C++", level: 90 },
      { name: "Machine Learning", level: 84 },
      { name: "Robotics Systems", level: 82 },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="section-shell relative overflow-hidden px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-fuchsia-500/10 opacity-70 blur-3xl" />

      <div className="relative space-y-6">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
              Skills Radar
            </h2>
            <p className="mt-2 text-xl font-semibold text-slate-50 md:text-2xl">
              A balanced stack across frontend, backend, and robotics.
            </p>
          </div>
          <p className="max-w-md text-xs text-slate-400 md:text-[13px]">
            Visual meters represent my current comfort and experience — they
            evolve as I work on new projects and explore emerging tools.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              className="rounded-2xl border border-slate-700/80 bg-slate-950/80 p-4"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.6,
                delay: groupIndex * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-sky-300">
                {group.label}
              </p>

              <div className="mt-4 space-y-3.5">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>{skill.name}</span>
                      <span className="font-mono text-[11px] text-sky-300/85">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-meter h-2.5">
                      <motion.div
                        className="skill-meter-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


