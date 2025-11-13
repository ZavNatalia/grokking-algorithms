import * as React from 'react';
import { Algorithm } from '../types';

const algo = {
    slug: 'trees-dfs',
    title: 'Деревья: обход файловой системы (DFS, стек)',
    description: (
        <>
            Файловая система – дерево: каталоги – узлы, файлы – листья.
            Обход в глубину (depth-first search, DFS) уходит по пути максимально далеко, используя стек, затем откатывается назад.
            Подходит для задач вроде: вывести имена всех файлов в каталоге <code>pics</code>, включая подкаталоги.
        </>
    ),
    complexity: (
        <>
            Время – <code>O(N)</code> по числу записей; память – <code>O(H)</code>, где <i>H</i> – максимальная глубина.
        </>
    ),
    filename: 'walkDirDfs.ts',
    language: 'ts',
    buildSource: () =>
        `import { readdir, stat } from 'node:fs/promises';
import type { Dirent } from 'node:fs';
import { join, basename } from 'node:path';

type WalkOptions = {
  /** Следовать по симлинкам (по умолчанию false) */
  followSymlinks?: boolean;
};

/**
 * Обходит дерево каталогов в глубину (DFS, стек) и возвращает список файлов.
 *
 * Требование: вывести имена всех файлов в каталоге \`pics\`, включая все его подкаталоги.
 *
 * Пример:
 *   (async () => {
 *     const files = await walkDirDfs('pics');          // корень обхода
 *     files.forEach(f => console.log(basename(f)));    // печать только имён
 *   })().catch(console.error);
 */
export async function walkDirDfs(root: string, opts: WalkOptions = {}): Promise<string[]> {
  const files: string[] = [];
  const stack: string[] = [root];

  while (stack.length) {
    const dir = stack.pop()!;
    let entries: Dirent[];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      continue; // не каталог / нет доступа – пропускаем
    }

    for (const entry of entries) {
      const full = join(dir, entry.name);

      if (entry.isDirectory()) {
        // Кладём подкаталог в стек; при желании можно сортировать для детерминированного порядка
        stack.push(full);
      } else if (entry.isFile()) {
        files.push(full);
      } else if (opts.followSymlinks && entry.isSymbolicLink()) {
        try {
          const s = await stat(full);
          if (s.isDirectory()) stack.push(full);
          else if (s.isFile()) files.push(full);
        } catch (err) {
          const code = (err as NodeJS.ErrnoException)?.code;
          // Игнорируем типичные «безопасные» кейсы симлинков
          if (code === 'ENOENT' || code === 'EACCES' || code === 'EPERM') {
            // no-op
          } else {
            throw err; // всё остальное – настоящая ошибка
          }
        }
      }
    }
  }

  return files;
}`,
} satisfies Algorithm;

export default algo;
