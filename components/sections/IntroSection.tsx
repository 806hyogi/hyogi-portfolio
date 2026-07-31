import Image from "next/image";

export default function IntroSection() {
    return (
        <section
            id="Intro"
            className="mx-auto max-w-5xl border-b border-slate-300 dark:border-slate-700 px-4 py-16">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
                <div className="relative h-70 w-47 overflow-hidden rounded-sm outline outline-1 outline-slate-300 dark:outline-slate-700">
                    <Image
                        src="/images/profile.jpg"
                        alt="최광혁 프로필 사진"
                        fill
                        className="object-cover"
                        sizes="160px"
                    />
                </div>

                <div className="flex flex-1 flex-col items-start gap-1">
                    <p className="text-base font-normal leading-6 text-zinc-900 dark:text-zinc-100">
                        최광혁 (Kwang hyeok Choi)
                    </p>

                    <p className="text-base font-medium leading-6 text-blue-400">
                        Front-end Developer
                    </p>


                    <div className="w-full max-w-[576px] pt-3">
                        <p className="text-sm font-bold leading-6 text-gray-700 dark:text-gray-200">
                            ‘프론트엔드, 사용자 문제해결에 대한 열정을 이어온 개발자’
                        </p>

                        <p className="text-xs font-normal leading-6 text-gray-700 dark:text-gray-300">
                            이루온 통신 솔루션 회사에서 SIP 시험 자동화 프로젝트의 프론트엔드 개발을 맡아 사용자가 복잡한 시험 절차를 쉽게 수행할 수 있도록 AT Manager 화면을 구현했습니다.
                            <br />
                            <br />
                            개발에 앞서 시험 절차와 사용 흐름을 분석했고, 사용자가 어느 단계에서 불편을 겪는지 확인하며 화면을 설계했습니다. 같은 기능이라도 화면 구성과 동선에 따라 사용성과 업무 효율이 달라진다는 점을 경험하면서, 사용자 관점에서 문제를 해결하는 프론트엔드 개발에 더욱 확신을 갖게 되었습니다.
                        </p>

                        <div className="mt-4 flex items-center gap-2">
                            <a
                                href="https://github.com/806hyogi"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-zinc-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-zinc-100 dark:hover:bg-slate-800"
                            >
                                <Image
                                    src="/icon/github.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                    className="size-4 dark:invert"
                                />
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}