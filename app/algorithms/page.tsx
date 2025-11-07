import Link from 'next/link';
import { algorithms } from '@/lib/algorithms';

export default function Page() {
    return (
        <section className="mx-auto max-w-2xl">
            <h1 className="mb-4 text-center text-3xl font-semibold">Алгоритмы</h1>
            <ul className="grid gap-3 sm:grid-cols-2">
                {algorithms.map(a => (
                    <li key={a.slug}>
                        <Link
                            href={`/algorithms/${a.slug}`}
                            className="block rounded-2xl border border-slate-700/50 p-4 hover:bg-slate-800/30"
                        >
                            <div className="font-medium">{a.title}</div>
                            <div className="text-xs opacity-70">Сложность: {a.complexity}</div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
