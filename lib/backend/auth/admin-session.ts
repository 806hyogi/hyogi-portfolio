/*
 * 관리자의 세션을 생성하고 검증하는 유틸리티
*/
import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const adminSessionMaxAge = 60 * 60 * 24;

function sign(expiresAt: string, secret: string) {
    return createHmac("sha256", secret).update(expiresAt).digest("hex");
}

export function createAdminSession() {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET");

    const expiresAt = String(Date.now() + adminSessionMaxAge * 1000);
    return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function isValidAdminSession(token?: string) {
    const secret = process.env.ADMIN_SESSION_SECRET;
    const match = /^(\d{13})\.([a-f0-9]{64})$/.exec(token ?? "");

    if (!secret || !match || Number(match[1]) <= Date.now()) return false;

    return timingSafeEqual(
        Buffer.from(match[2], "hex"),
        Buffer.from(sign(match[1], secret), "hex"),
    );
}