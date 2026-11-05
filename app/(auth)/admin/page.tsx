import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminDashboard, type TrafficStats } from "@/components/analytics/AdminDashboard";
import { projects } from "@/components/sections/project-data";
import { createAnalyticsDb } from "@/lib/backend/analytics/db";
import { isValidAdminSession } from "@/lib/backend/auth/admin-session";
import type { AnalyticsEventSummary } from "@/lib/backend/analytics/types";

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ days?: string | string[] }>;
}) {
    const cookieStore = await cookies();

    if (!isValidAdminSession(cookieStore.get("session")?.value)) {
        redirect("/login");
    }

    const query = await searchParams;
    const requestedDays = Number(query.days);
    const days = [1, 7, 30].includes(requestedDays) ? requestedDays : 7;
    const db = createAnalyticsDb();
    const [traffic, events] = await Promise.all([
        db.rpc("get_traffic_stats", { days }),
        db.rpc("get_analytics_event_stats", { days }),
    ]);

    return (
        <AdminDashboard
            days={days}
            endDay={new Intl.DateTimeFormat("en-CA", {
                timeZone: "Asia/Seoul",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            }).format(new Date())}
            stats={traffic.error ? null : traffic.data as TrafficStats | null}
            eventStats={events.error ? null : events.data as AnalyticsEventSummary[] | null}
            projectNames={Object.fromEntries(projects.map((project) => [
                `/project/${project.slug}`,
                project.title.split(" | ")[0],
            ]))}
        />
    );
}
