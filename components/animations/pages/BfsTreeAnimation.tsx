'use client';

import { useAnimationSteps } from '@/components/animations/useAnimationSteps';
import { AnimationShell } from '@/components/animations/AnimationShell';
import { TreeRenderer } from '@/components/animations/renderers/TreeRenderer';
import { bfsTreeSteps } from '@/lib/algorithms/animations/tree-walk';

export default function BfsTreeAnimation() {
    const { step, currentStep, totalSteps, isPlaying, play, pause, restart } =
        useAnimationSteps(bfsTreeSteps);

    return (
        <AnimationShell
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            onRestart={restart}
        >
            <TreeRenderer step={step} />
        </AnimationShell>
    );
}
