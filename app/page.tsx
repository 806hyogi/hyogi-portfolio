import IntroSection from "@/components/sections/IntroSection";
import CoreSection from "@/components/sections/CoreSection";
import PersonalSection from "@/components/sections/PersonalSection";
import SkillSection from "@/components/sections/SkillSection";
import ProjectSection from "@/components/sections/ProjectSection";
import EducationSection from "@/components/sections/EducationSection";
import ContactSection from "@/components/sections/ContactSection";
import { SectionNavigation } from "@/components/layout/SectionNavigation";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <main className="min-h-screen">
        <SectionNavigation />
        <IntroSection />
        <CoreSection />
        <PersonalSection />
        <SkillSection />
        <ProjectSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  );
}
