
type ProjectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProjectPage({
    params,
}: ProjectPageProps) {
    const { slug } = await params;

    return (
        <main className="mx-auto min-h-screen max-w-5xl px-4 py-10">
            <h1 className="text-3xl font-bold">
                프로젝트 상세
            </h1>

            <p className="mt-4">
                현재 프로젝트: {slug}
            </p>
        </main>
    );
}