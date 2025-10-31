'use client'
import { useRouter } from 'next/navigation';
import * as React from 'react';

type BackButtonProps = {
    fallbackHref?: string;
    children?: React.ReactNode;
    className?: string;
};

export function BackButton({
                               fallbackHref,
                               children = 'Назад',
                               className = 'btn-secondary',
                           }: BackButtonProps) {
    const router = useRouter();
    const onClick = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            router.back();
        } else {
            router.push(fallbackHref ?? '/');
        }
    };
    return (
        <button type="button" aria-label="Назад" className={className} onClick={onClick}>
            {children}
        </button>
    );
}
