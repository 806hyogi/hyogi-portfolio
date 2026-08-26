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
        <section className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="text-base font-semibold leading-6 text-zinc-900 dark:text-zinc-100">
                {group.title}
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                    <span
                        key={skill.name}
                        className="inline-flex h-8 items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium leading-4 text-neutral-600 dark:border-slate-700 dark:bg-slate-800 dark:text-neutral-300"
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
