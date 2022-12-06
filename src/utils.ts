/**
 * 곱집합 구하기
 *
 * @example
 * [0, 0] 부터 [1, 1] 까지의 곱집합
 * ```ts
 * cartesianProduct([0, 1], [0, 1]) // [[0, 0], [0, 1], [1, 0], [1, 1]]
 * ```
 * @see {@link https://gist.github.com/ssippe/1f92625532eef28be6974f898efb23ef?permalink_comment_id=3530882#gistcomment-3530882}
 */
export const cartesianProduct = <T>(...xs: T[][]) =>
  xs.reduce<T[][]>(
    (acc, x) => acc.flatMap(set => x.map(value => [...set, value])),
    [[]]
  )

function* rangeIter(start: number, end: number, step: number) {
  // eslint-disable-next-line functional/no-loop-statement, functional/no-let
  for (let i = start; i < end; i += step) {
    // eslint-disable-next-line functional/no-expression-statement
    yield i
  }
}

/**
 * 파이썬에서 보던 range 함수
 *
 * @param start 시작값
 * @param end 끝값 (생략시 0부터 시작)
 * @param step 증가값 (기본값: 1)
 *
 * @example
 * ```ts
 * range(5) // [0, 1, 2, 3, 4]
 * range(0, 5) // [0, 1, 2, 3, 4]
 * range(1, 5) // [1, 2, 3, 4]
 * range(0, 5, 2) // [0, 2, 4]
 * ```
 */
export const range = (
  ...args: [number] | [number, number] | [number, number, number]
): number[] => {
  switch (args.length) {
    case 1: {
      const [end] = args
      return [...rangeIter(0, end, 1)]
    }
    case 2: {
      const [start, end] = args
      return [...rangeIter(start, end, 1)]
    }
    case 3: {
      const [start, end, step] = args
      return [...rangeIter(start, end, step)]
    }
  }
}

/**
 * 깊은 복사된 원소를 N번 반복하는 배열 생성
 *
 * @example
 * ```ts
 * replicate(5, () => 3) // [3, 3, 3, 3, 3]
 * replicate(3, () => 'a') // ['a', 'a', 'a']
 * ```
 *
 * 얕은 복사의 예:
 * @example
 * ```ts
 * const arr = [1, 2]
 * const foo = [arr, arr]
 * foo[0] === foo[1] // true
 *```
 * 깊은 복사의 예:
 * @example
 * ```ts
 * const bar = replicate(2, () => [1, 2]) // [[1, 2], [1, 2]]
 * bar[0] === foo[1] // false
 * ```
 */
export const replicate = <T>(count: number, fn: () => T): T[] =>
  [...Array(count)].map(fn)


export type CurriedDataFrontFn<A, B> = {
  (a: A, b: A): B
  (b: A): (a: A) => B
}
/**
 * @example
 * const sub = (a: number, b: number) => a - b
 * const mySub = frontCurry2(sub)
 * pipe(3, mySub(2)) // 1
 * mySub(3, 2) // 1
 */
export const frontCurry2 =
  <A, B>(fn: (a: A, b: A) => B) =>
  (first: A, second?: A) =>
    (second === undefined ? (a: A) => fn(a, first) : fn(first, second)) as CurriedDataFrontFn<A, B>
