import { test, expect, describe } from 'vitest'
import { Widget } from 'common'
import { isMovableToEmpty, moveItemSwap } from './GridTools'
import { coordsBetween, widgetCoords, coordsOf } from './GridTools'
import { mock } from 'dummy'
import { Pos, pos, Size, size } from 'vec2'

type Params = {
  widget: Widget
  pos: Pos
  size: Size
}

test.each`
  widget     | res
  ${mock[0]} | ${[pos(0, 0)]}
  ${mock[1]} | ${[pos(1, 0), pos(2, 0)]}
  ${mock[2]} | ${[pos(0, 1), pos(0, 2)]}
  ${mock[3]} | ${[pos(3, 1), pos(3, 2), pos(4, 1), pos(4, 2)]}
`(
  'makeWidgetCoordinates($widget) -> [$res]',
  ({ widget, res }: Params & { res: Pos[] }) =>
    expect(coordsOf(widget)).toEqual(res)
)

test.each`
  pos          | size          | res
  ${pos(0, 0)} | ${size(1, 1)} | ${[mock[0]]}
  ${pos(0, 0)} | ${size(2, 2)} | ${[mock[0], mock[1], mock[2], mock[4]]}
  ${pos(2, 2)} | ${size(1, 1)} | ${[]}
`(
  'coordinateRangeWidgets($pos, $end) -> [$res]',
  ({ pos, size, res }: Params & { res: Widget[] }) =>
    expect(coordsBetween(mock, pos, size)).toEqual(res)
)

describe('makeGridCoordinates', () => {
  const asCoords = (arr: string[][]) =>
    arr.map(row => row.map(uuid => ({ uuid })))

  test('mock', () =>
    expect(widgetCoords(mock)).toEqual(
      asCoords([
        ['weather01', 'weather03', 'weather03'],
        ['memo02', 'todo05', 'empty'],
        ['memo02', 'empty', 'empty'],
        ['empty', 'ascii04', 'ascii04'],
        ['empty', 'ascii04', 'ascii04'],
      ])
    ))
})

test.each`
  pos          | res
  ${pos(1, 1)} | ${mock[4]}
  ${pos(1, 0)} | ${undefined}
  ${pos(0, 1)} | ${undefined}
  ${pos(2, 2)} | ${undefined}
`(
  'moveItemSwap(mock[0], $pos, mock) -> [$res]',
  ({ pos, res }: Params & { res?: Widget }) =>
    expect(moveItemSwap(mock[0], pos, mock)).toEqual(res)
)

test.each`
  widget     | pos           | res
  ${mock[0]} | ${pos(1, 1)}  | ${false}
  ${mock[0]} | ${pos(1, 0)}  | ${false}
  ${mock[0]} | ${pos(0, 1)}  | ${false}
  ${mock[0]} | ${pos(2, 2)}  | ${true}
  ${mock[1]} | ${pos(1, 0)}  | ${true}
  ${mock[2]} | ${pos(2, 0)}  | ${true}
  ${mock[3]} | ${pos(0, -1)} | ${true}
  ${mock[4]} | ${pos(1, 0)}  | ${true}
`(
  'isMovableToEmpty($widget, $pos, mock) -> [$res]',
  ({ widget, pos, res }: Params & { res: boolean }) =>
    expect(isMovableToEmpty(widget, pos, mock)).toEqual(res)
)
