import type { Algorithm } from '@/lib/algorithms/types';

function findSmallest(arr: number[]): number {
    let s = arr[0], si = 0;
    for (let i = 1; i < arr.length; i++) if (arr[i] < s) {
        s = arr[i];
        si = i;
    }
    return si;
}

function selectionSort(arr: number[]): number[] {
    const res: number[] = [], copy = [...arr];
    while (copy.length) res.push(copy.splice(findSmallest(copy), 1)[0]);
    return res;
}

const tests: number[][] = [[100, 9, 14, 6, 0], [8, 3, 2, 7, 11]];

const algo = {
    slug: 'selection-sort',
    title: 'Сортировка выбором (Selection Sort)',
    description: (
        <>
            Проходит позиции <code>i</code> слева направо; для каждой ищет <span className='italic'>минимум</span> в
            хвосте <code>[i..end]</code> и ставит его на место <code>i</code> (swap).
            В немутирующей версии <span className='italic'>минимум</span> каждый раз вырезается из копии массива и
            добавляется в новый результат.
        </>
    ),
    complexity: (
        <>
            Время – <code>(n^2)</code>, Память – <code>O(n)</code>
        </>
    ),
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
} satisfies Algorithm;
export default algo;
