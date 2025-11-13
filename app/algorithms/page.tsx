import Link from 'next/link';
import { ALGORITHM_CATEGORIES } from '@/lib/algorithms';

export default function AlgorithmsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-center text-3xl font-semibold">Алгоритмы</h1>
            {ALGORITHM_CATEGORIES.map(group => (
                <section key={group.id} className="scroll-mt-16 space-y-3">
                    <h2 className="text-xl font-semibold">
                        {group.title} <span className="text-sm opacity-60">({group.items.length})</span>
                    </h2>
                    <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {group.items.map(a => (
                            <li key={a.slug}>
                                <Link
                                    href={`/algorithms/${a.slug}`}
                                    className="block rounded-2xl border border-white/10 bg-slate-800/40 p-4 hover:bg-slate-800/70 transition"
                                >
                                    <div className="font-medium">{a.title}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <hr className="border-slate-700/60"/>
                </section>
            ))}
        </div>
    );
}
