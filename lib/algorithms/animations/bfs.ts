import type { GraphStep, NodeState } from '@/components/animations/renderers/GraphRenderer';

const positions: Record<string, { x: number; y: number }> = {
    you: { x: 40, y: 110 },
    alice: { x: 140, y: 40 },
    bob: { x: 140, y: 110 },
    claire: { x: 140, y: 180 },
    peggy: { x: 240, y: 40 },
    anuj: { x: 240, y: 110 },
    thom: { x: 240, y: 150 },
    jonny: { x: 240, y: 200 },
};

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

const allEdges: Array<{ from: string; to: string }> = [];
for (const [from, tos] of Object.entries(graphData)) {
    for (const to of tos) allEdges.push({ from, to });
}

const isGoal = (name: string) => name.endsWith('m');

export function buildBfsSteps(): GraphStep[] {
    const steps: GraphStep[] = [];
    const nodeStates: Record<string, NodeState> = {};
    const edgeStates: Record<string, NodeState> = {};

    for (const id of Object.keys(positions)) nodeStates[id] = 'default';
    for (const e of allEdges) edgeStates[`${e.from}-${e.to}`] = 'default';

    function snap(label: string) {
        steps.push({
            nodes: Object.entries(positions).map(([id, pos]) => ({
                id, ...pos, state: nodeStates[id],
            })),
            edges: allEdges.map((e) => ({
                ...e, state: edgeStates[`${e.from}-${e.to}`],
            })),
            label,
        });
    }

    snap('Начинаем BFS от "you"');

    const queue: string[] = ['you'];
    const visited = new Set<string>();
    const parent = new Map<string, string>();
    nodeStates['you'] = 'queued';
    snap('Добавили "you" в очередь');

    while (queue.length) {
        const v = queue.shift()!;
        if (visited.has(v)) continue;
        nodeStates[v] = 'current';
        snap(`Обрабатываем "${v}"`);
        visited.add(v);

        if (isGoal(v)) {
            nodeStates[v] = 'path';
            let cur = v;
            while (parent.has(cur)) {
                const p = parent.get(cur)!;
                nodeStates[p] = 'path';
                edgeStates[`${p}-${cur}`] = 'path';
                cur = p;
            }
            snap(`Найден "${v}"! Кратчайший путь выделен`);
            return steps;
        }

        nodeStates[v] = 'visited';

        for (const n of graphData[v] ?? []) {
            if (!visited.has(n) && !queue.includes(n)) {
                parent.set(n, v);
                queue.push(n);
                nodeStates[n] = 'queued';
                edgeStates[`${v}-${n}`] = 'queued';
            }
        }
        snap(`Соседи "${v}" добавлены в очередь`);
    }

    return steps;
}

export const bfsSteps = buildBfsSteps();
