'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

export type TreeNodeState = 'default' | 'queued' | 'current' | 'visited';

export type TreeEntry = {
    name: string;
    isDir: boolean;
    depth: number;
    state: TreeNodeState;
};

export type TreeStep = {
    entries: TreeEntry[];
    label?: string;
};

const stateClasses: Record<TreeNodeState, string> = {
    default: '',
    queued: 'bg-amber-100 dark:bg-amber-900/30',
    current: 'bg-amber-200 dark:bg-amber-800/40',
    visited: 'bg-emerald-100 dark:bg-emerald-900/30',
};

export function TreeRenderer({ step }: { step: TreeStep }) {
    return (
        <div className="flex flex-col items-start gap-0 w-full max-w-xs mx-auto">
            {step.entries.map((entry) => (
                <motion.div
                    key={`${entry.depth}-${entry.name}`}
                    className={clsx(
                        'flex items-center gap-1.5 w-full rounded px-2 py-0.5 text-sm font-mono',
                        stateClasses[entry.state]
                    )}
                    style={{ paddingLeft: entry.depth * 20 + 8 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="opacity-60">{entry.isDir ? '\u{1F4C1}' : '\u{1F4C4}'}</span>
                    <span>{entry.name}</span>
                </motion.div>
            ))}

            {step.label && (
                <p className="text-sm opacity-70 text-center w-full mt-2">{step.label}</p>
            )}
        </div>
    );
}
