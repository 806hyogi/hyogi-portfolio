import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { id, password } = await request.json()

    const adminId = process.env.ADMIN_ID // 아이디
    const adminPassword = process.env.ADMIN_PASSWORD // 비밀번호

    if (id !== adminId || password !== adminPassword) {
        return NextResponse.json(
            { message: "아이디 또는 비밀번호가 올바르지 않습니다." },
            { status: 401 }
        )
    }

    const response = NextResponse.json({ ok: true })

    response.cookies.set("session", "admin-session-token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 세션 1일 유지
    })

    return response
}