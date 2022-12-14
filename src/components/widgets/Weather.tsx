import { WidgetProps } from 'common'

export const Weather = ({ widget }: WidgetProps) => {
  return <div style={{ zIndex: '0', position: 'absolute' }}>{widget.name}</div>
}
