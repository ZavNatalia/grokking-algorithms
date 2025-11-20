import * as React from 'react';
import { Algorithm } from '../types';

const algo = {
    slug: 'greedy-set-cover',
    title: 'Жадные алгоритмы: покрытие множеств (Set Cover)',
    description: (
        <>
            Дана вселенная элементов U и набор подмножеств S₁…Sₙ. Жадный подход
            на каждом шаге выбирает множество, которое покрывает максимум ещё не
            покрытых элементов, удаляет их из «непокрытых» и повторяет, пока все
            элементы не покрыты или больше нечем покрывать.
        </>
    ),
    complexity: (
        <>
            Наивная оценка: <code>O(k · n · m)</code>, где <i>k</i> – число
            выбранных множеств, <i>n</i> – всего множеств, &nbsp;<i>m</i> –
            мощность вселенной. Память – <code>O(m)</code> для трекинга
            непокрытых.
        </>
    ),
    filename: 'setCover.ts',
    language: 'ts',
    buildSource: () =>
        `type Sets = Record<string, Set<string>>;

/**
 * Жадное покрытие множеств.
 * На каждом шаге выбирает подмножество, покрывающее максимум ещё непокрытых элементов.
 *
 * @param universe Вселенная элементов (что нужно покрыть)
 * @param sets Набор подмножеств по имени
 * @returns Имена выбранных множеств в порядке выбора
 *
 * @complexity Время: O(k · n · m), Память: O(m)
 * @note Если покрытие невозможно (остались непокрытые элементы), алгоритм остановится раньше.
 */
function greedySetCover(universe: Set<string>, sets: Sets): string[] {
  const uncovered = new Set(universe);
  const chosen: string[] = [];

  while (uncovered.size > 0) {
    let best: string | null = null;
    let bestCoveredCount = 0;
    let bestCovered: Set<string> = new Set();

    for (const [name, coverage] of Object.entries(sets)) {
      // сколько новых элементов это множество покрывает сейчас
      const coveredNow = new Set([...coverage].filter(x => uncovered.has(x)));
      if (coveredNow.size > bestCoveredCount) {
        best = name;
        bestCoveredCount = coveredNow.size;
        bestCovered = coveredNow;
      }
    }

    if (!best) break; // больше нечем покрывать
    // помечаем покрытые элементы как закрытые
    for (const x of bestCovered) uncovered.delete(x);
    chosen.push(best);
  }

  return chosen;
}

/*** Пример (классический из «Грокаем алгоритмы») ***/
const states = new Set(['mt','wa','or','id','nv','ut','ca','az']);
const stations: Sets = {
  kone:   new Set(['id','nv','ut']),
  ktwo:   new Set(['wa','id','mt']),
  kthree: new Set(['or','nv','ca']),
  kfour:  new Set(['nv','ut']),
  kfive:  new Set(['ca','az']),
};

const chosen = greedySetCover(states, stations);
console.log('chosen:', chosen); // одно из решений: [ 'ktwo', 'kfive', 'kthree', 'kone' ]

// Проверка покрытия:
const covered = new Set<string>();
for (const name of chosen) for (const s of stations[name]) covered.add(s);
const uncoveredLeft = [...states].filter(s => !covered.has(s));
console.log('uncovered:', uncoveredLeft); // -> []
`,
} satisfies Algorithm;

export default algo;
