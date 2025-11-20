import React from 'react';
import { Algorithm } from '../types';

function lcsstrEval(
    a: string,
    b: string
): { length: number; substring: string } {
    const n = a.length,
        m = b.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () =>
        Array(m + 1).fill(0)
    );
    let maxLen = 0,
        endA = 0;
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLen) {
                    maxLen = dp[i][j];
                    endA = i;
                }
            } else dp[i][j] = 0;
        }
    }
    return { length: maxLen, substring: a.slice(endA - maxLen, endA) };
}

const tests: Array<[string, string]> = [
    ['hish', 'fish'],
    ['blue', 'clues'],
    ['ABABC', 'BABCA'],
];

const calls = tests
    .map(([a, b]) => {
        const r = lcsstrEval(a, b);
        return `longestCommonSubstring('${a}', '${b}') // length -> ${r.length}, substring -> '${r.substring}'`;
    })
    .join('\n');

const algo = {
    slug: 'dp-longest-common-substring',
    title: 'Динамическое программирование: самая длинная общая подстрока',
    description: (
        <>
            <code>dp[i][j]</code> хранит длину общего суффикса для префиксов{' '}
            <code>a[0..i)</code> и <code>b[0..j)</code>. При совпадении
            символов: <code>dp[i-1][j-1]+1</code>, иначе <code>0</code>.
            Отслеживаем максимум и конец.
        </>
    ),
    complexity: (
        <>
            Время – <code>O(n·m)</code>, память – <code>O(n·m)</code>.
        </>
    ),
    filename: 'longestCommonSubstring.ts',
    language: 'ts',
    buildSource: () =>
        `
/**
 * Самая длинная общая подстрока (Longest Common Substring).
 */
function longestCommonSubstring(a: string, b: string): { length: number; substring: string } {
  const n = a.length, m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  let maxLen = 0, endA = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLen) { maxLen = dp[i][j]; endA = i; }
      } else dp[i][j] = 0;
    }
  }
  return { length: maxLen, substring: a.slice(endA - maxLen, endA) };
}

// Примеры
${calls}
`.trim(),
} satisfies Algorithm;

export default algo;
