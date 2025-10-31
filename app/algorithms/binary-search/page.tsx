import { BackButton } from '@/components/BackButton';
import { CodeBlock } from '@/components/CodeBlock';

const myList = [11, 33, 55, 77, 99];
const tests = [11, 33, 99, 42]; // 42 — пример «не найдено»

const binarySearch = (arr: number[], target: number) => {
    let lowIndex = 0;
    let highIndex = arr.length - 1;
    while (lowIndex <= highIndex) {
        const middleIndex = Math.floor((lowIndex + highIndex) / 2);
        const guess = arr[middleIndex];
        if (guess === target) return middleIndex;
        if (guess > target) highIndex = middleIndex - 1;
        else lowIndex = middleIndex + 1;
    }
    return -1;
};

export default function Page() {
    const calls = tests
        .map(t => `binarySearch(myList, ${t}) // index -> ${binarySearch(myList, t)}`)
        .join('\n');

    const source = `
/**
 * Бинарный поиск по отсортированному по возрастанию массиву чисел.
 *
 * @param arr Отсортированный по возрастанию массив чисел.
 * @param target Искомое значение.
 * @returns Индекс (0-based) найденного элемента или -1, если не найден.
 * @complexity Время: O(log n), Память: O(1).
 * @note При дубликатах возвращается индекс одного из равных элементов (не гарантированно первый/последний).
 */
 
function binarySearch(arr: number[], target: number): number {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = arr[mid];
    if (guess === target) return mid;
    if (guess > target) high = mid - 1;
    else low = mid + 1;
  }
  return -1;
}

const myList = ${JSON.stringify(myList, null, 0)};

// Тесты:
${calls}
`.trim();

    return (
        <>
            <BackButton/>
            <h2 className="mb-4 text-center text-xl">Бинарный поиск (Binary Search)</h2>
            <CodeBlock code={source} language="ts" filename="binary-search.ts"/>
        </>
    );
}
