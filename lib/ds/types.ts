import React from 'react';

export type DSItem = {
    slug: string;
    title: string;
    definition: React.ReactNode;
    useWhen: string[];
    complexity: { op: string; bigO: string; note?: string }[];
    filename: string;
    language: string;
    buildSource: () => string;
};

export type DSItemView = Omit<DSItem, 'buildSource'> & { source: string };
