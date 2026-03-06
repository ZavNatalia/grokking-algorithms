import type { BarStep } from '@/components/animations/renderers/BarChartRenderer';

const data = [5, 2, 8, 1, 7, 3];

export function buildSelectionSortSteps(): BarStep[] {
    const arr = [...data];
    const steps: BarStep[] = [];
    const sorted = new Set<number>();

    steps.push({
        bars: arr.map((v) => ({ value: v, state: 'default' })),
        label: 'Исходный массив',
    });

    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < arr.length; j++) {
            steps.push({
                bars: arr.map((v, k) => ({
                    value: v,
                    state: sorted.has(k) ? 'sorted'
                        : k === minIdx ? 'active'
                        : k === j ? 'comparing'
                        : 'default',
                })),
                label: `Сравниваем ${arr[minIdx]} и ${arr[j]}`,
            });

            if (arr[j] < arr[minIdx]) minIdx = j;
        }

        if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        sorted.add(i);

        steps.push({
            bars: arr.map((v, k) => ({
                value: v,
                state: sorted.has(k) ? 'sorted' : 'default',
            })),
            label: `Минимум ${arr[i]} встал на позицию ${i}`,
        });
    }

    sorted.add(arr.length - 1);
    steps.push({
        bars: arr.map((v) => ({ value: v, state: 'sorted' })),
        label: 'Массив отсортирован!',
    });

    return steps;
}

export const selectionSortSteps = buildSelectionSortSteps();
