'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

export type BarState = 'default' | 'active' | 'comparing' | 'sorted' | 'pivot';

export type BarStep = {
    bars: Array<{ value: number; state: BarState }>;
    label?: string;
    pointers?: Record<string, number>;
};

const BAR_W = 36;
const GAP = 6;
const MAX_H = 160;

const stateColors: Record<BarState, string> = {
    default: 'bg-violet-500 dark:bg-violet-400',
    active: 'bg-amber-500 dark:bg-amber-400',
    comparing: 'bg-amber-500 dark:bg-amber-400',
    sorted: 'bg-emerald-500 dark:bg-emerald-400',
    pivot: 'bg-sky-500 dark:bg-sky-400',
};

export function BarChartRenderer({ step }: { step: BarStep }) {
    const maxVal = Math.max(...step.bars.map((b) => b.value), 1);

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="relative flex items-end justify-center"
                style={{ height: MAX_H, gap: GAP }}
            >
                {step.bars.map((bar, i) => (
                    <motion.div
                        key={i}
                        layout
                        className={clsx('rounded-t-sm', stateColors[bar.state])}
                        style={{ width: BAR_W }}
                        animate={{ height: (bar.value / maxVal) * MAX_H }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        <span className="block w-full text-center text-xs font-medium -mt-5">
                            {bar.value}
                        </span>
                    </motion.div>
                ))}
            </div>

            {step.pointers && (
                <div className="relative flex justify-center" style={{ gap: GAP }}>
                    {step.bars.map((_, i) => {
                        const labels = Object.entries(step.pointers!)
                            .filter(([, idx]) => idx === i)
                            .map(([name]) => name);
                        return (
                            <div
                                key={i}
                                style={{ width: BAR_W }}
                                className="text-center text-xs font-mono opacity-70"
                            >
                                {labels.join(',')}
                            </div>
                        );
                    })}
                </div>
            )}

            {step.label && (
                <p className="text-sm opacity-70 text-center">{step.label}</p>
            )}
        </div>
    );
}
