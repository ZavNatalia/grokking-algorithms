import * as React from 'react';
import { Algorithm } from '../types';

const algo = {
    slug: 'graphs-dijkstra',
    title: 'Графы: алгоритм Дейкстры (кратчайший путь)',
    description: (
        <>
            Алгоритм для ориентированных графов с неотрицательными весами: на
            каждом шаге выбирает непроработанную вершину с минимальной
            стоимостью (lowest-cost node), пересчитывает соседей и помечает
            вершину обработанной.
        </>
    ),
    complexity: (
        <>
            Время – <code>O(V^2)</code> с линейным поиском узла /{' '}
            <code>O(E&nbsp;log&nbsp;V)</code> с приоритетной очередью; память –{' '}
            <code>O(V)</code>.
        </>
    ),
    filename: 'dijkstra.ts',
    language: 'ts',
    buildSource: () =>
        `type Graph = Record<string, Record<string, number>>;

/** Возвращает имя непроработанного узла с наименьшей стоимостью или null */
function lowestCostNode(costs: Record<string, number>, processed: Set<string>): string | null {
  let lowest = Infinity;
  let lowestNode: string | null = null;
  for (const node in costs) {
    const cost = costs[node];
    if (cost < lowest && !processed.has(node)) {
      lowest = cost;
      lowestNode = node;
    }
  }
  return lowestNode;
}

/**
 * Дейкстра: кратчайшие пути от start до всех вершин (неотрицательные веса).
 * Возвращает стоимость пути до finish и таблицу родителей для восстановления маршрута.
 */
function dijkstra(graph: Graph, start: string, finish: string) {
  const costs: Record<string, number> = {};
  const parents: Record<string, string | null | undefined> = {};
  const processed = new Set<string>();

  // Инициализация: стоимости соседей start, прочие = Infinity
  for (const node in graph) {
    if (node !== start) costs[node] = Infinity;
  }
  for (const n in (graph[start] ?? {})) {
    costs[n] = graph[start][n];
    parents[n] = start;
  }
  parents[start] = null;
  if (parents[finish] === undefined) parents[finish] = null;

  // Основной цикл
  let node = lowestCostNode(costs, processed);
  while (node) {
    const cost = costs[node];
    const neighbors = graph[node] ?? {};
    for (const n in neighbors) {
      const newCost = cost + neighbors[n];
      if (costs[n] === undefined || newCost < costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.add(node);
    node = lowestCostNode(costs, processed);
  }

  return { cost: costs[finish], parents };
}

/** Восстановление пути по таблице родителей */
function pathFromParents(parents: Record<string, string | null | undefined>, finish: string): string[] {
  const path: string[] = [finish];
  let cur = parents[finish] ?? null;
  while (cur) {
    path.push(cur);
    cur = parents[cur] ?? null;
  }
  return path.reverse();
}

/*** Пример из «Грокаем алгоритмы» ***/
const graph: Graph = {
  start: { a: 6, b: 2 },
  a:     { fin: 1 },
  b:     { a: 3, fin: 5 },
  fin:   {}
};

const { cost, parents } = dijkstra(graph, 'start', 'fin');
const path = pathFromParents(parents, 'fin');

console.log('shortest cost:', cost);          // -> 6
console.log('path:', path.join(' -> '));      // -> start -> b -> a -> fin
`,
} satisfies Algorithm;

export default algo;
