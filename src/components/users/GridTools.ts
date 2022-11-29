import { WidgetDimension, Widgets, WidgetType } from 'common'
import { cartesianProduct, range, replicate } from 'utils'
import { eq, gte, lt, plus, Pos, pos, Size, size, sub, Vec2 } from 'vec2'
import { pipe } from '@mobily/ts-belt'

export const gridSize = size(5, 3)

/** 해당 위젯이 차지하고 있는 좌표 배열을 반환 [완료][tools]*/
export const makeWidgetCoordinates = ({ pos, size }: WidgetDimension) =>
  makePermutation2(pos, size)

/** @deprecated */
export const makePermutation = (start: Pos, end: Pos) =>
  cartesianProduct(range(start.x, end.x), range(start.y, end.y)).map(([x, y]) =>
    pos(x, y)
  )

const makePermutation2 = (start: Pos, delta: Size) =>
  cartesianProduct(
    range(start.x, start.x + delta.w),
    range(start.y, start.y + delta.h)
  ).map(([x, y]) => pos(x, y))

/** 해당 좌표 범위 내에 존재하고 있는 위젯들의 배열을 반환 [완료][tools]
 *  @deprecated
 */
export const coordinateRangeWidgets = (
  widgets: Widgets,
  start: Pos,
  end: Pos
) => {
  const permutation = makePermutation(start, end)

  const widgetList: Widgets = []
  widgets.forEach(ele => {
    const indexCoords = makeWidgetCoordinates(ele)
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

export const coordinateRangeWidgets2 = (
  widgets: Widgets,
  start: Pos,
  size: Size
) => {
  const permutation = makePermutation2(start, size)

  const widgetList: Widgets = []
  widgets.forEach(ele => {
    const indexCoords = makeWidgetCoordinates(ele)
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

/** 위젯들을 기반으로 위젯이 채워진 좌표계를 만듦 [완료][tools]*/
export const makeGridCoordinates = (widgets: Widgets) => {
  const rows = () => replicate(gridSize.h, () => ({ uuid: 'empty' }))
  const result = replicate(gridSize.w, rows)

  widgets.forEach(ele => {
    const eleCoordinate = makeWidgetCoordinates(ele)
    eleCoordinate.forEach(
      eleEle => (result[eleEle.x][eleEle.y] = { uuid: ele.uuid })
    )
  })
  return result
}

/** 위젯을 옮길 경우 차지하게 될 좌표 배열을 반환 [완료][tools] */
export const makeMoveCoordinates = (widget: WidgetType, direction: Vec2) =>
  makePermutation2(plus(widget.pos, direction), widget.size)

/** 위젯이 그리드 사이즈 범위 안에 있는지 확인해주는 함수 [완료][tools]*/
const isInGridSize = (widget: WidgetType) => {
  return (
    pipe(widget.pos, gte(pos(0, 0))) &&
    pipe(widget.pos, plus(widget.size), sub(pos(1, 1)), lt(gridSize))
  )
}

/** 위젯을 밀 수 있는 지 확인하는 함수 [주기능]*/
export const isPushable = (
  widget: WidgetType,
  cursorPosition: Pos,
  widgets: Widgets
) => {
  const isPushableToWidgets: Widgets = Array.from(widgets) // 위젯들 밀면서 확인할 widgets의 사본
  const movedRange = makeMoveCoordinates(widget, cursorPosition) //widget을 cursorPosition만큼 옮길 시 차지하는 좌표범위
  const movedPos = plus(widget.pos, cursorPosition) //widget을 cursorPosition만큼 옮길 시의 좌표
  const movedRangeWidgets = coordinateRangeWidgets2(
    widgets,
    movedPos,
    size(cursorPosition)
  )
  const xList = movedRange.map(ele => ele.x)
  const movedRangeMiddleX = (Math.max(...xList) + Math.min(...xList)) / 2

  movedRangeWidgets.forEach(ele => {
    if (ele !== widget) {
      if (ele.pos.x < movedRangeMiddleX) {
        if (isPushableTo(ele, pos(-1, 0), isPushableToWidgets))
          ele.pos = plus(ele.pos, pos(-1, 0))
        else if (isPushableTo(ele, pos(1, 0), isPushableToWidgets))
          ele.pos = plus(ele.pos, pos(1, 0))
      } else {
        if (isPushableTo(ele, pos(1, 0), isPushableToWidgets))
          ele.pos = plus(ele.pos, pos(1, 0))
        else if (isPushableTo(ele, pos(-1, 0), isPushableToWidgets))
          ele.pos = plus(ele.pos, pos(-1, 0))
      }
    }
  })

  return movableToEmpty(widget, cursorPosition, isPushableToWidgets)
}

const isPushableTo = (
  widget: WidgetType,
  direction: Vec2,
  widgets: Widgets
) => {
  /**
   * widget를 vec2 방향으로 이동할 수 있는지 확인하기
   * 1. coordinateRangeWidgets로 옮길 곳에 어떤 위젯들이 차지하고 있는 지 확인하고
   * 2. 만약 그 리스트가 비어있으면 빈 배열이라는 거니까 true
   * 3. 만약 그 리스트에 widget만 있으면 어차피 자기 자신이니 true
   * 4. 나머지 경우는 false
   */
  const movedWidget = { ...widget, pos: plus(widget.pos, direction) }
  const movedRange = coordinateRangeWidgets2(
    widgets,
    movedWidget.pos,
    widget.size
  )
  if (movedRange.length === 0 && isInGridSize(movedWidget)) {
    return true
  } else if (
    movedRange.length === 1 &&
    movedRange[0].uuid === widget.uuid &&
    isInGridSize(movedRange[0]) &&
    isInGridSize(movedWidget)
  ) {
    return true
  } else {
    return false
  }
}

/** 위젯을 교환할 수 있는지 여부를 확인해 교환할 위젯 또는 false를 반환. [완료][주기능]*/
export const moveItemSwap = (
  widget: WidgetType,
  cursorPosition: Vec2,
  widgets: Widgets
) => {
  //1. cursorPosition를 통해 교환할 위젯을 찾는다. 이동하려는 좌표에 위치하고, w h 크기가 같아야 함.
  //2. 조건이 맞으면 교환할 위젯을 반환, 실패하면 false
  const movedPos = plus(widget.pos, cursorPosition)
  const swapRange = coordinateRangeWidgets2(
    widgets,
    movedPos,
    widget.size
  ).filter(ele => ele.uuid !== widget.uuid)
  if (swapRange.length === 1 && pipe(swapRange[0].size, eq(widget.size))) {
    return widgets.find(ele => ele.uuid === swapRange[0].uuid)
  }
  return undefined
}
/** 빈 곳으로 위젯을 이동할 지 여부를 반환한다 [완료] [주기능]*/
export const movableToEmpty = (
  widget: WidgetType,
  cursorPosition: Vec2,
  widgets: Widgets
) => {
  const movedWidget: WidgetType = {
    ...widget,
    pos: plus(widget.pos, cursorPosition),
  }
  const movedRangeWidgets = coordinateRangeWidgets2(
    widgets,
    movedWidget.pos,
    movedWidget.size
  ).filter(ele => ele.uuid !== widget.uuid)

  return movedRangeWidgets.length === 0 && isInGridSize(movedWidget)
}
