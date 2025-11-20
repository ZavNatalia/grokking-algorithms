import React from 'react';
import { Algorithm } from '../types';

const algo = {
    slug: 'trees-bst',
    title: 'Деревья: обход файловой системы (BFS, очередь)',
    description: (
        <>
            Файловая система – это дерево: каталоги – узлы, файлы – листья.
            Обход в ширину (BFS) идёт по уровням, используя очередь, и собирает
            пути ко всем файлам. Подходит для задач вроде: вывести имена всех
            файлов в каталоге <code>pics</code>, включая все подкаталоги.
        </>
    ),
    complexity: (
        <>
            Время – <code>O(N)</code> по числу записей (файлы+каталоги), память
            – <code>O(W)</code>, где <i>W</i> – максимальная ширина уровня.
        </>
    ),
    filename: 'walkDirBfs.ts',
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
 * Обходит дерево каталогов в ширину (BFS) и возвращает список файлов.
 *
 * Требование: вывести имена всех файлов в каталоге \`pics\`,
 * включая все его подкаталоги.
 *
 * Пример:
 *   (async () => {
 *     const files = await walkDirBfs('pics');          // корень обхода
 *     for (const f of files) console.log(basename(f)); // печать только имён
 *   })().catch(console.error);
 */
export async function walkDirBfs(root: string, opts: WalkOptions = {}): Promise<string[]> {
  const files: string[] = [];
  const queue: string[] = [root];

  while (queue.length) {
    const dir = queue.shift()!;
    let entries: Dirent[];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      continue; // не каталог / нет доступа - пропускаем
    }

    for (const entry of entries) {
      const full = join(dir, entry.name);

      if (entry.isDirectory()) {
        queue.push(full);
      } else if (entry.isFile()) {
        files.push(full);
      } else if (opts.followSymlinks && entry.isSymbolicLink()) {
        try {
          const s = await stat(full);
          if (s.isDirectory()) queue.push(full);
          else if (s.isFile()) files.push(full);
        } catch (err) {
          const code = (err as NodeJS.ErrnoException)?.code;
          // игнорируем типичные «безопасные» кейсы симлинков
          if (code === 'ENOENT' || code === 'EACCES' || code === 'EPERM') {
            // no-op
          } else {
            throw err; // всё остальное - настоящая ошибка
          }
        }
      }
    }
  }

  return files;
}`,
} satisfies Algorithm;

export default algo;
