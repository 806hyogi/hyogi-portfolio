"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

type ScrollRevealSectionProps = {
    id: string
    children: ReactNode
    className?: string
    threshold?: number
    delay?: number
}

export function ScrollRevealSection({
    id,
    children,
    className,
    threshold = 0.2,
    delay,
}: ScrollRevealSectionProps) {
    const sectionRef = useRef<HTMLElement | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const section = sectionRef.current

        if (!section) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { threshold },
        )

        observer.observe(section)

        return () => observer.disconnect()
    }, [threshold])

    return (
        <section
            ref={sectionRef}
            id={id}
            style={{ animationDelay: `${delay}ms` }}
            className={cn(
                "opacity-0",
                isVisible && "animate-intro-rise",
                className,
            )}
        >
            {children}
        </section>
    )
}