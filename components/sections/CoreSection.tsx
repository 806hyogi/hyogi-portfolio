import Image from "next/image";

import { BulletList } from "@/components/sections/BulletList";
import { SectionHeading } from "@/components/sections/SectionHeading";

const coreItems = [
    {
        title: "협업을 통한 문제 해결",
        image: "/images/competence-cooperation.png",
        description: [
            "기획, 디자인, 백엔드와 요구사항을 조율하며 화면 구현 방향을 정리합니다.",
            "API 명세와 사용자 흐름을 기준으로 로딩, 오류, 빈 상태를 함께 고려해 구현합니다.",
            "작업 과정에서 발견한 문제를 명확히 공유하고 해결 가능한 단위로 나누어 개선합니다.",
        ],
    },
    {
        title: "재사용 가능한 컴포넌트 설계",
        image: "/images/competence-component.png",
        description: [
            "반복되는 UI 패턴을 공통 컴포넌트로 분리해 화면 간 일관성과 개발 효율을 높입니다.",
            "props와 상태 구조를 명확히 설계해 다양한 화면에서 확장 가능하게 사용합니다.",
            "컴포넌트의 역할과 책임을 나누어 유지보수하기 쉬운 UI 구조를 만듭니다.",
        ],
    },
    {
        title: "사용자 중심 UI/UX 설계",
        image: "/images/competence-uiux.png",
        description: [
            "사용자가 기능을 이해하고 완료하기까지의 흐름을 기준으로 화면을 설계합니다.",
            "입력, 선택, 제출 과정에서 필요한 안내와 피드백을 제공해 사용자의 혼란을 줄입니다.",
            "모바일과 데스크톱 환경에서 정보가 잘 읽히도록 반응형 UI를 구현합니다.",
        ],
    },
];

export default function CoreSection() {
    return (
        <section
            id="Core"
            className="scroll-mt-16 border-b border-slate-300 px-4 py-10 dark:border-slate-700"
        >
            <SectionHeading>
                핵심 역량
            </SectionHeading>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {coreItems.map((item) => (
                    <article
                        key={item.title}
                        className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                    >
                        <div className="relative aspect-[4/3] bg-slate-50 dark:bg-slate-800">
                            <Image
                                src={item.image}
                                alt={`${item.title} 이미지`}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 245px, calc(100vw - 64px)"
                            />
                        </div>

                        <div className="p-4">
                            <h3 className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                                {item.title}
                            </h3>

                            <div className="mt-3">
                                <BulletList items={item.description} />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
