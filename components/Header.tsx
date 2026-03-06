import Link from 'next/link';
import Image from 'next/image';
import HeaderNav from '@/components/HeaderNav';

const navLinks = [
    { title: 'Главная', href: '/', exact: true },
    { title: 'Структуры данных', href: '/data-structures' },
    { title: 'Алгоритмы', href: '/algorithms' },
];

const GITHUB_URL = 'https://github.com/ZavNatalia/grokking-algorithms';

export default function Header() {
    return (
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
                        src="/logo.svg"
                        alt="Алгоритмы и структуры данных"
                        width={32}
                        height={32}
                        className="hidden rounded-full opacity-90 dark:block"
                    />
                    <span className="font-mono text-lg font-bold md:text-xl text-slate-500 dark:text-slate-400">
                        Алгоритмы и структуры данных
                    </span>
                </Link>
                <HeaderNav navLinks={navLinks} githubUrl={GITHUB_URL} />
            </div>
        </header>
    );
}
