import Link from 'next/link';

const navLinks = [
    {
        title: 'Главная',
        href: '/',
    },
    {
        title: 'Алгоритмы',
        href: '/algorithms',
    },

]

export default function Header() {
    return <div className='w-full flex justify-center px-2 py-4 '>
        <ul className='flex gap-3'>
            {navLinks.map(({title, href}) => (
                <li key={title} >
                    <Link href={href} className='hover:text-blue-300'>{title}</Link>
                </li>
            ))}
        </ul>
    </div>
}