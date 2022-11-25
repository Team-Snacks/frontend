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

//위젯을 밀 수 있는 지 확인하는 함수 [주기능]
export const isPushable = (
  widget: WidgetType,
  cursorPosition: Vec2,
  widgets: Widgets
) => {
  const tryPushWidgets = { ...widgets } // 위젯들 밀면서 확인할 widgets의 사본
  const movedRange = makeMoveCoordinates(widget, cursorPosition) //widget을 cursorPosition만큼 옮길 시 차지하는 좌표범위
  const movedRangeWidgets = coordinateRangeWidgets(
    // movedRange가 차지하는 위젯 리스트
    widgets,
    widget.pos.add(cursorPosition),
    widget.pos.add(widget.size).add(cursorPosition)
  )
  const xList = movedRange.map(ele => ele.v[0])
  const movedRangeMiddleX = (Math.max(...xList) + Math.min(...xList)) / 2
  movedRangeWidgets.forEach(ele => {
    if (ele !== widget) {
      console.log(ele)
      if (ele.pos.v[0] < movedRangeMiddleX) {
        console.log('tryLeft')
        //tryPush(widget, {x : -1, y : 0}, tryPushWidgets)
      } else {
        console.log('tryRight')
        //tryPush(widget, {x : 1, y : 0}, tryPushWidgets)
      }
    }
  })
  //일단 밀고 중첩을 확인한 후 가/불 여부를 정함
  //가 -> tryPushWidgets 반환
  //불 -> null 반환
}
const tryPush = (widget: WidgetType, direction: Vec2, widgets: Widgets) => {} // t/f

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

  return (
    movedRangeWidgets.length === 0 &&
    movedWidget.pos.v[0] >= 0 &&
    movedWidget.pos.v[1] >= 0 &&
    movedWidget.pos.v[0] + movedWidget.size.v[0] - 1 < gridSize.v[0] &&
    movedWidget.pos.v[1] + movedWidget.size.v[1] - 1 < gridSize.v[1]
  )
}
