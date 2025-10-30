import React from "react";

export default function Page() {
    const selectionSort = (arr) => {
        let newArr = [];
        const copiedArr = [...arr];
        for (let i = 0; i < arr.length; i++) {
            let smallestValue = Math.min(...copiedArr);
            let smallestIndex = copiedArr.indexOf(smallestValue);
            let removedElement = copiedArr.splice(smallestIndex, 1)[0];
            newArr.push(removedElement);
        }
        return newArr;
    }

    return (
        <div>
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