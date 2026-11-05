/**
 * 요청의 Origin이 ANALYTICS_ORIGIN과 일치하는지 확인합니다.
 * 메인 또는 등록된 프로젝트 경로인지 검사합니다.
 * portfolio_visitor 쿠키가 있으면 기존 방문자 ID를 사용합니다.
 * 쿠키가 없으면 randomUUID()로 ID를 생성합니다.
 * page_views 테이블에 경로와 방문자 ID를 저장합니다.
 * 저장에 성공하면 204를 반환하고, 신규 방문자에게 90일짜리 쿠키를 발급합니다.
 */
import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import { projects } from "@/components/sections/project-data";
import { createAnalyticsDb } from "@/lib/backend/analytics/db";

const allowedPaths = new Set([
    "/",
    ...projects.map(({ slug }) => `/project/${slug}`),
]);

const visitorCookie = "portfolio_visitor";
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
    const origin = process.env.ANALYTICS_ORIGIN;

    if (!origin || request.headers.get("origin") !== origin) {
        return new NextResponse(null, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const path = body?.path;

    if (typeof path !== "string" || !allowedPaths.has(path)) {
        return new NextResponse(null, { status: 400 });
    }

    const existingId = request.cookies.get(visitorCookie)?.value;
    const validId = existingId && uuidPattern.test(existingId) ? existingId : null;
    const visitorId = validId ?? randomUUID();

    const { error } = await createAnalyticsDb()
        .from("page_views")
        .insert({ path, visitor_id: visitorId });

    if (error) {
        console.error("Failed to record page view:", error.code);
        return new NextResponse(null, { status: 500 });
    }

    const response = new NextResponse(null, { status: 204 });

    if (!validId) {
        response.cookies.set(visitorCookie, visitorId, {
            httpOnly: true,
            sameSite: "lax",
            secure: origin.startsWith("https://"),
            path: "/",
            maxAge: 60 * 60 * 24 * 90, // 90일
        });
    }

    return response;
}