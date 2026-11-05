import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isValidAdminSession } from "@/lib/backend/auth/admin-session";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const session = cookieStore.get("session")

    if (!isValidAdminSession(session?.value)) {
        redirect("/login");
    }

    return <>{children}</>
}