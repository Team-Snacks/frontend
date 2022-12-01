import { Widgets, Widget } from 'common'
import { Weather } from './Weather'
import { BaseWidget } from './Widget'
import type { Story } from '@ladle/react'
import { layoutDummy, widgetDummy } from 'dummy'

export const weather: Story<{ widget: Widget }> = ({ widget }) => (
  <Weather widgetData={widget} />
)
weather.args = { widget: widgetDummy }

export const widget: Story<{ layout: Widgets; widget: Widget }> = ({
  layout,
  widget,
}) => <BaseWidget layout={layout} widget={widget} />
widget.args = { layout: layoutDummy, widget: widgetDummy }
