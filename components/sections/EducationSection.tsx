import { Award } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { ScrollRevealSection } from "@/components/sections/ScrollRevealSection"

const academicItems = [
    {
        title: "선문대학교",
        organization: "컴퓨터공학과",
        description: "소프트웨어 개발, 자료구조, 데이터베이스, 웹 프로그래밍 중심 학습",
        period: "2020.03 - 2024.02",
    },
];

const educationItems = [
    {
        title: "TECH UP 부트캠프",
        organization: "KT 클라우드",
        description: "프론트엔드 실무 역량 강화를 위한 프로젝트 중심 교육 과정",
        period: "2025.09 - 2026.04",
        active: true,
        awards: [
            {
                title: "TECH UP 1기 실무 통합 프로젝트 대상",
                organization: "KT 클라우드",
                date: "2026.04",
            },
        ],
    },
    {
        title: "대학생 SW 몰입형 부트캠프",
        organization: "비트교육센터",
        description: "대학생 개발자 대상 웹 풀스택 교육 과정",
        period: "2023.06 - 2023.12",
        active: false,
        awards: [
            {
                title: "몰입형 SW 정규 교육과정 산출물 경진대회 대상",
                organization: "선문대학교",
                date: "2023.12",
            },
            {
                title: "창의 융합형 인재 페스티벌 대상",
                organization: "한국정보통신보안윤리학회",
                date: "2023.11",
            },
        ],
    },
];

export default function EducationSection() {
    return (
        <ScrollRevealSection
            id="Education"
            delay={600}
            className="scroll-mt-16 border-b border-slate-300 px-4 py-10 dark:border-slate-700"
        >
            <SectionHeading>
                학력 및 교육
            </SectionHeading>

            <div className="mt-6 flex flex-col gap-4">
                {academicItems.map((item) => (
                    <article
                        key={item.title}
                        className="p-4 0"
                    >
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-4">
                            <div className="min-w-0">
                                <h4 className="flex flex-wrap items-center gap-2 text-base leading-6 text-zinc-900 dark:text-zinc-100">
                                    <span className="font-semibold">{item.title}</span>
                                    <span className="font-light"> | {item.organization}</span>
                                </h4>

                                <p className="mt-1 text-sm font-extralight leading-5 text-gray-700 dark:text-neutral-300">
                                    {item.description}
                                </p>
                            </div>

                            <p className="shrink-0 text-xs font-extralight leading-5 text-stone-500 dark:text-stone-400 sm:text-right">
                                {item.period}
                            </p>
                        </div>
                    </article>
                ))}

                <div className="my-1 h-px bg-slate-200 dark:bg-slate-800" />

                {educationItems.map((item) => (
                    <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                        <div
                            className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-4"
                        >
                            <div className="min-w-0">
                                <h3 className="flex flex-wrap items-center gap-2 text-base leading-6 text-zinc-900 dark:text-zinc-100">
                                    <span className="font-semibold">
                                        {item.title}
                                    </span>
                                    <span className="font-light"> | {item.organization}</span>
                                    {item.active ? (
                                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium leading-5 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
                                            최신
                                        </span>
                                    ) : null}
                                </h3>
                                <p className="mt-1 text-sm font-extralight leading-5 text-gray-700 dark:text-neutral-300">
                                    {item.description}
                                </p>
                            </div>

                            <p className="shrink-0 text-xs font-extralight leading-5 text-stone-500 dark:text-stone-400 sm:text-right">
                                {item.period}
                            </p>
                        </div>

                        {item.awards.length > 0 && (
                            <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                                {item.awards.map((award) => (
                                    <div
                                        key={award.title}
                                        className="flex flex-col gap-1 pl-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                                    >
                                        <div className="flex min-w-0 items-start gap-[5px]">
                                            <span className="flex size-6 shrink-0 items-center justify-center">
                                                <Award
                                                    aria-hidden="true"
                                                    className="size-5 text-amber-500"
                                                    strokeWidth={1.5}
                                                />
                                            </span>
                                            <p className="text-sm font-normal leading-6 text-zinc-900 dark:text-zinc-100">
                                                {award.title}
                                            </p>
                                        </div>

                                        <p className="shrink-0 pl-[29px] text-xs font-extralight leading-5 text-zinc-800 dark:text-neutral-300 sm:pl-0 sm:text-right">
                                            {award.organization} | {award.date}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </ScrollRevealSection>
    );
}
