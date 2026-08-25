import { SkillGroupCard } from "@/components/sections/SkillGroupCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollRevealSection } from "@/components/sections/ScrollRevealSection"

const skillGroups = [
    {
        title: "언어",
        skills: [
            { name: "TypeScript", icon: "/images/skills/typescript.svg" },
            { name: "JavaScript", icon: "/images/skills/javascript.svg" },
            { name: "HTML5", icon: "/images/skills/html5.svg" },
            { name: "CSS3", icon: "/images/skills/css3.svg" },
            { name: "C", icon: "/images/skills/c.svg" },
            { name: "Java", icon: "/images/skills/java.svg" },
        ],
    },
    {
        title: "프론트엔드",
        skills: [
            { name: "Next.js", icon: "/images/skills/nextjs.svg" },
            { name: "React", icon: "/images/skills/react.svg" },
        ],
    },
    {
        title: "백엔드",
        skills: [
            { name: "SpringBoot", icon: "/images/skills/springboot.svg" },
        ],
    },
    {
        title: "데이터베이스",
        skills: [
            { name: "MariaDB", icon: "/images/skills/maria.svg" },
            { name: "Supabase", icon: "/images/skills/supabase.svg" },
            { name: "MySQL", icon: "/images/skills/mysql.svg" },
            { name: "DynamoDB", icon: "/images/skills/dynamo.svg" },
        ],
    },
    {
        title: "기타",
        skills: [
            { name: "Git", icon: "/images/skills/git.svg" },
            { name: "Notion", icon: "/images/skills/notion.svg" },
            { name: "Figma", icon: "/images/skills/figma.svg" },
            { name: "Jira", icon: "/images/skills/jira.svg" },
            { name: "Confluence", icon: "/images/skills/confluence.svg" },
            { name: "VS Code", icon: "/images/skills/vscode.svg" },
        ],
    },
];

export default function SkillSection() {

    const [languageGroup, frontendGroup, backendGroup, databaseGroup, etcGroup] = skillGroups;

    return (
        <ScrollRevealSection
            id="Skill"
            delay={360}
            className="scroll-mt-16 border-b border-slate-300 px-4 py-10 dark:border-slate-700"
        >

            <SectionHeading>
                기술 스택
            </SectionHeading>

            <div className="mt-6 flex flex-col gap-6">
                <SkillGroupCard group={languageGroup} />

                <div className="grid gap-6 md:grid-cols-2">
                    <SkillGroupCard group={frontendGroup} />
                    <SkillGroupCard group={backendGroup} />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <SkillGroupCard group={databaseGroup} />
                    <SkillGroupCard group={etcGroup} />
                </div>
            </div>
        </ScrollRevealSection>
    );
}
