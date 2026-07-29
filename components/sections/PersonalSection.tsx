import Image from "next/image";

export default function PersonalSection() {
    return (
        <section
            id="Personal"
            className="scroll-mt-16 border-b border-slate-300 px-4 py-8 dark:border-slate-700"
        >

            <h2 className="text-base font-bold leading-6 tracking-widest text-blue-500 dark:text-blue-400">
                경력 사항
            </h2>

            <div className="mt-6 flex flex-col items-start gap-3 border-l-2 border-blue-400 px-2.5 sm:flex-row sm:gap-4">
                <div className="flex w-full flex-col items-start pt-0.5 sm:w-32 sm:self-stretch sm:pb-20">
                    <p className="text-xs font-extralight leading-5 text-stone-500 dark:text-stone-400">
                        2024.07 - 2025.09
                    </p>
                </div>

                <div className="flex flex-col items-start gap-2 self-stretch">
                    <div>
                        <span className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                            이루온
                        </span>
                        <span className="text-base font-light leading-6 text-neutral-500 dark:text-neutral-400">
                            {" | 소프트웨어 개발자"}
                        </span>
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

                    <div className="flex flex-col items-start gap-1 self-stretch">
                        <p className="text-sm font-light leading-6 text-gray-700 dark:text-gray-300">
                            SIP 기본 호 시험 자동화 APP 신규 론칭
                            <br />
                            KT, U+ 고객사 IBCF 장비 MMLD 프로세스 이슈 및 운용 개선 C 담당자
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}