const features = [
    {
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
        ),
        title: 'Структуры данных',
        description:
            'Массивы, списки, деревья, графы, хеш-таблицы и куча — всё с примерами кода',
    },
    {
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
            />
        ),
        title: 'Алгоритмы',
        description:
            'Сортировки, поиск, обходы графов, динамическое программирование',
    },
    {
        icon: (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
        ),
        title: 'Примеры кода',
        description:
            'Читаемый TypeScript с комментариями и пояснениями асимптотики',
    },
];

export default function Features() {
    return (
        <div className="grid md:grid-cols-3 gap-6 mt-8 lg:mt-24">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="p-6 rounded-xl bg-white border border-slate-200 dark:bg-slate-900/50 dark:border-slate-800/50"
                >
                    <div
                        className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4 dark:bg-slate-800"
                    >
                        <svg
                            className="w-5 h-5 text-violet-600 dark:text-violet-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {feature.icon}
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">
                        {feature.title}
                    </h3>
                    <p className="text-xl text-slate-500 leading-relaxed dark:text-slate-400">
                        {feature.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
