import Image from "next/image";

import { BulletList } from "@/components/sections/BulletList";
import { ScrollRevealSection } from "@/components/sections/ScrollRevealSection";
import { SectionHeading } from "@/components/sections/SectionHeading";

export default function PersonalSection() {
    return (
        <ScrollRevealSection
            id="Personal"
            delay={240}
            className="scroll-mt-16 border-b border-slate-300 px-4 py-10 dark:border-slate-700"
        >

            <SectionHeading>
                경력 사항
            </SectionHeading>

            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:flex-row">
                <div className="flex flex-col gap-2.5">
                    <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                            <span className="text-lg font-semibold leading-7 text-zinc-900 dark:text-zinc-100">
                                이루온
                            </span>
                            <span className="text-base font-light leading-6 text-neutral-500 dark:text-neutral-400">
                                {" | 소프트웨어 개발자"}
                            </span>
                        </div>

                        <p className="shrink-0 text-xs font-extralight leading-5 text-stone-500 dark:text-stone-400">
                            2024.07 - 2025.09
                        </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                        <Image
                            src="/images/skills/javascript.svg"
                            alt="JavaScript"
                            width={24}
                            height={24}
                            className="size-6"
                        />
                        <Image
                            src="/images/skills/c.svg"
                            alt="C"
                            width={24}
                            height={24}
                            className="size-6"
                        />
                        <Image
                            src="/images/skills/linux.svg"
                            alt="linux"
                            width={24}
                            height={24}
                            className="size-6"
                        />
                        <Image
                            src="/images/skills/gitlab.svg"
                            alt="gitlab"
                            width={24}
                            height={24}
                            className="size-6"
                        />
                        <Image
                            src="/images/skills/vscode.svg"
                            alt="vscode"
                            width={24}
                            height={24}
                            className="size-6"
                        />
                    </div>

                    <BulletList
                        items={[
                            "JavaScript·HTML·CSS 기반 SIP 시험 자동화 UI 개발",
                            "Flask REST API 연동 및 요청·응답 데이터 검증",
                            "시험 생성부터 실행까지의 절차를 화면 단위로 통합해 반복 작업 축소",
                            "GitLab 형상 관리 및 Linux 환경 테스트",
                            "C 기반 IBCF 장비 MMLD 프로세스 유지보수 및 KT·LG U+ 운용 개선 대응"
                        ]}
                        className="mt-1.5"
                    />
                </div>
            </div>
        </ScrollRevealSection>
    );
}
