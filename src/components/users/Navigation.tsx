import { Button, Popover } from '@mantine/core'
import { Logo } from 'components/common'
import { storeVisibleAtom } from 'Atoms'
import { useSetAtom } from 'jotai'
import { useState } from 'react'

export const Navigation = () => {
  const setStoreVisible = useSetAtom(storeVisibleAtom)
  const [opened, setOpened] = useState(false)

  const tmpStyle: React.CSSProperties = {
    background: '#252525',
  }

  return (
    <nav style={tmpStyle}>
      <Logo />
      <Button onClick={() => setStoreVisible(true)}>스토어</Button>
      <Popover opened={opened} onChange={setOpened}>
        <Popover.Target>
          <Button onClick={() => setOpened(opened ? false : true)}>유저</Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Button>로그아웃</Button>
        </Popover.Dropdown>
      </Popover>
    </nav>
  )
}
