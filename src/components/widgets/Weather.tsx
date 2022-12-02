import { Widget } from 'common'

export const Weather = ({ widgetData }: { widgetData: Widget }) => {
  return (
    <div style={{ zIndex: '0', position: 'absolute' }}>{widgetData.name}</div>
  )
}
