import Image from "next/image";

type Skill = {
    name: string;
    icon: string;
};

type SkillGroup = {
    title: string;
    skills: Skill[];
};

type SkillGroupCardProps = {
    group: SkillGroup;
};

export function SkillGroupCard({ group }: SkillGroupCardProps) {
    return (
        <section className="rounded-2xl bg-stone-50 p-6 dark:bg-slate-800">
            <h3 className="text-xs font-bold leading-4 tracking-wide text-zinc-900 dark:text-zinc-100">
                {group.title}
            </h3>

            <div className="mt-4 flex flex-wrap gap-[5px]">
                {group.skills.map((skill) => (
                    <span
                        key={skill.name}
                        className="inline-flex h-7 items-center gap-1 rounded-[5px] bg-white px-3 py-1 text-xs font-bold leading-4 text-neutral-500 outline outline-1 outline-gray-200 dark:bg-slate-900 dark:text-neutral-300 dark:outline-slate-700"
                    >
                        <Image
                            src={skill.icon}
                            alt=""
                            width={15}
                            height={15}
                            className="size-3.5 shrink-0"
                        />
                        {skill.name}
                    </span>
                ))}
            </div>
        </section>
    );
}