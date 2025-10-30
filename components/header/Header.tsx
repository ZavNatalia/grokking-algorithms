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
    return <div className='w-full flex justify-center border-1 px-2 py-4'>
        <ul className='flex gap-3'>
            {navLinks.map(({title, href}) => (
                <li key={title} className='hover:text-yellow'>
                    <Link href={href}>{title}</Link>
                </li>
            ))}
        </ul>
    </div>
}