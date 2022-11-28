import { test, expect } from 'vitest'
import { WidgetType } from 'common'
import { movableToEmpty as isMovableToEmpty, moveItemSwap } from './GridTools'
import { CoordsBetween, makeGridCoordinates, coordsOf } from './GridTools'
import { mock } from 'dummy'
import { Pos, pos, size } from 'vec2'

test.each`
  widget     | res
  ${mock[0]} | ${[pos(0, 0)]}
  ${mock[1]} | ${[pos(1, 0), pos(2, 0)]}
  ${mock[2]} | ${[pos(0, 1), pos(0, 2)]}
  ${mock[3]} | ${[pos(3, 1), pos(3, 2), pos(4, 1), pos(4, 2)]}
`(
  'makeWidgetCoordinates($widget) -> [$res]',
  ({ widget, res }: { widget: WidgetType; res: Pos[] }) =>
    expect(coordsOf(widget)).toEqual(res)
)

test.each`
  start        | size          | res
  ${pos(0, 0)} | ${size(1, 1)} | ${[mock[0]]}
  ${pos(0, 0)} | ${size(2, 2)} | ${[mock[0], mock[1], mock[2], mock[4]]}
  ${pos(2, 2)} | ${size(1, 1)} | ${[]}
`('coordinateRangeWidgets($start, $end) -> [$res]', ({ start, size, res }) =>
  expect(CoordsBetween(mock, start, size)).toEqual(res)
)

test('makeGridCoordinates', () => {
  expect(makeGridCoordinates(mock)).toEqual([
    [{ uuid: 'weather01' }, { uuid: 'weather03' }, { uuid: 'weather03' }],
    [{ uuid: 'memo02' }, { uuid: 'todo05' }, { uuid: 'empty' }],
    [{ uuid: 'memo02' }, { uuid: 'empty' }, { uuid: 'empty' }],
    [{ uuid: 'empty' }, { uuid: 'ascii04' }, { uuid: 'ascii04' }],
    [{ uuid: 'empty' }, { uuid: 'ascii04' }, { uuid: 'ascii04' }],
  ])
})

test.each`
  pos          | res
  ${pos(1, 1)} | ${mock[4]}
  ${pos(1, 0)} | ${undefined}
  ${pos(0, 1)} | ${undefined}
  ${pos(2, 2)} | ${undefined}
`('moveItemSwap(mock[0], $pos, mock) -> [$res]', ({ pos, res }) =>
  expect(moveItemSwap(mock[0], pos, mock)).toEqual(res)
)

test.each`
  item       | pos           | res
  ${mock[0]} | ${pos(1, 1)}  | ${false}
  ${mock[0]} | ${pos(1, 0)}  | ${false}
  ${mock[0]} | ${pos(0, 1)}  | ${false}
  ${mock[0]} | ${pos(2, 2)}  | ${true}
  ${mock[1]} | ${pos(1, 0)}  | ${true}
  ${mock[2]} | ${pos(2, 0)}  | ${true}
  ${mock[3]} | ${pos(0, -1)} | ${true}
  ${mock[4]} | ${pos(1, 0)}  | ${true}
`('isMovableToEmpty($item, $pos, mock) -> [$res]', ({ item, pos, res }) =>
  expect(isMovableToEmpty(item, pos, mock)).toEqual(res)
)
