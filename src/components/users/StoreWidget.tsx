import { DragStartEvent, useDraggable } from '@dnd-kit/core'
import { Image, Text } from '@mantine/core'
import { StoreWidgetType } from 'common'
import { CSS } from '@dnd-kit/utilities'
import { useState, DragEvent, LegacyRef, createRef, MouseEvent } from 'react'
import { pos } from 'vec2'

export const StoreWidget = ({
  widgetData,
}: {
  widgetData: StoreWidgetType
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: widgetData.name,
  })
  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    textAlign: 'center',
  }
  const [cursorPosition, setCursorPosition] = useState(pos(0, 0))
  const imageRef: LegacyRef<HTMLDivElement> = createRef()
  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    // console.log('dragStart', event)
    // https://github.com/facebook/react/issues/16201
    var rect = event.currentTarget.getBoundingClientRect()
    var x = event.clientX - rect.left //x position within the element.
    var y = event.clientY - rect.top //y position within the element.
    console.log('Left? : ' + x + ' ; Top? : ' + y + '.')

    // console.log(imageRef.current?.offsetWidth)
    // console.log(imageRef.current?.offsetHeight)
  }
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    // console.log(event)
  }
  /**
   * 이벤트는 무슨 이벤트? 드래그 시작, 드래그 중일때?
   * 해당 div의 사이즈 아 이건 이벤트 객체로는 안되네 아아ㅏㅏㅏ
   * 마우스가 해당 div에서 어느 좌표에 위치하는가
   * 둘을 이용해 보정치를 구함
   * 지금 어떤 위젯이 선택된건지를 useAtom으로..
   * {보정된 좌표위치, 위젯 이름} 이렇게 보내
   */

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Image
        src={widgetData.image}
        radius='lg'
        style={{ width: '150px', display: 'inline-block' }}
        id={widgetData.name}
        ref={imageRef}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      ></Image>
      <Text style={{ color: 'white' }}>
        {widgetData.name + ' : ' + widgetData.discription}
      </Text>
    </div>
  )
}
