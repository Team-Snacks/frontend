import { WidgetName, WidgetProps } from 'common'
import { Weather } from './Weather'
import { BaseWidget } from './Widget'
import type { Story } from '@ladle/react'
import { widgetDummy } from 'dummy'
import { Ascii } from './Ascii'
import { widgetNames } from 'common.keys'
import { Box } from '@mantine/core'
import { Memo } from './Memo'

export const weather: Story<WidgetProps> = ({ widget }) => (
  <Weather widget={widget} />
)
weather.args = { widget: widgetDummy }

export const widget: Story<{ name: WidgetName }> = ({ name }) => (
  <Box sx={{ width: '30vw', height: '40vh' }}>
    <BaseWidget widget={{ ...widgetDummy, name }} />
  </Box>
)
widget.args = { widget: widgetDummy }
widget.argTypes = {
  widget: {
    options: widgetNames,
    control: { type: 'select' },
    defaultValue: 'memo',
  },
}
export const AsciiWidget = Ascii
export const memoComp = () => (
  <Memo widget={{ ...widgetDummy, data: undefined }} />
)
