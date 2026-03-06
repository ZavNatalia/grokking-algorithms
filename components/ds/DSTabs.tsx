'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import type { DSItemView } from '@/lib/ds/types';
import DSContent from '@/components/ds/DSContent';

export function DSTabs({ items }: { items: DSItemView[] }) {
    const slugs = useMemo(() => items.map((i) => i.slug), [items]);
    const initial = slugs[0] ?? '';

    const [active, setActive] = useState<string>(initial);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const tabRefs = useRef<HTMLButtonElement[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Читаем hash при монтировании и слушаем изменения
    useEffect(() => {
        const syncHash = () => {
            const h = window.location.hash.slice(1);
            if (slugs.includes(h)) setActive(h);
        };
        syncHash();
        window.addEventListener('hashchange', syncHash);
        return () => window.removeEventListener('hashchange', syncHash);
    }, [slugs]);

    // Обновляем hash в URL
    useEffect(() => {
        if (active && window.location.hash.slice(1) !== active) {
            history.replaceState(null, '', `#${active}`);
        }
    }, [active]);

    // Скроллим активную кнопку в видимую область (только desktop)
    useEffect(() => {
        const i = slugs.indexOf(active);
        if (i >= 0)
            tabRefs.current[i]?.scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            });
    }, [active, slugs]);

    // Закрываем dropdown при клике вне
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const idx = slugs.indexOf(active);
    const current: DSItemView = items[idx >= 0 ? idx : 0];

    const handleSelect = (slug: string) => {
        setActive(slug);
        setIsDropdownOpen(false);
    };

    return (
        <div className="grid gap-4 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
            {/* Mobile Dropdown */}
            <div ref={dropdownRef} className="relative lg:hidden">
                <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-slate-200 px-4 py-3 text-left text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:bg-slate-800 dark:text-white"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="listbox"
                >
                    <span>{current.title}</span>
                    <svg
                        className={clsx('h-5 w-5 transition-transform', isDropdownOpen && 'rotate-180')}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
                {isDropdownOpen && (
                    <ul
                        role="listbox"
                        className="absolute z-20 mt-1 h-fit max-h-[520px] w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-500 dark:bg-slate-950"
                    >
                        {items.map((ds) => {
                            const selected = ds.slug === active;
                            return (
                                <li key={ds.slug}>
                                    <button
                                        role="option"
                                        aria-selected={selected}
                                        className={clsx(
                                            'w-full cursor-pointer px-4 py-2 text-left text-lg transition focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500',
                                            selected
                                                ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white'
                                        )}
                                        onClick={() => handleSelect(ds.slug)}
                                    >
                                        {ds.title}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden h-max lg:sticky lg:top-24 lg:block">
                <ul
                    role="tablist"
                    aria-orientation="vertical"
                    className="space-y-2"
                >
                    {items.map((ds, i) => {
                        const selected = ds.slug === active;
                        return (
                            <li key={ds.slug}>
                                <button
                                    ref={(el) => {
                                        if (el) tabRefs.current[i] = el;
                                    }}
                                    role="tab"
                                    aria-selected={selected}
                                    aria-controls={`panel-${ds.slug}`}
                                    id={`tab-${ds.slug}`}
                                    className={clsx(
                                        'w-full cursor-pointer rounded-xl px-3 py-2 text-left text-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500',
                                        selected
                                            ? 'bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white'
                                            : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800/60'
                                    )}
                                    onClick={() => setActive(ds.slug)}
                                    onKeyDown={(e) => {
                                        const cur = slugs.indexOf(active);
                                        let next = -1;
                                        if (e.key === 'ArrowDown') next = (cur + 1) % slugs.length;
                                        if (e.key === 'ArrowUp') next = (cur - 1 + slugs.length) % slugs.length;
                                        if (e.key === 'Home') next = 0;
                                        if (e.key === 'End') next = slugs.length - 1;
                                        if (next >= 0) {
                                            e.preventDefault();
                                            setActive(slugs[next]);
                                            tabRefs.current[next]?.focus();
                                        }
                                    }}
                                >
                                    {ds.title}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </aside>

            <DSContent current={current} />
        </div>
    );
}
