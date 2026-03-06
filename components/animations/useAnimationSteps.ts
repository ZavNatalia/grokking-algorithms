'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export type AnimationControls<T> = {
    currentStep: number;
    step: T;
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    restart: () => void;
    totalSteps: number;
};

export function useAnimationSteps<T>(
    steps: T[],
    intervalMs = 800
): AnimationControls<T> {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

    const lastIndex = steps.length - 1;

    const pause = useCallback(() => setIsPlaying(false), []);
    const play = useCallback(() => {
        setCurrentStep((prev) => (prev >= lastIndex ? 0 : prev));
        setIsPlaying(true);
    }, [lastIndex]);
    const restart = useCallback(() => {
        setCurrentStep(0);
        setIsPlaying(true);
    }, []);

    useEffect(() => {
        if (!isPlaying) return;

        intervalRef.current = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev >= lastIndex) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, intervalMs);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying, intervalMs, lastIndex]);

    return {
        currentStep,
        step: steps[currentStep],
        isPlaying,
        play,
        pause,
        restart,
        totalSteps: steps.length,
    };
}
