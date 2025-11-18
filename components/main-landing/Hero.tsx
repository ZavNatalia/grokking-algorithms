import Link from 'next/link';
import React from 'react';

export default function Hero() {
    return (
        <div className="max-w-3xl">
            <div
                className="pointer-events-none inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-gray-400 text-xs italic mb-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
                По мотивам «Грокаем алгоритмы» Адитьи Бхаргавы
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                Изучайте алгоритмы{' '}
                <span
                    className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                наглядно
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-6 leading-relaxed">
                Интерактивное пособие по структурам данных и алгоритмам.
                Определения, асимптотики, примеры кода на TypeScript — всё в одном месте.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/data-structures" title='Структуры данных'
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
                >
                <span className="flex items-center justify-center gap-2">
                  Структуры данных
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none"
                       viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </span>
                </Link>
                <Link
                    href="/algorithms" title='Алгоритмы'
                    className="px-8 py-4 bg-slate-800/50 text-center hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-xl font-semibold transition-all"
                >
                    Алгоритмы
                </Link>
            </div>
        </div>
    )
}