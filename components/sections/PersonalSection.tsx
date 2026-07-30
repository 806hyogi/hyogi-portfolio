import Image from "next/image";

import { SectionHeading } from "@/components/sections/SectionHeading";

export default function PersonalSection() {
    return (
        <section
            id="Personal"
            className="scroll-mt-16 border-b border-slate-300 px-4 py-10 dark:border-slate-700"
        >

            <SectionHeading>
                경력 사항
            </SectionHeading>

            <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:flex-row">
                <div className="flex flex-col gap-2">
                    <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                            <span className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
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

                    <div className="flex items-start gap-[5px]">
                        <Image
                            src="/images/skills/javascript.svg"
                            alt="JavaScript"
                            width={20}
                            height={20}
                            className="size-5"
                        />
                        <Image
                            src="/images/skills/c.svg"
                            alt="C"
                            width={20}
                            height={20}
                            className="size-5"
                        />
                        <Image
                            src="/images/skills/linux.svg"
                            alt="linux"
                            width={20}
                            height={20}
                            className="size-5"
                        />
                        <Image
                            src="/images/skills/gitlab.svg"
                            alt="gitlab"
                            width={20}
                            height={20}
                            className="size-5"
                        />
                        <Image
                            src="/images/skills/vscode.svg"
                            alt="vscode"
                            width={20}
                            height={20}
                            className="size-5"
                        />
                    </div>

                    <ul className="space-y-2 text-sm font-normal leading-6 text-neutral-600 dark:text-neutral-300">
                        <li className="flex gap-2">
                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-400 dark:bg-blue-300" />
                            <span>
                                SIP 기본 호 시험 자동화 APP 신규 론칭
                                <br />
                                KT, U+ 고객사 IBCF 장비 MMLD 프로세스 이슈 및 운용 개선 C 담당자
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
