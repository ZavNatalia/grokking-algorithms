import React from 'react';

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
        gradient: 'from-blue-500/20 to-blue-600/20',
        iconColor: 'text-blue-400',
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
        gradient: 'from-purple-500/20 to-purple-600/20',
        iconColor: 'text-purple-400',
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
        gradient: 'from-pink-500/20 to-pink-600/20',
        iconColor: 'text-pink-400',
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
                    className="p-6 rounded-2xl bg-slate-800/20 border border-slate-800/50"
                >
                    <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 transition-transform`}
                    >
                        <svg
                            className={`w-6 h-6 ${feature.iconColor}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {feature.icon}
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                        {feature.title}
                    </h3>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        {feature.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
