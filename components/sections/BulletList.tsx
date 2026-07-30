type BulletListProps = {
    items: string[];
    className?: string;
};

export function BulletList({ items, className = "" }: BulletListProps) {
    return (
        <ul className={`space-y-2 text-sm font-normal leading-6 text-neutral-600 dark:text-neutral-300 ${className}`}>
            {items.map((item) => (
                <li key={item} className="flex gap-2">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-blue-400 dark:bg-blue-300" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}
