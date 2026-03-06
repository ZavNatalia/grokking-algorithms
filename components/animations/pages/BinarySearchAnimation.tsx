'use client';

import { useAnimationSteps } from '@/components/animations/useAnimationSteps';
import { AnimationShell } from '@/components/animations/AnimationShell';
import { BarChartRenderer } from '@/components/animations/renderers/BarChartRenderer';
import { binarySearchSteps } from '@/lib/algorithms/animations/binary-search';

export default function BinarySearchAnimation() {
    const { step, currentStep, totalSteps, isPlaying, play, pause, restart } =
        useAnimationSteps(binarySearchSteps);

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
