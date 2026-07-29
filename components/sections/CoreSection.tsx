import Image from "next/image";

const coreItems = [
    {
        title: "협업을 통한 문제 해결",
        image: "/images/competence-cooperation.svg",
        description: [
            "다양한 직군과 적극적으로 소통하며 기술적 문제를 조율하고, 실제 서비스로 완성합니다.",
            "API 연동 규격 문서화 및 오류 해결",
            "비동기 처리 및 예외 UI 구현",
            "시험 자동화로 운영 효율 5배 이상 향상",
            "문제를 명확하게 공유하고 해결 방향을 함께 만들어 결과로 연결합니다."
        ],
    },
    {
        title: "재사용 가능한 컴포넌트 설계",
        image: "/images/competence-component.svg",
        description: [
            "반복되는 UI와 기능을 공통 컴포넌트로 분리하고, 일관된 개발 구조를 설계해 효율을 높입니다.",
            "React 기반 공통 컴포넌트 설계",
            "컴포넌트 관리 기준 표준화",
            "중복 코드 및 구현 편차 최소화",
            "기능 구현뿐만 아니라 확장과 유지보수까지 고려해 코드를 설계합니다.",
        ],
    },
    {
        title: "사용자 중심 UI/UX 설계",
        image: "/images/competence-uiux.svg",
        description: [
            "사용자의 이용 흐름과 불편 요소를 먼저 분석하고, 복잡한 기능을 쉽고 직관적인 화면으로 구현합니다.",
            "SIP 시험 절차 분석 및 화면 통합",
            "이벤트 참여 동선 간소화 및 티켓 예매 단계별 설계 개선을 통해 사용자가 고민하지 않고 자연스럽게 이용할 수 있는 화면을 만듭니다.",
        ],
    },
];

export default function CoreSection() {
    return (
        <section
            id="Core"
            className="scroll-mt-16 border-b border-slate-300 px-4 py-8 dark:border-slate-700"
        >
            <h2 className="text-base font-bold leading-6 tracking-widest text-blue-500 dark:text-blue-400">
                핵심 역량
            </h2>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
                {coreItems.map((item) => (
                    <article
                        key={item.title}
                        className="overflow-hidden rounded-lg bg-white dark:bg-slate-900"
                    >
                        <div className="relative h-56 bg-stone-50 dark:bg-slate-800">
                            <Image
                                src={item.image}
                                alt={`${item.title} 이미지`}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 245px, calc(100vw - 64px)"
                            />
                        </div>

                        <div className="px-2.5 py-4">
                            <h3 className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                                {item.title}
                            </h3>

                            <div className="mt-2 space-y-1 text-xs font-light leading-5 text-neutral-500 dark:text-neutral-300">
                                {item.description.map((line) => (
                                    <p key={line}>{line}</p>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
