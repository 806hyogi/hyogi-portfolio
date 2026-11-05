import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUp, ArrowUpRight, Code2, Expand, ExternalLink, Globe, Trophy } from "lucide-react";

import { FullscreenImage } from "@/components/sections/FullscreenImage";
import { projects } from "@/components/sections/project-data";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

type ProjectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

const sections = [
    { id: "context", label: "문제 상황" },
    { id: "contribution", label: "역할과 기여" },
    { id: "decisions", label: "기술적 의사결정" },
    { id: "problem-solving", label: "문제 해결" },
    { id: "results", label: "개선 결과" },
    { id: "links", label: "관련 링크" },
];

const panelClassName = "rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900";
const bodyClassName = "text-sm leading-7 text-neutral-600 dark:text-neutral-300";

function DetailSection({
    id, number, title, children,
}: {
    id: string;
    number: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 border-b border-slate-200 py-9 last:border-b-0 dark:border-slate-700">
            <div id={`${id}-heading`} className="mb-5 flex items-baseline gap-3">
                <span className="text-xs text-neutral-500 dark:text-neutral-400">{number}</span>
                <SectionHeading>{title}</SectionHeading>
            </div>
            {children}
        </section>
    );
}

export default async function ProjectPage({
    params,
}: ProjectPageProps) {
    const { slug } = await params;
    const project = projects.find((item) => item.slug === slug);

    if (!project) notFound();

    const [name, subtitle] = project.title.split(" | ");
    const image = project.images[0];
    const isPlayball = slug === "playball";

    return (
        <article id="project-top" data-project-slug={project.slug} className="mx-auto min-h-screen w-full px-4 pb-12 pt-8 sm:px-6">
            <Link href="/#Project" className="inline-flex min-h-9 items-center gap-2 rounded-sm text-xs text-neutral-600 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-neutral-300 dark:hover:text-blue-400">
                <ArrowLeft aria-hidden="true" className="size-4" />
                프로젝트 목록
            </Link>

            <header className="pb-8 pt-6">
                <p className="mb-3 text-xs font-bold tracking-[0.18em] text-blue-500 dark:text-blue-400">PROJECT DETAIL</p>
                <h1 className="break-words text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">{name}</h1>
                <p className="mt-2 text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-300">{subtitle}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>{project.organization}</span><span aria-hidden="true">·</span><span>{project.period}</span>
                    {isPlayball && (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-1 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                            <Trophy aria-hidden="true" className="size-3.5" /> 프로젝트 대상 수상
                        </span>
                    )}
                </div>
                <p className={`mt-5 ${bodyClassName}`}>{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                    <Button
                        asChild={!!project.siteUrl}
                        disabled={!project.siteUrl}
                        className="h-9 rounded-md bg-blue-600 px-3 text-xs text-white disabled:opacity-60 dark:bg-blue-400 dark:text-slate-950">
                        {project.siteUrl ? (
                            <a
                                data-analytics-event="project_site_click"
                                data-analytics-placement="header"
                                href={project.siteUrl}
                                target="_blank"
                                rel="noopener noreferrer">
                                <ExternalLink aria-hidden="true" /> 배포 사이트
                            </a>
                        ) : (
                            <>
                                <ExternalLink aria-hidden="true" /> 배포 사이트
                            </>
                        )}
                    </Button>
                    <Button
                        asChild={!!project.githubUrl}
                        disabled={!project.githubUrl}
                        variant="outline"
                        className="h-9 rounded-md px-3 text-xs">
                        {project.githubUrl ? (
                            <a
                                data-analytics-event="project_github_click"
                                data-analytics-placement="header"
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Code2 aria-hidden="true" /> GitHub
                            </a>
                        ) : (
                            <>
                                <Code2 aria-hidden="true" /> GitHub
                            </>
                        )}
                    </Button>
                </div>
                <ul className="mt-5 flex list-none flex-wrap gap-2" aria-label="사용 기술">
                    {project.stacks.map((stack) => <li key={stack} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs leading-5 text-neutral-600 dark:border-slate-700 dark:bg-slate-800 dark:text-neutral-300">{stack}</li>)}
                </ul>
            </header>

            {image && (
                <figure>
                    <div className={`${panelClassName} overflow-hidden`}>
                        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3 text-xs text-neutral-500 dark:border-slate-700 dark:text-neutral-400">
                            <span>주요 화면{isPlayball ? " · 선호 구역 선택" : ""}</span>
                            <span className="inline-flex items-center gap-1.5"><Expand aria-hidden="true" className="size-3.5" /> 이미지를 눌러 확대</span>
                        </figcaption>
                        <FullscreenImage src={image} alt={`${name} ${isPlayball ? "선호 구역 선택" : "주요"} 화면`} />
                    </div>
                </figure>
            )}

            <nav aria-label="프로젝트 상세 목차" className="mb-3 mt-7 flex flex-wrap gap-x-5 gap-y-1 border-y border-slate-200 py-3 dark:border-slate-700">
                {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="inline-flex min-h-9 items-center rounded-sm text-xs text-neutral-600 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-neutral-300 dark:hover:text-blue-400">{section.label}</a>)}
            </nav>

            <DetailSection id="context" number="01" title="문제 상황">
                <h3 className="mb-2 text-base font-semibold">{project.context.title}</h3>
                <p className={bodyClassName}>{project.context.description}</p>
                <div className="mt-5 border-l-2 border-blue-500 pl-4 dark:border-blue-400">
                    <p className="mb-1 text-xs text-blue-600 dark:text-blue-400">해결 목표</p>
                    <p className="text-sm leading-7">{project.context.goal}</p>
                </div>
            </DetailSection>

            <DetailSection id="contribution" number="02" title="담당 역할과 기여도">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold">화면 개발 및 사용자 흐름 개선</h3>
                </div>
                <ul className="divide-y divide-slate-200 border-t border-slate-200 dark:divide-slate-700 dark:border-slate-700">
                    {project.points.map((point, index) => <li key={point} className="flex items-start gap-3 py-3 text-sm leading-6 text-neutral-600 dark:text-neutral-300"><span aria-hidden="true" className="shrink-0 pt-0.5 text-xs tabular-nums text-neutral-400 dark:text-neutral-500">{String(index + 1).padStart(2, "0")}</span><span>{point}</span></li>)}
                </ul>
            </DetailSection>

            <DetailSection id="decisions" number="03" title="기술적 의사결정">
                <Accordion type="multiple" defaultValue={["components"]} className="gap-3">
                    {project.decisions.map((decision) => (
                        <AccordionItem key={decision.id} value={decision.id} className={`${panelClassName} px-4 not-last:border-b`}>
                            <AccordionTrigger className="cursor-pointer items-center gap-3 py-4 hover:no-underline">
                                <span className="flex min-w-0 flex-wrap items-center gap-2 text-sm"><span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-xs font-normal text-neutral-600 dark:border-slate-700 dark:bg-slate-800 dark:text-neutral-300">{decision.technology}</span><span>{decision.title}</span></span>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-2 border-t border-slate-200 pt-3 text-xs leading-6 sm:grid-cols-[80px_1fr] dark:border-slate-700">
                                    <dt className="font-medium">고려한 대안</dt><dd className="text-neutral-600 dark:text-neutral-300">{decision.alternative}</dd>
                                    <dt className="font-medium">선택한 이유</dt><dd className="text-neutral-600 dark:text-neutral-300">{decision.reason}</dd>
                                    <dt className="font-medium">고려할 점</dt><dd className="text-neutral-600 dark:text-neutral-300">{decision.tradeoff}</dd>
                                </dl>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </DetailSection>

            <DetailSection id="problem-solving" number="04" title="발생한 문제와 해결 과정">
                <div className={`${panelClassName} p-5`}>
                    <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">문제 해결 사례</p>
                    <h3 className="mb-2 text-base font-semibold">{project.problemSolving.title}</h3>
                    <p className={bodyClassName}>{project.problemSolving.description}</p>
                    <ol className="mt-5 grid gap-5 sm:grid-cols-3">
                        {project.problemSolving.steps.map((step) => (
                            <li
                                key={step.label}
                                className="border-t-2 border-slate-200 pt-3 dark:border-slate-700"
                            >
                                <p className="mb-2 text-xs text-blue-600 dark:text-blue-400">
                                    {step.label}
                                </p>
                                <p className="text-xs leading-6 text-neutral-600 dark:text-neutral-300">
                                    {step.description}
                                </p>
                            </li>
                        ))}
                    </ol>
                </div>
            </DetailSection>

            <DetailSection id="results" number="05" title="개선 결과 및 수치">
                {project.results.layout === "summary" ? (
                    <div className={`${panelClassName} p-5`}>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {project.results.label}
                        </p>
                        <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                            {project.results.before}
                            <span className="font-normal text-neutral-400"> → </span>
                            {project.results.after}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                            {project.results.description}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-3">
                        {project.results.metrics.map((metric) => (
                            <div key={metric.label} className={`${panelClassName} p-4`}>
                                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                    {metric.label}
                                </p>
                                <p className="my-2 text-3xl font-bold tracking-tight tabular-nums">
                                    {metric.before}
                                    <span className="text-base font-normal text-neutral-400">
                                        {" → "}
                                    </span>
                                    {metric.after}
                                    <span className="text-sm font-normal">
                                        {" "}{metric.unit}
                                    </span>
                                </p>
                                <p className="text-xs text-blue-600 dark:text-blue-400">
                                    {metric.change}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {project.results.note && (
                    <p className="mt-3 rounded-md bg-slate-50 px-4 py-3 text-xs leading-6 text-neutral-600 dark:bg-slate-800 dark:text-neutral-300">
                        {project.results.note}
                    </p>
                )}
            </DetailSection>

            <DetailSection id="links" number="06" title="GitHub · 배포 링크">
                <div className="grid gap-3 sm:grid-cols-2" aria-describedby="resource-note">
                    {[{ label: "GitHub 저장소", description: "소스 코드와 구현 내용 살펴보기", Icon: Code2, url: project.githubUrl, eventName: "project_github_click", }, { label: "배포 사이트", description: "서비스 직접 사용해 보기", Icon: Globe, url: project.siteUrl, eventName: "project_site_click" }]
                        .map(({ label, description, Icon, url, eventName }) => {
                            const content = (
                                <>
                                    <Icon aria-hidden="true" className="size-5 shrink-0" />
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-sm font-semibold">
                                            {label}
                                        </span>
                                        <span className="mt-1 block text-xs font-normal leading-5 text-neutral-600 dark:text-neutral-300">
                                            {description}
                                        </span>
                                    </span>
                                    <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                                </>
                            );

                            return (
                                <Button
                                    key={label}
                                    asChild={!!url}
                                    disabled={!url}
                                    variant="outline"
                                    className="h-auto min-w-0 justify-start gap-3 whitespace-normal rounded-lg border-slate-200 bg-white p-4 text-left disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900"
                                >
                                    {url ? (
                                        <a href={url} target="_blank" rel="noopener noreferrer" data-analytics-event={eventName} data-analytics-placement="related_links">
                                            {content}
                                        </a>
                                    ) : content}
                                </Button>
                            );
                        })}
                </div>
            </DetailSection>

            <div className="flex justify-center pt-7"><a href="#project-top" className="inline-flex min-h-10 items-center gap-2 rounded-sm text-xs text-neutral-600 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 dark:text-neutral-300 dark:hover:text-blue-400"><ArrowUp aria-hidden="true" className="size-4" /> 페이지 맨 위로</a></div>
        </article>
    );
}
