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
  return b !== undefined && typeof a === 'number'
    ? { x: a, y: b }
    : { x: (a as Size).w, y: (a as Size).h }
}

export function size(pos: Pos): Size
export function size(w: number, h: number): Size
export function size(a: Pos | number, b?: number): Size {
  return b !== undefined && typeof a === 'number'
    ? { w: a, h: b }
    : { w: (a as Pos).x, h: (a as Pos).y }
}
