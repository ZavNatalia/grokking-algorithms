'use client';

import type { ReactNode } from 'react';
import clsx from 'clsx';

type AnimationShellProps = {
    children: ReactNode;
    currentStep: number;
    totalSteps: number;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onRestart: () => void;
    className?: string;
};

export function AnimationShell({
    children,
    currentStep,
    totalSteps,
    isPlaying,
    onPlay,
    onPause,
    onRestart,
    className,
}: AnimationShellProps) {
    return (
        <div
            className={clsx(
                'my-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/60',
                className
            )}
        >
            <div className="flex min-h-[200px] items-center justify-center px-4 pb-4 pt-8">
                {children}
            </div>

            <div className="flex items-center gap-3 border-t border-slate-200 bg-slate-100 px-4 py-2 dark:border-slate-700/60 dark:bg-slate-800/60">
                <button
                    type="button"
                    onClick={isPlaying ? onPause : onPlay}
                    className="btn-ghost btn-sm"
                    aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
                >
                    {isPlaying ? '❚❚' : '▶'}
                </button>
                <button
                    type="button"
                    onClick={onRestart}
                    className="btn-ghost btn-sm"
                    aria-label="Сначала"
                >
                    ↻
                </button>
                <span className="ml-auto text-sm opacity-60">
                    Шаг {currentStep + 1} / {totalSteps}
                </span>
            </div>
        </div>
    );
}
