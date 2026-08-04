import type { IntroResponse } from "./types"

export async function requestIntro(): Promise<IntroResponse> {
    const res = await fetch("/api/intro")

    if (!res.ok) {
        throw new Error("소개 정보를 불러오지 못했습니다.")
    }

    return res.json()
}