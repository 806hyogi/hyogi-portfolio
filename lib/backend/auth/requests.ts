import type { LoginRequest } from "./types"

export async function requestLogin(payload: LoginRequest) {
    return fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}

export async function requestLogout() {
    return fetch("/api/logout", {
        method: "POST",
        keepalive: true,
    })
}
