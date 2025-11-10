import binarySearch from './search/binary-search';
import selectionSort from './sorting/selection-sort';
import factorial from './recursion/factorial';
import type { Algorithm } from './types';

export const algorithms = [binarySearch, selectionSort, factorial] as const;
export type AlgorithmSlug = typeof algorithms[number]['slug'];

const entries = algorithms.map(algo => [algo.slug, algo] as const);

export const algoBySlug = Object.fromEntries(entries) as Record<
    AlgorithmSlug,
    Algorithm
>;