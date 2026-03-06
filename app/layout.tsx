import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { Inter, Roboto_Mono } from 'next/font/google';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
    title: {
        default: 'Алгоритмы и структуры данных',
        template: '%s | Алгоритмы и структуры данных',
    },
    description:
        'Интерактивное пособие по алгоритмам и структурам данных. Определения, Big-O и примеры на TypeScript.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${roboto_mono.variable} antialiased flex flex-col relative`}
            >
                <ThemeProvider>
                    <Header />
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950">
                        {children}
                    </div>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
