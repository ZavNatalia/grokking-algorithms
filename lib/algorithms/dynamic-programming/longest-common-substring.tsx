import React from 'react';
import { Algorithm } from '../types';

const algo = {
    slug: 'dp-longest-common-substring',
    title: 'Динамическое программирование: самая длинная общая подстрока',
    description: (
        <>
            Строим таблицу <code>(n+1)×(m+1)</code>, где <code>dp[i][j]</code> — длина совпадающего суффикса для
            префиксов <code>a[0..i)</code> и <code>b[0..j)</code>. Если <code>a[i-1] === b[j-1]</code>, то{' '}
            <code>dp[i][j] = dp[i-1][j-1] + 1</code>, иначе <code>0</code>. Отслеживаем максимум и конец в строке <code>a</code>,
            чтобы восстановить подстроку.
            <br />
            Важно: это <b>подстрока</b> (contiguous), не путать с <i>наибольшей общей подпоследовательностью</i>.
        </>
    ),
    complexity: (
        <>
            Время – <code>O(n·m)</code>, память – <code>O(n·m)</code> (или <code>O(min(n,m))</code> без восстановления строки).
        </>
    ),
    filename: 'longestCommonSubstring.ts',
    language: 'ts',
    buildSource: () =>
        `/**
 * Самая длинная общая подстрока (Longest Common Substring).
 * dp[i][j] — длина общего суффикса для a[0..i) и b[0..j).
 * При равенстве символов: dp[i][j] = dp[i-1][j-1] + 1, иначе 0.
 */
function longestCommonSubstring(a: string, b: string): { length: number; substring: string } {
  const n = a.length, m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  let maxLen = 0;
  let endA = 0; // позиция конца найденной подстроки в 'a' (не включая)

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLen) {
          maxLen = dp[i][j];
          endA = i;
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }

  const substring = a.slice(endA - maxLen, endA);
  return { length: maxLen, substring };
}

/*** Примеры ***/
const r1 = longestCommonSubstring('hish', 'fish');  // общая подстрока: 'ish'
console.log(r1.length, r1.substring);               // -> 3 'ish'

const r2 = longestCommonSubstring('blue', 'clues'); // 'lue'
console.log(r2.length, r2.substring);               // -> 3 'lue'

const r3 = longestCommonSubstring('ABABC', 'BABCA'); // 'BABC'
console.log(r3.length, r3.substring);                // -> 4 'BABC'
`,
} satisfies Algorithm;

export default algo;
