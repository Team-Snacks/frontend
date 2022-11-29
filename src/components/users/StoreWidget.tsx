import { Image, Text } from '@mantine/core'
import { StoreWidgetType } from 'common'

export const StoreWidget = ({
  widgetData,
}: {
  widgetData: StoreWidgetType
}) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Image
        src={widgetData.image}
        width='150px'
        style={{ display: 'inline-block' }}
      ></Image>
      <Text style={{ color: 'white' }}>
        {widgetData.name + ' : ' + widgetData.discription}
      </Text>
    </div>
  )
}
