import Link from "next/link";

const algorithms = [
    {title: "Бинарный поиск (Binary Search)", href: "/algorithms/binary-search"},
    {title: "Сортировка выбором (Selection Sort)", href: "/algorithms/selection-sort"},
] as const;

export default function Page() {
    return (
        <section aria-labelledby="algorithms-heading" className="mx-auto max-w-2xl">
            <h1 id="algorithms-heading" className="mb-4 text-center text-3xl font-semibold">
                Алгоритмы
            </h1>

            <ul role="list" className="grid gap-3 sm:grid-cols-2">
                {algorithms.map(({title, href}) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className="group block rounded-2xl border border-slate-700/50 p-4 transition
                         hover:border-slate-500 hover:bg-slate-800/40
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                        >
              <span className="flex items-center justify-between">
                <span className="font-medium">{title}</span>
                <span
                    aria-hidden
                    className="translate-x-0 transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
