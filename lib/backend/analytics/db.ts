/**
 * 통계 저장과 조회에 사용할 Supabase 클라이언트
 */
import "server-only";
import { createClient } from "@supabase/supabase-js";

export function createAnalyticsDb() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SECRET_KEY;

    if (!url || !key) {
        throw new Error("Analytics database credentials are missing.");
    }

    return createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
    });
}