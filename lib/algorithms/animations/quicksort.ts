import type { BarStep, BarState } from '@/components/animations/renderers/BarChartRenderer';

const data = [5, 2, 8, 1, 7, 3];

export function buildQuicksortSteps(): BarStep[] {
    const steps: BarStep[] = [];
    // arr отражает текущий визуальный порядок столбиков
    const arr = [...data];
    const frozen = new Set<number>(); // индексы уже отсортированных элементов

    function snap(states: BarState[], label: string) {
        steps.push({
            bars: arr.map((v, i) => ({ value: v, state: states[i] })),
            label,
        });
    }

    function makeStates(overrides: Map<number, BarState> = new Map()): BarState[] {
        return arr.map((_, i) =>
            frozen.has(i) ? 'sorted' : (overrides.get(i) ?? 'default')
        );
    }

    snap(makeStates(), 'Исходный массив');

    function qs(lo: number, hi: number) {
        if (lo >= hi) {
            if (lo === hi) frozen.add(lo);
            return;
        }
        if (hi - lo === 1) {
            // два элемента — просто сравниваем и меняем если нужно
            if (arr[lo] > arr[hi]) {
                [arr[lo], arr[hi]] = [arr[hi], arr[lo]];
            }
            frozen.add(lo);
            frozen.add(hi);
            snap(makeStates(), `${arr[lo]}, ${arr[hi]} отсортированы`);
            return;
        }

        const pivotIdx = lo + Math.floor((hi - lo) / 2);
        const pivotVal = arr[pivotIdx];

        // Показываем выбор pivot
        const pivotStates = makeStates(new Map([[pivotIdx, 'pivot']]));
        for (let i = lo; i <= hi; i++) {
            if (!frozen.has(i) && i !== pivotIdx) pivotStates[i] = 'active';
        }
        snap(pivotStates, `Опорный элемент: ${pivotVal}`);

        // Разделяем подмассив [lo..hi] на [less, equal, greater]
        const less: number[] = [];
        const equal: number[] = [];
        const greater: number[] = [];

        for (let i = lo; i <= hi; i++) {
            if (arr[i] < pivotVal) less.push(arr[i]);
            else if (arr[i] > pivotVal) greater.push(arr[i]);
            else equal.push(arr[i]);
        }

        // Перестраиваем arr[lo..hi] = [...less, ...equal, ...greater]
        const reordered = [...less, ...equal, ...greater];
        for (let i = 0; i < reordered.length; i++) {
            arr[lo + i] = reordered[i];
        }

        // Показываем результат разделения
        const partStates = makeStates();
        for (let i = lo; i < lo + less.length; i++) partStates[i] = 'comparing';
        for (let i = lo + less.length; i < lo + less.length + equal.length; i++) partStates[i] = 'pivot';
        for (let i = lo + less.length + equal.length; i <= hi; i++) partStates[i] = 'active';
        snap(partStates, `< ${pivotVal}: [${less.join(',')}]  = ${pivotVal}  > ${pivotVal}: [${greater.join(',')}]`);

        const eqStart = lo + less.length;
        const eqEnd = eqStart + equal.length - 1;

        // Рекурсия
        qs(lo, eqStart - 1);

        // Помечаем equal как отсортированные
        for (let i = eqStart; i <= eqEnd; i++) frozen.add(i);

        qs(eqEnd + 1, hi);
    }

    qs(0, arr.length - 1);

    snap(makeStates(), 'Массив отсортирован!');

    return steps;
}

export const quicksortSteps = buildQuicksortSteps();
