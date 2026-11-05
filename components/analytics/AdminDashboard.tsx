"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Activity, ArrowUpRight, BarChart3, CalendarDays, Download, Eye, MousePointer2, Users } from "lucide-react";

import {
    analyticsEventLabels,
    type AnalyticsEventName,
    type AnalyticsEventSummary,
} from "@/lib/backend/analytics/types";

export type TrafficStats = {
    pageviews: number;
    visitors: number;
    daily: { day: string; pageviews: number }[];
    projects: { path: string; pageviews: number }[];
};

type AdminDashboardProps = {
    days: number;
    endDay: string;
    stats: TrafficStats | null;
    eventStats: AnalyticsEventSummary[] | null;
    projectNames: Record<string, string>;
};

const ranges = [
    { days: 1, label: "오늘" },
    { days: 7, label: "7일" },
    { days: 30, label: "30일" },
];
const panel = "rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-200/20 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none sm:p-6";
const number = new Intl.NumberFormat("ko-KR");
const shortDate = (day: string) => day.slice(5).replace("-", ".");

function TrafficChart({ daily }: { daily: TrafficStats["daily"] }) {
    const gradientId = useId();
    const [hoveredDay, setHoveredDay] = useState<string | null>(null);
    const largestValue = Math.max(...daily.map((item) => item.pageviews));
    const max = Math.max(4, Math.ceil(largestValue / 4) * 4);
    const points = daily.map((item, index) => ({
        ...item,
        x: daily.length === 1 ? 300 : 12 + index / (daily.length - 1) * 576,
        y: 184 - item.pageviews / max * 164,
    }));
    const selected = points.find((item) => item.day === hoveredDay) ?? points[points.length - 1];
    const line = points.map((point) => `${point.x},${point.y}`).join(" ");
    const first = points[0];
    const last = points[points.length - 1];
    const labelIndexes = new Set([0, Math.floor((points.length - 1) / 2), points.length - 1]);

    return (
        <div>
            <div className="mb-5 flex items-center justify-between gap-3 text-xs">
                <span className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span className="size-2 rounded-full bg-blue-500" /> 페이지 조회 수
                </span>
                <span className="tabular-nums text-slate-500 dark:text-slate-400">
                    {shortDate(selected.day)}
                    <strong className="ml-2 text-slate-900 dark:text-slate-100">
                        {number.format(selected.pageviews)}회
                    </strong>
                </span>
            </div>
            <div className="relative pl-8">
                <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-52 w-7 text-[10px] tabular-nums text-slate-400 sm:h-60">
                    {[max, max * 0.75, max * 0.5, max * 0.25, 0].map((tick, index) => (
                        <span key={tick} className="absolute -translate-y-1/2" style={{ top: `${10 + index * 20.5}%` }}>
                            {number.format(tick)}
                        </span>
                    ))}
                </div>
                <svg
                    viewBox="0 0 600 200"
                    preserveAspectRatio="none"
                    className="h-52 w-full overflow-visible sm:h-60"
                    role="group"
                    aria-label="일별 페이지 조회 추이. 각 날짜에 초점을 맞추면 조회 수를 확인할 수 있습니다."
                    onPointerLeave={() => setHoveredDay(null)}
                >
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" />
                        </linearGradient>
                    </defs>
                    {[20, 61, 102, 143, 184].map((y) => (
                        <line
                            key={y} x1="0" y1={y} x2="600" y2={y}
                            className="stroke-slate-200 dark:stroke-slate-800"
                            strokeDasharray="3 5" vectorEffect="non-scaling-stroke"
                        />
                    ))}
                    {points.length > 1 && (
                        <>
                            <polygon points={`${first.x},184 ${line} ${last.x},184`} fill={`url(#${gradientId})`} />
                            <polyline
                                points={line} fill="none" stroke="#3b82f6" strokeWidth="2.5"
                                strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"
                            />
                        </>
                    )}
                    <line
                        x1={selected.x} y1="20" x2={selected.x} y2="184"
                        stroke="#60a5fa" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"
                    />
                    <ellipse
                        cx={selected.x} cy={selected.y} rx="5" ry="4" fill="#3b82f6"
                        className="stroke-white dark:stroke-slate-900" strokeWidth="2" vectorEffect="non-scaling-stroke"
                    />
                    {points.map((point, index) => {
                        const left = index === 0 ? 0 : (points[index - 1].x + point.x) / 2;
                        const right = index === points.length - 1 ? 600 : (point.x + points[index + 1].x) / 2;

                        return (
                            <rect
                                key={point.day} x={left} y="0" width={right - left} height="200"
                                tabIndex={0} role="img" aria-label={`${point.day} 조회 ${point.pageviews}회`}
                                className="fill-transparent focus:fill-blue-500/5 focus:outline-none"
                                onPointerEnter={() => setHoveredDay(point.day)}
                                onFocus={() => setHoveredDay(point.day)}
                                onBlur={() => setHoveredDay(null)}
                            />
                        );
                    })}
                </svg>
                <div aria-hidden="true" className="relative mt-2 h-4 text-[10px] tabular-nums text-slate-400">
                    {points.map((point, index) => labelIndexes.has(index) && (
                        <span key={point.day} style={{ left: `${point.x / 6}%` }} className="absolute -translate-x-1/2">
                            {shortDate(point.day)}
                        </span>
                    ))}
                </div>
            </div>
            <details className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <summary className="w-fit cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-blue-500">
                    일별 데이터 보기
                </summary>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                    {daily.map((item) => (
                        <div key={item.day} className="flex justify-between gap-2">
                            <dt>{shortDate(item.day)}</dt>
                            <dd className="tabular-nums">{number.format(item.pageviews)}회</dd>
                        </div>
                    ))}
                </dl>
            </details>
        </div>
    );
}

