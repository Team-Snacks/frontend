import { Widget } from 'common'
import { Weather } from './Weather'
import { BaseWidget } from './Widget'
import type { Story } from '@ladle/react'
import { widgetDummy } from 'dummy'
import { Ascii } from './Ascii'

export const weather: Story<{ widget: Widget }> = ({ widget }) => (
  <Weather widgetData={widget} />
)
weather.args = { widget: widgetDummy }

export const widget: Story<{ widget: Widget }> = ({ widget }) => (
  <BaseWidget widget={widget} />
)
widget.args = { widget: widgetDummy }

export const AsciiWidget = Ascii
