'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

export type NodeState = 'default' | 'queued' | 'current' | 'visited' | 'path';

export type GraphNode = {
    id: string;
    x: number;
    y: number;
    state: NodeState;
    costLabel?: string;
};

export type GraphEdge = {
    from: string;
    to: string;
    state: NodeState;
    weight?: number;
};

export type GraphStep = {
    nodes: GraphNode[];
    edges: GraphEdge[];
    label?: string;
};

const W = 360;
const H = 220;
const R = 20;

const nodeColors: Record<NodeState, string> = {
    default: 'fill-slate-300 dark:fill-slate-600',
    queued: 'fill-amber-400 dark:fill-amber-500',
    current: 'fill-amber-500 dark:fill-amber-400',
    visited: 'fill-emerald-500 dark:fill-emerald-400',
    path: 'fill-violet-500 dark:fill-violet-400',
};

const edgeColors: Record<NodeState, string> = {
    default: 'stroke-slate-300 dark:stroke-slate-600',
    queued: 'stroke-amber-400',
    current: 'stroke-amber-500',
    visited: 'stroke-emerald-500',
    path: 'stroke-violet-500',
};

export function GraphRenderer({ step }: { step: GraphStep }) {
    const nodeMap = new Map(step.nodes.map((n) => [n.id, n]));

    return (
        <div className="flex flex-col items-center gap-2">
            <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
                {step.edges.map((edge) => {
                    const from = nodeMap.get(edge.from);
                    const to = nodeMap.get(edge.to);
                    if (!from || !to) return null;
                    return (
                        <g key={`${edge.from}-${edge.to}`}>
                            <motion.line
                                x1={from.x}
                                y1={from.y}
                                x2={to.x}
                                y2={to.y}
                                className={clsx(edgeColors[edge.state])}
                                strokeWidth={edge.state === 'path' ? 3 : 2}
                                animate={{ opacity: 1 }}
                                initial={{ opacity: 0.3 }}
                            />
                            {edge.weight !== undefined && (
                                <text
                                    x={(from.x + to.x) / 2}
                                    y={(from.y + to.y) / 2 - 6}
                                    textAnchor="middle"
                                    className="fill-current text-xs opacity-60"
                                >
                                    {edge.weight}
                                </text>
                            )}
                        </g>
                    );
                })}

                {step.nodes.map((node) => (
                    <g key={node.id}>
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={R}
                            className={clsx(nodeColors[node.state])}
                            animate={{ scale: node.state === 'current' ? 1.15 : 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                        <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            className="fill-current text-xs font-semibold"
                        >
                            {node.id}
                        </text>
                        {node.costLabel && (
                            <text
                                x={node.x}
                                y={node.y - R - 4}
                                textAnchor="middle"
                                className="fill-current text-[10px] opacity-60"
                            >
                                {node.costLabel}
                            </text>
                        )}
                    </g>
                ))}
            </svg>

            {step.label && (
                <p className="text-sm opacity-70 text-center">{step.label}</p>
            )}
        </div>
    );
}
