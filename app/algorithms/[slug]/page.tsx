import { notFound } from 'next/navigation';
import { CodeBlock } from '@/components/CodeBlock';
import { algorithms, algoBySlug } from '@/lib/algorithms';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
    return algorithms.map((a) => ({ slug: a.slug }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const algo = await algoBySlug[slug];
    if (!algo) return notFound();

    const source = algo.buildSource();

    const codeStyle =
        '[&_code]:rounded [&_code]:bg-slate-800/40\n' +
        '                [&_code]:px-1.5 [&_code]:py-[1px]\n' +
        '                [&_code]:font-mono [&_code]:text-[0.95em]';

    return (
        <>
            <Breadcrumbs currentTitle={algo.title} />
            <h2 className="my-4 text-center text-2xl mx-auto max-w-2xl">
                {algo.title}
            </h2>
            <div className={codeStyle + ' mb-4 opacity-80 space-y-1'}>
                {algo.description}
            </div>
            <div className={'opacity-80'}>
                <b>Сложность:</b>
                <p className={codeStyle}>{algo.complexity}</p>
            </div>
            <CodeBlock
                code={source}
                language={algo.language ?? 'ts'}
                filename={algo.filename}
            />
        </>
    );
}
