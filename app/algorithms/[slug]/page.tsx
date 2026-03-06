import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AlgoAnimation } from '@/components/animations/AlgoAnimation';
import { CodeBlock } from '@/components/CodeBlock';
import { algorithms, algoBySlug } from '@/lib/algorithms';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
    return algorithms.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const algo = algoBySlug[slug];
    if (!algo) return {};
    return {
        title: algo.title,
        description: `${algo.title} — объяснение, анализ сложности и пример кода на TypeScript.`,
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const algo = algoBySlug[slug];
    if (!algo) return notFound();

    const source = algo.buildSource();

    const codeStyle =
        '[&_code]:rounded [&_code]:bg-slate-200 dark:[&_code]:bg-slate-800/40\n' +
        '                [&_code]:px-1.5 [&_code]:py-[1px]\n' +
        '                [&_code]:font-mono [&_code]:text-[0.95em]';

    return (
        <>
            <Breadcrumbs currentTitle={algo.title} />
            <h2 className="my-4 text-center text-3xl mx-auto max-w-2xl">
                {algo.title}
            </h2>
            <div className={codeStyle + ' mb-4 text-lg opacity-80 space-y-1'}>
                {algo.description}
            </div>
            <div className={'text-lg opacity-80'}>
                <b>Сложность:</b>
                <p className={codeStyle}>{algo.complexity}</p>
            </div>
            <AlgoAnimation slug={algo.slug} />
            <CodeBlock
                code={source}
                language={algo.language ?? 'ts'}
                filename={algo.filename}
            />
        </>
    );
}
