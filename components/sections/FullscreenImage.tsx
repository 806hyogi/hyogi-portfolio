"use client";

import Image from "next/image";
import { useRef } from "react";

type FullscreenImageProps = {
    src: string;
    alt: string;
};

export function FullscreenImage({
    src,
    alt,
}: FullscreenImageProps) {
    const containerRef = useRef<HTMLButtonElement>(null);

    const handleOpenFullscreen = async () => {
        const container = containerRef.current;

        if (!container) return;

        if (document.fullscreenElement) {
            await document.exitFullscreen();
            return;
        }

        await container.requestFullscreen();
    };

    return (
        <button
            ref={containerRef}
            type="button"
            onClick={handleOpenFullscreen}
            className="relative block aspect-[706/351] w-full cursor-zoom-in overflow-hidden rounded-md bg-black"
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 706px, 100vw"
                className="object-contain"
            />
        </button>
    );
}