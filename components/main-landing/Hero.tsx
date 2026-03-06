import Link from 'next/link';

export default function Hero() {
    return (
        <div className="max-w-3xl">
            <div className="pointer-events-none inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-base mb-4 dark:bg-slate-800/60 dark:border-slate-700/50 dark:text-slate-400">
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                По мотивам «Грокаем алгоритмы» Адитьи Бхаргавы
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Изучайте алгоритмы{' '}
                <span className="text-violet-600 dark:text-violet-400">
                    наглядно
                </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 mb-6 leading-relaxed dark:text-slate-400">
                Интерактивное пособие по структурам данных и алгоритмам.
                Определения, асимптотики, примеры кода на TypeScript — всё в
                одном месте.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/data-structures"
                    title="Структуры данных"
                    className="group px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold transition-colors text-white"
                >
                    <span className="flex items-center justify-center gap-2">
                        Структуры данных
                        <svg
                            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </span>
                </Link>
                <Link
                    href="/algorithms"
                    title="Алгоритмы"
                    className="px-8 py-4 bg-slate-100 text-center hover:bg-slate-200 border border-slate-300 hover:border-slate-400 rounded-xl font-semibold transition-colors text-slate-800 dark:bg-slate-800/50 dark:hover:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600 dark:text-slate-200"
                >
                    Алгоритмы
                </Link>
            </div>
        </div>
    );
}
