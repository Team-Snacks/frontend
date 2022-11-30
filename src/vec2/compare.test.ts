import { expect, test, describe } from 'vitest'
import { pos, Vec2, Pos } from './vec2'
import { eq, cmp, neq, VecToBool } from './compare'
import { assert, property, array, integer, tuple } from 'fast-check'
import { A } from '@mobily/ts-belt'

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
  `('%o', testCmp(eq))

  test.each`
    a    | b    | out
    ${t} | ${t} | ${false}
    ${f} | ${t} | ${true}
    ${t} | ${f} | ${true}
    ${f} | ${f} | ${false}
  `('%o', testCmp(neq))
})

describe('비교 연산자(속성 기반)', () => {
  const posGen = () => tuple(integer(), integer()).map(([x, y]) => pos(x, y))
  const posPairGen = () => array(posGen(), { minLength: 2, maxLength: 2 })

  type CmpImpl = (a: Pos, b: Pos) => boolean
  const impl: Record<string, CmpImpl> = {
    neq: (a, b) => a.x !== b.x || a.y !== b.y,
    eq: (a, b) => a.x === b.x && a.y === b.y,
    gt: (a, b) => a.x > b.x && a.y > b.y,
    lt: (a, b) => a.x < b.x && a.y < b.y,
    gte: (a, b) => a.x >= b.x && a.y >= b.y,
    lte: (a, b) => a.x <= b.x && a.y <= b.y,
  }
  const cases = A.map(Object.entries(impl), ([k, v]) => ({
    name: k,
    impl: v,
    org: cmp[k],
  }))
  test.each(cases)('$name', ({ impl, org }) =>
    assert(property(posPairGen(), ([a, b]) => org(a, b) === impl(a, b)))
  )
})
