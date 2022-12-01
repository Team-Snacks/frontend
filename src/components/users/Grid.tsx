import { DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Widget } from 'components/widgets/Widget'
import { Widgets } from 'common'
import { createRef, DragEvent, LegacyRef, useState } from 'react'
import { gridSize, isPushable, movableToEmpty, moveItemSwap } from './GridTools'
import { div, mul, neq, plus, pos, round, size } from 'vec2'
import { pipe } from '@mobily/ts-belt'

export const Grid = ({ widgets }: { widgets: Widgets }) => {
  const [cursorPosition, setCursorPosition] = useState(pos(0, 0))
  const gridRef: LegacyRef<HTMLDivElement> = createRef()
  const tmpStyle: React.CSSProperties = {
    background: '#aaffaa',
    display: 'inline-grid',
    width: '100%',
    height: '80vh',
    gridTemplateColumns: `repeat(${gridSize.w}, 1fr)`,
    gridGap: 10,
  }
  /**state cursorPosition을 기반으로 위젯을 이동한다 [완료][핸들러]*/
  const handleDragEnd = (event: DragEndEvent) => {
    if (neq(cursorPosition, pos(0, 0))) {
      const index = widgets.findIndex(item => item.uuid === event.active.id)
      moveItem(index)
    }
  }
  /**드래그 중의 포인터 움직임을 State에 저장한다 [완료][핸들러]*/
  const handleDragMove = (event: DragMoveEvent) => {
    if (gridRef.current) {
      const eventPosition = pos(event.delta.x, event.delta.y)
      const offsetSize = size(
        gridRef.current.offsetWidth,
        gridRef.current.offsetHeight
      )
      setCursorPosition(
        pipe(eventPosition, div(offsetSize), mul(gridSize), round)
      )
    }
    //delta값에 얼마나 움직였는지 정보가 담겨있고
    //이걸 그리드 사이즈에 대한 비율로 나눠서 어느 정도 이동했는지 좌표를 구한다
    //x, y좌표를 state로 저장한다
  }

  /** 이동 알고리즘 들어가는 함수 [주기능]*/
  const moveItem = (index: number) => {
    const toMove = plus(widgets[index].pos, cursorPosition)
    //빈 공간일 경우
    if (movableToEmpty(widgets[index], cursorPosition, widgets) !== false) {
      widgets[index].pos = toMove
      return
    }
    //push할 수 있는 경우
    if (isPushable(widgets[index], cursorPosition, widgets)) {
      widgets[index].pos = toMove
      return
    }
    //swap할 수 있는 경우
    const swapWidget = moveItemSwap(widgets[index], cursorPosition, widgets)
    if (swapWidget) {
      const swapCoords = swapWidget.pos
      swapWidget.pos = widgets[index].pos
      widgets[index].pos = swapCoords
      return
    }
    console.log('이동불가') //불가능
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    /**
     * 할 거
     * - 어디에 드랍된건지 좌표 구하기
     * - 드랍된 위젯이 뭔지 파악(event 객체 안에 없다면 Atom 써서 파악)
     * - 드랍이 가능한지 판단하기
     * - 가능하면 add-widget에 보낼 데이터 준비하기
     */
    if (gridRef.current) {
      const eventPosition = pos(event.clientX, event.clientY)
      const offsetSize = size(
        gridRef.current.offsetWidth,
        gridRef.current.offsetHeight
      )
      console.log(event.currentTarget)
      console.log(event.target)
      console.log(pipe(eventPosition, div(offsetSize), mul(gridSize), round)) //값 제대로 안나옴..
    }
  }
  /**
   * dragOver이벤트를 취소하지 않으면 onDrop이벤트가 동작하지 않음
   * 기본적으로 브라우저에서는 drop을 허용하고 있지 않아서 이것을 무시하고 drop을 하기 위해 dragOver이벤트를 취소해야함
   * @see {@link https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations}
   */
  const cancleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div
      style={tmpStyle}
      ref={gridRef}
      onDrop={handleDrop}
      onDragOver={cancleDragOver}
    >
      <DndContext onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
        <SortableContext
          items={widgets.map(ele => ele.uuid)}
          strategy={rectSwappingStrategy}
        >
          {widgets.map((ele, index) => (
            <Widget layout={widgets} widget={ele} key={index}></Widget>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
