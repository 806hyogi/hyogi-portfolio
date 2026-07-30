import { Award } from "lucide-react";

const educationItems = [
    {
        title: "TECH UP 부트캠프",
        organization: "KT 클라우드",
        description: "1기 프론트엔드 과정",
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
        title: "컴퓨터공학 학사",
        organization: "선문대학교",
        description: "컴퓨터공학 전공",
        period: "2020.03 - 2024.02",
        active: false,
        awards: [],
    },
    {
        title: "웹 풀스택 SW 몰입형 부트캠프",
        organization: "비트교육센터",
        description: "웹 풀스택 (예비자+정규) 과정",
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
        <section
            id="Education"
            className="scroll-mt-16 border-b border-slate-300 px-4 py-8 dark:border-slate-700"
        >
            <h2 className="text-base font-bold leading-6 tracking-widest text-blue-500 dark:text-blue-400">
                교육 및 수상
            </h2>

            <div className="mt-6 flex flex-col gap-3.5">
                {educationItems.map((item) => (
                    <article key={item.title} className="flex flex-col gap-2.5">
                        <div
                            className={`flex flex-col gap-1 border-l-2 pl-2.5 sm:flex-row sm:justify-between sm:gap-4 ${item.active
                                ? "border-blue-400"
                                : "border-neutral-200 dark:border-slate-700"
                                }`}
                        >
                            <div className="min-w-0">
                                <h3 className="text-base leading-6 text-zinc-900 dark:text-zinc-100">
                                    <span className={item.active ? "font-normal" : "font-semibold"}>
                                        {item.title}
                                    </span>
                                    <span className="font-light"> | {item.organization}</span>
                                </h3>
                                <p className="text-sm font-extralight leading-5 text-gray-700 dark:text-neutral-300">
                                    {item.description}
                                </p>
                            </div>

                            <p className="shrink-0 text-xs font-extralight leading-5 text-stone-500 dark:text-stone-400 sm:text-right">
                                {item.period}
                            </p>
                        </div>

                        {item.awards.length > 0 && (
                            <div className="flex flex-col gap-1">
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
        </section>
    );
}
