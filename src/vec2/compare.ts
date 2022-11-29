import { A } from '@mobily/ts-belt'
import { Vec2, asTuple, isVec2 } from './vec2'
import { NumFn } from './operator'

const compares = ['eq', 'neq', 'gt', 'lt', 'gte', 'lte'] as const
type Compare = typeof compares[number]

type VecToFn<T> = {
  (a: Vec2): (b: Vec2) => T
  (a: Vec2, b: Vec2): T
}
type VecToBool = VecToFn<boolean>

const cmps: Record<Compare, NumFn<boolean>> = {
  eq: (a, b) => a === b,
  neq: (a, b) => a !== b,
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
  gte: (a, b) => a >= b,
  lte: (a, b) => a <= b,
} as const

export const cmpGen = (op: Compare) => {
  const fn = (a: Vec2, b: Vec2) => A.eq(asTuple(a), asTuple(b), cmps[op])
  return ((a, b) => (isVec2(b) ? fn(a, b) : (c: Vec2) => fn(c, a))) as VecToBool
}

export const [eq, neq, gt, lt, gte, lte] = compares.map(cmpGen)
