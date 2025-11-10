import type { Algorithm } from './types';
import binarySearch from './search/binary-search';
import selectionSort from './sorting/selection-sort';
import factorial from './recursion/factorial';
import quicksort from '@/lib/algorithms/sorting/quicksort';
import deduplicate from '@/lib/algorithms/hash/deduplicate';
import graphBfs from '@/lib/algorithms/graphs/bfs';
import treesBfs from '@/lib/algorithms/trees/bfs';
import treesDfs from '@/lib/algorithms/trees/dfs';
import dijkstra from '@/lib/algorithms/graphs/dijkstra';
import setCover from '@/lib/algorithms/greedy/set-cover';

export const algorithms = [
    binarySearch,
    selectionSort,
    factorial,
    quicksort,
    deduplicate,
    graphBfs,
    treesBfs,
    treesDfs,
    dijkstra,
    setCover,
] as const;
export type AlgorithmSlug = typeof algorithms[number]['slug'];

const entries = algorithms.map(algo => [algo.slug, algo] as const);

export const algoBySlug = Object.fromEntries(entries) as Record<
    AlgorithmSlug,
    Algorithm
>;