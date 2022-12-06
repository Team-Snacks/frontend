import { A, pipe } from '@mobily/ts-belt'
import { expect, test, describe } from 'vitest'
import { pos, size, isPos, isSize, Pos } from './vec2'
import { ops, plus, round, sub } from './operator'
import { eq } from './compare'
import { assert, property } from 'fast-check'
import { posPairGen } from './testUtils'

const [a, b] = [pos(1, 2), size(3, 4)]

test('커링', () => {
  expect(plus(a, b)).toEqual(pos(4, 6))
  expect(plus(b)(a)).toEqual(pos(4, 6))
})

test('체인', () => {
  expect(pipe(a, plus(b))).toEqual(plus(a, b))
  expect(pipe(a, plus(b), sub(b))).toEqual(a)
  expect(pipe(a, plus(b), sub(b), eq(a))).toBe(true)
})

test('vecOps', () => {
  expect(plus(a, b)).toEqual(pos(4, 6))
  expect(isPos(plus(a, b))).toBe(true)
  expect(isSize(plus(a, b))).toBe(false)

  expect(plus(b, a)).toEqual(size(4, 6))
  expect(sub(a, b)).toEqual(pos(-2, -2))
  expect(sub(b, a)).toEqual(size(2, 2))
})

describe('벡터 연산자(속성 기반)', () => {
  type VecOpImpl = (a: Pos, b: Pos) => Pos
  const impl: Record<string, VecOpImpl> = {
    plus: (a, b) => pos(a.x + b.x, a.y + b.y),
    sub: (a, b) => pos(a.x - b.x, a.y - b.y),
    div: (a, b) => pos(a.x / b.x, a.y / b.y),
    mul: (a, b) => pos(a.x * b.x, a.y * b.y),
    mod: (a, b) => pos(a.x % b.x, a.y % b.y),
    round: (a, b) => pos(Math.round(a.x / b.x), Math.round(a.y / b.y)),
  }
  const cases = A.zipWith(
    Object.entries(impl),
    Object.entries(ops),
    ([name, impl], [_, op]) => ({ name, impl, op })
  )
  test.each(cases)('$name', ({ impl, op }) =>
    assert(property(posPairGen(), ([a, b]) => eq(op(a, b), impl(a, b))))
  )
})

describe('round', () => {
  test.each`
    val               | modifier | expected
    ${pos(2.0, 3.3)}  | ${round} | ${pos(2, 3)}
    ${pos(3.2, 4.9)}  | ${round} | ${pos(3, 5)}
    ${size(4.9, 2.4)} | ${round} | ${size(5, 2)}
    ${size(3.5, 3.5)} | ${round} | ${size(4, 4)}
  `('%o', ({ val, modifier, expected }) =>
    expect(modifier(val)).toEqual(expected)
  )
})
