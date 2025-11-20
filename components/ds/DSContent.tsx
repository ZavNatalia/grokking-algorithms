import { CodeBlock } from '@/components/CodeBlock';
import type { DSItemView } from '@/lib/ds/types';

export default function DSContent({ current }: { current: DSItemView }) {
    return (
        <section
            role="tabpanel"
            id={`panel-${current.slug}`}
            aria-labelledby={`tab-${current.slug}`}
            className="min-w-0 rounded-2xl border border-white/10 bg-slate-800/40 p-4"
        >
            <h2 className="mb-2 text-2xl font-semibold">{current.title}</h2>
            <p className="mb-3 opacity-90 leading-relaxed">{current.definition}</p>

            <ul className="mb-3 flex flex-wrap gap-2">
                {current.useWhen.map((t, j) => (
                    <li
                        key={j}
                        className="rounded-xl border border-white/10 bg-slate-700/40 px-2 py-0.5 text-[11px] uppercase"
                    >
                        {t}
                    </li>
                ))}
            </ul>

            <div className="mb-3 overflow-x-auto">
                <table className="w-fit">
                    <tbody>
                        {current.complexity.map((r, k) => (
                            <tr
                                key={k}
                                className="odd:bg-slate-700/30 bg-slate-700/10"
                            >
                                <td className="px-2 py-1 opacity-80 whitespace-nowrap italic">
                                    {r.op}
                                </td>
                                <td className="px-2 py-1 font-mono">
                                    {r.bigO}
                                </td>
                                <td className="px-2 py-1 opacity-70">
                                    {r.note ?? ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CodeBlock
                code={current.source}
                language={current.language}
                filename={current.filename}
            />
        </section>
    );
}