export function AdminDashboard({ days, endDay, stats, eventStats, projectNames }: AdminDashboardProps) {
    // DB가 반환하지 않는 날짜도 포함해 선택 기간의 날짜 간격을 일정하게 유지합니다.
    const daily = Array.from({ length: days }, (_, index) => {
        const date = new Date(`${endDay}T00:00:00Z`);
        date.setUTCDate(date.getUTCDate() - days + index + 1);
        const day = date.toISOString().slice(0, 10);
        return { day, pageviews: stats?.daily.find((item) => item.day === day)?.pageviews ?? 0 };
    });
    const events = (Object.keys(analyticsEventLabels) as AnalyticsEventName[]).map((name) => {
        const summary = eventStats?.find((item) => item.event_name === name);
        return { name, label: analyticsEventLabels[name], total: summary?.total ?? 0, visitors: summary?.visitors ?? 0 };
    });
    const totalEvents = events.reduce((sum, item) => sum + item.total, 0);
    const maxEvents = Math.max(1, ...events.map((item) => item.total));
    const rankedProjects = [...(stats?.projects ?? [])].sort((a, b) => b.pageviews - a.pageviews);
    const maxProjectViews = Math.max(1, ...rankedProjects.map((item) => item.pageviews));
    const metricCards = [
        {
            label: "방문자 수", value: stats?.visitors, hint: "브라우저 기준 중복 제외", Icon: Users,
            color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
        },
        {
            label: "페이지 조회 수", value: stats?.pageviews, hint: "공개 페이지 전체 조회", Icon: Eye,
            color: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
        },
        {
            label: "전체 행동 수", value: eventStats ? totalEvents : undefined, hint: "6개 수집 항목의 발생 횟수", Icon: MousePointer2,
            color: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-400",
        },
        {
            label: "이력서 다운로드", value: eventStats ? events.find((item) => item.name === "resume_download")?.total : undefined,
            hint: "다운로드 버튼 클릭 기준", Icon: Download,
            color: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
        },
    ];

    return (
        <section className="space-y-5 bg-slate-50/70 px-4 py-8 text-slate-900 dark:bg-slate-950/40 dark:text-slate-100 sm:px-6 sm:py-10">
            <header className="flex flex-wrap items-end justify-between gap-5">
                <div>
                    <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] text-blue-600 dark:text-blue-400">
                        <Activity className="size-3.5" aria-hidden="true" /> PORTFOLIO ANALYTICS
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">방문자 대시보드</h1>
                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        방문 흐름과 프로젝트에 대한 관심을 한눈에 확인하세요.
                    </p>
                </div>
                <nav aria-label="통계 기간" className="inline-flex gap-1 rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
                    {ranges.map((range) => (
                        <Link
                            key={range.days} href={`/admin?days=${range.days}`}
                            aria-current={days === range.days ? "page" : undefined}
                            className="rounded-lg px-4 py-2 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 aria-[current=page]:bg-slate-900 aria-[current=page]:text-white dark:text-slate-400 dark:hover:bg-slate-800 dark:aria-[current=page]:bg-blue-500 dark:aria-[current=page]:text-white"
                        >
                            {range.label}
                        </Link>
                    ))}
                </nav>
            </header>

            <p className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <CalendarDays aria-hidden="true" className="size-3.5" />
                {daily[0].day.replaceAll("-", ".")} — {endDay.replaceAll("-", ".")}
                <span className="ml-1 text-slate-400">한국 시간</span>
            </p>

            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {metricCards.map(({ label, value, hint, Icon, color }) => (
                    <div key={label} className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                        <div className={`mb-4 flex size-8 items-center justify-center rounded-xl ${color}`}>
                            <Icon className="size-4" aria-hidden="true" />
                        </div>
                        <dt className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</dt>
                        <dd className="mt-1.5 break-words text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">
                            {value == null ? "—" : number.format(value)}
                        </dd>
                        <dd className="mt-2 text-[10px] leading-4 text-slate-400">{hint}</dd>
                    </div>
                ))}
            </dl>

            <section aria-labelledby="traffic-heading" className={panel}>
                <div className="mb-6 flex items-start justify-between gap-3">
                    <div>
                        <h2 id="traffic-heading" className="text-sm font-semibold">방문 추이</h2>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">선택한 기간의 일별 페이지 조회 수</p>
                    </div>
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        {days === 1 ? "오늘" : `최근 ${days}일`}
                    </span>
                </div>
                {stats ? (
                    <>
                        <TrafficChart daily={daily} />
                        {stats.pageviews === 0 && <p className="mt-3 text-xs text-slate-500">선택한 기간에 기록된 조회가 없습니다.</p>}
                    </>
                ) : (
                    <p role="alert" className="py-12 text-center text-sm text-slate-500">방문 통계를 불러오지 못했습니다.</p>
                )}
            </section>

            <section aria-labelledby="events-heading" className={panel}>
                <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h2 id="events-heading" className="text-sm font-semibold">방문자 행동</h2>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">어떤 행동으로 관심이 이어졌는지 확인하세요.</p>
                    </div>
                    <div className="flex gap-3 text-[10px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-blue-500" />발생 횟수</span>
                        <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-teal-500" />브라우저 수</span>
                    </div>
                </div>
                {eventStats ? (
                    <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                        {events.map((item) => (
                            <li key={item.name}>
                                <div className="mb-2.5 flex items-start justify-between gap-2">
                                    <h3 className="text-xs font-medium">{item.label}</h3>
                                    <span className="shrink-0 text-xs font-semibold tabular-nums">{number.format(item.total)}회</span>
                                </div>
                                <div aria-hidden="true" className="space-y-1.5">
                                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${item.total / maxEvents * 100}%` }} />
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div className="h-full rounded-full bg-teal-500" style={{ width: `${item.visitors / maxEvents * 100}%` }} />
                                    </div>
                                </div>
                                <p className="mt-2 text-[10px] tabular-nums text-slate-500 dark:text-slate-400">
                                    브라우저 {number.format(item.visitors)}개
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p role="alert" className="py-8 text-center text-sm text-slate-500">행동 통계를 불러오지 못했습니다.</p>
                )}
            </section>

            <section aria-labelledby="projects-heading" className={panel}>
                <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                        <h2 id="projects-heading" className="text-sm font-semibold">프로젝트별 관심도</h2>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">프로젝트 상세 페이지 조회 순위</p>
                    </div>
                    <BarChart3 className="size-4 text-slate-400" aria-hidden="true" />
                </div>
                {!stats ? (
                    <p role="alert" className="py-8 text-center text-sm text-slate-500">프로젝트 통계를 불러오지 못했습니다.</p>
                ) : rankedProjects.length === 0 ? (
                    <p className="py-8 text-center text-sm text-slate-500">아직 프로젝트 조회가 없습니다.</p>
                ) : (
                    <ol className="space-y-5">
                        {rankedProjects.map((project, index) => (
                            <li key={project.path} className="flex gap-3">
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold tabular-nums text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="mb-2 flex items-center justify-between gap-3">
                                        <Link href={project.path} className="group inline-flex min-w-0 items-center gap-1 rounded-sm text-xs font-medium hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-blue-500">
                                            <span className="truncate">{projectNames[project.path] ?? project.path}</span>
                                            <ArrowUpRight className="size-3 shrink-0 text-slate-400 group-hover:text-blue-500" aria-hidden="true" />
                                        </Link>
                                        <span className="shrink-0 text-xs font-semibold tabular-nums">{number.format(project.pageviews)}회</span>
                                    </div>
                                    <div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-400" style={{ width: `${project.pageviews / maxProjectViews * 100}%` }} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                )}
            </section>
            <p className="px-1 text-[10px] leading-5 text-slate-400">
                방문자와 행동별 브라우저 수는 쿠키 기준으로 집계됩니다. 다운로드와 이메일 통계는 버튼 클릭 횟수입니다.
            </p>
        </section>
    );
}
