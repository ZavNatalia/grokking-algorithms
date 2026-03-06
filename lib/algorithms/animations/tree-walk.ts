import type { TreeStep, TreeNodeState } from '@/components/animations/renderers/TreeRenderer';

type FSNode = { name: string; children?: FSNode[] };

const tree: FSNode = {
    name: 'pics',
    children: [
        {
            name: 'cats',
            children: [{ name: 'cat1.jpg' }, { name: 'cat2.jpg' }],
        },
        {
            name: 'dogs',
            children: [{ name: 'dog1.jpg' }],
        },
        { name: 'logo.png' },
    ],
};

function flattenTree(node: FSNode, depth = 0): Array<{ name: string; isDir: boolean; depth: number }> {
    const isDir = !!node.children;
    const result: Array<{ name: string; isDir: boolean; depth: number }> = [
        { name: node.name, isDir, depth },
    ];
    if (node.children) {
        for (const child of node.children) {
            result.push(...flattenTree(child, depth + 1));
        }
    }
    return result;
}

const flatEntries = flattenTree(tree);

function buildSteps(order: 'bfs' | 'dfs'): TreeStep[] {
    const steps: TreeStep[] = [];
    const stateMap = new Map<string, TreeNodeState>();
    for (const e of flatEntries) stateMap.set(`${e.depth}-${e.name}`, 'default');

    function snap(label: string) {
        steps.push({
            entries: flatEntries.map((e) => ({
                ...e,
                state: stateMap.get(`${e.depth}-${e.name}`) ?? 'default',
            })),
            label,
        });
    }

    snap(`Обход дерева (${order === 'bfs' ? 'BFS — очередь' : 'DFS — стек'})`);

    type QueueItem = { node: FSNode; depth: number };
    const collection: QueueItem[] = [{ node: tree, depth: 0 }];
    stateMap.set(`0-${tree.name}`, 'queued');
    snap(`"${tree.name}" добавлен в ${order === 'bfs' ? 'очередь' : 'стек'}`);

    while (collection.length) {
        const item = order === 'bfs' ? collection.shift()! : collection.pop()!;
        const key = `${item.depth}-${item.node.name}`;

        stateMap.set(key, 'current');
        snap(`Обрабатываем "${item.node.name}"`);

        stateMap.set(key, 'visited');

        if (item.node.children) {
            for (const child of item.node.children) {
                const childKey = `${item.depth + 1}-${child.name}`;
                stateMap.set(childKey, 'queued');
                collection.push({ node: child, depth: item.depth + 1 });
            }
            if (item.node.children.length > 0) {
                snap(`Дети "${item.node.name}" добавлены`);
            }
        }
    }

    snap('Обход завершён!');
    return steps;
}

export const bfsTreeSteps = buildSteps('bfs');
export const dfsTreeSteps = buildSteps('dfs');
