'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { DSItemView } from '@/lib/ds/types';
import DSContent from '@/components/ds/DSContent';

export function DSTabs({ items }: { items: DSItemView[] }) {
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
            <aside className="lg:sticky lg:top-24 h-max">
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
            <DSContent current={current}/>
        </div>
    );
}
