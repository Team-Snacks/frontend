import {
  ActionIcon,
  Group,
  Modal,
  NumberInput,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core'
import { IconTable } from '@tabler/icons'
import { useState } from 'react'
import { asciiTable } from './asciiTable'

export const AsciiSmall = () => {
  const [num, setNum] = useState(65)
  const ascii = asciiTable[num]
  const change = (n?: number) => {
    if (typeof n === 'number' && 0 <= n && n < 127) {
      setNum(n)
    }
  }

  return (
    <Stack align='center'>
      <Title order={3} underline>
        {ascii?.val}
      </Title>
      <Text>{ascii?.desc}</Text>
      <NumberInput
        min={0}
        max={127}
        value={num}
        onChange={change}
        onPointerDown={e => e.stopPropagation()}
        hideControls
        sx={{ width: `${2 * 2}em` }}
      />
    </Stack>
  )
}

export const Ascii = () => {
  const [opened, setOpen] = useState(false)
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpen(false)}
        onPointerDown={e => e.stopPropagation()}
        centered
        size='60vw'
        withCloseButton={false}
        title='전체 ASCII 테이블'
        overlayOpacity={0.55}
        overlayBlur={3}
        overflow='inside'
        transitionDuration={30}
        exitTransitionDuration={100}
      >
        <Table striped highlightOnHover horizontalSpacing='xl'>
          <thead>{getHead()}</thead>
          <tbody>{getRows()}</tbody>
        </Table>
      </Modal>

      <Group position='right'>
        <ActionIcon
          onClick={() => setOpen(true)}
          onPointerDown={e => e.stopPropagation()}
        >
          <IconTable />
        </ActionIcon>
      </Group>
      <AsciiSmall />
    </>
  )
}

const getHead = () => (
  <tr>
    <th>Oct</th>
    <th>Dec</th>
    <th>Hex</th>
    <th>값</th>
    <th>설명</th>
  </tr>
)

const getRows = () =>
  asciiTable.map((row, i) => {
    const { val, desc } = row
    return (
      <tr key={val}>
        <td>{toOct(i)}</td>
        <td>
          <b>{i}</b>
        </td>
        <td>{toHex(i)}</td>
        <td>{val}</td>
        <td>{desc}</td>
      </tr>
    )
  })

const toOct = (n: number) => {
  const oct = n.toString(8)
  return oct.length === 1 ? '00' + oct : oct.length === 2 ? '0' + oct : oct
}

const toHex = (n: number) => {
  const hex = n.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}
