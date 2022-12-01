import { DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import { BaseWidget } from 'components/widgets/Widget'
import { Widgets } from 'common'
import { createRef, LegacyRef, useState } from 'react'
import {
  gridSize,
  isPushable,
  isMovableToEmpty,
  moveItemSwap,
} from './GridTools'
import { div, mul, neq, plus, pos, round, size } from 'vec2'
import { pipe } from '@mobily/ts-belt'

const tmpStyle: React.CSSProperties = {
  background: '#aaffaa',
  display: 'inline-grid',
  width: '100%',
  height: '80vh',
  gridTemplateColumns: `repeat(${gridSize.w}, 1fr)`,
  gridGap: 10,
}

export const Grid = ({ widgets }: { widgets: Widgets }) => {
  const [cursor, setCursor] = useState(pos(0, 0))
  const gridRef: LegacyRef<HTMLDivElement> = createRef()

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

  /** 이동 알고리즘 들어가는 함수 [주기능]*/
  const moveItem = (index: number) => {
    const toMove = plus(widgets[index].pos, cursor)
    //빈 공간일 경우
    if (isMovableToEmpty(widgets[index], cursor, widgets) !== false) {
      widgets[index].pos = toMove
      return
    }
    //push할 수 있는 경우
    if (isPushable(widgets[index], cursor, widgets)) {
      widgets[index].pos = toMove
      return
    }
    //swap할 수 있는 경우
    const swapWidget = moveItemSwap(widgets[index], cursor, widgets)
    if (swapWidget) {
      const swapCoords = swapWidget.pos
      swapWidget.pos = widgets[index].pos
      widgets[index].pos = swapCoords
      return
    }
    console.log('이동불가') //불가능
  }

  return (
    <div style={tmpStyle} ref={gridRef}>
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
