import { DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import { BaseWidget } from 'components/widgets/Widget'
import { createRef, DragEvent, LegacyRef, useState } from 'react'
import {
  gridSize,
  pushWidget,
  moveEmptyWidget,
  widgetsBetween,
} from './GridTools'
import { div, mul, neq, pos, round, size, sub } from 'vec2'
import { pipe } from '@mobily/ts-belt'
import { useAtomValue } from 'jotai'
import { cursorInWidgetAtom } from 'Atoms'
import { layoutDummy } from 'dummy'

const tmpStyle: React.CSSProperties = {
  background: '#aaffaa',
  display: 'inline-grid',
  width: '100%',
  height: '80vh',
  gridTemplateColumns: `repeat(${gridSize.w}, 1fr)`,
  gridGap: 10,
}

export const Grid = () => {
  const [widgets, setWidgets] = useState(layoutDummy)
  const [cursor, setCursor] = useState(pos(0, 0))
  const gridRef: LegacyRef<HTMLDivElement> = createRef()
  const cursorInWidget = useAtomValue(cursorInWidgetAtom)

  /**state cursorPosition을 기반으로 위젯을 이동한다 [완료][핸들러]*/
  const handleDragEnd = (event: DragEndEvent) => {
    if (neq(cursor, pos(0, 0))) {
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
      setCursor(pipe(eventPosition, div(offsetSize), mul(gridSize), round))
    }
    //delta값에 얼마나 움직였는지 정보가 담겨있고
    //이걸 그리드 사이즈에 대한 비율로 나눠서 어느 정도 이동했는지 좌표를 구한다
    //x, y좌표를 state로 저장한다
  }
  /** 위젯이 그리드 컴포넌트에 드랍되었을 경우 실행되는 함수 [핸들러] */
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    if (gridRef.current) {
      const eventPosition = pos(event.clientX, event.clientY)
      const offsetSize = size(
        gridRef.current.offsetWidth,
        gridRef.current.offsetHeight
      )
      const correctedCursor = pipe(
        eventPosition,
        sub(cursorInWidget.pos),
        div(offsetSize),
        mul(gridSize),
        round
      )
      //prettier-ignore
      if ( widgetsBetween(widgets, correctedCursor, size(1, 1)).length === 0)
      {//나중에 Widget 타입도 생성자 함수 같은 걸 만드는 게 좋을 것 같다
        return {
          uuid: "저장된 uuid",
          name: cursorInWidget.name,
          x: correctedCursor.x,
          y: correctedCursor.y,
          w: 1,
          h: 1,
          data: {}
        }
      }
    }
    return undefined
  }
  /**
   * dragOver이벤트를 취소하지 않으면 onDrop이벤트가 동작하지 않음
   * 기본적으로 브라우저에서는 drop을 허용하고 있지 않아서 이것을 무시하고 drop을 하기 위해 dragOver이벤트를 취소해야함
   * @see {@link https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations}
   */
  const cancleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  /** 이동 알고리즘 들어가는 함수 [주기능]*/
  const moveItem = (index: number) => {
    //빈 공간일 경우
    const movable = moveEmptyWidget(widgets[index], cursor, widgets)
    if (movable) {
      setWidgets(movable)
      return
    }
    //push할 수 있는 경우
    const pushable = pushWidget(widgets[index], cursor, widgets)
    if (pushable) {
      setWidgets(pushable)
      return
    }
    //swap할 수 있는 경우
    const swapWidget = swapWidget(widgets[index], cursor, widgets)
    if (swapWidget) {
      setWidgets(swapWidget)
      return
    }
    console.log('이동불가') //불가능
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
            <BaseWidget layout={widgets} widget={ele} key={index}></BaseWidget>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
