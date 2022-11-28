import { pipe } from '@mobily/ts-belt'
import { expect, test } from 'vitest'
import { pos, size, isPos, isSize } from './vec2'
import { plus, sub } from './operator'
import { eq } from './compare'

const [a, b] = [pos(1, 2), size(3, 4)]

test('currying', () => {
  expect(plus(a, b)).toEqual(pos(4, 6))
  expect(plus(b)(a)).toEqual(pos(4, 6))
})
test('chaining', () => {
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
