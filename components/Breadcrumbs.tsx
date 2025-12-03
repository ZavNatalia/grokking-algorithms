'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pathNames: Record<string, string> = {
    algorithms: 'Алгоритмы',
    'data-structures': 'Структуры данных',
};

interface BreadcrumbsProps {
    currentTitle?: string;
}

export default function Breadcrumbs({ currentTitle }: BreadcrumbsProps) {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0) return null;

    const breadcrumbs = segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        const label =
            isLast && currentTitle
                ? currentTitle
                : pathNames[segment] || decodeURIComponent(segment);

        return { href, label, isLast };
    });

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-base text-slate-400">
                <li>
                    <Link
                        href="/"
                        className="transition-colors hover:text-slate-200"
                    >
                        Главная
                    </Link>
                </li>
                {breadcrumbs.map(({ href, label, isLast }) => (
                    <li key={href} className="flex items-center gap-2">
                        <span aria-hidden="true">/</span>
                        {isLast ? (
                            <span
                                className="text-slate-200"
                                aria-current="page"
                            >
                                {label}
                            </span>
                        ) : (
                            <Link
                                href={href}
                                className="transition-colors hover:text-slate-200"
                            >
                                {label}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
