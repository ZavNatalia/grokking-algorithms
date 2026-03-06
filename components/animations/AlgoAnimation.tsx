'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { useMemo } from 'react';

const loaders: Record<string, () => Promise<{ default: ComponentType }>> = {
    'selection-sort': () => import('@/components/animations/pages/SelectionSortAnimation'),
    'quicksort': () => import('@/components/animations/pages/QuicksortAnimation'),
    'binary-search': () => import('@/components/animations/pages/BinarySearchAnimation'),
    'breadth-first-search': () => import('@/components/animations/pages/BfsAnimation'),
    'graphs-dijkstra': () => import('@/components/animations/pages/DijkstraAnimation'),
    'trees-bst': () => import('@/components/animations/pages/BfsTreeAnimation'),
    'trees-dfs': () => import('@/components/animations/pages/DfsTreeAnimation'),
};

type AlgoAnimationProps = {
    slug: string;
};

export function AlgoAnimation({ slug }: AlgoAnimationProps) {
    const Component = useMemo(() => {
        const loader = loaders[slug];
        if (!loader) return null;
        return dynamic(loader, { ssr: false });
    }, [slug]);

    if (!Component) return null;
    return <Component />;
}
