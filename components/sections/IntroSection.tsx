"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { requestIntro } from "@/lib/backend/intro"
import type { IntroProfile } from "@/lib/backend/intro"
import { Skeleton } from "@/components/ui/skeleton"

export default function IntroSection() {
    const [profile, setProfile] = useState<IntroProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        async function loadIntro() {
            try {
                const data = await requestIntro()
                setProfile(data.profile)
            } catch {
                setErrorMessage("소개 정보를 불러오지 못했습니다.")
            } finally {
                setIsLoading(false)
            }
        }

        loadIntro()
    }, [])

    if (isLoading) { return <IntroSectionSkeleton /> }
    if (errorMessage || !profile) {
        return (
            <section
                id="Intro"
                className="mx-auto max-w-5xl border-b border-slate-300 px-4 py-16 dark:border-slate-700"
            >
                <p className="text-sm text-red-500">
                    {errorMessage ?? "등록된 소개 정보가 없습니다."}
                </p>
            </section>
        )
    }

    return (
        <section
            id="Intro"
            className="mx-auto max-w-5xl border-b border-slate-300 px-4 py-16 dark:border-slate-700"
        >
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-start">
                <div className="relative h-70 w-47 overflow-hidden rounded-sm outline outline-1 outline-slate-300 dark:outline-slate-700">
                    <Image
                        src={profile.profileImageUrl}
                        alt={profile.profileImageAlt}
                        fill
                        className="object-cover"
                        sizes="160px"
                    />
                </div>

                <div className="flex min-h-[260px] flex-1 flex-col items-start gap-1">
                    <p className="text-base font-normal leading-6 text-zinc-900 dark:text-zinc-100">
                        {profile.name}
                        {profile.nameEn ? ` (${profile.nameEn})` : ""}
                    </p>

                    <p className="text-base font-medium leading-6 text-blue-400">
                        {profile.role}
                    </p>

                    <div className="w-full max-w-[576px] pt-3">
                        {profile.headline ? (
                            <p className="text-sm font-bold leading-6 text-gray-700 dark:text-gray-200">
                                {profile.headline ? `'${profile.headline}'` : ""}
                            </p>
                        ) : null}

                        {profile.description ? (
                            <p className="whitespace-pre-line text-xs font-normal leading-6 text-gray-700 dark:text-gray-300">
                                {profile.description ?? ""}
                            </p>
                        ) : null}

                        <div className="mt-4 flex items-center gap-2">
                            {profile.links.map((link) => (
                                <a
                                    key={`${link.label}-${link.url}`}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-zinc-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-zinc-100 dark:hover:bg-slate-800"
                                >
                                    {link.icon ? (
                                        <Image
                                            src={link.icon}
                                            alt=""
                                            width={16}
                                            height={16}
                                            className="size-4 dark:invert"
                                        />
                                    ) : null}
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function IntroSectionSkeleton() {
    return (
        <section
            id="Intro"
            className="mx-auto max-w-5xl border-b border-slate-300 px-4 py-16 dark:border-slate-700"
        >
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-start">
                <Skeleton className="h-70 w-47 rounded-sm" />

                <div className="flex min-h-[260px] w-full flex-1 flex-col items-start gap-1">
                    <div className="flex h-6 items-center">
                        <Skeleton className="h-4 w-[220px]" />
                    </div>

                    <div className="flex h-6 items-center">
                        <Skeleton className="h-4 w-36" />
                    </div>

                    <div className="w-full max-w-[576px] pt-3">
                        <div className="flex h-6 items-center">
                            <Skeleton className="h-3.5 w-full max-w-[456px]" />
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex h-6 items-center">
                                <Skeleton className="h-3 w-full" />
                            </div>
                            <div className="flex h-6 items-center">
                                <Skeleton className="h-3 w-full" />
                            </div>
                            <div className="flex h-6 items-center">
                                <Skeleton className="h-3 w-11/12" />
                            </div>
                            <div className="flex h-6 items-center">
                                <Skeleton className="h-3 w-5/6" />
                            </div>
                            <div className="flex h-6 items-center">
                                <Skeleton className="h-3 w-5/6" />
                            </div>
                        </div>

                        <div className="mt-7 flex h-[34px] items-center gap-2">
                            <Skeleton className="h-[34px] w-[88px]" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

