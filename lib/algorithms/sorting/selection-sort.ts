import { defineAlgorithm } from '../types';

function findSmallest(arr: number[]): number {
    let s = arr[0], si = 0;
    for (let i = 1; i < arr.length; i++) if (arr[i] < s) { s = arr[i]; si = i; }
    return si;
}
function selectionSort(arr: number[]): number[] {
    const res: number[] = [], copy = [...arr];
    while (copy.length) res.push(copy.splice(findSmallest(copy), 1)[0]);
    return res;
}

const tests: number[][] = [[100,9,14,6,0],[8,3,2,7,11]];

export default defineAlgorithm({
    slug: 'selection-sort',
    title: 'Сортировка выбором (Selection Sort)',
    description: 'Проходит позиции i слева направо; для каждой ищет минимум в хвосте [i..end] и ставит его на место i (swap). В немутирующей версии минимум каждый раз вырезается из копии массива и добавляется в новый результат. Время всегда O(n²); память – O(1) для in-place и O(n) для версии с копированием. In-place реализация неустойчива, вариант с копией – устойчив.',
    complexity: 'Время: O(n^2), Память: O(n)',
    filename: 'selection-sort.ts',
    language: 'ts',
    buildSource: () => {
        const calls = tests.map(a =>
            `selectionSort(${JSON.stringify(a)}) // -> ${JSON.stringify(selectionSort(a))}`
        ).join('\n');
        return (`function selectionSort(arr: number[]): number[] {
    const res: number[] = [], copy = [...arr];
    while (copy.length) {
        let min = 0;
        for (let i = 1; i < copy.length; i++) if (copy[i] < copy[min]) min = i;
        res.push(copy.splice(min, 1)[0]);
    }
    return res;
}

${calls}
    `);
    },
});
