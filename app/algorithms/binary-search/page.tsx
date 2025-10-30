import React from "react";

export default function Page() {

    const binarySearch = (arr, item) => {
        let lowIndex = 0;
        let highIndex = arr.length - 1;
        while (lowIndex <= highIndex) {

            const middleIndex = Math.floor((lowIndex + highIndex) / 2);
            const guess = arr[middleIndex];
            if (guess === item) {
                return middleIndex;
            } if (guess > item) {

                highIndex = middleIndex - 1;
            } else {
                lowIndex = middleIndex + 1;
            }
        }
    }
    const myList = [11, 33, 55, 77, 99];

    return (
        <>
            <h2 className='text-xl text-center mb-4'>Бинарный поиск</h2>
            <p>list = {myList.join(', ')}</p>
            <p>
                binarySearch(myList, 11)
                <span className='text-blue-300'> // {binarySearch(myList, 11)}</span>
            </p>
            <p>
                binarySearch(myList, 33)
                <span className='text-blue-300'> // {binarySearch(myList, 33)}</span>
            </p>
            <p>
                binarySearch(myList, 99)
                <span className='text-blue-300'> // {binarySearch(myList, 99)}</span>
            </p>
        </>
    );
}