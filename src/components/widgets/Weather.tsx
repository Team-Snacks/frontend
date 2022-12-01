import { Widget } from 'common'

export const Weather = ({ widgetData }: { widgetData: Widget }) => {
  return <div>{widgetData.name}</div>
}
