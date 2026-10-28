"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";
import Image from "next/image";

type FullscreenImageProps = {
    src: string;
    alt: string;
};

export function FullscreenImage({
    src,
    alt,
}: FullscreenImageProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="relative block aspect-[706/351] w-full cursor-zoom-in overflow-hidden rounded-md bg-black"
                >
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        unoptimized
                        sizes="100vw"
                        className="object-contain"
                    />
                </button>
            </DialogTrigger>

            <DialogContent
                showCloseButton={false}
                className="grid h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-none grid-rows-[auto_minmax(0,1fr)] gap-2 overflow-hidden border-none bg-black/85 p-4 text-white sm:max-w-none sm:p-6"
            >
                <DialogTitle className="sr-only">
                    {alt} 확대 이미지
                </DialogTitle>

                <div className="flex w-full justify-end">
                    <DialogClose asChild>
                        <button
                            type="button"
                            aria-label="확대 이미지 닫기"
                            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                            <XIcon
                                aria-hidden="true"
                                className="size-5"
                            />
                        </button>
                    </DialogClose>
                </div>

                <div className="relative min-h-0 w-full">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        unoptimized
                        sizes="100vw"
                        className="object-contain object-center"
                    />
                </div>
            </DialogContent>
        </Dialog>


    );
}