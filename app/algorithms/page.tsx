import Link from 'next/link';
import { ALGORITHM_CATEGORIES } from '@/lib/algorithms';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AlgorithmsPage() {
    return (
        <div className="space-y-6">
            <Breadcrumbs />
            <h1 className="text-center text-3xl font-semibold">Алгоритмы</h1>

            {/* Quick navigation */}
            <nav className="flex flex-wrap justify-center w-full gap-2 lg:max-w-3/4 mx-auto text-sm">
                {ALGORITHM_CATEGORIES.map((group) => (
                    <a
                    key={group.id}
                    href={`#${group.id}`}
                    className="text-center rounded-3xl bg-slate-800/40 px-3 lg:px-4 py-3 lg:py-2 text-slate-400 transition hover:bg-slate-800/60 hover:text-white"
                    >
                {group.title}
                    </a>
                    ))}
            </nav>

            {ALGORITHM_CATEGORIES.map((group) => (
            <section
                key={group.id}
                id={group.id}
                className="scroll-mt-24 space-y-4"
            >
                <h2 className="text-xl font-semibold">
                    {group.title}{' '}
                    <span className="text-sm opacity-60">
                            ({group.items.length})
                        </span>
                </h2>
                <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((a) => (
                        <li key={a.slug}>
                            <Link
                                href={`/algorithms/${a.slug}`}
                                className="block rounded-2xl border border-white/10 bg-slate-800/40 p-4 transition hover:bg-slate-800/70"
                            >
                                <div className="font-medium">{a.title}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
                <hr className="border-slate-700/30" />
            </section>
            ))}
        </div>
    );
}