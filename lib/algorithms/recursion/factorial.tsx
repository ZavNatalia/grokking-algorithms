import React from 'react';
import type { Algorithm } from '../types';

function factorial(n: number): number {
    if (n < 0) throw new Error('n must be >= 0');
    return n <= 1 ? 1 : n * factorial(n - 1);
}

const tests = [0, 1, 5, 7] as const;

const algo = {
    slug: 'recursion-factorial',
    title: 'Рекурсия: факториал',
    description: (
        <>
            <p>Рекурсивная функция вызывает саму себя.</p>
            <p>
                Функция по нахождению факториала вычисляет <code>n!</code>{' '}
                рекурсивно. База: <code>0! = 1</code>, <code>1!= 1</code>.
            </p>
            <p>
                Для <code>n &gt; 1</code> возвращает
                <code>n * factorial(n - 1)</code>. Рекурсия последовательно
                уменьшает <code>n</code> до базы и затем «разворачивается»
                произведениями.
            </p>
        </>
    ),
    complexity: (
        <>
            Время – <code>O(n)</code>, Память (стек) – <code>O(n)</code>
        </>
    ),
    filename: 'factorial.ts',
    language: 'ts',
    buildSource: () => {
        const calls = tests
            .map((n) => `factorial(${n}) // -> ${factorial(n)}`)
            .join('\n');
        return `function factorial(n: number): number {
    if (n < 0) throw new Error('n must be >= 0');
    return n <= 1 ? 1 : n * factorial(n - 1);
}

${calls}
    `;
    },
} satisfies Algorithm;
export default algo;
