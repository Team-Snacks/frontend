import { Textarea } from '@mantine/core'
import { WidgetProps } from 'common'
import { useState } from 'react'

export const Memo = ({ widget }: WidgetProps) => {
  const [value, setValue] = useState<string>(JSON.parse(widget?.data ?? '""'))
  return (
    <Textarea
      placeholder='여기에 메모 작성..'
      value={value}
      onChange={e => {
        setValue(e.currentTarget.value)
        widget.data = JSON.stringify(e.currentTarget.value)
        console.debug(widget)
      }}
    />
  )
}
