import React from 'react';
import { Algorithm } from '../types';
import { DatasetTable } from '@/components/DatasetTable';

type Sample = {
    temp: number;
    humidity: number;
    rain: 0 | 1;
    weekend: 0 | 1;
    sold: number;
};
type Query = Omit<Sample, 'sold'>;
type Weights = Readonly<{
    temp: number;
    humidity: number;
    rain: number;
    weekend: number;
}>;
const DEFAULT_WEIGHTS = {
    temp: 1,
    humidity: 1,
    rain: 1,
    weekend: 2,
} as const satisfies Weights;

function computeNorms(data: Sample[]) {
    const tMin = Math.min(...data.map((d) => d.temp));
    const tMax = Math.max(...data.map((d) => d.temp));
    const hMin = Math.min(...data.map((d) => d.humidity));
    const hMax = Math.max(...data.map((d) => d.humidity));
    return { tMin, tMax, hMin, hMax };
}

function norm01(x: number, min: number, max: number, clip = false) {
    if (max === min) return 0;
    const z = (x - min) / (max - min);
    return clip ? Math.max(0, Math.min(1, z)) : z;
}

function euclid4WeightedLinear(
    a: Query,
    b: Query,
    norms: ReturnType<typeof computeNorms>,
    w: Weights = DEFAULT_WEIGHTS
): number {
    const { tMin, tMax, hMin, hMax } = norms;

    const aTemp = norm01(a.temp, tMin, tMax);
    const bTemp = norm01(b.temp, tMin, tMax);
    const aHum = norm01(a.humidity, hMin, hMax);
    const bHum = norm01(b.humidity, hMin, hMax);

    const dTemp = aTemp - bTemp;
    const dHum = aHum - bHum;
    const dRain = +a.rain - +b.rain;
    const dWend = +a.weekend - +b.weekend;

    const sum =
        w.temp * (dTemp * dTemp) +
        w.humidity * (dHum * dHum) +
        w.rain * (dRain * dRain) +
        w.weekend * (dWend * dWend);

    return Math.sqrt(sum);
}

