import React from "react";
import Link from 'next/link';

const algorithms = [
    {
        title: 'Бинарный поиск (Binary Search)',
        href: 'algorithms/binary-search',
    },
    {
        title: 'Сортировка выбором (Selection Sort)',
        href: 'algorithms/selection-sort',
    }
]
export default function Page() {
    return (
        <div>
            <h1 className='text-3xl text-center accent-regal-blue'>
                Алгоритмы
            </h1>
            <ul>
                {algorithms.map(({title, href}) => (
                    <li key={title}>
                        <Link href={href}>{title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}