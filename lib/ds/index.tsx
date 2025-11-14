import React from 'react';

export type DSItem = {
    slug: string;
    title: string;
    definition: React.ReactNode;
    type?: React.ReactNode | string;
    useWhen: string[];
    complexity: Array<{ op: string; bigO: string; note?: string }>;
    filename: string;
    language: 'ts' | 'tsx';
    buildSource: () => string;
};

export const dataStructures: DSItem[] = [
    {
        slug: 'array',
        title: 'Массив (Array)',
        definition: (
            <>
                Массив — это упорядоченная коллекция элементов, где каждый элемент имеет свой числовой индекс,
                начиная с 0. В JavaScript массивы динамические: их размер автоматически изменяется при
                добавлении или удалении элементов.
                <br/>
                <b>Основное преимущество:</b> мгновенный доступ к любому элементу по индексу O(1).
                <br/>
                <b>Недостаток:</b> вставка или удаление элементов в середине массива требует сдвига
                всех последующих элементов, что медленно O(n).
            </>
        ),
        type: (
            <>
                <code>T[]</code> или <code>Array&lt;T&gt;</code>
            </>
        ),
        useWhen: [
            'Нужен быстрый доступ по индексу (O(1))',
            'Данные компактные, важна локальность в памяти',
        ],
        complexity: [
            { op: 'Доступ по индексу', bigO: 'O(1)' },
            { op: 'Линейный поиск', bigO: 'O(n)' },
            { op: 'Вставка/удаление в конец', bigO: 'амортиз. O(1)' },
            { op: 'Вставка/удаление в середине', bigO: 'O(n)' },
            { op: 'Память', bigO: 'O(n)' },
        ],
        filename: 'array.ts',
        language: 'ts',
        buildSource: () => `
const a = [10, 20, 30];
a.push(40);           // O(1) амортизированно
const x = a[1];        // O(1)
console.log(x);         // -> 20
const i = a.indexOf(30); // O(n)
a.splice(i, 1);           // удалить из середины: O(n)
console.log(a);            // -> [10, 20, 40]
`.trim(),
    },

    {
        slug: 'linked-list',
        title: 'Связный список (Singly Linked List)',
        definition: (
            <>
                Связный список — это структура данных, состоящая из узлов, где каждый узел содержит
                данные и ссылку на следующий узел. В отличие от массива, элементы не хранятся
                последовательно в памяти — их порядок определяется связями между узлами.
                <br/>
                <b>Основное преимущество:</b> вставка и удаление элементов по известной ссылке выполняются
                за O(1) — достаточно изменить указатели, не сдвигая остальные элементы.
                <br/>
                <b>Недостаток:</b> доступ к элементу по индексу требует последовательного обхода от начала
                списка O(n).
            </>
        ),
        type: (
            <>
                <code>{'type Node<T> = { value: T; next: Node<T> | null }'}</code>
            </>
        ),
        useWhen: [
            'Много вставок/удалений в середине по ссылке',
            'Нужна стабильная асимптотика без перераспределения массива',
        ],
        complexity: [
            { op: 'Поиск по значению', bigO: 'O(n)' },
            { op: 'Доступ по индексу', bigO: 'O(n)' },
            { op: 'Вставка/удаление по ссылке', bigO: 'O(1)' },
            { op: 'Память', bigO: 'O(n)' },
        ],
        filename: 'linked-list.ts',
        language: 'ts',
        buildSource: () => `
type Node<T> = { value: T; next: Node<T> | null };

class LinkedList<T> {
  private head: Node<T> | null = null;
  append(value: T) {
    const n: Node<T> = { value, next: null };
    if (!this.head) { this.head = n; return; }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = n;
  }
  find(pred: (x:T)=>boolean): Node<T> | null {
    let cur = this.head;
    while (cur) { if (pred(cur.value)) return cur; cur = cur.next; }
    return null;
  }
}

const list = new LinkedList<number>();
list.append(10); list.append(20); list.append(30);
console.log(!!list.find(x => x === 20)); // true`.trim(),
    },

    {
        slug: 'hash-table',
        title: 'Хеш-таблица (Hash Table / Map)',
        definition: (
            <>
                Хеш-таблица — это структура данных для хранения пар «ключ→значение», где ключ
                преобразуется в индекс массива с помощью хеш-функции. Это обеспечивает очень быстрый
                поиск, вставку и удаление элементов.
                <br/>
                В JavaScript используется <code>Map</code> (для любых ключей) или объект <code>Record</code>
                (для строковых ключей).
                <br/>
                <b>Основное преимущество:</b> операции выполняются в среднем за O(1).
                <br/>
                <b>Недостаток:</b> в худшем случае (при коллизиях) производительность падает до O(n).
                Коллизии возникают, когда разные ключи получают один и тот же хеш.
            </>
        ),
        type: (
            <>
                <code>Map&lt;K, V&gt;</code> или <code>Record&lt;string, V&gt;</code>
            </>
        ),
        useWhen: ['Быстрые поиск/вставка по ключу', 'Построение индексов/кэшей'],
        complexity: [
            { op: 'Поиск/вставка/удаление', bigO: 'ср. O(1), худш. O(n)' },
            { op: 'Память', bigO: 'O(n)' },
        ],
        filename: 'hash-table.ts',
        language: 'ts',
        buildSource: () => `
const phone = new Map<string, string>();
phone.set('Alice', '111-22-33');
phone.set('Bob',   '222-33-44');

console.log(phone.get('Bob')); // '222-33-44'
phone.delete('Alice');`.trim(),
    },

    {
        slug: 'stack',
        title: 'Стек (Stack)',
        definition: (
            <>
                Стек — это структура данных, работающая по принципу LIFO (Last In, First Out):
                последний добавленный элемент извлекается первым. Представьте стопку тарелок — можно
                положить или взять тарелку только сверху.
                <br/>
                <b>Основные операции:</b> <code>push</code> (добавить элемент), <code>pop</code>
                (извлечь последний элемент), <code>peek</code> (посмотреть последний элемент без извлечения).
                <br/>
                <b>Применение:</b> отмена действий (Undo), обход графов в глубину (DFS),
                проверка скобочных последовательностей, вычисление арифметических выражений.
            </>
        ),
        type: (
          <>
              <code>Stack&lt;T&gt;</code> (обычно реализуется через массив)
          </>
        ),
        useWhen: ['Отмена действий', 'Обходы DFS', 'Парсинг скобок/выражений'],
        complexity: [
            { op: 'push/pop/top', bigO: 'O(1)' },
            { op: 'Поиск по значению', bigO: 'O(n)' },
            { op: 'Память', bigO: 'O(n)' },
        ],
        filename: 'stack.ts',
        language: 'ts',
        buildSource: () => `
class Stack<T> {
  private a: T[] = [];
  push(x:T){ this.a.push(x); }
  pop():T|undefined{ return this.a.pop(); }
  peek():T|undefined{ return this.a[this.a.length-1]; }
  get size(){ return this.a.length; }
}
const st = new Stack<number>();
st.push(1); st.push(2); console.log(st.pop()); // 2`.trim(),
    },

    {
        slug: 'queue',
        title: 'Очередь (Queue)',
        definition: (
            <>
                Очередь — это структура данных, работающая по принципу FIFO (First In, First Out):
                первый добавленный элемент извлекается первым. Как в живой очереди в магазине —
                кто первый пришёл, тот первый и обслуживается.
                <br/>
                <b>Основные операции:</b> <code>enqueue</code> (добавить в конец),
                <code>dequeue</code> (извлечь из начала).
                <br/>
                <b>Реализация:</b> для эффективного <code>dequeue</code> за O(1) используется индекс головы,
                чтобы не сдвигать все элементы при извлечении.
                <br/>
                <b>Применение:</b> обход графов в ширину (BFS), планировщики задач, обработка событий.
            </>
        ),
        type: (
          <>
              <code>Queue&lt;T&gt;</code> (обычно реализуется через массив с индексом головы)
          </>
        ),
        useWhen: ['Обход в ширину (BFS)', 'Планирование задач, очереди событий'],
        complexity: [
            { op: 'enqueue/dequeue', bigO: 'O(1) амортиз.' },
            { op: 'Поиск по значению', bigO: 'O(n)' },
            { op: 'Память', bigO: 'O(n)' },
        ],
        filename: 'queue.ts',
        language: 'ts',
        buildSource: () => `
class Queue<T> {
  private a: T[] = [];
  private head = 0;
  enqueue(x:T){ this.a.push(x); }
  dequeue():T|undefined{
    return this.head < this.a.length ? this.a[this.head++] : undefined;
  }
  get size(){ return this.a.length - this.head; }
}
const q = new Queue<number>();
q.enqueue(10); q.enqueue(20); console.log(q.dequeue()); // 10`.trim(),
    },

    {
        slug: 'bst',
        title: 'Двоичное поисковое дерево (BST)',
        definition: (
            <>
                Двоичное поисковое дерево — это иерархическая структура данных, где каждый узел имеет
                не более двух детей. Соблюдается важное правило: все элементы в левом поддереве
                меньше корня, а все элементы в правом поддереве больше корня.
                <br/>
                <b>Преимущество:</b> на сбалансированном дереве поиск, вставка и удаление выполняются
                за O(log n). Дерево также поддерживает упорядоченный обход элементов.
                <br/>
                <b>Недостаток:</b> при несбалансированной структуре (например, при последовательной вставке
                возрастающих значений) дерево вырождается в список, и операции выполняются за O(n).
                <br/>
                <b>Самобалансирующиеся варианты:</b> AVL-дерево и Red-Black дерево автоматически
                поддерживают баланс, гарантируя O(log n) для всех операций.
            </>
        ),
        type: (
            <>
                <code>{'type Node = { key: number; left: Node | null; right: Node | null }'}</code>
            </>
        ),
        useWhen: ['Нужны упорядоченные ключи', 'Нужны диапазонные запросы'],
        complexity: [
            { op: 'Поиск/вставка/удаление', bigO: 'ср. O(log n), худш. O(n)' },
            { op: 'Память', bigO: 'O(n)' },
        ],
        filename: 'bst.ts',
        language: 'ts',
        buildSource: () => `
type Node = { key:number; left:Node|null; right:Node|null };

function insert(t:Node|null, key:number):Node{
  if(!t) return {key,left:null,right:null};
  if(key < t.key) t.left  = insert(t.left, key);
  else if(key > t.key) t.right = insert(t.right, key);
  return t;
}
function has(t:Node|null, key:number):boolean{
  if(!t) return false;
  if(key === t.key) return true;
  return key < t.key ? has(t.left,key) : has(t.right,key);
}
let root:Node|null=null;
[5,2,7,1,3].forEach(k=> root = insert(root,k));
console.log(has(root,3)); // true`.trim(),
    },

    {
        slug: 'graph-adj',
        title: 'Граф: список смежности',
        definition: (
            <>
                Граф — это структура данных, представляющая связи между объектами (вершинами).
                Список смежности — один из способов хранения графа: для каждой вершины хранится
                список её соседей (смежных вершин).
                <br/>
                <b>Преимущество:</b> экономия памяти для разреженных графов (когда рёбер намного меньше,
                чем возможных пар вершин). Память: O(V + E), где V — количество вершин, E — количество рёбер.
                <br/>
                <b>Применение:</b> алгоритмы обхода графа (BFS, DFS), поиск кратчайших путей
                (Dijkstra, Bellman-Ford), топологическая сортировка.
                <br/>
                <b>Альтернатива:</b> матрица смежности — двумерный массив V×V, удобна для плотных графов,
                но требует O(V²) памяти.
            </>
        ),
        type: (
            <>
                <code>Record&lt;string, string[]&gt;</code> или <code>Map&lt;V, V[]&gt;</code>
            </>
        ),
        useWhen: ['BFS/DFS', 'Кратчайшие пути, поиск в ширину/глубину'],
        complexity: [
            { op: 'Итерация соседей', bigO: 'O(deg(v))' },
            { op: 'BFS/DFS', bigO: 'O(V+E)' },
            { op: 'Память', bigO: 'O(V+E)' },
        ],
        filename: 'graph-adj.ts',
        language: 'ts',
        buildSource: () => `
type Graph = Record<string, string[]>;

const g: Graph = {
  A: ['B','C'],
  B: ['D'],
  C: ['D','E'],
  D: ['F'],
  E: [],
  F: [],
};
// соседей вершины:
console.log(g['C']); // ['D','E']`.trim(),
    },

    {
        slug: 'binary-heap',
        title: 'Двоичная куча (мин-куча)',
        definition: (
            <>
                Двоичная куча — это полное бинарное дерево, представленное в виде массива,
                где выполняется свойство кучи: родительский элемент всегда меньше (для мин-кучи)
                или больше (для макс-кучи) своих детей.
                <br/>
                <b>Ключевое свойство:</b> минимальный элемент всегда находится в корне (индекс 0),
                и доступ к нему выполняется за O(1).
                <br/>
                <b>Операции:</b> вставка и удаление минимума выполняются за O(log n) путём «просеивания»
                элементов вверх или вниз для восстановления свойства кучи.
                <br/>
                <b>Применение:</b> приоритетные очереди, алгоритм Дейкстры, сортировка кучей (heapsort),
                слияние K отсортированных списков.
                <br/>
                <b>Преимущество перед BST:</b> более компактное представление в памяти и гарантированный
                доступ к минимуму/максимуму за O(1).
            </>
        ),
        type: (
            <>
                <code>MinHeap</code> (внутри массив: <code>number[]</code>)
            </>
        ),
        useWhen: [
            'Нужен быстрый доступ к минимуму',
            'Приоритетная очередь, Dijkstra, k-way merge',
        ],
        complexity: [
            { op: 'getMin / peek', bigO: 'O(1)' },
            { op: 'insert / push', bigO: 'O(log n)' },
            { op: 'extractMin / pop', bigO: 'O(log n)' },
            { op: 'heapify (из массива)', bigO: 'O(n)' },
            { op: 'Память', bigO: 'O(n)' },
        ],
        filename: 'min-heap.ts',
        language: 'ts',
        buildSource: () => `
/**
 * Мин-куча (min-heap): быстрый доступ к минимуму.
 * Реализация на массиве: индексы детей и родителя считаются по формулам.
 * Вариант под учебные цели – читабельные имена и комментарии.
 */
class MinHeap {
  private a: number[] = [];

  // Индексы родителя/детей
  private parent(i: number) { return (i - 1) >> 1; }
  private left(i: number)   { return i * 2 + 1; }
  private right(i: number)  { return i * 2 + 2; }

  /** Просеивание вверх после вставки – O(log n) */
  private siftUp(i: number): void {
    while (i > 0) {
      const p = this.parent(i);
      if (this.a[p] <= this.a[i]) break;
      [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
      i = p;
    }
  }

  /** Просеивание вниз после удаления корня – O(log n) */
  private siftDown(i: number): void {
    const n = this.a.length;
    while (true) {
      const l = this.left(i);
      const r = this.right(i);
      let m = i; // индекс наименьшего среди (i, l, r)

      if (l < n && this.a[l] < this.a[m]) m = l;
      if (r < n && this.a[r] < this.a[m]) m = r;
      if (m === i) break;

      [this.a[i], this.a[m]] = [this.a[m], this.a[i]];
      i = m;
    }
  }

  /** Добавить элемент – O(log n) */
  push(x: number): void {
    this.a.push(x);
    this.siftUp(this.a.length - 1);
  }

  /** Посмотреть минимум – O(1) */
  peek(): number | undefined {
    return this.a[0];
  }

  /** Извлечь минимум – O(log n) */
  pop(): number | undefined {
    const n = this.a.length;
    if (n === 0) return undefined;

    const min = this.a[0];
    const last = this.a.pop()!;
    if (n > 1) {
      this.a[0] = last;
      this.siftDown(0);
    }
    return min;
  }

  /** Текущий размер – O(1) */
  get size(): number {
    return this.a.length;
  }

  /** Построить кучу из массива (heapify) – O(n) */
  static from(arr: number[]): MinHeap {
    const h = new MinHeap();
    h.a = arr.slice(); // копия исходного массива
    for (let i = (h.a.length >> 1) - 1; i >= 0; i--) {
      h.siftDown(i);
    }
    return h;
  }
}

// Пример использования:
const h = MinHeap.from([5, 3, 7, 1]);
console.log(h.peek()); // 1
h.push(0);
console.log(h.pop());  // 0
console.log(h.pop());  // 1
`.trim(),
    },
];
