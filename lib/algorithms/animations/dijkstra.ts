import type { GraphStep, NodeState } from '@/components/animations/renderers/GraphRenderer';

const positions: Record<string, { x: number; y: number }> = {
    start: { x: 50, y: 110 },
    a: { x: 180, y: 40 },
    b: { x: 180, y: 180 },
    fin: { x: 310, y: 110 },
};

const graphData: Record<string, Record<string, number>> = {
    start: { a: 6, b: 2 },
    a: { fin: 1 },
    b: { a: 3, fin: 5 },
    fin: {},
};

const allEdges: Array<{ from: string; to: string; weight: number }> = [];
for (const [from, tos] of Object.entries(graphData)) {
    for (const [to, w] of Object.entries(tos)) allEdges.push({ from, to, weight: w });
}

export function buildDijkstraSteps(): GraphStep[] {
    const steps: GraphStep[] = [];
    const nodeStates: Record<string, NodeState> = {};
    const edgeStates: Record<string, NodeState> = {};
    const costs: Record<string, number> = {};
    const parents: Record<string, string | null> = {};

    for (const id of Object.keys(positions)) {
        nodeStates[id] = 'default';
        costs[id] = id === 'start' ? 0 : Infinity;
    }
    for (const e of allEdges) edgeStates[`${e.from}-${e.to}`] = 'default';

    for (const [n, w] of Object.entries(graphData['start'])) {
        costs[n] = w;
        parents[n] = 'start';
    }
    parents['start'] = null;

    function costLabel(id: string) {
        return costs[id] === Infinity ? '∞' : String(costs[id]);
    }

    function snap(label: string) {
        steps.push({
            nodes: Object.entries(positions).map(([id, pos]) => ({
                id, ...pos, state: nodeStates[id],
                costLabel: id !== 'start' ? costLabel(id) : '0',
            })),
            edges: allEdges.map((e) => ({
                from: e.from, to: e.to, weight: e.weight,
                state: edgeStates[`${e.from}-${e.to}`],
            })),
            label,
        });
    }

    snap('Инициализация: стоимости соседей start');

    const processed = new Set<string>();

    function lowestCostNode(): string | null {
        let lowest = Infinity;
        let lowestNode: string | null = null;
        for (const [node, cost] of Object.entries(costs)) {
            if (cost < lowest && !processed.has(node) && node !== 'start') {
                lowest = cost;
                lowestNode = node;
            }
        }
        return lowestNode;
    }

    let node = lowestCostNode();
    while (node) {
        nodeStates[node] = 'current';
        snap(`Выбран узел "${node}" (стоимость ${costs[node]})`);

        const cost = costs[node];
        const neighbors = graphData[node] ?? {};
        for (const [n, w] of Object.entries(neighbors)) {
            const newCost = cost + w;
            if (newCost < costs[n]) {
                costs[n] = newCost;
                parents[n] = node;
                edgeStates[`${node}-${n}`] = 'queued';
                snap(`Обновлена стоимость "${n}": ${newCost} (через "${node}")`);
            }
        }

        processed.add(node);
        nodeStates[node] = 'visited';
        node = lowestCostNode();
    }

    let cur: string | null = 'fin';
    while (cur) {
        nodeStates[cur] = 'path';
        const p: string | null = parents[cur] ?? null;
        if (p) edgeStates[`${p}-${cur}`] = 'path';
        cur = p;
    }
    snap(`Кратчайший путь: стоимость ${costs['fin']}`);

    return steps;
}

export const dijkstraSteps = buildDijkstraSteps();
