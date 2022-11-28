import { A } from '@mobily/ts-belt'

export type Pos = {
  readonly x: number
  readonly y: number
}

export type Size = {
  readonly w: number
  readonly h: number
}
export type Vec2 = Pos | Size

type Tuple = readonly [number, number]
export const isPos = (val: Vec2): val is Pos => 'x' in val && 'y' in val
export const isSize = (val: Vec2): val is Size => 'w' in val && 'h' in val
const isVec2 = (val?: Vec2): val is Vec2 =>
  val !== undefined && (isPos(val) || isSize(val))

const asTuple = (v: Vec2): Tuple => (isPos(v) ? [v.x, v.y] : [v.w, v.h])

export function pos(size: Size): Pos
export function pos(x: number, y: number): Pos
export function pos(a: Size | number, b?: number): Pos {
  if (typeof a !== 'number' && isSize(a)) {
    return { x: a.w, y: a.h }
  } else if (typeof a === 'number' && typeof b === 'number') {
    return { x: a, y: b }
  } else {
    throw new Error(`Invalid arguments (${a}, ${b})`)
  }
}

export function size(pos: Pos): Size
export function size(w: number, h: number): Size
export function size(a: Pos | number, b?: number): Size {
  if (typeof a !== 'number' && isPos(a)) {
    return { w: a.x, h: a.y }
  } else if (typeof a === 'number' && typeof b === 'number') {
    return { w: a, h: b }
  } else {
    throw new Error(`Invalid arguments (${a}, ${b})`)
  }
}

type ValueOf<T> = T[keyof T]

const allOps = ['+', '-', '/', '*'] as const
type Op = typeof allOps[number]
type NumFn<T> = (a: number, b: number) => T

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

type VecToFn<T> = {
  (a: Vec2): (b: Vec2) => T
  (a: Vec2, b: Vec2): T
}
type VecToBool = VecToFn<boolean>

const compares = ['eq', 'gt', 'lt', 'gte', 'lte'] as const
type Compare = typeof compares[number]

const cmps: Record<Compare, NumFn<boolean>> = {
  eq: (a, b) => a === b,
  gt: (a, b) => a > b,
  lt: (a, b) => a < b,
  gte: (a, b) => a >= b,
  lte: (a, b) => a <= b,
} as const

export const cmpGen = (op: Compare) => {
  const fn = (a: Vec2, b: Vec2) => A.eq(asTuple(a), asTuple(b), cmps[op])
  return ((a, b) =>
    isVec2(b)
      ? fn(a, b)
      : (c: Vec2) => fn(c, a)) as VecToBool
}

export const [eq, gt, lt, gte, lte] = compares.map(cmpGen)
