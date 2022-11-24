import { DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core'
import { rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Widget } from 'components/widgets/Widget'
import { Widgets } from 'common'
import { createRef, LegacyRef, useState } from 'react'
import { gridSize, movableToEmpty, moveItemSwap } from './GridTools'
import { pos, size } from 'vec2'

export const Grid = ({ widgets }: { widgets: Widgets }) => {
  const [cursorPosition, setCursorPosition] = useState(pos(0, 0))
  const gridRef: LegacyRef<HTMLDivElement> = createRef()
  const tmpStyle: React.CSSProperties = {
    background: '#aaffaa',
    display: 'inline-grid',
    width: '100%',
    height: '80vh',
    gridTemplateColumns: `repeat(${gridSize.v[0]}, 1fr)`,
    gridGap: 10,
  }
  //state cursorPosition을 기반으로 위젯을 이동한다 [완료][핸들러]
  const handleDragEnd = (event: DragEndEvent) => {
    if (cursorPosition.v[0] !== 0 || cursorPosition.v[1] !== 0) {
      const index = widgets.findIndex(item => item.uuid === event.active.id)
      moveItem(index)
    }
  }
  //드래그 중의 포인터 움직임을 State에 저장한다 [완료][핸들러]
  const handleDragMove = (event: DragMoveEvent) => {
    if (gridRef.current) {
      const eventPosition = pos(event.delta.x, event.delta.y)
      const offsetSize = size(
        gridRef.current.offsetWidth,
        gridRef.current.offsetHeight
      )
      setCursorPosition(eventPosition.div(offsetSize).mul(gridSize).round())
    }
    //delta값에 얼마나 움직였는지 정보가 담겨있고
    //이걸 그리드 사이즈에 대한 비율로 나눠서 어느 정도 이동했는지 좌표를 구한다
    //x, y좌표를 state로 저장한다
  }

  //이동 알고리즘 들어가는 함수 [주기능]
  const moveItem = (index: number) => {
    //빈 공간일 경우
    if (movableToEmpty(widgets[index], cursorPosition, widgets) !== false) {
      widgets[index].pos = widgets[index].pos.add(cursorPosition)
      return
    }
    //swap할 수 있는 경우
    const swapWidget = moveItemSwap(widgets[index], cursorPosition, widgets)
    if (swapWidget !== null) {
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
            <Widget layout={widgets} widget={ele} key={index}></Widget>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}
