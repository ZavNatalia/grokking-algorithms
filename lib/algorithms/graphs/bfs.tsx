import * as React from 'react';
import type { Algorithm } from '../types';

// Поиск в ширину: кратчайший путь (по числу рёбер) в невзвешенном графе
function bfsPath(
    graph: Record<string, string[]>,
    start: string,
    isGoal: (name: string) => boolean
): string[] | null {
    const queue: string[] = [start];
    const visited = new Set<string>();
    const parent = new Map<string, string>();

    while (queue.length) {
        const v = queue.shift()!;
        if (visited.has(v)) continue;
        visited.add(v);

        if (isGoal(v)) {
            const path = [v];
            let cur = v;
            while (parent.has(cur)) {
                cur = parent.get(cur)!;
                path.unshift(cur);
            }
            return path;
        }

        for (const n of graph[v] ?? []) {
            if (!visited.has(n)) {
                if (!parent.has(n)) parent.set(n, v);
                queue.push(n);
            }
        }
    }
    return null;
}

// Пример из книги: граф "кто кого знает"
const graphData: Record<string, string[]> = {
    you: ['alice', 'bob', 'claire'],
    alice: ['peggy'],
    bob: ['anuj', 'peggy'],
    claire: ['thom', 'jonny'],
    anuj: [],
    peggy: [],
    thom: [],
    jonny: [],
};

const algo = {
    slug: 'breadth-first-search',
    title: 'Графы: поиск в ширину (Breadth-First Search)',
    description: (
        <>
            Обходит граф слоями с помощью очереди: сначала все соседние вершины,
            затем их соседей и т.д. Первый найденный по предикату узел даёт{' '}
            <span className="italic">кратчайший путь</span> по числу рёбер.
            Используются <code>queue</code> для обхода и <code>visited</code>{' '}
            для защиты от повторов; путь восстанавливается через{' '}
            <code>parent</code>.
        </>
    ),
    complexity: (
        <>
            Время – <code>O(V + E)</code>, Память – <code>O(V)</code>, где V
            (Vertices) – число вершин графа, E (Edges) – число рёбер графа
        </>
    ),
    filename: 'bfs.ts',
    language: 'ts',
    buildSource: () => {
        const isSeller = (name: string) => name.endsWith('m'); // «продавец манго»: имя оканчивается на 'm'
        const noSuch = (name: string) => name.startsWith('z');

        const res1 = bfsPath(graphData, 'you', isSeller);
        const res2 = bfsPath(graphData, 'you', noSuch);

        const calls = [
            `bfsPath(graph, 'you', isSeller) // -> ${JSON.stringify(res1)}`,
            `bfsPath(graph, 'you', noSuch)   // -> ${JSON.stringify(res2)}`,
        ].join('\n');

        return `
// BFS: кратчайший путь в невзвешенном графе
function bfsPath(
    graph: Record<string, string[]>,
    start: string,
    isGoal: (name: string) => boolean
): string[] | null {
    const queue: string[] = [start];
    const visited = new Set<string>();
    const parent = new Map<string, string>();
    
    while (queue.length) {
        const v = queue.shift()!;
        if (visited.has(v)) continue;
        visited.add(v);

    if (isGoal(v)) {
        const path = [v];
        let cur = v;
        while (parent.has(cur)) {
            cur = parent.get(cur)!;
            path.unshift(cur);
        }
        return path;
    }
    
    for (const n of graph[v] ?? []) {
        if (!visited.has(n)) {
            if (!parent.has(n)) parent.set(n, v);
            queue.push(n);
            }
        }
    }
    return null;
}

const graph: Record<string, string[]> = ${JSON.stringify(graphData, null, 2)};

const isSeller = (name: string) => name.endsWith('m');
const noSuch = (name: string) => name.startsWith('z');

${calls}
    `;
    },
} satisfies Algorithm;

export default algo;
