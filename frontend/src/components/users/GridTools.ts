import { WidgetDimension, Widgets, WidgetType } from 'common'
import { cartesianProduct, range, replicate } from 'utils'
import { pos, size, Vec2 } from 'vec2'

export const gridSize = size(5, 3)

//해당 위젯이 차지하고 있는 좌표 배열을 반환 [완료][tools]
export const makeWidgetCoordinates = ({ pos, size }: WidgetDimension) =>
  makePermutation(pos, pos.add(size))

//prettier-ignore
export const makePermutation = (start: Vec2, end: Vec2) =>
  cartesianProduct(range(start.v[0], end.v[0]), range(start.v[1], end.v[1]))
    .map(([x, y]) => (pos(x, y)))

//해당 좌표 범위 내에 존재하고 있는 위젯들의 배열을 반환 [완료][tools]
export const coordinateRangeWidgets = (
  widgets: Widgets,
  start: Vec2,
  end: Vec2
) => {
  const permutation = makePermutation(start, end)

  const widgetList: Widgets = []
  widgets.forEach(ele => {
    const indexCoords = makeWidgetCoordinates(ele)
    permutation.forEach(perEle => {
      indexCoords.forEach(indexEle => {
        if (indexEle.eq(perEle)) {
          widgetList.push(ele)
        }
      })
    })
  })
  return widgetList
}
//위젯들을 기반으로 위젯이 채워진 좌표계를 만듦 [완료][tools]
export const makeGridCoordinates = (widgets: Widgets) => {
  const rows = () => replicate(gridSize.v[1], () => ({ uuid: 'empty' }))
  const result = replicate(gridSize.v[0], rows)

  widgets.forEach(ele => {
    const eleCoordinate = makeWidgetCoordinates(ele)
    eleCoordinate.forEach(
      eleEle => (result[eleEle.v[0]][eleEle.v[1]] = { uuid: ele.uuid })
    )
  })
  return result
}

//위젯을 옮길 경우 차지하게 될 좌표 배열을 반환 [완료][tools]
export const makeMoveCoordinates = (widget: WidgetType, direction: Vec2) => {
  return makePermutation(
    widget.pos.add(direction),
    widget.pos.add(widget.size).add(direction)
  )
}
//위젯이 그리드 사이즈 범위 안에 있는지 확인해주는 함수 [완료][tools]
const isInGridSize = (widget: WidgetType) => {
  return (
    widget.pos.v[0] >= 0 &&
    widget.pos.v[1] >= 0 &&
    widget.pos.v[0] + widget.size.v[0] - 1 < gridSize.v[0] &&
    widget.pos.v[1] + widget.size.v[1] - 1 < gridSize.v[1]
  )
}

//위젯을 밀 수 있는 지 확인하는 함수 [주기능]
export const isPushable = (
  widget: WidgetType,
  cursorPosition: Vec2,
  widgets: Widgets
) => {
  const tryPushWidgets: Widgets = Array.from(widgets) // 위젯들 밀면서 확인할 widgets의 사본
  const movedRange = makeMoveCoordinates(widget, cursorPosition) //widget을 cursorPosition만큼 옮길 시 차지하는 좌표범위
  const movedRangeWidgets = coordinateRangeWidgets(
    widgets,
    widget.pos.add(cursorPosition),
    widget.pos.add(widget.size).add(cursorPosition)
  )
  const xList = movedRange.map(ele => ele.v[0])
  const movedRangeMiddleX = (Math.max(...xList) + Math.min(...xList)) / 2

  movedRangeWidgets.forEach(ele => {
    if (ele !== widget) {
      if (ele.pos.v[0] < movedRangeMiddleX) {
        if (tryPush(ele, pos(-1, 0), tryPushWidgets) === true)
          ele.pos = ele.pos.add(pos(-1, 0))
        else if (tryPush(ele, pos(1, 0), tryPushWidgets) === true)
          ele.pos = ele.pos.add(pos(1, 0))
      } else {
        if (tryPush(ele, pos(1, 0), tryPushWidgets) === true)
          ele.pos = ele.pos.add(pos(1, 0))
        else if (tryPush(ele, pos(-1, 0), tryPushWidgets) === true)
          ele.pos = ele.pos.add(pos(-1, 0))
      }
    }
  })
  return movableToEmpty(widget, cursorPosition, movedRangeWidgets) !== false
}
const tryPush = (widget: WidgetType, direction: Vec2, widgets: Widgets) => {
  //widget를 vec2 방향으로 이동할 수 있는지 확인하기
  //1. coordinateRangeWidgets로 옮길 곳에 어떤 위젯들이 차지하고 있는 지 확인하고
  //2. 만약 그 리스트가 비어있으면 빈 배열이라는 거니까 true
  //3. 만약 그 리스트에 widget만 있으면 어차피 widget은 옮겨질거니까 true
  //4. 나머지 경우는 false
  const tmp = coordinateRangeWidgets(
    widgets,
    widget.pos.add(direction),
    widget.pos.add(widget.size).add(direction)
  )
  if (tmp.length === 0) return true
  else if (
    tmp.length === 1 &&
    tmp[0].uuid === widget.uuid &&
    isInGridSize(tmp[0])
  )
    return true
  else return false
}

//위젯을 교환할 수 있는지 여부를 확인해 교환할 위젯 또는 false를 반환. [완료][주기능]
export const moveItemSwap = (
  widget: WidgetType,
  cursorPosition: Vec2,
  widgets: Widgets
) => {
  //1. cursorPosition를 통해 교환할 위젯을 찾는다. 이동하려는 좌표에 위치하고, w h 크기가 같아야 함.
  //2. 조건이 맞으면 교환할 위젯을 반환, 실패하면 false
  const swapRange = coordinateRangeWidgets(
    widgets,
    widget.pos.add(cursorPosition),
    widget.pos.add(widget.size).add(cursorPosition)
  ).filter(ele => ele.uuid !== widget.uuid)
  if (swapRange.length === 1 && swapRange[0].size.eq(widget.size)) {
    return widgets.find(ele => ele.uuid === swapRange[0].uuid) ?? null
  }
  return null
}
//빈 곳으로 위젯을 이동할 지 여부를 반환한다 [완료] [주기능]
export const movableToEmpty = (
  widget: WidgetType,
  cursorPosition: Vec2,
  widgets: Widgets
) => {
  let movedWidget: WidgetType = {
    ...widget,
    pos: widget.pos.add(cursorPosition),
  }
  const movedRangeWidgets = coordinateRangeWidgets(
    widgets,
    movedWidget.pos,
    movedWidget.pos.add(movedWidget.size)
  ).filter(ele => ele.uuid !== widget.uuid)

  return movedRangeWidgets.length === 0 && isInGridSize(movedWidget)
}
