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

type OP = '+' | '-' | '/' | '*'
const ops: Record<OP, (a: number, b: number) => number> = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b,
  '*': (a, b) => a * b,
} as const

type VecOps = (a: Vec2, b: Vec2) => Vec2
const vecOps =
  (fn: (a: number, b: number) => number): VecOps =>
  (a, b) => {
    const val = A.zipWith(asTuple(a), asTuple(b), fn) as Tuple
    return isPos(a) ? pos(...val) : size(...val)
  }

type VecOpFn = {
  <T extends Vec2>(a: Vec2): (b: T) => T
  <T extends Vec2>(a: T, b: Vec2): T
}

const opGen = (op: OP) => {
  const fn = vecOps(ops[op])
  return ((a, b) => {
    return b ? fn(a, b) : (c: Vec2) => fn(c, a)
  }) as VecOpFn
}

export const plus: VecOpFn = opGen('+')
export const sub: VecOpFn = opGen('-')

type VecToFn<T> = {
  (a: Vec2): (b: Vec2) => T
  (a: Vec2, b: Vec2): T
}
type VecToBool = VecToFn<boolean>

export const eq: VecToBool = ((a, b) =>
  isVec2(b)
    ? A.eq(asTuple(a), asTuple(b), (a, b) => a === b)
    : (c: Vec2) => eq(c, a)) as VecToBool

export const gte: VecToBool = ((a, b) =>
  isVec2(b)
    ? A.eq(asTuple(a), asTuple(b), (a, b) => a >= b)
    : (c: Vec2) => gte(c, a)) as VecToBool

export const lte: VecToBool = ((a, b) =>
  isVec2(b)
    ? A.eq(asTuple(a), asTuple(b), (a, b) => a <= b)
    : (c: Vec2) => lte(c, a)) as VecToBool

export const lt: VecToBool = ((a, b) =>
  isVec2(b)
    ? A.eq(asTuple(a), asTuple(b), (a, b) => a < b)
    : (c: Vec2) => lt(c, a)) as VecToBool
