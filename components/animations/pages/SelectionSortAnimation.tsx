'use client';

import { useAnimationSteps } from '@/components/animations/useAnimationSteps';
import { AnimationShell } from '@/components/animations/AnimationShell';
import { BarChartRenderer } from '@/components/animations/renderers/BarChartRenderer';
import { selectionSortSteps } from '@/lib/algorithms/animations/selection-sort';

export default function SelectionSortAnimation() {
    const { step, currentStep, totalSteps, isPlaying, play, pause, restart } =
        useAnimationSteps(selectionSortSteps);

    return (
        <AnimationShell
            currentStep={currentStep}
            totalSteps={totalSteps}
            isPlaying={isPlaying}
            onPlay={play}
            onPause={pause}
            onRestart={restart}
        >
            <BarChartRenderer step={step} />
        </AnimationShell>
    );
}
