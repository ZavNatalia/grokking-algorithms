import { ReactNode } from 'react';

export type Algorithm = {
    slug: string;
    title: string;
    description: ReactNode;
    complexity: ReactNode;
    filename: string;
    language?: string;
    buildSource: () => string;
} ;


