import { Image } from '@mantine/core'
import { StoreWidgetType } from 'common'

export const StoreWidget = ({
  widgetData,
}: {
  widgetData: StoreWidgetType
}) => {
  return (
    <div>
      <Image src={widgetData.image} width='150px'></Image>
      {widgetData.name + ' : ' + widgetData.discription}
    </div>
  )
}
