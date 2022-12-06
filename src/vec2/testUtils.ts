import { pos } from './vec2'
import { array, integer, tuple } from 'fast-check'

const posGen = () => tuple(integer(), integer()).map(([x, y]) => pos(x, y))
export const posPairGen = () => array(posGen(), { minLength: 2, maxLength: 2 })
