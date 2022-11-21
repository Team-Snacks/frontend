import { Coordinate, Widgets, WidgetType } from 'common'

//해당 위젯이 차지하고 있는 좌표 배열을 반환 [완료][tools]
export const makeWidgetCoordinates = (widgets: Widgets, index: number) => {
  const coordList: Coordinate[] = []
  for (let i = 0; i < widgets[index].h; i++) {
    for (let j = 0; j < widgets[index].w; j++) {
      coordList.push({
        x: widgets[index].x + j,
        y: widgets[index].y + i,
      })
    }
  }
  return coordList
}
//해당 좌표 범위 내에 존재하고 있는 위젯들의 배열을 반환 [완료][tools]
export const coordinateRangeWidgets = (
  widgets: Widgets,
  start: Coordinate,
  end: Coordinate
) => {
  const widgetList: Widgets = []
  const permutation: Coordinate[] = []
  for (let i = start.x; i < end.x; i++) {
    for (let j = start.y; j < end.y; j++) {
      permutation.push({ x: i, y: j })
    }
  }
  widgets.map((ele, index) => {
    const indexCoords = makeWidgetCoordinates(widgets, index)
    permutation.map(perEle => {
      indexCoords.map(indexEle => {
        if (indexEle.x === perEle.x && indexEle.y === perEle.y)
          widgetList.push(ele)
      })
    })
  })
  return widgetList
}
//위젯들을 기반으로 위젯이 채워진 좌표계를 만듦 [완료][tools]
export const makeGridCoordinates = (widgets: Widgets) => {
  const newGridCoordinates: Array<{ uuid: string }[]> = new Array(5)
  for (let i = 0; i < 5; i++) {
    newGridCoordinates[i] = new Array(3)
    newGridCoordinates[i].fill({ uuid: 'empty' })
  }
  widgets.map((ele, index) => {
    const eleCoordinate = makeWidgetCoordinates(widgets, index)
    eleCoordinate.map(eleEle => {
      newGridCoordinates[eleEle.x][eleEle.y] = { uuid: ele.uuid }
    })
  })
  return newGridCoordinates
}
//위젯을 옮길 경우 차지하게 될 좌표 배열을 반환 [tools]
export const makeMoveCoordinates = (
  widgets: Widgets,
  index: number,
  coord: Coordinate
) => {}

//위젯을 교환할 수 있는지 여부를 확인해 교환할 위젯 또는 false를 반환. [완료][주기능]
export const moveItemSwap = (
  widget: WidgetType,
  cursorPosition: Coordinate,
  widgets: Widgets
) => {
  //1. cursorPosition를 통해 교환할 위젯을 찾는다. 이동하려는 좌표에 위치하고, w h 크기가 같아야 함.
  //2. 조건이 맞으면 교환할 위젯을 반환, 실패하면 false
  const swapRange = coordinateRangeWidgets(
    widgets,
    {
      x: widget.x + cursorPosition.x,
      y: widget.y + cursorPosition.y,
    },
    {
      x: widget.x + widget.w + cursorPosition.x,
      y: widget.y + widget.h + cursorPosition.y,
    }
  ).filter(ele => ele.uuid !== widget.uuid)
  if (
    swapRange.length === 1 &&
    swapRange[0].w === widget.w &&
    swapRange[0].h === widget.h
  ) {
    const swapWidget = widgets.find(ele => {
      return ele.uuid === swapRange[0].uuid
    })
    if (!swapWidget) return false
    else return swapWidget
  }
  return false
}
//빈 곳으로 위젯을 이동할 지 여부를 반환한다 [완료] [주기능]
export const moveItemEmpty = (
  widget: WidgetType,
  cursorPosition: Coordinate,
  widgets: Widgets
) => {
  const movedWidget: WidgetType = JSON.parse(JSON.stringify(widget))
  movedWidget.x += cursorPosition.x
  movedWidget.y += cursorPosition.y
  const movedRangeWidgets = coordinateRangeWidgets(
    widgets,
    { x: movedWidget.x, y: movedWidget.y },
    { x: movedWidget.x + movedWidget.w, y: movedWidget.y + movedWidget.h }
  ).filter(ele => ele.uuid !== widget.uuid)
  if (
    movedRangeWidgets.length === 0 &&
    movedWidget.x >= 0 &&
    movedWidget.y >= 0 &&
    movedWidget.x + movedWidget.w - 1 < 5 &&
    movedWidget.y + movedWidget.h - 1 < 3
  ) {
    return true //빈 공간으로 이동할 수 있음
  }
  return false //빈공간으로 이동 할 수 없음
}
