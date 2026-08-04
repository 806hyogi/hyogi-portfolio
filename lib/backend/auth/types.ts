export type LoginRequest = {
    id: string
    password: string
}

export type LoginResponse = {
    ok: boolean
    message?: string
}