import React from 'react';
import type { Algorithm } from '@/lib/algorithms/types';

function quicksort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr.slice();
    }
    const pivot = arr[Math.floor(arr.length / 2)]; // pivot - опорный элемент
    const less = [];
    const equal = [];
    const greater = [];
    for (const i of arr) {
        if (i < pivot) less.push(i);
        else if (i > pivot) greater.push(i);
        else equal.push(i);
    }
    return [...quicksort(less), ...equal, ...quicksort(greater)];
}

const tests: number[][] = [[10, 5, 2, 3], [10, -2, 7, 7, 0, 4], [], [1]];


const algo = {
    slug: 'quicksort',
    title: 'Быстрая сортировка (Quicksort)',
    description: (
        <>
            Алгоритм сортировки, который использует принцип &quot;разделяй и властвуй&quot;. Для этого он рекурсивно делит массив
            на две части, выбирая опорный элемент <code>pivot</code>. Затем все элементы меньше опорного перемещаются в один
            подмассив, а все элементы больше — в другой. Затем рекурсивно сортируются
            левый и правый подмассивы и объединяются: <code>[quickSort(left), equal, quickSort(right)]</code>.
        </>
    ),
    complexity: (
        <>
            Время — <code>O(n&nbsp;log&nbsp;n)</code> в среднем, <code>O(n^2)</code> в худшем;
            Память — <code>O(n)</code> для результата + стек <code>O(log&nbsp;n)</code> в среднем.
        </>
    ),
    filename: 'quicksort.ts',
    language: 'ts',
    buildSource: () => {
        const calls = tests.map(a =>
            `quicksort(${JSON.stringify(a)}) // -> ${JSON.stringify(quicksort(a))}`
        ).join('\n');
        return (`function quicksort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr.slice();
    }
    const pivot = arr[Math.floor(arr.length / 2)]; // pivot - опорный элемент
    const less = [];
    const equal = [];
    const greater = [];
    for (const i of arr) {
        if (i < pivot) less.push(i);
        else if (i > pivot) greater.push(i);
        else equal.push(i);
    }
    return [...quicksort(less), ...equal, ...quicksort(greater)];
}

${calls}
    `);
    },
} satisfies Algorithm;
export default algo;
