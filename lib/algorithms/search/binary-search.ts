import { defineAlgorithm } from '../types';

function binarySearch(arr: number[], target: number): number {
    let low = 0, high = arr.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const guess = arr[mid];
        if (guess === target) return mid;
        if (guess > target) high = mid - 1; else low = mid + 1;
    }
    return -1;
}

const data = [11, 33, 55, 77, 99];
const tests = [11, 33, 99, 42];

export default defineAlgorithm({
    slug: 'binary-search',
    title: 'Бинарный поиск (Binary Search)',
    description: 'Ищет значение в отсортированном по возрастанию массиве. Поддерживает диапазон [low, high], на каждом шаге берёт середину mid и сравнивает arr[mid] с target: при > сдвигает правую границу, при < – левую, при === – возвращает индекс. Останавливается, когда low > high (элемент отсутствует).',
    complexity: 'Время: O(log n), Память: O(1)',
    filename: 'binary-search.ts',
    language: 'ts',
    buildSource: () => {
        const calls = tests.map(t => `binarySearch(myList, ${t}) // index -> ${binarySearch(data, t)}`).join('\n');
        return (`function binarySearch(arr: number[], target: number): number {
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
    `);
    },
});
