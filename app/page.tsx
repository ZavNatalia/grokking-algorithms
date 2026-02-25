import React from 'react';
import Features from '@/components/main-landing/Features';
import Hero from '@/components/main-landing/Hero';
import SortingAnimation from '@/components/main-landing/SortingAnimation';

export const metadata = {
    title: 'Алгоритмы и структуры данных',
    description:
        'Понятные объяснения, Big-O и примеры TypeScript по "Грокаем алгоритмы".',
};

export default function LandingPage() {
    return (
        <div className="h-full text-slate-100">
            <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
                    <div className="flex-1">
                        <Hero />
                    </div>
                    <div className="hidden lg:flex lg:justify-center w-80 shrink-0">
                        <SortingAnimation />
                    </div>
                </div>
                <Features />
            </main>
        </div>
    );
}
