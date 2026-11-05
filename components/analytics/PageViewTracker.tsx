/**
 * usePathname()으로 현재 경로를 읽습니다.
 * 메인(/)과 프로젝트 상세(/project/...)에서만 기록합니다.
 * 경로가 바뀌면 /api/analytics/pageview로 현재 경로를 전송합니다.
 * useRef로 마지막 경로를 기억해 같은 경로의 재렌더링으로 발생하는 중복 전송을 막습니다.
 */
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import {
    analyticsEventLabels,
    type AnalyticsEventName,
} from "@/lib/backend/analytics/types";
import { sendAnalytics, trackEvent } from "./track";

export function PageViewTracker() {
    const pathname = usePathname();
    const lastPath = useRef<string | null>(null);

    useEffect(() => {
        if (!pathname || pathname === lastPath.current) return;
        lastPath.current = pathname;

        if (pathname !== "/" && !/^\/project\/[^/]+$/.test(pathname)) return;

        sendAnalytics("pageview", { path: pathname });
    }, [pathname]);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!(event.target instanceof Element)) return;

            // 어떤 행동인지 ?
            const element = event.target.closest<HTMLElement>(
                "[data-analytics-event]",
            );

            const eventName = element?.dataset.analyticsEvent;

            if (
                !element ||
                !eventName ||
                !Object.hasOwn(analyticsEventLabels, eventName)
            ) {
                return;
            }

            // 어떤 프로젝트의 행동인지 ?
            const project = element.closest<HTMLElement>(
                "[data-project-slug]",
            );

            trackEvent(eventName as AnalyticsEventName, {
                projectSlug: project?.dataset.projectSlug,
                placement: element.dataset.analyticsPlacement,
            });
        };

        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, []);

    return null;
}