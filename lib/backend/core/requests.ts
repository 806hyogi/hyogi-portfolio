import type { CoreResponse } from "./types"

export async function requestCore(): Promise<CoreResponse> {
    const res = await fetch("/api/core")

    if (!res.ok) {
        throw new Error("핵심 역량 정보를 불러오지 못했습니다.")
    }

    return res.json()
}