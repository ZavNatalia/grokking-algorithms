import { notFound } from 'next/navigation';
import { BackButton } from '@/components/BackButton';
import { CodeBlock } from '@/components/CodeBlock';
import { algorithms, algoBySlug } from '@/lib/algorithms';

export function generateStaticParams() {
    return algorithms.map(a => ({ slug: a.slug }));
}

export default async function Page( { params }: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const algo = await algoBySlug[slug];
    if (!algo) return notFound();

    const source = algo.buildSource();

    return (
        <>
            <BackButton />
            <h2 className="mb-2 text-center text-2xl">{algo.title}</h2>
            <p className="mb-4 text-base opacity-90">
                {algo.description}
            </p>
            <p>
                <b>Сложность:</b> {algo.complexity}
            </p>
            <CodeBlock code={source} language={algo.language ?? 'ts'} filename={algo.filename} />
        </>
    );
}
