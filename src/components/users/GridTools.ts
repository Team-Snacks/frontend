import { WidgetDimension, Widgets, Widget as Widget } from 'common'
import { cartesianProduct, range, replicate } from 'utils'
import { eq, gte, lt, plus, Pos, pos, Size, size, sub, Vec2 } from 'vec2'
import { pipe } from '@mobily/ts-belt'

export const gridSize = size(5, 3)

/** 특정 지점부터 사각형 모양 좌표 배열을 반환
 * @example
 * ```ts
 * coords(pos(1, 1), size(1, 1)) // [[1, 1], [1, 2], [2, 1], [2, 2]]
 * coords(pos(1, 0), size(1, 2)) // [[1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
 * ```
 */
export const coords = (start: Pos, delta: Size) =>
  cartesianProduct(
    range(start.x, start.x + delta.w),
    range(start.y, start.y + delta.h)
  ).map(([x, y]) => pos(x, y))

/** 위젯이 차지하고 있는 좌표 배열을 반환 */
export const coordsOf = ({ pos, size }: WidgetDimension) => coords(pos, size)

/** 위젯을 옮길 경우 차지하게 될 좌표 배열을 반환  */
export const makeMoveCoordinates = (widget: Widget, direction: Vec2) =>
  coords(plus(widget.pos, direction), widget.size)

/** 위젯을 주어진 크기만큼 이동 */
const move = (widget: Widget, by: Vec2) => ({
  ...widget,
  pos: plus(widget.pos, by),
})

/**
 * 해당 좌표 범위 내에 존재하고 있는 위젯들의 배열을 반환
 */
export const coordsBetween = (widgets: Widgets, start: Pos, size: Size) => {
  const permutation = coords(start, size)

  const widgetList: Widgets = []
  widgets.forEach(ele => {
    const indexCoords = coordsOf(ele)
    permutation.forEach(perEle => {
      indexCoords.forEach(indexEle => {
        if (pipe(indexEle, eq(perEle))) {
          widgetList.push(ele)
        }
      })
    })
  })
  return widgetList
}

/** 위젯들을 기반으로 위젯이 채워진 좌표계를 만듬 */
export const widgetCoords = (widgets: Widgets) => {
  const rows = () => replicate(gridSize.h, () => ({ uuid: 'empty' }))
  const result = replicate(gridSize.w, rows)

  widgets.forEach(ele => {
    const eleCoordinate = coordsOf(ele)
    eleCoordinate.forEach(
      eleEle => (result[eleEle.x][eleEle.y] = { uuid: ele.uuid })
    )
  })
  return result
}

/** 위젯이 그리드 사이즈 범위 안에 있는지 확인해주는 함수 */
const isInGridSize = (widget: Widget) => {
  return (
    pipe(widget.pos, gte(pos(0, 0))) &&
    pipe(widget.pos, plus(widget.size), sub(pos(1, 1)), lt(gridSize))
  )
}

/** 위젯을 밀 수 있는 지 확인하는 함수 [주기능]*/
export const isPushable = (
  widget: Widget,
  cursorPosition: Pos,
  widgets: Widgets
) => {
  const widgetCopy: Widgets = Array.from(widgets) // 위젯들 밀면서 확인할 widgets의 사본
  const movedRange = makeMoveCoordinates(widget, cursorPosition) //widget을 cursorPosition만큼 옮길 시 차지하는 좌표범위
  const movedPos = plus(widget.pos, cursorPosition) //widget을 cursorPosition만큼 옮길 시의 좌표
  const movedRangeWidgets = coordsBetween(
    widgets,
    movedPos,
    widget.size
  )
  const xList = movedRange.map(ele => ele.x)
  const movedRangeMiddleX = (Math.max(...xList) + Math.min(...xList)) / 2

  movedRangeWidgets.forEach(ele => {
    if (ele !== widget) {
      if (ele.pos.x < movedRangeMiddleX) {
        if (isPushableTo(ele, pos(-1, 0), widgetCopy))
          ele.pos = plus(ele.pos, pos(-1, 0))
        else if (isPushableTo(ele, pos(1, 0), widgetCopy))
          ele.pos = plus(ele.pos, pos(1, 0))
      } else {
        if (isPushableTo(ele, pos(1, 0), widgetCopy))
          ele.pos = plus(ele.pos, pos(1, 0))
        else if (isPushableTo(ele, pos(-1, 0), widgetCopy))
          ele.pos = plus(ele.pos, pos(-1, 0))
      }
    }
  })

  return movableToEmpty(widget, cursorPosition, widgetCopy)
}

/**
 * widget를 vec2 방향으로 이동할 수 있는지 확인하기
 */
const isPushableTo = (widget: Widget, direction: Vec2, widgets: Widgets) => {
  const movedWidget = move(widget, direction)

  // coordinateRangeWidgets로 옮길 곳에 어떤 위젯들이 차지하고 있는지 확인하고
  const movedRange = coordsBetween(widgets, movedWidget.pos, widget.size)

  if (!isInGridSize(movedWidget)) {
    return false
  }

  if (movedRange.length === 0) {
    // 만약 그 리스트가 비어있으면 빈 배열이라는 거니까 true
    return true
  } else if (
    movedRange.length === 1 &&
    movedRange[0].uuid === widget.uuid &&
    isInGridSize(movedRange[0]) // 리스트에 widget만 있으면 어차피 자기 자신이니 true
  ) {
    return true
  }

  return false
}

/** 위젯을 교환할 수 있는지 여부를 확인해 교환할 위젯 또는 false를 반환. [완료][주기능]*/
export const moveItemSwap = (
  widget: Widget,
  cursorPosition: Vec2,
  widgets: Widgets
) => {
  //1. cursorPosition를 통해 교환할 위젯을 찾는다. 이동하려는 좌표에 위치하고, w h 크기가 같아야 함.
  //2. 조건이 맞으면 교환할 위젯을 반환, 실패하면 false
  const movedPos = plus(widget.pos, cursorPosition)
  const swapRange = coordsBetween(widgets, movedPos, widget.size).filter(
    ele => ele.uuid !== widget.uuid
  )
  if (swapRange.length === 1 && pipe(swapRange[0].size, eq(widget.size))) {
    return widgets.find(ele => ele.uuid === swapRange[0].uuid)
  }
  return undefined
}
/** 빈 곳으로 위젯을 이동할 지 여부를 반환한다 [완료] [주기능]*/
export const movableToEmpty = (
  widget: Widget,
  cursorPosition: Vec2,
  widgets: Widgets
) => {
  const movedWidget = move(widget, cursorPosition)
  const movedRangeWidgets = coordsBetween(
    widgets,
    movedWidget.pos,
    movedWidget.size
  ).filter(ele => ele.uuid !== widget.uuid)

  return movedRangeWidgets.length === 0 && isInGridSize(movedWidget)
}
