import { NextResponse } from "next/server"
import {
    adminSessionMaxAge,
    createAdminSession,
} from "@/lib/backend/auth/admin-session";

export async function POST(request: Request) {
    const { id, password } = await request.json()

    const adminId = process.env.ADMIN_ID // 아이디
    const adminPassword = process.env.ADMIN_PASSWORD // 비밀번호

    if (!adminId || !adminPassword || id !== adminId || password !== adminPassword) {
        return NextResponse.json(
            { message: "아이디 또는 비밀번호가 올바르지 않습니다." },
            { status: 401 }
        )
    }

    const response = NextResponse.json({ ok: true })

    response.cookies.set("session", createAdminSession(), {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: adminSessionMaxAge,
    });

    return response
}