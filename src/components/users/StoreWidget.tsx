import { useDraggable } from '@dnd-kit/core'
import { Image, Text } from '@mantine/core'
import { StoreWidgetType } from 'common'
import { CSS } from '@dnd-kit/utilities'

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

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Image
        src={widgetData.image}
        radius='lg'
        style={{ width: '150px', display: 'inline-block' }}
      ></Image>
      <Text style={{ color: 'white' }}>
        {widgetData.name + ' : ' + widgetData.discription}
      </Text>
    </div>
  )
}
