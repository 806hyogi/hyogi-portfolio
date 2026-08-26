"use client";

import { Download } from "lucide-react";

import { cn } from "@/lib/utils";

type ResumeDownloadButtonProps = {
    className?: string;
    compact?: boolean;
    variant?: "primary" | "outline" | "ghost";
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForImages = async () => {
    const images = Array.from(document.images);

    await Promise.all(
        images.map(async (image) => {
            if (image.complete && image.naturalWidth > 0) {
                return;
            }

            await new Promise<void>((resolve) => {
                image.onload = () => resolve();
                image.onerror = () => resolve();
            });
        })
    );
};

export function ResumeDownloadButton({
    className,
    compact = false,
    variant = "outline",
}: ResumeDownloadButtonProps) {
    const handleDownloadPdf = async () => {

        try {
            document.documentElement.classList.add("resume-capturing"); // 애니메이션 삭제 클래스 추가 (애니메이션 때문에 안보이는 현상 때문)
            await new Promise((resolve) => requestAnimationFrame(resolve));

            if (window.matchMedia("(max-width: 767px)").matches) {
                window.alert("이력서 다운로드는 PC에서만 사용할 수 있습니다.");
                return;
            }

            window.dispatchEvent(new Event("portfolio:open-all-projects"));

            const closeProjects = () => {
                window.dispatchEvent(new Event("portfolio:close-all-projects"));
                window.removeEventListener("afterprint", closeProjects);
                window.removeEventListener("focus", closeProjects);
            };

            window.addEventListener("afterprint", closeProjects);
            window.addEventListener("focus", closeProjects);

            await wait(500);
            await waitForImages();
            await wait(300);

            window.print();

            setTimeout(closeProjects, 300);
        } finally {
            document.documentElement.classList.remove("resume-capturing");
        }
    };

    return (
        <button
            type="button"
            aria-label="이력서 다운로드"
            data-pdf-ignore="true"
            onClick={handleDownloadPdf}
            className={cn(
                "inline-flex cursor-pointer items-center justify-center gap-1 rounded-md text-sm font-medium leading-5 transition-colors",
                compact ? "h-9 px-3" : "px-6 py-4 text-base leading-6",
                variant === "primary" &&
                "bg-blue-500 text-[var(--icon-dark)] hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600",
                variant === "outline" &&
                "text-[var(--icon-light)] hover:bg-slate-50 dark:border-[var(--icon-dark)] dark:text-zinc-100 dark:hover:bg-slate-800",
                variant === "ghost" &&
                "text-[var(--icon-light)] hover:bg-slate-100 dark:text-[var(--icon-dark)] dark:hover:bg-slate-800",
                className
            )}
        >
            <Download
                aria-hidden="true"
                className={compact ? "size-5.5" : "px-3 py-3 text-base leading-6"}
                strokeWidth={1.5}
            />
        </button>
    );
}
