import type { BarStep } from '@/components/animations/renderers/BarChartRenderer';

const data = [1, 3, 5, 7, 9, 11, 13];
const target = 9;

export function buildBinarySearchSteps(): BarStep[] {
    const steps: BarStep[] = [];
    let low = 0;
    let high = data.length - 1;

    steps.push({
        bars: data.map((v) => ({ value: v, state: 'default' })),
        pointers: { low, high },
        label: `Ищем ${target} в отсортированном массиве`,
    });

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const guess = data[mid];

        steps.push({
            bars: data.map((v, i) => ({
                value: v,
                state: i === mid ? 'active'
                    : i >= low && i <= high ? 'comparing'
                    : 'default',
            })),
            pointers: { low, mid, high },
            label: `mid = ${mid}, arr[mid] = ${guess}`,
        });

        if (guess === target) {
            steps.push({
                bars: data.map((v, i) => ({
                    value: v,
                    state: i === mid ? 'sorted' : 'default',
                })),
                pointers: { low, mid, high },
                label: `Найдено! ${target} на индексе ${mid}`,
            });
            break;
        }

        if (guess > target) {
            high = mid - 1;
            steps.push({
                bars: data.map((v, i) => ({
                    value: v,
                    state: i >= low && i <= high ? 'comparing' : 'default',
                })),
                pointers: { low, high },
                label: `${guess} > ${target}, сдвигаем high = ${high}`,
            });
        } else {
            low = mid + 1;
            steps.push({
                bars: data.map((v, i) => ({
                    value: v,
                    state: i >= low && i <= high ? 'comparing' : 'default',
                })),
                pointers: { low, high },
                label: `${guess} < ${target}, сдвигаем low = ${low}`,
            });
        }
    }

    return steps;
}

export const binarySearchSteps = buildBinarySearchSteps();
