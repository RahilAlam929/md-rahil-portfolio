"use client";

import dynamic from "next/dynamic";
import TopNav from "@/components/top-nav";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import BuilderHubSuperUltra from "@/components/builder-hub-super-ultra";
import ChallengeSection from "@/components/challenge-section";
import WinnerShowcase from "@/components/winner-showcase";
import ResourcesSection from "@/components/resources-section";
import UpdatesSection from "@/components/updates-section";

import EventsSection from "@/components/events-section";
import ContactSection from "@/components/contact-section";
import CursorGlow from "@/components/cursor-glow";
import ParallaxOrbs from "@/components/parallax-orbs";
import VoiceAssistantPro from "@/components/voice-assistant-pro";

const RobotWelcome = dynamic(() => import("@/components/robot-welcome"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full animate-pulse rounded-3xl bg-slate-900/10" />
  ),
});

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-[#020202] text-white selection:bg-red-500/30">
      <ParallaxOrbs />
      <CursorGlow />
      <TopNav />

      <main className="mt-24 flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 md:gap-24">
        <section className="scroll-mt-24" id="home">
          <RobotWelcome />
          <VoiceAssistantPro />
        </section>

        <HeroSection />


        <div className="scroll-mt-24" id="about">
          <AboutSection />
        </div>

        <div className="scroll-mt-24" id="skills">
          <SkillsSection />
        </div>
        <BuilderHubSuperUltra />

        <div className="scroll-mt-24" id="projects">
          <ProjectsSection />
        </div>
     
        <div className="scroll-mt-24" id="challenge">
          <ChallengeSection />
          <WinnerShowcase />
        </div>

        <div className="scroll-mt-24" id="resources">
          <ResourcesSection />
          <div className="mt-10 grid gap-8 md:grid-cols-2"></div>
        </div>

        <div className="scroll-mt-24" id="updates">
  <UpdatesSection />
</div>

        <div className="scroll-mt-24" id="events">
          <EventsSection />
        </div>

        <div className="scroll-mt-24 mb-20" id="contact">
          <ContactSection />
        </div>
      </main>

      <footer className="flex w-full flex-col items-center gap-2 border-t border-white/5 py-10 opacity-50">
        <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-red-600">
          Sector-X // Terminal_End
        </p>
        <p className="font-mono text-[9px] text-slate-500">
          © 2026 RAHIL.DEV - ALL_SYSTEMS_OPERATIONAL
        </p>
      </footer>
    </div>
  );
}