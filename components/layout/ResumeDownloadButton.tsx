import { Download } from "lucide-react";

import { cn } from "@/lib/utils";

type ResumeDownloadButtonProps = {
    className?: string;
    compact?: boolean;
    variant?: "primary" | "outline" | "ghost";
};

export function ResumeDownloadButton({
    className,
    compact = false,
    variant = "outline",
}: ResumeDownloadButtonProps) {
    return (
        <a
            href="/resume/choi-kwanghyeok-resume.pdf"
            download="최광혁_프론트엔드_개발자_이력서.pdf"
            aria-label="이력서 다운로드"
            className={cn(
                "inline-flex cursor-pointer items-center justify-center gap-1 rounded-md text-sm font-medium leading-5 transition-colors",
                compact ? "h-9 px-3" : "px-6 py-4 text-base leading-6",
                variant === "primary" &&
                "bg-blue-500 text-[var(--icon-dark)] hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600",
                variant === "outline" &&
                "text-[var(--icon-light)] hover:bg-slate-50 dark:border-slate-700 dark:text-zinc-100 dark:hover:bg-slate-800",
                variant === "ghost" &&
                "text-[var(--icon-light)] hover:bg-slate-100 dark:text-[var(--icon-dark)] dark:hover:bg-slate-800",
                className
            )}
        >
            <Download
                aria-hidden="true"
                className="size-5 shrink-0"
                strokeWidth={1.5}
            />
            {compact ? null : <span>이력서 다운로드</span>}
        </a>
    );
}
