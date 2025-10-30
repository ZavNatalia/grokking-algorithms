import React from "react";
import Link from 'next/link';

const algorithms = [
    {
        title: 'Бинарный поиск',
        href: 'algorithms/binary-search',
    },
    {
        title: 'Сортировка выбором',
        href: 'algorithms/selection-sort',
    }
]
export default function Page() {
    return (
        <div >
            <h1 className='text-3xl text-center'>
                Algorithms
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