'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { CodeBlock } from '@/components/CodeBlock';
import type { DSItemView } from '@/lib/ds/types';

export function DSTabsVertical({ items }: { items: DSItemView[] }) {
    const slugs = useMemo(() => items.map(i => i.slug), [items]);
    const initial = slugs[0] ?? '';
    const [active, setActive] = useState<string>(initial);
    const tabRefs = useRef<HTMLButtonElement[]>([]);

    useEffect(() => {
        const h = window.location.hash.slice(1);
        if (slugs.includes(h)) setActive(h);
        const onHash = () => {
            const hh = window.location.hash.slice(1);
            if (slugs.includes(hh)) setActive(hh);
        };
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, [slugs]);

    useEffect(() => {
        if (active) history.replaceState(null, '', `#${active}`);
    }, [active]);

    useEffect(() => {
        const i = slugs.indexOf(active);
        if (i >= 0) tabRefs.current[i]?.scrollIntoView({ block: 'nearest' });
    }, [active, slugs]);


    const idx = slugs.indexOf(active);
    const current = items[idx >= 0 ? idx : 0];

    return (
        <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[360px_minmax(0,1fr)">
            <aside className="lg:sticky lg:top-6 h-max">
                <ul role="tablist" aria-orientation="vertical" className="space-y-2">
                    {items.map((ds, i) => {
                        const selected = ds.slug === active;
                        return (
                            <li key={ds.slug}>
                                <button
                                    ref={el => {
                                        if (el) tabRefs.current[i] = el;
                                    }}
                                    role="tab"
                                    aria-selected={selected}
                                    aria-controls={`panel-${ds.slug}`}
                                    id={`tab-${ds.slug}`}
                                    className={[
                                        'w-full rounded-xl px-3 py-2 text-left transition cursor-pointer',
                                        selected ? 'bg-slate-800 text-white' : 'bg-slate-800/40 hover:bg-slate-800/60'
                                    ].join(' ')}
                                    onClick={() => setActive(ds.slug)}
                                    onKeyDown={(e) => {
                                        const i = slugs.indexOf(active);
                                        if (e.key === 'ArrowDown') setActive(slugs[(i + 1) % slugs.length]);
                                        if (e.key === 'ArrowUp') setActive(slugs[(i - 1 + slugs.length) % slugs.length]);
                                    }}
                                >
                                    {ds.title}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </aside>

            <section
                role="tabpanel"
                id={`panel-${current.slug}`}
                aria-labelledby={`tab-${current.slug}`}
                className="min-w-0 rounded-2xl border border-white/10 bg-slate-800/40 p-4"
            >
                <h2 className="mb-2 text-xl font-semibold">{current.title}</h2>
                <p className="mb-3 text-sm opacity-90">{current.definition}</p>

                <ul className="mb-3 flex flex-wrap gap-2">
                    {current.useWhen.map((t, j) => (
                        <li key={j} className="rounded-xl border border-white/10 bg-slate-700/40 px-2 py-0.5 text-[11px] uppercase">
                            {t}
                        </li>
                    ))}
                </ul>

                <div className="mb-3 overflow-x-auto">
                    <table className="w-full text-xs">
                        <tbody>
                        {current.complexity.map((r, k) => (
                            <tr key={k} className="odd:bg-slate-800/30">
                                <td className="px-2 py-1 opacity-80 whitespace-nowrap">{r.op}</td>
                                <td className="px-2 py-1 font-mono">{r.bigO}</td>
                                <td className="px-2 py-1 opacity-70">{r.note ?? ''}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <CodeBlock code={current.source} language={current.language} filename={current.filename} />
            </section>
        </div>
    );
}
