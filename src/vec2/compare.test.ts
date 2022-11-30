import { expect, test, describe } from 'vitest'
import { pos, Vec2, Pos } from './vec2'
import { eq, neq, VecToBool } from './compare'
import { assert, property, array, integer, tuple } from 'fast-check'

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

test('비교 연산자(속성 기반)', () => {
  const posGen = () => tuple(integer(), integer()).map(([x, y]) => pos(x, y))
  const posPairGen = () => array(posGen(), { minLength: 2, maxLength: 2 })

  type CmpImpl = (a: Pos, b: Pos) => boolean
  const impl: Record<string, CmpImpl> = {
    eq: (a, b) => a.x === b.x && a.y === b.y,
    neq: (a, b) => a.x !== b.x || a.y !== b.y,
  }

  assert(property(posPairGen(), ([a, b]) => eq(a, b) === impl.eq(a, b)))
  assert(property(posPairGen(), ([a, b]) => neq(a, b) === impl.neq(a, b)))
})
