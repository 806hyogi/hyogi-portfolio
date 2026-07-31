"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { ResumeDownloadButton } from "@/components/layout/ResumeDownloadButton";

const navItems = [
    { label: "소개", href: "#Intro" },
    { label: "핵심 역량", href: "#Core" },
    { label: "경력 사항", href: "#Personal" },
    { label: "기술 스택", href: "#Skill" },
    { label: "프로젝트", href: "#Project" },
    { label: "교육 및 수상", href: "#Education" },
    { label: "연락처", href: "#Contact" },
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-10">
                <Link
                    href="/"
                    className="flex min-w-0 items-baseline gap-2 text-md transition-colors"
                    onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                >
                    <span className="shrink-0 font-bold text-[var(--logo-name-light)] dark:text-[var(--logo-name-dark)]">
                        최광혁
                    </span>
                    <span className="truncate font-normal text-[var(--logo-role-light)] dark:text-[var(--logo-role-dark)]">
                        프론트엔드 개발자
                    </span>
                </Link>

                <div className="hidden items-center gap-2.5 sm:flex">
                    <ThemeToggle />
                    <ResumeDownloadButton compact />
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen((current) => !current)}
                    className="cursor-pointer sm:hidden"
                >
                    {isMenuOpen ? (
                        <X
                            className="size-5 text-[var(--icon-light)] dark:text-[var(--icon-dark)]"
                            strokeWidth={1.5}
                        />
                    ) : (
                        <Menu
                            className="size-5 text-[var(--icon-light)] dark:text-[var(--icon-dark)]"
                            strokeWidth={1.5}
                        />
                    )}
                </Button>
            </div>

            {isMenuOpen ? (
                <div className="border-t border-border bg-background px-4 py-3 sm:hidden">
                    <div className="mx-auto flex max-w-5xl flex-col gap-3">
                        <nav className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-md px-2 py-2 text-sm font-normal text-zinc-900 transition-colors hover:bg-slate-100 dark:text-zinc-100 dark:hover:bg-slate-800"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center justify-end gap-2 border-t border-border pt-3">
                            <ThemeToggle />
                            <ResumeDownloadButton compact />
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
