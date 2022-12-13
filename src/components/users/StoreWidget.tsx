import { useDraggable } from '@dnd-kit/core'
import { Image, Text } from '@mantine/core'
import { StoreWidgetType } from 'common'
import { CSS } from '@dnd-kit/utilities'
import { DragEvent, LegacyRef, createRef } from 'react'
import { pos } from 'vec2'
import { useSetAtom } from 'jotai'
import { cursorInWidgetAtom } from 'atoms'

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
  const setCursor = useSetAtom(cursorInWidgetAtom)
  const imageRef: LegacyRef<HTMLDivElement> = createRef()
  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    // https://github.com/facebook/react/issues/16201
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setCursor({ pos: pos(x, y), name: widgetData.name })
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Image
        src={widgetData.image}
        radius='lg'
        style={{ width: '150px', display: 'inline-block' }}
        id={widgetData.name}
        ref={imageRef}
        onDragStart={handleDragStart}
      ></Image>
      <Text style={{ color: 'white' }}>
        {widgetData.name + ' : ' + widgetData.discription}
      </Text>
    </div>
  )
}
