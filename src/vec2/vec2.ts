export type Pos = {
  readonly x: number
  readonly y: number
}

export type Size = {
  readonly w: number
  readonly h: number
}
export type Vec2 = Pos | Size

export type Tuple = readonly [number, number]
export const isPos = (val: Vec2): val is Pos => 'x' in val && 'y' in val
export const isSize = (val: Vec2): val is Size => 'w' in val && 'h' in val
export const isVec2 = (val?: Vec2): val is Vec2 =>
  val !== undefined && (isPos(val) || isSize(val))

export const asTuple = (v: Vec2): Tuple => (isPos(v) ? [v.x, v.y] : [v.w, v.h])

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
