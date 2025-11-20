import React from 'react';
import Features from '@/components/main-landing/Features';
import Hero from '@/components/main-landing/Hero';
import BackgroundPattern from '@/components/main-landing/BackgroundPattern';

export const metadata = {
    title: 'Алгоритмы и структуры данных',
    description:
        'Понятные объяснения, Big-O и примеры TypeScript по “Грокаем алгоритмы”.',
};

export default function LandingPage() {
    return (
        <div className="h-full relative  text-slate-100 ">
            <BackgroundPattern />
            <main className="max-w-7xl mx-auto px-6 py-20">
                <Hero />
                <Features />
            </main>
        </div>
    );
}
