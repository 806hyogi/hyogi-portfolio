"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const projects = [
    {
        title: "Playball | 15,000명 대규모 야구 티켓팅",
        organization: "KT클라우드",
        period: "26.03 - 26.04",
        summary: "재사용 가능한 컴포넌트 설계로 개발 효율을 개선했습니다.",
        points: [
            "티켓 예매, 좌석 선택, AI 경기 추천, VQA 기능 화면 개발",
            "사용자 이용 흐름을 분석해 예매 과정을 단계별로 설계",
            "기능별 컴포넌트를 공통 구조로 분리",
            "디렉터리 구조와 컴포넌트 관리 기준을 표준화해 팀원들이 동일한 방식으로 개발할 수 있는 환경 구축",
            "리엑트 기반의 재사용 가능한 컴포넌트를 구현하고 기획·디자이너와 화면 구성을 지속적으로 검토하며 사용성 개선",
            "프로젝트 대상 수상",
        ],
        stacks: [
            "Next.js",
            "React.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn",
            "Radix UI",
            "Zustand",
            "Github",
            "Jira",
            "Figma",
        ],
        images: [
            "/images/projects/playball-1.png",
            "/images/projects/playball-2.png",
            "/images/projects/playball-3.png",
            "/images/projects/playball-4.png",
            "/images/projects/playball-5.png",
            "/images/projects/playball-6.png",
            "/images/projects/playball-7.png",
            "/images/projects/playball-8.png",
            "/images/projects/playball-9.png",
            "/images/projects/playball-10.png",
            "/images/projects/playball-11.png",
            "/images/projects/playball-12.png",
            "/images/projects/playball-13.png",
            "/images/projects/playball-14.png",
        ],
    },
    {
        title: "Myway | 공공 데이터 API를 이용한 이벤트",
        organization: "KT클라우드",
        period: "25.12 - 26.01",
        summary: "이벤트 참여 과정을 개선해 사용자 이탈을 줄인 서비스 개선 경험을 했습니다.",
        points: [
            "사용자 참여 과정의 불편을 개선",
            "프로젝트 테스트 과정에서 이벤트 생성부터 참여까지 사용자 입장에서 이동 동선을 분석",
            "이벤트 상세 정보와 신청 기능을 하나의 화면으로 통합하고, 진행 상태를 단계별로 확인하는 UI 개발",
            "리엑트 컴포넌트 구조를 재설계해 중복 코드를 줄임",
            "Context API를 활용해 화면 간 데이터를 일관되게 관리",
            "REST API 연동 과정에서 비동기 처리와 예외 상황을 고려해 로딩 화면과 오류 메시지를 구현하고, 신청 완료 여부가 즉시 반영되도록 개선",
            "Node.js express 소켓 실시간 채팅 서버 개발 (socket.io)",
            "DynamoDB를 활용하여 빠른 데이터 저장과 7일간 메시지 JSON 압축 후 AWS S3 저장 기능 구현",
            "Perspective API를 활용한 채팅 비속어 검증 로직 구현",
        ],
        stacks: [
            "Next.js",
            "React.js",
            "Auth.js",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn",
            "Radix UI",
            "Zustand",
            "Github",
            "Socket.io",
            "Supabase",
            "PostgreSQL",
            "DynamoDB",
            "Amazon S3",
            "AWS EC2",
            "Node.js Express",
            "Fly.io",
            "Figma",
        ],
        images: [
            "/images/projects/myway-1.png",
            "/images/projects/myway-2.png",
            "/images/projects/myway-3.png",
            "/images/projects/myway-4.png",
            "/images/projects/myway-5.png",
            "/images/projects/myway-6.png",
        ],
    },
    {
        title: "SIP 시험 자동화 | 수작업으로 진행하는 반복 시험 자동화",
        organization: "이루온",
        period: "24.10 - 25.01",
        summary: "시험 자동화로 운영 효율을 높인 서비스 구현 능력",
        points: [
            "시험 운영 절차를 분석해 반복 입력과 불필요한 이동 구간 확인",
            "시험 생성부터 실행까지 하나의 화면에서 처리할 수 있도록 UI 구현",
            "Python 기반 백엔드와 REST API를 연동해 시험 정보 처리 및 API 명세를 기준으로 프론트엔드 기능 구현",
            "GitLab 기반 형상관리와 Linux 환경 테스트를 반복하며 기능 안정성 점검",
            "기존 5일 이상 걸리던 시험 기간을 1일 이내로 단축하여 시험 운영 절차 표준화에 기여",
        ],
        stacks: [
            "JavaScript",
            "HTML/CSS",
            "Python",
            "Flask",
            "Robot Framework",
            "GitLab",
            "Linux",
        ],
        images: [],
    },
];

const projectValues = projects.map((project) => project.title);

export default function ProjectSection() {
    const [openProjects, setOpenProjects] = useState<string[]>([]); // 프로젝트 아코디언 상태

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
        <section
            id="Project"
            className="scroll-mt-16 border-b border-slate-300 px-4 py-8 dark:border-slate-700"
        >
            <h2 className="text-base font-bold leading-6 tracking-widest text-blue-500 dark:text-blue-400">
                주요 프로젝트
            </h2>

            <Accordion type="multiple"
                value={openProjects}
                onValueChange={setOpenProjects}
                className="mt-6 flex flex-col gap-6"
            >
                {projects.map((project) => (
                    <AccordionItem
                        key={project.title}
                        value={project.title}
                        className="rounded-[10px] border border-border px-3 pb-4 dark:border-slate-700"
                    >
                        <AccordionTrigger className="min-h-12 items-center py-2.5 hover:no-underline cursor-pointer">
                            <div className="flex min-w-0 flex-1 flex-col items-start gap-1 pr-2 sm:flex-row sm:items-center sm:gap-4 sm:pr-3">
                                <h3 className="min-w-0 max-w-full break-words sm:truncate text-left text-base font-medium leading-5 text-black dark:text-zinc-100 sm:flex-1">
                                    {project.title}
                                </h3>

                                <p className="max-w-full text-left text-xs font-extralight leading-5 text-stone-500 dark:text-stone-400 sm:shrink-0 sm:text-right">
                                    {project.organization} · {project.period}
                                </p>
                            </div>
                        </AccordionTrigger>

                        <p className="min-h-10 text-base font-normal leading-5 text-neutral-600 dark:text-neutral-300">
                            {project.summary}
                        </p>

                        <AccordionContent className="pt-2.5">
                            <ul className="space-y-1 text-base font-light leading-5 text-neutral-600 dark:text-neutral-300">
                                {project.points.map((point) => (
                                    <li key={point}>· {point}</li>
                                ))}
                            </ul>

                            <div className="mt-4 flex flex-wrap gap-[5px]">
                                {project.stacks.map((stack) => (
                                    <span
                                        key={stack}
                                        className="rounded-[5px] ml-0.5 px-2.5 py-0.5 text-xs font-normal leading-5 text-neutral-500 outline outline-1 outline-stone-300 dark:text-neutral-300 dark:outline-slate-600"
                                    >
                                        {stack}
                                    </span>
                                ))}
                            </div>

                            <div className="my-4 h-0.5 w-full rounded-[5px] bg-neutral-200 dark:bg-slate-700" />

                            <div className="flex w-full flex-col gap-2.5">
                                {project.images.map((image, index) => (
                                    <Image
                                        key={image}
                                        src={image}
                                        alt={`${project.title} 화면 ${index + 1}`}
                                        width={706}
                                        height={351}
                                        loading="eager"
                                        className="h-auto w-full rounded-md object-contain"
                                    />
                                ))}
                            </div>

                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}