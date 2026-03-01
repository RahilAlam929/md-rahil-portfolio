import TopNav from "@/components/top-nav";

import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import SkillsSection from "@/components/skills-section";
import EventsSection from "@/components/events-section";
import UpdatesSection from "@/components/updates-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center px-4 pb-16 pt-6 sm:px-6 md:px-8 lg:px-10">
      <TopNav />

      <main className="mt-20 flex w-full max-w-6xl flex-col gap-10 md:gap-14 lg:gap-16">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <EventsSection />
        <UpdatesSection />
        <ContactSection />
      </main>
    </div>
  );
}