import { supabase } from "@/lib/backend";

export default async function AdminPage() {
    return (
        <section className="px-4 py-10">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    관리자 페이지
                </h1>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    포트폴리오 내용을 수정하는 페이지입니다.
                </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">

                </h2>

                <div className="mt-4 flex flex-col gap-4">

                </div>
            </div>
        </section>
    );
}