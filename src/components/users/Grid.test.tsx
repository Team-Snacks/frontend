import { test, expect, describe } from 'vitest'
import { Widget, Widgets } from 'common'
import { moveEmptyWidget, swapWidget } from './GridTools'
import { widgetsBetween, widgetCoords, coordsOf } from './GridTools'
import { mock, mock1, mock2, mock3, mock4, mock5, mock6 } from 'dummy'
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
`('coordsOf($widget) -> [$res]', ({ widget, res }: Params & { res: Pos[] }) =>
  expect(coordsOf(widget)).toEqual(res)
)

test.each`
  pos          | size          | res
  ${pos(0, 0)} | ${size(1, 1)} | ${[mock[0]]}
  ${pos(0, 0)} | ${size(2, 2)} | ${[mock[0], mock[1], mock[2], mock[4]]}
  ${pos(2, 2)} | ${size(1, 1)} | ${[]}
`(
  'widgetsBetween($pos, $end) -> [$res]',
  ({ pos, size, res }: Params & { res: Widget[] }) =>
    expect(widgetsBetween(mock, pos, size)).toEqual(res)
)

describe('widgetCoords', () => {
  const asCoords = (arr: string[][]) =>
    arr.map(row => row.map(duuid => ({ duuid })))

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
  ${pos(1, 1)} | ${mock1}
  ${pos(1, 0)} | ${undefined}
  ${pos(0, 1)} | ${undefined}
  ${pos(2, 2)} | ${undefined}
`(
  'swapWidget(mock[0], $pos, mock) -> [$res]',
  ({ pos, res }: Params & { res?: Widgets }) =>
    expect(swapWidget(mock[0], pos, mock)).toEqual(res)
)

test.each`
  widget     | pos           | res
  ${mock[0]} | ${pos(1, 1)}  | ${undefined}
  ${mock[0]} | ${pos(1, 0)}  | ${undefined}
  ${mock[0]} | ${pos(0, 1)}  | ${undefined}
  ${mock[0]} | ${pos(2, 2)}  | ${mock2}
  ${mock[1]} | ${pos(1, 0)}  | ${mock3}
  ${mock[2]} | ${pos(2, 0)}  | ${mock4}
  ${mock[3]} | ${pos(0, -1)} | ${mock5}
  ${mock[4]} | ${pos(1, 0)}  | ${mock6}
`(
  'moveEmptyWidget($widget, $pos, mock) -> [$res]',
  ({ widget, pos, res }: Params & { res: Widgets }) =>
    expect(moveEmptyWidget(widget, pos, mock)).toEqual(res)
)
