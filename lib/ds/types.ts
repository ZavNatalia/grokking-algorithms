import { ReactNode } from 'react';

export type DSItem = {
    slug: string;
    title: string;
    definition: ReactNode;
    type?: ReactNode | string;
    useWhen: string[];
    complexity: { op: string; bigO: string; note?: string }[];
    filename: string;
    language: 'ts' | 'tsx';
    buildSource: () => string;
};

export type DSItemView = Omit<DSItem, 'buildSource'> & { source: string };
