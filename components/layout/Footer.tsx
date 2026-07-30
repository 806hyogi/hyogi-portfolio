import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-slate-300 bg-white px-4 py-6 dark:border-slate-700 dark:bg-background">
            <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4 px-0 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                <p className="text-base font-bold leading-6 text-zinc-900 dark:text-zinc-100">
                    HYOGI
                </p>

                <p className="text-base font-extralight leading-6 text-gray-700 dark:text-neutral-300">
                    © 2026 Choi Kwanghyeok. All rights reserved.
                    <br />
                    Designed & Developed by Choi Kwanghyeok.
                </p>

                <div className="flex items-center gap-4 sm:justify-end">
                    <Link
                        href="https://github.com/806hyogi"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="inline-flex size-6 items-center justify-center"
                    >
                        <Image
                            src="/icon/github.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="size-5 dark:invert"
                        />
                    </Link>

                    <Link
                        href="mailto:rhkdgur120@naver.com"
                        aria-label="Email"
                        className="inline-flex size-6 items-center justify-center text-zinc-600 dark:text-zinc-300"
                    >
                        <Mail aria-hidden="true" className="size-5.5" strokeWidth={1} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}