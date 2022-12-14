import { Textarea, TextInput } from '@mantine/core'
import { WidgetProps } from 'common'
import { useState } from 'react'

type MemoData = {
  title: string
  content: string
}

export const Memo = ({ widget }: WidgetProps) => {
  const [value, setValue] = useState<MemoData>(
    widget.data ?? { title: '', content: '' }
  )
  return (
    <>
      <TextInput
        variant='unstyled'
        placeholder='새 노트'
        value={value.title}
        onChange={e => setValue({ ...value, title: e.currentTarget.value })}
      />
      <Textarea
        variant='unstyled'
        placeholder='여기에 메모 작성..'
        value={value.content}
        onChange={e => setValue({ ...value, content: e.currentTarget.value })}
      />
    </>
  )
}
