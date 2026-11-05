import type { AnalyticsEventName } from "@/lib/backend/analytics/types";

let pending: Promise<void> = Promise.resolve();

export function sendAnalytics(
    endpoint: "pageview" | "event",
    payload: object,
) {
    pending = pending.then(async () => {
        try {
            const response = await fetch(`/api/analytics/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                keepalive: true,
            });

            if (!response.ok) {
                console.warn("Analytics request failed:", response.status);
            }
        } catch {
            // 통계 요청 실패가 원래 동작에 영향을 주지 않도록 합니다.
        }
    });
}

export function trackEvent(
    eventName: AnalyticsEventName,
    details: {
        projectSlug?: string;
        placement?: string;
    } = {},
) {
    const path = window.location.pathname;

    if (path !== "/" && !/^\/project\/[^/]+$/.test(path)) return;

    sendAnalytics("event", {
        eventName,
        path,
        ...details,
    });
}