import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import { projects } from "@/components/sections/project-data";
import { createAnalyticsDb } from "@/lib/backend/analytics/db";
import { analyticsEventLabels } from "@/lib/backend/analytics/types";

const allowedPaths = new Set([
    "/",
    ...projects.map(({ slug }) => `/project/${slug}`),
]);

const projectEvents = new Set([
    "project_github_click",
    "project_site_click",
    "project_expand",
    "project_image_expand",
]);

const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
    const origin = process.env.ANALYTICS_ORIGIN;

    if (!origin || request.headers.get("origin") !== origin) {
        return new NextResponse(null, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const eventName = body?.eventName;
    const path = body?.path;
    const placement = body?.placement ?? null;

    if (
        typeof eventName !== "string" ||
        !Object.hasOwn(analyticsEventLabels, eventName) ||
        typeof path !== "string" ||
        !allowedPaths.has(path)
    ) {
        return new NextResponse(null, { status: 400 });
    }

    if (
        placement !== null &&
        (typeof placement !== "string" ||
            !/^[a-z_]{1,40}$/.test(placement))
    ) {
        return new NextResponse(null, { status: 400 });
    }

    let projectSlug: string | null = null;

    if (projectEvents.has(eventName)) {
        const project = projects.find(
            ({ slug }) => slug === body?.projectSlug,
        );

        if (
            !project ||
            (path !== "/" && path !== `/project/${project.slug}`)
        ) {
            return new NextResponse(null, { status: 400 });
        }

        projectSlug = project.slug;
    }

    const existingId = request.cookies.get("portfolio_visitor")?.value;
    const validId =
        existingId && uuidPattern.test(existingId) ? existingId : null;
    const visitorId = validId ?? randomUUID();

    const { error } = await createAnalyticsDb()
        .from("analytics_events")
        .insert({
            event_name: eventName,
            path,
            visitor_id: visitorId,
            project_slug: projectSlug,
            placement,
        });

    if (error) {
        console.error("Failed to record analytics event:", error.code);
        return new NextResponse(null, { status: 500 });
    }

    const response = new NextResponse(null, { status: 204 });

    if (!validId) {
        response.cookies.set("portfolio_visitor", visitorId, {
            httpOnly: true,
            sameSite: "lax",
            secure: origin.startsWith("https://"),
            path: "/",
            maxAge: 60 * 60 * 24 * 90,
        });
    }

    return response;
}