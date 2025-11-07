import { defineAlgorithm } from '../types';

function factorial(n: number): number {
    if (n < 0) throw new Error('n must be >= 0');
    return n <= 1 ? 1 : n * factorial(n - 1);
}
const tests = [0, 1, 5, 7];

export default defineAlgorithm({
    slug: 'recursion-factorial',
    title: 'Рекурсия: факториал',
    description: 'Рекурсивная функция вызывает саму себя. Функция по нахождению факториала вычисляет n! рекурсивно: база 0! = 1, 1! = 1; для n > 1 возвращает n * factorial(n - 1). Рекурсия последовательно уменьшает n до базы и затем «разворачивается» произведениями. Время O(n), стек O(n). Определено для целых n ≥ 0; для больших n возможны переполнения.',
    complexity: 'Время: O(n), Память (стек): O(n)',
    filename: 'factorial.ts',
    language: 'ts',
    buildSource: () => {
        const calls = tests.map(n => `factorial(${n}) // -> ${factorial(n)}`).join('\n');
        return (`function factorial(n: number): number {
    if (n < 0) throw new Error('n must be >= 0');
    return n <= 1 ? 1 : n * factorial(n - 1);
}

${calls}
    `);
    },
});
