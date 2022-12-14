import { Group, NumberInput, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { useState } from 'react'
import { asciiTable } from './asciiTable'

export const Ascii = () => {
  const [num, setNum] = useState(65)
  const ascii = asciiTable[num]
  const change = (n?: number) => {
    if (typeof n === 'number') {
      setNum(n)
    }
  }

  return (
      <Stack align='center'>
        <Title order={3} underline>
          {ascii.val}
        </Title>
        <Text>{ascii.desc}</Text>
        <NumberInput
          min={0}
          max={127}
          value={num}
          onChange={change}
          hideControls
          sx={{ width: `${2 * 2}em` }}
        />
      </Stack>
  )
}

