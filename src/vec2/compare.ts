import { A } from '@mobily/ts-belt'
import { Vec2, asTuple } from './vec2'
import { NumFn } from './operator'
import { frontCurry2 } from 'utils'

const compares = ['eq', 'gt', 'lt', 'gte', 'lte'] as const
type Compare = typeof compares[number]

type VecToFn<T> = {
  (a: Vec2): (b: Vec2) => T
  (a: Vec2, b: Vec2): T
}
export type VecToBool = VecToFn<boolean>

const cmps: Record<Compare, NumFn<boolean>> = {
  eq: (a, b) => a === b,
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
  gte: (a, b) => a >= b,
  lte: (a, b) => a <= b,
} as const

export const cmpGen = (comparator: NumFn<boolean>) => {
  const fn = (a: Vec2, b: Vec2) => A.eq(asTuple(a), asTuple(b), comparator)
  return frontCurry2(fn)
}

export const cmp: Record<string, VecToBool> = {
  neq: ((a, b) => !eq(a, b)) as VecToBool,
  ...Object.fromEntries(
    Object.entries(cmps).map(([c, fn]) => [c, cmpGen(fn)])
  ),
}
export const { eq, neq, gt, lt, gte, lte } = cmp
