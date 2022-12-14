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
export const widgetsBetween = (widgets: Widgets, start: Pos, size: Size) => {
  const permutation = coords(start, size)

  const widgetList: Widgets = []
  widgets.forEach(ele => {
    const indexCoords = coordsOf(ele)
    permutation.forEach(perEle =>
      indexCoords.filter(eq(perEle)).forEach(() => widgetList.push(ele))
    )
  })
  return widgetList
}

/** 위젯들을 기반으로 위젯이 채워진 좌표계를 만듬 */
export const widgetCoords = (widgets: Widgets) => {
  const rows = () => replicate(gridSize.h, () => ({ duuid: 'empty' }))
  const result = replicate(gridSize.w, rows)

  widgets.forEach(ele => {
    const eleCoordinate = coordsOf(ele)
    eleCoordinate.forEach(
      eleEle => (result[eleEle.x][eleEle.y] = { duuid: ele.duuid })
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
export const pushWidget = (widget: Widget, cursor: Pos, widgets: Widgets) => {
  const copyWidgets: Widgets = JSON.parse(JSON.stringify(widgets))
  const copyWidget = copyWidgets.find(ele => ele.duuid === widget.duuid)
  if (!copyWidget) {
    return undefined
  }

  const movedRange = makeMoveCoordinates(copyWidget, cursor) //widget을 cursor만큼 옮길 시 차지하는 좌표범위
  const movedPos = plus(copyWidget.pos, cursor) //widget을 cursor만큼 옮길 시의 좌표
  const movedRangeWidgets = widgetsBetween(
    copyWidgets,
    movedPos,
    copyWidget.size
  )
  const xList = movedRange.map(ele => ele.x)
  const movedRangeMiddleX = (Math.max(...xList) + Math.min(...xList)) / 2

  movedRangeWidgets
    .filter(ele => ele.duuid !== copyWidget.duuid)
    .forEach(ele => {
      if (ele.pos.x < movedRangeMiddleX) {
        if (pushWidgetTo(ele, pos(-1, 0), copyWidgets)) {
          return (ele.pos = plus(ele.pos, pos(-1, 0)))
        } else if (pushWidgetTo(ele, pos(1, 0), copyWidgets)) {
          return (ele.pos = plus(ele.pos, pos(1, 0)))
        }
      } else {
        if (pushWidgetTo(ele, pos(1, 0), copyWidgets)) {
          return (ele.pos = plus(ele.pos, pos(1, 0)))
        } else if (pushWidgetTo(ele, pos(-1, 0), copyWidgets)) {
          return (ele.pos = plus(ele.pos, pos(-1, 0)))
        }
      }
    })
  return moveEmptyWidget(copyWidget, cursor, copyWidgets)
}

/**
 * widget를 vec2 방향으로 이동할 수 있는지 확인하기
 */
const pushWidgetTo = (widget: Widget, direction: Vec2, widgets: Widgets) => {
  const copyWidgets: Widgets = JSON.parse(JSON.stringify(widgets))
  const copyWidget = copyWidgets.find(ele => ele.duuid === widget.duuid)
  if (!copyWidget) {
    return undefined
  }

  const movedWidget = move(copyWidget, direction)
  // coordinateRangeWidgets로 옮길 곳에 어떤 위젯들이 차지하고 있는지 확인하고
  const movedRange = widgetsBetween(
    copyWidgets,
    movedWidget.pos,
    copyWidget.size
  )

  if (!isInGridSize(movedWidget)) {
    return false
  }
  if (movedRange.length === 0) {
    // 만약 그 리스트가 비어있으면 빈 배열이라는 거니까 true
    return true
  } else if (
    movedRange.length === 1 &&
    movedRange[0].duuid === copyWidget.duuid &&
    isInGridSize(movedRange[0]) // 리스트에 widget만 있으면 어차피 자기 자신이니 true
  ) {
    return true
  }
  return false
}

/** 위젯을 교환할 수 있는지 여부를 확인해 교환할 위젯 또는 false를 반환. [완료][주기능]*/
export const swapWidget = (widget: Widget, cursor: Vec2, widgets: Widgets) => {
  //1. cursor를 통해 교환할 위젯을 찾는다. 이동하려는 좌표에 위치하고, w h 크기가 같아야 함.
  //2. 조건이 맞으면 교환할 위젯을 반환, 실패하면 false
  const copyWidgets: Widgets = JSON.parse(JSON.stringify(widgets))
  const copyWidget = copyWidgets.find(ele => ele.duuid === widget.duuid)
  if (!copyWidget) {
    return undefined
  }

  const movedPos = plus(copyWidget.pos, cursor)
  const swapRange = widgetsBetween(
    copyWidgets,
    movedPos,
    copyWidget.size
  ).filter(ele => ele.duuid !== copyWidget.duuid)
  if (swapRange.length === 1 && pipe(swapRange[0].size, eq(copyWidget.size))) {
    const swapWidget = copyWidgets.find(ele => ele.duuid === swapRange[0].duuid)
    if (swapWidget) {
      const swapCoords = swapWidget.pos
      swapWidget.pos = copyWidget.pos
      copyWidget.pos = swapCoords
      return copyWidgets
    } else {
      return undefined
    }
  }
  return undefined
}
/** 빈 곳으로 위젯을 이동할 지 여부를 반환한다 [완료] [주기능]*/
export const moveEmptyWidget = (
  widget: Widget,
  cursor: Vec2,
  widgets: Widgets
) => {
  const copyWidgets: Widgets = JSON.parse(JSON.stringify(widgets))
  const copyWidget = copyWidgets.find(ele => ele.duuid === widget.duuid)
  if (!copyWidget) {
    return undefined
  }

  const movedWidget = move(copyWidget, cursor)
  const movedRangeWidgets = widgetsBetween(
    copyWidgets,
    movedWidget.pos,
    movedWidget.size
  ).filter(ele => ele.duuid !== copyWidget.duuid)

  if (movedRangeWidgets.length === 0 && isInGridSize(movedWidget)) {
    copyWidget.pos = plus(copyWidget.pos, cursor)
    return copyWidgets
  } else {
    return undefined
  }
}
