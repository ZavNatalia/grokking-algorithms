'use client';

import { useAnimationSteps } from '@/components/animations/useAnimationSteps';
import { AnimationShell } from '@/components/animations/AnimationShell';
import { GraphRenderer } from '@/components/animations/renderers/GraphRenderer';
import { bfsSteps } from '@/lib/algorithms/animations/bfs';

export default function BfsAnimation() {
    const { step, currentStep, totalSteps, isPlaying, play, pause, restart } =
        useAnimationSteps(bfsSteps);

    return (
        <AnimationShell
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            onRestart={restart}
        >
            <GraphRenderer step={step} />
        </AnimationShell>
    );
}
