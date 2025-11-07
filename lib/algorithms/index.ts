import binarySearch from './search/binary-search';
import selectionSort from './sorting/selection-sort';
import factorial from './recursion/factorial';
import type { Algorithm } from './types';

export const algorithms = [binarySearch, selectionSort, factorial] as const;
export type AlgorithmSlug = typeof algorithms[number]['slug'];

export const algoBySlug: Record<AlgorithmSlug, Algorithm> =
    Object.fromEntries(algorithms.map(a => [a.slug, a])) as any;
