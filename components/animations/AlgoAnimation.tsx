'use client';

import dynamic from 'next/dynamic';

// Мини-граф: 5 узлов, рёбра подсвечиваются волной (CSS-анимация)
// Узлы загораются поочерёдно, имитируя обход графа
const nodes = [
    { cx: 60, cy: 40 },
    { cx: 30, cy: 80 },
    { cx: 90, cy: 80 },
    { cx: 15, cy: 120 },
    { cx: 60, cy: 120 },
];

const edges: Array<[number, number]> = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4],
];

function AnimationSkeleton() {
    return (
        <div className="my-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60">
            <div className="flex min-h-[236px] items-center justify-center p-4">
                <svg viewBox="0 0 120 140" width={120} height={140}>
                    {edges.map(([a, b], i) => (
                        <line
                            key={i}
                            x1={nodes[a].cx}
                            y1={nodes[a].cy}
                            x2={nodes[b].cx}
                            y2={nodes[b].cy}
                            className="stroke-slate-300 dark:stroke-slate-600"
                            strokeWidth={2}
                        />
                    ))}
                    {nodes.map((n, i) => (
                        <circle
                            key={i}
                            cx={n.cx}
                            cy={n.cy}
                            r={8}
                            className="fill-violet-400 dark:fill-violet-500"
                            style={{
                                animation: `graph-pulse 2.5s ease-in-out ${i * 0.4}s infinite`,
                            }}
                        />
                    ))}
                </svg>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-200 bg-slate-100 px-4 py-2 dark:border-slate-700/60 dark:bg-slate-800/60">
                <div className="h-6 w-6 rounded bg-slate-200 animate-pulse dark:bg-slate-700" />
                <div className="h-6 w-6 rounded bg-slate-200 animate-pulse dark:bg-slate-700" />
                <div className="ml-auto h-4 w-20 rounded bg-slate-200 animate-pulse dark:bg-slate-700" />
            </div>
        </div>
    );
}

const animations: Record<string, ReturnType<typeof dynamic>> = {
    'selection-sort': dynamic(() => import('@/components/animations/pages/SelectionSortAnimation'), { ssr: false, loading: AnimationSkeleton }),
    'quicksort': dynamic(() => import('@/components/animations/pages/QuicksortAnimation'), { ssr: false, loading: AnimationSkeleton }),
    'binary-search': dynamic(() => import('@/components/animations/pages/BinarySearchAnimation'), { ssr: false, loading: AnimationSkeleton }),
    'breadth-first-search': dynamic(() => import('@/components/animations/pages/BfsAnimation'), { ssr: false, loading: AnimationSkeleton }),
    'graphs-dijkstra': dynamic(() => import('@/components/animations/pages/DijkstraAnimation'), { ssr: false, loading: AnimationSkeleton }),
    'trees-bst': dynamic(() => import('@/components/animations/pages/BfsTreeAnimation'), { ssr: false, loading: AnimationSkeleton }),
    'trees-dfs': dynamic(() => import('@/components/animations/pages/DfsTreeAnimation'), { ssr: false, loading: AnimationSkeleton }),
};

export function AlgoAnimation({ slug }: { slug: string }) {
    const Component = animations[slug];
    if (!Component) return null;
    return <Component />;
}
