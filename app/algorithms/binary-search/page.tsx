import React from "react";
import { BackButton } from '@/components/BackButton';

export default function Page() {

    const binarySearch = (arr, target) => {
        let lowIndex = 0;
        let highIndex = arr.length - 1;
        while (lowIndex <= highIndex) {
            const middleIndex = Math.floor((lowIndex + highIndex) / 2);
            const guess = arr[middleIndex];
            if (guess === target) {
                return middleIndex;
            }
            if (guess > target) {

                highIndex = middleIndex - 1;
            } else {
                lowIndex = middleIndex + 1;
            }
        }
    }
    const myList = [11, 33, 55, 77, 99];

    return (
        <>
            <BackButton/>
            <h2 className='text-xl text-center mb-4'>Бинарный поиск (Binary Search)</h2>
            <code>
                list = {myList.join(', ')}
                <br/>
                binarySearch(myList, 11) -
                <span className='text-blue-300'> {binarySearch(myList, 11)}</span>
                <br/>
                binarySearch(myList, 33) -
                <span className='text-blue-300'> {binarySearch(myList, 33)}</span>
                <br/>
                binarySearch(myList, 99) -
                <span className='text-blue-300'> {binarySearch(myList, 99)}</span>
            </code>
        </>
    );
}