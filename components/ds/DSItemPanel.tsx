import { CodeBlock } from '@/components/CodeBlock';
import type { DSItem } from '@/lib/ds';

export function DSItemPanel({ ds }: { ds: DSItem }) {
    const codeStyle = '[&_code]:rounded [&_code]:bg-slate-800/40\n' +
        '                [&_code]:px-1.5 [&_code]:py-[1px]\n' +
        '                [&_code]:font-mono [&_code]:text-[0.95em]'

    return (
        <details className="group rounded-2xl border border-white/10 bg-slate-700/10 hover:shadow-lg">
            <summary className="flex items-center justify-between cursor-pointer p-4">
                <span className="text-lg font-semibold">{ds.title}</span>
                <svg
                    className="h-5 w-5 transition-transform group-open:-rotate-180 opacity-70"
                    viewBox="0 0 20 20" fill="currentColor"
                >
                    <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.4a.75.75 0 0 1-1.08 0l-4.25-4.4a.75.75 0 0 1 .02-1.06z"/>
                </svg>
            </summary>

            <div className="px-4 pb-4 space-y-3">
                <p className={codeStyle + ' text-base opacity-90'}>{ds.definition}</p>
                <p className={codeStyle + ' text-base opacity-90'}>Тип: {ds.type}</p>
                <ul className="flex flex-wrap gap-2">
                    {ds.useWhen.map((t, i) => (
                        <li key={i} className="rounded-xl border border-white/10 bg-slate-700/40 px-2 py-0.5 text-[11px] uppercase tracking-wide">
                            {t}
                        </li>
                    ))}
                </ul>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <tbody>
                        {ds.complexity.map((r, i) => (
                            <tr key={i} className="odd:bg-slate-800/30">
                                <td className="px-2 py-1 opacity-80 whitespace-nowrap">{r.op}</td>
                                <td className="px-2 py-1 font-mono">{r.bigO}</td>
                                <td className="px-2 py-1 opacity-70">{r.note ?? ''}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <CodeBlock code={ds.buildSource()} language={ds.language} filename={ds.filename}/>
            </div>
        </details>
    );
}
