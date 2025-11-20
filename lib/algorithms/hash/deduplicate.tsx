import * as React from 'react';
import type { Algorithm } from '../types';

// Немутирующее удаление дубликатов с сохранением порядка первого появления
function dedupIterative<T>(arr: T[]): T[] {
    const seen = new Set<T>();
    const res: T[] = [];
    for (const x of arr) {
        if (!seen.has(x)) {
            seen.add(x);
            res.push(x);
        }
    }
    return res;
}

// Короткая версия через Set (то же поведение)
function dedupWithSet<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

const tests = [
    ['a', 'b', 'a', 'c', 'b'],
    [3, 1, 3, 2, 2, 1],
    [],
    [1, 1, 1, 1],
] as const;

const algo = {
    slug: 'hash-deduplicate',
    title: 'Хеш-таблица: удаление дубликатов (Deduplicate)',
    description: (
        <>
            Использует хеш-таблицу (в JS – <code>Set</code>) для отметки «уже
            встречено». Идём слева направо: если элемента ещё нет в множестве –
            добавляем в результат и помечаем как «seen»; если был – пропускаем.
            В итоге получаем массив без дубликатов, сохраняя порядок первого
            появления. Эквивалент короткой записи <code>[...new Set(arr)]</code>
            .
        </>
    ),
    complexity: (
        <>
            Время – <code>O(n)</code> в среднем, Память – <code>O(n)</code>
        </>
    ),
    filename: 'deduplicate.ts',
    language: 'ts',
    buildSource: () => {
        const calls = tests
            .map((arr) => {
                const input = JSON.stringify(arr);
                const out1 = JSON.stringify(
                    dedupIterative(
                        arr as readonly (number | string)[] as (
                            | number
                            | string
                        )[]
                    )
                );
                const out2 = JSON.stringify(
                    dedupWithSet(
                        arr as readonly (number | string)[] as (
                            | number
                            | string
                        )[]
                    )
                );
                return `dedupIterative(${input}) // -> ${out1}\ndedupWithSet(${input}) // -> ${out2}`;
            })
            .join('\n\n');

        return `
// Удаление дубликатов с сохранением порядка первого появления
function dedupIterative<T>(arr: T[]): T[] {
    const seen = new Set<T>();
    const res: T[] = [];
    for (const x of arr) {
        if (!seen.has(x)) {
            seen.add(x);
            res.push(x);
        }
}
return res;
}

// Короткая версия через Set
function dedupWithSet<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

${calls}
`;
    },
} satisfies Algorithm;

export default algo;
