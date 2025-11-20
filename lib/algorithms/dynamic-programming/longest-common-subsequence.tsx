import React from 'react';
import { Algorithm } from '../types';

function lcsEval(
    a: string,
    b: string
): { length: number; subsequence: string } {
    const n = a.length,
        m = b.length;
    const dp: number[][] = Array.from({ length: n + 1 }, () =>
        Array(m + 1).fill(0)
    );
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            dp[i][j] =
                a[i - 1] === b[j - 1]
                    ? dp[i - 1][j - 1] + 1
                    : Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    const seq: string[] = [];
    let i = n,
        j = m;
    while (i > 0 && j > 0) {
        if (a[i - 1] === b[j - 1]) {
            seq.push(a[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) i--;
        else j--;
    }
    seq.reverse();
    return { length: dp[n][m], subsequence: seq.join('') };
}

const tests: Array<[string, string]> = [
    ['hish', 'fish'],
    ['blue', 'clues'],
    ['AGGTAB', 'GXTXAYB'],
];

const calls = tests
    .map(([a, b]) => {
        const r = lcsEval(a, b);
        return `longestCommonSubsequence('${a}', '${b}') // length -> ${r.length}, subsequence -> '${r.subsequence}'`;
    })
    .join('\n');

const algo = {
    slug: 'dp-longest-common-subsequence',
    title: 'Динамическое программирование: наибольшая общая подпоследовательность (LCS)',
    description: (
        <>
            Таблица <code>(n+1)×(m+1)</code>, где <code>dp[i][j]</code> – длина
            LCS префиксов <code>a[0..i)</code> и <code>b[0..j)</code>. При
            равенстве символов: <code>dp[i-1][j-1]+1</code>, иначе{' '}
            <code>max(dp[i-1][j], dp[i][j-1])</code>.
        </>
    ),
    complexity: (
        <>
            Время – <code>O(n·m)</code>, память – <code>O(n·m)</code>.
        </>
    ),
    filename: 'longestCommonSubsequence.ts',
    language: 'ts',
    buildSource: () =>
        `
/**
 * Наибольшая общая подпоследовательность (LCS).
 */
function longestCommonSubsequence(a: string, b: string): { length: number; subsequence: string } {
  const n = a.length, m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const seq: string[] = [];
  let i = n, j = m;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) { seq.push(a[i - 1]); i--; j--; }
    else if (dp[i - 1][j] >= dp[i][j - 1]) i--; else j--;
  }
  seq.reverse();
  return { length: dp[n][m], subsequence: seq.join('') };
}

// Примеры 
${calls}
`.trim(),
} satisfies Algorithm;

export default algo;