function knnPredictDemand(
    data: Sample[],
    q: Query,
    k: number,
    w: Weights = DEFAULT_WEIGHTS
): number {
    if (k <= 0) throw new Error('k must be >= 1');
    if (data.length === 0) throw new Error('data cannot be empty');
    const norms = computeNorms(data);
    const withDist = data
        .map((s) => ({ ...s, dist: euclid4WeightedLinear(q, s, norms, w) }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, Math.min(Math.max(1, Math.trunc(k)), data.length));
    let num = 0,
        den = 0;
    for (const n of withDist) {
        const sim = 1 / (1 + n.dist);
        num += sim * n.sold;
        den += sim;
    }
    return den ? Math.round(num / den) : NaN;
}

// Датасет
// Формат: [temp°C, humidity%, rain, weekend, sold]
type Row = readonly [number, number, 0 | 1, 0 | 1, number];

const DATA: readonly Row[] = [
    // temp  hum  rain wknd sold
    [10, 85, 1, 0, 130], // холодный дождливый будний
    [12, 80, 1, 1, 165], // холодный дождливый выходной
    [14, 75, 1, 1, 160], // холодный дождливый выходной
    [15, 70, 0, 0, 105], // холодный сухой будний
    [16, 68, 0, 1, 135], // прохладный сухой выходной
    [18, 65, 0, 0, 100], // комфортный будний
    [22, 55, 1, 0, 110], // тёплый дождливый будний
    [24, 50, 0, 0, 90], // тёплый будний
    [28, 45, 0, 1, 130], // жаркий выходной
] as const;

const dataForEval: Sample[] = DATA.map(
    ([temp, humidity, rain, weekend, sold]) => ({
        temp,
        humidity,
        rain,
        weekend,
        sold,
    })
);

const tests = [
    // Холодный дождливый выходной - ожидаем высокий спрос
    {
        q: { temp: 13, humidity: 78, rain: 1 as const, weekend: 1 as const },
        k: 3,
    },

    // Умеренная погода, будний день - средний спрос
    {
        q: { temp: 21, humidity: 58, rain: 0 as const, weekend: 0 as const },
        k: 3,
    },

    // Жаркий выходной - умеренно-высокий спрос
    {
        q: { temp: 29, humidity: 45, rain: 0 as const, weekend: 1 as const },
        k: 3,
    },

    // Экстремально жаркий день с дождём (редкое сочетание)
    {
        q: { temp: 31, humidity: 38, rain: 1 as const, weekend: 0 as const },
        k: 5,
    },

    // Пример с кастомными весами: дождь важнее
    {
        q: { temp: 20, humidity: 60, rain: 1 as const, weekend: 0 as const },
        k: 4,
        weights: { temp: 1, humidity: 1, rain: 3, weekend: 2 },
    },
] satisfies Array<{ q: Query; k: number; weights?: Weights }>;

const calls = tests
    .map(({ q, k, weights }) => {
        const w = weights ? `, ${JSON.stringify(weights)}` : '';
        return `knnPredictDemand(data, { temp: ${q.temp}, humidity: ${q.humidity}, rain: ${q.rain}, weekend: ${q.weekend} }, ${k}${w}); // -> ${knnPredictDemand(dataForEval, q, k, weights)}`;
    })
    .join('\n');

const algo = {
    slug: 'ml-knn-regression',
    title: 'k-NN регрессия – прогнозирование ответа',
    description: (
        <>
            <b>Цель:</b> спрогнозировать, сколько буханок испечь. Признаки:
            температура, влажность, дождь, выходной (с весом ×2).
            <br />
            <b>Идея k-NN:</b> берём <i>k</i> ближайших дней по этим признакам
            (после нормализации), усредняем продажи с весами 1/(1+dist).
            <br />
            <b>Веса признаков:</b> позволяют задать важность – например,
            выходной день влияет на спрос сильнее, чем погода.
            <br />
            <b>Расстояние:</b>{' '}
            <code>
                d = √(Σ w<sub>i</sub>·Δ<sub>i</sub>
                <sup>2</sup>)
            </code>
            , где{' '}
            <i>
                w<sub>i</sub>
            </i>{' '}
            – вес признака,{' '}
            <i>
                Δ<sub>i</sub>
            </i>{' '}
            – разность.
            <br />
            <div className="my-4 max-w-2xl mx-auto">
                <p className="text-center italic">
                    Датасет: погода → спрос на хлеб
                </p>
                <DatasetTable data={dataForEval} />
            </div>
        </>
    ),
    complexity: (
        <>
            Наивно: время – <code>O(n&nbsp;log&nbsp;n)</code> на сортировку;
            можно <code>O(n + k&nbsp;log&nbsp;k)</code> частичным отбором.
            Память – <code>O(n)</code>.
        </>
    ),
    filename: 'knnRegression.ts',
    language: 'ts',
    buildSource: () =>
        `
type Sample = { temp: number; humidity: number; rain: 0 | 1; weekend: 0 | 1; sold: number };
type Query = Omit<Sample, 'sold'>;
type Weights = Readonly<{ temp: number; humidity: number; rain: number; weekend: number }>;
const DEFAULT_WEIGHTS = { temp: 1, humidity: 1, rain: 1, weekend: 2 } as const satisfies Weights;

function computeNorms(data: Sample[]) {
    const tMin = Math.min(...data.map(d => d.temp));
    const tMax = Math.max(...data.map(d => d.temp));
    const hMin = Math.min(...data.map(d => d.humidity));
   const hMax = Math.max(...data.map(d => d.humidity));
   return {tMin, tMax, hMin, hMax};
}

/** 
 * Min–max нормализация: переводит x из [min,max] в [0–1], 
 * чтобы признаки были сопоставимы в метриках расстояния; 
 * при min===max возвращает 0. 
 */
function norm01(x: number, min: number, max: number, clip = false) {
    if (max === min) return 0;
    const z = (x - min) / (max - min);
    return clip ? Math.max(0, Math.min(1, z)) : z;
}

/**
 * Взвешенное евклидово расстояние между двумя днями по 4 признакам.
 * Формула: d = √(Σ wᵢ·Δᵢ²), где wᵢ – вес, Δᵢ – разность по признаку.
 * 
 * Веса позволяют управлять важностью признаков:
 * - вес > 1 делает признак более значимым (вклад в расстояние больше)
 * - вес = 1 – стандартное влияние
 * - вес < 1 делает признак менее значимым
 * 
 * Например, weekend=2 означает, что различие по выходному дню
 * вносит вклад в 2 раза больше, чем по температуре (при w_temp=1).
 */
function euclid4WeightedLinear(
    a: Query,
    b: Query,
    norms: ReturnType<typeof computeNorms>,
    w: Weights = DEFAULT_WEIGHTS
): number {
    const { tMin, tMax, hMin, hMax } = norms;

    const aTemp = norm01(a.temp, tMin, tMax);
    const bTemp = norm01(b.temp, tMin, tMax);
    const aHum  = norm01(a.humidity, hMin, hMax);
    const bHum  = norm01(b.humidity, hMin, hMax);

    const dTemp = aTemp - bTemp;
    const dHum  = aHum  - bHum;
    const dRain = (+a.rain) - (+b.rain);
    const dWend = (+a.weekend) - (+b.weekend);

    const sum =
        w.temp     * (dTemp * dTemp) +
        w.humidity * (dHum  * dHum)  +
        w.rain     * (dRain * dRain) +
        w.weekend  * (dWend * dWend);

    return Math.sqrt(sum);
}

// k-NN регрессия: прогноз числа буханок по погоде (temp, humidity, rain, weekend).
function knnPredictDemand(
    data: Sample[],
    q: Query,
    k: number,
    w: Weights = DEFAULT_WEIGHTS
): number {
    if (k <= 0) throw new Error('k must be >= 1');
    if (data.length === 0) throw new Error('data cannot be empty');
    const norms = computeNorms(data);
    const withDist = data
        .map(s => ({...s, dist: euclid4WeightedLinear(q, s, norms, w)}))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, Math.min(Math.max(1, Math.trunc(k)), data.length));
    let num = 0, den = 0;
    for (const n of withDist) {
        const sim = 1 / (1 + n.dist);
        num += sim * n.sold;
        den += sim;
    }
    return den ? Math.round(num / den) : NaN;
}

// Примеры
${calls}
`.trim(),
} satisfies Algorithm;

export default algo;
