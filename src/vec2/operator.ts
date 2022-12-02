import { A } from '@mobily/ts-belt'
import { Vec2, asTuple, Tuple, isPos, pos, size } from './vec2'

type ValueOf<T> = T[keyof T]
const allOps = ['+', '-', '/', '*'] as const
type Op = typeof allOps[number]
export type NumFn<T> = (a: number, b: number) => T
type OpFns = Record<Op, NumFn<number>>
const ops: OpFns = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b,
  '*': (a, b) => a * b,
} as const
type VecOps = (a: Vec2, b: Vec2) => Vec2
const vecOps =
  (fn: ValueOf<OpFns>): VecOps =>
  (a, b) => {
    const val = A.zipWith(asTuple(a), asTuple(b), fn) as Tuple
    return isPos(a) ? pos(...val) : size(...val)
  }
type VecOpFn = {
  <T extends Vec2>(a: Vec2): (b: T) => T
  <T extends Vec2>(a: T, b: Vec2): T
}
const opGen = (op: Op) => {
  const fn = vecOps(ops[op])
  return ((a, b) => (b ? fn(a, b) : (c: Vec2) => fn(c, a))) as VecOpFn
}

export const [plus, sub, div, mul] = allOps.map(opGen)

/** @deprecated 후속 PR에서 제대로 구현 예정 */
export const round = <T extends Vec2>(v: T): T => {
  const val = A.map(asTuple(v), Math.round) as Tuple
  return (isPos(v) ? pos(...val) : size(...val)) as T
}
