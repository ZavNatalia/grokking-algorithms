import type { Algorithm } from './types';
import binarySearch from './search/binary-search';
import selectionSort from './sorting/selection-sort';
import factorial from './recursion/factorial';
import quicksort from '@/lib/algorithms/sorting/quicksort';
import deduplicate from '@/lib/algorithms/hash/deduplicate';
import bfs from '@/lib/algorithms/graph/bfs';

export const algorithms = [binarySearch, selectionSort, factorial, quicksort, deduplicate, bfs] as const;
export type AlgorithmSlug = typeof algorithms[number]['slug'];

const entries = algorithms.map(algo => [algo.slug, algo] as const);

export const algoBySlug = Object.fromEntries(entries) as Record<
    AlgorithmSlug,
    Algorithm
>;