"use client";

import { useEffect, useRef, useState } from "react";

const ACTIVE_OFFSET = 120; // 스크롤 할때 화면 위에서 몇 px 아래를 현재 읽고 있는 위치로 볼지
const SCROLL_OFFSET = 96; // 클릭 이동 시 세션이 헤더에 가리지 않도록 위쪽 여백을 남김
const BOTTOM_OFFSET = 24; // 페이지 맨 아래 근처에서 마지막 섹션을 active 처리하기 위한 여유값
const SCROLL_TARGET_TOLERANCE = 2; // 클릭 후 목표 위치에 거의 도착했는지 판단하는 오차 범위

const sections = [
    { id: "Core", label: "핵심 역량" },
    { id: "Personal", label: "경력 사항" },
    { id: "Skill", label: "기술 스택" },
    { id: "Project", label: "프로젝트" },
    { id: "Education", label: "학력 및 교육" },
];

export function SectionNavigation() {
    const [activeId, setActiveId] = useState(sections[0].id); // 현재 활성화 된 섹션 id 저장
    const activeIdRef = useRef(sections[0].id); // 최신 active id를 렌더링과 별개로 기억
    const isClickScrollingRef = useRef(false); // 네비게이션 클릭 시 부드러운 스크롤중인지 기억
    const scrollTargetRef = useRef<number | null>(null); // 클릭했을 때 이동해야 하는 목표 스크롤 위치

    useEffect(() => {
        const updateActiveSection = () => {
            if (isClickScrollingRef.current) {
                const scrollTarget = scrollTargetRef.current;

                // 클릭 후 목표 위치에 도착하지 않았다면 active 계산을 건너뜀
                if (
                    scrollTarget === null ||
                    Math.abs(window.scrollY - scrollTarget) > SCROLL_TARGET_TOLERANCE
                ) {
                    return;
                }

                isClickScrollingRef.current = false;
                scrollTargetRef.current = null;
            }

            const isAtBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - BOTTOM_OFFSET;

            // 맨 아래 근처에는 마지막 섹션을 강제로 active
            if (isAtBottom) {
                const lastId = sections[sections.length - 1].id;

                activeIdRef.current = lastId;
                setActiveId(lastId);
                return;
            }

            const currentPosition = window.scrollY + ACTIVE_OFFSET;
            let currentId = sections[0].id;

            sections.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (!element) return;

                const elementTop = element.getBoundingClientRect().top + window.scrollY;

                // 섹션 시작점이 기준선보다 위에 있으면 그 섹션을 현재 섹션 후보로 봄
                if (elementTop <= currentPosition) { currentId = id; }
            });

            activeIdRef.current = currentId;
            setActiveId(currentId);
        };

        updateActiveSection();

        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
        };
    }, []);

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        sectionId: string
    ) => {
        event.preventDefault(); // anchor 이동 막고 직접 스크롤 제어

        const element = document.getElementById(sectionId);
        if (!element) return;

        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const scrollTarget = Math.max(elementTop - SCROLL_OFFSET, 0); // 섹션 제목이 가려지는걸 줄이기 위한 보정

        // 클릭한 순간 바로 해당 매뉴를 active
        isClickScrollingRef.current = true;
        scrollTargetRef.current = scrollTarget;
        activeIdRef.current = sectionId;
        setActiveId(sectionId);

        window.scrollTo({
            top: scrollTarget,
            behavior: "smooth",
        });

        window.history.pushState(null, "", `#${sectionId}`);
    };

    return (
        <nav className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
            <ul className="flex flex-col items-end gap-3">
                {sections.map((section) => {
                    const isActive = activeId === section.id;

                    return (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                onClick={(event) => handleClick(event, section.id)}
                                className={
                                    isActive
                                        ? "text-sm font-semibold text-blue-500"
                                        : "text-xs font-normal text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                                }
                            >
                                {section.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}