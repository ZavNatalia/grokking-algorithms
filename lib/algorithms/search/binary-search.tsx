import React from 'react';
import { Algorithm } from '../types';

function binarySearch(arr: number[], target: number): number {
    let low = 0,
        high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const guess = arr[mid];
        if (guess === target) return mid;
        if (guess > target) high = mid - 1;
        else low = mid + 1;
    }
    return -1;
}

const data = [11, 33, 55, 77, 99];
const tests = [11, 33, 99, 42];

const algo = {
    slug: 'binary-search',
    title: 'Бинарный поиск (Binary Search)',
    description: (
        <>
            Ищет значение в отсортированном по возрастанию массиве. Поддерживает
            диапазон <code>[low, high]</code>, на каждом шаге берёт середину
            <code>mid</code> и сравнивает <code>arr[mid]</code> с target: при{' '}
            <code>&gt;</code> сдвигает правую границу, при
            <code>&lt;</code> – левую, при <code>===</code> – возвращает индекс.
            Останавливается, когда <code>low &gt; high</code> (элемент
            отсутствует).
        </>
    ),
    complexity: (
        <>
            Время – <code>O(log n)</code>, Память – <code>O(1)</code>
        </>
    ),
    filename: 'binary-search.ts',
    language: 'ts',
    buildSource: () => {
        const calls = tests
            .map(
                (t) =>
                    `binarySearch(myList, ${t}) // index -> ${binarySearch(data, t)}`
            )
            .join('\n');
        return `function binarySearch(arr: number[], target: number): number {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const guess = arr[mid];
        if (guess === target) return mid;
        if (guess > target) high = mid - 1; else low = mid + 1;
    }
    return -1;
}

const myList = ${JSON.stringify(data)};
${calls}
    `;
    },
} satisfies Algorithm;

export default algo;
