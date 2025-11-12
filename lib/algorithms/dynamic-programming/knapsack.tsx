import React from 'react';
import { Algorithm } from '../types';

const algo = {
    slug: 'dp-knapsack',
    title: 'Динамическое программирование: задача о рюкзаке (0/1)',
    description: (
        <>
            Идея ДП: разбиваем задачу на подзадачи и запоминаем ответы. Для рюкзака строим таблицу
            <code>items × capacity</code>, где ячейка <code>dp[i][w]</code> хранит лучшую стоимость при использовании первых
            &nbsp;<i>i</i> предметов и вместимости <i>w</i>. Переход: максимум из «не брать предмет i» и «взять его, если помещается».
            В конце восстанавливаем состав решения, двигаясь по таблице вверх.
        </>
    ),
    complexity: (
        <>
            Время – <code>O(n·W)</code>, память – <code>O(n·W)</code> (или <code>O(W)</code> с одномерной оптимизацией без восстановления решения).
        </>
    ),
    filename: 'knapsack.ts',
    language: 'ts',
    buildSource: () =>
        `type Item = { name: string; weight: number; value: number };

/**
 * Классический 0/1 knapsack с восстановлением набора предметов.
 * dp[i][w] – лучшая стоимость при использовании первых i предметов и вместимости w.
 * keep[i][w] – включён ли предмет i в оптимум для этой ячейки.
 */
function knapsack(items: Item[], capacity: number): { value: number; taken: string[] } {
  const n = items.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  const keep: boolean[][] = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(false));

  for (let i = 1; i <= n; i++) {
    const { weight, value } = items[i - 1];
    for (let w = 0; w <= capacity; w++) {
      // не берём i-й
      let best = dp[i - 1][w];
      // пробуем взять i-й, если помещается
      if (weight <= w) {
        const candidate = dp[i - 1][w - weight] + value;
        if (candidate > best) {
          best = candidate;
          keep[i][w] = true;
        }
      }
      dp[i][w] = best;
    }
  }

  // восстановление ответа
  const taken: string[] = [];
  let w = capacity;
  for (let i = n; i >= 1; i--) {
    if (keep[i][w]) {
      taken.push(items[i - 1].name);
      w -= items[i - 1].weight;
    }
  }
  taken.reverse();
  return { value: dp[n][capacity], taken };
}

/*** Пример (по мотивам «Грокаем алгоритмы») ***/
const items: Item[] = [
  { name: 'guitar', weight: 1, value: 1500 },
  { name: 'stereo', weight: 4, value: 3000 },
  { name: 'laptop', weight: 3, value: 2000 },
];

const { value, taken } = knapsack(items, 4);
console.log('best value:', value);       // -> 3500
console.log('taken:', taken.join(', ')); // -> guitar, laptop
`,
} satisfies Algorithm;

export default algo;
