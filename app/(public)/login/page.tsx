"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { requestLogin } from "@/lib/backend/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

export default function LoginPage() {

    const router = useRouter()

    const [id, setId] = useState("") // 아이디
    const [password, setPassword] = useState("") // 비밀번호
    const [isSubmitting, setIsSubmitting] = useState(false) // 로그인 전송 상태

    /* 로그인 전송 */
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await requestLogin({ id, password })
            if (res.status === 401) {
                const data = await res.json()
                alert(data.message ?? "로그인에 실패했습니다. 상태 코드: " + res.status)
                return
            }

            if (!res.ok) {
                alert("로그인에 실패했습니다.")
                return
            }

            router.push("/admin")
            router.refresh()
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="flex min-h-dvh items-center justify-center px-4 py-12">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-sm"
            >
                <div className="mb-6 space-y-2 text-center">
                    <h1 className="text-2xl font-semibold text-foreground">관리자 로그인</h1>
                </div>

                <div className="space-y-4">
                    <label className="block space-y-2 text-sm font-medium text-foreground">
                        <span>아이디</span>
                        <Input
                            className="mt-1"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            autoComplete="username"
                        />
                    </label>

                    <label className="block space-y-2 text-sm font-medium text-foreground">
                        <span>비밀번호</span>
                        <Input
                            type="password"
                            className="mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </label>
                </div>

                <Button
                    type="submit"
                    size="lg"
                    className="mt-6 w-full cursor-pointer"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (<Spinner className="size-4" />) : ("로그인")}
                </Button>
            </form>
        </main>
    )
}
