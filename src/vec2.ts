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

const ops: Record<string, (a: number, b: number) => number> = {
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

export function plus<T extends Vec2>(a: Vec2): (b: T) => T
export function plus<T extends Vec2>(a: T, b: Vec2): T
export function plus(a: Vec2, b?: Vec2) {
  return b ? vecOps(ops['+'])(a, b) : (c: Vec2) => plus(c, a)
}

export function sub<T extends Vec2>(a: Vec2): (b: T) => T
export function sub<T extends Vec2>(a: T, b: Vec2): T
export function sub(a: Vec2, b?: Vec2) {
  return b ? vecOps(ops['-'])(a, b) : (c: Vec2) => sub(c, a)
}

export function eq(a: Vec2): (b: Vec2) => boolean
export function eq(a: Vec2, b: Vec2): boolean
export function eq(a: Vec2, b?: Vec2) {
  return isVec2(b)
    ? A.eq(asTuple(a), asTuple(b), (a, b) => a === b)
    : (c: Vec2) => eq(c, a)
}

export function gte(a: Vec2): (b: Vec2) => boolean
export function gte(a: Vec2, b: Vec2): boolean
export function gte(a: Vec2, b?: Vec2) {
  return isVec2(b)
    ? A.eq(asTuple(a), asTuple(b), (a, b) => a >= b)
    : (c: Vec2) => gte(c, a)
}

export function lte(a: Vec2): (b: Vec2) => boolean
export function lte(a: Vec2, b: Vec2): boolean
export function lte(a: Vec2, b?: Vec2) {
  return isVec2(b)
    ? A.eq(asTuple(a), asTuple(b), (a, b) => a <= b)
    : (c: Vec2) => lte(c, a)
}

export function lt(a: Vec2): (b: Vec2) => boolean
export function lt(a: Vec2, b: Vec2): boolean
export function lt(a: Vec2, b?: Vec2) {
  return isVec2(b)
    ? A.eq(asTuple(a), asTuple(b), (a, b) => a < b)
    : (c: Vec2) => lt(c, a)
}
