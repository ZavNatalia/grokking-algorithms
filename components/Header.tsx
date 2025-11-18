'use client'

import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const BRAND = {
    name: "Algorithms & Data Structures",
    logo: "/logo.svg",
};

const navLinks = [
    {title: 'Главная', href: '/', exact: true},
    {title: 'Алгоритмы', href: '/algorithms'},
    {title: 'Структуры данных', href: '/data-structures'},
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

    const handleToggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
            <header
                className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 shadow-md backdrop-blur-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link
                        href="/"
                        className="relative z-50 inline-flex items-center gap-2 text-sm font-medium text-slate-200"
                    >
                        <Image
                            src={BRAND.logo}
                            alt="Logo"
                            width={24}
                            height={24}
                            className="rounded-full opacity-90"
                        />
                        <span
                            className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-base font-bold text-transparent md:text-xl">
                            {BRAND.name}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-1 md:flex">
                        <ul className="flex gap-1">
                            {navLinks.map(({href, title, exact}) => {
                                const active = isActive(currentPath, href, exact);
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            aria-current={active ? 'page' : undefined}
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                                active
                                                    ? 'bg-blue-500/10 text-blue-400'
                                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                            }`}
                                        >
                                            {title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="relative z-50 rounded-lg p-2 transition-colors hover:bg-slate-800/50 md:hidden"
                        onClick={handleToggleMenu}
                        aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    onClick={handleCloseMenu}
                    aria-hidden="true"
                />
            )}

        {/* Mobile Menu Drawer */}
            <nav
                className={`fixed right-0 top-[73px] z-40 h-[calc(100vh-73px)] w-80 max-w-[85vw] border-l border-slate-800/50 bg-slate-900 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                aria-label="Мобильное меню"
            >
                <div className="flex h-full flex-col">
                    {/* Navigation Links */}
                    <ul className="flex flex-col space-y-2 p-6">
                        {navLinks.map(({href, title, exact}) => {
                            const active = isActive(currentPath, href, exact);
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        aria-current={active ? 'page' : undefined}
                                        className={`block min-w-fit rounded-lg px-4 py-3 text-base font-medium transition-all ${
                                            active
                                                ? 'border border-blue-500/20 bg-blue-500/10 text-blue-400'
                                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                        }`}
                                        onClick={handleCloseMenu}
                                    >
                                        {title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Footer Section */}
                    <div className="mt-auto border-t border-slate-800/50 p-6">
                        <a
                            href="https://github.com/ZavNatalia/grokking-algorithms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-200"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="text-sm">GitHub</span>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}