"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-10">
                <Link
                    href="/"
                    className="flex min-w-0 items-baseline gap-2 text-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <span className="shrink-0 font-bold text-[var(--logo-name-light)] dark:text-[var(--logo-name-dark)]">
                        최광혁
                    </span>
                    <span className="truncate font-normal text-[var(--logo-role-light)] dark:text-[var(--logo-role-dark)]">
                        프론트엔드 개발자
                    </span>
                </Link>

                <div className="hidden items-center gap-2 sm:flex">
                    <ThemeToggle />

                    <Button asChild variant="ghost" size="icon">
                        <Link
                            href="https://github.com/806hyogi"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <Image
                                src="/icon/github.svg"
                                alt="github"
                                width={20}
                                height={20}
                                className="size-5 dark:invert"
                            />
                        </Link>
                    </Button>
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
                    <div className="mx-auto flex max-w-5xl items-center justify-end gap-2">
                        <ThemeToggle />

                        <Button asChild variant="ghost" size="icon">
                            <Link
                                href="https://github.com/806hyogi"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Image
                                    src="/icon/github.svg"
                                    alt="github"
                                    width={20}
                                    height={20}
                                    className="size-5 dark:invert"
                                />
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
