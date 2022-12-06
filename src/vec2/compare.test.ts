import { expect, test, describe } from 'vitest'
import { pos, Vec2, Pos } from './vec2'
import { eq, cmp, neq, VecToBool } from './compare'
import { assert, property } from 'fast-check'
import { A, pipe } from '@mobily/ts-belt'
import { posPairGen } from './testUtils'

describe('비교 연산자', () => {
  const [t, f] = [pos(1, 0), pos(0, 0)]
  type Truth = {
    a: Vec2
    b: Vec2
    out: boolean
  }

  const testCmp =
    (cmp: VecToBool) =>
    ({ a, b, out }: Truth) =>
      expect(cmp(a, b)).toBe(out)

  test.each`
    a    | b    | out
    ${t} | ${t} | ${true}
    ${f} | ${t} | ${false}
    ${t} | ${f} | ${false}
    ${f} | ${f} | ${true}
  `('$a == $b -> $out', testCmp(eq))

  test.each`
    a    | b    | out
    ${t} | ${t} | ${false}
    ${f} | ${t} | ${true}
    ${t} | ${f} | ${true}
    ${f} | ${f} | ${false}
  `('$a != $b -> $out', testCmp(neq))
})

describe('비교 연산자(속성 기반)', () => {
  type CmpImpl = (a: Pos, b: Pos) => boolean
  const impl: Record<string, CmpImpl> = {
    neq: (a, b) => a.x !== b.x || a.y !== b.y,
    eq: (a, b) => a.x === b.x && a.y === b.y,
    gt: (a, b) => a.x > b.x && a.y > b.y,
    lt: (a, b) => a.x < b.x && a.y < b.y,
    gte: (a, b) => a.x >= b.x && a.y >= b.y,
    lte: (a, b) => a.x <= b.x && a.y <= b.y,
  }
  const cases = A.zipWith(
    Object.entries(impl),
    Object.entries(cmp),
    ([name, impl], [_, org]) => ({ name, impl, org })
  )
  test.each(cases)('$name', ({ impl, org }) =>
    assert(property(posPairGen(), ([a, b]) => org(a, b) === impl(a, b)))
  )
})

test('커링 및 파이프', () => {
  expect(pipe(pos(1, 1), cmp.lte(pos(2, 2)))).toBe(true)
  expect(cmp.lte(pos(1, 1), pos(2, 2))).toBe(true)
})
