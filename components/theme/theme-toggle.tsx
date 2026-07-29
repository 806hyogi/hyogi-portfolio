"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
    const mounted = useSyncExternalStore(
        subscribe,
        getClientSnapshot,
        getServerSnapshot,
    );
    const { resolvedTheme, setTheme } = useTheme();

    const isDark = resolvedTheme === "dark";

    if (!mounted) {
        return (
            <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="테마 변경"
                className="cursor-pointer"
                disabled
            />
        );
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="cursor-pointer"
        >
            {isDark ? (
                <Sun className="size-5.5 text-[var(--icon-dark)]" strokeWidth={1} />
            ) : (
                <Moon className="size-5.5 text-[var(--icon-light)]" strokeWidth={1} />
            )}
        </Button>
    );
}
