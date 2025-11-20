import React from 'react';
import { Algorithm } from '../types';

type Ratings = Record<string, Record<string, number>>;

function euclidOnOverlap(
    a: Record<string, number>,
    b: Record<string, number>
): number {
    const common = Object.keys(a).filter((k) => k in b);
    if (common.length === 0) return Infinity;
    let s = 0;
    for (const k of common) s += (a[k] - b[k]) ** 2;
    return Math.sqrt(s);
}

function knnRecommendEval(data: Ratings, user: string, k: number) {
    const dists: Array<{ name: string; dist: number; sim: number }> = [];
    for (const [name, r] of Object.entries(data)) {
        if (name === user) continue;
        const d = euclidOnOverlap(data[user], r);
        if (!Number.isFinite(d)) continue;
        dists.push({ name, dist: d, sim: 1 / (1 + d) });
    }
    dists.sort((a, b) => a.dist - b.dist);
    const neighbors = dists.slice(0, k);

    const seen = new Set(Object.keys(data[user]));
    const score: Record<string, number> = {};
    const weight: Record<string, number> = {};

    for (const n of neighbors) {
        for (const [item, rating] of Object.entries(data[n.name])) {
            if (seen.has(item)) continue;
            score[item] = (score[item] ?? 0) + n.sim * rating;
            weight[item] = (weight[item] ?? 0) + n.sim;
        }
    }

    const recs = Object.entries(score)
        .map(([item, s]) => [item, +(s / weight[item]).toFixed(2)] as const)
        .sort((a, b) => b[1] - a[1]);

    return { neighbors: neighbors.map((n) => n.name), recs };
}

const ratingsForEval: Ratings = {
    you: { Inception: 5, Matrix: 4 },
    alice: { Inception: 5, Matrix: 5, Titanic: 1 },
    bob: { Inception: 4, Matrix: 4, Avatar: 3, Titanic: 1 },
    carol: { Matrix: 5, Interstellar: 5, Avatar: 2 },
    dave: { Inception: 2, Titanic: 5, Avatar: 4 },
    eve: { Matrix: 4, Interstellar: 4, Inception: 5 },
};

const scenarios = [2, 3, 4].map((k) => ({
    k,
    res: knnRecommendEval(ratingsForEval, 'you', k),
}));

const calls = scenarios
    .map(
        ({ k, res }) =>
            `knnRecommend(ratings, 'you', ${k}); 
    // neighbors -> ${JSON.stringify(res.neighbors)}; 
    // top -> ${JSON.stringify(res.recs)}`
    )
    .join('\n');

const algo = {
    slug: 'ml-knn-classification',
    title: 'k-NN классификация – распределение по категориям',
    description: (
        <div>
            <p>Алгоритм k-ближайших соседей (k-Nearest Neighbors).</p>
            <p>
                <b>Цель</b>: предсказать, какие фильмы (товары/треки) понравятся
                пользователю.
            </p>
            <p>
                <b>Идея k-NN</b>: находим <i>k</i> ближайших по вкусу
                пользователей (по общим оценкам), затем для неоценённых фильмов
                усредняем рейтинги соседей с весами по схожести.
            </p>
        </div>
    ),
    complexity: (
        <>
            Наивно: время – <code>O(U&nbsp;log&nbsp;U + k·I)</code> (сортируем
            пользователей и агрегируем по фильмам), память – <code>O(U+I)</code>
            .
        </>
    ),
    filename: 'knnRecommender.ts',
    language: 'ts',
    buildSource: () =>
        `
type Ratings = Record<string, Record<string, number>>;

function euclidOnOverlap(a: Record<string, number>, b: Record<string, number>): number {
  const common = Object.keys(a).filter(k => k in b); 
  // common – это массив общих ключей двух объектов a и b, то есть пересечение их ключей.
  if (common.length === 0) return Infinity;
  let sumSq = 0; // sumSq – это накопитель суммы квадратов разностей оценок на пересечении ключей.
  for (const k of common) sumSq += (a[k] - b[k]) ** 2;
  return Math.sqrt(sumSq);
}

/**
 * Рекомендательная система k-NN.
 * 1) Ищем k ближайших пользователей (схожесть = 1 / (1 + distance)).
 * 2) Для фильмов, которых у user нет, считаем взвешенное среднее рейтингов соседей.
 */
function knnRecommend(data: Ratings, user: string, k: number): {
  neighbors: string[];
  recommendations: Array<{ item: string; score: number }>;
} {
  const dists: Array<{ name: string; dist: number; sim: number }> = [];
  for (const [name, r] of Object.entries(data)) {
    if (name === user) continue;
    const d = euclidOnOverlap(data[user], r); // d – евклидова дистанция
    if (!Number.isFinite(d)) continue;
    dists.push({ name, dist: d, sim: 1 / (1 + d) });
  }
  dists.sort((a, b) => a.dist - b.dist);
  const neighbors = dists.slice(0, k);

  const seen = new Set(Object.keys(data[user]));
  const score: Record<string, number> = {};
  const weight: Record<string, number> = {};

  for (const n of neighbors) {
    for (const [item, rating] of Object.entries(data[n.name])) {
      if (seen.has(item)) continue;
      score[item]  = (score[item]  ?? 0) + n.sim * rating;
      weight[item] = (weight[item] ?? 0) + n.sim;
    }
  }

  const recommendations = Object.keys(score)
    .map(item => ({ item, score: +(score[item] / weight[item]).toFixed(2) }))
    .sort((a, b) => b.score - a.score);

  return { neighbors: neighbors.map(n => n.name), recommendations };
}

// Данные
const ratings: Ratings = {
  you:   { Inception: 5, Matrix: 4 },
  alice: { Inception: 5, Matrix: 5, Titanic: 1 },
  bob:   { Inception: 4, Matrix: 4, Avatar: 3, Titanic: 1 },
  carol: { Matrix: 5, Interstellar: 5, Avatar: 2 },
  dave:  { Inception: 2, Titanic: 5, Avatar: 4 },
  eve:   { Matrix: 4, Interstellar: 4, Inception: 5 },
};

// Примеры
${calls}
`.trim(),
} satisfies Algorithm;

export default algo;
