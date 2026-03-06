'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import GitHubIcon from '@/components/icons/GitHubIcon';
import clsx from 'clsx';

const BRAND = {
    name: 'Алгоритмы и структуры данных',
    logo: '/logo.svg',
};

const navLinks = [
    { title: 'Главная', href: '/', exact: true },
    { title: 'Структуры данных', href: '/data-structures' },
    { title: 'Алгоритмы', href: '/algorithms' },
];

const normalize = (p: string) => (p === '/' ? '/' : p.replace(/\/+$/, ''));

function isActive(path: string, href: string, exact?: boolean) {
    const a = normalize(path);
    const b = normalize(href);
    if (exact) return a === b;
    return a === b || a.startsWith(b + '/');
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = usePathname();

    // Блокировка скролла при открытом меню
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    const handleToggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 shadow-md backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-950/80">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="relative z-50 inline-flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200"
                    >
                        <Image
                            src="/logo-light.svg"
                            alt="Алгоритмы и структуры данных"
                            width={32}
                            height={32}
                            className="rounded-full opacity-90 dark:hidden"
                        />
                        <Image
                            src={BRAND.logo}
                            alt="Алгоритмы и структуры данных"
                            width={32}
                            height={32}
                            className="hidden rounded-full opacity-90 dark:block"
                        />
                        <span className="font-mono text-lg font-bold md:text-xl text-slate-500 dark:text-slate-400">
                            Алгоритмы и структуры данных
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 md:flex">
                        <ul className="flex gap-1 items-center">
                            {navLinks.map(({ href, title, exact }) => {
                                const active = isActive(
                                    currentPath,
                                    href,
                                    exact
                                );
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            aria-current={
                                                active ? 'page' : undefined
                                            }
                                            className={clsx(
                                                'rounded-lg px-4 py-2 font-medium transition-all text-lg',
                                                active
                                                    ? 'text-violet-600 dark:text-violet-400'
                                                    : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                                            )}
                                        >
                                            {title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <ThemeToggle />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="relative z-50 cursor-pointer rounded-lg p-2 transition-colors hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:hover:bg-slate-800/50 md:hidden"
                        onClick={handleToggleMenu}
                        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm dark:bg-black/60 md:hidden"
                    onClick={handleCloseMenu}
                    aria-hidden="true"
                />
            )}

            {/* Mobile Menu Drawer */}
            <nav
                className={clsx(
                    'fixed right-0 top-[73px] z-40 h-[calc(100vh-73px)] w-80 max-w-[85vw] border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-slate-800/50 dark:bg-slate-900 md:hidden',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                )}
                aria-label="Мобильное меню"
            >
                <div className="flex h-full flex-col">
                    {/* Navigation Links */}
                    <ul className="flex flex-col space-y-2 p-6">
                        {navLinks.map(({ href, title, exact }) => {
                            const active = isActive(currentPath, href, exact);
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        aria-current={
                                            active ? 'page' : undefined
                                        }
                                        className={clsx(
                                            'block min-w-fit rounded-lg px-4 py-3 text-base font-medium transition-all',
                                            active
                                                ? 'border border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-400'
                                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                                        )}
                                        onClick={handleCloseMenu}
                                    >
                                        {title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Footer Section */}
                    <div className="mt-auto border-t border-slate-200 p-6 dark:border-slate-800/50">
                        <a
                            href="https://github.com/ZavNatalia/grokking-algorithms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                        >
                            <GitHubIcon className="h-6 w-6" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}
