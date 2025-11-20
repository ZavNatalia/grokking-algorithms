import type { Algorithm } from './types';
import binarySearch from './search/binary-search';
import selectionSort from './sorting/selection-sort';
import quicksort from '@/lib/algorithms/sorting/quicksort';
import factorial from './recursion/factorial';
import bfsTree from '@/lib/algorithms/trees/bfsTree';
import dfsTree from '@/lib/algorithms/trees/dfsTree';
import dijkstra from '@/lib/algorithms/graphs/dijkstra';
import graphBfs from '@/lib/algorithms/graphs/bfs';
import setCover from '@/lib/algorithms/greedy/set-cover';
import knapsack from '@/lib/algorithms/dynamic-programming/knapsack';
import longestCommonSubstring from '@/lib/algorithms/dynamic-programming/longest-common-substring';
import longestCommonSubsequence from '@/lib/algorithms/dynamic-programming/longest-common-subsequence';
import deduplicate from '@/lib/algorithms/hash/deduplicate';
import knnRecommender from '@/lib/algorithms/ml/knn-recommender';
import knnRegression from '@/lib/algorithms/ml/knn-regression';

export type AlgorithmCategory = {
    id: string;
    title: string;
    items: Algorithm[];
};

export const ALGORITHM_CATEGORIES: AlgorithmCategory[] = [
    { id: 'search', title: 'Поиск', items: [binarySearch] },
    { id: 'sorting', title: 'Сортировка', items: [selectionSort, quicksort] },
    { id: 'recursion', title: 'Рекурсия', items: [factorial] },
    { id: 'trees', title: 'Деревья', items: [bfsTree, dfsTree] },
    { id: 'graphs', title: 'Графы', items: [graphBfs, dijkstra] },
    { id: 'greedy', title: 'Жадные алгоритмы', items: [setCover] },
    {
        id: 'dp',
        title: 'Динамическое программирование',
        items: [knapsack, longestCommonSubstring, longestCommonSubsequence],
    },
    { id: 'hash', title: 'Хеш-таблицы', items: [deduplicate] },
    { id: 'ml', title: 'ML / k-NN', items: [knnRecommender, knnRegression] },
];

// Автоматически собираем все алгоритмы из категорий
export const algorithms = ALGORITHM_CATEGORIES.flatMap((cat) => cat.items);

export type AlgorithmSlug = (typeof algorithms)[number]['slug'];

export const algoBySlug = Object.fromEntries(
    algorithms.map((algo) => [algo.slug, algo])
) as Record<AlgorithmSlug, Algorithm>;