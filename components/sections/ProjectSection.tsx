"use client";

import { projects } from "@/components/sections/project-data";
import { BulletList } from "@/components/sections/BulletList";
import { FullscreenImage } from "@/components/sections/FullscreenImage";
import { ScrollRevealSection } from "@/components/sections/ScrollRevealSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/components/analytics/track";

const projectValues = projects.map((project) => project.title);

export default function ProjectSection() {
    const [openProjects, setOpenProjects] = useState<string[]>([]); // 프로젝트 아코디언 상태

    const handleProjectChange = (nextValues: string[]) => {
        for (const project of projects) {
            const wasOpen = openProjects.includes(project.title);
            const isOpen = nextValues.includes(project.title);

            // 닫혀 있던 프로젝트를 열었을때만 이벤트를 기록
            if (!wasOpen && isOpen) {
                trackEvent("project_expand", {
                    projectSlug: project.slug,
                    placement: "project_list",
                });
            }
        }

        setOpenProjects(nextValues);
    };

    /* 프로젝트 열리는 이벤트 */
    useEffect(() => {
        const handleOpenAllProjects = () => {
            setOpenProjects(projectValues);
        };

        const handleCloseAllProjects = () => {
            setOpenProjects([]);
        }

        window.addEventListener("portfolio:open-all-projects", handleOpenAllProjects);
        window.addEventListener("portfolio:close-all-projects", handleCloseAllProjects);

        return () => {
            window.removeEventListener("portfolio:open-all-projects", handleOpenAllProjects);
            window.removeEventListener("portfolio:close-all-projects", handleCloseAllProjects);
        };
    }, []);

    return (
        <ScrollRevealSection
            id="Project"
            delay={480}
            className="scroll-mt-16 border-b border-slate-300 px-4 py-10 dark:border-slate-700"
        >
            <SectionHeading>
                주요 프로젝트
            </SectionHeading>

            <Accordion
                type="multiple"
                value={openProjects}
                onValueChange={handleProjectChange}
                className="mt-6 flex flex-col gap-4"
            >
                {projects.map((project) => (
                    <AccordionItem
                        data-project-slug={project.slug}
                        key={project.title}
                        value={project.title}
                        className="rounded-lg border border-slate-200 bg-white px-4 dark:border-slate-700 dark:bg-slate-900"
                    >
                        <AccordionTrigger className="min-h-12 items-center py-2.5 hover:no-underline cursor-pointer">
                            <div className="flex min-w-0 flex-1 flex-col items-start gap-1 pr-2 sm:flex-row sm:items-center sm:gap-4 sm:pr-3">
                                <h3 className="min-w-0 max-w-full break-words sm:truncate text-left text-lg font-semibold leading-7 text-black dark:text-zinc-100 sm:flex-1">
                                    {project.title}
                                </h3>

                                <p className="max-w-full text-left text-xs font-extralight leading-5 text-stone-500 dark:text-stone-400 sm:shrink-0 sm:text-right">
                                    {project.organization} · {project.period}
                                </p>
                            </div>
                        </AccordionTrigger>

                        <p className="min-h-10 text-sm font-normal leading-6 text-neutral-600 dark:text-neutral-300">
                            {project.summary}
                        </p>

                        <AccordionContent className="pt-2.5">
                            <BulletList items={project.points} />

                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.stacks.map((stack) => (
                                    <span
                                        key={stack}
                                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium leading-5 text-neutral-600 dark:border-slate-700 dark:bg-slate-800 dark:text-neutral-300"
                                    >
                                        {stack}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-5 flex justify-end">
                                <Link
                                    href={`/project/${project.slug}`}
                                    className="group inline-flex w-full items-center justify-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:border-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-blue-900 dark:text-blue-400 dark:hover:border-blue-800 sm:w-auto"
                                    aria-label={`${project.title} 자세히 보기`}
                                >
                                    자세히 보기

                                    <ArrowRight
                                        aria-hidden="true"
                                        className="size-4 transition-transform group-hover:translate-x-0.5"
                                    />
                                </Link>
                            </div>

                            <div className="my-4 h-0.5 w-full rounded-[5px] bg-neutral-200 dark:bg-slate-700" />

                            <div className="flex w-full flex-col gap-2.5">
                                {project.images.map((image, index) => (
                                    <FullscreenImage
                                        key={image}
                                        src={image}
                                        alt={`${project.title} 화면 ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </ScrollRevealSection>
    );
}
