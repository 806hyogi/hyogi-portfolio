import type { ReactNode } from "react";

type SectionHeadingProps = {
    children: ReactNode;
};

export function SectionHeading({ children }: SectionHeadingProps) {
    return (
        <h2 className="text-sm font-bold leading-6 tracking-widest text-blue-500 uppercase dark:text-blue-400">
            {children}
        </h2>
    );
}
