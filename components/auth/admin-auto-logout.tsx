"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { requestLogout } from "@/lib/backend/auth"

function isAdminPath(pathname: string | null) {
    return pathname === "/admin" || pathname?.startsWith("/admin/")
}

function logout() {
    requestLogout()
}

export function AdminAutoLogout() {
    const pathname = usePathname()
    const previousPathname = useRef<string | null>(null)

    useEffect(() => {
        const previous = previousPathname.current

        if (isAdminPath(previous) && !isAdminPath(pathname)) {
            logout()
        }

        previousPathname.current = pathname
    }, [pathname])

    useEffect(() => {
        const handlePageHide = () => {
            if (isAdminPath(window.location.pathname)) {
                logout()
            }
        }

        window.addEventListener("pagehide", handlePageHide)

        return () => {
            window.removeEventListener("pagehide", handlePageHide)
        }
    }, [])

    return null
}
