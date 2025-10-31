import React from "react";
import { BackButton } from '@/components/BackButton';

export default function Page() {

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

    // Функция сортировки выбором
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

    return (
        <div>
            <BackButton/>
            <h2 className='text-xl text-center mb-4'>Сортировка выбором (Selection Sort)</h2>
            <code>
                array = [8, 3, 2, 7, 11];
                <br/>
                selectionSort(array) -
                <span className='text-blue-300'> [{selectionSort([8, 3, 2, 7, 11]).join(', ')}]</span>
            </code>
            <br/>
            <code>
                array = [100, 9, 14, 6, 0];
                <br/>
                selectionSort(array) -
                <span className='text-blue-300'> [{selectionSort([100, 9, 14, 6, 0]).join(', ')}]</span>
            </code>
        </div>
    );
}