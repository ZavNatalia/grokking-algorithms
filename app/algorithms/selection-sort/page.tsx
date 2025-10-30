import React from "react";

export default function Page() {

    const findSmallest = (arr) => {
        let smallest = arr[0];
        let smallest_index = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < smallest) {
                smallest = arr[i];
                smallest_index = i;

            }
        }
        return smallest_index;

    }
    console.log(findSmallest([2, 4, 1, 6]));

    return (
        <div>
            <h2 className='text-xl text-center mb-4'>Сортировка выбором</h2>
        </div>
    );
}