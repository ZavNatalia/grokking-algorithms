import React from "react";
import { BackButton } from '@/components/BackButton';
import { CodeBlock } from '@/components/CodeBlock';

const findSmallest = (arr) => {
    let smallest = arr[0];
    let smallestIndex = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
            smallestIndex = i;
        }
    }
    return smallestIndex;
}
const selectionSort = (arr) => {
    const newArr = [];
    const copiedArr = [...arr];
    while (copiedArr.length > 0) {
        const smallestIndex = findSmallest(copiedArr);
        const removedElement = copiedArr.splice(smallestIndex, 1)[0];
        newArr.push(removedElement);
    }
    return newArr;
}

const initialTests: number[][] = [
    [100, 9, 14, 6, 0],
    [8, 3, 2, 7, 11],
    [32, 4, 1, 5, 11, 2, 6],
];

export default function Page() {
    const calls = initialTests
        .map(a => `selectionSort(${JSON.stringify(a)}) // -> ${JSON.stringify(selectionSort(a))}`)
        .join('\n \t');

    const source = `
// Функция для поиска наименьшего элемента массива
    const findSmallest = (arr) => {
        let smallest = arr[0];
        let smallestIndex = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < smallest) {
                smallest = arr[i];
                smallestIndex = i;
            }
        }
        return smallestIndex;

    }

/**
 * Сортировка выбором (возрастание).
 * На каждом шаге находит минимальный элемент оставшейся части
 * и переносит его в результат.
 *
 * @param arr Массив чисел.
 * @returns Новый массив, отсортированный по возрастанию (исходный не меняется).
 * @complexity Время: O(n^2). Память: O(n).
 */
 
    const selectionSort = (arr) => {
        const newArr = [];
        const copiedArr = [...arr];
        while (copiedArr.length > 0) {
            const smallestIndex = findSmallest(copiedArr);
            const removedElement = copiedArr.splice(smallestIndex, 1)[0];
            newArr.push(removedElement);
        }
        return newArr;
    }
    
// Тесты:
    ${calls}
    `.trim();

    return (
        <div>
            <BackButton/>
            <h2 className='text-xl text-center mb-4'>Сортировка выбором (Selection Sort)</h2>
            <CodeBlock code={source} language="tsx" filename="selection-sort.tsx"/>
        </div>
    );
}